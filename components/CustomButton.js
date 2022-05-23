import { TouchableOpacity,Text } from "react-native"

export default function CustomButton(props){
    return(
      <TouchableOpacity onPress={props.onPress} style={{padding:20, borderRadius:10,alignItems:'center',backgroundColor:props.color, width:'80%'}}>
        <Text style={{color:props.textColor,fontSize:16}}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
  