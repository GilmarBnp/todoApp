import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, } from 'react-native';
import { NavigationContainer, useNavigation, useRoute  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';


// Screens
import Form from './screens/Form/Form';
import Home from './screens/Home/Home';
import Card from './components/Card';
import Search from './screens/Search/Search';
import * as ScreenOrientation from 'expo-screen-orientation'

const { width, height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();


export default function App({navigation}) {

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
 
  return (
    
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Form" component={Form}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Search" component={Search}/>
      </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  containerMain: {
    height: height,
    width:width,
    alignItems: 'center',
    justifyContent: 'center',
    display:"flex",
    backgroundColor:"#B4B7B8",
  },
});
