import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Context as AuthContext } from "../../context/AuthContext";

import TextBox from 'react-native-password-eye'; 


const EnterNewPassword = ( {navigation} ) => {

    const {sendNewPassword} = useContext(AuthContext);

    const validate = () => {
        if (!password) {
            alert("الرجاء ادخال كلمة السر")
        }
        else if (!confirmedPassword) {
            alert("الرجاء تأكيد كلمة السر")
        }

        else if (password != confirmedPassword) {

            alert("كلمة السر غير متطابقة")
        }
        else{
            sendNewPassword({password})
        }
    }

    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    return (
        <View style = { styles.container}>
            <View style = {styles.header}>
                <View style = {styles.logoContainer}>
                    <MaterialCommunityIcons name="lock-reset" size={100} color="#ffd813" />
                </View>
            </View>
            <View style = {styles.card}>
                <View style = {styles.ForgetPasswordTextContainer}>
                    <Text style = {styles.ForgetPasswordText}>انشاء كلمة سر جديدة</Text> 
                </View>

                <View style = {styles.EmailContainerAll}>

                    <ScrollView>
                    <View style = {styles.EmailContainer}>
                        <View style = {styles.EmailMessageContainer}>
                            <Text style = {styles.EmailMessage}>الرجاء ادخال كلمة سر مختلفة</Text>
                            <Text style = {styles.EmailMessage}>عن كلمة السر القديمة</Text>
                        </View>

                        <View>
                        {/* <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="New password"
                        /> */}
                       <TextBox 
                          containerStyles = {[styles.input]}
                          onChangeText={(password) => setPassword(password)}
                          secureTextEntry={true}
                          value={password}
                          placeholder="Password"/>

                        </View>

                        <View>
                        {/* <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            onChangeText={setConfirmedPassword}
                            value={confirmedPassword}
                            placeholder="Confirm password"
                        /> */}

                        <TextBox 
                          containerStyles = {[styles.input]}
                          onChangeText={(confirmedPassword) => setConfirmedPassword(confirmedPassword)}
                          secureTextEntry={true}
                          value={confirmedPassword}
                          placeholder="Confirm password"/>
                        </View>



                         {/* Button */}
                            <View style = {{alignItems: 'center'}}>
                            <TouchableOpacity  
                            onPress={() => { validate() }} 
                            style={{
                                backgroundColor: '#FFD428',
                                padding: 10,
                                margin: 10,
                                marginVertical: 25,
                                width: '85%',
                                alignItems: 'center',
                                borderRadius: 70
                            }}>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
                                حفظ
                                </Text>
                            </TouchableOpacity>
                            </View>


                            {/* <View style = { styles.HaveAccountContainer}>
                                <Text style = {styles.HaveAccountText}>لديك حساب مسبقًا ؟</Text>
                                <TouchableOpacity>
                                    <Text style = {[styles.HaveAccountText, {color: '#ffd813'}]}>  سجل الدخول</Text>
                                </TouchableOpacity>
                            </View> */}



                    </View>
                    </ScrollView>
                </View>


            </View>
        </View>
    )
}

export default EnterNewPassword

EnterNewPassword.navigationOptions = () => {
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
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer:{
        height: 150,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: "#ffd813",
        height: '55%'
    },

    ForgetPasswordTextContainer: {
        backgroundColor: '#f1f1f1',
        borderTopRightRadius: 50,
        borderTopLeftRadius:50,
        alignItems: 'center'

    },

    ForgetPasswordText: {
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

    EmailMessageContainer:{
        alignItems: 'center',
        // backgroundColor: 'red',
        
        marginVertical: 15
    },

    EmailMessage: {
        fontWeight: 'bold',
        marginTop:5,
        color: "#a6a6a6"
    },
    input: {
        height: 50,
        marginHorizontal: 12,
        marginVertical: 7,
        borderWidth: 1,
        padding: 10,

        borderRadius: 10,
        borderColor:  "#a6a6a6"
      },

      HaveAccountContainer:{
          flexDirection: 'row-reverse',
          justifyContent: 'center'
      },

      HaveAccountText: {
          fontWeight: 'bold',
          fontSize: 13,
          color: '#a6a6a6'
      }
})

