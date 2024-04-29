import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';
import studentAPI from "../api/student";
import { navigate } from "../navigationRef";


const authReducer = (state, action) => {

  
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload } // return new state with error object

        // case 'signup':
        //     return { errorMessage: '', token: action.payload }

        case 'signin':
            return { errorMessage: '', token: action.payload }

        case 'cleare_message_error':

            return { ...state, errorMessage: '' }

        case 'signout':

            return { token: null, errorMessage: '' }


        default:
            return state;
    }


};
const tryLocalSignInForDriver = dispatch => async () => {


    // const student_token = await AsyncStorage.getItem('student_token');
    const driver_token = await AsyncStorage.getItem('driver_token');

    // console.log('student_token : ' + student_token)

    // console.log('driver_token : ' + driver_token)


    // if (student_token) {
    //     dispatch({ type: 'signin', payload: student_token });
    //     navigate('studenFlow');
    //     // navigate('TestFlow');
    // }

    // else 

    
    if (driver_token) {

        //retrive app data from DB

        dispatch({ type: 'signin', payload: driver_token });
        navigate('PrepareDriverProfile');
        // navigate('driverFlow')
    }




    else {
        navigate('Signin');
    }



}
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'cleare_message_error' })

};

const signup_student = dispatch => async ({ firstName, lastName, gender, email, password, studentNumber, phoneNumber, DOB, city, faculty}) => {
    //make api request to signup with that email and password  

    //if we signed up , modify our state , and say that we are authenticated 

    //if sining up is fail then we need to reflect an  error messege some where 

    try {

        const response = await studentAPI.post('/student/signup', { firstName, lastName, gender, email, password, studentNumber, phoneNumber, DOB, city, faculty });
        
        await AsyncStorage.setItem('student_token', response.data.token)

        dispatch({ type: 'signin', payload: response.data.token })
        

        //navigate to main flow

        navigate('SignupConfirmationStudent')


    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }


};

const signup_confirmation_student = dispatch => async ({ code }) => {

    try {

        const response = await studentAPI.post('/student/signUpConfirmation', { code });

        if(response.data.error){
            alert(response.data.error)
            // dispatch({ type: 'add_error', payload: response.data.error })
        }
        else{
            await AsyncStorage.removeItem('student_token')
            navigate('ConfirmedSignUp')
        }

    
    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

};

const reset_signup_confirmation_student = dispatch => async () => {

    try {

        const response = await studentAPI.post('/student/resetSignUpConfirmationCode');

    
    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

};





const signin_student = dispatch => async ({ email, password }) => {
    //try to signin

    //handle success by modify the state

    //if sining up is fail then we need to reflect an  error messege some where 

    try {

        const response = await studentAPI.post('/student/login', { email, password });
        await AsyncStorage.setItem('student_token', response.data.token)
        dispatch({ type: 'signin', payload: response.data.token })




        navigate('studenFlow');


    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error });


    }

};

const signout_student = dispatch => async () => {
    //somehow sign out

    // await studentAPI.post('/student/logout');

    await AsyncStorage.removeItem('student_token')

    dispatch({ type: 'sigout' })

    navigate('Signin')
};

// Forget Password

const sendForgetPasswordEmail = dispatch => async ({email}) => {

    try{
    const response = await studentAPI.post('/student/forgetPasswordEmail', {email}) 

    if(response.data.error){
        alert(response.data.error)
    }
    else{
        // console.log(response.data.token)
        await AsyncStorage.setItem('student_token', response.data.token)
        navigate('EnterForgetPasswordCode')
    }

} catch (err) {
    // console.log(err)

    dispatch({ type: 'add_error', payload: err.response.data.error });


}
 
};

const ResetPassword_confirmation_student = dispatch => async ({ code }) => {

    try {

        const response = await studentAPI.post('/student/frogetPasswordConfirmation', { code });

        if(response.data.error){
            alert(response.data.error)
        }
        else{
            // await AsyncStorage.removeItem('student_token')
            navigate('EnterNewPassword')
        }

    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })
    }
};

