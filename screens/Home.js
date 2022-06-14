import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
import styles from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';

//style={{alignContent:'center', justifyContent:'center',alignItems:'center'}}
export default function Home({navigation}){
    const [name,setName] = useState('');
    const [role,setRole] = useState('');
    const [did,setDid] = useState('');
    const setDetails=()=>{
        AsyncStorage.getItem('@user').then((user)=>{
            if(user != null){
                setName(JSON.parse(user).name);
                setRole(JSON.parse(user).role);
                setDid(JSON.parse(user).assignedDoctor);
            }
        })
    }
    useEffect(()=>{
        setDetails();
    },[])

    return(
        <ScrollView  >
            <View style={{paddingBottom:'10%'}}>
            <View style={{ backgroundColor:'#f2333f',  padding:20,paddingTop:60,justifyContent:'space-between',flexDirection:'row',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                
                    <View >
                        <View><Text style={{fontSize:20,fontWeight:'600',color:'white'}}>{name} 👋</Text></View>
                        <View><Text style={{fontSize:12,fontWeight:'600',color:'white'}}>{role.charAt(0).toUpperCase()+role.slice(1)} </Text></View>
                    </View>
                    <View ><TouchableOpacity onPress={()=>{navigation.openDrawer();}}><FontAwesome name='user-circle-o' size={35} color={'white'}/></TouchableOpacity></View>

            </View>
            
            <View style={{paddingTop:'5%'}} >
                    
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('YourDoctor',{did})}}>
                            <Fontisto name='doctor' size={50} color={'white'}/>
                            <Text style={{fontSize:25,color:'white'}}>Your Doctor</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('Prescription');}}>
                            <MaterialIcons name='schedule' size={50} color={'white'} />
                            <Text style={{fontSize:22,color:'white'}}>Prescription</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('Reports')}} >
                            <Fontisto name='doctor' size={50} color={'white'}/>
                            <Text style={{fontSize:25,color:'white'}}>Diet Plans</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}}>
                            <MaterialIcons name='chat-bubble' size={50} color={'white'} />
                            <Text style={{fontSize:25,color:'white'}}>Chatbot</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#f2333f', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('Reports')}} >
                            <MaterialIcons name='feedback' size={50} color={'white'}/>
                            <Text style={{fontSize:25,color:'white'}}>Feedback</Text>
                        </TouchableOpacity>
                        </View>
                     {/*  <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#e67e7e', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}}>
                            <MaterialIcons name='chat-bubble' size={50} color={'white'} />
                            <Text style={{fontSize:25,color:'white'}}>Chatbot</Text>
                        </TouchableOpacity>
                        </View> */}
                    </View>

                    
                    

            </View>
            </View>
        </ScrollView>
    )
}