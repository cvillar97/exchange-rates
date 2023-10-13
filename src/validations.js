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

function handleErrors(errors) {
  const keys = Object.keys(errors);
  const $ulErrors = document.querySelector("#errors");
  $ulErrors.innerHTML = "";
  let errorsCounter = 0;

  keys.forEach((key) => {
    const error = errors[key];
    const element = document.querySelector(`#${key}`);

    if (error) {
      errorsCounter++;
      element.classList.add("error");
      const $error = document.createElement("li");
      $error.textContent = error;

      $ulErrors.appendChild($error);
    } else {
      element.classList.remove("error");
    }
  });

  return errorsCounter;
}

function validateForm(base, target, amount) {
  const currenciesError = validateCurrencies(base, target);
  const amountError = validateAmount(amount);

  const errors = {
    currencies: currenciesError,
    amount: amountError,
  };

  const errorsCounter = handleErrors(errors);

  return errorsCounter;
}
