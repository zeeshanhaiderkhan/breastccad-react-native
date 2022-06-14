import {View,Text,TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import {Linking} from 'react-native'
import {useState,useEffect,useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../config';
//context
import { UserContext } from '../navigation/PatientNav';

var active="#f2333f";
var secondary ="#ffd7d9"

export default function YourDoctor({route,navigation}){
//<Fontisto size={100} name="doctor"  color={active}/>

    const[name,setName] = useState();
    const[phone,setPhone] = useState();
    const[email,setEmail] = useState();

    const user = useContext(UserContext)
    
    function getDoctor(){
        var requestOptions= {
            method:'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            };   
            //console.log(route.params.did);
            
            var did=  user.assignedDoctor ;
            
            
            fetch(API_URL+'/doctor/'+did,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);setName(result.name);setEmail(result.email);setPhone(result.phone);}).catch((error)=>console.log('error',error));      
           
    }
    useEffect(()=>{
        getDoctor();
    },[])


    return(<View style={{padding:'10%', backgroundColor:'pink',marginTop:'25%' , borderRadius:50,margin:'5%'}}>
        <View style={{alignItems:'center'}}><Fontisto name='male' color={active} size={100} /></View>
        <View style={{alignItems:'center'}}>
            <View><Text style={{fontSize:20,fontWeight:'bold',color:'#2f2f2f'}}>Dr. {name}</Text></View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={{padding:'5%', backgroundColor:'white', borderRadius:50, alignItems:'center', margin:'2%'}} onPress={ ()=>{Linking.openURL('mailto:'+email)}}><Fontisto size={25} name="email"  color={active}/></TouchableOpacity>
                <TouchableOpacity style={{padding:'5%', backgroundColor:'white', borderRadius:50, alignItems:'center',margin:'2%'}} onPress={ ()=>{Linking.openURL('tel:'+phone)}}><Fontisto size={25} name="phone"  color={active} /></TouchableOpacity>
                <TouchableOpacity style={{padding:'5%', backgroundColor:'white', borderRadius:50, alignItems:'center',margin:'2%'}} onPress={ ()=>{navigation.navigate('Chat')}}><Fontisto size={25} name="commenting"  color={active} /></TouchableOpacity>
               
            </View>
{/* 
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                <TouchableOpacity style={{padding:'5%', backgroundColor:'white', borderRadius:50, alignItems:'center', margin:'2%'}} onPress={ ()=>{Linking.openURL('mailto:support@gmail.com')}}><Fontisto size={20} name="email"  color={active}/></TouchableOpacity>
                <TouchableOpacity style={{padding:'5%', backgroundColor:'white', borderRadius:50, alignItems:'center',margin:'2%'}} onPress={ ()=>{Linking.openURL('tel:090078601')}}><Fontisto size={20} name="phone"  color={active} /></TouchableOpacity>
               
            </View>
            <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                <View style={{padding:'2%'}}><Text style={{fontWeight:'normal',fontSize:16}}>zeeshan@gmail.com</Text></View>
                <View style={{padding:'2%'}}><Text style={{fontWeight:'normal',fontSize:16}}>090078601</Text></View>
            </View>
            </View> */}

        </View>
    </View>)
}