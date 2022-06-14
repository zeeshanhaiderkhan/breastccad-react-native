import React, { useState, useCallback, useEffect, useLayoutEffect, useContext } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { saveMessage, chat_collection} from '../firebase';
import { getFirestore, collection,query, getDocs,addDoc, orderBy,onSnapshot,where } from 'firebase/firestore';
import { UserContext } from '../navigation/PatientNav';

export default function ChatDoctor() {
  const user = useContext(UserContext); //getting data
  const [messages, setMessages] = useState([]);
  const [userID,setUserID] = useState(user._id);
  const [userName,setUserName] = useState(user.name);
  const [to,setTo] = useState(user.assignedDoctor);



//where("user_id",'==',userID),where("to","==",to),
useLayoutEffect(()=>{
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