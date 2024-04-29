import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DummyScreen() {
    return (
        <View style = {styles.container}>
            <Text>Hello World</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


DummyScreen.navigationOptions = () => {
    return {
      headerShown: false,
  
    };
  
  };
  
  

