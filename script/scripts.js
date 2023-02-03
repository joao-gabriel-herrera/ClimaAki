// Api key: c12b8f8d282499fa03d73404bcc0db8a
function obterInput() {
  let input = document.querySelector(".cidade").value;
  buscarCidade(input);
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
  ).innerHTML = `Tempo em ${respostaAPI.name}`;
  document.querySelector(".temperatura").innerHTML = `${Math.floor(
    respostaAPI.main.temp
  )} °C`;
  document.querySelector(
    ".descricao"
  ).innerHTML = `${respostaAPI.weather[0].description}`;
  document.querySelector(
    ".umidade"
  ).innerHTML = `${respostaAPI.main.humidity}%`;
}
