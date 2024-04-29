import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from "react";
import { RadioButton } from 'react-native-paper';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { NavigationEvents } from "react-navigation";

import TextBox from 'react-native-password-eye'; 

import ToggleSwitch from "toggle-switch-react-native";

import { Entypo } from "@expo/vector-icons";

import LoadingPage from '../../../StudentApp/src/screens/LoadingPage'


import { Notifier, Easing } from 'react-native-notifier';

import AsyncStorage from "@react-native-async-storage/async-storage";

//Redux Functions
import { useDispatch, useSelector } from "react-redux";
import { loadProfile  } from "../../../StudentApp/src/store/userSlice";


//Context Providers

import { Context as AuthContext } from "../../context/AuthContext";

const LogInScreen = ({ navigation }) => {

    const { state, signin_student, signin_driver, clearErrorMessage, tryLocalSignInForDriver} = useContext(AuthContext);

    //Redux
    const dispatch = useDispatch();
    const loading = useSelector(state => state.entities.userSlice.loading)

    // insted of ResolveAuth

    useEffect(() => {
      
     tryLocalSignInForDriver();

     const tryLocalSignInForStudent = async () => {
      const student_token = await AsyncStorage.getItem('student_token');

      if(student_token){
        dispatch(loadProfile());

        navigation.navigate('studenFlow');
      }

     }

     tryLocalSignInForStudent();
    

    }, [])


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checked, setChecked] = React.useState(true);
    const [error, setError] = React.useState("");
    const validate = () => {
  
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if (!email) {
        clearErrorMessage();
        setError("الرجاء ادخال الايميل الخاص بك")
      }
  
      else if (!expression.test(String(email).toLowerCase())) {
        clearErrorMessage();
        setError('الايميل المدخل غير صالح')
      }
  
      else if (!password) {
        clearErrorMessage();
        setError("الرجاء ادخال كلمة السر")
  
      }

  
      else {
        setError("");
        attemptLogIn();
      }
  
    }
  
    const attemptLogIn = () => {
  
      if (checked) {
  
        signin_student({ email, password });
        
  
      }
  
      else if (!checked) {
  
        signin_driver({ email, password });
  
      }
  
    }
    const clearErrorField = () => {
      clearErrorMessage();
      setError("");
  
    }

    return (
      <View style = { styles.container}>
          <NavigationEvents onWillBlur={clearErrorField} />
            <View style = {styles.header}>
                <View style = {styles.logoContainer}>
                     <Image
                    style={styles.image}
                    source={require("../../../assets/TaxiLogo.png")}
                    />
                </View>
            </View>
            <View style = {styles.card}>
                <View style = {styles.LoginTextContainer}>
                    <Text style = {styles.LoginText}>سجل الدخول الى حسابك</Text> 
                </View>

                    <ScrollView>
                <View style = {styles.EmailContainerAll}>

                    <View style = {styles.EmailContainer}>
                        <View style = {[styles.AccountsContainer
                            // , {backgroundColor: '#f1f1f1'}
                            ]}>
                            {/* <Text style = {styles.EmailMessage}>الرجاء ادخال كلمة سر مختلفة</Text>
                            <Text style = {styles.EmailMessage}>عن كلمة السر القديمة</Text> */}
                            <TouchableOpacity style = {styles.icon}>
                                <Entypo name="facebook-with-circle" size={40} color="#ffd813" />
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.icon}>
                                <Entypo name="twitter-with-circle" size={40} color="#ffd813" />
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.icon}>
                                <Entypo name="google--with-circle" size={40} color="#ffd813" />
                            </TouchableOpacity>
                        </View>

                        <View style = {styles.messageContainer}>
                            <Text style = {styles.EmailMessage}>أو قم باستخدام بريدك الاكتروني</Text>
                        </View>
                        <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                            // keyboardType="numeric"
                        />
                        </View>

                        <View>
                        {/* <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            value={password}
                            placeholder="Password"
                            // keyboardType="numeric"
                        /> */}
                        <TextBox 
                          containerStyles = {[styles.input]}
                          // inputStyle = {{color: 'black'}}
                          // onChangeText={setPassword}
                          onChangeText={(password) => setPassword(password)}
                          secureTextEntry={true}
                          value={password}
                          placeholder="Password"/>

                        </View>

                        <View style = {styles.rememberMeAndForgetPasswordContainer}>
                            <View style = {styles.rememberMeContainer}>
                                {/* Toogle Switch */}
                                <ToggleSwitch
                                    isOn={checked}
                                    onColor="gray"
                                    offColor="#FFD428"
                                    size="medium"
                                    onToggle={(value) => setChecked(value)}
                                    />
                                {/* Remember Me */}
                                <Text style = {styles.remeberMeMessage}>{checked? 'طالب' : 'سائق'}</Text>

                            </View>

                            <TouchableOpacity style = { styles.ForgetPasswordContainer}
                            onPress={() => { !checked ? navigation.navigate('ForgetpasswordDriver') :  navigation.navigate('Forgetpassword')}}>
                                {/* Forget Password */}
                                <Text style = { styles.forgetPasswordMessage}>نسيت كلمة المرور</Text>
                            </TouchableOpacity>
                        </View>

                        {/*  */}
                        <View style={styles.errorView}>
                            {state.errorMessage ? <Text style={styles.errorText}>{state.errorMessage}</Text> : null}
                            {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        </View>
                        {/*  */}

                         {/* Button */}
                            <View style = {{alignItems: 'center'}}>
                            <TouchableOpacity  
                            onPress={() => { validate() }}
                            style={{
                                backgroundColor: '#FFD428',
                                padding: 10,
                                margin: 10,
                                marginVertical: 25,
                                width: '95%',
                                alignItems: 'center',
                                borderRadius: 70
                            }}>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
                                تسجيل الدخول
                                </Text>
                            </TouchableOpacity>
                            </View>


                            <View style = { styles.HaveAccountContainer}>
                                <Text style = {styles.HaveAccountText}>ليس لديك حساب ؟</Text>
                                <TouchableOpacity onPress={() => { !checked ? navigation.navigate('SignupDriver') :  navigation.navigate('SignupStudent')}}>
                                    <Text style = {[styles.HaveAccountText, {color: '#ffd813'}]}> أنشئ حسابك الان</Text>
                                </TouchableOpacity>
                            </View>



                    </View>
                </View>

        </ScrollView>

            </View>


        </View>

    )
}

