import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";

//Icons
import { Ionicons } from '@expo/vector-icons'; 

//Redux Functions
import { useDispatch, useSelector } from "react-redux";
import { carAdded } from "../store/FullOrder";
import { loadCars, getAvailableCars  } from "../store/cars";

//Navigation
import { NavigationEvents } from "react-navigation";

//Loading page
import LoadingPage from "./LoadingPage";

//getImage Function
const getImage = (type) => {
  if (type === 'حافلة') {
    return require('../assets/images/Van.png');
  }
  if (type === 'باص') {
    return require('../assets/images/Bus.png');
  }
  if (type === 'تكسي') {
    return require('../assets/images/Taxi.png');
  }
}


const ChooseCar = ({ navigation }) => {
  const dispatch = useDispatch();

  const trackChosen = useSelector(state => state.entities.FullOrder.list.destination.mainDestination)
  const availableCars = useSelector(getAvailableCars(trackChosen))

  const availableNow = useSelector(state => state.entities.availableDrivers.list) 

  const loading = useSelector(state => state.entities.cars.loading)

  const [carType, setCarType] = useState(null);
  const [carPrice, setCarPrice] = useState(null);
  const [selected, setSelected] = useState(null);

  const ifAvailableNow = (carType, carTrack) => {
    var flag = false;
    availableNow.map((car) => {
      if(car.carType === carType && car.track === carTrack) {
        flag = true;
        return;
      }
    })

    return flag;
  }

  const check = () => {
    if(selected === null){
      alert('يجب عليك اختيار نوع السيارة التي تود المغادرة بها')
    }
    else{
      navigation.navigate("ConfirmTheOrder")
      dispatch(carAdded({type: carType, price: carPrice}))
    }
  }


  useEffect(() => {
    dispatch(loadCars())
  },[])



  if(loading === true){
    return (
      <LoadingPage />
    )
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
       <NavigationEvents onWillFocus={() => {
         dispatch(loadCars())
         }} />

      <View style = {[styles.LoginTextContainer, {backgroundColor: '#FFD428'}]}>
          <Text style = {styles.LoginText}>نوع السيارة</Text> 
      </View>

      <View style = {{backgroundColor: "#FFD428", flex: 1}}>
      <View style = {{backgroundColor: "white", flex: 1, borderTopRightRadius: 50, borderTopLeftRadius:50, }}>


      <View style={{ flex: 1, justifyContent: "space-between", marginTop: 20 }}>
        <View>
          {availableCars.map((car) => (
            <TouchableOpacity style={[styles.container, { backgroundColor: !ifAvailableNow(car.carName, car.carTrack) ? "#c1bebe" : car.carName === selected ? "#f7eac3" : "white"}]} key={car._id} 
            disabled = {!ifAvailableNow(car.carName, car.carTrack)}
            onPress={() => {
              setSelected(car.carName)

              setCarType(car.carName)
              setCarPrice(car.carPrice)
        
              }} 
              >
              {/*  Image */}
              <Image style={styles.image} source={getImage(car.carName)} />

              <View style={styles.middleContainer}>
                <View>
                  <Text style={styles.type}>{car.carName} </Text>
                </View>
                <View>
                  <Text style={[styles.type, { fontSize: 13, color: ifAvailableNow(car.carName, car.carTrack) ? "blue" : 'red' }]}>
                    {ifAvailableNow(car.carName, car.carTrack) ? 'متوفر' : 'غير متوفر'}
                  </Text>
                </View>
              </View>

              <View style={styles.rightContainer}>
                <Ionicons name="pricetag" size={18} color="#42d742" />
                <Text style={styles.price}>₪ {car.carPrice} </Text>
              </View>
            </TouchableOpacity>
          ))}

        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => 
              {
                check()

              }
            }
            style={{
              backgroundColor: "#FFD428",
              padding: 10,
              margin: 10,
              width: "35%",
              alignItems: "center",
              borderRadius: 70,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>
              التالي
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*  */}
      </View>
      </View>
    </View>
  );
};

ChooseCar.navigationOptions = () => {
  return {
    headerShown: false,

  };

};

export default ChooseCar;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    backgroundColor: "#FFD428",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 20,
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    // margin: 8,
    padding: 8,
    // marginVertical:25
  },

  //car type row
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderColor: '#FFD428',
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "white",
    // padding: 15,
    padding: 4,
    marginHorizontal: 8,
    marginVertical: 5
    // marginVertical:15
  },
  image: {
    // height: 70,
    // width: 80,

    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: 'red',
    
  },
  type: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
    marginRight: 10
  },
  time: {
    color: '#5d5d5d',
    fontWeight: 'bold',
  },
  rightContainer: {
    // width: 100,
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    // backgroundColor: 'green'

  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
  LoginTextContainer: {
    backgroundColor: '#f1f1f1',
    // backgroundColor: '#FFD428',
    borderTopRightRadius: 50,
    borderTopLeftRadius:50,
    alignItems: 'center'

},

LoginText: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold'
},
});
