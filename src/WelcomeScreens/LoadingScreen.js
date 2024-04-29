import React from "react";
import { StyleSheet, View } from "react-native";
import ResponsiveImage from "react-native-responsive-image";

import { AnimatedCircularProgress } from "react-native-circular-progress";
const LoadingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={140}
        width={12}
        fill={100}
        duration={3000}
        tintColor="#f1f1f1"
        backgroundColor="gray"
        onAnimationComplete={() => {}} //navigation.navigate('Test')
      >
        {() => (
          <ResponsiveImage
            style={styles.Image}
            source={require("./../../assets/TaxiLogo.png")}
            initWidth="90"
            initHeight="90"
          />
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd813", //"white"//"rgb(39, 160, 201)"
  },
});

export default LoadingScreen;
