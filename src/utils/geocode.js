const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW50aG9ueWxpdXNkeSIsImEiOiJja3VxbXh1amYwYnBtMndxamZrZnpkOWNqIn0.jgJ5sY8EdqlmyDpiWTMn-Q'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }else{
            const data = {
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports=geocode