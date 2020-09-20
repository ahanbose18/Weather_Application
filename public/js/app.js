console.log("client javascript loaded");

const weatherForm = document.querySelector('form');
const searchlocation = document.querySelector('input');
const m1 = document.querySelector('.alert-heading');
let m1head= document.querySelector('.alert');
let time = document.querySelector('.time');
let windspeed = document.querySelector('.windspeed');
let humidity = document.querySelector('.humidity');
let weatherdesc = document.querySelector('.weatherdesc');
let temperature = document.querySelector('.temperature');
let country = document.querySelector('.country')
document.querySelector('.location').textContent = "None";
time.textContent = "None";
windspeed.textContent = "None";
humidity.textContent = "None";
weatherdesc.textContent = "None";

 weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault()
    document.querySelector('.location').textContent = "None";
    time.textContent = "None";
    windspeed.textContent = "None";
    humidity.textContent = "None";
    weatherdesc.textContent = "None";
    temperature.textContent = "None";
    country.textContent = "None";
   const location = searchlocation.value;
   m1head.className = "alert alert-info w-50"
   m1.textContent = "Loading....";
   fetch('/weather?location='+location).then((response)=>{
     response.json().then((data)=>{
      if(data.error){
         m1head.className = "alert alert-danger w-50"
         m1.textContent = data.error;
       }
       else{
           console.log(data);
           m1head.className= "alert alert-success w-50"
           m1.textContent = "success";
           m1head= document.querySelector('.alert');
           document.querySelector('.location').textContent = location;
           time.textContent = data.time;
           windspeed.textContent = data.windspeed;
           humidity.textContent = data.humidity;
           weatherdesc.textContent = data.weather_desc;
           temperature.textContent = data.temperature;
           country.textContent = data.country;
           
       }
     })
  })
 })