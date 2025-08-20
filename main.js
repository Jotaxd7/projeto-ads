let form = document.getElementById("converterForm");
let amount = document.getElementById("amount");
let fromMoney = document.getElementById("fromMoney");
let convertedAmount = document.getElementById("convertedAmount");
let toMoney = document.getElementById("toMoney");
let loading = document.getElementById("loading");
let result = document.getElementById("result");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertMoney() {
  loading.style.display = "block";
  result.style.display = "none"; // esconde resultado anterior

  try {
    const response = await fetch(API_URL + fromMoney.value);
    const data = await response.json();

    const rate = data.rates[toMoney.value];
    const convertedValue = (amount.value * rate).toFixed(2);

    convertedAmount.value = convertedValue;

    result.style.display = "block";

    result.innerHTML = `
      <div style="font-size: 1.4rem; color: #fff;">
        ${amount.value} ${fromMoney.value} = ${convertedAmount.value} ${toMoney.value}
      </div>
      <div style="font-size: 0.9rem; color: #fff; opacity: 0.8; margin-top:10px;">
        Taxa: 1 ${fromMoney.value} = ${rate} ${toMoney.value}
      </div>
    `;
  } catch (err) {
    alert("Falha no servidor");
  } finally {
    loading.style.display = "none";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});
