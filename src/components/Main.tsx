import { Button, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PRIVAT_PAGE_ROUTE } from "../utils/consts";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useUserContext } from "..";
import { useCollectionData } from 'react-firebase-hooks/firestore';


export const Main: React.FC<MainPropsType> = ({onLogin}) => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const navigate = useNavigate()
  const {db} = useUserContext()
  const [values, loading, error, snapshot] = useCollectionData();
  // const myMessages = []
  // const otherMessages = []
  // if(messages.length > 0) {
  //   messages.array.forEach(message => {
      
  //   });
  // }

  useEffect (() => {
    getMessages()
  }, [])

  const getMessages = async() => {
    const messageRef = (collection(db, 'messages'))
    const messages = [] as MessageType[]
    const q = query(messageRef, orderBy('timestamp'))
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((doc) => {
      const { user, text , timestamp} = doc.data()
      const dataMessage = {
        id: doc.id,
        userName: user,
        text,
        timestamp, 
      }
      messages.push(dataMessage) 
      
    });
    setMessages(messages)
  
  }
  const enterForPrivat = () => {
    onLogin ? navigate(PRIVAT_PAGE_ROUTE)
            : navigate('/login')
  }
  

  return (
    <Container  style={{marginTop: '0.5vh', height: '92vh',  backgroundColor: '#cfe8fc' }}>
      <Grid container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            style={{height: '100%'}}
      >
        <Grid item >
          <MessagesColumn messages={messages} />
        </Grid>
        <Grid item >
          
        </Grid>
        
          <Button onClick={enterForPrivat}>
            ONLY FOR REGISTER USER 
          </Button>

      </Grid>
    </Container>
  )
}

const MessagesColumn: React.FC<MessagesColumnPropsType> = ({messages}) => {

 if (messages.length === 0){
  return <div> no messages </div>
 }
  return (
    <Container>
      { 
         messages.map((message) => {

          return <Grid container 
                    key={message.id}
                    direction={'column'}
                    style={{width: 200, margin: 10,
                       border: 'solid 1px blue', borderRadius: 3}}
                  >
                    <Grid item
                      style={{backgroundColor: 'gray', color: 'white', padding: 5,}}
                    >
                      {message.userName}
                    </Grid>
                    <Grid item
                      style={{ padding: 5,}}
                    >
                      {message.text}
                    </Grid>
                  </Grid>
        })
      }
    </Container>
  )
}

type MessagesColumnPropsType = {
  messages: MessageType[]
}
type MainPropsType =  {
  onLogin: boolean
}

type MessageType = {
  id: string
  userName: string
  text: string
  timestamp: any
}