import Map from '@/component/Map'
import NavigateCard from '@/component/NavigateCard'
import RideOptionsCard from '@/component/RideOptionsCard'
import React, { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'

const MapScreen = () => {

  const [currentScreen, setCurrentScreen] = useState('NavigateCard')

  return (
    <SafeAreaView>
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