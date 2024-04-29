import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, Image, Platform, Button } from "react-native";
import DatePicker from 'react-native-neat-date-picker'
import { Avatar } from 'react-native-elements';
import { NavigationEvents } from "react-navigation";
import AppLoading from 'expo-app-loading';
import * as ImagePicker from 'expo-image-picker';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
//expo icons
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

//Context

import { Context as appDataContext } from "../../context/AppDataContext";

const DriverInformationScreen = ({ navigation }) => {

    //new




    const { state, updateDriverInfo, clearErrorMessage, changeAvatar } = useContext(appDataContext);

    const [isDataReady, setIsDataReady] = useState(false);


    const [profileImg, setProfileImg] = React.useState([]);

    //under profile pecture 
    const [firstName_Title, setFirstNameTitle] = useState(state.driver_data.firstName);
    const [lasttName_Title, setLastNameTitle] = useState(state.driver_data.lastName);
    const [email_Title, setEmailTitle] = useState(state.driver_data.email);


    const [isValiFirstName, setIsValidFirstName] = useState(true)
    const [firstName, setFirstName] = useState(state.driver_data.firstName);
    const [editFirstName, setEditFirstName] = useState(false);
    const [editFirstNameFlag, setEditFirstNameFlag] = useState(false);

    const [isValidLastName, setIsValidLastName] = useState(true)
    const [lastName, setLastName] = useState(state.driver_data.lastName);
    const [editLastName, setEditLastName] = useState(false);
    const [editLastNameFlag, setEditLastNameFlag] = useState(false);




    //city
    const [isValidCity, setIsValidCtiy] = useState(true)
    const [city, setCity] = useState(state.driver_data.city);
    const [editCity, setEditCity] = useState(false);
    const [editCityFlag, setEditCityFlag] = useState(false);


    const [showValidationCircle, setShowValidationCircle] = useState(false)

    //date
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [DOB, setDOB] = useState(state.driver_data.DOB)

    //Gender
    const [gender, setGender] = useState(state.driver_data.gender)


    //for menu
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    //for avatar

    const [avatar, setAvatar] = useState(state.driver_data.avatar)


    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {

        setShowDatePicker(false)
    }

    const onConfirm = (date) => {
        setShowDatePicker(false);

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;


        setDOB([year, month, day].join('-'));

    }

    const [error, setError] = React.useState("");

    const validate = () => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        if (!firstName) {

            // alert("الرجاء ادخال الاسم الأول")
            setIsValidFirstName(false);

        }
        else if (!lastName) {
            // alert("الرجاء ادخال اسم العائلة")
            setIsValidLastName(false);
        }

        else if (!gender) {
            alert("الرجاء تحديد الجنس")

        }
        else if (!city) {
            setIsValidCtiy(false);
        }
        else if (!DOB) {
            alert("الرجاء ادخال تاريخ ميلادك")
        }

        else {

            setError("");
            updateInfo();
        }
    }

    const cancel = () => {

        setFirstName(state.driver_data.firstName)
        setLastName(state.driver_data.lastName);
        setCity(state.driver_data.city);
        setDOB(state.driver_data.DOB)
        setGender(state.driver_data.gender)


    }

    const updateInfo = () => {
        updateDriverInfo({ firstName, lastName, gender, DOB, city });


        setShowValidationCircle(true);



    }


    const clearErrorField = () => {
        clearErrorMessage();
        setError("");

    }


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
            changeAvatar({ avatar: result.uri });
        }
    };


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);




    return (

        < ScrollView >




            <NavigationEvents
                // onWillFocus = {() => { }}
                // onDidFocus = {() => { }}
                onWillBlur={clearErrorField}
            // onDidBlur = {() => {}}

            />


            <View style={styles.containerViewSty}>






                <View style={styles.headerViewSty}>
                    {
                        avatar === '' ?
                            <Avatar
                                size="xlarge"
                                rounded
                                //source={{ uri: `data:image/png;base64,${avatar}` }}

                                source={{ uri: './../../../assets/emptyProfilePhoto.png' }}

                                activeOpacity={0.7}


                            />
                            :
                            <Avatar
                                size="xlarge"
                                rounded
                                //source={{ uri: `data:image/png;base64,${avatar}` }}

                                source={{ uri: avatar }}

                                activeOpacity={0.7}


                            />
                    }
               

                    <TouchableOpacity style={styles.penAvatarSty} onPress={() => pickImage()}>
                        <EvilIcons name="camera" size={45} color="black" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Text style={{ marginTop: 20, marginHorizontal: 5, fontSize: 16, fontWeight: "bold" }}>{firstName_Title}</Text>
                        <Text style={{ marginTop: 20, marginHorizontal: 5, fontSize: 16, fontWeight: "bold" }}>{lasttName_Title}</Text>

                    </View>
                    <Text style={{ marginTop: 7, fontSize: 13, fontWeight: "bold", color: 'gray' }}>{email_Title}</Text>



                </View>

                <View style={styles.bodyViewSty}>

                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: "center", marginTop: 20, width: "100%" }}>
                        <FontAwesome name="smile-o" size={24} color='#A8A8A8' />
                        <Text style={{ margin: 5, fontSize: 16, color: '#A8A8A8' }}>بياناتي</Text>


                    </View>


                    <View style={styles.innerViewSty}>


                        <View style={styles.textInputViewSty}>
                            <View style={styles.attributeViewSty}>
                                <Text style={{ color: "#A8A8A8" }}>الاسم الأول</Text>
                            </View>
                            <TextInput

                                onChangeText={(firstName) => {
                                    setEditFirstNameFlag(false)
                                    setFirstName(firstName)
                                    setIsValidFirstName(true)

                                }}
                                onBlur={() => {
                                    setEditFirstNameFlag(true);
                                    setEditFirstName(false);

                                }}

                                style={styles.textInputSty}
                                editable={editFirstName}

                            >
                                {firstName}

                            </TextInput>
                            <TouchableOpacity style={styles.iconViewSty} onPress={() => setEditFirstName(true)}>

                                {

                                    !isValiFirstName || firstName === "" ?


                                        <FontAwesome name="exclamation-triangle" size={24} color="#FFDF4F" />

                                        :
                                        editFirstName || !editFirstNameFlag ?
                                            <MaterialIcons name="mode-edit" size={24} color='#A8A8A8' />
                                            : <Feather name="check-circle" size={24} color="green" />

                                }


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
                                    setEditLastNameFlag(false)
                                    setLastName(lastName)
                                    setIsValidLastName(true)

                                }}
                                onBlur={() => {
                                    setEditLastNameFlag(true);
                                    setEditLastName(false);

                                }}

                                style={styles.textInputSty}
                                editable={editLastName}

                            >

                                {lastName}

                            </TextInput>
                            <TouchableOpacity style={styles.iconViewSty} onPress={() => setEditLastName(true)}>
                                {
                                    !isValidLastName || lastName === "" ?


                                        <FontAwesome name="exclamation-triangle" size={24} color="#FFDF4F" />

                                        :
                                        editLastName || !editLastNameFlag ?
                                            <MaterialIcons name="mode-edit" size={24} color='#A8A8A8' />
                                            : <Feather name="check-circle" size={24} color="green" />


                                }

                            </TouchableOpacity>



                        </View>



                    </View>

                    <View style={styles.innerViewSty}>


                        <View style={styles.textInputViewSty}>
                            <View style={styles.attributeViewSty}>
                                <Text style={{ color: "#A8A8A8" }}>الجنس</Text>
                            </View>
                            <TextInput
                                editable={false}
                                style={styles.textInputSty}

                            >
                                {

                                    gender === 'male' ?

                                        'ذكر'

                                        : 'أنثى'

                                }

                            </TextInput>

                            <TouchableOpacity style={styles.iconViewSty} >
                                <Menu

                                    visible={visible}
                                    anchor={<FontAwesome onPress={showMenu} name="caret-down" size={30} color='rgb(0,164,230)' />}
                                    onRequestClose={hideMenu}

                                >




                                    <MenuItem onPress={() => { setGender('male'); hideMenu() }}>


                                        <Text style={{ fontWeight: "bold" }}>ذكر</Text>

                                    </MenuItem>
                                    <MenuItem onPress={() => { setGender('female'); hideMenu() }} >


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
                                    setEditCityFlag(false)
                                    setCity(city)
                                    setIsValidCtiy(true)



                                }}
                                onBlur={() => {
                                    setEditCityFlag(true);
                                    setEditCity(false);

                                }}

                                style={styles.textInputSty}
                                editable={editCity}

                            >
                                {city}

                            </TextInput>
                            <TouchableOpacity style={styles.iconViewSty} onPress={() => setEditCity(true)}>

                                {

                                    !isValidCity || city === "" ?


                                        <FontAwesome name="exclamation-triangle" size={24} color="#FFDF4F" />

                                        :
                                        editCity || !editCityFlag ?
                                            <MaterialIcons name="mode-edit" size={24} color='#A8A8A8' />
                                            : <Feather name="check-circle" size={24} color="green" />

                                }


                            </TouchableOpacity>



                        </View>



                    </View>






                    <View style={styles.innerViewSty}>


                        <View style={styles.textInputViewSty}>
                            <View style={styles.attributeViewSty}>
                                <Text style={{ color: "#A8A8A8" }}>تاريخ الميلاد</Text>
                            </View>
                            <TextInput
                                editable={false}
                                style={styles.textInputSty}

                            >
                                {DOB}
                            </TextInput>
                            <TouchableOpacity style={styles.iconViewSty} onPress={openDatePicker}>
                                {
                                    <FontAwesome name="calendar" size={24} color='rgb(0,164,230)' />

                                }

                            </TouchableOpacity>



                        </View>



                    </View>
                    <DatePicker

                        isVisible={showDatePicker}
                        mode={'single'}
                        onCancel={onCancel}
                        onConfirm={onConfirm}
                    />
                    <View style={{ alignItems: 'center', marginTop: 30 }}>

                        <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 18 }} onPress={validate}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                حفظ التغييرات
                            </Text>
                            <MaterialIcons name="published-with-changes" size={26} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center' }} onPress={cancel}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                إلغاء
                            </Text>
                            <MaterialIcons name="cancel" size={26} color="red" />
                        </TouchableOpacity>







                    </View>

                    {
                        showValidationCircle ?
                            <TouchableOpacity style={styles.circleValidationSty} onPress={() => setShowValidationCircle(false)}>
                                <Feather name="check" size={75} color="green" />

                            </TouchableOpacity>

                            :
                            null
                    }






                </View>












            </View>

        </ScrollView >





    )




}


