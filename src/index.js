const myHeaders = new Headers();
myHeaders.append("apikey", "ObrRM6eYVg1bioHuZ0PPB7PJIr4g8rIR");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function getCurrenciesList(date, baseCurrency) {
  return fetch(
    `https://api.apilayer.com/exchangerates_data/${date}&base=${baseCurrency}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((JSONresponse) => JSONresponse.rates);
}

function getAPIData() {
  return fetch(
    "https://api.apilayer.com/exchangerates_data/latest",
    requestOptions
  )
    .then((response) => response.json())
    .then((JSONresponse) => JSONresponse.rates);
}

function setOptions() {
  getAPIData().then((currencies) => {
    document.querySelectorAll("select").forEach((select) => {
      Object.keys(currencies).forEach((currency) => {
        const option = document.createElement("option");
        option.textContent = `${currency}`;
        select.appendChild(option);
      });
    });
  });
}

function setDate() {
  const $dateInput = document.querySelector("input[type='date']");
  const todaysDate = new Date().toISOString().split("T")[0];
  $dateInput.setAttribute("max", todaysDate);
  $dateInput.value = todaysDate;
}

function initialize() {
  setDate();
  setOptions();
}

initialize();
