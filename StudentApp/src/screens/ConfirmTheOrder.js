import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import { useNavigation } from "@react-navigation/native";

import { Notifier, Easing } from 'react-native-notifier';

import { useDispatch, useSelector } from "react-redux";
import { storeTheOrder } from "../store/FullOrder";

//Notifications
import NotificationsOrder from "../../../src/services/NotificationsOrder";

const getImage = (type) => {
  if (type === 'حافلة') {
    return require('../assets/images/Van.png');
  }
  if (type === 'باص') {
    return require('../assets/images/Bus.png');
  }
  if (type  === 'تكسي') {
    return require('../assets/images/Taxi.png');
  }
}

const getWeight = (type) => {
  if (type === 'حافلة') {
    return 7;
  }
  if (type === 'باص') {
    return 50;
  }
  if (type  === 'تكسي') {
    return 4;
  }
}

const getDistance = (type) => {
  if (type === 'حافلة') {
    return 4;
  }
  if (type === 'باص') {
    return 4;
  }
  if (type  === 'تكسي') {
    return 4;
  }
}

const getTime = (type) => {
  if (type === 'حافلة') {
    return 7;
  }
  if (type === 'باص') {
    return 10;
  }
  if (type  === 'تكسي') {
    return 5;
  }
}


const ConfirmTheOrder = ( { navigation }) => {
    const dispatch = useDispatch();


    const carType = useSelector(state => state.entities.FullOrder.list.car.type)
    const carPrice = useSelector(state => state.entities.FullOrder.list.car.price)

    const time = useSelector(state => state.entities.FullOrder.list.time.value)
    const distance = useSelector(state => state.entities.FullOrder.list.distance.value)

    const fullOrder = useSelector(state => state.entities.FullOrder.list)



  return (
    <View style={styles.container}>
      <View style={styles.TopTextContainer}>
        <Text style={styles.TopText}>{carType}</Text>
      </View>

      <View style={styles.ImageContainer}>
      <View
        style={[
          styles.shadowContainerStyle,
          {
            width: 330,
            margin: 20,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'white'
          },
        ]}
      >
        <Image
          style={styles.image}
          source={getImage(carType)}
        />
      </View>
      </View>

      <View style = {styles.MetricsInfo}>
        <View style = {styles.distanceIconContainer}>
           <FontAwesome5 name="road" size={50} color="#ffd813" />
           <Text style = {styles.TopTextMetric}>المسافة</Text>
           <Text style = {styles.BottomTextMetric}>{distance.replace(' km', '')} كم</Text>
        </View>

        <View style = {styles.distanceIconContainer}>
           <Ionicons name="time" size={50} color="#ffd813" />
           <Text style = {styles.TopTextMetric}>الوقت</Text>
           <Text style = {styles.BottomTextMetric}>{time.replace(' mins', '')} دقيقة</Text>
        </View>

        <View style = {styles.distanceIconContainer}>
           <Ionicons name="people" size={50} color="#ffd813" />
           <Text style = {styles.TopTextMetric}>سعة المركبة</Text>
           <Text style = {styles.BottomTextMetric}>{getWeight(carType)} ركاب</Text>
        </View>
      </View>



<View style = {styles.Footer}>
      <View style = {styles.priceContainer}>
           <Text style = {styles.priceRightText}>السعر</Text>
           <Text style = {styles.priceLeftText}>₪ {carPrice}</Text>
      </View>

    {/* Button */}
    <View style = {{alignItems: 'center'}}>
      <TouchableOpacity  onPress={() => {
         setTimeout(() => {
          Notifier.showNotification({
            title: 'تم تقديم طلبك',
            description: 'سنرسل لك اشعار في حال تم قبول طلبك',
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            onHidden: () => console.log('Hidden'),
        
            swipeEnabled: true
          });
        }, 3000)

        //store Full order redux into the database
        dispatch(storeTheOrder({
          origin: fullOrder.origin,
          destination: fullOrder.destination,
          car: fullOrder.car
        }));
        

      navigation.navigate('HomeScreen')
    }
    } style={{
        backgroundColor: '#FFD428',
        padding: 10,
        margin: 10,
        width: '85%',
        alignItems: 'center',
        borderRadius: 70
      }}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
          تأكيد الطلب
        </Text>
      </TouchableOpacity>
      </View>

      </View>

      <NotificationsOrder /> 
    </View>
  );
};

ConfirmTheOrder.navigationOptions = () => {
  return {
    headerShown: false,

  };

};


export default ConfirmTheOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  TopTextContainer: {
    margin: 20,
  },
  TopText: {
    fontSize: 60,
    fontWeight: "bold",
  },
  ImageContainer: {
    //   backgroundColor: 'white',
      alignItems: 'center'
  },
  image: {
    // height: 70,
    // width: 80,
    height: 250,
    width: 250,
    resizeMode: "contain",
  },

  shadowContainerStyle: {
    //<--- Style with elevation
    borderWidth: 4,
    borderRadius: 30,
    borderColor: "#ddd",
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },

  MetricsInfo: {
      flexDirection: 'row-reverse',
      margin: 13,
      justifyContent: 'space-between'
    //   backgroundColor: 'red'
  },


  distanceIconContainer:{
    //   backgroundColor: 'red',
      alignItems: 'center'

  },
  TopTextMetric: {
      fontWeight: 'bold',
      fontSize: 15
  },

  BottomTextMetric:{
      fontWeight: 'bold',
      fontSize: 25
  },
  priceContainer: {
    //   backgroundColor: 'red',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      margin: 10
  },
  priceRightText:{
    fontWeight: 'bold',
    fontSize: 25
  },
  priceLeftText:{
    fontWeight: 'bold',
    fontSize: 25
  },

  Footer: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'flex-end'

  }
});
