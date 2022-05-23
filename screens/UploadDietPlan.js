import * as DocumentPicker from 'expo-document-picker';
import { View,Button,Image,Text, TouchableOpacity, TextInput,Alert} from 'react-native';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import mime from "mime";


export default function UploadDietPlan(){
    const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

    const[fileUri,setFileUri] = useState();
    const[imgUri,setImgUri] = useState('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FBCcad-f9ceb449-baf2-473f-ae5a-578df5b5abb0/DocumentPicker/c5df43ed-8a2f-4374-820c-b874144f9e4f.jpg')
     

    const uploadFile=()=>{

        const pid = '628584ea2c684ed4cde9b135';
        const did= '628584ea2c684ed4cde9b135';


        const newImageUri =  "file:///" + fileUri.split("file:/").join("");
        console.log(newImageUri);
        const formData = new FormData();
        formData.append('file', {
        uri : newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
        });
           
        formData.append('title',title)
        formData.append('uploadedBy',did);

        var requestOptions={
            method:'post',
            headers: {
                'Content-Type': 'multipart/form-data'
              },
            body:formData    
        }


        fetch('http://192.168.100.12:3001/api/dietplan/'+pid,requestOptions).then((response)=>response.json()).then((result)=>{console.log(result);
    Alert.alert("Diet Plan Has Been Uploaded");
    }).catch((error)=>{console.log('error',error);Alert.alert("Error Uploading Diet Plan! Kindly Try again later!")});
        
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
                <Text style={{fontSize:25,alignSelf:'center'}}>Upload Diet Plan</Text>
                
            </View>
      
                <TouchableOpacity  style={{borderRadius:1,backgroundColor:fileSelected? "red":"blue", padding:'5%',width:'50%',margin:"5%"}} onPress={openDocumentFile}>
                    <Text style={{color:'white',alignSelf:'center',fontSize:20}}>{fileSelected? "Selected":"Not Selected"}</Text>
                    {
                        fileSelected && <Text style={{color:'white',fontSize:8,textAlign:'center'}}>{fileName}</Text>
                    }
                </TouchableOpacity>
            <View  style={{width:'50%'}}>
                <TextInput placeholder='Diet-Plan Title' maxLength={70} style={{borderWidth:1, padding:'3%'}} onChangeText={setTitle} />
            </View>
            
            <TouchableOpacity disabled={!fileSelected} style={{backgroundColor:fileSelected?"green":"lightgreen", padding:'5%',width:'30%',margin:"5%"}} onPress={uploadFile}>
                    <Text style={{color:'white',alignSelf:'center',fontSize:16}}>Upload</Text>
                   
                </TouchableOpacity>
       
        </View>

    )}
