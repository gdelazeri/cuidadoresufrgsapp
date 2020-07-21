import moment from 'moment';

export default (date = '', withTime = false) => {
  if (date) {
    if (withTime) {
      return moment(date).format('DD/MM/YY HH:mm');
    }
    return moment(date).format('DD/MM/YY');
  }
  return '';
};
