import React from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import i18n from '../../../i18n';
import styles from './styles';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import BackBtn from '../../../components/BackBtn';
import CustomBtn from '../../../components/CustomBtn';
import IconChevron from '../../../components/Icons/IconChevron';
import QuestionTypes from '../../../constants/questionTypes';
import colors from '../../../constants/colors';
import FormService from '../../../services/FormService';
import FormAnswerService from '../../../services/FormAnswerService';

const Stages = {
  INTRODUCTION: 0,
  QUESTIONS: 1,
  RESULT: 2,
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      form: { introduction: {}, questions: [] },
      formAnswer: { questions: [] },
      result: [],
      index: 0,
      answer: undefined,
      hasChange: false,
      stage: Stages.INTRODUCTION,
    }
  }

  static navigationOptions = {
    headerStyle: { elevation: 0, shadowOpacity: 0 },
    header: null,
  }

  componentDidMount = () => {
    this.load();
  }

  load = async (refreshing = false) => {
    this.setState({ refreshing });
    this._id = this.props.navigation.getParam('_id');
    let response = await FormService.get(this._id);
    if (response.success) {
      const form = response.result;
      let { formAnswer } = this.state;
      if (form && this.props.user._id) {
        const response = await FormAnswerService.get(this.props.user._id, this._id);
        if (response.success) {
          formAnswer = response.result;
        }
      }
      const stage = form.introduction ? Stages.INTRODUCTION : Stages.QUESTIONS;
      this.setState({ stage, form, formAnswer, refreshing: false, loading: false, fetchError: false });
    } else {
      this.setState({ refreshing: false, loading: false, fetchError: false });
    }
  }

  setAnswer = (question, value) => {
    const { formAnswer } = this.state;
    const index = formAnswer.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      if (question.type === QuestionTypes.CHOOSE_MULTIPLE) {
        if (formAnswer.questions[index].value.includes(value)) {
          formAnswer.questions[index].value = formAnswer.questions[index].value.split(';').filter(v => v !== value).join(';');
        } else if (typeof formAnswer.questions[index].value === 'string' && formAnswer.questions[index].value.length > 0) {
          formAnswer.questions[index].value += `;${value}`;
        } else {
          formAnswer.questions[index].value = value;
        }
      } else {
        formAnswer.questions[index].value = value;
      }
    } else {
      formAnswer.questions.push({ label: question.label, value });
    }
    this.setState({ formAnswer, hasChange: true });
  }

  back = async () => {
    const { stage, index, hasChange } = this.state;
    if (stage === Stages.QUESTIONS && index === 0) {
      if (hasChange) this.save();
      this.setState({ stage: Stages.INTRODUCTION, hasChange: false });
    } else if (stage === Stages.QUESTIONS && index > 0) {
      if (hasChange) this.save();
      this.setState({ index: index - 1, hasChange: false });
    } else if (stage === Stages.RESULT) {
      this.setState({ stage: Stages.QUESTIONS });
    }
  }
  
  next = async () => {
    const { stage, form, formAnswer, index, hasChange } = this.state;
    let question, selected;
    if (stage === Stages.INTRODUCTION) {
      this.setState({ stage: Stages.QUESTIONS, index: 0 });
    } else if (
      stage === Stages.QUESTIONS
      && index >= 0 && Array.isArray(form.questions)
      && index+1 < form.questions.length
    ) {
      question = form.questions[index];
      const answer = Array.isArray(formAnswer.questions) ? formAnswer.questions.find((q) => q.label === question.label) : undefined;
      selected = answer ? answer.value : undefined;
      this.checkAnswer(question, selected, hasChange, index);
    } else if (
      stage === Stages.QUESTIONS
      && index+1 === form.questions.length
    ) {
      this.props.setLoader(true);
      if (hasChange) await this.save();
      this.getResult();
    }
  }

  checkAnswer = (question, selected, hasChange, index) => {
    if (hasChange) {
      if (question.required) {
        if (
          (question.type === QuestionTypes.LEVEL || question.type === QuestionTypes.BINARY || question.type === QuestionTypes.CHOOSE)
          && selected
        ) {
          this.save();
          this.setState({ index: index + 1, hasChange: false });
          return true;
        }
        if (question.type === QuestionTypes.TEXT && selected) {
          this.save();
          this.setState({ index: index + 1, hasChange: false });
          return true;
        }
      } else {
        this.setAnswer(question, selected);
        this.save();
        this.setState({ index: index + 1, hasChange: false });
        return true;
      }
    }
    this.setAnswer(question, selected);
    this.setState({ index: index + 1, hasChange: false });
    return false;
  }

  save = async () => {
    const { formAnswer } = this.state;
    let response;
    if (formAnswer._id) {
      response = await FormAnswerService.put(formAnswer);
    } else {
      formAnswer.userId = this.props.user._id;
      formAnswer.formId = this._id;
      response = await FormAnswerService.post(formAnswer);
    }
    if (response.success) {
      const form = response.result;
      let { formAnswer } = this.state;
      if (form && this.props.user._id) {
        const response = await FormAnswerService.get(this.props.user._id, this._id);
        if (response.success) {
          formAnswer = response.result;
        }
      }
      this.setState({ formAnswer });
    }
  }

  getResult = async () => {
    const response = await FormService.result(this._id, this.props.user._id);
    if (response.success) {
      this.setState({ stage: Stages.RESULT, result: response.result, hasChange: false });
      this.props.setLoader(false);
    } else {
      this.props.setLoader(false);
      this.setState({
        hasChange: false,
        stage: Stages.RESULT,
        result: [{ title: i18n.t('Form.resultError') }],
      });
    }
  }

  renderAnswer = (question, index, selected) => {
    switch (question.type) {
      case QuestionTypes.LEVEL:
      case QuestionTypes.BINARY:
      case QuestionTypes.CHOOSE:
        return Array.isArray(question.options) && question.options.map((option, idx) => <TouchableOpacity key={`q${index}o${idx}`} activeOpacity={0.7} onPress={() => this.setAnswer(question, option.value)} style={[styles.option, selected === option.value ? styles.selected : undefined]}>
          <TextLabel type={'text'}>{option.label}</TextLabel>
        </TouchableOpacity>)
      case QuestionTypes.TEXT:
        return <TextInput
          value={selected}
          onChangeText={(value) => this.setAnswer(question, value)}
          style={styles.text}
          multiline={true}
          textAlignVertical={'top'}
          placeholder={i18n.t('Form.answerHere')}
          placeholderTextColor={colors.grey}
        />
      case QuestionTypes.CHOOSE_MULTIPLE:
        return Array.isArray(question.options) && question.options.map((option, idx) => <TouchableOpacity key={`q${index}o${idx}`} activeOpacity={0.7} onPress={() => this.setAnswer(question, option.value)} style={[styles.option, selected && selected.includes(option.value) ? styles.selected : undefined]}>
          <TextLabel type={'text'}>{option.label}</TextLabel>
        </TouchableOpacity>)
    }
    return null;
  }

  reset = () => {
    this.setState({
      result: [],
      index: 0,
      stage: Stages.INTRODUCTION,
    })
  }

  finish = async () => {
    const { formAnswer } = this.state;
    await FormAnswerService.finish(formAnswer._id);
    this.props.navigation.goBack();
  }

  reload = () => {
    this.setState({ loading: true });
    this.load();
  }

  render() {
    const { form, formAnswer, index, stage, result } = this.state;
    let question, selected;
    if (index >= 0 && Array.isArray(form.questions) && index < form.questions.length) {
      question = form.questions[index];
      const answer = Array.isArray(formAnswer.questions) ? formAnswer.questions.find((q) => q.label === question.label) : undefined;
      selected = answer ? answer.value : undefined;
    }
    const nextDisabled = stage === Stages.QUESTIONS && question && question.required && !selected;
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError} reload={this.reload}>
        <View style={{ height: Constants.statusBarHeight }} />
        <BackBtn navigation={this.props.navigation} color={colors.blue.spec3} backgroundColor={colors.background} />
        <View style={styles.header}>
          <TextLabel type={'titleHighlight'} color={colors.blue.spec3}>{form.title}</TextLabel>
          <TextLabel type={'text'} style={styles.description}>{form.description}</TextLabel>
        </View>
        <View style={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.box}>
              <ScrollView ref={'scrollView'} showsVerticalScrollIndicator={false}>
                {stage === Stages.INTRODUCTION && <View>
                  <TextLabel type={'text'} bold style={styles.introductionTitle} color={colors.blue.spec3}>{form.introduction.title}</TextLabel>
                  {typeof form.introduction.imageUrl === 'string' && form.introduction.imageUrl.length > 0 && <View style={styles.imageView}>
                    <Image source={{ uri: form.introduction.imageUrl }} resizeMode={'contain'} style={styles.image} />
                  </View>}
                  <TextLabel type={'text'} style={styles.introductionText}>{form.introduction.text}</TextLabel>
                </View>}
                {stage === Stages.QUESTIONS && question && <View>
                  <TextLabel type={'text'} bold style={styles.question} color={colors.blue.spec3}>{question.label}</TextLabel>
                  {this.renderAnswer(question, index, selected)}
                </View>}
                {stage === Stages.RESULT && <View>
                  <TextLabel type={'text'} bold style={styles.resultTitle} color={colors.blue.spec3}>{i18n.t('Form.result')}</TextLabel>
                  {result.map((res, idx) => <View key={`result${idx}`} style={styles.resultDomain}>
                    {typeof res.title === 'string' && res.title.length > 0 && <TextLabel type={'text'}>{res.title}</TextLabel>}
                    {typeof res.imageUrl === 'string' && res.imageUrl.length > 0 && <View style={styles.imageView}>
                      <Image source={{ uri: res.imageUrl }} resizeMode={'contain'} style={styles.image} />
                    </View>}
                    {typeof res.text === 'string' && res.text.length > 0 && <TextLabel type={'subtitle'}>{res.text}</TextLabel>}
                    {typeof res.classification === 'string' && res.classification.length > 0 && <TextLabel type={'subtitle'}>{res.classification}</TextLabel>}
                  </View>)}
                </View>}
              </ScrollView>
            </View>
          </View>
          {stage !== Stages.RESULT && Array.isArray(form.questions) && <View style={styles.pagination}>
            {stage !== Stages.INTRODUCTION ? <TouchableOpacity style={styles.paginationBtn} onPress={this.back}>
              <IconChevron side={'left'} color={colors.blue.spec3} />
            </TouchableOpacity> : <View />}
            {stage === Stages.QUESTIONS && <TextLabel type={'text'} style={styles.paginationBtn} bold color={colors.blue.spec3}>{index+1}/{form.questions.length}</TextLabel>}
            <TouchableOpacity disabled={nextDisabled} style={styles.paginationBtn} onPress={this.next}>
              <IconChevron side={'right'} color={nextDisabled ? colors.light : colors.blue.spec3} />
            </TouchableOpacity>
          </View>}
          {stage === Stages.RESULT && <View style={styles.buttons}>
            <CustomBtn
              text={i18n.t('Form.remake')}
              width={Dimensions.get('window').width/3}
              onPress={this.reset}
            />
            <CustomBtn
              text={i18n.t('Form.finish')}
              width={Dimensions.get('window').width/3}
              onPress={this.finish}
            />
          </View>}
        </View>
      </Screen>
    );
  }
}

Form.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  setLoader: PropTypes.func,
};

export default Form;
