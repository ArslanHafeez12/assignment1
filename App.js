import React, { useState, Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
  Image,
  ImageBackground,
  TextInput
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Mercedes-Benz',
    link: 'https://1000logos.net/wp-content/uploads/2018/04/Mercedes-Benz-Logo.png',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Toyota',
    link: 'https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Ford',
    link: 'https://logos-download.com/wp-content/uploads/2016/02/Ford_Logo_2003-2017.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Nissan',
    link: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'BMW',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1024px-BMW.svg.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Suzuki',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Suzuki_Motor_Corporation_logo.svg/1920px-Suzuki_Motor_Corporation_logo.svg.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Honda',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Honda_logo.svg/1920px-Honda_logo.svg.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'Audi',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1920px-Audi-Logo_2016.svg.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Ferrari',
    link: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/800px-Ferrari-Logo.svg.png',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d70',
    title: 'Tesla',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/800px-Tesla_Motors.svg.png',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Image source={{ uri: item.link }} style={{ width: 100, height: 100, borderRadius: 45 }} />
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground
        source={{
          uri:
            'https://www.remaxdoors.com/hubfs/2015_images/Blogging/new_car_showroom.jpg',
        }}
        resizeMode="cover"
        style={styles.homeImage}>
        <Text style={styles.homeText}>Car Showroom</Text>
      </ImageBackground>
    </View>
  );
}

const Stack = createStackNavigator();
function ManageCarsScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Our Cars" component={ListOfCars}
        options={{
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('Add New Car');
              }}
              title="Add Car"
              color="#313131"
            />
          ),
        }}
      />
      <Stack.Screen name="Add New Car" component={AddNewCar}
        options={{
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#313131'
          }
        }}
      />
      <Stack.Screen name="Car Details" component={CarDetails}
        options={{
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#313131'
          }
        }}
      />

    </Stack.Navigator>
  );
}

const ListOfCars = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#add8e6' : '#add8e6';
    const color = item.id === selectedId ? 'red' : 'black';


    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );

}

const AddNewCar = ({ navigation }) => {
    const [make, setMake] = useState();
    const [imgi, setIMG] = useState();
    const [model, setModel] = useState();
    const [myear, setMyear] = useState();
    const [epower, setEpower] = useState();
    const [data, setData] = useState(null);
  
    function onChangeText(value) {
      console.log(value);
      setIMG(value);
    }
    function onChangeMyear(value) {
      console.log(value);
      setMyear(value);
    }
    function onChangeMake(value) {
      console.log(value);
      setMake(value);
    }
    function onChangeModel(value) {
      console.log(value);
      setModel(value);
    }
    function onChangeEpower(value) {
      console.log(value);
      setEpower(value);
    }
    async function onPressWorkhere() {
      const obj = {
        make: make,
        imgi: imgi,
        myear: myear,
        model: model,
        epower: epower,
      };
      console.log(obj);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      };
      fetch(
        'https://labterminal-a13c9-default-rtdb.firebaseio.com/cars.json',
        requestOptions
      )
        .then((response) => response.text())
        .then((data) => console.log(data));
  
      setData(obj);
    }
    function getData() {}
    async function onPressWorkhere2() {}
    async function onPressWorkhere3() {}
  
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChangeText(value)}
            placeholder="Enter Photo URL"
            placeholderTextColor="#474a48"
            value={imgi}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChangeMake(value)}
            value={make}
            placeholder="Enter Make"
            placeholderTextColor="#474a48"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChangeModel(value)}
            value={model}
            placeholder="Enter Model"
            placeholderTextColor="#474a48"
          />
  
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChangeMyear(value)}
            value={myear}
            placeholder="Enter Manufacturing Year"
            placeholderTextColor="#474a48"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChangeEpower(value)}
            value={epower}
            placeholder="Enter Engine Power"
            placeholderTextColor="#474a48"
          />
        </SafeAreaView>
        <Button
                  style={{height:100}}
          title="Add Car"
          color="black"
          onPress={onPressWorkhere}
        />
        {data ? <Text> Car of Model: {data.model} Posted</Text> : null}
      </View>
    );
  }

const CarDetails = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>History Screen</Text>
      <button
        onClick={() => navigation.navigate("Home")}
      >Go back to Home Screen</button>

      <ScrollView>

      </ScrollView>
    </View>
  );
}

function ManageCarBrandsScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#add8e6' : '#add8e6';
    const color = item.id === selectedId ? 'red' : 'black';


    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Manage Cars" component={ManageCarsScreen} />
        <Drawer.Screen
          name="Manage Car Brands"
          component={ManageCarBrandsScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  homeImage: {
    flex: 1,
    justifyContent: 'center',
  },
  homeText: {
    color: 'white',
    fontSize: 45,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 30,
    marginHorizontal: 30
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
  },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
});
