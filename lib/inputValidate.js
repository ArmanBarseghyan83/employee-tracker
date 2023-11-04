const numberValidate = (value) => {
  return /^\d+$/.test(value) ? true : 'Please enter a number.';
};

const emptyValidate = (value) => {
    return value.trim().length > 0 ? true : 'Please enter somethig' 
}

module.exports = [ numberValidate, emptyValidate ]