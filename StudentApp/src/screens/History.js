import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { NavigationEvents } from "react-navigation";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadHistory } from "../store/history";

//Loading page
import LoadingPage from "./LoadingPage";

const History = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.entities.history.loading);
  const history = useSelector((state) => state.entities.history.studentHistory);

  useEffect(() => {
    dispatch(loadHistory());
  }, []);

  if (loading === true) {
    return <LoadingPage />;
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <NavigationEvents
        onWillFocus={() => {
          dispatch(loadHistory());
        }}
      />

      <View style={[styles.LoginTextContainer, { backgroundColor: "#FFD428" }]}>
        <Text style={styles.LoginText}>السجل</Text>
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
          <ScrollView style={{ flex: 1, marginTop: 25 }}>
            {history.map((order) => (
              <View key={order._id}>
                {/* from and to destination */}
                <View style={styles.FromToContainer}>
                  {/* Circle near Origin input */}
                  <View style={styles.circle}>
                    <MaterialIcons
                      name="my-location"
                      size={24}
                      color="#ffd813"
                    />
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
                      جامعة النجاح الوطنية - {order.origin.gateName}
                    </Text>
                    <Text style={styles.FormToText}>
                      {order.destination.mainDestination} -{" "}
                      {order.destination.exactDestination}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  //   From To Container
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
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
  headerContainer: {
    flexDirection: "row",
    // backgroundColor: "#FFD428",
    // borderColor: "black",
    // borderWidth: 2,
    justifyContent: "center",
    marginTop: 10,
    // borderRadius: 20,
  },
  headerText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
  },
  FromToContainer: {
    flexDirection: "row-reverse",
    // backgroundColor: 'red',
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    marginVertical: 15,
    marginHorizontal: 5,
    borderRadius: 30,
    // padding: 20
    borderColor: "#a6a6a6",
  },
  FromToIcons: {
    //   backgroundColor: 'red',
  },
  FromToTextsContainer: {
    // backgroundColor: 'red',
    // position: 'absolute',
    marginTop: 12,
    marginRight: 45,
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: "flex-end",
    // marginBottom:
    marginVertical: 25,
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
