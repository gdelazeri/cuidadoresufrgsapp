export default (value = '') => {
  let formatedValue = value.replace(new RegExp(/[.|\-|/]/g), '');
  if (formatedValue.length === 11) {
    formatedValue = `${formatedValue.substr(0, 3)}.${formatedValue.substr(3, 3)}.${formatedValue.substr(6, 3)}-${formatedValue.substr(9, 2)}`;
  }
  return formatedValue;
};
