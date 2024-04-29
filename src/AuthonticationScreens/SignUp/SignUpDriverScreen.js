import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-neat-date-picker";

//expo icons
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import moment from "moment";

import TextBox from "react-native-password-eye";

//Context Providers

import { Context as AuthContext } from "../../context/AuthContext";

const SignUpDriverScreen = ({ navigation }) => {
  //AuthContext
  const { state, signup_driver, clearErrorMessage, tryLocalSignIn } =
    useContext(AuthContext);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  const [DOB, setDOB] = useState("");
  const [track, setTrack] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carType, setCarType] = useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [confirmedPassword, setConfirmedPassword] = React.useState("");

  //flags to show paas and confirmedPass
  const [showPass, setShowPass] = useState(true);
  const [showConfirmedPass, setShowConfirmedPass] = useState(true);

  // const headerHeight = useHeaderHeight();
  const [showDatePicker, setShowDatePicker] = useState(false);

  //methods for date picker

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setDOB(new Date(date).toLocaleDateString("en-US"));
  };

  // handling functions

  const validate = () => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (!firstName) {
      alert("الرجاء ادخال الاسم الأول");
    } else if (!lastName) {
      alert("الرجاء ادخال اسم العائلة");
    } else if (!phoneNumber) {
      alert("الرجاء ادخال رقم الجوال");
    } else if (!city) {
      alert("الرجاء تحديد المدينة");
    } else if (!gender) {
      alert("الرجاء تحديد الجنس");
    } else if (!DOB) {
      alert("الرجاء ادخال تاريخ ميلادك");
    } else if (!track) {
      alert("الرجاء تحديد خط السير");
    } else if (!carNumber) {
      alert("الرجاء ادخال رقم المركبة");
    } else if (!carType) {
      alert("الرجاء تحديد نوع المركبة");
    } else if (!email) {
      alert("الرجاء ادخال الايميل الخاص بك");
    } else if (!expression.test(String(email).toLowerCase())) {
      alert("الايميل المدخل غير صالح");
    } else if (!password) {
      alert("الرجاء ادخال كلمة السر");
    } else if (!confirmedPassword) {
      alert("الرجاء تأكيد كلمة السر");
    } else if (password != confirmedPassword) {
      alert("كلمة السر غير متطابقة");
    } else {
      createAccount();
    }
  };

  const createAccount = () => {
    signup_driver({
      firstName,
      lastName,
      gender,
      email,
      password,
      carNumber,
      phoneNumber,
      DOB,
      city,
      track,
      carType,
    });
  };

  //////////////////////////////////////////////////////////////

  const [checked, setChecked] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/TaxiLogo.png")}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.LoginTextContainer}>
          <Text style={styles.LoginText}>قم بانشاء حسابك الآن</Text>
        </View>

        <View style={styles.EmailContainerAll}>
          <KeyboardAvoidingView style={styles.EmailContainer}>
            <ScrollView style={{ marginTop: 30 }}>
              <TextInput
                onChangeText={(firstName) => setFirstName(firstName)}
                style={styles.inputTextStyle}
                placeholder="الاسم الأول"
              ></TextInput>
              <TextInput
                onChangeText={(lastName) => setLastName(lastName)}
                style={styles.inputTextStyle}
                placeholder="اسم العائلة"
              ></TextInput>

              <TextInput
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                style={styles.inputTextStyle}
                keyboardType={"numeric"}
                placeholder="رقم الهاتف المحمول"
              ></TextInput>

              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={city}
                  onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
                >
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="--المحافظة--"
                    value="none"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="جنين"
                    value="جنين"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="نابلس"
                    value="نابلس"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="طولكرم"
                    value="طولكرم"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="قلقيلية"
                    value="قلقيلية"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="سلفيت"
                    value="سلفيت"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="رام الله"
                    value="رام الله"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="الخليل"
                    value="الخليل"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="طوباس"
                    value="طوباس"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="الداخل"
                    value="الداخل"
                  />
                </Picker>
              </View>
              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex2) =>
                    setGender(itemValue)
                  }
                >
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="--الجنس--"
                    value="none"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="ذكر"
                    value="male"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="أنثى"
                    value="female"
                  />
                </Picker>
              </View>

              <View style={styles.pickerStyle2}>
                <TouchableOpacity onPress={openDatePicker}>
                  {DOB ? (
                    <Text> {moment(DOB).format("DD-MM-YYYY")}</Text>
                  ) : (
                    <Text>ادخل تاريخ ميلادك </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={openDatePicker}>
                  <FontAwesome name="calendar" size={28} color="black" />
                </TouchableOpacity>

                <Text></Text>

                <DatePicker
                  isVisible={showDatePicker}
                  mode={"single"}
                  onCancel={onCancel}
                  onConfirm={onConfirm}
                />
              </View>

              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={track}
                  onValueChange={(itemValue, itemIndex2) => setTrack(itemValue)}
                >
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="--الخط--"
                    value="none"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="الاكاديمية - البلد"
                    value="البلد"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="الاكاديمية - رفيديا"
                    value="رفيديا"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="الاكاديمية - المخفية"
                    value="المخفية"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="الاكاديمية - القديمة"
                    value="القديمة"
                  />
                </Picker>
              </View>

              <TextInput
                onChangeText={(carNumber) => setCarNumber(carNumber)}
                style={styles.inputTextStyle}
                keyboardType={"numeric"}
                placeholder="رقم المركبة"
              ></TextInput>

              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={carType}
                  onValueChange={(itemValue, itemIndex2) =>
                    setCarType(itemValue)
                  }
                >
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="--نوع المركبة--"
                    value="none"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="تكسي"
                    value="تكسي"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="باص"
                    value="باص"
                  />
                  <Picker.Item
                    style={styles.onePickerItem}
                    label="حافلة"
                    value="حافلة"
                  />
                </Picker>
              </View>

              <TextInput
                onChangeText={(email) => setEmail(email)}
                style={styles.inputTextStyle}
                placeholder="البريد الالكتروني : mark123@gmail.com"
              ></TextInput>
              <View style={styles.passContainerSty}>
                <TextBox
                  containerStyles={[styles.passInputTextSty, { margin: 5 }]}
                  // inputStyle = {{color: 'black'}}
                  // onChangeText={setPassword}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
                  value={password}
                  placeholder="أدخل كلمة السر"
                />

                {/* <TextInput
                        onChangeText={(password) => setPassword(password)}
                        style={styles.passInputTextSty}
                        secureTextEntry={showPass}
                        placeholder="ادخل كلمة السر"
                    >
                    </TextInput>
                    <TouchableOpacity onPress={() => { setShowPass(!showPass) }}>
                        {showPass ? <Entypo name="eye-with-line" style={styles.iconEyeSty} />
                            : <Entypo name="eye" style={styles.iconEyeSty} />}
                    </TouchableOpacity > */}
              </View>
              <View style={styles.passContainerSty}>
                <TextBox
                  containerStyles={[styles.passInputTextSty, { margin: 5 }]}
                  // inputStyle = {{color: 'black'}}
                  // onChangeText={setPassword}
                  onChangeText={(confirmedPassword) =>
                    setConfirmedPassword(confirmedPassword)
                  }
                  secureTextEntry={true}
                  value={confirmedPassword}
                  placeholder="تأكيد كلمة السر"
                />

                {/* <TextInput
                        onChangeText={(confirmedPassword) => setConfirmedPassword(confirmedPassword)}
                        style={styles.passInputTextSty}
                        secureTextEntry={showConfirmedPass}
                        placeholder="تأكيد كلمة السر "
                    ></TextInput>
                    <TouchableOpacity onPress={() => { setShowConfirmedPass(!showConfirmedPass) }}  >
                        {showConfirmedPass ? <Entypo name="eye-with-line" style={styles.iconEyeSty} />
                            : <Entypo name="eye" style={styles.iconEyeSty} />}
                    </TouchableOpacity> */}
              </View>

              <TouchableOpacity
                style={styles.signUpButtonSty}
                onPress={() => {
                  validate();
                }}
              >
                <Text style={styles.textSignUpButtonSty}>إنشاء حساب</Text>
              </TouchableOpacity>

              <View style={styles.loginContainerSty}>
                <Text style={styles.loginTextSty1}>لديك حساب؟</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Signin");
                  }}
                >
                  <Text style={styles.loginTextSty2}> قم بتسجيل الدخول</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default SignUpDriverScreen;

