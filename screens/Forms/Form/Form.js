import React from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import {
  View,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from './styles';
import Screen from '../../../components/Screen';
import TextLabel from '../../../components/TextLabel';
import BackBtn from '../../../components/BackBtn';
import FormService from '../../../services/FormService';
import IconChevron from '../../../components/Icons/IconChevron';
import colors from '../../../constants/colors';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetchError: false,
      refreshing: false,
      form: {},
      index: 0,
      answer: undefined,
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
      this.setState({ form, refreshing: false, loading: false, fetchError: false });
    } else {
      this.setState({ refreshing: false, loading: false, fetchError: false });
    }
  }

  select = (question, value) => {
    this.setState({ answer: value });
  }

  renderAnswer = (question) => {
    switch (question.type) {
      case "LEVEL":
        return Array.isArray(question.options) && question.options.map((option) => <TouchableOpacity activeOpacity={0.7} onPress={() => this.select(question, option.value)} style={[styles.option, this.state.answer === option.value ? styles.selected : undefined]}>
          <TextLabel type={'text'}>{option.value} - {option.label}</TextLabel>
        </TouchableOpacity>)
    }
    return null;
  }

  reload = () => {
    this.setState({ loading: true });
    this.load();
  }

  render() {
    const { form, index } = this.state;
    return (
      <Screen loading={this.state.loading} navigation={this.props.navigation} error={this.state.fetchError} reload={this.reload}>
        <View style={{ height: Constants.statusBarHeight }} />
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.load(true)} />}
        >
          <BackBtn navigation={this.props.navigation} />
          <View style={styles.header}>
            <TextLabel type={'titleHighlight'}>{form.title}</TextLabel>
            <TextLabel type={'text'} style={styles.description}>{form.description}</TextLabel>
          </View>
          {index >= 0 && Array.isArray(form.questions) && index < form.questions.length && <View style={styles.box}>
            <TextLabel type={'text'} bold style={styles.question}>{form.questions[index].label}</TextLabel>
            {this.renderAnswer(form.questions[index])}
          </View>}
          {Array.isArray(form.questions) && <View style={styles.pagination}>
            <TouchableOpacity disabled={index === 0} onPress={() => this.setState({ index: index-1 })}>
              <IconChevron side={'left'} color={index === 0 ? colors.light : colors.grey} />
            </TouchableOpacity>
            <TextLabel type={'text'} bold>{index+1}/{form.questions.length}</TextLabel>
            <TouchableOpacity disabled={index === form.questions.length-1} onPress={() => this.setState({ index: index+1 })}>
              <IconChevron side={'right'} color={index === form.questions.length-1 ? colors.light : colors.grey} />
            </TouchableOpacity>
          </View>}
        </ScrollView>
      </Screen>
    );
  }
}

Form.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
};

export default Form;
