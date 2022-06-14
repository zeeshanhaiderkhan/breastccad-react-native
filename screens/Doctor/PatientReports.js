import {View,Text, FlatList,ScrollView,TouchableOpacity,Alert, RefreshControl} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState,useEffect,useContext} from "react";
import API_URL from '../../config';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { UserContext } from '../../navigation/PatientNav';
// <MaterialIcons style={{alignSelf:'center'}} name='pending-actions' size={25} color='white' /></View><View>
             
export default function PatientReports({route, navigation}){
    const [refreshing, setRefreshing] = useState(false);
    const[reports,setReports] = useState([])
    const user = useContext(UserContext);

    const getReports=()=>{
        setRefreshing(true);

        const pid =route.params.pid;
        //get('/all/:pid',
        var requestOptions= {
            method:'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            };   
         
            
            fetch(API_URL+'/report/all/'+pid,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);setReports(result);setRefreshing(false) }).catch((error)=>console.log('error',error));      
            console.log("here");
        }
    useEffect(()=>{
        getReports();

    },[])

    const deleteReport=(id,title)=>{
         
            Alert.alert(
                'Are You Sure Want To Delete Report : '+title+" ?",
                'Select Below Options',
                [
                  { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                  {
                    text: 'OK', onPress: () => {
                        var requestOptions= {
                            method:'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                              },
                          }
                        fetch(API_URL+'/report/'+id,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);
                          Alert.alert("Report Has Been Deleted!");
                          getReports();
                    }).catch((error)=>console.log('error',error));
                    }
                  },
                ])

         
    }

   

    return(<ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={()=>{getReports()}}
        />
      }>


        <View style={{marginTop:'2%', alignItems:'center'}}>
            
         <TouchableOpacity style={{backgroundColor:'red', padding:'4%', marginBottom:'5%'}} onPress={()=>{navigation.push('UploadReport')}}>
             <Text style={{fontSize:18, color:'white',fontWeight:'bold'}}>Upload</Text>
         </TouchableOpacity>

            { reports.length>0 ?
            <FlatList  style={{borderTopWidth:2}} data={reports} 
            renderItem={({item})=>
                <TouchableOpacity onPress={()=>{navigation.navigate('ViewPatientReport',{item,name:item.title.substring(0,10)})}} onLongPress={()=>{deleteReport(item._id,item.title)}} style={{alignItems:'center', backgroundColor:'red', padding:'5%', margin:'2%',paddingLeft:'20%',paddingRight:'20%',}}>
                <View><MaterialIcons style={{alignSelf:'center'}} name='assignment' size={25} color='white' /></View>
                <View><Text style={{color:'white',fontSize:12}}>Report</Text></View>
                <View><Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>{item.title.substring(0,10)}{item.title.length>10?"...":""}</Text></View>
                <View><Text style={{color:'white', fontSize:16}}>{item.uploadDate.substring(0,10)}</Text></View>
                <View><Text style={{color:'white',fontSize:14}}>{item.uploadDate.substring(11,16)}</Text></View>
            </TouchableOpacity>
            }
            />:
            <Text>Oops! No Reports Yet.. Maybe Try adding new</Text>
        }
        
        </View>
        </ScrollView>
    

        
    )
}