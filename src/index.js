function getAPIData() {
  return fetch(
    "https://v6.exchangerate-api.com/v6/25d3c2f1d859378e60aa2882/latest/USD"
  )
    .then((response) => response.json())
    .then((JSONresponse) => JSONresponse.conversion_rates);
}

function setOptions() {
  getAPIData().then((currencies) => {
    document.querySelectorAll("select").forEach((select) => {
      Object.keys(currencies)
        .sort()
        .forEach((currency) => {
          const option = document.createElement("option");
          option.textContent = `${currency}`;
          select.appendChild(option);
        });
    });
  });
}

function setMaxDate() {
  const $dateInput = document.querySelector("input[type='date']");
  const todaysDate = new Date().toISOString().split("T")[0];
  $dateInput.setAttribute("max", todaysDate);
}

function initialize() {
  setMaxDate();
  setOptions();
}

initialize();
