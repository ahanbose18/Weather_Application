const request = require('postman-request');
// const url = 'http://api.weatherstack.com/current?access_key=a291f705356db3dbb11af2dcb456aa0e&query=37.8267,-122.4233';
// // request({url: url,json: true}, (error, response, body)=>{
// //   if(error){console.log("Unable to Connect to weather service lmao");}
// //   else if(response.body.error){console.log("Unable to find location");}
// //   else{console.log(response.body);}
// // });

// const geocodingAPI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWhhbmJvc2UiLCJhIjoiY2ticDNraHB3MjhxcjJ5bHN1cTdiOGR0aCJ9.YqUsoAfNAY77tpGeItojWA&limit=1';
//  request({url: geocodingAPI,json: true},(error,response,body)=>{
//   if(error){console.log("Unable to access mapbox api lmao");}
//   else if(response.body.features.length === 0){console.log("error code");}
//   else{
//     console.log(response.body.features[0].center[0]);
//     console.log(response.body.features[0].center[1]);
//   }
//  })

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWhhbmJvc2UiLCJhIjoiY2ticDNraHB3MjhxcjJ5bHN1cTdiOGR0aCJ9.YqUsoAfNAY77tpGeItojWA&limit=1';
  request({ url: url,json: true},(error,{body}) =>{
    if(error){
      callback('Unable to connect to location services!',undefined);
    }else if(body.features.length === 0){
      callback('Unable to find location.Try another search',undefined);
    }
    else{
      callback(undefined,{
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode;