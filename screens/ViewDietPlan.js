import {View,Text, FlatList,ScrollView,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState,useEffect} from "react";
import { WebView } from 'react-native-webview';


// <MaterialIcons style={{alignSelf:'center'}} name='pending-actions' size={25} color='white' /></View><View>
             
export default function ViewDietPlan(){
    
    const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

    const[reports,setReports] = useState([])
    const[download,setDownload]=useState(false);

    const getReport=()=>{
        //data from route to get of report
    }
    useEffect(()=>{
       
    },[])

    return(<ScrollView>
        <View style={{marginTop:'10%',padding:'10%',paddingTop:'20%',flexDirection:'row', justifyContent:'space-evenly'}}>
            <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>
                <View><Text>Diet Plan Title</Text></View>
                <View><Text>Uploaded By</Text></View>
                <View><Text>Upload Date</Text></View>
                <View><Text>Upload Time</Text></View>
            </View>
            <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>
                
                <View><Text style={{fontWeight:'bold', }}>Mammogram</Text></View>
                <View><Text style={{fontWeight:'bold',}}>Dr. Zeeshan Haider Khan</Text></View>
                <View><Text style={{fontWeight:'bold',}}>20-05-2000</Text></View>
                <View><Text style={{fontWeight:'bold',}}>07:26</Text></View>
            </View>
            
        </View>
        <View style={{alignItems:'center'}}>
                <TouchableOpacity disabled={download} style={{backgroundColor:!download?"green":"lightgreen", padding:'5%',width:'30%',margin:"5%"}} onPress={()=>{setDownload(true);}} >
                    <Text style={{color:'white',alignSelf:'center',fontSize:16}}>Download</Text>
                    
                </TouchableOpacity>
            </View>
            {download &&
                <PdfReader url="http://192.168.100.12:3001/api/dietplan/62869f93e5424bb5cb0e3940" />
            }
    </ScrollView>)
}