// Api key: c12b8f8d282499fa03d73404bcc0db8a
function obterInput() {
  if (document.querySelector(".cidade").value) {
    let input = document.querySelector(".cidade").value;
    buscarCidade(input);
  } else {
    let input = "sao paulo";
    buscarCidade(input);
  }
}
async function buscarCidade(input) {
  const respostaAPI = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=c12b8f8d282499fa03d73404bcc0db8a&lang=pt_br&units=metric`
  ).then((respostaAPI) => respostaAPI.json());
  mostrarDados(respostaAPI);
}
function mostrarDados(respostaAPI) {
  console.log(respostaAPI);
  document.querySelector(
    ".nomeCidade"
  ).innerHTML = `${respostaAPI.name}, ${respostaAPI.sys.country}`;

  document.querySelector(
    ".imagem"
  ).src = `https://openweathermap.org/img/wn/${respostaAPI.weather[0].icon}@2x.png`;
  document.querySelector(".temperatura").innerHTML = `${Math.round(
    respostaAPI.main.temp
  )} °C`;
  document.querySelector(
    ".descricao"
  ).innerHTML = `Céu: ${respostaAPI.weather[0].description}`;
  document.querySelector(
    ".sensacao"
  ).innerHTML = `Sensação térmica: ${Math.round(
    respostaAPI.main.feels_like
  )}°C`;
  document.querySelector(
    ".umidade"
  ).innerHTML = `${respostaAPI.main.humidity}%`;
  document.querySelector(".nascerSol").innerHTML = timeConverter(
    respostaAPI.sys.sunrise
  );
  document.querySelector(".porSol").innerHTML = timeConverter(
    respostaAPI.sys.sunset
  );
}
obterInput();
function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();

  let time = hour + ":" + min;
  return time;
}
