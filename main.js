let SearchBar = document.getElementById('SearchBareee')

// Create a new Date object for the current date and time
const today = new Date();
// Use Intl.DateTimeFormat to get the day of the week in a specific locale
const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);
// Use Intl.DateTimeFormat to get the date in a specific format
const dateFormatter = new Intl.DateTimeFormat('en-US', {  month: 'short' ,day: 'numeric'});
const date = dateFormatter.format(today);

// Create a new Date object for the next day
const nextDay = new Date(today);
nextDay.setDate(today.getDate() + 1);
const day3 = new Date(today);
// Get the name of the next day
const nextDayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(nextDay);
// Get the formatted date for the next day as YYYY-MM-DD
const nextDateISO = nextDay.toISOString().split('T')[0];

// Create a new Date object for the day after tomorrow
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);
// Get the name of the day after tomorrow
const dayAfterTomorrowName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dayAfterTomorrow);
// Get the formatted date for the day after tomorrow as YYYY-MM-DD
const dayAfterTomorrowDateISO = dayAfterTomorrow.toISOString().split('T')[0];
// ##############################################
// start code to get the current location
document.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log("Geolocation is not available.");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data && data.address) {
            let = city = data.address.city || data.address.town || data.address.village;
            if (city) {
                getweather(city)
                getNextDay(city, nextDateISO, 'nextdayname',nextDayName , 'maxTemp', 'minTemp','nextdayICon','nextdayStute')
                getNextDay(city, dayAfterTomorrowDateISO, 'DayThreeName',dayAfterTomorrowName , 'maxTempDay3', 'minTempDay3','Day3ICon','day3stute')

              document.getElementById('city').textContent = `City: ${city}`;
            } else {
              console.log('City not found in the address details.');
              document.getElementById('city').textContent = 'City not found.';
            }
          } else {
            console.log('Nominatim API returned an error or no address found.');
          }
        })
        // .catch(err => console.error('Error calling Nominatim API:', err));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  });
// // start code to get the current location


// start code to get the weather by search
SearchBar.addEventListener('keyup', function(){
 getweather(SearchBar.value)
 getNextDay(SearchBar.value, nextDateISO, 'nextdayname',nextDayName , 'maxTemp', 'minTemp','nextdayICon','nextdayStute')
getNextDay(SearchBar.value, dayAfterTomorrowDateISO, 'DayThreeName',dayAfterTomorrowName , 'maxTempDay3', 'minTempDay3','Day3ICon','day3stute')
})
// end code to get the weather by search


// start function to get the weather of current day
 function getweather(location ){
        let myob = new XMLHttpRequest()
        myob.open('GET' ,`https://api.weatherapi.com/v1/forecast.json?key= c003477b784b4d64ade104453240307&q=${location}`)
        myob.send()
        myob.addEventListener('readystatechange',function(){
            if(this.readyState == 4){
                let data = JSON.parse(myob.response)
                // console.log(data);
                // the current day
                document.getElementById('location').innerText = data.location.name
                document.getElementById('tempreture-c').innerText = data.current.temp_c
                document.getElementById('stute').innerText = data.current.condition.text
                document.getElementById('tempreture-c').nextElementSibling.src =  data.current.condition.icon
                document.getElementById('currentDay').innerText = dayName
                document.getElementById('currentDay').nextElementSibling.innerText = date
            }
        })
}
// end function to get the weather of current day

// start function to get the weather of day 2 and day 3
function getNextDay(location ,date, nextdayname, dayname, maxTemp, minTemp,nextdayICon,nextdayStute){
        let myob = new XMLHttpRequest()
        myob.open('GET' ,`https://api.weatherapi.com/v1/forecast.json?key=c003477b784b4d64ade104453240307&q=${location}&dt= ${date}`)
        myob.send()
        myob.addEventListener('readystatechange',function(){
            if(this.readyState == 4){
                let data = JSON.parse(myob.response)
                document.getElementById(`${nextdayname}`).innerText = dayname
                document.getElementById(`${maxTemp}`).innerText = data.forecast.forecastday[0].day.maxtemp_c
                document.getElementById(`${minTemp}`).innerText = data.forecast.forecastday[0].day.mintemp_c
                document.getElementById(`${nextdayICon}`).src = data.forecast.forecastday[0].day.condition.icon
                document.getElementById(`${nextdayStute}`).innerText = data.forecast.forecastday[0].day.condition.text
            }
        })
}
// end function to get the weather of day 2 and day 3

