import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState,useEffect, createContext} from 'react';

//screens import
import AppHome from '../screens/AppHome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import DoctorHome from '../screens/Doctor/DoctorHome';

const {Navigator,Screen} = createStackNavigator();


export default function DoctorNav(){

    return(
        <UserContext.Provider value={user} >
        <NavigationContainer>
            <Navigator>
                
            </Navigator>
        </NavigationContainer>  
    )
}