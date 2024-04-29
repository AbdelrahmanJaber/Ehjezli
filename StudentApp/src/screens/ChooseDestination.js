import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { loadDestinationPlaces } from "../store/destinationPlaces";
import LoadingPage from "./LoadingPage";

//Navigation
import { NavigationEvents } from "react-navigation";

import { destinationAdded, timeAdded, distanceAdded } from "../store/FullOrder";

const ChooseDestination = ({ navigation }) => {
  const dispatch = useDispatch();
  const destinationPlaces = useSelector(
    (state) => state.entities.destinationPlaces.list
  );
  const loading = useSelector(
    (state) => state.entities.destinationPlaces.loading
  );

  useEffect(() => {
    dispatch(loadDestinationPlaces());
  }, []);

  const getPlaces = (mainDestination) => {
    const filteredPlaces = destinationPlaces.filter(
      (reg) => reg.mainDestination === mainDestination
    );

    return filteredPlaces;
  };

  const [selected, setSelected] = useState(null);
  const regions = ["البلد", "رفيديا", "القديمة", "المخفية"];

  const [mainDestination, setMainDestination] = useState(null);
  const [subDestination, setSubDestination] = useState(null);
  const [exactDestination, setExactDestination] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const [selectedDestination, setSelectedDestination] = useState(null);

  // const navigation = useNavigation();

  const transform = (regionName) => {
    if (regionName === "البلد") {
      return "     البلد";
    } else if (regionName === "رفيديا") {
      return "     رفيديا";
    } else if (regionName === "القديمة") {
      return "     القديمة";
    } else if (regionName === "المخفية") {
      return "     المخفية";
    }
  };

  const transformDatabase = (regionName) => {
    if (regionName === "Balad") {
      return "البلد";
    } else if (regionName === "Rafidia") {
      return "رفيديا";
    } else if (regionName === "Qadima") {
      return "القديمة";
    } else if (regionName === "Makhfia") {
      return "المخفية";
    }
  };

  const apikey = "";
  // const [travelTime, setTravelTime] = useState()

  const originChosen = useSelector(
    (state) => state.entities.FullOrder.list.origin
  );

  const getTravelTime = async (
    originLongitude,
    originLatitude,
    destinationLongitude,
    destinationLatitude
  ) => {
    fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=heading%3D90%3A${originLatitude}%2C${originLongitude}&destinations=${destinationLatitude}%2C${destinationLongitude}&key=${apikey}`
    )
      .then((res) => res.json())
      .then((data) => {
        //  setTravelTime(data)

        dispatch(
          timeAdded({
            time: data.rows[0].elements[0].duration.text,
          })
        );

        dispatch(
          distanceAdded({
            distance: data.rows[0].elements[0].distance.text,
          })
        );
      });
  };

  const check = async () => {
    if (exactDestination === null) {
      alert("يجب عليك اختيار المكان الذي تود الذهاب اليه");
    } else {
      dispatch(
        destinationAdded({
          mainDestination: mainDestination,
          subDestination: subDestination,
          exactDestination: exactDestination,
          longitude: longitude,
          latitude: latitude,
        })
      );

      //calculate the time and distance and store it in the database

      getTravelTime(
        originChosen.longitude,
        originChosen.latitude,
        longitude,
        latitude
      );

      navigation.navigate("ChooseCar");
    }
  };

  if (loading === true) {
    return <LoadingPage />;
  }
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          dispatch(loadDestinationPlaces());

          setSelected(null);

          setMainDestination(null);
          setSubDestination(null);
          setExactDestination(null);
          setLongitude(null);
          setLatitude(null);

          setSelectedDestination(null);
        }}
      />

      <View style={[styles.LoginTextContainer, { backgroundColor: "#FFD428" }]}>
        <Text style={styles.LoginText}>مكان الوصول</Text>
      </View>

      <View style={{ backgroundColor: "#FFD428", flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
          }}
        >
          {/* <View style = {{justifyContent: 'space-between', flex: 1, borderTopRightRadius: 50,borderTopLeftRadius:50, backgroundColor : 'white' }}> */}

          <View style={[styles.regionsContainer]}>
            {regions.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setSelected(item);
                }}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { borderColor: item === selected ? "#FFD428" : "black" },
                  ]}
                >
                  <MaterialIcons
                    name="location-city"
                    size={30}
                    color={item === selected ? "#FFD428" : "black"}
                  />
                </View>

                <View>
                  <Text style={styles.regionText}>{transform(item)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.savedPlacesContainer}>
            {selected &&
              getPlaces(selected).map((region) => (
                <TouchableOpacity
                  key={region._id}
                  onPress={() => {
                    setMainDestination(region.mainDestination);
                    setSubDestination(region.subDestination);
                    setExactDestination(region.exactDestination);
                    setLongitude(region.longitude);
                    setLatitude(region.latitude);

                    setSelectedDestination(region.exactDestination);
                  }}
                  style={[
                    styles.row,
                    {
                      backgroundColor:
                        region.exactDestination === selectedDestination
                          ? "#f7eac3"
                          : null,
                    },
                  ]}
                >
                  <View style={styles.IconContainer}>
                    <Ionicons name="location-sharp" size={20} color="white" />
                  </View>
                  <Text style={styles.destinationText}>
                    {region.exactDestination}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

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
  );
};

ChooseDestination.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default ChooseDestination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    // flexDirection: 'column-reverse'
    justifyContent: "space-between",
  },

  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#FFD428",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 10,
    // marginBottom:30,
    borderRadius: 20,
  },
  headerText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    padding: 8,
    // margin: 8,
    // marginVertical:25
    // marginVertical: 10,
  },
  regionsContainer: {
    height: 120,
    // height: "75%",
    paddingHorizontal: 10,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    // marginHorizontal: 5,
    // paddingHorizontal: 5,

    // borderBottomWidth: 2,
    // borderBottomColor: "black",
  },
  iconContainer: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  regionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    // paddingHorizontal: 15,
  },

  //Home & Work
  savedPlacesContainer: {
    // backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#e6e5e5",
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
  },
  IconContainer: {
    backgroundColor: "#b3b3b3",
    padding: 10,
    borderRadius: 25,
  },
  destinationText: {
    marginRight: 10,
    fontWeight: "500",
    fontSize: 16,
  },

  //
  next: {
    alignItems: "center",
    // backgroundColor: "blue",
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
    // backgroundColor: '#FFD428',
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

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
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
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
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
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
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
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
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
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d",
      },
    ],
  },
];
