import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CardStyleInterpolators } from "react-navigation-stack";
import {
    useFonts,
    ElMessiri_400Regular,
    ElMessiri_500Medium,
    ElMessiri_600SemiBold,
    ElMessiri_700Bold,
} from '@expo-google-fonts/el-messiri';

import AppLoading from 'expo-app-loading';

///expo icons

import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const StudentScreen = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        ElMessiri_400Regular,
        ElMessiri_500Medium,
        ElMessiri_600SemiBold,
        ElMessiri_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    else {

        return (

            <View style={styles.container}>

                <View style={styles.headerLogo}>
                    <View style={styles.logo}>
                        <Text style={styles.textLogo}>احجزلي  </Text>
                        <FontAwesome5 name="smile-wink" size={40} color="white" />
                    </View>


                </View>


                <View style={styles.header}>
                    <View style={styles.innerHeaderView}>
                        <TouchableOpacity onPress={() => { alert("notifications") }}>

                            <Ionicons name="notifications" size={30} color="white" />

                        </TouchableOpacity>
                    </View>


                    <View style={styles.innerHeaderView}>
                        <TouchableOpacity>
                            <Foundation name="list" size={30} color="white" />
                        </TouchableOpacity>
                    </View>




                </View>
                <ScrollView>
                    <View style={styles.innerContainer}>

                        <View style={styles.welcomeView}>
                            <Text style={styles.welcomeText}>أهلا بك في احجزلي </Text>
                        </View>



                        <View style={styles.view1}>

                            <View style={styles.view1_1}>
                                <TouchableOpacity onPress={() => {navigation.navigate('BookTaxi')}}>
                                    <View style={styles.TaxiBookView}>

                                        <FontAwesome name="car" size={40} color="#ffe44d" />



                                    </View>

                                    <View style={styles.view1_2}>
                                        <Text style={styles.textSty}>حجز تكسي</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.view1_1}>
                                <TouchableOpacity onPress={() => { alert("book a bus") }}>
                                    <View style={styles.BusBookView}>
                                        <FontAwesome5 name="bus-alt" size={40} color="#f8ba38" />
                                    </View>
                                    <View style={styles.view1_2}>
                                        <Text style={styles.textSty}>حجز حافلة</Text>

                                    </View>
                                </TouchableOpacity>

                            </View>


                        </View>
                        <View style={styles.view1}>
                            <View style={styles.view1_1}>
                                <TouchableOpacity onPress={() => { alert("الحجوزات السابقة ") }}>
                                    <View style={styles.archiveView}>


                                        <AntDesign name="carryout" size={45} color="#fa8072" />
                                    </View>

                                    <View style={styles.view1_2}>
                                        <Text style={styles.textSty}>الحجوزات السابقة</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={styles.view1}>
                            <View style={styles.view1_1}>
                                <TouchableOpacity onPress={() => { alert("الحجوزات السابقة ") }}>
                                    <View style={styles.trafficView}>


                                        <MaterialIcons name="report" size={50} color="red" />

                                    </View>

                                    <View style={styles.view1_2}>
                                        <Text style={styles.textSty}>الابلاغ عن ازمة</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                        <View style={styles.view1}>
                            <View style={styles.view1_1}>
                                <TouchableOpacity onPress={() => { alert("الحجوزات السابقة ") }}>
                                    <View style={styles.trafficView}>


                                        <MaterialIcons name="report" size={50} color="red" />

                                    </View>

                                    <View style={styles.view1_2}>
                                        <Text style={styles.textSty}>الابلاغ عن ازمة</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                       


                    </View>
                </ScrollView>

            </View >






        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(28,158,212)",
        display: "flex",
        flex: 1,



    },
    headerLogo:
    {
        backgroundColor: "rgb(28,158,212)",
        height: 80,
        flexDirection: "row-reverse",
        justifyContent: "space-between",

        padding: 10



    },

    header: {
        backgroundColor: "rgb(28,158,212)",
        height: 60,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",



    },
    innerHeaderView:
    {
        margin: 10
    },
    logo:
    {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",

    },
    textLogo:
    {
        fontSize: 30,
        color: "white",
        fontFamily: 'ElMessiri_700Bold',
    },
    innerContainer:
    {
        flex: 2,
        display: "flex",
        backgroundColor: "rgb(28,158,212)",
    },
    welcomeView:
    {
        margin: 20,



    },
    welcomeText:
    {

        fontSize: 20,
        fontWeight: "bold",

        color: "white"

    },
    view1:
    {

        marginHorizontal: "10%",
        margin: 10,
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(28,158,212)",
        borderBottomWidth: 2,
        borderBottomColor: "white"

    },
    TaxiBookView:
    {
        backgroundColor: "white",
        // marginHorizontal:"20%",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 10,
        borderWidth: 5,
        borderColor: "#ffe44d"

    },
    BusBookView:
    {
        backgroundColor: "white",
        // marginHorizontal:"20%",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 10,
        borderWidth: 5,
        borderColor: "#f8ba38"


    },
    archiveView:
    {
        backgroundColor: "white",
        // marginHorizontal:"20%",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 10,
        borderWidth: 5,
        borderColor: "#fa8072"

    },
    trafficView:
    {
        backgroundColor: "white",
        // marginHorizontal:"20%",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 10,
        borderWidth: 5,
        borderColor: "red"

    },
    view1_2:
    {
        marginTop: 0,
        marginBottom: 10,
        alignItems: "center",


    },

    textSty:
    {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"

    }

})


export default StudentScreen;