const styles = StyleSheet.create({

    containerViewSty:
    {

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',



    },
    headerViewSty:
    {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    bodyViewSty:
    {
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    innerViewSty:
    {

        marginTop: 10,
        marginBottom: 0



    },
    textSty:
    {
        fontSize: 15,
        color: 'gray',
        fontWeight: 'bold',
        marginVertical: 5
    },
    textInputViewSty:
    {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'

    },
    textInputSty:
    {
        color: 'black',
        backgroundColor: 'white',
        height: 40,

        padding: 10,
        width: '60%',
        textAlign: 'right'
    },
    attributeViewSty:
    {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderLeftWidth: 2,
        borderLeftColor: "#F8F8F8"


    },
    iconViewSty:
    {
        width: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',


    },
    circleValidationSty:
    {
        position: 'absolute',
        backgroundColor: "rgba(180, 255, 200, 0.5)",
        borderRadius: 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 210,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: "black",
        borderWidth: 2,
        borderStyle: 'dashed',
        bottom: Dimensions.get('window').height / 2 - 70


    },
    penAvatarSty:
    {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // backgroundColor: 'rgb(255,255,255)',
        height: 45,
        width: 45,
        borderRadius: 45,
        top: 140,
        left: 127,
        padding: 0,
        // borderWidth:1,
        // borderStyle:'dashed',
        // borderColor:'black'

    }


})


export default DriverInformationScreen;