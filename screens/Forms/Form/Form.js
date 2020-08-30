import React from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import i18n from '../../../i18n';
import styles from './styles';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import BackBtn from '../../../components/BackBtn';
import IconChevron from '../../../components/Icons/IconChevron';
import colors from '../../../constants/colors';
import FormService from '../../../services/FormService';
import FormAnswerService from '../../../services/FormAnswerService';

const Stages = {
  INTRODUCTION: 0,
  QUESTIONS: 1,
  RESULT: 1,
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

  select = (question, value) => {
    const { formAnswer } = this.state;
    const index = formAnswer.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      formAnswer.questions[index].value = value;
    } else {
      formAnswer.questions.push({ label: question.label, value });
    }
    this.setState({ formAnswer });
  }

  next = async () => {
    const { stage, form, formAnswer, index } = this.state;
    let question, selected;
    if (stage === Stages.INTRODUCTION) {
      this.setState({ stage: Stages.QUESTIONS, index: 0 });
    } else if (
      stage === Stages.QUESTIONS
      && index >= 0 && Array.isArray(form.questions)
      && index < form.questions.length
    ) {
      question = form.questions[index];
      const answer = Array.isArray(formAnswer.questions) ? formAnswer.questions.find((q) => q.label === question.label) : undefined;
      selected = answer ? answer.value : undefined;
      if (question.required && selected) {
        await this.save();
        this.setState({ index: index + 1 });
      } else if (!question.required) {
        await this.save();
        this.setState({ index: index + 1 });
      }
    } else if (
      stage === Stages.QUESTIONS
      && index+1 === form.questions.length
    ) {
      this.props.setLoader(true);
      this.getResult();
    }
  }

  save = async () => {
    const { formAnswer } = this.state;
    let response;
    if (formAnswer._id) {
      response = await FormAnswerService.put(formAnswer);
    } else {
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
      this.setState({ stage: Stages.RESULT, result: response.result });
      this.props.setLoader(false);
    } else {
      this.props.setLoader(false);
      this.setState({
        stage: Stages.RESULT,
        result: [{ text: i18n.t('Form.resultError') }],
      });
    }
  }

  renderAnswer = (question, index, selected) => {
    switch (question.type) {
      case "LEVEL":
        return Array.isArray(question.options) && question.options.map((option, idx) => <TouchableOpacity key={`q${index}o${idx}`} activeOpacity={0.7} onPress={() => this.select(question, option.value)} style={[styles.option, selected === option.value ? styles.selected : undefined]}>
          <TextLabel type={'text'}>{option.label}</TextLabel>
        </TouchableOpacity>)
    }
    return null;
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
    const nextDisabled = question && question.required && !selected;
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError} reload={this.reload}>
        <View style={{ height: Constants.statusBarHeight }} />
        <BackBtn navigation={this.props.navigation} />
        <View style={styles.header}>
          <TextLabel type={'titleHighlight'}>{form.title}</TextLabel>
          <TextLabel type={'text'} style={styles.description}>{form.description}</TextLabel>
        </View>
        <View style={styles.box}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {stage === Stages.INTRODUCTION && <View>
              <TextLabel type={'text'} bold style={styles.introductionTitle}>{form.introduction.title}</TextLabel>
              <TextLabel type={'text'} style={styles.introductionText}>{form.introduction.text}</TextLabel>
            </View>}
            {stage === Stages.QUESTIONS && question && <View>
              <TextLabel type={'text'} bold style={styles.question}>{question.label}</TextLabel>
              {this.renderAnswer(question, index, selected)}
            </View>}
            {stage === Stages.RESULT && <View>
              <TextLabel type={'text'} bold style={styles.resultTitle}>{i18n.t('Form.result')}</TextLabel>
              
            </View>}
          </ScrollView>
        </View>
        {Array.isArray(form.questions) && <View style={styles.pagination}>
          <TouchableOpacity disabled={index === 0} style={styles.paginationBtn} onPress={() => this.setState({ index: index-1 })}>
            <IconChevron side={'left'} color={index === 0 ? colors.light : colors.grey} />
          </TouchableOpacity>
          {stage === Stages.QUESTIONS && <TextLabel type={'text'} style={styles.paginationBtn} bold>{index+1}/{form.questions.length}</TextLabel>}
          <TouchableOpacity disabled={nextDisabled} style={styles.paginationBtn} onPress={this.next}>
            <IconChevron side={'right'} color={nextDisabled ? colors.light : colors.grey} />
          </TouchableOpacity>
        </View>}
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