SignUpDriverScreen.navigationOptions = () => {
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
  header: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: 90,
    width: 90,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffd813",
    height: "75%",
  },
  image: {
    height: 65,
    width: 65,
    resizeMode: "contain",
  },

  LoginTextContainer: {
    backgroundColor: "#f1f1f1",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    alignItems: "center",
  },

  LoginText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "bold",
  },

  EmailContainerAll: {
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  EmailContainer: {
    backgroundColor: "white",
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },

  disableContainer: {
    flexDirection: "row-reverse",
    padding: 13,
    marginVertical: 15,
    justifyContent: "space-between",
  },
  remeberMeMessage: {
    marginRight: 10,
    fontWeight: "bold",
    color: "#a6a6a6",
  },

  pickersContainerSty: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderRadius: 20,
  },

  pickerStyle: {
    height: 50,
    padding: 15,
    margin: 6,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: "12%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    marginHorizontal: "15%",
  },
  pickerStyle2: {
    height: 50,
    padding: 10,
    margin: 6,
    borderRadius: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "15%",
  },

  welcome: {
    fontSize: 35,
    marginTop: 5,
    fontWeight: "bold",
  },

  welcome2: {
    fontSize: 20,
    margin: 10,
    color: "gray",
    fontWeight: "bold",
  },

  container2: {
    flex: 4,
    display: "flex",
    backgroundColor: "rgb(230,230,230)",
  },
  input: {
    height: 50,
    padding: 15,
    margin: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  forgetPassword: {
    marginRight: 10,
    color: "gray",
    fontWeight: "bold",
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "rgb(28,158,212)",
    padding: 10,
    margin: 10,
    marginTop: 55,
    borderRadius: 50,
    height: 50,
    width: "60%",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  Button: {
    alignItems: "center",
  },
  createNewAccount: {
    marginTop: 10,
    color: "blue",
    fontWeight: "bold",
  },
  noAccount: {
    marginTop: 10,
    color: "gray",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputTextStyle: {
    height: 50,
    padding: 15,
    margin: 6,
    borderRadius: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },

  onePickerItem: {
    justifyContent: "center",
    width: 50,
  },

  passContainerSty: {
    height: 50,
    padding: 10,
    margin: 6,
    borderRadius: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passInputTextSty: {
    width: "90%",
    height: "100%",
    color: "black",
    borderRadius: 30,
  },
  iconEyeSty: {
    fontSize: 32,
    color: "black",
  },
  pickerDtateContainerStyle: {
    height: 50,
    padding: 15,

    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse",
    margin: 6,
    marginBottom: 20,

    marginHorizontal: "20%",
    backgroundColor: "#fff",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },

  signUpButtonSty: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffd813",
    padding: 10,
    marginHorizontal: "30%",
    marginTop: 10,
    borderRadius: 50,
    height: 50,
  },
  textSignUpButtonSty: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  loginContainerSty: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  loginTextSty1: {
    fontWeight: "bold",
    color: "#808080",
  },
  loginTextSty2: {
    fontWeight: "bold",
    color: "#ffd813",
  },
  pickerStyleTrack: {
    height: 50,
    padding: 15,

    borderRadius: 20,

    margin: 6,
    backgroundColor: "#fff",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: "20%",
  },
});
