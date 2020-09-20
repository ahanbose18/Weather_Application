const request = require('postman-request');

const forecast = (latitude,longitude,callback) => {
 const url = 'http://api.weatherstack.com/current?access_key=a291f705356db3dbb11af2dcb456aa0e&query='+encodeURIComponent(longitude)+','+encodeURIComponent(latitude);

 request({url,json: true},(error,{body})=>{
   if(error){
    callback('Unable to connect to weather service',undefined);
   }
   else if (body.error){
    callback('unable to find location please try another query',undefined);
   }
   else{
    callback(undefined,{
      time: body.location.localtime,
      windspeed: body.current.wind_speed,
      humidity: body.current.humidity,
      weather_desc: body.current.weather_descriptions[0],
      temperature: body.current.temperature,
      country: body.location.country
    })
   }
 })
}

module.exports = forecast;