import {View,Text, TouchableOpacity,Linking} from 'react-native';
//import styles from '../../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';

//style={{alignContent:'center', justifyContent:'center',alignItems:'center'}}
export default function DoctorHome({navigation}){
    const [name,setName] = useState('');

    const setDetails=()=>{
        AsyncStorage.getItem('@user').then((user)=>{
            if(user != null){
                setName(JSON.parse(user).name)
            }
        })
    }
    
    useEffect(()=>{
        setDetails();
    },[])

    return(
        <View >
            <View style={{ backgroundColor:'#f2333f',  padding:20,paddingTop:60,justifyContent:'space-between',flexDirection:'row',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                
                    <View ><Text style={{fontSize:20,fontWeight:'600',color:'white'}}>Dr. {name} 👋</Text></View>
                    <View ><FontAwesome name='user-circle-o' size={35} color={'white'}/></View>

            </View>
            
            <View >
                    
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#e67e7e', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={ ()=>{ Linking.openURL('https://google.com')}}>
                            <Fontisto name='doctor' size={50} color={'white'}/>
                            <Text style={{fontSize:25,color:'white'}}>Patients</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#e67e7e', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}}>
                            <MaterialIcons name='schedule' size={50} color={'white'} />
                            <Text style={{fontSize:22,color:'white'}}>Appointments</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#e67e7e', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}} onPress={()=>{navigation.push('Reports')}} >
                            <Fontisto name='doctor' size={50} color={'white'}/>
                            <Text style={{fontSize:25,color:'white'}}>Reports</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'45%'}}>
                        <TouchableOpacity style={{backgroundColor:'#e67e7e', alignItems:'center',padding:'7%',marginTop:'10%', borderRadius:25}}>
                            <MaterialIcons name='schedule' size={50} color={'white'} />
                            <Text style={{fontSize:25,color:'white'}}>Diet Plans</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    

            </View>
            
        </View>
    )
}