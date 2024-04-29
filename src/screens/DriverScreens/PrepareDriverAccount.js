import React, { useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Context as appDataContext } from "../../context/AppDataContext";
import NotificationsHandeling from "../../services/NotificationsHandeling";

import { Plane, Fold, Wander, Grid } from "react-native-animated-spinkit";

const PrepareDriverAccount = ({ navigation }) => {
  const {
    state,
    getDriverInfo,
    getDriverCarInfo,
    getDriverOrders,
    getDriverChats,
    getTrafficPoints,
  } = useContext(appDataContext);

  useEffect(async () => {
    await getDriverInfo();
    await getDriverCarInfo();
    await getDriverOrders();
    await getDriverChats();
    await getTrafficPoints();

    navigation.navigate("driverFlow");
  }, []);

  return (
    <>
      <NotificationsHandeling />
      <View style={styles.container}>
        <Grid color="#FFF" size={48} />
      </View>
    </>
  );
};

PrepareDriverAccount.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default PrepareDriverAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#d35400',
    backgroundColor: "#FFD428",
    padding: 8,
  },
});
