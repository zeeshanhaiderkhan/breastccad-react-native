import { View, ScrollView,Text,TouchableOpacity,FlatList,Alert, RefreshControl } from "react-native";
import {useState, useEffect,useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import API_URL from "../../config";
import { UserContext } from '../../navigation/PatientNav';

export default function PatientAppointments({route,navigation}){
    const [timeSlots,setTimeSlots] = useState([])
   const[refreshing,setRefreshing] = useState(false);
    const user = useContext(UserContext);
    const getSlots=()=>{
        //timeSlots
        //api/appointment/new
      setRefreshing(true);
        var requestOptions= {
          method:'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
        }
        const pid=route.params.pid;

        fetch(API_URL+'/appointment/getByPid/'+pid,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);setTimeSlots(result);setRefreshing(false);}).catch((error)=>{console.log('error',error);setRefreshing(false);});
           
        }
        useEffect(()=>{
            getSlots();
        },[])

        const cancelAppointment=(aid)=>{
           
            Alert.alert(
                'Are You Sure Want To Cancel Booking?',
                'Select Below Options',
                [
                  { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                  {
                    text: 'OK', onPress: () => {
                        var requestOptions= {
                            method:'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                              },
                          }
                        fetch(API_URL+'/appointment/cancel/'+aid,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);
                          Alert.alert("Your Booking Has Been Cancelled!");
                          getSlots();
                    }).catch((error)=>console.log('error',error));
                    }
                  },
                ])
        }

    const dateDone=(date)=>{
        const d1 = new Date(date);
        const d2 = new Date();
        if(d2.getTime()>d1.getTime()) return false;
        else return true;

    }

    return(<ScrollView  refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={()=>{getSlots()}}
      />
    }
    >
        
        {
            !timeSlots.length && <Text style={{color:'red', fontSize:28,backgroundColor:'yellow',padding:'5%', marginTop:'10%',alignSelf:'center'}}>No Bookings Yet!</Text>
        }
        
        <FlatList
        data ={timeSlots}
        renderItem={({item})=> <View style={{padding:'5%', borderColor:'black',  alignItems:'center'}}>
          
          
          <TouchableOpacity onLongPress={()=>{
            cancelAppointment(item._id);
          }} disabled={!dateDone(item.date)} style={{backgroundColor:dateDone(item.date)? '#f2333f':'blue', borderRadius:0, alignItems:'center', padding:'3%', width:'80%'}}>
              
              <Text style={{fontSize:12, color:'white'}}>{item.date.substring(0,10)}</Text>
              <Text style={{fontSize:24, color:'white'}}>{item.startTime}</Text>
              {
                  dateDone(item.date) && <View ><View>
                  <MaterialIcons style={{alignSelf:'center'}} name='pending-actions' size={25} color='white' /></View><View>
             <Text style={{fontSize:10, color:'white',alignSelf:'center'}}>Upcoming</Text></View>
                </View>
              }
              {
                  !dateDone(item.date) && <View ><View >
                    <MaterialIcons style={{alignSelf:'center'}} name='done' size={25} color='white' /></View><View>
               <Text style={{fontSize:10, color:'white',alignSelf:'center'}}>Done</Text></View>
                  </View>
              }
          </TouchableOpacity>
        
      </View>}
        />

        </ScrollView>)
}