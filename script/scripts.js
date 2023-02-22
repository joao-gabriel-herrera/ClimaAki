// Api key: c12b8f8d282499fa03d73404bcc0db8a
function obterInput() {
  if (document.querySelector(".cidade").value) {
    let input = document.querySelector(".cidade").value.trim();
    buscarCidade(input).then((respostaAPI) => {
      if (respostaAPI.erro) {
        alert(
          `Infelizmente não encontrei essa cidade ou você digitou errado, tente novamente!`
        );
      }
    });
    limparInput();
  } else {
    let input = "sao paulo";
    buscarCidade(input).then((respostaAPI) => {
      if (respostaAPI.erro) {
        alert(
          `Infelizmente não encontrei essa cidade ou você digitou errado, tente novamente!`
        );
      }
    });
  }
}
document.querySelector(".cidade").addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    obterInput();
  }
});
function limparInput() {
  document.querySelector(".cidade").value = "";
}
async function buscarCidade(input) {
  const respostaAPI = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=c12b8f8d282499fa03d73404bcc0db8a&lang=pt_br&units=metric`
  ).then((respostaAPI) => respostaAPI.json());

  if (respostaAPI.cod && respostaAPI.cod !== 200) {
    return { erro: respostaAPI.message };
  }

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
  ).innerHTML = `<img src="./img/sky.png" alt="Nuvens" class="sky" width="24px"/> Céu: ${respostaAPI.weather[0].description}`;
  document.querySelector(
    ".sensacao"
  ).innerHTML = `<i class="fa-solid fa-temperature-high"></i>Sensação térmica: ${Math.round(
    respostaAPI.main.feels_like
  )}°C`;
  document.querySelector(
    ".temp_max"
  ).innerHTML = `<img src="./img/up.png" alt="Temperatura máxima"/>${Math.round(
    respostaAPI.main.temp_max
  )}°C`;
  document.querySelector(
    ".temp_min"
  ).innerHTML = `<img src="./img/down.png" alt="Temperatura mínima"/>${Math.round(
    respostaAPI.main.temp_min
  )}°C`;
  document.querySelector(
    ".umidade"
  ).innerHTML = `<i class="fa-solid fa-droplet"></i> ${respostaAPI.main.humidity}%`;
  document.querySelector(
    ".vento"
  ).innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.round(
    respostaAPI.wind.speed
  )} Km/H`;
  document.querySelector(
    ".nascerSol"
  ).innerHTML = `<i class="fa-regular fa-clock"></i> ${timeConverter(
    respostaAPI.sys.sunrise
  )}`;
  document.querySelector(
    ".porSol"
  ).innerHTML = `<i class="fa-regular fa-clock"></i> ${timeConverter(
    respostaAPI.sys.sunset
  )}`;
}
obterInput();
function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }

  let time = hour + ":" + min;
  return time;
}
