// Allow only number input
const numberValidate = (value) => {
  return /^\d+$/.test(value) ? true : 'Please enter a number.';
};

// Don't allow empty input
const emptyValidate = (value) => {
    return value.trim().length > 0 ? true : 'Please enter somethig' 
}

module.exports = [ numberValidate, emptyValidate ]