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

import { View,Text, TouchableOpacity, FlatList,Alert, ScrollView} from "react-native";
import {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import API_URL from "../config";

var active="#f2333f";
var secondary ="#ffd7d9"

//appointments of patients booked
export default function BookAppointment({navigation}){
    const [date, setDate] = useState(new Date())
    const [mode,setMode] =useState('date');
    const [show,setShow] = useState(false);
    const [text,setText] = useState('Empty');
    

    const [timeSlots,setTimeSlots] = useState([])


  useEffect(()=>{
    onChange({},new Date());
  },[])

    const showMode=(currentMode)=>{
        setShow(true);
        setMode(currentMode);
      }

      const onChange=(event, selectedDate)=>{
        const currentDate=selectedDate || date;
        setShow(Platform.OS ==='ios');
        setDate(currentDate);


        requestOptions={
            method:'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          }
          
          var did = '6262d51bfb40b3c1cbe56722';
          var y = currentDate.getFullYear().toString();
          var m = currentDate.getMonth()<10 ? "0"+(currentDate.getMonth()+1).toString() : currentDate.getMonth().toString();
          var d = currentDate.getDate()<10 ? "0"+(currentDate.getDate()+1).toString() : currentDate.getDate().toString();
          var temp_date = y+"-"+m+"-"+d;
          
        fetch(API_URL+'/appointment/getByDate/'+temp_date+'/'+did,requestOptions).then((response)=>response.json()).then((result)=>{setTimeSlots(result)}).catch((error)=>console.log('error',error));
        
      }

      const bookAppointment=(id,time,date,slot)=>{
        //router.put('/book/:aid',book_appointment);
        console.log(id);
        
    Alert.alert(
        `Are You Sure Want To Book Slot = \n${time.substring(0,10)}\n${date}\n${slot}` ,
        'Select Below Options',
        [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
            text: 'OK', onPress: () => {
            requestOptions={
                method:'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body:{
                    pid:'6282ce6e06d6687def1945f1'
                }
              }
              
    
            fetch(API_URL+'/appointment/book/'+id,requestOptions).then((response)=>response.json()).then((result)=>{
                Alert.alert('Your Booking has been Done!\nKindly be on time',"",[
                  {text:'OK',onPress: ()=>{
                    navigation.goBack();
                  }}
                ]);
                
            }).catch((error)=>console.log('error',error));
    
        }}
        ])
        
      }

const active_touchable_style={backgroundColor:'blue', borderRadius:0, alignItems:'center', padding:'3%', width:'40%'};
var disabled_touchable_style = {backgroundColor:'#332B3A', borderRadius:0, alignItems:'center', padding:'3%', width:'40%'};
    

    return(<View style={{paddingBottom:'10%'}}>
        <View style={{margin:20, alignItems:'center',}}>
          <Text style={{fontSize:24}}>Select Date</Text>
          <View style={{ width:'50%',}}>
          <TouchableOpacity style={{backgroundColor:active, alignItems:'center', padding:'10%', borderRadius:20}} onPress={()=>showMode('date')}>
            <View><Text style={{fontSize:22}}>{date.toLocaleDateString()}</Text></View>
          </TouchableOpacity>
          </View>
        </View>
        {
          !timeSlots.length && <View style={{alignItems:'center'}}><Text style={{fontSize:20}}>No Slots Available Yet</Text></View>
        }

        <ScrollView style={{borderWidth:2}}>
        {
             timeSlots.map((item)=>
             <View style={{padding:'5%', alignItems:'center'}}>
             <TouchableOpacity onPress={()=>{
             //book appointment
                 bookAppointment(item._id,item.startTime,item.date,item.slotTime);
             }} disabled={item.booked} style={item.booked?disabled_touchable_style:active_touchable_style}>
                 
                 <Text style={{fontSize:12, color:'white'}}>{item.date.substring(0,10)}</Text>
                 <Text style={{fontSize:20, color:'white'}}>{item.startTime}</Text>
                 <Text style={{fontSize:10, color:'white'}}>{!item.booked ? "Available" : "Booked"}</Text> 
                 
             </TouchableOpacity>
           
           </View> 
             )
        }
        </ScrollView>


        {/*<FlatList
      data ={timeSlots}
      renderItem={({item})=> <View style={{padding:'5%', borderColor:'black', borderWidth:1, alignItems:'center'}}>
        
        
        <TouchableOpacity onPress={()=>{
        //book appointment
            bookAppointment(item._id,item.startTime,item.date,item.slotTime);
        }} disabled={item.booked} style={item.booked?disabled_touchable_style:active_touchable_style}>
            
            <Text style={{fontSize:12, color:'white'}}>{item.date.substring(0,10)}</Text>
            <Text style={{fontSize:20, color:'white'}}>{item.startTime}</Text>
            
        </TouchableOpacity>
      
      </View>} />*/}

        {show && (
            <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
            minimumDate={new Date()}
        />
    )}

    </View>)
}