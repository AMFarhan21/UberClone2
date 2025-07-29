import { selectTravelTimeInformation } from '@/slices/navSlice'
import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'

const RideOptionsCard = ({ prevScreen }: { prevScreen: () => void }) => {

  const data = [
    {
      id: "Uber-X-123",
      title: "UberX",
      multiplier: 1,
      image: "https://links.papareact.com/3pn"
    },
    {
      id: "Uber-X-456",
      title: "UberXL",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8"
    },
    {
      id: "Uber-X-789",
      title: "Uber LUX",
      multiplier: 1.75,
      image: "https://links.papareact.com/7pf"
    },
  ]

  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  const surgeChargeRate = 1.5;

  // if(!travelTimeInformation?.duration) {
  //   return
  // }

  return (
    <View style={tw`bg-white flex-grow`}>
      <View style={tw`flex flex-row items-center w-full`}>
        <TouchableOpacity onPress={prevScreen} style={tw`text-left ml-4`}>
          <Icon name='chevron-back' type='ionicon' color={"black"} size={24} />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl mx-auto`}>Select a Ride - {travelTimeInformation?.distance?.text} </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity onPress={() => setSelected(item as any)} style={tw`flex-row items-center justify-between px-10 ${selected?.id === id ? "bg-gray-200" : ""}`}>
            <Image source={({ uri: image })} style={[tw`h-24 w-24`, {resizeMode: "contain"}]} />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}> {title} </Text>
              <Text> {travelTimeInformation?.duration?.text} </Text>
            </View>
            <Text style={tw`text-xl`}> {new Intl.NumberFormat('en-gb', {
              style: "currency",
              currency: "GBP"
            }).format(
              (travelTimeInformation?.duration?.value * surgeChargeRate * multiplier) / 100
            )} 
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
        disabled={!selected}
        style={tw`bg-black py-3 m-3 rounded-2xl ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title} </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RideOptionsCard