import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, DatePickerAndroid, Platform, DatePickerIOS, View, Dimensions } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { Overlay } from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import CustomBtn from '../CustomBtn';
import TextLabel from '../TextLabel';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

class DatePicker extends React.Component {
  constructor(props) {
    const colorScheme = Appearance.getColorScheme();
    super(props);
    this.state = {
      modalIOS: false,
      colorScheme,
    }
  }

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        mode: 'calendar',
        date: this.props.date ? moment(this.props.date).toDate() : new Date(),
      });
      if (action === DatePickerAndroid.dateSetAction) {
        this.props.handleDate(moment().date(day).month(month).year(year).format());
      }
    } catch ({code, message}) {
      
    }
  }

  renderDatePickerIOS() {
    const { colorScheme } = this.state;
    return <Overlay width={width*0.8} height={'auto'} overlayStyle={styles.modalDate} isVisible={this.state.modalIOS} onBackdropPress={() => this.setState({ modalIOS: false })} onDismiss={() => this.setState({ modalIOS: false })} onRequestClose={() => this.setState({ modalIOS: false })}>
      <View style={{ backgroundColor: colorScheme === 'dark' ? colors.text : 'white' }}>
        <DatePickerIOS
          mode='date'
          locale='pt-BR'
          minimumDate={this.props.minDate}
          maximumDate={this.props.maxDate}
          date={!this.props.date ? new Date() : moment(this.props.date).toDate()}
          onDateChange={(date) => { this.props.handleDate(moment(date).format()) }}
        />
        <View style={styles.centerBtn}>
          <CustomBtn
            secondary
            onPress={() => {
              const date = !this.props.date ? new Date() : moment(this.props.date).toDate();
              this.props.handleDate(moment(date).format());
              this.setState({ modalIOS: false });
            }}
            width={width*0.3}
            text='OK'
          />
        </View>
      </View>
    </Overlay>
  }

  render() {
    if (Platform.OS === 'ios')
      return <TouchableOpacity activeOpacity={0.7} style={styles.dateView} onPress={() => this.setState({ modalIOS: true })}>
        {this.renderDatePickerIOS()}
        {this.props.date && <TextLabel type={'label'}>{moment(this.props.date).format('DD/MM/YYYY')}</TextLabel>}
        {!this.props.date && <TextLabel type={'label'} color={colors.light}>{this.props.placeholder}</TextLabel>}
      </TouchableOpacity>
    return <TouchableOpacity activeOpacity={0.7} style={styles.dateView} onPress={() => this.openDatePicker()}>
      {this.props.date && <TextLabel type={'label'}>{moment(this.props.date).format('DD/MM/YYYY')}</TextLabel>}
      {!this.props.date && <TextLabel type={'label'} color={colors.light}>{this.props.placeholder}</TextLabel>}
    </TouchableOpacity>
  }
}

DatePicker.propTypes = {
  date: PropTypes.string,
  placeholder: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  handleDate: PropTypes.func,
};

export default DatePicker;
