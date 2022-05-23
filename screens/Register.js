import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, Alert, ScrollView} from 'react-native';
import {useState} from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import styles from'../styles';
import {ValidateEmail} from '../helpers'
import {API_URl} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Register({navigation}){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
  
    const savePatient =  () =>{
     

        var requestOptions= {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
              name:name,
              email:email,
              phone:phone,
              password:password,
            })};   
         
            console.log(requestOptions);
            fetch(API_URL+'/accounts/new',requestOptions)
            .then((response)=>{
              if(response.status == '304'){
                Alert.alert("Seems like there is an error. Kindly Try Again Later!");
              }
              else{
                return response.json();
              }
            })
            .then((result)=>{
              try{
                var user_data = JSON.stringify(result);
                AsyncStorage.setItem('@user',user_data).then(()=>{
                  navigation.navigate('PatientHome');
                })
                
              }
              catch(e){
                Alert.alert("Error storing user data to AsyncStorage!");
              }
              
            }).catch((error)=>console.log('error',error));

      };
  
    const handleSignUp = ()=>{
      if(email.length <= 0){
        Alert.alert('Invalid Email',"Please Fill in Email")
      }
      else if(!ValidateEmail(email)){
        Alert.alert('Invalid Email',"Email Entered Invalid")
      }
      else if(name.length <= 0){
        Alert.alert('Invalid Name', 'Please Provide Your Name')
      }
      else if(password.length <8){
        Alert.alert('Password Not Valid','Please Provide atleast 8 letters/digits password')
      }
      else if(password.length >16){
        Alert.alert('Password Not Valid','Please Provide maximum 16 letters/digits password')
      }
      else {
      savePatient();
      /*auth.createUserWithEmailAndPassword(email,password).then(userCredentials =>{
        const user = userCredentials.user;
        console.log(user.email);
      }).catch(error => Alert.alert(error.message));
      navigation.push('SignIn');*/
    }
    }
  
    return(<ScrollView>
      <View style={{alignContent:'center', alignItems:'center', marginTop:70, backgroundColor:'#ffd7d9', borderRadius:20, margin:20, padding:40}}>
          <View style={styles.inputView}>
            <Text style={styles.labelStyle}>Name</Text>
            <TextInput style={styles.textInputStyle} onChangeText={setName}/>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.labelStyle}>Phone</Text>
            <TextInput style={styles.textInputStyle} onChangeText={setPhone}/>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.labelStyle}>E-Mail</Text>
            <TextInput style={styles.textInputStyle} onChangeText={setEmail} />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.labelStyle}>Password</Text>
            <TextInput style={styles.textInputStyle} onChangeText={setPassword} secureTextEntry/>
          </View>
          <View style={{width:'110%',margin:20, alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{handleSignUp();}} style={styles.activeBtn}><Text style={{color:'#f2f2f2'}}>Submit</Text></TouchableOpacity>
          </View>
          
      </View>
      </ScrollView>
    )
  }