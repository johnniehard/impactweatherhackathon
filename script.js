const fetch = require('node-fetch')


// console.log('lkjdf', process.env.ERICSSON_AUTH)
async function getdata(date){
    try{

        // const headers = new Headers()
        // headers.append('Authorization', `process.env.ERICSSON_AUTH)
        const response = await fetch(`https://demo-apim.westeurope.cloudapp.azure.com/api_secure/PrecipitationAPI/3.0.0/weather/precipitation/at/${date}?location=stockholm`, {
            headers: {
                Authorization: `Bearer ${process.env.ERICSSON_AUTH}`
            }
        })
        const json = await response.json()
        

        const featurecollection = {
            "type": "FeatureCollection",
            "features": json.points
          }
        console.log(JSON.stringify(featurecollection))
    } catch(e){
        console.error(e)
    }
}

getdata('201909070900')