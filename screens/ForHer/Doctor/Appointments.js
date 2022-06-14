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
import {useState, useEffect,useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import API_URL from "../../config";
import { UserContext } from '../../navigation/PatientNav';

export default function Appointments({navigation}){
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
        const did=user._id;

        //router.get('/getBookedByDid/:did',get_appointments_booked_by_did)//ther if app are done why showing
        fetch(API_URL+'/appointment/getBookedByDid/'+did,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);setTimeSlots(result);setRefreshing(false);}).catch((error)=>{console.log('error',error);setRefreshing(false);});
           
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
        
        {
            !timeSlots.length && <Text style={{color:'red', fontSize:28,backgroundColor:'yellow',padding:'5%', marginTop:'10%',alignSelf:'center'}}>No Bookings Yet!</Text>
        }
        
        <FlatList
        data ={timeSlots}
        renderItem={({item})=> <View style={{padding:'5%', borderColor:'black',  alignItems:'center'}}>
          
          
          <TouchableOpacity onLongPress={()=>{
            cancelAppointment(item._id);
          }} disabled={!dateDone(item.date)} style={{backgroundColor:dateDone(item.date)? '#f2333f':'blue', borderRadius:0, alignItems:'center', padding:'3%', width:'80%',shadowColor: '#f5553f',
          shadowOffset: { height: 2, width: 2 }, elevation:5,
          shadowOpacity: 0.3, 
          shadowRadius: 0.5, }}>
              
              <Text style={{fontSize:12, color:'white'}}>{item.date.substring(0,10)}</Text>
              <Text style={{fontSize:24, color:'white'}}>{item.startTime}</Text>
              <Text style={{fontSize:14, color:'white'}}>{item.bookedBy.name}</Text>
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