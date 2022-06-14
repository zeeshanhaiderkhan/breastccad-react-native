import { View,Text, TouchableOpacity, FlatList,Alert, ScrollView} from "react-native";
import {useState, useEffect,useContext} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import API_URL from "../config";
import { UserContext } from '../navigation/PatientNav';
var active="#f2333f";
var secondary ="#ffd7d9"

//appointments of patients booked
export default function BookAppointment({route,navigation}){
    const [date, setDate] = useState(new Date())
    const [mode,setMode] =useState('date');
    const [show,setShow] = useState(false);
    const [text,setText] = useState('Empty');
    
    const user = useContext(UserContext);

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


      var  requestOptions={
          method:'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        }
          
          var did = user.assignedDoctor;

          var y = currentDate.getFullYear().toString();
          var m = currentDate.getMonth()<10 ? "0"+(currentDate.getMonth()+1).toString() : currentDate.getMonth().toString();
          var d = currentDate.getDate()<10 ? "0"+(currentDate.getDate()+1).toString() : currentDate.getDate().toString();
          var temp_date = y+"-"+m+"-"+d;
          
        fetch(API_URL+'/appointment/getByDate/'+temp_date+'/'+did, requestOptions).then((response)=>response.json()).then((result)=>{setTimeSlots(result)}).catch((error)=>console.log('error',error));
        
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
          var  requestOptions={
                method:'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                  pid: user._id,
              })
              }
              console.log(route.params.pid);
    
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