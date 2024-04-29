import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { set } from 'react-native-reanimated';



import { Context as appDataContext } from '../context/AppDataContext';
//
import BookOrderForm from './../../src/components/BookOrderForm';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,



    }),


});





export default function NotificationsHandeling({ navigation }) {

    const { receiveNotification, newOrder, saveMessage, storeDriverExpoPushToken, getDriverChats, receiveMessage, newMessage } = useContext(appDataContext);
    const [pushNotificationToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);


    const [gate, setGate] = useState('')
    const [code, setCode] = useState('')


    //for chat 
    const [userId, setUserId] = useState('')
    const [userExpoPushNotificationToken, setUserExpoPushNotificationToken] = useState('')
    const [dataMessage, setDataMessage] = useState('')



    const [flagChat, setFlagChat] = useState(true)
    const notificationListener = useRef();
    const responseListener = useRef();
    //me
    const [isNewNotification, setIsNewNotification] = useState(false);


    useEffect(async () => {
        await registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
            storeDriverExpoPushToken({ pushNotificationToken: token })

        });


        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {

            // isInForeground = true;
            if (notification.request.content.data.type === "order") {

//console.log(notification.request.content.data)
                await newOrder({ flag: true })
                await receiveNotification({

                    gate: notification.request.content.data.gate,
                    code: notification.request.content.data.code,
                    gateLatitude: notification.request.content.data.gateLatitude,
                    gateLongitude: notification.request.content.data.gateLongitude,
                    studentInformation: notification.request.content.data.studentInformation,
                    totalPrice:notification.request.content.data.totalPrice,
                    studentsPushToken:notification.request.content.data.studentsPushToken

                });

            }

            else if (notification.request.content.data.type === 'message') {

                console.log(notification.request.content.data.userExpoPushNotificationToken)
                await receiveMessage({
                    type: "message",
                    userId: notification.request.content.data.userId,
                    userExpoPushNotificationToken: notification.request.content.data.userExpoPushNotificationToken,
                    text: notification.request.content.data.text,
                    userName: notification.request.content.data.userName,
                    _id: 2
                })

                await newMessage({ flag: true })


            }
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {


            if (response.notification.request.content.data.type === "order") {
                await newOrder({ flag: true });
                await receiveNotification({
                    gate: response.notification.request.content.data.gate,
                    code: response.notification.request.content.data.code,
                    gateLatitude: response.notification.request.content.data.gateLatitude,
                    gateLongitude: response.notification.request.content.data.gateLongitude,
                    studentInformation: response.notification.request.content.data.studentInformation,
                    totalPrice:response.notification.request.content.data.totalPrice,
                    studentsPushToken:response.notification.request.content.data.studentsPushToken
                });
            }


            else if (response.notification.request.content.data.type === 'message'){

                await receiveMessage({
                    type: "message",
                    userId: response.notification.request.content.data.userId,
                    userExpoPushNotificationToken: response.notification.request.content.data.userExpoPushNotificationToken,
                    text: response.notification.request.content.data.text,
                    userName:response.notification.request.content.data.userName,
                    _id: 2
                })

                await newMessage({ flag: true })
            }




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