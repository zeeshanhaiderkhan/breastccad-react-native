import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState,useEffect, createContext} from 'react';


//importing screen
import AppHome from '../screens/AppHome';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home'
import BookAppointment from '../screens/BookAppointment';
import BookedAppointments from '../screens/BookedAppointments';
import UploadReport from '../screens/UploadReport';
import ViewReports from '../screens/ViewReports';
import ViewReport from '../screens/ViewReport';
import UploadDietPlan from '../screens/UploadDietPlan';
import YourDoctor from '../screens/YourDoctor';
import ChatDoctor from '../screens/ChatDoctor';


//Doctor Screens
import Patients from '../screens/Doctor/Patients';
import Chat from '../screens/Doctor/Chat';
import DoctorHome from '../screens/Doctor/DoctorHome';
import ViewPatient from '../screens/Doctor/ViewPatient';
import ChatPatient from '../screens/Doctor/ChatPatient';
import CreateAppointments from '../screens/Doctor/CreateAppointments';
import Appointments from '../screens/Doctor/Appointments';
import PatientAppointments from '../screens/Doctor/PatientAppointments';
import PatientReports from '../screens/Doctor/PatientReports';
import ViewPatientReport from '../screens/Doctor/ViewPatientReport';

var active="#f2333f";
var secondary ="#ffd7d9"
var img1 = require('../assets/images/s1.jpg');
var img2=require('../assets/images/s2.jpg');
var img3 = require('../assets/images/s3.jpg');

const {Navigator,Screen} = createStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const UserContext = createContext();

///DOCTOR NAV START
const DoctorDrawer = createDrawerNavigator();
const DoctorTab = createBottomTabNavigator();

function DoctorDrawerNav({navigation}){
  const logout=()=>{
    AsyncStorage.clear().then(()=>{console.log("User Logged Out!")})
    navigation.navigate('Login');
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppHome' }],
    });
  }
  return(
    <DoctorDrawer.Navigator initialRouteName="Home" screenOptions={{drawerPosition:'right', drawerType:'back', headerShown:false, drawerActiveBackgroundColor:active,drawerStyle:{backgroundColor:'white'},drawerActiveTintColor:'white'}}    drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={logout} />
        </DrawerContentScrollView>
      )
    }}>
      <DoctorDrawer.Screen name="Home" component={DoctorTabNav} />
      <DoctorDrawer.Screen name="CreateSlots" options={{title:'Create Slots'}} component={CreateAppointments} />
    </DoctorDrawer.Navigator>
  )

}
// <DoctorTab.Screen name="Home" component={DoctorHome} />
function DoctorTabNav(){

  return(
    <DoctorTab.Navigator initialRouteName="Home"  screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        
        if(route.name == 'Home'){
          return <MaterialIcons name='home' size={size} color={color} />
      }
          else if(route.name == 'Appointments'){
              return <MaterialIcons name='schedule' size={size} color={color} />
          }    
          else if(route.name == 'Patients'){
            return <Fontisto name='bed-patient' size={size} color={color} />
        }      
      },
      tabBarActiveTintColor: active,
      tabBarInactiveTintColor: secondary,
      headerShown:false
    })}>
      
      <DoctorTab.Screen name="Patients" component={DoctorTabPatientsNav} />
     
      <DoctorTab.Screen name="Appointments" component={Appointments} />

    </DoctorTab.Navigator>
  )
}
const DoctorTabPatientsStackNav=  createStackNavigator();
function DoctorTabPatientsNav(){

  return(
    <DoctorTabPatientsStackNav.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: active //'#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }} >
      <DoctorTabPatientsStackNav.Screen options={{headerShown:false}} name="Patients" component={Patients} />
      <DoctorTabPatientsStackNav.Screen options={({ route }) => ({ title: route.params.name })} name="ViewPatient" component={ViewPatient} />
      <DoctorTabPatientsStackNav.Screen options={{headerShown:true, title:'Chat'}} name="ChatPatient" component={ChatPatient} />
      <DoctorTabPatientsStackNav.Screen   options={({ route }) => ({ title: route.params.name })} name="PatientAppointments" component={PatientAppointments} />
      <DoctorTabPatientsStackNav.Screen   options={({ route }) => ({ title: route.params.name })} name="PatientReports" component={PatientReports} />
      <DoctorTabPatientsStackNav.Screen   options={({ route }) => ({ title: route.params.name })} name="ViewPatientReport" component={ViewPatientReport} />
    </DoctorTabPatientsStackNav.Navigator>
  )

}


