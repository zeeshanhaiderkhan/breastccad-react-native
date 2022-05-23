import {View,ScrollView,Text, TouchableOpacity, RefreshControl} from 'react-native';
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto'
import API_URL from '../../config';

export default function Patients(){

    const [patients,setPatients] = useState([])
   const[refreshing,setRefreshing] = useState(false);
    
    const getPatients=()=>{
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
        const did='628981d9518bca1a34eb1f33'
        fetch(API_URL+'/doctor/getpatients/'+did,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);setPatients(result.reverse());setRefreshing(false);}).catch((error)=>console.log('error',error));
           
        }
        useEffect(()=>{
            getPatients();
        },[])

    return(
    <ScrollView 
    refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={()=>{getPatients()}}
        />}
    >
        <View style={{ backgroundColor:'#f2333f', padding:'5%',paddingTop:'10%', justifyContent:'space-between'}}>
                
                <View style={{alignItems:'center'}} >
                    <Text style={{alignSelf:'center', color:'white', fontSize:18, fontWeight:'bold'}}>Patients</Text>
                </View>
                

        </View>
        <View style={{padding:'10%'}}>

        {!patients.length?<Text style={{color:'red', fontSize:28,backgroundColor:'yellow',padding:'5%', marginTop:'10%',alignSelf:'center'}}>No Patients Assigned Yet!</Text>

        : patients.map((patient)=>
            <TouchableOpacity style={{backgroundColor:'red', padding:'8%', borderRadius:50, marginBottom:'5%'}}>
             <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={{alignSelf:'center'}}><Fontisto style={{alignSelf:'center'}} name='female' size={25} color='white' /></View>
                <View>
                    <View><Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>{patient.name}</Text></View>
                    <View><Text style={{fontSize:16,color:'white'}}>{patient.phone}</Text></View>
                </View>
             </View>
        </TouchableOpacity>
            )
        }
        </View>
    </ScrollView>)
}