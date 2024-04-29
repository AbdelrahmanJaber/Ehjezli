
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import { RFPercentage} from "react-native-responsive-fontsize";
import ResponsiveImage from 'react-native-responsive-image';


import {
  useFonts,
  ElMessiri_400Regular,
  ElMessiri_500Medium,
  ElMessiri_600SemiBold,
  ElMessiri_700Bold,
} from '@expo-google-fonts/el-messiri';

const WelcomeScreen= ({navigation}) =>
{

  let [fontsLoaded] = useFonts({
    ElMessiri_400Regular,
    ElMessiri_500Medium,
    ElMessiri_600SemiBold,
    ElMessiri_700Bold,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

   
  return(

    <View style = {styles.container}>

    <View style = {styles.imageView}>
       <ResponsiveImage style={styles.Image} source={require('./../../assets/TaxiLogo.png')} initWidth="150" initHeight = "150" />
       </View>
       <View>
       <Text style = {styles.welcomeText}>احجزلي</Text>
       </View>

    </View>
    

  );
      

  } // end else

} // End App


const styles = StyleSheet.create({

  container:{

    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#ffd813"
  },

  Image: {
  
    resizeMode:'contain'
    
  },
  imageView:
  {
    justifyContent:"center",
    alignItems:"center"
  },
  welcomeText:{
    
    fontSize:RFPercentage(6),
    color:"black",
    fontFamily: 'ElMessiri_700Bold',
   
 

  }


});

export default WelcomeScreen ;



