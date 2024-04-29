import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { Text, View, Button, Platform, StyleSheet } from "react-native";
import { set } from "react-native-reanimated";

import { GiftedChat } from "react-native-gifted-chat";
import { Avatar, ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

//redux
import { useDispatch, useSelector } from "react-redux";

var counter = true;
var newMessage = "";
var oldMessage = "";
var globalMessages = [];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsHandeling({ navigation }) {
  //driver token
  const driverExpoToken = useSelector(
    (state) => state.entities.DriverOrderInfo.list.driverExpoToken
  );
  const driverName = useSelector(
    (state) => state.entities.DriverOrderInfo.list.driverName
  );

  //student token
  const studentExpoToken = useSelector(
    (state) => state.entities.userSlice.student.pushNotificationToken
  );
  const studentFirstName = useSelector(
    (state) => state.entities.userSlice.student.firstName
  );
  const studentLastName = useSelector(
    (state) => state.entities.userSlice.student.lastName
  );
  const studentID = useSelector(
    (state) => state.entities.userSlice.student._id
  );

  // chat details
  const [messages, setMessages] = useState([]);

  const [chatFlag, setChatFlag] = useState(false);
  let i = 0;
  var receiveBuffer = [];

  // setTimeout(async () => {

  // }, 10);

  const sendMessage = async (messages) => {
    const message = {
      to: driverExpoToken,
      sound: "default",
      title: "رسالة جديدة",
      body: studentFirstName + " " + studentLastName,
      data: {
        text: messages,
        userId: studentID,
        type: "message",
        userName: studentFirstName + " " + studentLastName,
        userExpoPushNotificationToken: studentExpoToken,
        avatar: "",
      },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    // globalMessages.push(messages[0].text);
    globalMessages.push(messages);

    sendMessage(messages[0].text);
  }, []);

  //

  const [pushNotificationToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  const [gate, setGate] = useState("");
  const [code, setCode] = useState("");

  //for chat
  const [userId, setUserId] = useState("");
  const [userExpoPushNotificationToken, setUserExpoPushNotificationToken] =
    useState("");
  const [dataMessage, setDataMessage] = useState("");

  const [flagChat, setFlagChat] = useState(true);
  const notificationListener = useRef();
  const responseListener = useRef();
  //me
  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(async () => {
    await registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        if (notification.request.content.data.type === "message") {
          counter = !counter;

          console.log(notification.request.content.data.text);

          globalMessages.push({
            _id: Math.round(Math.random() * 1000000),
            text: notification.request.content.data.text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: driverName,
            },
          });

          console.log(globalMessages);

          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, {
              _id: Math.round(Math.random() * 1000000),
              text: notification.request.content.data.text,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: driverName,
              },
            })
          );
        }
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {}
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <NavigationEvents />

      <View style={styles.headerViewSty}>
        <Avatar
          rounded
          title={driverName}
          containerStyle={{ backgroundColor: "#3d4db7" }}
          size="medium"
        />

        <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
          <Text style={styles.headerTextSty}>{driverName}</Text>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        // messages={globalMessages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name: studentFirstName + " " + studentLastName,
        }}
      />
    </>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token); // expo puah token
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

NotificationsHandeling.navigationOptions = () => {
  return {
    title: "الدردشة",
  };
};

const styles = StyleSheet.create({
  headerViewSty: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 10,
    height: 70,
    // borderRadius: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  headerTextSty: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "black",
  },
});
