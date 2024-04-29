import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

//Toggle switch
import ToggleSwitch from "toggle-switch-react-native";

//Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//Navigation
import { NavigationEvents } from "react-navigation";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadOriginPlaces } from "../store/originPlaces";
import { originAdded } from "../store/FullOrder";

//Loading page
import LoadingPage from "./LoadingPage";

const ChooseOrigin = ({ navigation }) => {
  const dispatch = useDispatch();
  const originPlaces = useSelector((state) => state.entities.originPlaces.list);
  const loading = useSelector((state) => state.entities.originPlaces.loading);

  const previousOrderError = useSelector(
    (state) => state.entities.previousOrder.previousOrderError
  );

  //currentLocation
  const currentLocationLongitude = useSelector(
    (state) => state.entities.currentLocation.currentLocation.longitude
  );
  const currentLocationLatitude = useSelector(
    (state) => state.entities.currentLocation.currentLocation.latitude
  );

  const apikey = "";
  const [travelTime, setTravelTime] = useState();

  let originLatitude = 32.228317;
  let originLongitude = 35.222017;

  useEffect(() => {
    dispatch(loadOriginPlaces());
  }, []);

  const getTravelTime = async () => {
    fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=heading%3D90%3A${currentLocationLatitude}%2C${currentLocationLongitude}&destinations=${originPlaces[0].latitude}%2C${originPlaces[0].longitude}|${originPlaces[1].latitude}%2C${originPlaces[1].longitude}|${originPlaces[2].latitude}%2C${originPlaces[2].longitude}|${originPlaces[3].latitude}%2C${originPlaces[3].longitude}&key=${apikey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTravelTime(data);
      });
  };

  const check = () => {
    // if(selected === null && checked === true){
    if (selected === null) {
      alert("يجب عليك اختيار البوابة التي ترغب بالمغادرة منها");
    } else if (previousOrderError !== "") {
      alert(previousOrderError);
      navigation.navigate("HomeScreen");
    } else {
      navigation.navigate("ChooseDestination");

      dispatch(
        originAdded({
          gateName: selected,
          longitude: originLongitudee,
          latitude: originLatitudee,
        })
      );
    }
  };

  const [selected, setSelected] = useState(null);
  const [originLongitudee, setOriginLongitudee] = useState(null);
  const [originLatitudee, setOriginLatitudee] = useState(null);

  //footer
  const [checked, setChecked] = useState(true);

  if (loading === true || travelTime === undefined) {
    getTravelTime();
    return <LoadingPage />;
  }

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          dispatch(loadOriginPlaces());
          setSelected(null);
          console.log("focus");
        }}
      />
      <NavigationEvents
        onWillBlur={() => console.log("blur")}
        // }
      />

      <NavigationEvents onDidFocus={() => console.log("didfocus")} />

      <NavigationEvents onDidBlur={() => console.log("didblur")} />

      <View style={[styles.LoginTextContainer, { backgroundColor: "#FFD428" }]}>
        <Text style={styles.LoginText}>مكان المغادرة</Text>
      </View>

      {/* Cards */}

      <View style={{ backgroundColor: "#FFD428", flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            backgroundColor: "white",
          }}
        >
          <View style={{ marginTop: 20 }}>
            {originPlaces.map((item) => (
              <TouchableOpacity
                disabled={!item.opened}
                key={item._id}
                onPress={() => {
                  setSelected(item.gateName);
                  setOriginLongitudee(item.longitude);
                  setOriginLatitudee(item.latitude);
                }}
                style={[
                  styles.originPlaceContainer,
                  // { backgroundColor: item.name === selected ? "#f7eac3" : "white" },
                  {
                    backgroundColor: !item.opened
                      ? "#c1bebe"
                      : item.gateName === selected
                      ? "#f7eac3"
                      : "white",
                  },
                  {
                    /*"#FFD428"*/
                  },
                ]}
              >
                {/*  Image */}
                <Image
                  style={styles.image}
                  source={require("../assets/images/gate3.png")}
                />

                <View style={styles.middleContainer}>
                  <Text style={styles.type}>{item.gateName}</Text>
                  <Text
                    style={[
                      styles.type,
                      // {fontSize: 14},
                      { color: item.opened ? "blue" : "red" },
                    ]}
                  >
                    {item.opened ? "مفتوح" : "مغلق"}
                  </Text>
                </View>

                <View>
                  <View style={styles.rightContainer}>
                    <Text>
                      {travelTime.rows[0]
                        ? item.gateName === "البوابة الرئيسية"
                          ? "  " + travelTime.rows[0].elements[0].duration.text
                          : item.gateName === "بوابة الرياضة الشمالية"
                          ? "  " + travelTime.rows[0].elements[1].duration.text
                          : item.gateName === "بوابة الكوري"
                          ? "  " + travelTime.rows[0].elements[2].duration.text
                          : item.gateName === "بوابة الرياضة الجنوبية"
                          ? "  " + travelTime.rows[0].elements[3].duration.text
                          : null
                        : ""}
                    </Text>
                    <Ionicons name="time-outline" size={18} color="black" />
                  </View>

                  <View style={[styles.rightContainer, { marginRight: 8 }]}>
                    <Text>
                      {travelTime
                        ? item.gateName === "البوابة الرئيسية"
                          ? "   " + travelTime.rows[0].elements[0].distance.text
                          : item.gateName === "بوابة الرياضة الشمالية"
                          ? "   " + travelTime.rows[0].elements[1].distance.text
                          : item.gateName === "بوابة الكوري"
                          ? "   " + travelTime.rows[0].elements[2].distance.text
                          : item.gateName === "بوابة الرياضة الجنوبية"
                          ? "   " + travelTime.rows[0].elements[3].distance.text
                          : null
                        : ""}
                    </Text>
                    <FontAwesome5 name="walking" size={18} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <View>
              <View style={styles.next}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    check();
                  }}
                >
                  <Text style={styles.text}>التالي</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

ChooseOrigin.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default ChooseOrigin;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#FFD428",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 20,
  },
  headerText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    padding: 8,
  },

  originPlaceContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderColor: "#FFD428",
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "white",
    padding: 10,
    margin: 5,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  middleContainer: {
    flex: 1,
  },
  type: {
    fontWeight: "bold",

    marginTop: 7,
    marginRight: 10,
  },
  time: {
    color: "#5d5d5d",
    fontWeight: "bold",
  },
  rightContainer: {
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    marginTop: 5,
    marginRight: 5,
  },

  price: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
  },

  //Footer
  question: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },

  next: {
    alignItems: "center",
    margin: 5,
  },

  text: {
    fontWeight: "bold",
    fontSize: 15,
    margin: 5,
  },
  button: {
    backgroundColor: "#FFD428",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    height: 40,
    flexDirection: "row",
    margin: 5,
  },

  //

  LoginTextContainer: {
    backgroundColor: "#f1f1f1",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    alignItems: "center",
  },

  LoginText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});
