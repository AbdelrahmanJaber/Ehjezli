import React, { useEffect, useState, useContext, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  useFonts,
  ElMessiri_400Regular,
  ElMessiri_500Medium,
  ElMessiri_600SemiBold,
  ElMessiri_700Bold,
} from "@expo-google-fonts/el-messiri";
import AppLoading from "expo-app-loading";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { Avatar, ListItem } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
//expo icons
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
//context
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as appDataContext } from "../../context/AppDataContext";

//services

import NotificationsHandeling from "../../services/NotificationsHandeling";
import trackerApi from "./../../api/tracker";
//components
import BookOrderForm from "../../components/BookOrderForm";
import { G } from "react-native-svg";
import { set } from "react-native-reanimated";
// import NewOrderPopup from "../../components/NewOrderPopUp";

import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const origin = { latitude: 34.545455, longitude: 35.5454554 };
const destination = { latitude: 34.545455, longitude: 35.5454554 };
const GOOGLE_MAPS_APIKEY = "...";

//for update driver location

var perviousMinute;
var currentMinute = -1;

//for chat
var counter = true;

const DriverHomeScreen = ({ navigation }) => {
  //للازمة

  const [traffic, setIsTraffic] = useState(false);

  // var arrayOfTraficPoints = [];

  // Context
  const { signout_driver } = useContext(AuthContext);

  const {
    state,
    setDriverAvailable,
    updateDriverLocation,
    deleteAvaiableDrivers,
    saveMessage,
    newMessage,
    getDriverChats,
    addTrafficPoint,
    deleteTrafficPoint,
    getTrafficPoints,
    deleteNewOrder,
    deleteMessages,
  } = useContext(appDataContext);

  let [fontsLoaded] = useFonts({
    ElMessiri_400Regular,
    ElMessiri_500Medium,
    ElMessiri_600SemiBold,
    ElMessiri_700Bold,
  });

  const [isOnline, setIsOnline] = useState(false);
  const [firstName, setFirstName] = useState(state.driver_data.firstName);
  const [lastName, setLasttName] = useState(state.driver_data.lastName);
  const [todayGain, setTodayGain] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  const [numberOfDayOrderes, setNumberOfDayOrderes] = useState(12);
  const [distanceDayTraveled, setDistanceDayTraveled] = useState(20);
  const [workDayHours, setWorkDayHours] = useState(4);

  //خط العمل
  const [track, setTrack] = useState(state.car_data.track);
  //Avatar

  const [avatar, setAvatar] = useState(state.driver_data.avatar);

  //for menu
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const [goEndFlag, setGoEndFlag] = useState(null);
  const [showGoEndFlag, setShowGoEndFlag] = useState(false);
  const onGoPress = async () => {
    setGoEndFlag(!goEndFlag);
    if (goEndFlag === true) {
      setIsAvailable(true);
      setDriverAvailableFun();

      for (let i = 0; i < state.newOrder.studentsPushToken.length; i++) {
        const message = {
          to: state.newOrder.studentsPushToken[i],
          sound: "default",
          title: "انتهت الرحلة",
          body: "نتمنى لك رحلة سعيدة",
          data: { type: "end" },
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

      deleteNewOrder();
      deleteMessages();
      getDriverChats();
    } else {
      setIsAvailable(false);
    }
  };

  //for available driver
  const [carType, setCarType] = useState(state.car_data.carType);
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);
  const [heading, setHeading] = useState(0);

  //for notifications
  const [newNotification, setNewNotification] = useState(state.newOrder);
  // console.log(state.newNotification.location)
  // console.log(state.newNotification.code)

  //for traffic

  const [questionIfTrafficStill, setQuestionIfTrafficStill] = useState(false);

  const [notificationFlag, setNotificationFlag] = useState(state.orderFlag);
  const acceptOrder = () => {
    //  console.log("Accepted")
  };

  const setDriverAvailableFun = () => {
    setDriverAvailable({ carType, track, longitude, latitude, heading });
  };

  const deleteAvailableFun = () => {
    deleteAvaiableDrivers();
  };

  const updateDriverLocationFun = () => {
    var d = new Date();
    perviousMinute = currentMinute;
    currentMinute = d.getMinutes();

    if (currentMinute > perviousMinute) {
      getTrafficPoints();
    }

    if (isOnline) {
      if (currentMinute > perviousMinute) {
        updateDriverLocation({ longitude, latitude, heading });

        if (traffic) {
          setIsTraffic(false);
          deleteTrafficPoint();
        }
      }
    }
  };

  //useEffect and Date
  const [currentDate, setCurrentDate] = useState("");
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

  var totalOrdersInCurrentDay = 0;
  var todayGainVar = 0;
  const calcNumberOfOrdersInCurrentDay = () => {
    for (let i = 0; i < state.orders.orders.length; i++) {
      //console.log(state.orders.orders[i].date);
      if (state.orders.orders[i].date === currentDate) {
        totalOrdersInCurrentDay = totalOrdersInCurrentDay + 1;
      }
    }

    //console.log(state.newOrder)
    todayGainVar = state.price * totalOrdersInCurrentDay;
  };

  // for chat
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
    getCurrentDate();
  }, []);

  ////////////////////////////////////////
  function renderTrafficPointsOnMap() {
    if (state.traffic_Points) {
      return state.traffic_Points.map((obj, index) => {
        const key = index;

        return (
          <Marker
            key={key}
            coordinate={{
              latitude: obj.latitude,
              longitude: obj.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <FontAwesome name="exclamation-circle" size={15} color="red" />
          </Marker>
        );
      });
    }
  }

  function renderStudentsOnMap() {
    if (state.newOrder.studentInformation) {
      return state.newOrder.studentInformation.map((obj, index) => {
        const key = index;

        return (
          <Marker
            key={key}
            coordinate={{
              // longitude:35.25371332752931,
              // latitude:32.22560363775928
              latitude: obj.destination.latitude,
              longitude: obj.destination.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Ionicons name="person" size={24} color="rgb(246, 193, 0)" />
          </Marker>
        );
      });
    }
  }

  /////////////////////////////////////////////

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <NavigationEvents onWillFocus={calcNumberOfOrdersInCurrentDay()} />

        <View>
          <View style={styles.headerViewSty}>
            <Switch
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              value={isOnline}
              onValueChange={() => {
                setIsOnline(!isOnline);
                if (!isOnline) {
                  setIsAvailable(true);
                  setDriverAvailableFun();
                } else {
                  setIsAvailable(false);
                  setIsTraffic(false);

                  if (isAvailable) {
                    deleteAvailableFun();
                    if (traffic) {
                      deleteTrafficPoint();
                    }
                  }
                }
              }}
            />

            {isOnline ? (
              <Text style={styles.onlineTextSty}>نشط</Text>
            ) : (
              <Text style={styles.offlineTextSty}>غير متصل</Text>
            )}

            <Menu
              style={styles.menuSty}
              visible={visible}
              anchor={
                <Foundation
                  onPress={showMenu}
                  name="list"
                  size={30}
                  color="black"
                />
              }
              onRequestClose={hideMenu}
            >
              <MenuItem
                onPress={() => {
                  hideMenu();
                  navigation.navigate("DriverProfile");
                }}
              >
                <View style={styles.menuItemViewSty}>
                  <MaterialIcons
                    name="account-box"
                    size={34}
                    color="rgb(41, 149, 164)"
                  />
                  <Text style={{ fontWeight: "bold" }}> بياناتي </Text>
                </View>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  hideMenu();
                  navigation.navigate("CarInformation");
                }}
              >
                <View style={styles.menuItemViewSty}>
                  <FontAwesome5 name="car" size={34} color="rgb(245, 209, 0)" />
                  <Text style={{ fontWeight: "bold" }}> معلومات المركبة</Text>
                </View>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  hideMenu();
                  navigation.navigate("OrdersHistory");
                }}
              >
                <View style={styles.menuItemViewSty}>
                  <MaterialIcons
                    name="history"
                    size={34}
                    color="rgb(141, 139, 162)"
                  />
                  <Text style={{ fontWeight: "bold" }}> السجل </Text>
                </View>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  hideMenu();
                  navigation.navigate("DriverSettings", { firstName });
                }}
              >
                <View style={styles.menuItemViewSty}>
                  <Feather
                    name="settings"
                    size={28}
                    color="rgb(69, 157, 226)"
                  />
                  <Text style={{ fontWeight: "bold" }}> الإعدادات </Text>
                </View>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onPress={() => {
                  hideMenu();
                  navigation.navigate("Chat");
                }}
              >
                <View style={styles.menuItemViewSty}>
                  <AntDesign
                    name="message1"
                    size={28}
                    color="rgb(223, 126, 46)"
                  />
                  <Text style={{ fontWeight: "bold" }}> المحادثات </Text>
                </View>
              </MenuItem>

              <MenuDivider />
              <MenuDivider />
              <MenuDivider />
              <MenuDivider />
              <MenuDivider />

              <MenuItem
                onPress={() => {
                  hideMenu();
                  signout_driver();
                }}
              >
                <View style={styles.menuItemViewSty}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={34}
                    color="rgb(194, 54, 49)"
                  />
                  <Text style={{ fontWeight: "bold" }}> تسجيل الخروج </Text>
                </View>
              </MenuItem>
            </Menu>
          </View>
          {isOnline ? (
            <View style={styles.onlineViewSty}>
              <View
                style={{ flexDirection: "row-reverse", alignItems: "center" }}
              >
                <Text style={styles.welcomeText}>احجزلي </Text>
                <FontAwesome5 name="smile-wink" size={30} color="black" />
              </View>

              <View style={styles.isAvailableViewSty}>
                {isAvailable ? (
                  <Text style={styles.onlineTextSty}>متاح</Text>
                ) : (
                  <Text style={styles.offlineTextSty}>غير متاح</Text>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.offlineViewSty}>
              <View style={styles.moonViewSty}>
                <Ionicons name="moon-sharp" size={30} color="#FF8900" />
              </View>

              <View>
                <Text style={styles.activeTextSty}>أنت غير متصل !</Text>

                <Text style={styles.goActiveTextSty}>
                  اجعل التطبيق نشط لتبدأ استقبال الطلبات
                </Text>
              </View>
            </View>
          )}

          {goEndFlag === true ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                width: "100%",
                height: Dimensions.get("window").height - 360,
              }}
              onUserLocationChange={(e) => {
                updateDriverLocationFun();

                setLat(e.nativeEvent.coordinate.latitude);
                setLong(e.nativeEvent.coordinate.longitude);
                setHeading(e.nativeEvent.coordinate.heading);
              }}
              showsUserLocation={true}
              initialRegion={{
                latitude: 32.228317,
                longitude: 35.222017,

                latitudeDelta: 0.007999,
                longitudeDelta: 0.007999,
              }}
            >
              {renderTrafficPointsOnMap()}

              {renderStudentsOnMap()}

              <Marker
                title={state.newOrder.gate}
                coordinate={{
                  latitude: state.newOrder.gateLatitude,
                  longitude: state.newOrder.gateLongitude,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <FontAwesome5 name="torii-gate" size={24} color="black" />
              </Marker>

              {
                //32.40860073117488, 35.202313826966616
                traffic ? (
                  <Marker
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    anchor={{ x: 0.5, y: 0.5 }}
                  >
                    <FontAwesome
                      name="exclamation-circle"
                      size={15}
                      color="red"
                    />
                  </Marker>
                ) : null
              }
            </MapView>
          ) : (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                width: "100%",
                height: Dimensions.get("window").height - 360,
              }}
              onUserLocationChange={(e) => {
                //
                updateDriverLocationFun();
                setLat(e.nativeEvent.coordinate.latitude);
                setLong(e.nativeEvent.coordinate.longitude);
                setHeading(e.nativeEvent.coordinate.heading);
              }}
              showsUserLocation={true}
              initialRegion={{
                //An-Najah National University location
                //initial State
                latitude: 32.228317,
                longitude: 35.222017,

                latitudeDelta: 0.007999,
                longitudeDelta: 0.007999,
              }}
            // customMapStyle={mapStyle}
            // region={region}
            // onRegionChange={(reg) => setRegion(reg)}
            >
              {renderTrafficPointsOnMap()}
              {traffic ? (
                <Marker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <FontAwesome
                    name="exclamation-circle"
                    size={15}
                    color="red"
                  />
                </Marker>
              ) : null}
            </MapView>
          )}

          {isOnline === true && state.newOrder ? (
            <Pressable onPress={onGoPress} style={styles.goButton}>
              <Text style={styles.goText}>{goEndFlag ? "End" : "Go"}</Text>
            </Pressable>
          ) : null}
          <View style={styles.bottomContainerSty}>
            <View
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
            >
              {/* <Image style={{ width: 60, height: 60, borderRadius: 50 }} source={require('./../../../assets/myPhoto.jpg')} /> */}
              {avatar ? (
                <Avatar
                  rounded
                  //source={{ uri: `data:image/png;base64,${avatar}` }}
                  source={{ uri: avatar }}
                  size="medium"
                  //  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              ) : (
                <Avatar
                  rounded
                  overlayContainerStyle={{ backgroundColor: "#cccccc" }}
                  size="medium"
                  icon={{
                    name: "user",
                    type: "font-awesome",
                    color: "white",
                    fontSize: 30,
                  }}
                  //  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              )}

              <View style={{ alignItems: "center" }}>
                <View
                  style={{ flexDirection: "row-reverse", alignItems: "center" }}
                >
                  <Text style={{ fontWeight: "bold" }}> {firstName}</Text>
                  <Text style={{ fontWeight: "bold" }}> {lastName} </Text>
                </View>
                {track === "Balad" ? (
                  <Text style={{ fontWeight: "bold", color: "gray" }}>
                    الاكاديمية - البلد
                  </Text>
                ) : null}
                {track === "Rafidia" ? (
                  <Text style={{ fontWeight: "bold", color: "gray" }}>
                    الاكاديمية - البلد
                  </Text>
                ) : null}
                {track === "Qadima" ? (
                  <Text style={{ fontWeight: "bold", color: "gray" }}>
                    الاكاديمية - الحرم القديم
                  </Text>
                ) : null}

                {track === "Makhfia" ? (
                  <Text style={{ fontWeight: "bold", color: "gray" }}>
                    الاكاديمية - المخفية
                  </Text>
                ) : null}
              </View>
            </View>

            {isOnline && !traffic ? (
              <TouchableOpacity
                style={styles.traficViewSty}
                onPress={() => {
                  setIsTraffic(true);
                  addTrafficPoint({ latitude, longitude });
                }}
              >
                <Entypo name="location" size={22} color="black" />
                <Text
                  style={{ fontWeight: "bold", color: "black", fontSize: 12 }}
                >
                  الإبلاغ عن أزمة
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.innerButtomSty}>
            <View style={{ alignItems: "center" }}>
              <FontAwesome5
                name="list-alt"
                size={24}
                color="rgb(200, 176, 99)"
              />
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {totalOrdersInCurrentDay}
              </Text>
              <Text style={{ fontWeight: "bold", color: "gray" }}>
                طلبات اليوم
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <FontAwesome5
                name="money-bill-wave"
                size={24}
                color="rgb(108, 214, 147)"
              />
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {todayGainVar} NIS
              </Text>
              <Text style={{ fontWeight: "bold", color: "gray" }}>
                مكاسب اليوم
              </Text>
            </View>
          </View>

          <NotificationsHandeling />

          {state.orderFlag === true ? (
            <BookOrderForm
              gate={state.newOrder.gate}
              code={state.newOrder.code}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
};

DriverHomeScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  headerViewSty: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 70,
  },
  menuSty: {},
  menuItemViewSty: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  onlineTextSty: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  offlineTextSty: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  offlineViewSty: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF8900",
    padding: 10,
    height: 90,
  },
  onlineViewSty: {
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",

    padding: 10,
    height: 90,
  },
  isAvailableViewSty: {
    width: 100,
    marginVertical: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    color: "black",
    fontFamily: "ElMessiri_700Bold",
  },
  moonViewSty: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 50,
  },
  activeTextSty: {
    fontWeight: "bold",
    fontSize: 18,
  },
  goActiveTextSty: {
    fontWeight: "bold",
    color: "gray",
  },
  bottomContainerSty: {
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    margin: 20,
    marginBottom: 10,
  },
  driverImageViewSty: {
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "black",
  },
  innerButtomSty: {
    justifyContent: "space-around",
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    padding: 5,
    width: "70%",
    marginTop: 5,
    backgroundColor: "rgb(230,230,230)",
  },
  switchSty: {
    width: 100,
  },
  bottomText: {
    fontSize: 16,
    color: "gray",
  },

  roundButton: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
  },
  goButton: {
    position: "absolute",
    backgroundColor: "rgba(117, 195, 147,0.7)",
    padding: 10,
    borderRadius: 50,
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    bottom: 200,
    marginLeft: "auto",
    marginRight: "auto",
    left: Dimensions.get("window").width / 2 - 37,
  },
  goText: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },

  balanceText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },

  markerDestination: {
    width: 20,
    height: 20,
    borderRadius: 30,
  },

  markerOrigin2: {
    width: 30,
    height: 30,
    borderRadius: 40,
  },
  traficViewSty: {
    backgroundColor: "red",
    alignSelf: "center",
    marginTop: 5,
    alignItems: "center",
    borderRadius: 20,
    padding: 5,
  },
  questionTrafficViewSty: {
    alignItems: "center",
    height: 100,
    position: "absolute",
    alignSelf: "center",
    top: 300,
    backgroundColor: "rgba(140, 140, 140,0.7)",
    borderRadius: 40,
    borderColor: "rgb(70,70,70)",
    borderTopWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
  },
});
export default DriverHomeScreen;
