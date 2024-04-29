import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  button,
} from "react-native";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadAvailableDrivers } from "../store/availableDrivers";
import { codeAndGateDeleted } from "../store/codeAndGate";
import { loadProfile } from "../store/userSlice";
import { loadAvatar } from "../store/avatar";

import { CheckPreviousOrder } from "../store/previousOrder";

import { currentLocationAdded } from "../store/currentLocation";

//Navigation
import { NavigationEvents } from "react-navigation";

//Map
import MapView, {PROVIDER_GOOGLE, Marker } from "react-native-maps";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//Loading Page
import LoadingPage from "./LoadingPage";

//Notifications
import NotificationsOrder from "../../../src/services/NotificationsOrder";

// Functions
const getImage = (carType) => {
  if (carType === "تكسي") {
    return require("../assets/images/top-Taxi.png");
  }

  if (carType === "باص") {
    return require("../assets/images/top-Bus.png");
  }

  if (carType === "حافلة") {
    return require("../assets/images/top-Van.png");
  }
};

const regions = ["المخفية", "القديمة", "رفيديا", "البلد"];

//Warnings
console.disableYellowBox = true;

const HomeScreen = ({ navigation }) => {
  //Redux
  const dispatch = useDispatch();
  const availableDrivers = useSelector(
    (state) => state.entities.availableDrivers.list
  );
  const loading = useSelector(
    (state) => state.entities.availableDrivers.loading
  );
  const loadingProfile = useSelector(
    (state) => state.entities.userSlice.loading
  );
  const loadingAvatar = useSelector((state) => state.entities.avatar.loading);

  const previousOrderError = useSelector(
    (state) => state.entities.previousOrder.previousOrderError
  );
  const previousOrderLoaaing = useSelector(
    (state) => state.entities.previousOrder.loading
  );

  //HomeMap state
  const [region, setRegion] = useState();
  // Header Home states
  const [selected, setSelected] = useState(null);

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  useEffect(() => {
    dispatch(loadProfile());

    dispatch(loadAvailableDrivers());
    dispatch(codeAndGateDeleted());

    dispatch(CheckPreviousOrder());

    dispatch(loadAvatar());
  }, []);

  const check = async () => {
    dispatch(CheckPreviousOrder());

    if (previousOrderError !== "") {
      alert(previousOrderError);
    } else {
      dispatch(currentLocationAdded({ longitude: long, latitude: lat }));

      navigation.navigate("ChooseOrigin");
    }
  };

  const show = () => {
    if (region) {
      if (region.latitudeDelta > 0.008 && region.longitudeDelta > 0.008) {
        return false;
      }
    }
    return true;
  };

  //Display Loading Screen when loading
  if (
    loading === true ||
    loadingProfile === true ||
    previousOrderLoaaing === true ||
    loadingAvatar === true
  ) {
    return <LoadingPage />;
  }

  return (
    <View>
      <View style={{ height: Dimensions.get("window").height * 0.65 }}>
        <NavigationEvents
          onWillFocus={() => {
            dispatch(codeAndGateDeleted());
            dispatch(CheckPreviousOrder());
          }}
        />
        <SafeAreaView>
          <MapView
          provider={PROVIDER_GOOGLE}
            style={{ width: "100%", height: "100%" }}
            onUserLocationChange={(e) => {
              setLat(e.nativeEvent.coordinate.latitude);
              setLong(e.nativeEvent.coordinate.longitude);
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
            customMapStyle={mapStyle}
            // region={region}
            onRegionChange={(reg) => setRegion(reg)}
          >
            {show() && (
              <Marker
                coordinate={{ latitude: 32.228317, longitude: 35.222017 }}
              >
                <Text style={{ fontWeight: "bold" }}>جامعة النجاح الوطنية</Text>
              </Marker>
            )}

            {show() &&
              availableDrivers.map((car) =>
                car.track === selected ? (
                  <Marker
                    key={car._id}
                    coordinate={{
                      latitude: car.latitude,
                      longitude: car.longitude,
                    }}
                  >
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain",
                        transform: [
                          {
                            rotate: `${car.heading}deg`,
                          },
                        ],
                      }}
                      source={getImage(car.carType)}
                    />
                  </Marker>
                ) : null
              )}
          </MapView>
        </SafeAreaView>
      </View>

      {/* Choose available cars in a region component */}
      <View>
        <View>
          <View
            style={{
              backgroundColor: "#cccccc",
              paddingHorizontal: 20,
              borderTopLeftRadius: 80,
              borderTopRightRadius: 80,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
              اعرض السيارات المتوفرة في منطقة :
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            {regions.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setSelected(item);

                  dispatch(loadAvailableDrivers());
                }}
                style={[
                  styles.Button,
                  {
                    backgroundColor: item === selected ? "#f2f2f2" : "#FFD428",
                  },
                ]}
              >
                <FontAwesome5
                  name="taxi"
                  size={20}
                  color="black"
                  style={styles.icon}
                />
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Footer component */}
      <View>
        <View style={styles.footerContainer}>
          <View>
            <Image
              source={require("../assets/images/footerImage.png")}
              style={{ width: 180, height: 150 }}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              check();
            }}
          >
            {/* <View > */}
            <MaterialIcons name="location-history" size={24} color="#008000" />
            <Text style={styles.text}>احجز مركبتك</Text>
            {/* </View> */}
          </TouchableOpacity>
        </View>
      </View>

      <NotificationsOrder />
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default HomeScreen;

const styles = StyleSheet.create({
  //Header Home
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#cccccc",
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  icon: {
    marginLeft: 5,
  },
  Button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "#FFD428",
    height: "100%",
    width: "20%",
  },
  text: {
    marginHorizontal: 5,
    fontSize: 13,
    fontWeight: "bold",
    color: "black",
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  SpeedDial: {
    position: "absolute",
    top: 50,
    left: 50,
  },

  /// footer home
  footerContainer: {
    backgroundColor: "white",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    // borderTopLeftRadius: 65,
    // borderTopRightRadius: 65
  },
  button: {
    backgroundColor: "#FFD428",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // alignContent: 'center',
    width: "35%",
    height: 40,
    // padding:
    flexDirection: "row",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
  },
});

//Map
const mapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
