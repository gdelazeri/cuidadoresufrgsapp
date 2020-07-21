export default (value = '') => {
  let formatedValue = value.replace(new RegExp(/[.|\-|/]/g), '');
  if (formatedValue.length === 8) {
    formatedValue = `${formatedValue.substr(0, 5)}-${formatedValue.substr(5, 3)}`;
  }
  return formatedValue;
};
