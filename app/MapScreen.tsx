import Map from '@/component/Map'
import NavigateCard from '@/component/NavigateCard'
import RideOptionsCard from '@/component/RideOptionsCard'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const MapScreen = () => {

  const [currentScreen, setCurrentScreen] = useState('NavigateCard')

  return (
    <SafeAreaView>
        <TouchableOpacity  
        onPress={() => router.push("/HomeScreen")}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 w-12 h-12 p-3 rounded-full shadow-lg`}>
          <Icon name='menu' />
        </TouchableOpacity>
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2`}>
          {
            currentScreen == "NavigateCard" ? (
              <NavigateCard nextScreen={() => setCurrentScreen('RideOptionsCard')} />
            ) : (
              <RideOptionsCard prevScreen={() => setCurrentScreen("NavigateCard")} />
            )
          }
        </View>
    </SafeAreaView>
  )
}

export default MapScreen