import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {View} from 'react-native';


const Tab = createBottomTabNavigator();

var active="#f2333f";
var secondary ="#ffd7d9"

//importing screen
import AppHome from '../screens/AppHome';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home'
import Appointments from '../screens/Appointments';
import BookAppointment from '../screens/BookAppointment';
import BookedAppointments from '../screens/BookedAppointments';
import UploadReport from '../screens/UploadReport';
import ViewReports from '../screens/ViewReports';
import ViewReport from '../screens/ViewReport';
import UploadDietPlan from '../screens/UploadDietPlan';


//import nav
import DrawerNav from './DrawerNav';

export default function HomeNavigation(){


    return (
        <Tab.Navigator initialRouteName="Home"  screenOptions={({ route }) => ({
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
              else if(route.name === 'Home'){
                return <MaterialIcons name='home' size={size} color={color} />
              }

              else if(route.name === 'Chat'){
                return <MaterialIcons name='chat' size={size} color={color} />
              }
              else if(route.name == 'Reports'){
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

          <Tab.Screen name="Appointments" component={BookedAppointments} />
          <Tab.Screen name="Chat" component={Home} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Reports" component={ViewReports} />
          
          
        </Tab.Navigator>
      );
}