const reset_ResetPassword_confirmation_student = dispatch => async () => {

    try {

        const response = await studentAPI.post('/student/resetForgetPasswordConfirmationCode');

    
    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

};


const sendNewPassword = dispatch => async ({password}) => {
    
    try {

        const response = await studentAPI.post('/student/newPassword', {password});

        if(response.data.error){
            alert(response.data.error)
        }
        else{
            await AsyncStorage.removeItem('student_token')
            navigate('PasswordReseted')
        }

    
    } catch (err) {

        console.log(err)

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }
}














// Driver

const signup_driver = dispatch => async ({ firstName, lastName, gender, email, password, carNumber, phoneNumber, DOB, city, track, carType }) => {
    //make api request to signup with that email and password 

    //if we signed up , modify our state , and say that we are authenticated 

    //if sining up is fail then we need to reflect an  error messege some where 

    try {


        ///driver/signup_driver
        const response = await trackerApi.post('/driver/signup', { firstName, lastName, gender, email, password, carNumber, phoneNumber, DOB, city, track, carType });

        
        await AsyncStorage.setItem('driver_token', response.data.token)

        dispatch({ type: 'signin', payload: response.data.token })
            

        //navigate to main flow

        navigate('SignupConfirmationDriver')


    } catch (err) {

        console.log(err);

        dispatch({ type: 'add_error', payload: err.response.data.error });

    }


};

const signup_confirmation_driver = dispatch => async ({ code }) => {

    try {
        console.log(code)
        const response = await trackerApi.post('/driver/signUpConfirmation', { code });
        console.log(response)

        if(response.data.error){
            alert(response.data.error)
        }
        else{
            await AsyncStorage.removeItem('driver_token')
            navigate('ConfirmedSignUp')
        }

    
    } catch (err) {
        console.log(err)

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

};

const reset_signup_confirmation_driver = dispatch => async () => {

    try {

        const response = await trackerApi.post('/driver/resetSignUpConfirmationCode');

    
    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

};


const signin_driver = dispatch => async ({ email, password }) => {
    //try to signin

    //handle success by modify the state

    //if sining up is fail then we need to reflect an  error messege some where 

    try {

        const response = await trackerApi.post('/driver/login', { email, password });
        await AsyncStorage.setItem('driver_token', response.data.token)
        dispatch({ type: 'signin', payload: response.data.token })


        navigate('PrepareDriverProfile');


    } catch (err) {
        // console.log("error");

        dispatch({ type: 'add_error', payload: err.response.data.error });



    }

};

const signout_driver = dispatch => async () => {
    //somehow sign out   /driver/logout

    //remove token from the DB then from the Device
    await trackerApi.post('/driver/logout');
    await AsyncStorage.removeItem('driver_token');

    dispatch({ type: 'sigout' })

    navigate('Signin');

};

//Forget Password
const sendForgetPasswordEmailDriver = dispatch => async ({email}) => {

    try{


    const response = await trackerApi.post('/driver/forgetPasswordEmail', {email}) 

    if(response.data.error){
        alert(response.data.error)
    }
    else{
        await AsyncStorage.setItem('driver_token', response.data.token)
        navigate('EnterForgetPasswordCodeDriver')
    }

} catch (err) {
    console.log(err)

    dispatch({ type: 'add_error', payload: err.response.data.error });


}
 
};

const ResetPassword_confirmation_driver = dispatch => async ({ code }) => {

    try {

        const response = await trackerApi.post('/driver/frogetPasswordConfirmation', { code });

        if(response.data.error){
            alert(response.data.error)
        }
        else{
            navigate('EnterNewPasswordDriver')
        }

    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })
    }
};

const reset_ResetPassword_confirmation_driver = dispatch => async () => {

    try {

        const response = await studentAPI.post('/driver/resetForgetPasswordConfirmationCode');

    
    } catch (err) {

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }

};


const sendNewPasswordDriver = dispatch => async ({password}) => {
    
    try {

        const response = await trackerApi.post('/driver/newPassword', {password});

        if(response.data.error){
            alert(response.data.error)
        }
        else{
            await AsyncStorage.removeItem('driver_token')
            navigate('PasswordReseted')
        }

    
    } catch (err) {

        // console.log(err)

        dispatch({ type: 'add_error', payload: err.response.data.error })

    }
}

/////for Settings

const changeEmail_Driver = dispatch => async ({ email }) => {

    response = await trackerApi.patch('driver/changeEmail', { email });

    await AsyncStorage.removeItem('driver_token');

    dispatch({ type: 'sigout' })

    navigate('Signin');




};

const changePhoneNumber_Driver = dispatch => async ({ phoneNumber }) => {

    // console.log(phoneNumber)
    await trackerApi.patch('driver/changePhoneNumber', { phoneNumber });


};

const changePassword_Driver = dispatch => async ({ password }) => {

    response = await trackerApi.patch('driver/changePassword', { password });

    await AsyncStorage.removeItem('driver_token');

    dispatch({ type: 'sigout' })

    navigate('Signin');

};




export const { Provider, Context } = createDataContext(
    authReducer,
        { signup_student,
        signin_student,
        signout_student,
        signup_driver,
        signin_driver,
        signout_driver,
        clearErrorMessage,
        tryLocalSignInForDriver,
        signup_confirmation_student,
        reset_signup_confirmation_student,
        signup_confirmation_driver,
        reset_signup_confirmation_driver,
        sendForgetPasswordEmail,
        ResetPassword_confirmation_student,
        reset_ResetPassword_confirmation_student,
        sendNewPassword,
        sendForgetPasswordEmailDriver,
        ResetPassword_confirmation_driver,
        reset_ResetPassword_confirmation_driver,
        sendNewPasswordDriver,

        changeEmail_Driver,
        changePhoneNumber_Driver,
        changePassword_Driver

    },
    { isSignedIn: false, errorMessage: '' }
)
