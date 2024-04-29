import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { Avatar, Accessory } from "react-native-elements";

import { Notifier, Easing } from "react-native-notifier";

import { LogBox } from "react-native";

const getImage = (type) => {
  if (type === "حافلة") {
    return require("../assets/images/Van.png");
  }
  if (type === "باص") {
    return require("../assets/images/Bus.png");
  }
  if (type === "تكسي") {
    return require("../assets/images/Taxi.png");
  }
};

//Redux
import { useDispatch, useSelector } from "react-redux";
import { codeAndGateAdded } from "../store/codeAndGate";

import MapView, { PROVIDER_GOOGLE,Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import Path from "../assets/data/Path";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

//Notifications
import NotificationsOrder from "../../../src/services/NotificationsOrder";

const OrderConfirmed = ({ navigation }) => {
  const dispatch = useDispatch();
  const driverCarInfo = useSelector(
    (state) => state.entities.DriverOrderInfo.list
  );

  const orginName = useSelector(
    (state) => state.entities.FullOrder.list.origin.gateName
  );
  const destinationNameGeneral = useSelector(
    (state) => state.entities.FullOrder.list.destination.mainDestination
  );
  const destinationNameExact = useSelector(
    (state) => state.entities.FullOrder.list.destination.exactDestination
  );

  const originLongitude = useSelector(
    (state) => state.entities.FullOrder.list.origin.longitude
  );
  const originLatitude = useSelector(
    (state) => state.entities.FullOrder.list.origin.latitude
  );

  const destinationLongitude = useSelector(
    (state) => state.entities.FullOrder.list.destination.longitude
  );
  const destinationLatitude = useSelector(
    (state) => state.entities.FullOrder.list.destination.latitude
  );

  const carType = useSelector(
    (state) => state.entities.FullOrder.list.car.type
  );
  const carPrice = useSelector(
    (state) => state.entities.FullOrder.list.car.price
  );

  const time = useSelector((state) => state.entities.FullOrder.list.time.value);
  const distance = useSelector(
    (state) => state.entities.FullOrder.list.distance.value
  );

  const phoneNumberRedux = useSelector(
    (state) => state.entities.DriverOrderInfo.list.driverNumber
  );

  const callPhone = () => {
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phoneNumberRedux}`;
    } else {
      phoneNumber = `tel:${phoneNumberRedux}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  const Full_Order = useSelector((state) => state.entities.FullOrder.list);
  console.log(Full_Order);

  const mapRef = useRef(null);

  const origin = {
    latitude: originLatitude,
    longitude: originLongitude,
  };

  const destination = {
    latitude: destinationLatitude,
    longitude: destinationLongitude,
  };

  useEffect(() => {
    setTimeout(() => {
      mapRef.current.fitToCoordinates([origin, destination], {
        // edgePadding:{top:450,right:50,left:50,bottom:350},
        edgePadding: { top: 450, right: 20, left: 20, bottom: 350 },
        animated: true,
      });
    }, 500);
  }, []);

  return (
    <View>
      <View style={{ height: Dimensions.get("window").height * 0.55 }}>
        <MapView
        provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          showsUserLocation={true}
          initialRegion={{
            //An-Najah National University location
            //initial State

            latitude: 32.228317,
            longitude: 35.222017,

            latitudeDelta: 0.007999,
            longitudeDelta: 0.007999,
          }}
        >
          <Marker
            coordinate={{
              latitude: originLatitude,
              longitude: originLongitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={require("../assets/images/location.png")}
              style={styles.markerOrigin2}
              resizeMode="cover"
            />
          </Marker>

          <Marker
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={require("../assets/images/location.png")}
              style={styles.markerDestination}
              resizeMode="cover"
            />
          </Marker>

          <MapViewDirections
            origin={{
              latitude: originLatitude,
              longitude: originLongitude,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey=""
            strokeColor="black"
            strokeWidth={3}
          />
        </MapView>
      </View>

      <View
        style={[
          styles.card,
          { height: Dimensions.get("window").height * 0.45 },
        ]}
      >
        <View style={styles.driverInfo}>
          <View style={styles.driverRightContainer}>
            <Avatar
              //   containerStyle={{ marginBottom: 20 }}
              size="medium"
              rounded
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
            />
          </View>

          <View style={styles.driverMiddleContainer}>
            <Text style={styles.driverName}>{driverCarInfo.driverName}</Text>
            <View
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
            >
              <AntDesign name="star" size={20} color="yellow" />
              <Text
                style={{
                  marginRight: 5,
                  color: "gray",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                5
              </Text>
            </View>
          </View>

          <View style={styles.driverLeftContainer}>
            <TouchableOpacity
              style={styles.IconContainer}
              onPress={() => callPhone()}
            >
              <Feather name="phone-call" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.IconContainer, { backgroundColor: "#fede40" }]}
              onPress={() =>
                navigation.navigate("NotificationsHandelingStudentChat")
              }
            >
              <MaterialIcons name="message" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* from and to destination */}
        <View style={styles.FromToContainer}>
          {/* Circle near Origin input */}
          <View style={styles.circle}>
            <MaterialIcons name="my-location" size={24} color="#ffd813" />
          </View>

          {/* Line between dots */}
          <View style={styles.line} />

          {/* Square near Destination input */}
          <View style={styles.square}>
            <Entypo name="location" size={24} color="#de6d5b" />
          </View>

          <View style={styles.FromToTextsContainer}>
            <Text
              style={[
                styles.FormToText,
                {
                  borderBottomWidth: 1,
                  borderColor: "#bfbfbf",
                  paddingBottom: 15,
                  marginBottom: 12,
                },
              ]}
            >
              جامعة النجاح الوطنية - {orginName}
            </Text>
            <Text style={styles.FormToText}>
              {destinationNameGeneral} - {destinationNameExact}
            </Text>
          </View>
        </View>

        {/*  */}
        <View style={styles.TimeDistanceInfo}>
          {/*  */}
          <View style={styles.ImageContainer}>
            <Image style={styles.image} source={getImage(carType)} />
          </View>

          {/*  */}
          <View style={styles.metricInfoContainer}>
            <Text style={styles.topMetricText}>المسافة</Text>
            <Text style={styles.bottomMetricText}>
              {distance.replace(" km", "")} كم
            </Text>
          </View>

          {/*  */}
          <View style={styles.metricInfoContainer}>
            <Text style={styles.topMetricText}>الزمن</Text>
            <Text style={styles.bottomMetricText}>
              {time.replace(" mins", "")} دقيقة
            </Text>
          </View>

          {/*  */}
          <View style={styles.metricInfoContainer}>
            <Text style={styles.topMetricText}>رقم التكسي</Text>
            <Text style={styles.bottomMetricText}>
              {driverCarInfo.carNumber}
            </Text>
          </View>

          {/*  */}
          <View style={styles.metricInfoContainer}>
            <Text style={styles.topMetricText}>السعر</Text>
            <Text style={styles.bottomMetricText}>₪ {carPrice}</Text>
          </View>
        </View>

        {/* Button */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate("HomeScreen")}
            style={{
              backgroundColor: "#FFD428",
              padding: 10,
              margin: 10,
              width: "85%",
              alignItems: "center",
              borderRadius: 70,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
              {/* {location? (location.longitude === 35.238801 ? 'الذهاب الى الصفحة الرئيسية': 'الغاء الطلب'  ): null } */}
              الغاء الطلب
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <NotificationsOrder />
    </View>
  );
};

OrderConfirmed.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default OrderConfirmed;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
  },
  driverInfo: {
    flexDirection: "row-reverse",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#d9d9d9",
    alignItems: "center",

    paddingVertical: 5,

    // height: "100"
  },
  driverRightContainer: {
    //   marginTop: 15,
    marginRight: 20,
    alignItems: "center",
    // backgroundColor: 'red'
  },
  driverMiddleContainer: {
    marginRight: 10,
  },
  driverName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  driverLeftContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    flex: 1,
    marginRight: 20,
    //   backgroundColor: 'red'
  },

  IconContainer: {
    // backgroundColor: "#00cc00",
    backgroundColor: "#58bf67",
    // padding: 10,
    padding: 7,
    borderRadius: 25,
    marginRight: 10,
  },

  //   From To Container
  FromToContainer: {
    flexDirection: "row-reverse",
  },
  FromToIcons: {},
  FromToTextsContainer: {
    marginTop: 12,
    marginRight: 45,
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: "flex-end",
    // marginBottom:
  },
  FormToText: {
    fontSize: 15,
    fontWeight: "bold",
    width: "95%",
    // marginBottom: 30
  },

  circle: {
    position: "absolute",
    top: 10,
    left: 15,
  },
  line: {
    width: 1,
    height: 23,
    backgroundColor: "#c4c4c4",
    position: "absolute",
    top: 35,
    left: 26,
  },
  square: {
    position: "absolute",
    top: 60,
    left: 15,
  },

  TimeDistanceInfo: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",

    // backgroundColor: 'red',

    marginTop: 20,
    marginRight: 15,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  ImageContainer: {
    // marginTop: 15,
    marginRight: 7,
    // backgroundColor: "red",
  },
  metricInfoContainer: {
    // backgroundColor: 'red',

    alignItems: "flex-end",
  },

  topMetricText: {
    color: "#a6a6a6",
    fontWeight: "bold",
    fontSize: 12,
  },
  bottomMetricText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  markerOrigin2: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  markerOrigin3: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  destination: {
    width: 20,
    height: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  markerDestination: {
    width: 16,
    height: 16,
  },
});
