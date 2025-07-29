import { setDestination } from '@/slices/navSlice'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import NavFavorites from './NavFavorites'

const NavigateCard = ({nextScreen}: {nextScreen: () => void}) => {
    const googleMapApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
    const dispatch = useDispatch()


  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Goor Morning, Farhan</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
            <View>
                <GooglePlacesAutocomplete
                    placeholder='Where to?'
                    debounce={400}
                    styles={{
                        container: {
                            backgroundColor: "white",
                            paddingTop: 20,
                            flex: 0
                        },
                        textInput: {
                            backgroundColor: "#DDDDDF",
                            borderRadius: 0,
                            fontSize: 18,
                        },
                        textInputContainer: {
                            paddingHorizontal: 20,
                            paddingBottom: 0
                        }
                    }}
                    query={{
                        key: googleMapApiKey,
                        language: "en",

                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    keyboardShouldPersistTaps='handled'
                    predefinedPlaces={[]}
                    textInputProps={{}}
                    minLength={1}
                    timeout={400}
                    onPress={(data, details=null) => {
                        // console.log(data)
                        // console.log(details)
                        dispatch(setDestination({
                            location: details?.geometry.location,
                            description: data.description
                        }))
                        nextScreen()
                    }}

                />
            </View>
            <NavFavorites />
        </View>
        <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
            <TouchableOpacity
            onPress={() => nextScreen()}
            style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}>
                <Icon name="car" type="font-awesome" color="white" size={16} />
                <Text style={tw`text-white text-center`}>Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex flex-row w-24 px-4 py-3 rounded-full justify-between`}>
                <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                <Text style={tw`text-center`}>Eats</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default NavigateCard