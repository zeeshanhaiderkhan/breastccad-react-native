import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { saveMessage, chat_collection} from '../../firebase';
import { getFirestore, collection,query, getDocs,addDoc, orderBy,onSnapshot,where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userID,setUserID] = useState('');
  const [userName,setUserName] = useState('');
  const [to,setTo] = useState('');
  
//var from  = '628981d9518bca1a34eb1f33';
//var to  = '62897d5e518bca1a34eb1f17';


const setID=()=>{
    AsyncStorage.getItem('@user').then((user)=>{
        user = JSON.parse(user);
        console.log(user._id);
        //for testing
        if(user.role=='patient'){
            setUserID('6289985c518bca1a34eb1f6a')
            setUserName('Zeeshan Haider Khan')
            setTo('6289afb0518bca1a34eb2031')
        }
        if(user.role=='doctor'){
            setUserID('6289afb0518bca1a34eb2031')
            setUserName('Taha Rashid')
            setTo('6289985c518bca1a34eb1f6a')
        }
    }).catch((err)=>{console.log("error getting values from async storage")})
}

useEffect(()=>{
    setID();
},[])
//where("user_id",'==',userID),where("to","==",to),
useLayoutEffect(()=>{
    setID();
    try{
    const unsubscribe =onSnapshot(query(chat_collection,orderBy('createdAt','desc')),snapshot=>{
        var new_docs = snapshot.docs.filter((d)=> (d.data().user_id===userID && d.data().to === to) || (d.data().user_id===to && d.data().to === userID) ); //query 
        setMessages(
            new_docs.map(doc=>({
                _id:doc.data()._id,
                createdAt:doc.data().createdAt.toDate(),
                text:doc.data().text,
                user:{_id:doc.data().user_id,name:doc.data().user_name}
            }))
        )
    })
    return unsubscribe;
}catch(err){
    console.log('unable to load data from firebase kindly wait')
}
},[])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const {
        _id,
        createdAt,
        text,
        user
    } = messages[0]
    console.log('hereerer')
    saveMessage({
        _id,
        createdAt,
        text,
        user_id:userID,
        user_name:userName,
        to:to
    });
  }, [])

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
      }}

      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
                left: {
                  backgroundColor: 'lightgrey',
                },
              }}
      
          />
        );
      }}

    />
  )
}