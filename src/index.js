const myHeaders = new Headers();
myHeaders.append("apikey", "ObrRM6eYVg1bioHuZ0PPB7PJIr4g8rIR");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function updateTextContent(text, id) {
  let element = document.querySelector(id);
  element.textContent = text;
}

function showElement(element) {
  element.classList.remove("hidden");
  window.scrollTo(0, 1000);
}

function removePreviousRates() {
  const previousRates = document.querySelectorAll("#table-body tr");
  if (previousRates) {
    previousRates.forEach((rate) => rate.remove());
  }
}

function getCurrenciesList(date, baseCurrency) {
  return fetch(
    `https://api.apilayer.com/exchangerates_data/${date}&base=${baseCurrency}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((JSONresponse) => JSONresponse.rates);
}

function createCurrenciesTable() {
  removePreviousRates();
  const tableContainer = document.querySelector(".table-container");
  const tableBody = document.querySelector("#table-body");
  const date = document.querySelector("#date").value;
  const baseCurrency = document.querySelector("#base-currency").value;

  getCurrenciesList(date, baseCurrency).then((currenciesList) => {
    Object.keys(currenciesList).forEach((currency) => {
      const currencyTr = document.createElement("tr");
      const currencyTd = document.createElement("td");
      currencyTd.textContent = currency;
      const valueTd = document.createElement("td");
      valueTd.textContent = currenciesList[currency];

      currencyTr.appendChild(currencyTd);
      currencyTr.appendChild(valueTd);

      tableBody.appendChild(currencyTr);
    });
  });

  updateTextContent(`Rates of the day ${date}`, ".table-date");
  updateTextContent(`Value in ${baseCurrency} base`, "#th-value");
  showElement(tableContainer);
}

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

function addEvents() {
  document
    .querySelector("#enter")
    .addEventListener("click", createCurrenciesTable);

}

function setDate() {
  const $dateInput = document.querySelector("input[type='date']");
  const todaysDate = new Date().toISOString().split("T")[0];
  $dateInput.setAttribute("max", todaysDate);
  $dateInput.value = todaysDate;
}

function initialize() {
  setDate();
  addEvents();
  setOptions();
}

initialize();
