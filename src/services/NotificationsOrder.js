import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import { DriverOrderInfoAdded  } from "../../StudentApp/src/store/DriverOrderInfo";
import { codeAndGateAdded } from "../../StudentApp/src/store/codeAndGate";

import { storeExpoPushToken } from '../../StudentApp/src/store/expoToken'; 

import { navigate } from "../navigationRef";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



// export default function NotificationsOrder( {navigation} )  {
const NotificationsOrder = () => {

  const dispatch = useDispatch();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => 
      {setExpoPushToken(token)
         //store the token in the database
         dispatch(storeExpoPushToken({token}));
      }
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);

      if(notification.request.content.data.type === "order"){
        dispatch(DriverOrderInfoAdded(
          {carNumber: notification.request.content.data.carNumber,
          code: notification.request.content.data.code,
          driverName: notification.request.content.data.driverName,
          gate: notification.request.content.data.gate,
          type: notification.request.content.data.type,
  
          driverNumber: notification.request.content.data.driverNumber,
          driverExpoToken: notification.request.content.data.driverExpoToken,
  
        }
          ))
  
          dispatch(codeAndGateAdded({Code: notification.request.content.data.code, Gate: notification.request.content.data.gate}));
  
          navigate('after_Order_ConfirmedFlow')
      }

      else if (notification.request.content.data.type === "end"){
        navigate('HomeScreen')
      }
       
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
     null


  );
}

export default NotificationsOrder;

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}