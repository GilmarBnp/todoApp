import React, { useContext } from 'react'
import { Dimensions, SafeAreaView, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useNavigation, useRoute  } from '@react-navigation/native';


const List = (tasks) => {

  return (

  <SafeAreaView style={styles.mainContainer}>
    <View>
     
    </View>
  </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    mainContainer:{
        bottom:"30%",
        width:"96%",
        height:"20%",
        backgroundColor:"F5F5F8",
    },
    text:{
        fontSize:20,
    }
})
export default List