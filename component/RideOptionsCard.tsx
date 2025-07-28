import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const RideOptionsCard = ({prevScreen}: {prevScreen: () => void}) => {
  return (
    <View>
        <TouchableOpacity onPress={prevScreen}>
            <Text>
                Go back
            </Text>
        </TouchableOpacity>
      <Text>RideOptionsCard</Text>
    </View>
  )
}

export default RideOptionsCard