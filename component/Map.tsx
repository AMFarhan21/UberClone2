import { selectDestination, selectOrigin, setTravelTimeInformation } from '@/slices/navSlice';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';


const Map = () => {


  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const googleMapApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
  const mapRef = useRef(null)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50
      }
    })
  }, [origin, destination])

  useEffect(() => {
    if (!origin || !destination) return
    const getTravelTime = async () => {
      await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${googleMapApiKey}`).then((res) => res.json()).then((data) => {
        // console.log(data)
        // const element = data.rows[0].elements[0]
        // console.log(element)
        dispatch(setTravelTimeInformation(
          data.rows[0].elements[0]
        ))
      })
    }

    getTravelTime()

  }, [origin, destination, googleMapApiKey])

  return (
    <MapView
      ref={mapRef}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={tw`flex-1`}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={googleMapApiKey!}
          strokeColor='black'
          strokeWidth={3}

        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default Map