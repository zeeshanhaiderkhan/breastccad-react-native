import {View,ScrollView,Text, TouchableOpacity, RefreshControl,TextInput} from 'react-native';
import {useState,useEffect,useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto'
import API_URL from '../../config';
import { UserContext } from '../../navigation/PatientNav';

export default function Patients({navigation}){

   const [patients,setPatients] = useState([])
   const[refreshing,setRefreshing] = useState(false);
   const user = useContext(UserContext);
   const [patientsBackUp,setPatientsBackUp] = useState();
   const[searchText,setSearchText] = useState('');

    const search=(text)=>{
        if(text.length==0){
            setPatients(patientsBackUp)
        }
        else{
            
            setPatients(patientsBackUp.filter(patient=>patient.name.toLowerCase().includes(text.toLowerCase())));
        }
        
    }

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
        const did=user._id;
        fetch(API_URL+'/doctor/patients/'+did,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);setPatients(result.reverse());setPatientsBackUp(patients);setRefreshing(false);}).catch((error)=>console.log('error',error));
           
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

        <TextInput onChangeText={(text)=>{
            search(text);
        }} placeholder="Search Patient" style={{borderWidth:2,padding:'2%',margin:'10%',marginTop:'5%',marginBottom:'0%',borderColor:'#F57078', textAlign:'center',backgroundColor:'#F57078',borderRadius:20,color:'white',fontSize:16}} placeholderTextColor='red'/>

        <View style={{padding:'10%',paddingTop:'5%'}}>
        
 
        {!patients.length?<Text style={{color:'red', fontSize:28,backgroundColor:'yellow',padding:'5%', marginTop:'10%',alignSelf:'center'}}>No Patients</Text>

        : patients.map((patient)=>
            <TouchableOpacity style={{backgroundColor:'#f2333f', padding:'8%', borderRadius:50, marginBottom:'5%',shadowColor: '#f5553f',
            shadowOffset: { height: 1, width: 2 }, elevation:5,
            shadowOpacity: 0.5, 
            shadowRadius: 1, }} onPress={()=>{navigation.push('ViewPatient',{patient:patient,name:patient.name})}}>
             <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={{alignSelf:'center'}}><Fontisto style={{alignSelf:'center'}} name={user.sex=='male'? 'male':'female'} size={35} color='white' /></View>
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