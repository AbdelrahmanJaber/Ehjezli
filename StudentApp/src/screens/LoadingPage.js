import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Plane, Fold, Wander, Grid } from "react-native-animated-spinkit";

export default function App() {
  return (
    <View style={styles.container}>
      <Grid color="#FFF" size={48} />
    </View>
  );
}

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
