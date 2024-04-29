import AsyncStorage from "@react-native-async-storage/async-storage";

import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
const dataReducer = (state, action) => {

    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload } // return new state with error object

        case 'driverInfo':

            return { ...state, errorMessage: '', driver_data: action.payload }
        case 'driverAvatar':

            return { ...state, errorMessage: '', driver_avatar: action.payload }


        case 'driverUpdateInfo':

            // console.log(action.payload)
            return { ...state, errorMessage: '', updateDriverInfoStatus: action.payload }

        case 'driverCarInfo':
            return { ...state, errorMessage: '', car_data: action.payload }


        case 'driverUpdateCarInfo':

            return { ...state, errorMessage: '', driverToken: action.payload }

        case 'driverOrders':
            return { ...state, errorMessage: '', orders: action.payload }


        case 'setDriverAvailable':
            return { ...state, errorMessage: '' }

        case 'newOrder':
            return { ...state, errorMessage: '', newOrder: action.payload }

        case 'delete_Order':
            return { ...state, errorMessage: '', newOrder: action.payload }
        case 'price':
            return { ...state, errorMessage: '', price: action.payload }
        case 'setNewOrderFlag':
            return { ...state, errorMessage: '', orderFlag: action.payload }

        case 'setNewMessageFlag':
            return { ...state, errorMessage: '', messageFlag: action.payload }
        case 'newMessage':
            return { ...state, errorMessage: '', newMessage: action.payload }
        case 'driversFromSearch':
            return { ...state, errorMessage: '', driversFromSearch: action.payload }

        case "driverChats":
            return { ...state, errorMessage: '', chats: action.payload }
        case 'cleare_message_error':

            return { ...state, driverToken: '', errorMessage: '' }

        case 'trafficPoints':

            return { ...state, errorMessage: '', traffic_Points: action.payload }

        case 'validPassword':
            return { ...state, errorMessage: '', valid_Password: action.payload }
        default:
            return state;
    }

};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'cleare_message_error' })

};


