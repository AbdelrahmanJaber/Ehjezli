import React, {useEffect, useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoadingPage from "./LoadingPage";

import { Context as AuthContext }  from '../../../src/context/AuthContext';


const SignOut = () => {
    const { signout_student } = useContext(AuthContext);

    useEffect(() => {
        signout_student();
 }, [])

    return (
        <LoadingPage />
    )
}

export default SignOut

const styles = StyleSheet.create({})
