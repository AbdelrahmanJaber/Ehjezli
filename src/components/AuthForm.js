import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import { Text, Input, Button } from 'react-native-elements';


const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>

            <View style={styles.spacer}>
                <Text h3>{headerText}</Text>
            </View>

            <View style={styles.spacer}>
                <Input label="Email"
                    value={email}
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    autoCapitalize="none"
                    autoCorrect={false}



                />

            </View>
            <View style={styles.spacer}>
                <Input label="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(newPassword) => setPassword(newPassword)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <View style={styles.spacer}>
                <Button title={submitButtonText} onPress={() => onSubmit({ email, password })} />
            </View>

            



        </>
    );
};


const styles = StyleSheet.create({

  
    spacer:
    {
        margin: 15
    },

    errorMessage: {

        fontSize: 16,
        color: 'red',
        marginLeft: 15,


    }
   






})

export default AuthForm;