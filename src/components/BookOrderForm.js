import React, { useState, useContext, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";

//expo icons
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { Context as appDataContext } from "../context/AppDataContext";
const BookOrderForm = ({ gate, code }) => {
  //{ newOrder, onDecline, onAccept, duration, distance }
  const {
    state,
    receiveNotification,
    newOrder,
    addNewOrder,
    acceptOrderContext,
    setPrice,
    deleteAvaiableDrivers,
  } = useContext(appDataContext);

  const [currentDate, setCurrentDate] = useState("");
  const [hideOrder, setHideOrder] = useState(false);
  var totalOrdersInCurrentDay = 0;
  const acceptOrder = () => {
    addNewOrder({ gate: state.newOrder.gate, code: state.newOrder.code });
    newOrder({ flag: false });
    setPrice({ price: state.newOrder.totalPrice });
    deleteAvaiableDrivers();
  };
  const rejectOrder = () => {
    //setHideOrder(true)
    newOrder({ flag: false });
  };

  const getCurrentDate = () => {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date();
    var dayName = days[d.getDay()];

    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    setCurrentDate(year + "-" + month + "-" + date); //format: dd-mm-yyyy;
  };
  useEffect(() => {
    getCurrentDate();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.popupContainer}>
        <View style={styles.TitleViewSty}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "black",
              marginLeft: 10,
            }}
          >
            طلب جديد
          </Text>
          <FontAwesome5 name="smile-wink" size={50} color="#FFD428" />
        </View>
        <View style={styles.TitleViewSty}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "gray",
              marginLeft: 10,
            }}
          >
            البوابة:
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            {gate}
          </Text>
        </View>

        <View style={styles.TitleViewSty}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "gray",
              marginLeft: 10,
            }}
          >
            الكود:
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            {code}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <TouchableOpacity
            style={styles.TouchableOpacitySty}
            onPress={acceptOrder}
          >
            <Text style={{ fontSize: 18, marginLeft: 10 }}>قبول</Text>

            <AntDesign name="checkcircleo" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    padding: 20,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
    backgroundColor: "#00000050",
  },
  popupContainer: {
    justifyContent: "space-around",
    backgroundColor: "rgba(109,206,128,0.8)",
    borderRadius: 50,
    alignItems: "center",
    height: "40%",

    marginTop: "60%",
  },
  TitleViewSty: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  TouchableOpacitySty: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "white",
    width: 90,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginBottom: 30,
  },
  minutes: {
    color: "lightgrey",
    fontSize: 36,
  },
  distance: {
    color: "lightgrey",
    fontSize: 26,
  },
  uberType: {
    color: "lightgrey",
    fontSize: 20,
    marginHorizontal: 10,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  userBG: {
    backgroundColor: "#1495ff",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  declineButton: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 50,
    width: 100,
    alignItems: "center",
  },
  declineText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BookOrderForm;
