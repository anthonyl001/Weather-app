const request = require('request')

const forecast = (a,b,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=5b0576c35f1cbe46a4c28a2254d76468&query='+a+','+b+'&units=f'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to api',undefined)
        }else if(body.error){
           callback('unable to find location',undefined)
        }
        else{
            const data ={
                description:body.current.weather_descriptions[0],
                temp:body.current.temperature,
                feelslike:body.current.feelslike
            }
            callback(undefined,body.current.weather_descriptions[0]+' Its Currently '+body.current.temperature+'. Its feels like '+body.current.feelslike+' degree out')
        }
    })
}

module.exports=forecast