import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import WavyHeader from '../components/WavyHeader';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  ElMessiri_400Regular,
  ElMessiri_500Medium,
  ElMessiri_600SemiBold,
  ElMessiri_700Bold,
} from '@expo-google-fonts/el-messiri';
export default LogInHeader = () => {

  let [fontsLoaded] = useFonts({
    ElMessiri_400Regular,
    ElMessiri_500Medium,
    ElMessiri_600SemiBold,
    ElMessiri_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    <View style={styles.container}>
    
    <WavyHeader customStyles={styles.svgCurve} />

    <Image source={require('./../../assets/TaxiLogo.png')}
       style={styles.icon} />  

    <Text style={styles.headerText}>احجزلي</Text>

     </View>
    
  )
  }//end else
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: 'rgb(230,230,230)',
    alignItems: 'center'
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'ElMessiri_700Bold',
  },
  icon: {
    width: 120,
    height: 120,
    marginTop: 0
  
  }
});