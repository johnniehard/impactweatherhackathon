import React, { useState, useEffect, useRef } from 'react'
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from 'mapbox-gl'

function Map({ data }) {

    const [map, setMap] = useState(null);

    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    const ref = useRef(null);

    const setPoints = (e) => {
        console.log(e)
        console.log('click', from, to)

        if (!from) {
            setFrom([e.lngLat.lng, e.lngLat.lat].join(','))
        } else if (!to) {
            console.log('setting to')

            setTo([e.lngLat.lng, e.lngLat.lat].join(','))
        }
    }

    // Initialize map
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtbHVrZXNreSIsImEiOiJjamV0MW9rbTQwdjM2MnJvYnVmaTVwMTF4In0.865aEaV_zPu8st9-vXNeFg'
        const map = new mapboxgl.Map({
            container: ref.current,
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: [18.01579938373959, 59.342619596215286],
            zoom: 11
        })

        map.on("load", () => {
            setMap(map)

            map.addSource('precip', {
                'type': 'geojson',
                'data': null
            });

            map.addLayer({
                'id': 'precip',
                'type': 'circle',
                'paint': {
                    "circle-color": {
                        "property": "value",
                        "stops": [
                            [0.2, "khaki"],
                            // [20, "#fee0d2"],
                            // [30, "#fcbba1"],
                            // [40, "#fc9272"],
                            [10, "orange"],
                            // [60, "#ef3b2c"],
                            // [70, "#cb181d"],
                            // [80, "#a50f15"],
                            [20, "red"]
                        ]
                    },
                    'circle-opacity': 0.8,
                    'circle-radius': 5
                },
                'source': 'precip'
            });

            map.addSource('route', {
                'type': 'geojson',
                'data': null
            });

            map.addLayer({
                'id': 'route',
                'type': 'line',
                'paint': {
                    'line-color': 'red',
                    'line-opacity': 0.8,
                    'line-width': 5
                },
                'source': 'route'
            });

            map.on('click', (e) => {
                setPoints(e)
            })



            // map.getSource('precip').setData(JSON.parse(localStorage.getItem('ourdata')))

        })

    }, [])

    useEffect(() => {
        console.log(from, to)
        if (from && to) {
            const getData = async () => {
                const route = await fetch(`https://skolor.geoinfobyran.se/osrm/route?from=${from}&to=${to}`)

                const json = route.json()

                map.getSource('precip').setData(json)


            }

            getData()

        }
    }, [from, to])


    const addDataToMap = (data) => {
        console.log('setting source')
        console.log(map.getSource('precip'))
        try {
            console.log(data)
            map.getSource('precip').setData(data)
        } catch (e) {
            console.error(e)
        }
        console.log('sett source')
    }

    if (data) {
        if (!map){
            console.log('no map waiting')
            setTimeout(() => {
                addDataToMap(data)
            }, 2000)
        } else {
            console.log('map, no wait')
            addDataToMap(data)
        }
       
    }

    return (
        <div className="Map" ref={el => (ref.current = el)} />
    )

}

export default Map