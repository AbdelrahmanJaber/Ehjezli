import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { Context as appDataContext } from "../../context/AppDataContext";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { NavigationEvents } from "react-navigation";

//expo

import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
//
var counter = true;
const Chat = ({ navigation }) => {
  const { state, searchDriverByName, newMessage, saveMessage, getDriverChats } =
    useContext(appDataContext);

  const [messages, setMessages] = useState([]);
  const [driverName, setDriverName] = useState("");

  const [showResultSearch, setShowResultSearh] = useState(false);

  //for chat

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
        checkNewMessage();
      }
    }
  }, 10);

  useEffect(() => {
    //  checkNewMessage();
  }, []);

  var buffer1 = [];

  buffer1 = state.driversFromSearch;
  const renderDiversFromSearch = () => {
    return buffer1.map((obj, index) => {
      // console.log(obj)
      const key = index;

      //"{obj.content[0].user.name}"
      // console.log(obj.content[0].user.name)

      if (state.driver_data._id != obj._id) {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NewChatDetail", {
                userId: obj._id,
                userExpoPushNotificationToken: obj.pushNotificationToken,
                userName: obj.firstName + " " + obj.lastName,
                avatar: obj.avatar,
              });
            }}
            style={styles.resultViewSty}
            key={key}
          >
            <Avatar
              rounded
              //source={{ uri: `data:image/png;base64,${avatar}` }}
              //   source={{ uri: obj.avatar }}
              title={obj.firstName[0] + obj.lastName[0]}
              containerStyle={{ backgroundColor: "#3d4db7" }}
              size="medium"
              //  activeOpacity={0.7}
            />

            <Text style={styles.searchTextSty}>
              {obj.firstName} {obj.lastName}
            </Text>
          </TouchableOpacity>
        );
      }
    });
  };

  const searchFunction = async () => {
    //console.log("1")
    await searchDriverByName({ driverName });

    //driversFromSearch
  };

  const openChat = (pushNotificationToken) => {
    // console.log(pushNotificationToken)
  };

  var buffer = [];
  if (state.chats) {
    if (state.chats.chats) {
      buffer = state.chats.chats;
    }
  }

  const renderChats = () => {
    return buffer.map((obj, index) => {
      //  console.log(obj)
      const key = index;

      //"{obj.content[0].user.name}"
      // console.log(obj.content[0].user.name)

      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatDetail", {
              avatar: obj.avatar,
              userName: obj.name,
              userId: obj.userId,
              userExpoPushNotificationToken: obj.userExpoPushNotificationToken,
              content: obj.content.reverse(),
              key: key,
            });
          }}
          style={styles.resultViewSty}
          key={key}
        >
          <Avatar
            title={obj.name}
            rounded
            //source={{ uri: `data:image/png;base64,${avatar}` }}
            //   source={{ uri: obj.avatar }}
            title={obj.name[0] + obj.name[obj.name.length - 1]}
            containerStyle={{ backgroundColor: "#3d4db7" }}
            size="medium"
            //  activeOpacity={0.7}
          />

          <Text style={styles.searchTextSty}>{obj.name}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <>
      <NavigationEvents
        onWillFocus={() => {
          setDriverName("");
          searchFunction();
        }}
      />

      <ScrollView>
        <View style={{ flexDirection: "column", height: "90%" }}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            {state.driversFromSearch && driverName ? (
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "gray",
                  width: "90%",
                  borderRadius: 15,
                }}
              >
                <Text style={{ marginRight: 15, fontWeight: "bold" }}>
                  نتائج البحث
                </Text>
                {renderDiversFromSearch()}
              </View>
            ) : null}
          </View>

          <View>
            <Text style={{ marginRight: 15, fontWeight: "bold" }}>
              المحادثات السابقة
            </Text>

            {state.chats ? (state.chats.chats ? renderChats() : null) : null}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  searchBarViewSty: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 40,
    borderTopColor: "black",
    borderTopWidth: 2,
    borderRightColor: "black",
    borderRightWidth: 1.5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 0.5,
  },

  resultViewSty: {
    height: 60,
    width: "94%",
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginBottom: 5,
  },
  searchTextSty: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
  },
  textInputSearchSty: {
    marginHorizontal: 10,
    marginLeft: 10,
    width: "85%",
  },
  searchIconSty: {
    marginLeft: 10,
  },
  buttomViewSty: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgb(108, 214, 147)",
    width: 200,
    margin: 10,
    paddingHorizontal: 15,
  },
});

export default Chat;
