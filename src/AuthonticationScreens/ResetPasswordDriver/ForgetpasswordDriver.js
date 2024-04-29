import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { Context as AuthContext } from "../../context/AuthContext";


const Forgetpassword = ({navigation}) => {
    const {sendForgetPasswordEmailDriver} = useContext(AuthContext)

    const validate = () => {
  
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (!email) {
          alert("الرجاء ادخال الايميل الخاص بك")
        }
        else if (!expression.test(String(email).toLowerCase())) {
            
            alert('الايميل المدخل غير صالح')
          }
          else{
            sendForgetPasswordEmailDriver({email})
          }
        }


    const [email, setEmail] = useState('');
    
    return (
        <View style = { styles.container}>
            <View style = {styles.header}>
                <View style = {styles.logoContainer}>
                {/* <Image
                    style={styles.image}
                    source={require("../assets/TaxiLogo.png")}
                    /> */}

                    {/* <FontAwesome name="lock" size={100} color="#ffd813" /> */}
                    <MaterialCommunityIcons name="lock-question" size={100} color="#ffd813" />
                    {/* <Text style = {{fontSize: 30, fontWeight: 'bold'}}>احجزلي</Text> */}
                </View>
            </View>
            <View style = {styles.card}>
                <View style = {styles.ForgetPasswordTextContainer}>
                    <Text style = {styles.ForgetPasswordText}>نسيت كلمة المرور</Text> 
                </View>

                <View style = {styles.EmailContainerAll}>

                    <ScrollView>
                    <View style = {styles.EmailContainer}>
                        <View style = {styles.EmailMessageContainer}>
                            <Text style = {styles.EmailMessage}>الرجاء ادخال ايميلك</Text>
                            <Text style = {styles.EmailMessage}>سنقوم بارسال رمز تأكيدي لك</Text>
                        </View>

                        <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Test123@gmail.com"

                        />
                        </View>

                         {/* Button */}
                            <View style = {{alignItems: 'center'}}>
                            <TouchableOpacity  
                            onPress={ () => {validate()} } 
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
                                ارسال الرمز التأكيدي
                                </Text>
                            </TouchableOpacity>
                            </View>


                            <View style = { styles.HaveAccountContainer}>
                                <Text style = {styles.HaveAccountText}>لديك حساب مسبقًا ؟</Text>
                                <TouchableOpacity
                                onPress = {() => navigation.navigate('Signin')}>
                                    <Text style = {[styles.HaveAccountText, {color: '#ffd813'}]}>  سجل الدخول</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </ScrollView>
                </View>


            </View>
        </View>
    )
}

export default Forgetpassword

Forgetpassword.navigationOptions = () => {
    return {
      headerShown: false,
  
    };
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffd813",
        flex: 1,
        // justifyContent: 'flex-end'
    },
    header:{
        height: '48%',
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: 'red'
    },
    logoContainer:{
        height: 150,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 125,
        width: 125,
        resizeMode: "contain",
      },
    card: {
        backgroundColor: "#ffd813",
        height: '52%',
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
        margin: 12,
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
