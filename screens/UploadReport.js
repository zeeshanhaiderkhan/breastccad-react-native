import * as DocumentPicker from 'expo-document-picker';
import { View,Button,Image,Text, TouchableOpacity, TextInput,Alert} from 'react-native';
import { WebView } from 'react-native-webview';

import * as FileSystem from 'expo-file-system';
import { useState,useContext } from 'react';
import client from '../api/client';
import mime from "mime";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import API_URL from '../config';
import { UserContext } from '../navigation/PatientNav';

export default function UploadReport({navigation}){
    const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />
    const user = useContext(UserContext);
    const[fileUri,setFileUri] = useState();
    
    const uploadFile=()=>{

        const pid = user._id;
        const did= user.assignedDoctor;
        

        const newImageUri =  "file:///" + fileUri.split("file:/").join("");
        console.log(newImageUri);
        const formData = new FormData();
        formData.append('file', {
        uri : newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
        });
           
        formData.append('title',title)
        formData.append('uploadedBy',user._id);

        var requestOptions={
            method:'post',
            headers: {
                'Content-Type': 'multipart/form-data'
              },
            body:formData    
        }


        fetch(API_URL+'/report/'+pid,requestOptions)
        .then((response)=>response.json())
        .then((result)=>{
            console.log(result);
            Alert.alert("Test Report Has Been Uploaded","",
            [
                {
                  text: 'OK', onPress: () => {
                      navigation.goBack();
                  }
                },
              ]
              );

    }).catch((error)=>{console.log('error',error);Alert.alert("Error Uploading Report! Kindly Try again later!")});
        
    }


//hook for if the file is selected to be uploaded
 const[fileSelected,setFileSelected] = useState(false);
const[fileName,setFileName] = useState('');
 //const img =require(FileSystem.documentDirectory+"6285fa9ca0ce94a163206c51.jpg");
  async function  openDocumentFile(){
            const r= await DocumentPicker.getDocumentAsync().then((res)=>{
                setFileUri(res.uri);
                
                if(res.type=='cancel'){
                    throw "DocumentPicker File not Selected";
                }
                setFileSelected(true);
                setFileName(res.name);
                console.log(
                    res.uri,
                    res.type,
                    res.name,
                    res.size
                );
            }).catch((err)=>{console.log(err);setFileSelected(false)});
            
        
    }

    const[title,setTitle] =useState();
    return(
        <View style={{padding:'5%',marginTop:'5%', alignItems:'center'}}>
            <View>
                <Text style={{fontSize:25,alignSelf:'center'}}>Upload Report</Text>
                
            </View>
      
                <TouchableOpacity  style={{borderRadius:1,backgroundColor:fileSelected? "red":"blue", padding:'5%',width:'50%',margin:"5%"}} onPress={openDocumentFile}>
                    <Text style={{color:'white',alignSelf:'center',fontSize:20}}>{fileSelected? "Selected":"Not Selected"}</Text>
                    {
                        fileSelected && <Text style={{color:'white',fontSize:8,textAlign:'center'}}>{fileName}</Text>
                    }
                </TouchableOpacity>
            <View  style={{width:'50%'}}>
                <TextInput placeholder='Report Title' maxLength={70} style={{borderWidth:1, padding:'3%'}} onChangeText={setTitle} />
            </View>
            
            <TouchableOpacity disabled={!fileSelected} style={{backgroundColor:fileSelected?"green":"lightgreen", padding:'5%',width:'30%',margin:"5%"}} onPress={uploadFile}>
                    <Text style={{color:'white',alignSelf:'center',fontSize:16}}>Upload</Text>
                   
                </TouchableOpacity>
       
        </View>

    )}





