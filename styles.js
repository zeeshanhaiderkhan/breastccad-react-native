import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
    
      
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    textStyle:{
      color:'white',
      fontFamily:'Visby CF Bold',
    },
    appTitle:{
      fontSize:24,
      //fontFamily:'serif',
    },
    textInputStyle:{
      borderRadius:5,
      borderWidth:1,
      borderColor:'#f2333f',
      width:250,
      fontSize:16,
      backgroundColor:'white',
      padding:5,
    },
    labelStyle:{
      fontSize:14,
      fontWeight:'800'
    },
    inputView:{
      marginTop:20
    },
    //styled on touchableopacity
    activeBtn:{
      width:'80%',
      backgroundColor:'#f2333f',
      padding:10,
      borderRadius:10,
      alignItems:'center'
    }
  });
  

export default styles;