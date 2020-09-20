//Imports
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const cors = require('cors');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { request } = require('http');
//Path
const pathTOtemplates = path.join(__dirname,'../templates/views')
const pathTOpublic = path.join(__dirname,'../public')
const pathTOpartials = path.join(__dirname,'../templates/partials')

//Define Production Port
const port = process.env.PORT ||3000

//serving static
app.use(express.static(pathTOpublic));
//enable cors
app.use(cors());
//sessions messages

//configs
app.set('view engine','hbs');
app.set('views',pathTOtemplates);
hbs.registerPartials(pathTOpartials);


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

//Routes

//test query strings
// app.get('/products',(req,res)=>{
//   if(!req.query.search){
//     return res.send({
//       error: 'Must provide a search term'
//     });
//   }
  
//   console.log(req.query);
//   res.send({products: []});

// })


//Weather Page
app.get('/',(req,res)=>{
  res.render('weather');
})

app.get('/weather',(req,res)=>{
  if(!req.query.location){
    return res.send({
      error: 'Must provide a location'
    });
  }
  geocode(req.query.location,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({error})
    }
   
    forecast(latitude,longitude,(error,{time,windspeed,humidity,weather_desc,temperature,country}={})=>{
      if(error){
        return res.send({error});
      }


     return res.send({time,
        windspeed,
        humidity,
        weather_desc,
        temperature,
        country,
        address: req.query.location,
     })

   })
  }) 
})

app.get('/dashboard',(req,res)=>{
  res.render('dashboard');
})

app.post('/dashboard',(req,res)=>{
  //console.log('I got a request');
  const data = req.body;
  console.log(data);
  
})

app.get('*',(req,res)=>{
  res.send("Error 404");
})
app.listen(port, ()=>{console.log("Server Started on Port"+port)});
