import React, { useContext } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";


//expo ions

import { MaterialIcons } from '@expo/vector-icons';

var buffer = [];
var totalNumberOfOrders = 0;
var dayDate;
const ListOrderds = (props) => {

   
    buffer = props.navigation.state.params.ordersDay;
    
    dayDate = props.navigation.state.params.dayDate;
    totalNumberOfOrders = buffer.length;

    function renderOrders() {


        
        return buffer.map((obj, index) => {

            const key = index;

            return (

                <View key={key} style={styles.orderViewSty}>
                    <View style ={{width :'100%'}}>
                        <Text style={styles.orderNumberTextSty}> الطلب  {key + 1}</Text>
                    </View>
                 
                        <Text style={styles.orderTextSty}>الكود:   {obj.code}</Text>
                        <Text style={styles.orderTextSty}>الوقت:   {obj.time}</Text>
                        <Text style={styles.orderTextSty}>البوابة:   {obj.gate} </Text>
                    
                </View>

            )



        });

    }



    return (
        <View style={styles.container}>

            <View style={styles.headerViewSty}>
                <View style={styles.innerHeaderViewSty}>
                    <Text style={styles.dayDateTextSty}>{dayDate}</Text>
                    <MaterialIcons name="today" size={24} color="gray" />
                </View>

                <Text style={styles.totalNumberTextSty}>مجموع الطلبات: {totalNumberOfOrders}</Text>
            </View>

            <ScrollView>
                <>
                    <View >{renderOrders(buffer)}</View>
                </>

            </ScrollView>
        </View>


    )
}




const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',

        marginTop: 10,
    },
    headerViewSty:
    {
    
        marginHorizontal: '2%',
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        marginVertical: 10
    },
    innerHeaderViewSty:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    orderViewSty:
    {
        height: 120,
        alignItems: "center",
        justifyContent: 'center',
        // backgroundColor:"rgb(71, 162, 209)",
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        marginHorizontal: '2%',

    },
    orderTextSty:
    {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(89, 127, 212)'
    },
    orderNumberTextSty:
    {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(190,190,190)'
    },
    totalNumberTextSty:
    {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 6,
        color: 'rgb(112, 213, 127)'
    },
    dayDateTextSty:
    {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 2,
        color: 'gray',
        marginHorizontal: 2,
    }

})

export default ListOrderds;