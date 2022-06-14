import {View,Text, FlatList,ScrollView,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useState,useEffect} from "react";
import { WebView } from 'react-native-webview';
import API_URL from '../../config';

// <MaterialIcons style={{alignSelf:'center'}} name='pending-actions' size={25} color='white' /></View><View>
             
export default function ViewPatientReport({route,navigation}){
    
    const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

    const [report,setReport] = useState(route.params.item);

    const[reports,setReports] = useState([])
    const[download,setDownload]=useState(false);

    const getReport=()=>{
        //data from route to get of report
    }

    useEffect(()=>{
       
    },[])
//handle downloading of reports of img
    return(<ScrollView>
        <View style={{marginTop:'10%',padding:'10%',paddingTop:'20%',flexDirection:'row', justifyContent:'space-evenly'}}>
            <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>
                <View><Text>Report Title</Text></View>
                <View><Text>Uploaded By</Text></View>
                <View><Text>Upload Date</Text></View>
                <View><Text>Upload Time</Text></View>
            </View>
            <View style={{flexDirection:'column', justifyContent:'space-evenly'}}>
                
                <View><Text style={{fontWeight:'bold', }}>{report.title}</Text></View>
                <View><Text style={{fontWeight:'bold',}}>{report.uploadedBy}</Text></View>
                <View><Text style={{fontWeight:'bold',}}>{report.uploadDate.substring(0,10)}</Text></View>
                <View><Text style={{fontWeight:'bold',}}>{report.uploadDate.substring(11,16)}</Text></View>
            </View>
            
        </View>
        <View style={{alignItems:'center'}}>
                <TouchableOpacity disabled={download} style={{backgroundColor:!download?"green":"lightgreen", padding:'5%',width:'30%',margin:"5%"}} onPress={()=>{setDownload(true);}} >
                    <Text style={{color:'white',alignSelf:'center',fontSize:16}}>Download</Text>
                    
                </TouchableOpacity>
            </View>
            {download &&
                <PdfReader url={API_URL+"/report/"+report._id} />
            }
    </ScrollView>)
}