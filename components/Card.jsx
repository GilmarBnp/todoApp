import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useNavigation, useRoute  } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const Card = ({ task, handleRemove, type }) => {

  function getPriorityStyle(priority){
    switch(priority){
      case "Baixa":
      return styles.priorityLow;
      case "Média":
      return styles.priorityMed;
      case "Alta":
      return styles.priorityHight;
      default:
       return null;
    }
  };

  function getCategoryIcon(type) {
  switch (type) {
    case "Trabalho":
      return "suitcase";
    case "Estudos":
      return "book";
    case "Compras":
      return "shopping-cart";
    case "Lazer":
      return "gamepad";
    default:
      return null;
  }
  }

const[taskList, setTaskList] = ([]);

const icon = getCategoryIcon(type);
 
  return (
    <>
    <View style={[styles.cardBody, getPriorityStyle(task.priority)]}>
    <Text style={styles.date}>{`Para o dia: ${task.date}`}</Text>

    {icon && (
          <Icon
            name={icon} size={30} color="black" 
            style={{ left: '99%', justifyContent:"flex-end", display:"flex" }}
          />
        )}

    <TouchableOpacity onPress={()=> handleRemove(task.id)} >
   <Text  style={{fontSize:17, fontWeight:"700"}}>X</Text>
   </TouchableOpacity>
   </View>

    <View style={styles.card}>
      <View style={styles.texContainer}>
      <Text style={styles.title}>{`${task.title}`}</Text>
      </View>
      <Text style={styles.description}>{task.description}</Text>
       
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 6,
    marginVertical: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width:"97.5%",
    display:"flex",
    alignSelf:"center",
    botton:10,
  },
  cardBody: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    top:8,
    borderRadius: 8,
    backgroundColor:"#E1FAF7",
    alignSelf:"center",
    width:"98%",
    flexDirection:"row",
    justifyContent:"space-between",
    padding: 12,

  },
    priorityLow:{
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      top:8,
      borderRadius: 8,
      backgroundColor:"#C7E7F1",
      alignSelf:"center",
      width:"98%",
      flexDirection:"row",
      justifyContent:"space-between",
      padding: 12,
    },
      priorityMed:{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        top:8,
        borderRadius: 8,
        backgroundColor:"#F1E6C7",
        alignSelf:"center",
        width:"98%",
        flexDirection:"row",
        justifyContent:"space-between",
        padding: 12, 
      },
        priorityHight:{
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 2,
          top:8,
          borderRadius: 8,
          backgroundColor:"#F1C7C7",
          alignSelf:"center",
          width:"98%",
          flexDirection:"row",
          justifyContent:"space-between",
          padding: 12,
        },
  title: {
    fontSize: 22,
    fontWeight: 'bold',   
  },
  texContainer:{
     
  },
  date:{
    fontSize:18,
  },
  description: {
    fontSize: 20,
    marginTop: 8,
  },

})

export default Card;