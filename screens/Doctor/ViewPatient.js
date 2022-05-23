import {View,ScrollView,Text, TouchableOpacity, RefreshControl} from 'react-native';
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto'
import API_URL from '../../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ViewPatient(){

    const [patients,setPatients] = useState([{name:'Zeeshan',email:'zeeshan@gmail',sex:'female',phone:'03070156758'}])
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
                    <Text style={{alignSelf:'center', color:'white', fontSize:18, fontWeight:'bold'}}>Patient</Text>
                </View>
                

        </View>


        <View style={{flexDirection:'row',paddingTop:'10%', justifyContent:'space-evenly', backgroundColor:'#f5553f',borderRadius:40,margin:'2%',paddingBottom:'10%'}}>
       
            <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>
                <View><Text style={{color:'white',fontSize:18}}>Name</Text></View>
                <View><Text style={{color:'white',fontSize:18}}>Email</Text></View>
                <View><Text style={{color:'white',fontSize:18}}>Sex</Text></View>
                <View><Text style={{color:'white',fontSize:18}}>Phone</Text></View>
            </View>
            <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>
                
                <View><Text style={{fontWeight:'bold',color:'white' ,fontSize:16}}>{patients[0].name}</Text></View>
                <View><Text style={{fontWeight:'bold',color:'white',fontSize:16}}>{patients[0].email}</Text></View>
                <View><Text style={{fontWeight:'bold',color:'white',fontSize:16}}>{patients[0].sex}</Text></View>
                <View><Text style={{fontWeight:'bold',color:'white',fontSize:16}}>{patients[0].phone}</Text></View>
            </View>
            
        </View>
        
        <View>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}}>
                            <MaterialIcons name='schedule' size={35} color={'white'}/>
                            <Text style={{fontSize:22,color:'white'}}>Appointments</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('BookedAppointments');}}>
                            <MaterialIcons name='assignment' size={35} color={'white'} />
                            <Text style={{fontSize:22,color:'white'}}>Reports</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}}>
                            <Fontisto name='prescription' size={35} color={'white'}/>
                            <Text style={{fontSize:22,color:'white'}}>Prescription</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('BookedAppointments');}}>
                            <MaterialIcons name='no-food' size={35} color={'white'} />
                            <Text style={{fontSize:22,color:'white'}}>Diet Plans</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}}>
                            <MaterialIcons name='chat' size={35} color={'white'}/>
                            <Text style={{fontSize:22,color:'white'}}>Chat</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        </View>
                    </View>
        </View>
        
    </ScrollView>)
}