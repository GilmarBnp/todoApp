import React, { useMemo } from 'react'
import { Dimensions, SafeAreaView, View, StyleSheet, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, useNavigation, useRoute, KeyboardAvoidingView   } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from '../../components/Card';

import Icon from 'react-native-vector-icons/FontAwesome';



const { width, height } = Dimensions.get('window');

const Search = ({navigation, route}) => {

  const[tasks, setTasks] = useState([]);
  const[menu, setMenu] = useState(false);
  const[queryState, setQueryState] = useState("");
  const[queryResult, setQueryResult] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const deleted = null;

  useEffect(() => {
    const {query} = route.params;

    setQueryState(query)
  },[])
  
  //const response =  AsyncStorage.removeItem('@savetasks:tasks');
  const handleBack = () => {
 
    navigation.navigate("Home")
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
    };
  
  }catch (error) {
    
  }
  } 

   useEffect(() => {
    if (route.params && route.params.taskList) {
      retrieveData()
    }
   
}, [route.params]);

  const retrieveData = async () => {
      try {
        const res = await AsyncStorage.getItem('@savetasks:tasks');
        const previousData = res ? JSON.parse(res) : [];
        const data = previousData.filter((task)=> task.type === queryState).reverse();
  
        setQueryResult(data);
  
        setRefresh(true);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(()=> {
      retrieveData();
  },[queryState])



  return (
   <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleBack} >
        <Icon name="arrow-left" size={30} color="white" style={{left:"2%", top:"15%",}} />
      </TouchableOpacity>
      {menu === true && (
        <>
        <View style={styles.menuHeader}>
        <Text style={styles.textMenuCategory}>Categorias</Text>
        </View>
        <View style={styles.menu}>
        <Text style={styles.textMenu}>Trabalho</Text>
        <Text style={styles.textMenu}>Estudos</Text>
        <Text style={styles.textMenu}>Lazer</Text>
        <Text style={styles.textMenu}>Compras</Text>
        </View>
     
        </>
      )}
        <View style={styles.addTask}>
         <Text style={styles.text}>Resultados</Text>
         <Image source={require("./../../assets/logo3.jpg")} style={{height:110, width:95, right:"15%", bottom:"6%"}} />
        </View>
       </View>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {queryResult.length === 0 && (
              <Text style={styles.noTask}>Não foi encontrado nenhuma tarefa</Text>
            )}
            {queryResult.map((task) => (
              <Card key={task.id} task={task} handleRemove={handleRemove} type={task.type} />
            ))}
          </ScrollView>
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
        bottom:height/20,
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
        padding:8,
        height:240,
        width:220,
        borderColor:"#8F9191",
        borderWidth:1,
        borderRadius:4,
      },
      menuHeader:{
        top:"5%",
        backgroundColor:"#4495A9",
        position: 'absolute',
        zIndex: 2,
        left:"10%",
        color:"black",
        padding:8,
        height:55,
        width:219,
        borderRadius:4,
        borderColor:"#5D5D5D",
        borderWidth:1,

      },
      textMenu:{
        height:55,
        fontSize:18,
        padding:12,
        borderColor:"#C6C4C4",
        borderWidth:.6,
      },
      textMenuCategory:{
        color:"white",
        fontSize:20,
        padding:1,
        backgroundColor:"#4495A9"
      },
      noTask:{
        fontSize:18,
        display:'flex',
        textAlign:"center",
      }

}
)

export default Search

