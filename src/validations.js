function validateAmount(amount) {
  if (amount <= 0 && amount !== "") {
    return "Amount can't be less or equal to 0";
  } else if (amount === "") {
    return "Amount can't be null";
  } else {
    return "";
  }
}

function validateCurrencies(base, target) {
  if (base === target) {
    return "Base and target currencies can't be the same";
  } else {
    return "";
  }
}

