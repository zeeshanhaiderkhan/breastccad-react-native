import React, { useState } from 'react'
import { View,Text,Button,Alert, ScrollView, SafeAreaView, Modal, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';



var active="#f2333f";
var secondary ="#ffd7d9"
//doctor creating appointments

export default function Appointments(){
  const [date, setDate] = useState(new Date())
  const [mode,setMode] =useState('date');
  const [show,setShow] = useState(false);
  const [text,setText] = useState('Empty');
  
  const [startTime,setStartTime] = useState(new Date(0,0,0));
  const [endTime,setEndTime] = useState(new Date(0,0,0));
  const [slotTime,setSlotTime] = useState(15);

  const [startShow,setStartShow] = useState(false);
  const [endShow,setEndShow] = useState(false);

  const [timeSlots,setTimeSlots] = useState([])



  const onChange=(event, selectedDate)=>{
    const currentDate=selectedDate || date;
    setShow(Platform.OS ==='ios');
    setDate(currentDate);
  }

  const onChangeStart=(event,selectedDate)=>{
    const currentDate=selectedDate || date;
    setStartTime(currentDate)
    setStartShow(false);
  }

  const onChangeEnd=(event,selectedDate)=>{
    const currentDate=selectedDate || date;
    console.log(startTime.getHours() < currentDate.getHours())
    if(startTime.getHours() <= currentDate.getHours() || (startTime.getHours() == currentDate.getHours() && startTime.getMinutes()<currentDate.getMinutes())){
        setEndTime(currentDate)
    }
    else{
      Alert.alert('Select End Time greater then Start Time!');
    }

    
    setEndShow(false);
  }

  const showMode=(currentMode)=>{
    setShow(true);
    setMode(currentMode);
  }

 const showStartTime=()=>{
  setStartShow(true)
 }

 const showEndTime=()=>{
   setEndShow(true);


 }

 const createSlots=()=>{
  function parseTime(s) {
    var c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  function convertHours(mins){
    var hour = Math.floor(mins/60);
    var mins = mins%60;
    var converted = pad(hour, 2)+':'+pad(mins, 2);
    return converted;
  }

  function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  function calculate_time_slot(start_time, end_time, interval = "30"){
      var i, formatted_time;
    var time_slots = new Array();
      for(var i=start_time; i<=end_time; i = i+interval){
      formatted_time = convertHours(i);
      time_slots.push({startTime:formatted_time,date:date,slotTime:slotTime,did:'6262d51bfb40b3c1cbe56722'}); //need to change did
    }
    return time_slots;
  }

  var stTime = startTime.toLocaleTimeString();
  var enTime = endTime.toLocaleTimeString();

  var start_time = parseTime(stTime),
      end_time = parseTime(enTime),
      interval = slotTime;

  var times_ara = calculate_time_slot( start_time, end_time, interval );


    setTimeSlots(times_ara);
    
 }

 const saveSlots=()=>{
    //timeSlots
    //api/appointment/new

    var requestOptions= {
      method:'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      body:JSON.stringify({slots:timeSlots})};   
   
      console.log(requestOptions.body);
      fetch('http://192.168.100.12:3001/api/appointment/new',requestOptions).then((response)=>response.json()).then((result)=>console.log(result)).catch((error)=>console.log('error',error));
       }


 const [modalVisible, setModalVisible] = useState(false);

const style_touched={
  backgroundColor:'blue',
  padding:"5%",
  margin:'3%',
  borderRadius:20
}

const style_not_touched={
  backgroundColor:'#A1CAFF',
  padding:"5%",
  margin:'3%',
  borderRadius:20
}

const deleteSelectedElement = (key) => {
 
  Alert.alert(
    'Are You Sure Want To Delete Slot = ' + key,
    'Select Below Options',
    [
      { text: 'Cancel', onPress: () => { }, style: 'cancel' },
      {
        text: 'OK', onPress: () => {
          // Filter Data 
          const filteredData = timeSlots.filter(item => item.key !== key);
          //Updating List Data State with NEW Data.
          setTimeSlots(filteredData);
        }
      },
    ])
}

  return (<SafeAreaView>
       <ScrollView>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}

      

      >
        <View style={{alignItems:'center', justifyContent:'center',flex:1,flexDirection:'column', backgroundColor:'white'}}>
          <Text style={{fontSize:35}}>Select Slot Size</Text>
          <TouchableOpacity  style={slotTime==15 ? style_touched : style_not_touched} onPress={()=>{setModalVisible(false);setSlotTime(15)}}><Text style={{fontSize:30,color:'white'}}>15 minutes</Text></TouchableOpacity>
          <TouchableOpacity  style={slotTime==30 ? style_touched : style_not_touched} onPress={()=>{setModalVisible(false);setSlotTime(30)}} ><Text style={{fontSize:30,color:'white'}}>30 minutes</Text></TouchableOpacity>
          <TouchableOpacity  style={slotTime==60 ? style_touched : style_not_touched} onPress={()=>{setModalVisible(false);setSlotTime(60)}}><Text style={{fontSize:30,color:'white'}}>60 minutes</Text></TouchableOpacity>

        </View>
        
        </Modal>


        <View style={{margin:20, alignItems:'center'}}>
          <Text style={{fontSize:24}}>Select Date</Text>
          <View style={{ width:'50%',}}>
          <TouchableOpacity style={{backgroundColor:active, alignItems:'center', padding:'10%', borderRadius:20}} onPress={()=>showMode('date')}>
            <View><Text style={{fontSize:22}}>{date.toLocaleDateString()}</Text></View>
          </TouchableOpacity>
          </View>
        </View>

    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <View style={{margin:20, alignItems:'center'}}>
          <Text style={{fontSize:18}}>Start Time</Text>
          <View style={{ width:'100%',}}>
          <TouchableOpacity style={{backgroundColor:active, alignItems:'center', padding:'10%', borderRadius:20, }} onPress={()=>showStartTime()}>
            <View><Text style={{fontSize:22}}>{startTime.toLocaleTimeString().substring(0,5)}</Text></View>
          </TouchableOpacity>
          </View>
        </View>

        <View style={{margin:20, alignItems:'center'}}>
          <Text style={{fontSize:18}}>End Time</Text>
          <View style={{ width:'100%',}}>
          <TouchableOpacity style={{backgroundColor:active, alignItems:'center', padding:'10%', borderRadius:20}} onPress={()=>showEndTime()}>
            <View><Text style={{fontSize:22}}>{endTime.toLocaleTimeString().substring(0,5)}</Text></View>
          </TouchableOpacity>
          </View>
        </View>

        <View style={{margin:20, alignItems:'center'}}>
          <Text style={{fontSize:18}}>Start Time</Text>
            <View style={{ width:'100%',}}>
            <TouchableOpacity style={{backgroundColor:active, alignItems:'center', padding:'10%', borderRadius:20}} onPress={() => setModalVisible(!modalVisible)}>
              <View><Text style={{fontSize:22}}>{slotTime}m</Text></View>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <View>
        <Button title='create slots' onPress={createSlots}/>
        </View>
        <View>
        <Button title='Save Slots' onPress={saveSlots}/>
        </View>
      </View>

     
     <FlatList
      data ={timeSlots}
      renderItem={({item})=> <View style={{padding:'5%', borderColor:'black', borderWidth:1, alignItems:'center'}}>
        
        
        <TouchableOpacity onLongPress={()=>{
          deleteSelectedElement(item.startTime);
        }} style={{backgroundColor:'#332B3A', borderRadius:0, alignItems:'center', padding:'3%', width:'40%'}}>
          
            <Text style={{fontSize:12, color:'white'}}>{item.date.toLocaleDateString()}</Text>
            <Text style={{fontSize:20, color:'white'}}>{item.startTime}</Text>
            
        </TouchableOpacity>
      
    </View>}
      />
      


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

{startShow && (
            <DateTimePicker
            testID='startShow'
            value={startTime}
            mode='time'
            is24Hour={true}
            display='default'
            onChange={onChangeStart}
            minuteInterval={30}
        />
    )}

{endShow && (
            <DateTimePicker
            testID='endShow'
            value={endTime}
            mode='time'
            is24Hour={true}
            display='default'
            onChange={onChangeEnd}
            minuteInterval={30}
            
        />
    )}
</ScrollView>
    </SafeAreaView>)
}



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});