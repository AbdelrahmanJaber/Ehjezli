import React, { useState, useCallback, useEffect, useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { NavigationEvents } from "react-navigation";

var counter = true;
import { Context as appDataContext } from "../../context/AppDataContext";
const ChatDetail = (props) => {
  const { state, getDriverChats, saveMessage, newMessage } =
    useContext(appDataContext);

  const [messages, setMessages] = useState(
    props.navigation.state.params.content
  );


  const [chatFlag, setChatFlag] = useState(false);
  let i = 0;
  var receiveBuffer = [];
  const checkNewMessage = async () => {
    await newMessage({ flag: false });

    await saveMessage({
      userId: state.newMessage.userId,
      userExpoPushNotificationToken:
        state.newMessage.userExpoPushNotificationToken,
      text: state.newMessage.text,
      userName: state.newMessage.userName,
      _id: 2,
      avatar: state.newMessage.avatar,
    });
    await getDriverChats();
  };

  setTimeout(async () => {
    if (state.messageFlag) {
      counter = !counter;
      await newMessage({ flag: false });

      if (counter) {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, {
            _id: Math.round(Math.random() * 1000000),
            text: state.newMessage.text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: state.newMessage.userName,
            },
          })
        );
        checkNewMessage();
      }
    }
  }, 10);

  useEffect(async () => {}, []);

  const sendMessage = async (messages) => {
    const message = {
      to: props.navigation.state.params.userExpoPushNotificationToken,
      sound: "default",
      title: "رسالة جديدة",
      body: state.driver_data.firstName,
      data: {
        text: messages,
        userId: state.driver_data._id,
        type: "message",
        userName:
          state.driver_data.firstName + " " + state.driver_data.lastName,
        userExpoPushNotificationToken: state.driver_data.pushNotificationToken,
        avatar: state.driver_data.avatar,
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

    // messages.pop()
    await saveMessage({
      userId: props.navigation.state.params.userId,
      userExpoPushNotificationToken:
        props.navigation.state.params.userExpoPushNotificationToken,
      text: messages[0].text,
      userName: props.navigation.state.params.userName,
      _id: 1,
      avatar: props.navigation.state.params.avatar,
    });
    await getDriverChats();
    // setMessages(state.chats.chats[props.navigation.state.params.key].content.reverse());
    sendMessage(messages[0].text);
  }, []);

  const onReceive = useCallback((messages = []) => {}, []);

  const getChatContent = async () => {
    await getDriverChats();
  };

  return (
    <>
      <NavigationEvents />

      <View style={styles.headerViewSty}>
        <Avatar
          rounded
          title={
            props.navigation.state.params.userName[0] +
            props.navigation.state.params.userName[
              props.navigation.state.params.userName.length - 1
            ]
          }
          containerStyle={{ backgroundColor: "#3d4db7" }}
          size="medium"
        />

        <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
          <Text style={styles.headerTextSty}>
            {" "}
            {props.navigation.state.params.userName}
          </Text>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
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
export default ChatDetail;
