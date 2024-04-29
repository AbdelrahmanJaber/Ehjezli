import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const SettingsStudentScreen = () => {

    const { signout_student} = useContext(AuthContext);
    return (

        <SafeAreaView forceInset = {{top:"always"}}>
            <Text style={styles.headerText}>Account Screen</Text>
            <View style={styles.spacer}>
                <Button title="Sign Out" onPress={signout_student} />
            </View>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250

    },
    spacer:
    {
        margin: 15
    },
    headerText:
    {
        margin:15,
        fontSize:24
    }




})
export default SettingsStudentScreen;