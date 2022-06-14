
import {Text, View, Image, TouchableOpacity,TextInput, Alert, ScrollView} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from'../styles';
import {ValidateEmail} from '../helpers';
import {API_URL} from '../config';


export default function LogIn({navigation}){

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
  

  
    function handleLogin(){
      if(email.length <= 0){
        Alert.alert('Invalid Email',"Please Fill in Email")
      }
      else if(!ValidateEmail(email)){
        Alert.alert('Invalid Email',"Email Entered Invalid")
      }
      else if(password.length <8 || password.length >16){
        Alert.alert('Password Not Valid','Please Provide Valid Password')
      }
      else {
        var requestOptions= {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
              email:email,
              password:password,
            })};   
         
            console.log(requestOptions);//change api here
            fetch("http://192.168.43.131:3000/api"+'/accounts/auth',requestOptions)
            .then((response)=>{
              if(response.status == '304'){
                Alert.alert("Seems like there is an error. Kindly Try Again Later!");
              }
              else{
                return response.json();
                }
              }
              )
            .then((result)=>{
              try{
                
                var user_data = JSON.stringify(result.data);
                console.log(user_data);
                AsyncStorage.setItem('@user',user_data).then(()=>{
                  if(result.data.role=='patient'){
                    navigation.navigate('PatientHome');
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'PatientHome' }],
                    });
                  }
                  else if(result.data.role=='doctor'){
                    navigation.navigate('DoctorHome');
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'DoctorHome' }],
                    });
                  }
                  else {
                    console.log("This user maybe admin");
                  }
                 
                })
                
              }
              catch(e){
                Alert.alert("Error storing user data to AsyncStorage!");
              }
            
            })
            .catch((error)=>console.log('error',error));
     
     }}
  
    return(
      <ScrollView>
      <View style={{alignContent:'center', justifyContent:'center',alignItems:'center', marginTop:150, backgroundColor:'#ffd7d9', borderRadius:20, margin:20, padding:40}}>
          <View><Text style={{fontSize:30,fontWeight:'bold'}}>Login</Text></View>
        <View style={styles.inputView}>
            <Text style={styles.labelStyle}>E-Mail</Text>
            <TextInput onChangeText={setEmail} style={styles.textInputStyle}/>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.labelStyle}>Password</Text>
            <TextInput onChangeText={setPassword} style={styles.textInputStyle} secureTextEntry/>
          </View>
          <View style={{width:'110%',margin:20, alignItems:'center'}}>
                <TouchableOpacity onPress={handleLogin} style={styles.activeBtn}><Text style={{color:'#f2f2f2'}}>Log In</Text></TouchableOpacity>
          </View>
      </View>
      </ScrollView>
    )
  }
  