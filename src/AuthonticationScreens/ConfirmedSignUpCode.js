import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Ionicons } from '@expo/vector-icons'; 


const PasswordReseted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
          <View style = {styles.card}>
              {/* done logo */}
              <View style = {styles.logoContainer}>
                <Ionicons name="checkmark-done-sharp" size={140} color="#FFD428" />  
              </View>

              <View style = { styles.message1}>
                  <Text style = {styles.textMessage1}>تم التحقق من ملكية</Text>
                  <Text style = {styles.textMessage1}>حسابك بنجاح</Text>
              </View>
          </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signin')}
            style={{
              backgroundColor: "#FFD428",
              padding: 10,
              margin: 10,
              marginVertical: 25,
              width: "85%",
              alignItems: "center",
              borderRadius: 70,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
              تسجيل الدخول
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PasswordReseted;

PasswordReseted.navigationOptions = () => {
  return {
    headerShown: false,

  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  messageContainer: {
    height: "85%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    height: "15%",
  },
  card: {
      height: 300,
      width: 300,
      backgroundColor: 'white',
      borderRadius: 30,
      alignItems: 'center'
  },
  logoContainer: {
      width: 130,
      height: 130,
      borderRadius: 20,
    //   backgroundColor: '#f1f1f1',
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center'
  },
  message1: {
    alignItems: 'center'
  },
  textMessage1:{
    fontWeight: 'bold',
    fontSize: 30
  }
});
