import {View,ScrollView,Text, TouchableOpacity} from 'react-native';
import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto'
import API_URL from '../../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ViewPatient({route,navigation}){

   const [patients,setPatients] = useState([route.params.patient])
   

    return(
    <ScrollView  >
        


        <View style={{ backgroundColor:'#f5553f',borderRadius:40,margin:'2%',paddingBottom:'10%',paddingTop:'10%',shadowColor: '#f5553f',
    shadowOffset: { height: 1, width: 1 }, elevation:5,
    shadowOpacity: 1, 
    shadowRadius: 1, }}>

            <Fontisto  style={{alignSelf:'center'}} name={patients[0].sex=='male'? 'male':'female'} size={100} color='white' />

            <View style={{flexDirection:'row',paddingTop:'2%', justifyContent:'space-evenly',}}>
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
        </View>
        
        <View>
        <View style={{flexDirection:'row', justifyContent:'space-around',}}>
                    <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>navigation.navigate('PatientAppointments',{pid:patients[0]._id,name:patients[0].name})}>
                            <MaterialIcons name='schedule' size={35} color={'white'}/>
                            <Text style={{fontSize:22,color:'white'}}>Appointments</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('PatientReports',{pid:patients[0]._id,name:'Reports'});}}>
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

                    <View style={{flexDirection:'row', justifyContent:'space-around',paddingBottom:'10%'}}>
                    <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('ChatPatient',{to:patients[0]._id});}}>
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