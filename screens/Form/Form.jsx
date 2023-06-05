import React from 'react'
import { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectDropdown from 'react-native-select-dropdown'
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

  const Form = () => {
  const navigation = useNavigation();
  const[type, setType] = useState("Lazer");
  const[title, setTitle] = useState("");
  const[description, setDescription] = useState("");
  const[priority, setPriority] = useState("");
  const[date, setDate] = useState("");
  const[info, setInfo] = useState("");
  const[id, setId] = useState("");

  const[taskList, setTaskList] = useState([]);

    const prioridade = ["Alta", "Média", "Baixa"]
    const tipo = ["Compras", "Estudos", "Trabalho","Lazer"]

    const handleDateChange = (text) => {
      const regex = /^(\d{8})$/; // Regex pattern to match exactly 8 digits
      let formattedDate = text.replace(/\D/g, ''); // Remove non-digit characters
      if (regex.test(text)) {
        formattedDate = formattedDate.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Apply date format
        setDate(formattedDate);
      } else {
        setDate(formattedDate);
      }
    };

    
    useEffect(() => {
      const retrieveData = async () => {
        try {
          const res = await AsyncStorage.getItem('@savetasks:tasks');
         
          //console.log("asyncStorage Form ->" , res);
         
        } catch (err) {
          console.log(err);
        }
      };
      retrieveData();
    }, []);

    const handleSubmmit = () => {

      if(!title || !date || !description){
        setInfo("Por favor preencha os campos.")
        const timeout = setTimeout(() => {
          setInfo("");
        }, 1500);
        return
      }

      if(!priority){
        setPriority("Baixa");
      };

      if(!type){
        setType("Lazer");
      }

      const id = uuid.v4();

      const newTask = {
        id,
        title,
        description,
        date,
        priority,
        type,
      }
      //setTaskList([...taskList, newTask]);
      const storeData = async() => {
        try {
          const response = await AsyncStorage.getItem('@savetasks:tasks');
        
          const previousData = response ? JSON.parse(response) : [];
        
         const data = previousData.length > 0 ? [...previousData, newTask] : [newTask]
          
          await AsyncStorage.setItem('@savetasks:tasks', JSON.stringify(data)); 
        
          setTaskList(data)
      }catch (error) {
          console.log(error)
      }
          
    }
    storeData();

      }
       
    useEffect(() => {
      if (taskList.length > 0) {
        
        navigation.navigate('Home', { taskList }); 
      }
    }, [taskList]);
 
    return (
        <SafeAreaView style={styles.containerMain}>
         <View style={styles.container2}>  
           <View style={styles.addTask}>
             <TouchableOpacity style={styles.touchCloseArea} onPress={() => navigation.navigate('Home')}>
             <Image source={require("./../../assets/close3.jpg")} style={{height:25, width:25, marginLeft: 8, top:"28%"}} />  
            </TouchableOpacity>
             <Text style={styles.text}>Adicione uma tarefa</Text>
            </View>   
            </View>
            <View style={styles.containerForm}>
            {info && <Text style={styles.info}>{info}</Text>}
                <Text style={styles.textInput}>Título*</Text>
                <TextInput onChangeText={(text) => setTitle(text)} style={styles.input} value={title} maxLength={31}/>
                <Text style={styles.textInput}>Descrição*</Text>
                <TextInput  onChangeText={(text) => setDescription(text)} style={styles.input} value={description}/>
                <Text style={styles.textInput}>Prioridade</Text>
                <SelectDropdown
                 rowStyle={styles.RowStyle}
                 rowTextStyle={styles.dropdown4RowTxtStyle}
                 buttonStyle={styles.drop}
                 buttonTextStyle={styles.drop}
                 dropdownStyle={styles.dropdown}
                 data={prioridade}
                 defaultButtonText={"Selecione"}
                 onSelect={(selectedItem, index) => {
                
                  setPriority(selectedItem)
	            }}
	            buttonTextAfterSelection={(selectedItem, index) => {
		          return selectedItem
	            }}
             	rowTextForSelection={(item, index) => {
	    	      return item}} 
             />  
              <Text style={styles.textInput}>Categoria</Text>
              <SelectDropdown
                 rowStyle={styles.RowStyle}
                 rowTextStyle={styles.dropdown4RowTxtStyle}
                 buttonStyle={styles.drop}
                 buttonTextStyle={styles.drop}
                 dropdownStyle={styles.dropdown}
                 data={tipo}
                 defaultButtonText={"Selecione"}
                 onSelect={(selectedItem, index) => {
                  //console.log(selectedItem, index)
                  setType(selectedItem)
	            }}
	            buttonTextAfterSelection={(selectedItem, index) => {
		          return selectedItem
	            }}
             	rowTextForSelection={(item, index) => {
	    	      return item}} 
             />  
                <Text style={styles.textInput}>Data*</Text>
                <TextInput onChangeText={handleDateChange}  maxLength={10}
                 keyboardType="numeric" value={date} style={styles.input}/>

            <View style={styles.containerButton}>
            <TouchableOpacity onPress={handleSubmmit} style={styles.button} >
            <Text style={styles.textButton}>Salvar</Text>
           </TouchableOpacity> 
           </View>
            </View>
         
        </SafeAreaView>
      )
    
    };
    const styles = StyleSheet.create({
            containerMain: {
              height: height,
              width: width,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              display:"flex",  
              backgroundColor:"#F5F5F8"
            },
            container2:{
              marginBottom:"38%",
              height: "20%",
              width:"100%",
              backgroundColor:"#67c5ff",
              textAlign:"center",
              display:"flex",
              justifyContent:"center", 
            },
            containerForm:{
                bottom:"10%",
                borderRadius:10,
                height: "60%",
                width:"96%",
                backgroundColor: '#F5F5F8',
                textAlign:"center",
                display:"flex",
                justifyContent:"center", 
              },
              containerButton:{
                top:100,
                height: "30%",
                width:"100%",
                textAlign:"center",
                display:"flex",
                justifyContent:"center", 
              },
            text:{
              marginTop:"7%",
              fontSize:27,
              color:"white",
              alignItems:"center",
              justifyContent:"center",
              textAlign:"center",
              marginLeft: "7%",
            },
            info:{
              paddingTop:17,
              fontSize:18,
              width:"99%",
              height:"15%",
              color:"#717171",
              alignItems:"center",
              justifyContent:"center",
              textAlign:"center",
              display:"flex",
              borderColor:"black",
              borderRadius:15,
              backgroundColor:"#F9D2D2",
              padding:11,
              borderColor:"black",
              position:"relative",
            },
            drop:{
              backgroundColor:"#E3E3E9",
              color:"#6A6B6D",
              borderRadius:8,
            },
            dropdown:{
              backgroundColor:"#E3E3E9",
              color:"#6A6B6D",
            },
            RowStyle:{
              backgroundColor:"#E7E9ED",
              borderColor:"black",
            },
            dropdown4RowTxtStyle:{
              color:"#6A6B6D",
             
            },
            textInput:{
                padding:5,
                fontSize:17,
                color:"#575758",
                alignItems:"center",
                justifyContent:"center",
                textAlign:"left",
                overflow:"scroll",
                flexWrap:"nowrap",
              },
              textButton:{
                padding:5,
                fontSize:30,
                color:"white",
                alignItems:"center",
                justifyContent:"center",
                textAlign:"left",
              
              },
              button: {
                bottom: height * 0.17,
                borderRadius:15,
                alignSelf:"center",
                textAlignVertical:"center",
                width:"80%",
                height:"50%",
                borderColor: 'dark-blue',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 10,
                backgroundColor: '#57F0AA',
              },
              input: {
                color:"black",
                borderRadius:8,
                backgroundColor:"#E3E3E9",
                display:"flex",
                justifyContent: "center",
                alignItems:"center",
                textAlign:"center",
                fontSize:22,
                width:"98%",
                height: 50,
                borderBottomColor:"white",
          
              },
            addTask:{
                display:"flex",
                flexDirection:"row",
               backgroundColor:"#67c5ff",
               
              },
              touchCloseArea:{
                width: width*0.13,
                height: height*0.10,
                bottom:40,
              }
  
          });

          export default Form

          