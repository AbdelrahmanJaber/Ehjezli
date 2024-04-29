import React, { useContext, useEffect, useState } from "react"
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationEvents } from "react-navigation";

//context 
import { Context as appDataContext } from "../../context/AppDataContext";


const OrdersHistoryScreen = ({ navigation }) => {

    const { state, getDriverOrders } = useContext(appDataContext);

    // console.log(state.orders.orders)
    const [currentDate, setCurrentDate] = useState('')
    const [currentDayArabic, setCurrentDayArabic] = useState('')
    const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0)
    const [currentDayAsNumber, setCurrentDayAsNumber] = useState(0)
    //orders in each day 
    var ordersCurrentDay;
    var ordersDay1;
    var ordersDay2;
    var ordersDay3;
    var ordersDay4;
    var ordersDay5;
    var ordersDay6;
    var ordersDay7;
    var ordersDay8;
    var ordersDay9;
    var ordersDay10;
    var ordersDay11;
    var ordersDay12;
    var ordersDay13;
    var ordersDay14;
    var ordersDay15;
    var ordersDay16;
    var ordersDay17;
    var ordersDay18;
    var ordersDay19;
    var ordersDay20;
    var ordersDay21;
    var ordersDay22;
    var ordersDay23;
    var ordersDay24;
    var ordersDay25;
    var ordersDay26;
    var ordersDay27;
    var ordersDay28;
    var ordersDay29;
    var ordersDay30;
    var ordersDay31;

    //Days
    const [previousDay1, setpreviousDay1] = useState('')
    const [previousDay2, setpreviousDay2] = useState('')
    const [previousDay3, setpreviousDay3] = useState('')
    const [previousDay4, setpreviousDay4] = useState('')
    const [previousDay5, setpreviousDay5] = useState('')
    const [previousDay6, setpreviousDay6] = useState('')
    const [previousDay7, setpreviousDay7] = useState('')
    const [previousDay8, setpreviousDay8] = useState('')
    const [previousDay9, setpreviousDay9] = useState('')
    const [previousDay10, setpreviousDay10] = useState('')
    const [previousDay11, setpreviousDay11] = useState('')
    const [previousDay12, setpreviousDay12] = useState('')
    const [previousDay13, setpreviousDay13] = useState('')
    const [previousDay14, setpreviousDay14] = useState('')
    const [previousDay15, setpreviousDay15] = useState('')
    const [previousDay16, setpreviousDay16] = useState('')
    const [previousDay17, setpreviousDay17] = useState('')
    const [previousDay18, setpreviousDay18] = useState('')
    const [previousDay19, setpreviousDay19] = useState('')
    const [previousDay20, setpreviousDay20] = useState('')
    const [previousDay21, setpreviousDay21] = useState('')
    const [previousDay22, setpreviousDay22] = useState('')
    const [previousDay23, setpreviousDay23] = useState('')
    const [previousDay24, setpreviousDay24] = useState('')
    const [previousDay25, setpreviousDay25] = useState('')
    const [previousDay26, setpreviousDay26] = useState('')
    const [previousDay27, setpreviousDay27] = useState('')
    const [previousDay28, setpreviousDay28] = useState('')
    const [previousDay29, setpreviousDay29] = useState('')
    const [previousDay30, setpreviousDay30] = useState('')
    const [previousDay31, setpreviousDay31] = useState('')

    const [day1Arabic, setDay1Arabic] = useState('')
    const [day2Arabic, setDay2Arabic] = useState('')
    const [day3Arabic, setDay3Arabic] = useState('')
    const [day4Arabic, setDay4Arabic] = useState('')
    const [day5Arabic, setDay5Arabic] = useState('')
    const [day6Arabic, setDay6Arabic] = useState('')
    const [day7Arabic, setDay7Arabic] = useState('')
    const [day8Arabic, setDay8Arabic] = useState('')
    const [day9Arabic, setDay9Arabic] = useState('')
    const [day10Arabic, setDay10Arabic] = useState('')
    const [day11Arabic, setDay11Arabic] = useState('')
    const [day12Arabic, setDay12Arabic] = useState('')
    const [day13Arabic, setDay13Arabic] = useState('')
    const [day14Arabic, setDay14Arabic] = useState('')
    const [day15Arabic, setDay15Arabic] = useState('')
    const [day16Arabic, setDay16Arabic] = useState('')
    const [day17Arabic, setDay17Arabic] = useState('')
    const [day18Arabic, setDay18Arabic] = useState('')
    const [day19Arabic, setDay19Arabic] = useState('')
    const [day20Arabic, setDay20Arabic] = useState('')
    const [day21Arabic, setDay21Arabic] = useState('')
    const [day22Arabic, setDay22Arabic] = useState('')
    const [day23Arabic, setDay23Arabic] = useState('')
    const [day24Arabic, setDay24Arabic] = useState('')
    const [day25Arabic, setDay25Arabic] = useState('')
    const [day26Arabic, setDay26Arabic] = useState('')
    const [day27Arabic, setDay27Arabic] = useState('')
    const [day28Arabic, setDay28Arabic] = useState('')
    const [day29Arabic, setDay29Arabic] = useState('')
    const [day30Arabic, setDay30Arabic] = useState('')
    const [day31Arabic, setDay31Arabic] = useState('')


    //fillDaysOrders
    const fillDaysOrders = () => {
        //setOrdersDay11([]);
        if (state.orders) {
            if(state.orders.orders){
            if (state.orders.orders.length >= 0) {
                ordersCurrentDay = []
                ordersDay1 = [];
                ordersDay2 = [];
                ordersDay3 = [];
                ordersDay4 = [];
                ordersDay5 = [];
                ordersDay6 = [];
                ordersDay7 = [];
                ordersDay8 = [];
                ordersDay9 = [];
                ordersDay10 = [];
                ordersDay11 = [];
                ordersDay12 = [];
                ordersDay13 = [];
                ordersDay14 = [];
                ordersDay15 = [];
                ordersDay16 = [];
                ordersDay17 = [];
                ordersDay18 = [];
                ordersDay19 = [];
                ordersDay20 = [];
                ordersDay21 = [];
                ordersDay22 = [];
                ordersDay23 = [];
                ordersDay24 = [];
                ordersDay25 = [];
                ordersDay26 = [];
                ordersDay27 = [];
                ordersDay28 = [];
                ordersDay29 = [];
                ordersDay30 = [];
                ordersDay31 = [];


                if (state.orders) {
                    if (state.orders.orders) {
                    for (let i = 0; i < state.orders.orders.length; i++) {

                        //console.log(state.orders.orders[i].date);
                        if (state.orders.orders[i].date === currentDate) {
                            ordersCurrentDay.push(state.orders.orders[i])

                        }

                        else if (state.orders.orders[i].date === previousDay1) {
                            ordersDay1.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay2) {
                            ordersDay2.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay3) {
                            ordersDay3.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay4) {
                            ordersDay4.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay5) {
                            ordersDay5.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay6) {
                            ordersDay6.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay7) {
                            ordersDay7.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay8) {
                            ordersDay8.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay9) {
                            ordersDay9.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay10) {
                            ordersDay10.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay11) {
                            ordersDay11.push(state.orders.orders[i])
                            // console.log(ordersDay11,state.orders.orders[i])
                            //setOrdersDay11(ordersDay11, state.orders.orders[i])
                            // console.log(ordersDay11)
                        }
                        else if (state.orders.orders[i].date === previousDay12) {
                            ordersDay12.push(state.orders.orders[i])
                            //  console.log(ordersDay12)
                        }
                        else if (state.orders.orders[i].date === previousDay13) {
                            ordersDay13.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay14) {
                            ordersDay14.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay15) {
                            ordersDay15.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay16) {
                            ordersDay16.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay17) {
                            ordersDay17.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay18) {
                            ordersDay18.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay19) {
                            ordersDay19.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay20) {
                            ordersDay20.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay21) {
                            ordersDay21.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay22) {
                            ordersDay22.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay23) {
                            ordersDay23.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay24) {
                            ordersDay24.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay25) {
                            ordersDay25.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay26) {
                            ordersDay26.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay27) {
                            ordersDay27.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay28) {
                            ordersDay28.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay29) {
                            ordersDay29.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay30) {
                            ordersDay30.push(state.orders.orders[i])

                        }
                        else if (state.orders.orders[i].date === previousDay31) {
                            ordersDay31.push(state.orders.orders[i])

                        }




                    }
                }



            }
            }
        }
    }
    }





    const getCurrentDate = () => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date();
        var dayName = days[d.getDay()];
        if (dayName === 'Sunday') {
            setCurrentDayArabic('الأحد')
        }
        else if (dayName === 'Monday') {
            setCurrentDayArabic('الاثنين')
        }
        else if (dayName === 'Tuesday') {
            setCurrentDayArabic('الثلاثاء')
        }
        else if (dayName === 'Wednesday') {
            setCurrentDayArabic('الأربعاء')
        }
        else if (dayName === 'Thursday') {
            setCurrentDayArabic('الخميس')
        }
        else if (dayName === 'Friday') {
            setCurrentDayArabic('الجمعة')
        }
        else if (dayName === 'Saturday') {
            setCurrentDayArabic('السبت')
        }



        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();

        const totalDays = new Date(year, month, 0).getDate();
        setNumberOfDaysInMonth(totalDays)
        setCurrentDayAsNumber(date)
        // console.log(currentDayAsNumber)
        // console.log(totalDays)
        // console.log(date)
        // console.log(year)
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        setCurrentDate(year + '-' + month + '-' + date)//format: dd-mm-yyyy;
    }
    const PreviousDate = () => {

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d1 = new Date();
        var month = d1.getMonth() + 1;
        var year = d1.getFullYear();

        var d2 = ''
        var dayName2 = ''
        var tmpArabicDay = ''

        for (let i = 1; i < 32; i++) {
            d2 = new Date(month + "/" + i + "/" + year);

            dayName2 = days[d2.getDay()];


            if (dayName2 === 'Sunday') {

                tmpArabicDay = 'الأحد';
            }
            else if (dayName2 === 'Monday') {
                tmpArabicDay = 'الاثنين';
            }
            else if (dayName2 === 'Tuesday') {
                tmpArabicDay = 'الثلاثاء';
            }
            else if (dayName2 === 'Wednesday') {
                tmpArabicDay = 'الأربعاء';
            }
            else if (dayName2 === 'Thursday') {
                tmpArabicDay = 'الخميس';
            }
            else if (dayName2 === 'Friday') {
                tmpArabicDay = 'الجمعة';
            }
            else if (dayName2 === 'Saturday') {
                tmpArabicDay = 'السبت';
            }

            if (i == 1) {
                setpreviousDay1(year + '-' + month + '-' + 1);
                setDay1Arabic(tmpArabicDay);

            }
            else if (i == 2) {
                setpreviousDay2(year + '-' + month + '-' + 2);
                setDay2Arabic(tmpArabicDay);

            }
            else if (i == 3) {
                setpreviousDay3(year + '-' + month + '-' + 3);
                setDay3Arabic(tmpArabicDay);

            }
            else if (i == 4) {
                setpreviousDay4(year + '-' + month + '-' + 4);
                setDay4Arabic(tmpArabicDay);

            }
            else if (i == 5) {
                setpreviousDay5(year + '-' + month + '-' + 5);
                setDay5Arabic(tmpArabicDay);

            }
            else if (i == 6) {
                setpreviousDay6(year + '-' + month + '-' + 6);
                setDay6Arabic(tmpArabicDay);

            }
            else if (i == 7) {
                setpreviousDay7(year + '-' + month + '-' + 7);
                setDay7Arabic(tmpArabicDay);

            }
            else if (i == 8) {
                setpreviousDay8(year + '-' + month + '-' + 8);
                setDay8Arabic(tmpArabicDay);

            }
            else if (i == 9) {
                setpreviousDay9(year + '-' + month + '-' + 9);
                setDay9Arabic(tmpArabicDay);

            }
            else if (i == 10) {
                setpreviousDay10(year + '-' + month + '-' + 10);
                setDay10Arabic(tmpArabicDay);

            }
            else if (i == 11) {
                setpreviousDay11(year + '-' + month + '-' + 11);
                setDay11Arabic(tmpArabicDay);

            }
            else if (i == 12) {
                setpreviousDay12(year + '-' + month + '-' + 12);
                setDay12Arabic(tmpArabicDay);

            }
            else if (i == 13) {
                setpreviousDay13(year + '-' + month + '-' + 13);
                setDay13Arabic(tmpArabicDay);

            }
            else if (i == 14) {
                setpreviousDay14(year + '-' + month + '-' + 14);
                setDay14Arabic(tmpArabicDay);

            }
            else if (i == 15) {
                setpreviousDay15(year + '-' + month + '-' + 15);
                setDay15Arabic(tmpArabicDay);

            }
            else if (i == 16) {
                setpreviousDay16(year + '-' + month + '-' + 16);
                setDay16Arabic(tmpArabicDay);

            }
            else if (i == 17) {
                setpreviousDay17(year + '-' + month + '-' + 17);
                setDay17Arabic(tmpArabicDay);

            }
            else if (i == 18) {
                setpreviousDay18(year + '-' + month + '-' + 18);
                setDay18Arabic(tmpArabicDay);

            }
            else if (i == 19) {
                setpreviousDay19(year + '-' + month + '-' + 19);
                setDay19Arabic(tmpArabicDay);

            }
            else if (i == 20) {
                setpreviousDay20(year + '-' + month + '-' + 20);
                setDay20Arabic(tmpArabicDay);

            }
            else if (i == 21) {
                setpreviousDay21(year + '-' + month + '-' + 21);
                setDay21Arabic(tmpArabicDay);

            }
            else if (i == 22) {
                setpreviousDay22(year + '-' + month + '-' + 22);
                setDay22Arabic(tmpArabicDay);

            }
            else if (i == 23) {
                setpreviousDay23(year + '-' + month + '-' + 23);
                setDay23Arabic(tmpArabicDay);

            }
            else if (i == 24) {
                setpreviousDay24(year + '-' + month + '-' + 24);
                setDay24Arabic(tmpArabicDay);

            }
            else if (i == 25) {
                setpreviousDay25(year + '-' + month + '-' + 25);
                setDay25Arabic(tmpArabicDay);

            }
            else if (i == 26) {
                setpreviousDay26(year + '-' + month + '-' + 26);
                setDay26Arabic(tmpArabicDay);

            }
            else if (i == 27) {
                setpreviousDay27(year + '-' + month + '-' + 27);
                setDay27Arabic(tmpArabicDay);

            }
            else if (i == 28) {
                setpreviousDay28(year + '-' + month + '-' + 28);
                setDay28Arabic(tmpArabicDay);

            }
            else if (i == 29) {
                setpreviousDay29(year + '-' + month + '-' + 29);
                setDay29Arabic(tmpArabicDay);
            }
            else if (i == 30) {
                setpreviousDay30(year + '-' + month + '-' + 30);
                setDay30Arabic(tmpArabicDay);
            }
            else if (i == 31) {
                setpreviousDay31(year + '-' + month + '-' + 31);
                setDay31Arabic(tmpArabicDay);

            }

        }

    }
    useEffect(() => {

        getCurrentDate();
        PreviousDate();
        // fillDaysOrders();


        //   console.log(state)

    }, []);

    return (

        <View style={styles.container}>

            <NavigationEvents
                // onWillFocus={fillDaysOrders}
                onDidFocus={fillDaysOrders}
            // onWillBlur={callApi()}
            // onDidBlur = {() => {}}

            />

            <View style={styles.headerViewSty}>

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 15 }}>


                    <Text style={styles.textDateSty}>{currentDayArabic}</Text>
                    <Text style={styles.textDateSty}>{currentDate}</Text>

                </View>
                <Text style={styles.textMonthSty}>طلبات الشهر الحالي</Text>


            </View>
            <ScrollView style={{ height: '100%' }}>
                {
                    (numberOfDaysInMonth >= 31) && (currentDayAsNumber >= 31) ?
                        currentDayAsNumber === 31 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay31, dayDate: previousDay31 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day31Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay31}</Text>
                                </View>
                            </TouchableOpacity>
                        : null

                }

                {
                    (numberOfDaysInMonth >= 30) && (currentDayAsNumber >= 30) ?
                        currentDayAsNumber === 30 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay30, dayDate: previousDay30 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day30Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay30}</Text>
                                </View>
                            </TouchableOpacity>
                        : null

                }
                {
                    (numberOfDaysInMonth >= 29) && (currentDayAsNumber >= 29) ?
                        currentDayAsNumber === 29 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay29, dayDate: previousDay29 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day29Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay29}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }




                {
                    currentDayAsNumber >= 28 ?
                        currentDayAsNumber === 28 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay28, dayDate: previousDay28 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day28Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay28}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 27 ?
                        currentDayAsNumber === 27 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay27, dayDate: previousDay27 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day27Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay27}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 26 ?
                        currentDayAsNumber === 26 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay26, dayDate: previousDay26 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day26Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay26}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 25 ?
                        currentDayAsNumber === 25 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay25, dayDate: previousDay25 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day25Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay25}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 24 ?
                        currentDayAsNumber === 24 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay24, dayDate: previousDay24 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day24Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay24}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 23 ?
                        currentDayAsNumber === 23 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay23, dayDate: previousDay23 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day23Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay23}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }

                {
                    currentDayAsNumber >= 22 ?
                        currentDayAsNumber === 22 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay22, dayDate: previousDay22 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day22Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay22}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 21 ?
                        currentDayAsNumber === 21 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay21, dayDate: previousDay21 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day21Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay21}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 20 ?
                        currentDayAsNumber === 20 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay20, dayDate: previousDay20 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day20Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay20}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 19 ?
                        currentDayAsNumber === 19 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay19, dayDate: previousDay19 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day19Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay19}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 18 ?
                        currentDayAsNumber === 18 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay18, dayDate: previousDay18 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day18Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay18}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 17 ?
                        currentDayAsNumber === 17 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay17, dayDate: previousDay17 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day17Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay17}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 16 ?
                        currentDayAsNumber === 16 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay16, dayDate: previousDay16 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day16Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay16}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 15 ?
                        currentDayAsNumber === 15 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay15, dayDate: previousDay15 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day15Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay15}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 14 ?
                        currentDayAsNumber === 14 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay14, dayDate: previousDay14 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day14Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay14}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 13 ?
                        currentDayAsNumber === 13 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>

                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay13, dayDate: previousDay13 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day13Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay13}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 12 ?
                        currentDayAsNumber === 12 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay12, dayDate: previousDay12 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day12Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay12}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 11 ?
                        currentDayAsNumber === 11 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay11, dayDate: previousDay11 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day11Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay11}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 10 ?
                        currentDayAsNumber === 10 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay10, dayDate: previousDay10 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day10Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay10}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 9 ?
                        currentDayAsNumber === 9 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay9, dayDate: previousDay9 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day9Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay9}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 8 ?
                        currentDayAsNumber === 8 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay8, dayDate: previousDay8 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day8Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay8}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 7 ?
                        currentDayAsNumber === 7 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay7, dayDate: previousDay7 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day7Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay7}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 6 ?
                        currentDayAsNumber === 6 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay6, dayDate: previousDay6 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day6Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay6}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 5 ?
                        currentDayAsNumber === 5 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay5, dayDate: previousDay5 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day5Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay5}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 4 ?
                        currentDayAsNumber === 4 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay4, dayDate: previousDay4 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day4Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay4}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 3 ?
                        currentDayAsNumber === 3 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay3, dayDate: previousDay3 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day3Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay3}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 2 ?
                        currentDayAsNumber === 2 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay2, dayDate: previousDay2 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day2Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay2}</Text>
                                </View>
                            </TouchableOpacity>
                        : null
                }
                {
                    currentDayAsNumber >= 1 ?
                        currentDayAsNumber === 1 ?
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersCurrentDay, dayDate: currentDate }) }}>
                                <View style={styles.OrdersDayViewSty2}>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDayArabic}</Text>
                                    <Text style={styles.textCurrentOrderDaySty}>{currentDate}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('ListOrderds', { ordersDay: ordersDay1, dayDate: previousDay1 }) }}>
                                <View style={styles.OrdersDayViewSty}>
                                    <Text style={styles.textOrderDaySty}>{day1Arabic}</Text>
                                    <Text style={styles.textOrderDaySty}>{previousDay1}</Text>
                                </View>
                            </TouchableOpacity>


                        : null
                }

                {/* <Text>{"gate" in ordersDay11[0] ? ordersDay11[0] : null}</Text> */}
                {/* <Text>{ordersDay12}</Text> */}
                <View>
                    {/* {ordersDay11.result.map(gate => {return (<Text>{}</Text>)})} */}
                </View>
            </ScrollView>

        </View>

    )
}



const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        marginBottom: 250,


        marginBottom: 0

    },
    headerViewSty:
    {
        alignItems: 'center',

        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    textDateSty:
    {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 5,
        color: 'rgb(89, 127, 212)'
    },
    textMonthSty:
    {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'rgb(205, 175, 61)'

    },
    OrdersDayViewSty:
    {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        height: 70,
        marginVertical: 3,
        marginHorizontal: '26%',
        //  backgroundColor: 'rgb(187, 187, 189)',
        borderRadius: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 2
    },
    OrdersDayViewSty2:
    {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        height: 70,
        marginVertical: 5,
        marginHorizontal: '26%',
        backgroundColor: 'rgba(112, 213, 127,0.4)',
        borderRadius: 40,

    },
    textOrderDaySty:
    {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20
    },
    textCurrentOrderDaySty:
    {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20
    }

})

export default OrdersHistoryScreen;