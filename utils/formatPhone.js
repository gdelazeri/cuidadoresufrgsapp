export default (phone = '') => {
  if (phone) {
    let formatedPhone = phone.replace(new RegExp(/[.|\-|/]/g), '');
    if (formatedPhone.length === 11) {
      return `(${formatedPhone.substr(0, 2)}) ${formatedPhone.substr(2, 5)}-${formatedPhone.substr(7, 4)}`;
    } else if (formatedPhone.length === 10) {
      return `(${formatedPhone.substr(0, 2)}) ${formatedPhone.substr(2, 4)}-${formatedPhone.substr(6, 4)}`;
    }
  }
  return phone;
};
