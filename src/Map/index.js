import React, { useState, useEffect, useRef } from 'react'
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from 'mapbox-gl'

function Map() {

    const [map, setMap] = useState(null);

    const ref = useRef(null);

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
                    'circle-color': 'red',
                    'circle-opacity': 0.8,
                    'circle-radius': 5
                },
                'source': 'precip'
            });

            map.getSource('precip').setData(JSON.parse(localStorage.getItem('ourdata')))

        })

    }, [])

    // if (map && data) {
    //     console.log('setting source')
    //     try {
    //         console.log(data)
    //         map.getSource('precip').setData(data)
    //     } catch(e){
    //         console.error(e)
    //     }
    //     console.log('sett source')
    // }

    return (
        <div className="Map" ref={el => (ref.current = el)} />
    )

}

export default Map