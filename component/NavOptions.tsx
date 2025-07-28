import { selectOrigin, setDestination, setOrigin } from '@/slices/navSlice'
import { router } from 'expo-router'
import React, { useRef } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import 'react-native-get-random-values'
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen"
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen"
  }

]

const NavOptions = () => {

  const googleMapApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
  console.log("INI ADALAH GOOGLE MAP API KEY", googleMapApiKey);

  const dispatch = useDispatch()
  const origin = useSelector(selectOrigin)

  const navRef = useRef<GooglePlacesAutocompleteRef>(null)

  return (
    <View>
      {/* <Text>NavOptions</Text> */}
      <GooglePlacesAutocomplete
        ref={navRef}
        placeholder="Where From?"
        styles={{
          container: {
            flex: 0
          },
          textInput: {
            fontSize: 18
          }

        }}
        query={{
          key: googleMapApiKey,
          language: "en"
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
        predefinedPlaces={[]}
        textInputProps={{}}
        minLength={1}
        timeout={400}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          console.log(data)
          console.log(details)
          dispatch(setOrigin({
            location: details?.geometry.location,
            description: data.description
          }))

          dispatch(setDestination(null))
        }}
        fetchDetails={true}
        keyboardShouldPersistTaps='handled'

      />

      <TouchableOpacity onPress={() => navRef.current?.clear()} style={tw`-mt-2 ml-4`}>
        <Text style={tw`text-gray-500`}>
          Clear
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id}
            disabled={!origin}
            onPress={() => router.push(item.screen as any)}
            style={tw`p-2 pl-4 pb-8 pt-4 bg-gray-200 m-2 w-30`}
          >
            <View style={tw`${!origin ? "opacity-20" : ""}`}>
              <Image source={{ uri: item.image }} style={{ width: 120, height: 120, resizeMode: "contain" }} />
              <Text style={tw`mt-2 text-lg font-semibold`}>
                {item.title}
              </Text>
              <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`} name="arrowright" type="antdesign" color="white" />
            </View>
          </TouchableOpacity>
        )} />
    </View>
  )
}

export default NavOptions