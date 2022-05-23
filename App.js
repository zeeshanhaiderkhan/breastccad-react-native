import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState,useEffect} from 'react';


//importing screen
import AppHome from './screens/AppHome';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home'
import HomeNavigation from './navigation/HomeNavigation';
import Appointments from './screens/Appointments';
import BookAppointment from './screens/BookAppointment';
import BookedAppointments from './screens/BookedAppointments';
import UploadReport from './screens/UploadReport';
import ViewReports from './screens/ViewReports';
import ViewReport from './screens/ViewReport';
import UploadDietPlan from './screens/UploadDietPlan';

//doctor
import DoctorHome from './screens/Doctor/DoctorHome';
import Patients from './screens/Doctor/Patients';
import ViewPatient from './screens/Doctor/ViewPatient';

var active="#f2333f";
var secondary ="#ffd7d9"
var img1 = require('./assets/images/s1.jpg');
var img2=require('./assets/images/s2.jpg');
var img3 = require('./assets/images/s3.jpg');

const {Navigator,Screen} = createStackNavigator();


//drawer
import DrawerNav from './navigation/DrawerNav';

export default function App(){
  const[role,setRole] = useState('')
  const isAuthenticated= ()=>{
    try{
      AsyncStorage.getItem('@user').then((item)=>{
        if (item !== null){{
          item=JSON.parse(item)
          setRole(item.role);
          
          console.log(item);
        }}
      })
    }
    catch(err){
      console.log("error fetching AsyncStorage user data");
    }
  }
useEffect(()=>{
  isAuthenticated();
},[])
  return(
    <NavigationContainer >
      {role=='' && <Navigator screenOptions={{ headerStyle: {
            backgroundColor: active,
          },
          
          headerTintColor: '#f2f2f2',
          headerTitleStyle: {
            fontWeight: 'bold'
          },}}>

             <Screen name="AppHome" options={{headerShown:false}} component={AppHome} />
             <Screen name="Register" options={{headerShown:false}} component={Register} />
             <Screen name="Login" options={{headerShown:false}} component={Login} />
            </Navigator>}

     { (role=='patient') && 
     <Navigator screenOptions={{ headerStyle: {
      backgroundColor: active,
    },
    
    headerTintColor: '#f2f2f2',
    headerTitleStyle: {
      fontWeight: 'bold'
    },}}>
      
     
      <Screen name="PatientHome" options={{headerShown:false}} component={DrawerNav} />
      <Screen name="Reports"  component={ViewReports} />
      <Screen name="Report" component={ViewReport} />
      <Screen name="UploadReport" options={{ title: 'Upload Report' }}  component={UploadReport} />
      <Screen name="BookedAppointments" options ={{title:'Appointments'}} component={BookedAppointments} />
      <Screen name="BookAppointment" options ={{title:'Book Appointment'}} component={BookAppointment} />
      </Navigator>
      }

{ (role=='doctor') && 
     <Navigator screenOptions={{ headerStyle: {
      backgroundColor: active,
    },
    
    headerTintColor: '#f2f2f2',
    headerTitleStyle: {
      fontWeight: 'bold'
    },}}>
      
     
      <Screen name="DoctorHome" options={{headerShown:false}} component={ViewPatient} />
      </Navigator>
      }
      
      
      
 
 


      
    </NavigationContainer>
  )
}