export default LogInScreen

LogInScreen.navigationOptions = () => {
    return {
      headerShown: false,
  
    };
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffd813",
        flex: 1
        // justifyContent: 'flex-end'
    },
    header:{
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer:{
        height: 90,
        width: 90,
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: "#ffd813",
        height: '75%'
    },
    image: {
        height: 65,
        width: 65,
        resizeMode: "contain",
      },

    LoginTextContainer: {
        backgroundColor: '#f1f1f1',
        borderTopRightRadius: 50,
        borderTopLeftRadius:50,
        alignItems: 'center'

    },

    LoginText: {
        marginVertical: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },

    EmailContainerAll: {
        backgroundColor: '#f1f1f1',
        flex: 1
    },
    EmailContainer:{
        backgroundColor: 'white',
        flex: 1,
        borderTopRightRadius: 50,
        borderTopLeftRadius:50,

        // justifyContent: 'space-between',
    },

    AccountsContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',   
        marginTop: 15,
        marginBottom: 3
    },

    EmailMessage: {
        fontWeight: 'bold',
        marginTop:5,
        color: "#a6a6a6"
    },
    input: {
        height: 50,
        marginHorizontal: 12,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,

        borderRadius: 10,
        borderColor:  "#a6a6a6"
      },

      HaveAccountContainer:{
          flexDirection: 'row-reverse',
          justifyContent: 'center',
        //   backgroundColor: 'red',
          flex: 1,
          alignItems: 'flex-end',
      },

      HaveAccountText: {
          fontWeight: 'bold',
          fontSize: 13,
          color: '#a6a6a6',
        //   backgroundColor: 'gray',
          marginBottom: 10
      },
      icon: {
          marginHorizontal: 10
      },
      messageContainer: {
          justifyContent: 'center',
          alignItems: 'center',
        //   backgroundColor: 'red'
        marginBottom: 30
      },
      rememberMeAndForgetPasswordContainer: {
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          marginHorizontal: 18,
          alignItems: 'center',
          marginVertical: 8,
        //   backgroundColor: 'red'
      },
      rememberMeContainer: {
          flexDirection: 'row-reverse',
          alignItems: 'center'
      },
      remeberMeMessage: {
        marginRight: 10,
        fontWeight: 'bold',
        color: '#a6a6a6'
      },
      forgetPasswordMessage: {
          fontWeight: 'bold',
          color: '#ffd813'

      },

    errorText:
  {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorView: {
    flexDirection: 'row-reverse',
    // backgroundColor: 'blue',
    justifyContent: 'center'
  },

})

