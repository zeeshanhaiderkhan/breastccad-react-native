/*router.post('/new',add_new_appointment); //add new appointmens from list of many
router.get('/getByDate/:date/:did',get_apppointments_by_date); //get apppointments by date filter
router.delete('/deleteById/:aid',delete_appointment_by_id);
router.delete('/deleteByDate',delete_appointments_by_date);
router.get('/getById/:aid',get_appointment_by_id);
router.get('/getByPid/:pid',get_appointments_by_pid);
router.get('/getByDid/:did',get_appointments_by_did);
router.put('/book/:aid',book_appointment);
router.put('/cancel/:aid',cancel_appointment);
*/
import { View, ScrollView,Text,TouchableOpacity,FlatList,Alert, RefreshControl } from "react-native";
import {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import API_URL from "../config";


export default function BookedAppointments({navigation}){
    const [timeSlots,setTimeSlots] = useState([])
   const[refreshing,setRefreshing] = useState(false);
    
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
        const pid='6262d51bfb40b3c1cbe56722'
        fetch(API_URL+'/appointment/getByPid/'+pid,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);setTimeSlots(result.reverse());setRefreshing(false);}).catch((error)=>console.log('error',error));
           
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
            <View style={{ backgroundColor:'#f2333f', padding:'5%',paddingTop:'10%',marginBottom:'5%', justifyContent:'space-between'}}>
                
                <View style={{alignItems:'center'}} >
                    <Text style={{alignSelf:'center', color:'white', fontSize:18, fontWeight:'bold'}}>Appointments</Text>
                </View>
                

        </View>

             <TouchableOpacity style={{alignItems:'center', backgroundColor:'red', width:'60%', alignSelf:'center',padding:'5%'}} onPress={()=>{navigation.push('BookAppointment');}}>
         <View>
         
           <Text style={{color:'white', fontSize:18}}>Book Appointment</Text></View>
       </TouchableOpacity>
        
        {
            !timeSlots.length && <Text style={{color:'red', fontSize:28,backgroundColor:'yellow',padding:'5%', marginTop:'10%',alignSelf:'center'}}>No Bookings Yet!</Text>
        }
        
        <FlatList
        data ={timeSlots}
        renderItem={({item})=> <View style={{padding:'5%', borderColor:'black',  alignItems:'center'}}>
          
          
          <TouchableOpacity onLongPress={()=>{
            cancelAppointment(item._id);
          }} disabled={!dateDone(item.date)} style={{backgroundColor:dateDone(item.date)?'red':'blue', borderRadius:0, alignItems:'center', padding:'3%', width:'80%'}}>
              
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