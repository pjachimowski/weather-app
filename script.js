$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=de9ece9dcc2535fc84dcb82e9fb330de", 
function(data){
    console.log(data);
    let icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    let temp = data.main.temp;
    let weather = data.weather[0].main;

    $('.icon').attr("src", icon);
    $('.temp').append(temp);
    $('.weather').append(weather);
})


// fetch('http://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=de9ece9dcc2535fc84dcb82e9fb330de')
//     .then( response => response.json() )
//     .then(data => console.log(data))
//     .catch(Error(console.log("Something went wrong")))