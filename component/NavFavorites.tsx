import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const NavFavorites = () => {

  const data = [
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "CodeStreet, London, UK"
    },
    {
      id: "456",
      icon: "work",
      location: "Work",
      destination: "London eye, London, UK"
    }
  ]

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={data}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, {height: 0.5}]} />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center p-4`}>
          <Icon style={tw`mr-4 rounded-full bg-gray-300 p-3`} name={item.icon} type='anticon' color={"white"} size={32} />
          <View>
            <Text style={tw`font-semibold text-lg`}>
              {item.location}
            </Text>
            <Text style={tw`text-gray-500`}>
              {item.destination}
            </Text>
          </View>
        </TouchableOpacity>
      )}

    />
  )
}

export default NavFavorites