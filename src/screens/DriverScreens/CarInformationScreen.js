import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import DatePicker from "react-native-neat-date-picker";
import { Avatar } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import AppLoading from "expo-app-loading";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
//expo icons
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

//Context

import { Context as appDataContext } from "../../context/AppDataContext";

const CarInformationScreen = ({ navigation }) => {
  const { state, updateDriverCarInfo, clearErrorMessage } =
    useContext(appDataContext);

  const [isDataReady, setIsDataReady] = useState(false);
  const [carType, setCarType] = useState(state.car_data.carType);

  const [carModel, setModel] = useState(state.car_data.carModel);
  const [isValidModel, setIsValidModel] = useState(true);
  const [editModel, setEditModel] = useState(false);
  const [editModelFlag, setEditModelFlag] = useState(false);

  const [carBrand, setBrand] = useState(state.car_data.carBrand);
  const [isValidBrand, setIsValidBrand] = useState(true);
  const [editBrand, setEditBrand] = useState(false);
  const [editBrandFlag, setEditBrandFlag] = useState(false);

  //date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [carYear, setYear] = useState(state.car_data.carYear);

  const [carNumber, setNumber] = useState(state.car_data.carNumber);

  const [isValidNumber, setIsValidNumber] = useState(true);
  const [editNumber, setEditNumber] = useState(false);
  const [editNumberFlag, setEditNumberFlag] = useState(false);

  const [track, setTrack] = useState(state.car_data.track);
  const [isValidTrack, setIsValidTrack] = useState(true);
  const [editTrack, setEditTrack] = useState(false);
  const [editTrackFlag, setEditTrackFlag] = useState(false);

  const [showValidationCircle, setShowValidationCircle] = useState(false);

  //for menu
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const hideMenu2 = () => setVisible2(false);

  const showMenu2 = () => setVisible2(true);

  //for avatar

  // const [avatar, setAvatar] = useState(state.driver_data.avatar)

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);

    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    setYear([year, month, day].join("-"));
  };

  const [error, setError] = React.useState("");

  const validate = () => {
    if (!carNumber) {
      setIsValidNumber(false);
    } else {
      setError("");
      updateInfo();
    }
  };

  const cancel = () => {
    setCarType(state.car_data.carType);
    setModel(state.car_data.carModel);
    setBrand(state.car_data.carBrand);
    setYear(state.car_data.carYear);
    setNumber(state.car_data.carNumber);
    setTrack(state.car_data.track);
  };

  const updateInfo = () => {
    updateDriverCarInfo({
      carType,
      carBrand,
      carModel,
      carYear,
      carNumber,
      track,
    });
    setShowValidationCircle(true);
  };

  const clearErrorField = () => {
    clearErrorMessage();
    setError("");
  };

  return (
    <ScrollView>
      <NavigationEvents
        // onWillFocus = {() => { }}
        // onDidFocus = {() => { }}
        onWillBlur={clearErrorField}
        // onDidBlur = {() => {}}
      />

      <View style={styles.containerViewSty}>
        <View style={styles.headerViewSty}>
          <Image
            style={{ width: 240, height: 200 }}
            source={require("./../../../assets/footerImage.png")}
          />
        </View>

        <View style={styles.bodyViewSty}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 20,
              width: "100%",
            }}
          >
            <Text style={{ margin: 5, fontSize: 16, color: "#A8A8A8" }}>
              معلومات المركبة
            </Text>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>نوع المركبة</Text>
              </View>
              <TextInput editable={false} style={styles.textInputSty}>
                {carType}
              </TextInput>

              <TouchableOpacity style={styles.iconViewSty}>
                <Menu
                  visible={visible}
                  anchor={
                    <FontAwesome
                      onPress={showMenu}
                      name="caret-down"
                      size={30}
                      color="rgb(0,164,230)"
                    />
                  }
                  onRequestClose={hideMenu}
                >
                  <MenuItem
                    onPress={() => {
                      setCarType("تكسي");
                      hideMenu();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>تكسي</Text>
                  </MenuItem>
                  <MenuItem
                    onPress={() => {
                      setCarType("باص");
                      hideMenu();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>باص</Text>
                  </MenuItem>
                  <MenuItem
                    onPress={() => {
                      setCarType("حافلة");
                      hideMenu();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>حافلة</Text>
                  </MenuItem>
                </Menu>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>موديل المركبة</Text>
              </View>
              <TextInput
                onChangeText={(carModel) => {
                  setEditModelFlag(false);
                  setModel(carModel);
                  setIsValidModel(true);
                }}
                onBlur={() => {
                  setEditModelFlag(true);
                  setEditModel(false);
                }}
                style={styles.textInputSty}
                editable={editModel}
              >
                {carModel === "empty" ? "" : carModel}
              </TextInput>
              <TouchableOpacity
                style={styles.iconViewSty}
                onPress={() => setEditModel(true)}
              >
                {!isValidModel || carModel === "" ? (
                  <FontAwesome
                    name="exclamation-triangle"
                    size={24}
                    color="#FFDF4F"
                  />
                ) : editModel || !editModelFlag ? (
                  <MaterialIcons name="mode-edit" size={24} color="#A8A8A8" />
                ) : (
                  <Feather name="check-circle" size={24} color="green" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>طراز المركبة</Text>
              </View>
              <TextInput
                onChangeText={(carBrand) => {
                  setEditBrandFlag(false);
                  setBrand(carBrand);
                  setIsValidBrand(true);
                }}
                onBlur={() => {
                  setEditBrandFlag(true);
                  setEditBrand(false);
                }}
                style={styles.textInputSty}
                editable={editBrand}
              >
                {carBrand === "empty" ? "" : carBrand}
              </TextInput>
              <TouchableOpacity
                style={styles.iconViewSty}
                onPress={() => setEditBrand(true)}
              >
                {!isValidBrand || carBrand === "" ? (
                  <FontAwesome
                    name="exclamation-triangle"
                    size={24}
                    color="#FFDF4F"
                  />
                ) : editBrand || !editBrandFlag ? (
                  <MaterialIcons name="mode-edit" size={24} color="#A8A8A8" />
                ) : (
                  <Feather name="check-circle" size={24} color="green" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>سنة الاصدار</Text>
              </View>
              <TextInput editable={false} style={styles.textInputSty}>
                {carYear === "empty" ? "" : carYear}
              </TextInput>
              <TouchableOpacity
                style={styles.iconViewSty}
                onPress={openDatePicker}
              >
                {
                  <FontAwesome
                    name="calendar"
                    size={24}
                    color="rgb(0,164,230)"
                  />
                }
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>رقم اللوحة</Text>
              </View>
              <TextInput
                onChangeText={(carNumber) => {
                  setEditNumberFlag(false);
                  setNumber(carNumber);
                  setIsValidNumber(true);
                }}
                onBlur={() => {
                  setEditNumberFlag(true);
                  setEditNumber(false);
                }}
                style={styles.textInputSty}
                editable={editNumber}
              >
                {carNumber}
              </TextInput>
              <TouchableOpacity
                style={styles.iconViewSty}
                onPress={() => setEditNumber(true)}
              >
                {!isValidNumber || carNumber === "" ? (
                  <FontAwesome
                    name="exclamation-triangle"
                    size={24}
                    color="#FFDF4F"
                  />
                ) : editNumber || !editNumberFlag ? (
                  <MaterialIcons name="mode-edit" size={24} color="#A8A8A8" />
                ) : (
                  <Feather name="check-circle" size={24} color="green" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>خط المركبة</Text>
              </View>
              <TextInput editable={false} style={styles.textInputSty}>
                {track}
              </TextInput>

              <TouchableOpacity style={styles.iconViewSty}>
                <Menu
                  visible={visible2}
                  anchor={
                    <FontAwesome
                      onPress={showMenu2}
                      name="caret-down"
                      size={30}
                      color="rgb(0,164,230)"
                    />
                  }
                  onRequestClose={hideMenu2}
                >
                  <MenuItem
                    onPress={() => {
                      setTrack("البلد");
                      hideMenu2();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      الأكاديمية - البلد
                    </Text>
                  </MenuItem>
                  <MenuItem
                    onPress={() => {
                      setTrack("رفيديا");
                      hideMenu2();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      الأكاديمية - رفيديا
                    </Text>
                  </MenuItem>
                  <MenuItem
                    onPress={() => {
                      setTrack("المخفية");
                      hideMenu2();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      الأكاديمية - المخفية
                    </Text>
                  </MenuItem>
                  <MenuItem
                    onPress={() => {
                      setTrack("القديمة");
                      hideMenu2();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      الأكاديمية - الحرم القديم
                    </Text>
                  </MenuItem>
                </Menu>
              </TouchableOpacity>
            </View>
          </View>

          {/* --------------------------------------------------- */}
          <DatePicker
            isVisible={showDatePicker}
            mode={"single"}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                marginBottom: 18,
              }}
              onPress={validate}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                حفظ التغييرات
              </Text>
              <MaterialIcons
                name="published-with-changes"
                size={26}
                color="green"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row-reverse", alignItems: "center" }}
              onPress={cancel}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>إلغاء</Text>
              <MaterialIcons name="cancel" size={26} color="red" />
            </TouchableOpacity>
          </View>

          {showValidationCircle ? (
            <TouchableOpacity
              style={styles.circleValidationSty}
              onPress={() => setShowValidationCircle(false)}
            >
              <Feather name="check" size={75} color="green" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerViewSty: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerViewSty: {
    marginTop: 50,
    width: "100%",
    height: 200,

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyViewSty: {
    width: "85%",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  innerViewSty: {
    marginTop: 15,
    marginBottom: 0,
  },
  textSty: {
    fontSize: 15,
    color: "gray",
    fontWeight: "bold",
    marginVertical: 5,
  },
  textInputViewSty: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  textInputSty: {
    color: "black",
    backgroundColor: "white",
    height: 40,

    padding: 10,
    width: "50%",
    textAlign: "right",
  },
  attributeViewSty: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderLeftWidth: 2,
    borderLeftColor: "#F8F8F8",
    height: 40,
  },
  iconViewSty: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 40,
  },
  circleValidationSty: {
    position: "absolute",
    backgroundColor: "rgba(180, 255, 200, 0.5)",
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    bottom: 210,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "dashed",
    bottom: Dimensions.get("window").height / 2 - 70,
  },
});

export default CarInformationScreen;