// Driver
const getDriverInfo = dispatch => async () => {


    try {

        //new
        const driver_token = await AsyncStorage.getItem('driver_token');

        // console.log(token)




        const response = await trackerApi.post('/driver/me', { driver_token });




        dispatch({ type: 'driverInfo', payload: response.data.driver });
        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};
const getDriverProfilePhoto = dispatch => async () => {


    try {


        const responseAvatar = await trackerApi.get('/driver/me/avatar');

        // console.log(response.data.driver)

        dispatch({ type: 'driverAvatar', payload: responseAvatar.data });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};



const updateDriverInfo = dispatch => async ({ firstName, lastName, gender, DOB, city }) => {


    try {

        const response = await trackerApi.patch('/driver/me', { firstName, lastName, gender, DOB, city });

        dispatch({ type: 'driverInfo', payload: response.data });//response.data 


    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};

//store driver expoNotification token

const storeDriverExpoPushToken = dispatch => async ({ pushNotificationToken }) => {


    try {

        //console.log(pushNotificationToken)

        const response = await trackerApi.patch('/storeExpoToken', { pushNotificationToken });

        dispatch({ type: 'driverInfo', payload: response.data });//response.data 
        //

    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};
// DriverCarInfo
const getDriverCarInfo = dispatch => async () => {


    try {

        //new
        const driver_token = await AsyncStorage.getItem('driver_token');

        // console.log(token)




        const response = await trackerApi.post('/driverCarInfo/me');


        // console.log(response.data.driver)
        dispatch({ type: 'driverCarInfo', payload: response.data.carInfo });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};



const updateDriverCarInfo = dispatch => async ({ carType, carBrand, carModel, carYear, carNumber, track }) => {


    try {

        const response = await trackerApi.patch('/driverCarInfo', { carType, carBrand, carModel, carYear, carNumber, track });



        dispatch({ type: 'driverCarInfo', payload: response.data.carInfo });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};



// set the driver available

const setDriverAvailable = dispatch => async ({ carType, track, longitude, latitude, heading }) => {


    try {

        const response = await trackerApi.post('/availableDrivers', { carType, track, longitude, latitude, heading });



        // dispatch({ type: 'setDriverAvailable', payload: response.data });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};
const updateDriverLocation = dispatch => async ({ longitude, latitude, heading }) => {


    try {

        const response = await trackerApi.patch('/availableDrivers', { longitude, latitude, heading });



        // dispatch({ type: 'setDriverAvailable', payload: response.data });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};
const deleteAvaiableDrivers = dispatch => async () => {
    try {

        const response = await trackerApi.delete('/availableDrivers');



        // dispatch({ type: 'setDriverAvailable', payload: response.data });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}



// for notifications
const receiveNotification = dispatch => async ({ gate, code, gateLatitude, gateLongitude, studentInformation,totalPrice, studentsPushToken}) => {
    try {

        // gateLatitude: notification.request.content.data.gateLatitude,
        // gateLongitude: notification.request.content.data.gateLongitude,
        // studentInformation: notification.request.content.data.studentInformation
        // console.log("hi")
        // console.log(gateLatitude)
        // console.log(gateLongitude)
        // console.log(studentInformation)

        // console.log(userExpoPushNotificationToken)
        // console.log(dataMessage)
        if (gate && code) {
            dispatch({ type: 'newOrder', payload: { gate, code, gateLatitude, gateLongitude, studentInformation,totalPrice,studentsPushToken }});
        }


    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}

//delete newOrder 
const deleteNewOrder = dispatch => async () => {
    try {





        dispatch({ type: 'delete_Order', payload: '' });




    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}

// for price

const setPrice = dispatch => async ({ price }) => {
    try {





        dispatch({ type: 'price', payload: price });




    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}

//for Avatart

const changeAvatar = dispatch => async ({ avatar }) => {
    try {



        // await trackerApi.delete('/driver/me/avatar');

        const response = await trackerApi.patch('/driver/me/avatar', { avatar });
        // console.log(avatar)
        // console.log(response)
        // await getDriverInfo();


        dispatch({ type: 'driverInfo', payload: response.data.driver });




    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}



//for notifications



const newOrder = dispatch => async ({ flag }) => {
    try {





        dispatch({ type: 'setNewOrderFlag', payload: flag });




    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}



//for orders 
//for Orders
const getDriverOrders = dispatch => async () => {


    try {

        //new
        const driver_token = await AsyncStorage.getItem('driver_token');

        // console.log(token)

        const response = await trackerApi.post('/getDriverOrders');


        // console.log(response.data.driver)
        dispatch({ type: 'driverOrders', payload: response.data.orders });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};

const addNewOrder = dispatch => async ({ gate, code }) => {
    try {

        //new
        const driver_token = await AsyncStorage.getItem('driver_token');

        // console.log(token)

        const response = await trackerApi.patch('/driverOrders', { gate, code });


        // console.log(response.data.driver)
        dispatch({ type: 'driverOrders', payload: response.data.orders });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}

const acceptOrderContext = dispatch => async ({ driverName, carNumber, code, gate }) => {


    try {



        await trackerApi.post('/acceptOrder', { type: "order", driverName, carNumber, code, gate });

    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};

//for chat
// for notifications
const receiveMessage = dispatch => async ({ type, userId, userExpoPushNotificationToken, text, userName, _id, avatar }) => {
    try {

        // console.log(gate)
        // console.log(code)
        // console.log(userId)

        // console.log(userExpoPushNotificationToken)
        // console.log(dataMessage)
        // if (type && userId && text && userName && userExpoPushNotificationToken && _id) {

        dispatch({ type: 'newMessage', payload: { type, userId, userExpoPushNotificationToken, text, userName, _id, avatar } });
        // }


    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}
const newMessage = dispatch => async ({ flag }) => {
    try {

        dispatch({ type: 'setNewMessageFlag', payload: flag });




    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}


const searchDriverByName = dispatch => async ({ driverName }) => {


    try {



        // console.log(driverName)
        const response = await trackerApi.post('/searchDriverByName', { driverName });


        //console.log(response.data.drivers)

        dispatch({ type: 'driversFromSearch', payload: response.data.drivers });
        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};


const saveMessage = dispatch => async ({ userId, userExpoPushNotificationToken, text, userName, _id, avatar }) => {


    try {



        console.log(avatar)
        const response = await trackerApi.patch('/saveMessage', { userId, userExpoPushNotificationToken, text, userName, _id, avatar });

        dispatch({ type: 'add_error', payload: "" })
        //  console.log(response.data.chat)

        //dispatch({ type: 'driversFromSearch', payload: response.data.chat });
        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};

const getDriverChats = dispatch => async () => {


    try {

        //new
        const driver_token = await AsyncStorage.getItem('driver_token');

        // console.log(token)

        const response = await trackerApi.post('/getAllChats');


        // console.log(response.data.chats)

        if (!response.data.chats) {
            dispatch({ type: 'driverChats', payload: "no messages" });
        }
        else {
            dispatch({ type: 'driverChats', payload: response.data.chats });

        }

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })



    }


};


const addTrafficPoint = dispatch => async ({ latitude, longitude }) => {


    try {

        //   console.log(latitude)
        //   console.log(longitude)
        await trackerApi.post('/addTraffic', { latitude, longitude });

        //  console.log(response.data)
    } catch (err) {

        console.log(err)
        //  dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};

const deleteTrafficPoint = dispatch => async () => {
    try {

        const response = await trackerApi.delete('/traffic');

    } catch (err) {

        //  dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}

const getTrafficPoints = dispatch => async () => {


    try {



        const response = await trackerApi.get('/getTraffic');


        //console.log(response.data.trafficPoints)

        dispatch({ type: 'trafficPoints', payload: response.data.trafficPoints });

        //navigate to main flow



    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};

// Driver Settings

const checkPassword_Driver = dispatch => async ({ password }) => {


    const response = await trackerApi.post('driver/checkPassword', { password });

    //console.log(response.data.validPassword)
    dispatch({ type: 'validPassword', payload: response.data.validPassword });


};
//setValidPassFalse

const setValidPassFalse = dispatch => async () => {



    dispatch({ type: 'validPassword', payload: false });


};


const deleteMessages = dispatch => async () => {
    try {

        const response = await trackerApi.delete('/deleteMessages');

    } catch (err) {

        //  dispatch({ type: 'add_error', payload: err.response.data.error })

    }

}

export const { Provider, Context } = createDataContext(
    dataReducer,
    { updateDriverInfo, getDriverInfo, getDriverCarInfo, updateDriverCarInfo, getDriverProfilePhoto, setDriverAvailable, updateDriverLocation, deleteAvaiableDrivers, receiveNotification, getDriverOrders, addNewOrder, changeAvatar, newOrder, acceptOrderContext, searchDriverByName, saveMessage, getDriverChats, newMessage, receiveMessage, storeDriverExpoPushToken, addTrafficPoint, deleteTrafficPoint, getTrafficPoints, checkPassword_Driver, setValidPassFalse, clearErrorMessage, deleteNewOrder, setPrice ,deleteMessages},
    { errorMessage: '', driverToken: '', driver_data: '', car_data: '', updateDriverInfoStatus: '', driverAvatar: '', newOrder: '', orderFlag: false, driversFromSearch: '', traffic_Points: '', valid_Password: false, orders: '', price: 0 }
)
