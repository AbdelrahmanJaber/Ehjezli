import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

//Expo Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
//context
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as appDataContext } from "../../context/AppDataContext";

const DriverWSettingsScreen = (props) => {
  const {
    changeEmail_Driver,
    changePhoneNumber_Driver,
    changePassword_Driver,
  } = useContext(AuthContext);
  const { state, checkPassword_Driver, setValidPassFalse } =
    useContext(appDataContext);

  //to show Views

  const [changePassword, setChangePassword] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePhoneNum, setChangePhoneNum] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);

  const [secureTextEntry1, SetsecureTextEntry1] = useState(true);
  const [secureTextEntry2, SetsecureTextEntry2] = useState(true);
  const [secureTextEntry3, SetsecureTextEntry3] = useState(true);

  //

  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [oldPhoneNumber, setOldPhoneNumber] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  // const [confirmPhoneNumber, setConfirmPhoneNumber] = useState('')

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const changeEmailFun = () => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (!oldEmail || !newEmail) {
      alert("ادخل الإيميل الحالية والجديدة");
    } else if (!expression.test(String(oldEmail).toLowerCase())) {
      alert("الإيميل الحالي غير صالح");
    } else if (!expression.test(String(newEmail).toLowerCase())) {
      alert("الإيميل الجديد غير صالح");
    } else if (oldEmail != state.driver_data.email) {
      alert("الإيميل الحالي غير صحيح");
    } else {
      changeEmail_Driver({ email: newEmail });
    }
  };

  const cancelEmailFun = () => {
    setNewEmail("");
    setOldEmail("");
    setChangeEmail(false);
  };

  //phone number
  const changePhoneNumberFun = () => {
    //  console.log(state.driver_data.phoneNumber)
    // alert("hi")
    if (!oldPhoneNumber || !newPhoneNumber) {
      alert("ادخل رقم الهاتف الحالي والجديد");
    }
    // else if (newPhoneNumber != confirmPhoneNumber) {
    //     alert("كلمة السر الجديدة وتأكيد كلمة السر غير متطابقتين")
    // }
    else if (oldPhoneNumber != state.driver_data.phoneNumber) {
      alert("الرقم الحالي غير صحيح");
    } else {
      setOldPhoneNumber("");
      setNewPhoneNumber("");
      setChangePhoneNum(false);
      changePhoneNumber_Driver({ phoneNumber: newPhoneNumber });

      alert("تم تغيير رقم الهاتف");
    }
  };

  const cancelPhoneNumberFun = () => {
    setOldPhoneNumber("");
    setNewPhoneNumber("");
    setChangePhoneNum(false);
  };

  //password
  const changePasswordFun = () => {
    //  console.log(state.driver_data.phoneNumber)
    // alert("hi")
    checkPassword_Driver({ password: oldPass });
    if (!oldPass || !newPass || !confirmPass) {
      alert("الرجاء ادخال كلمة السر الحالية والجديدة وتأكيد الجديدة");
    } else if (newPass != confirmPass) {
      alert("كلمة السر الجديدة وتأكيد كلمة السر غير متطابقتان");
    } else if (state.valid_Password === false)
      alert("كلمة السر الحالية غير صحيحة");
    else {
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
      setChangePassword(false);
      setValidPassFalse();
      alert("تم تغيير كلمة السر");
      changePassword_Driver({ password: newPass });
    }
  };
  const cancelPasswoedFun = () => {
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setChangePassword(false);
    setValidPassFalse();
  };

  return (
    <ScrollView>
      <View style={styles.containerSty}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginHorizontal: 15,
          }}
        >
          <View style={styles.innerHeaderViewSty}>
            <MaterialIcons name="security" size={34} color="rgb(166, 0, 0)" />
            <Text style={styles.textLabelSty}>الأمان</Text>
          </View>

          <TouchableOpacity
            style={styles.TouchableOpacitySty}
            onPress={() => {
              setChangePassword(!changePassword);
            }}
          >
            <Ionicons name="key-outline" size={28} color="rgb(197, 191, 80)" />
            <Text style={styles.textChangesSty}>تغيير كلمة السر</Text>
          </TouchableOpacity>

          {changePassword ? (
            <View>
              <View style={styles.rowViewSty}>
                <Text style={styles.innerTextSty}>كلمة السر الحالية</Text>
                <TextInput
                  secureTextEntry={secureTextEntry1}
                  placeholder="********"
                  style={styles.innerInputTextSty}
                  onChangeText={(oldPass) => setOldPass(oldPass)}
                >
                  {oldPass}
                </TextInput>
                {showPass1 ? (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      setShowPass1(!showPass1);
                      SetsecureTextEntry1(!secureTextEntry1);
                    }}
                  >
                    <Feather name="eye" size={24} color="rgb(72, 165, 92)" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setShowPass1(!showPass1);
                      SetsecureTextEntry1(!secureTextEntry1);
                    }}
                  >
                    <Feather name="eye-off" size={24} color="gray" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.rowViewSty}>
                <Text style={styles.innerTextSty}>كلمة السر الجديدة</Text>
                <TextInput
                  secureTextEntry={secureTextEntry2}
                  style={styles.innerInputTextSty}
                  onChangeText={(newPass) => setNewPass(newPass)}
                >
                  {newPass}
                </TextInput>
                {showPass2 ? (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      setShowPass2(!showPass2);
                      SetsecureTextEntry2(!secureTextEntry2);
                    }}
                  >
                    <Feather name="eye" size={24} color="rgb(72, 165, 92)" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setShowPass2(!showPass2);
                      SetsecureTextEntry2(!secureTextEntry2);
                    }}
                  >
                    <Feather name="eye-off" size={24} color="gray" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.rowViewSty}>
                <Text style={styles.innerTextSty}>تأكيد كلمة السر</Text>
                <TextInput
                  secureTextEntry={secureTextEntry3}
                  onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                  style={styles.innerInputTextSty}
                >
                  {confirmPass}
                </TextInput>
                {showPass3 ? (
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      setShowPass3(!showPass3);
                      SetsecureTextEntry3(!secureTextEntry3);
                    }}
                  >
                    <Feather name="eye" size={24} color="rgb(72, 165, 92)" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setShowPass3(!showPass3);
                      SetsecureTextEntry3(!secureTextEntry3);
                    }}
                  >
                    <Feather name="eye-off" size={24} color="gray" />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  marginRight: 60,
                }}
              >
                <TouchableOpacity
                  style={styles.changeTouchableSty}
                  onPress={changePasswordFun}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 7,
                      color: "rgb(72, 200, 92)",
                    }}
                  >
                    تغيير
                  </Text>
                  <MaterialCommunityIcons
                    name="key-change"
                    size={24}
                    color="rgb(72, 200, 92)"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelTouchableSty}
                  onPress={cancelPasswoedFun}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 7,
                      color: "rgb(227, 13, 58)",
                    }}
                  >
                    الغاء
                  </Text>
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color="rgb(227, 13, 58)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.TouchableOpacitySty}
            onPress={() => {
              setChangeEmail(!changeEmail);
            }}
          >
            <MaterialIcons name="email" size={28} color="rgb(170, 153, 99)" />
            <Text style={styles.textChangesSty}>تغيير الإيميل</Text>
          </TouchableOpacity>
          {changeEmail ? (
            <View>
              <View style={styles.rowViewSty}>
                <Text style={styles.innerTextEmailSty}>الإيميل الحالي</Text>
                <TextInput
                  onChangeText={(oldEmail) => setOldEmail(oldEmail)}
                  style={styles.innerInputTextEmailSty}
                >
                  {oldEmail}
                </TextInput>
              </View>

              <View style={styles.rowViewSty}>
                <Text style={styles.innerTextEmailSty}>الإيميل الجديد</Text>
                <TextInput
                  onChangeText={(newEmail) => setNewEmail(newEmail)}
                  style={styles.innerInputTextEmailSty}
                >
                  {newEmail}
                </TextInput>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  marginRight: 60,
                }}
              >
                <TouchableOpacity
                  style={styles.changeTouchableSty}
                  onPress={changeEmailFun}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 7,
                      color: "rgb(72, 200, 92)",
                    }}
                  >
                    تغيير
                  </Text>
                  <MaterialCommunityIcons
                    name="email-sync"
                    size={24}
                    color="rgb(72, 200, 92)"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelTouchableSty}
                  onPress={cancelEmailFun}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 7,
                      color: "rgb(227, 13, 58)",
                    }}
                  >
                    الغاء
                  </Text>
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color="rgb(227, 13, 58)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.TouchableOpacitySty}
            onPress={() => {
              setChangePhoneNum(!changePhoneNum);
            }}
          >
            <FontAwesome
              name="phone-square"
              size={28}
              color="rgb(138, 188, 114)"
            />
            <Text style={styles.textChangesSty}>تغيير رقم الهاتف</Text>
          </TouchableOpacity>

          {changePhoneNum ? (
            <View>
              <View style={styles.rowViewSty}>
                <Text style={styles.innerTextEmailSty}>الرقم الحالي</Text>
                <TextInput
                  onChangeText={(oldPhoneNumber) =>
                    setOldPhoneNumber(oldPhoneNumber)
                  }
                  style={styles.innerInputTextEmailSty}
                ></TextInput>
              </View>
              <View style={styles.rowViewSty}>
                <Text style={styles.innerTextEmailSty}>الرقم الجديد</Text>
                <TextInput
                  onChangeText={(newPhoneNumber) =>
                    setNewPhoneNumber(newPhoneNumber)
                  }
                  style={styles.innerInputTextEmailSty}
                ></TextInput>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  paddingBottom: 10,
                  marginRight: 60,
                }}
              >
                <TouchableOpacity
                  style={styles.changeTouchableSty}
                  onPress={changePhoneNumberFun}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 7,
                      color: "rgb(72, 200, 92)",
                    }}
                  >
                    تغيير
                  </Text>

                  <MaterialCommunityIcons
                    name="cellphone-cog"
                    size={24}
                    color="rgb(72, 200, 92)"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelTouchableSty}
                  onPress={cancelPhoneNumberFun}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 7,
                      color: "rgb(227, 13, 58)",
                    }}
                  >
                    الغاء
                  </Text>
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color="rgb(227, 13, 58)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerSty: {},
  innerHeaderViewSty: {
    marginLeft: 10,
    marginTop: 15,

    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  textLabelSty: {
    fontSize: 18,

    fontWeight: "bold",
    color: "black",
  },
  TouchableOpacitySty: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginVertical: 15,
  },
  textChangesSty: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
    fontSize: 15,
  },
  rowViewSty: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 60,
    height: 40,
    borderRadius: 5,
    backgroundColor: "white",
  },
  innerTextSty: {
    paddingHorizontal: 10,
    marginLeft: 5,
    borderLeftColor: "gray",
    borderLeftWidth: 2,
    fontWeight: "bold",
    fontSize: 14,
    color: "gray",
    width: "40%",
  },
  innerTextEmailSty: {
    paddingHorizontal: 10,
    marginLeft: 5,
    borderLeftColor: "gray",
    borderLeftWidth: 2,
    fontWeight: "bold",
    fontSize: 14,
    color: "gray",
    width: "34%",
  },
  innerInputTextSty: {
    flexDirection: "row",
    width: "45%",
    marginLeft: 10,
    textAlign: "right",
    // borderColor: 'green',
    // borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,

    paddingHorizontal: 5,
  },
  innerInputTextEmailSty: {
    flexDirection: "row",
    width: "62%",
    marginLeft: 10,
    textAlign: "right",
    // borderColor: 'green',
    // borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,

    paddingHorizontal: 5,
  },
  changeTouchableSty: {
    marginLeft: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    //backgroundColor: 'rgb(72, 200, 92)'
  },
  cancelTouchableSty: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    // backgroundColor: 'rgb(227, 13, 58)'
  },
});

export default DriverWSettingsScreen;
