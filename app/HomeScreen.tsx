import NavFavorites from '@/component/NavFavorites'
import React from 'react'
import { Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "tailwind-react-native-classnames"
import NavOptions from '../component/NavOptions'

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png"}} 
         style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
         }} />
         <NavOptions />
         <NavFavorites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen