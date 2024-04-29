import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Pressable,
  Platform,
} from "react-native";

import { setNavigator } from "./src/navigationRef";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { StatusBar } from "expo-status-bar";

//
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

//for chat

import Chat from "./src/screens/DriverScreens/Chat";

import ChatDetail from "./src/screens/DriverScreens/ChatDetail";

import NewChatDetail from "./src/screens/DriverScreens/NewChatDetail";

//WelcomeScreens

import WelcomeScreen from "./src/WelcomeScreens/WelcomeScreen.js";
import LoadingScreen from "./src/WelcomeScreens/LoadingScreen.js";

//notification
import { NotifierWrapper } from "react-native-notifier";

//AuthonticationScreens

import SignUpStudentScreen from "./src/AuthonticationScreens/SignUp/SignUpStudentScreen";

import LogInScreen from "./src/AuthonticationScreens/LogIn/LogInScreen";

import SignUpDriverScreen from "./src/AuthonticationScreens/SignUp/SignUpDriverScreen";

import ResolveAuthScreen from "./src/AuthonticationScreens/ResolveAuthScreen";

import SignUpConfirmationScreenStudent from "./src/AuthonticationScreens/SignUpConfirmationStudent/SignUpConfirmationScreenStudent";

import SignUpConfirmationScreenDriver from "./src/AuthonticationScreens/SignUpConfirmationDriver/SignUpConfirmationScreenDriver";

import ConfirmedSignUpCode from "./src/AuthonticationScreens/ConfirmedSignUpCode";

//student
import Forgetpassword from "./src/AuthonticationScreens/ResetPasswordStudent/Forgetpassword";
import EnterForgetPasswordCode from "./src/AuthonticationScreens/ResetPasswordStudent/EnterForgetPasswordCode";
import EnterNewPassword from "./src/AuthonticationScreens/ResetPasswordStudent/EnterNewPassword";
import PasswordReseted from "./src/AuthonticationScreens/PasswordReseted";

//driver
import ForgetpasswordDriver from "./src/AuthonticationScreens/ResetPasswordDriver/ForgetpasswordDriver";
import EnterForgetPasswordCodeDriver from "./src/AuthonticationScreens/ResetPasswordDriver/EnterForgetPasswordCodeDriver";
import EnterNewPasswordDriver from "./src/AuthonticationScreens/ResetPasswordDriver/EnterNewPasswordDriver";

//hooks

import useLocation from "./src/hooks/useLocation";

//Screens

//Students

import HomeScreen from "./StudentApp/src/screens/HomeScreen";

import ChooseOrigin from "./StudentApp/src/screens/ChooseOrigin";

import ChooseDestination from "./StudentApp/src/screens/ChooseDestination";

import ChooseCar from "./StudentApp/src/screens/ChooseCar";

import OrderConfirmed from "./StudentApp/src/screens/OrderConfirmed";

import ConfirmTheOrder from "./StudentApp/src/screens/ConfirmTheOrder";

import DrawerCustomiza from "./StudentApp/src/screens/DrawerCustomiza";

import DummyScreen from "./StudentApp/src/screens/DummyScreen";

import Arraya from "./StudentApp/src/screens/Arraya";

import History from "./StudentApp/src/screens/History";

import Settings from "./StudentApp/src/screens/Settings";

import Profile from "./StudentApp/src/screens/Profile";

import SignOut from "./StudentApp/src/screens/SignOut";

//Drivers

import PrepareDriverAccount from "./src/screens/DriverScreens/PrepareDriverAccount";

import DriverHomeScreen from "./src/screens/DriverScreens/DriverHomeScreen.js";

import CarInformationScreen from "./src/screens/DriverScreens/CarInformationScreen";

import DriverInformationScreen from "./src/screens/DriverScreens/DriverInformationScreen";

import DriverWSettingsScreen from "./src/screens/DriverScreens/DriverSettingsScreen";

import OrdersHistoryScreen from "./src/screens/DriverScreens/OrdersHistoryScreen";

// import ChooseAccountScreen from './src/screens/ChooseAccountScreen';

import ListOrderds from "./src/screens/DriverScreens/ListOrders";

//new for notifications

import NotificationsHandeling from "./src/services/NotificationsHandeling";

//chat for student
import NotificationsHandelingStudentChat from "./src/services/NotificationsHandelingStudentChat";

import NotificationsOrder from "./src/services/NotificationsOrder";

//Provider

import { Provider as AuthProvider } from "./src/context/AuthContext";

import { Provider as AppDataProvider } from "./src/context/AppDataContext";

//Redux for Abood Jaber
import configureStore from "./StudentApp/src/store/configureStore";
const store = configureStore();
import { Provider } from "react-redux";

const switchNavigator = createSwitchNavigator({
  authonticationFlow: createStackNavigator({
    Signin: LogInScreen,

    SignupStudent: SignUpStudentScreen,
    SignupDriver: SignUpDriverScreen,

    SignupConfirmationStudent: SignUpConfirmationScreenStudent,
    SignupConfirmationDriver: SignUpConfirmationScreenDriver,
    ConfirmedSignUp: ConfirmedSignUpCode,

    Forgetpassword: Forgetpassword,
    EnterForgetPasswordCode: EnterForgetPasswordCode,
    EnterNewPassword: EnterNewPassword,
    PasswordReseted: PasswordReseted,

    ForgetpasswordDriver: ForgetpasswordDriver,
    EnterForgetPasswordCodeDriver: EnterForgetPasswordCodeDriver,
    EnterNewPasswordDriver: EnterNewPasswordDriver,

    PrepareDriverProfile: PrepareDriverAccount,
  }),

  studenFlow: createDrawerNavigator(
    {
      Home: {
        screen: createSwitchNavigator({
          before_Order_ConfirmedFlow: createStackNavigator({
            HomeScreen: HomeScreen,
            ChooseOrigin: ChooseOrigin,
            ChooseDestination: ChooseDestination,
            ChooseCar: ChooseCar,
            ConfirmTheOrder: ConfirmTheOrder,
            NotificationsOrder: NotificationsOrder,
          }),

          after_Order_ConfirmedFlow: {
            screen: createStackNavigator({
              OrderConfirmed: OrderConfirmed,
              NotificationsHandelingStudentChat:
                NotificationsHandelingStudentChat,
            }),
          },
        }),
        navigationOptions: {
          drawerIcon: ({ tintColor }) => (
            <Foundation name="page" size={24} color="black" />
          ),
          drawerLabel: "الصفحة الرئيسية",

          headerLeft: (
            <MaterialIcons
              name="account-box"
              size={25}
              color="rgb(41, 149, 164)"
            />
          ),
        },
      },

      About: {
        screen: Profile,
        navigationOptions: {
          drawerIcon: ({ tintColor }) => (
            <MaterialIcons
              name="account-box"
              size={25}
              color="rgb(41, 149, 164)"
            />
          ),
          drawerLabel: "الملف الشخصي",
        },
      },

      Profile: {
        screen: Settings,
        navigationOptions: {
          drawerIcon: ({ tintColor }) => (
            <Feather name="settings" size={25} color="rgb(69, 157, 226)" />
          ),
          drawerLabel: "الاعدادات",
        },
      },

      History: {
        screen: History,
        navigationOptions: {
          drawerIcon: ({ tintColor }) => (
            <MaterialIcons
              name="history"
              size={25}
              color="rgb(141, 139, 162)"
            />
          ),
          drawerLabel: "السجل",
        },
      },

      //

      SignOut: {
        screen: SignOut,

        navigationOptions: {
          drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
              name="logout"
              size={25}
              color="rgb(194, 54, 49)"
            />
          ),
          drawerLabel: "تسجيل الخروج",
        },
      },
    },

    {
      initialRouteName: "Home",
      drawerPosition: "right",
      contentOptions: {
        activeTintColor: "#e91e63",
        itemStyle: {
          margin: 5,
          flexDirection: "row-reverse",
        },
      },
      contentComponent: (props) => (
        // <ScrollView style={{backgroundColor:'red', flex:1 , borderBottomLeftRadius: 50}}>
        <ScrollView
          style={{ backgroundColor: "white", borderBottomLeftRadius: 50 }}
        >
          <SafeAreaView
            forceInset={{
              top: "always",
              horizontal: "never",
              flexDirection: "row-reverse",
            }}
          >
            {/* <SafeAreaView style = {{flex: 1, flexDirection: 'row-reverse'}}> */}
            {<DrawerCustomiza />}
            <DrawerItems
              {...props}
              activeTintColor="#2196f3"
              activeBackgroundColor="rgba(0, 0, 0, .04)"
              inactiveTintColor="rgba(0, 0, 0, .87)"
              inactiveBackgroundColor="transparent"
              style={{ backgroundColor: "#000000" }}
              labelStyle={{ color: "black" }}
            />
          </SafeAreaView>
        </ScrollView>
      ),
    }
  ),

  driverFlow: createStackNavigator({
    HomeDriver: {
      screen: DriverHomeScreen,
    },
    CarInformation: {
      screen: CarInformationScreen,
      navigationOptions: {
        title: "معلومات المركبة",
      },
    },

    DriverProfile: {
      screen: DriverInformationScreen,
      navigationOptions: {
        title: "بياناتي",
      },
    },

    DriverSettings: {
      screen: DriverWSettingsScreen,
      navigationOptions: {
        title: "الإعدادات",
      },
    },
    OrdersHistory: {
      screen: OrdersHistoryScreen,
      navigationOptions: {
        title: "طلبات هذا الشهر",
      },
    },
    ListOrderds: {
      screen: ListOrderds,
      navigationOptions: {
        title: "",
      },
    },

    NotificationsHandeling: {
      screen: NotificationsHandeling,
      navigationOptions: {
        title: "NotificationsHandeling",
      },
    },

    Chat: {
      screen: Chat,
      navigationOptions: {
        title: "المحادثات",
      },
    },

    ChatDetail: {
      screen: ChatDetail,
      navigationOptions: {
        title: "",
      },
    },

    NewChatDetail: {
      screen: NewChatDetail,
      navigationOptions: {
        title: "",
      },
    },
  }),
});

////////////////////////////////////

const App = createAppContainer(switchNavigator);

export default () => {
  useLocation();

  const [timerFlag, setTimerFlag] = useState(true);
  const [timerFlag2, setTimerFlag2] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTimerFlag(false); // count is 0 here
    }, 3000);
    setTimeout(() => {
      setTimerFlag2(false); // count is 0 here
    }, 6000);

    setTimerFlag(true);
    setTimerFlag2(true);
  }, []);

  if (timerFlag == true && timerFlag2 == true) {
    return (
      <>
        <StatusBar hidden />
        <WelcomeScreen />
      </>
    );
  } else if (timerFlag == false && timerFlag2 == true) {
    return (
      <>
        <StatusBar hidden />
        <LoadingScreen />
      </>
    );
  } else {
    ////
    return (
      <>
        <StatusBar hidden />

        <Provider store={store}>
          <AppDataProvider>
            <AuthProvider>
              <NotifierWrapper>
                <App
                  ref={(navigator) => {
                    setNavigator(navigator);
                  }}
                />
              </NotifierWrapper>
            </AuthProvider>
          </AppDataProvider>
        </Provider>
      </>
    );
  }
};
