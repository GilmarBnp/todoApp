import React, { useMemo } from 'react'
import { Dimensions, SafeAreaView, View, StyleSheet, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, useNavigation, useRoute, KeyboardAvoidingView, useFocusEffect, useIsFocused   } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from '../../components/Card';

import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const Home = ({navigation, route }) => {

  useFocusEffect(
    React.useCallback(() => {
      retrieveData();
    }, [])
  );


  const[tasks, setTasks] = useState([]);
  const[menu, setMenu] = useState(false);

 
  
  //const response =  AsyncStorage.removeItem('@savetasks:tasks');
  const handleMenu = () => {
    if(!menu){
      setMenu(true)
    }else{
      setMenu(false)
    }
  };

  const handleAddTask = () => {
  setMenu(false);
    navigation.navigate('Form');
  };

 const handleRemove = async(id) =>{

  try {
    const res = await AsyncStorage.getItem("@savetasks:tasks")

    if(res.length > 0 ) {
      const previousData = res ? JSON.parse(res) : [];
      const data = previousData.filter((task)=> task.id !== id)
      setTasks(data)
      await AsyncStorage.setItem('@savetasks:tasks', JSON.stringify(data))
      
      retrieveData();
      
    }
  
  }catch (error) {
    
  }
  };

  const retrieveData = async () => {
    try {
      const res = await AsyncStorage.getItem('@savetasks:tasks');
     
      if(res.length > 0 ) {
        const parcedData = JSON.parse(res).reverse()
        setTasks(parcedData)
      }

    } catch (err) {
      console.log(err);
    }
  };

    const handleSearch = (query) => {
      setMenu(false);
   
      navigation.navigate('Search', {query})
    };

  return (
   <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleMenu} >
      <Icon name="bars" size={35} color="white" style={{left:"2%", top:"15%",}} />
      </TouchableOpacity>
      {menu === true && (
        <>
        <View style={styles.menuHeader}>
        <Text style={styles.textMenuCategory}>Categorias</Text>
        </View>
        <View style={styles.menu}>
        <TouchableOpacity onPress={() => handleSearch("Trabalho")}>
        <Text style={styles.textMenu}>Trabalho</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSearch("Estudos")}>
        <Text style={styles.textMenu}>Estudos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSearch("Lazer")}>
        <Text style={styles.textMenu}>Lazer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSearch("Compras")}>
        <Text style={styles.textMenu}>Compras</Text>
        </TouchableOpacity>
        </View>
     
        </>
      )}
        <View style={styles.addTask}>
         <Text style={styles.text}>Lista de tarefas</Text>
         <Image source={require("./../../assets/logo3.jpg")} style={{height:110, width:95, right:"15%", bottom:"6%"}} />
        </View>
       </View>
        <View style={styles.container3}>
        <ScrollView>
           {tasks && tasks.map((task) => (
            <Card key={task.id} task={task} handleRemove={handleRemove} type={task.type} />
            ))}
        </ScrollView>
        <TouchableOpacity style={styles.btnSpace} onPress={handleAddTask}>
         <Image source={require("./../../assets/plus2.jpg")} style={{height:70, width:70, top:height/19, left:"10%"}} />
        </TouchableOpacity>
        </View>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        height:height,
        width:width,
        backgroundColor:"#F5F5F8",    
    },
    container2:{
      zIndex: 1,
        Bottom:"70%",
        height: "20%",
        width:"100%",
        backgroundColor: '#67c5ff',
        textAlign:"center",
        display:"flex",
        justifyContent:"center",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 5,
        shadowRadius: 4,
        elevation: 1,
        borderBottomColor:"black",
      },
      container3:{ 
        top:height*0.03, 
        height: "83%",
        width:"100%",
        textAlign:"center",
        display:"flex",
        justifyContent:"center",
         
      },
      text:{
        marginBottom:"10%",
        marginLeft: "5%",
        fontSize:30,
        color:"white",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"left",
      },
      addTask:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",    
      },
      btnSpace:{
        width: width*0.2,
        height: height*0.2,
        marginLeft:"40%", 
        bottom:height/18,
      },
      hide: {
        display:"none",
      },
      menu:{
        position: 'absolute',
        zIndex: 2,
        left:"10%",
        top:"39%",
        backgroundColor:"white",
        color:"black",
        padding:2,
        height:200,
        width:220,
        borderColor:"#A0A0A0",
        borderWidth:1,
        borderRadius:4,
      },
      menuHeader:{
        top:"5%",
        backgroundColor:"#67c5ff",
        position: 'absolute',
        zIndex: 2,
        left:"10%",
        color:"black",
        padding:8,
        height:55,
        width:219,
        borderRadius:4,
        borderColor:"#797979",
        borderWidth:1,

      },
      textMenu:{
        height:45,
        fontSize:20,
        padding:10,
     
      },
      textMenuCategory:{
        color:"white",
        fontSize:22,
        padding:1,
        backgroundColor:"#67c5ff"
      }

}
)

export default Home

