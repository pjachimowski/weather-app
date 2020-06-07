// let city = document.getElementById('input').value;

const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=de9ece9dcc2535fc84dcb82e9fb330de';
const btn = document.querySelector('#btn');
const weather = document.getElementById('weather');

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
    val = parseFloat(val);
    val = (val-32) / 1.8;
    return val;
}

function generateHTML(data) {
    let icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    const section = document.createElement('section');
    weather.appendChild(section);
    section.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${icon}">
        <p>${temperatureConverter(data.main.temp)} °C </p>
        <p>${data.weather[0].main}</p>`;
}

btn.addEventListener('click', () => {
    getJSON(weatherUrl, generateHTML);
});

/**
 * jQuery here create seperate version add better html
 */
// let city = prompt("Select city");

// $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=de9ece9dcc2535fc84dcb82e9fb330de", 
// function(data){
//     console.log(data);
//     let icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
//     let temp = data.main.temp;
//     let weather = data.weather[0].main;

//     $('.icon').attr("src", icon);
//     $('.temp').append(temp);
//     $('.weather').append(weather);
// })