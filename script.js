const btn = document.querySelector('#btn');
const weather = document.getElementById('weather');
const rmv = document.getElementById('rmv');
const date = document.getElementById('date');
const details = document.getElementById('details');
const hr = document.getElementById('hr');

// Ajax request
function getJSON(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if(xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            return callback(data);
        }
    };
    xhr.send();
}

function temperatureConverter(val) {
    let kalv = val-273.15;
    kalv = kalv.toFixed(1);
    return (kalv);
}

function getDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    date.innerHTML = today;
}
getDate();

function generateHTML(data) {
    let icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    const section = document.createElement('section');
    weather.appendChild(section);
    section.innerHTML = `
        <h2> <img class="flag" alt="United States" src="http://catamphetamine.gitlab.io/country-flag-icons/3x2/${data.sys.country}.svg"/> ${data.name}  </h2>
        <img src="${icon}">
        <p>${temperatureConverter(data.main.temp)} °C </p>
        <p>${data.weather[0].main}</p>
        `;
    
}

function generateWikiHTML(data) {
    const section = document.createElement('section');
    details.appendChild(section);
    section.innerHTML =`<div>
    ${data.extract}</div><br>
    ` ;
}

btn.addEventListener('click', () => {
    city = document.getElementById('input').value;
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=de9ece9dcc2535fc84dcb82e9fb330de';
    getJSON(weatherUrl, generateHTML);

    let wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + city;
    getJSON(wikiUrl, generateWikiHTML);
    hr.innerHTML = '<hr>';

});

rmv.addEventListener('click', () => {
    weather.innerHTML = '';
    details.innerHTML = '';
});
