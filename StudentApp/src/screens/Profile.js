import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
  Image,
  Platform,
  Button,
} from "react-native";
import DatePicker from "react-native-neat-date-picker";
import { Avatar } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import AppLoading from "expo-app-loading";
import * as ImagePicker from "expo-image-picker";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
//expo icons
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/userSlice";
import LoadingPage from "./LoadingPage";
import { updateAvatar } from "../store/avatar";

const { width, height } = Dimensions.get("window");

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  //Information from redux
  const firstNameInitial = useSelector(
    (state) => state.entities.userSlice.student.firstName
  );
  const lastNameInitial = useSelector(
    (state) => state.entities.userSlice.student.lastName
  );
  const emailInitial = useSelector(
    (state) => state.entities.userSlice.student.email
  );
  const genderInitial = useSelector(
    (state) => state.entities.userSlice.student.gender
  );
  const cityInitial = useSelector(
    (state) => state.entities.userSlice.student.city
  );
  // const DOBInitial = moment(useSelector(state => state.entities.userSlice.student.DOB)).format('DD-MM-YYYY');

  const DOBInitial = useSelector(
    (state) => state.entities.userSlice.student.DOB
  );

  const loading = useSelector((state) => state.entities.userSlice.loading);

  const avatarRedux = useSelector((state) => state.entities.avatar.avatar);
  const loadingAvatar = useSelector((state) => state.entities.avatar.loading);

  const [isDataReady, setIsDataReady] = useState(false);
  const [profileImg, setProfileImg] = React.useState([]);

  //under profile pecture
  // const [firstName_Title, setFirstNameTitle] = useState("عبدالرحمن")
  // const [lasttName_Title, setLastNameTitle] = useState("جابر");
  const [email, setEmail] = useState(emailInitial);

  //First Name
  const [isValiFirstName, setIsValidFirstName] = useState(true);
  const [firstName, setFirstName] = useState(firstNameInitial);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editFirstNameFlag, setEditFirstNameFlag] = useState(false);

  //Last Name
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [lastName, setLastName] = useState(lastNameInitial);
  const [editLastName, setEditLastName] = useState(false);
  const [editLastNameFlag, setEditLastNameFlag] = useState(false);

  //city
  const [isValidCity, setIsValidCtiy] = useState(true);
  const [city, setCity] = useState(cityInitial);
  const [editCity, setEditCity] = useState(false);
  const [editCityFlag, setEditCityFlag] = useState(false);

  const [showValidationCircle, setShowValidationCircle] = useState(false);

  //date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [DOB, setDOB] = useState(DOBInitial);

  //Gender
  const [gender, setGender] = useState(genderInitial);

  //for menu
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  //for avatar

  const [avatar, setAvatar] = useState(avatarRedux);

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

    setDOB([day, month, year].join("-"));
  };

  const [error, setError] = React.useState("");

  const validate = () => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (!firstName) {
      // alert("الرجاء ادخال الاسم الأول")
      setIsValidFirstName(false);
    } else if (!lastName) {
      // alert("الرجاء ادخال اسم العائلة")
      setIsValidLastName(false);
    } else if (!gender) {
      alert("الرجاء تحديد الجنس");
    } else if (!city) {
      setIsValidCtiy(false);
    } else if (!DOB) {
      alert("الرجاء ادخال تاريخ ميلادك");
    } else {
      // console.log('fff')
      dispatch(
        updateProfile({ firstName, lastName, DOB, email, gender, city })
      );
    }
  };

  //new
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
      //setAvatar(result.uri);
      //console.log(avatar)
      dispatch(updateAvatar({ avatar: result.uri }));
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  if (loading === true || loadingAvatar === true) {
    return <LoadingPage />;
  }

  return (
    <ScrollView>
      <NavigationEvents
        onWillFocus={() => {
          setFirstName(firstNameInitial);
          setEditFirstName(true);

          setLastName(lastNameInitial);
          setEditLastName(true);

          setEmail(emailInitial);

          setGender(genderInitial);

          setCity(cityInitial);
          setEditCity(true);

          setDOB(DOBInitial);
        }}
      />

      <View style={styles.containerViewSty}>
        <View style={styles.headerViewSty}>
          {avatar === "" ? (
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
              activeOpacity={0.7}
            />
          ) : (
            <Avatar
              size="xlarge"
              rounded
              source={{ uri: avatarRedux }}
              activeOpacity={0.7}
            />
          )}

          <TouchableOpacity
            style={styles.penAvatarSty}
            onPress={() => pickImage()}
          >
            <EvilIcons name="camera" size={45} color="black" />
          </TouchableOpacity>

          <View style={{ flexDirection: "row-reverse" }}>
            <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
              {firstNameInitial + " "}
            </Text>
            <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
              {lastNameInitial}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 7,
              fontSize: 13,
              fontWeight: "bold",
              color: "gray",
            }}
          >
            {emailInitial}
          </Text>
        </View>

        <View style={styles.bodyViewSty}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: height * 0.015,
              width: "100%",
            }}
          >
            <FontAwesome name="smile-o" size={24} color="#A8A8A8" />
            <Text
              style={{ marginHorizontal: 10, fontSize: 16, color: "#A8A8A8" }}
            >
              بياناتي
            </Text>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>الاسم الأول</Text>
              </View>
              <TextInput
                onChangeText={(firstName) => {
                  setEditFirstNameFlag(false);
                  setFirstName(firstName);
                  setIsValidFirstName(true);
                }}
                onBlur={() => {
                  setEditFirstNameFlag(true);
                  setEditFirstName(false);
                }}
                style={styles.textInputSty}
                // editable={editFirstName}
              >
                {firstName}
              </TextInput>
              <TouchableOpacity
                style={styles.iconViewSty}
                onPress={() => setEditFirstName(true)}
              >
                {!isValiFirstName || firstName === "" ? (
                  <FontAwesome
                    name="exclamation-triangle"
                    size={24}
                    color="#FFDF4F"
                  />
                ) : editFirstName || !editFirstNameFlag ? (
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
                <Text style={{ color: "#A8A8A8" }}>الاسم الأخير</Text>
              </View>
              <TextInput
                onChangeText={(lastName) => {
                  setEditLastNameFlag(false);
                  setLastName(lastName);
                  setIsValidLastName(true);
                }}
                onBlur={() => {
                  setEditLastNameFlag(true);
                  setEditLastName(false);
                }}
                style={styles.textInputSty}
                // editable={editLastName}
              >
                {lastName}
              </TextInput>
              <TouchableOpacity
                style={styles.iconViewSty}
                onPress={() => setEditLastName(true)}
              >
                {!isValidLastName || lastName === "" ? (
                  <FontAwesome
                    name="exclamation-triangle"
                    size={24}
                    color="#FFDF4F"
                  />
                ) : editLastName || !editLastNameFlag ? (
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
                <Text style={{ color: "#A8A8A8" }}>الجنس</Text>
              </View>
              <TextInput editable={false} style={styles.textInputSty}>
                {gender}
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
                      setGender("ذكر");
                      hideMenu();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>ذكر</Text>
                  </MenuItem>

                  <MenuItem
                    onPress={() => {
                      setGender("أنثى");
                      hideMenu();
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>أنثى</Text>
                  </MenuItem>
                </Menu>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerViewSty}>
            <View style={styles.textInputViewSty}>
              <View style={styles.attributeViewSty}>
                <Text style={{ color: "#A8A8A8" }}>البلد - المدينة</Text>
              </View>
              <TextInput
                onChangeText={(city) => {
                  setEditCityFlag(false);
                  setCity(city);
                  setIsValidCtiy(true);
                }}
                onBlur={() => {
                  setEditCityFlag(true);
                  setEditCity(false);
                }}
                style={styles.textInputSty}
                // editable={editCity}
              >
                {city}
              </TextInput>

              <TouchableOpacity
                style={styles.iconViewSty}
                onPress={() => setEditCity(true)}
              >
                {!isValidCity || city === "" ? (
                  <FontAwesome
                    name="exclamation-triangle"
                    size={24}
                    color="#FFDF4F"
                  />
                ) : editCity || !editCityFlag ? (
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
                <Text style={{ color: "#A8A8A8" }}>تاريخ الميلاد</Text>
              </View>
              <TextInput editable={false} style={styles.textInputSty}>
                {DOB}
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
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.4,

    backgroundColor: "#f1f1f1",
  },
  bodyViewSty: {
    width: "100%",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.6,
    // backgroundColor: 'red'
  },
  innerViewSty: {
    marginTop: height * 0.015,
    // marginTop: 10,

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
    width: "60%",
    textAlign: "right",
  },
  attributeViewSty: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderLeftWidth: 2,
    borderLeftColor: "#F8F8F8",
  },
  iconViewSty: {
    width: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  penAvatarSty: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // backgroundColor: 'rgb(255,255,255)',
    height: 45,
    width: 45,
    borderRadius: 45,
    top: height * 0.22,
    left: 127,
    padding: 0,
    // borderWidth:1,
    // borderStyle:'dashed',
    // borderColor:'black'
  },
});

export default Profile;
