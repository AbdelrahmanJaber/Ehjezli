import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'

import { Fontisto } from '@expo/vector-icons'; 

import { Context as AuthContext } from "../../context/AuthContext";

const SignUpConfirmationScreenStudent = ({navigation}) => {

    const { signup_confirmation_student, reset_signup_confirmation_student , signup_confirmation_driver, reset_signup_confirmation_driver} = useContext(AuthContext);
        
    const [number1, onChangeNumber1] = React.useState(null);
    const [number2, onChangeNumber2] = React.useState(null);
    const [number3, onChangeNumber3] = React.useState(null);
    const [number4, onChangeNumber4] = React.useState(null);

    const validate = () => {
        if (!number1 || !number2 || !number3 || !number4) {

            alert("الرجاء ادخال الكود كاملًا")

        }
       

        else {
            const code = number1 + number2 + number3 + number4

            console.log(code)

            signup_confirmation_student({code});

            // signup_confirmation_driver({code});
        }
    }

    return (
        <View style = { styles.container}>
            <View style = {styles.header}>
                <View style = {styles.logoContainer}>
                    <Fontisto name="unlocked" size={90} color="#ffd813" />
                </View>
            </View>
            <View style = {styles.card}>
                <View style = {styles.ForgetPasswordTextContainer}>
                    <Text style = {styles.ForgetPasswordText}>الرمز التأكيدي</Text> 
                </View>

                <View style = {styles.EmailContainerAll}>

                <ScrollView>
                    <View style = {styles.EmailContainer}>
                        <View style = {styles.EmailMessageContainer}>
                            <Text style = {styles.EmailMessage}>الرجاء ادخال الكود الذي تم ارساله لك</Text>
                            <Text style = {styles.EmailMessage}>من خلال بريدك الاكتروني</Text>
                        </View>

                        <View style = {styles.CodeContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber1}
                            value={number1}
                            placeholder="0"
                            keyboardType="numeric"
                            maxLength = {1} 
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber2}
                            value={number2}
                            placeholder="0"
                            keyboardType="numeric"
                            maxLength = {1} 
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber3}
                            value={number3}
                            placeholder="0"
                            keyboardType="numeric"
                            maxLength = {1} 
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber4}
                            value={number4}
                            placeholder="0"
                            keyboardType="numeric" 
                            maxLength = {1} 
                        />
                        </View>

                         {/* Button */}
                            <View style = {{alignItems: 'center'}}>
                            <TouchableOpacity  
                            onPress={() => validate()} 
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
                                تأكيد
                                </Text>
                            </TouchableOpacity>
                            </View>


                            <View style = { styles.HaveAccountContainer}>
                                <Text style = {styles.HaveAccountText}>لم تستسقبل الرمز التأكيدي  ؟  </Text>
                                <TouchableOpacity onPress = {
                                    () => {
                                    reset_signup_confirmation_student()
                                    // reset_signup_confirmation_driver()
                                }
                                    }>
                                    <Text style = {[styles.HaveAccountText, {color: '#ffd813'}]}>اعادة الارسال</Text>
                                </TouchableOpacity>
                            </View>



                    </View>
                    </ScrollView>
                </View>


            </View>
        </View>
    )
}



export default SignUpConfirmationScreenStudent

SignUpConfirmationScreenStudent.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffd813",
        flex: 1,
        justifyContent: 'flex-end'
    },
    header:{
        height: '50%',
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
        height: '50%' //50%
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
    CodeContainer:{
        flexDirection: 'row',
        marginHorizontal: 50,
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        width: 40,

        marginVertical: 12,
        paddingLeft: 15,
        borderWidth: 1,
        padding: 10,

        // alignContent: 'center'
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





