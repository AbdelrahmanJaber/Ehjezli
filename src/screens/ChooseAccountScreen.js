import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity  } from 'react-native';
import Svg, {SvgXml, Defs } from 'react-native-svg';

import chooseAccountLogo from "../../assets/chooseAccountLogo"


import WavyHeader from '../components/WavyHeader';
import {LinearGradient} from 'expo-linear-gradient';

const ChooseAccountScreen = ({ navigation }) =>  {
  return (
    <View style={styles.container}>
    <StatusBar hidden={true} />

    <View style={styles.container1}>
    <LinearGradient
        colors={['rgb(28,158,212)', 'rgb(255,255,255)']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={styles.container1}
      >
       
    <SvgXml xml={chooseAccountLogo} width="100%" height="100%" />

    </LinearGradient>
    </View>

    
    <View style={styles.container2}>
    <WavyHeader/>

    <TouchableOpacity onPress={() => {navigation.navigate("SignupStudent")}}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{x: 1, y: 1 }}
          colors={['rgb(28,158,212)', 'rgb(255,255,255)']}
          style={styles.button}
          >
          <Text style={styles.buttonText}>
            تسجيل الدخول كطالب
          </Text>
        </LinearGradient>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => {navigation.navigate('SignupDriver')}}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{x: 1, y: 1 }}
          colors={['rgb(255,255,255)', 'rgb(28,158,212)']}
          style={styles.button}
          >
          <Text style={styles.buttonText}>
            تسجيل الدخول كسائق
          </Text>
        </LinearGradient>
        </TouchableOpacity>
    

    </View>

</View>

  );
}

ChooseAccountScreen.navigationOptions = () => {
  return {
    headerShown: false,

  };

};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(82, 222, 250)',
    flex: 1,
  },
  container1: {
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: '#rgb(225, 237, 245)',
    alignItems: "center",
    
  },
  container3: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    width: "70%",
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30
  },
  buttonText: {
    color: 'rgb(75, 125, 250)',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default ChooseAccountScreen;