//DOCTOR NAV END
export default function PatientNav(){
  const[auth,setAuth] = useState(false);
  const[user,setUser] = useState();
  const[role,setRole] = useState();
  const[screen,setScreen] = useState();
  
useEffect(()=>{

    AsyncStorage.getItem('@user')
    .then((value) => {
      if (value) {
        setAuth(true);
        setRole(JSON.parse(value).role);
        if(role=='doctor') setScreen('DoctorHome');
        else if (role=='patient') setScreen('PatientHome');
        setUser(JSON.parse(value));
      }
    });
},[auth])

  return(
    <UserContext.Provider value={user} >
        <NavigationContainer >
        <Navigator screenOptions={{ headerStyle: {backgroundColor: active,},         
            headerTintColor: '#f2f2f2',
            headerTitleStyle: {
                fontWeight: 'bold'
            },}} initialRouteName={auth? screen:"AppHome"} >

                <Screen name="AppHome" options={{headerShown:false}} component={AppHome} />
                <Screen name="Register" options={{headerShown:false}} component={Register} />
                <Screen name="Login" options={{headerShown:false}} component={Login} />
                <Screen name="PatientHome" options={{headerShown:false}} component={DrawerNav} />
                <Screen name="DoctorHome" options={{headerShown:false}} component={DoctorDrawerNav} />
               
                

                </Navigator>      
        </NavigationContainer>
    </UserContext.Provider>
  )
}




function DrawerNav({navigation}) {

    const logout=()=>{
      AsyncStorage.clear().then(()=>{console.log("User Logged Out!")})
      navigation.navigate('Login');
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppHome' }],
      });
    }
  
      return (
     
        <Drawer.Navigator  initialRouteName="Home" screenOptions={{drawerPosition:'right', drawerType:'back', headerShown:false, drawerActiveBackgroundColor:active,drawerStyle:{backgroundColor:'white'},drawerActiveTintColor:'white'}}    drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={logout} />
            </DrawerContentScrollView>
          )
        }}>
          <Drawer.Screen name="HomeDrawer" component={HomeTabNavigation} />
          {/**profile screen can come here */}
        </Drawer.Navigator>
    
    );
  }

  
function HomeTabNavigation(){


    return (
        <Tab.Navigator initialRouteName="HomeTab"  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
                if(route.name == 'Appointments'){
                    return <MaterialIcons name='schedule' size={size} color={color} />
                }
              
              if (route.name === 'Doctor') {
                iconName = focused
                  ? 'doctor'
                  : 'doctor';
              } 
              else if(route.name === 'HomeTab'){
                return <MaterialIcons name='home' size={size} color={color} />
              }

              else if(route.name === 'Chat'){
                return <MaterialIcons name='chat' size={size} color={color} />
              }
              else if(route.name == 'ReportsTab'){
                return <MaterialIcons name='assignment' size={size} color={color} />
              }
              else if(route.name==='Others'){
                return <MaterialIcons name='more-horiz' size={size} color={color} />
              }
      
              // You can return any component that you like here!
              
            },
            tabBarActiveTintColor: active,
            tabBarInactiveTintColor: secondary,
            headerShown:false
          })}>

          <Tab.Screen name="Appointments" component={AppoinmentNav} />
          <Tab.Screen name="Chat" component={ChatDoctor} />
          <Tab.Screen name="HomeTab" options={{title:'Home'}} component={HomeNav} />
          <Tab.Screen name="ReportsTab" options={{title:'Reports'}} component={ReportNav} />
          
          
        </Tab.Navigator>
      );
}

const ReportStackNav = createStackNavigator();

function ReportNav(){

    return(
        <ReportStackNav.Navigator  screenOptions={{
            headerStyle: {
              backgroundColor: active //'#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} initialRouteName="Reports">
            <ReportStackNav.Screen options={{headerShown: false}} name="Reports"  component={ViewReports} />
            <ReportStackNav.Screen  name="Report" component={ViewReport} />
            <ReportStackNav.Screen  name="UploadReport" options={{title:"Upload Report"}} component={UploadReport} />
        </ReportStackNav.Navigator>
    )
}

const AppointmentStackNav = createStackNavigator();

function AppoinmentNav(){
    return(
        <AppointmentStackNav.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: active //'#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} >
            <AppointmentStackNav.Screen options={{headerShown:false}} name="Appointments" component={BookedAppointments}/>
            <AppointmentStackNav.Screen name="BookAppointment" options={{title:'Book Appointment'}} component={BookAppointment} />
        </AppointmentStackNav.Navigator>
    )
}

const HomeStackNav = createStackNavigator();


function HomeNav(){

  return(
      <HomeStackNav.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: active //'#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  initialRouteName="Home">
          <HomeStackNav.Screen options={{headerShown:false}} name="Home" component={Home} />
          <HomeStackNav.Screen name="Prescription" component={ViewReports} />
          <HomeStackNav.Screen name="DietPlans" component={ViewReports} />
          <HomeStackNav.Screen name="Chatbot" component={ViewReports} />
          <HomeStackNav.Screen name="Feedback" component={ViewReports} />
          <HomeStackNav.Screen options={{title:'Your Doctor'}} name="YourDoctor" component={YourDoctor} />
      </HomeStackNav.Navigator>
  )
}