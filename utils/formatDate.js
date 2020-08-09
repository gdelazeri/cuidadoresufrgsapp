import moment from 'moment';

import i18n from '../i18n';

export default (date = '', withTime = false) => {
  if (date) {
    if (withTime) {
      return moment(date).format('DD/MM/YY HH:mm');
    }
    const day = parseInt(moment(date).format('DD'), 10);
    const month = moment(date).format('MMMM').substring(0, 3).toLowerCase();
    const year = moment(date).format('YYYY');
    return i18n.t('date.format', { day, year, month: i18n.t(`date.${month}`) });
  }
  return '';
};
