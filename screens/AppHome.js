import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
//importing custom component
import CustomButton from '../components/CustomButton';

var active="#f2333f";
var secondary ="#ffd7d9"
var img1 = require('../assets/images/s1.jpg');
var img2=require('../assets/images/s2.jpg');
var img3 = require('../assets/images/s3.jpg');


export default function AppHome({navigation}) {
    let imageSource=img1;
    
  
  
  
    
    //const[imageSource,setImageSource] = useState(img1);
    return (
      
      <View style={styles.container}>
          <Image source={imageSource} style={{width:'100%',height:'60%',resizeMode:'contain',opacity:0.7,overlayColor:'#f2333f',borderRadius:20}}/>
          
          
  
          <Text style={[styles.appTitle,{fontWeight:'100',fontSize:26, borderBottomColor:active,borderBottomWidth:5,paddingBottom:5}]}>Breast Cancer <Text style={{color:active,fontWeight:'bold'}}>CAD Tool</Text></Text>
  
          <CustomButton onPress={()=> navigation.push('Register')} color='#f2333f' textColor="#ffd7d9" text="Create an account" />
       
          <CustomButton onPress={()=> navigation.push('Login')} color='#ffd7d9' textColor="#2f2f2f" text="Login" />
          <TouchableOpacity onPress={()=> navigation.push('ForgotPassword')}><Text style={{fontSize:14}}>Forgot Password?</Text></TouchableOpacity>
       </View>
       
       
    );
  }




