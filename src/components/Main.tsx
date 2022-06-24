import { Button, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PRIVAT_PAGE_ROUTE } from "../utils/consts";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useUserContext } from "..";
import ClearIcon from '@material-ui/icons/Clear';
import { doc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";



export const Main: React.FC<MainPropsType> = ({onLogin}) => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const navigate = useNavigate()
  const {auth, db} = useUserContext()
  const [user] = useAuthState(auth)
  
  
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
    user ? navigate(PRIVAT_PAGE_ROUTE)
            : navigate('/login')
  }
  

  return (
    <Container  style={{marginTop: '0.5vh', minHeight: '92vh',  backgroundColor: '#cfe8fc' }}>
      <Grid container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            style={{height: '100%'}}
      >
        <Grid item style={{width: '100%'}}>
          <MessagesColumn messages={messages} getMessages={getMessages}/>
        </Grid>
       
        <Grid item 
              style={{border: 'solid 1px lightblue', borderRadius: 3,}}
        >
          <Button onClick={enterForPrivat}>
            ONLY FOR REGISTER USER 
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

const MessagesColumn: React.FC<MessagesColumnPropsType> = ({messages, getMessages}) => {
  const {auth, db} = useUserContext()
  const [user] = useAuthState(auth)
  
  const deleteMessage = async(id: string) => {
    
    await deleteDoc(doc(db, 'messages', id));
    getMessages()
   
  }
 if (messages.length === 0){
  return <div> no messages </div>
 }
  return (
    <Container style={{display: 'flex', flexDirection: 'column'}}>
      { 
         messages.map((message) => {
          const userPrivat = user && user.displayName === message.userName
          const justify = userPrivat?'flex-end':'flex-start'
          return <Grid container 
                    key={message.id}
                    alignItems= {justify}
                    direction={'column'}
                    
                  >
                    < Grid container 
                      direction={'column'}
                      style={{width: 200, margin: 10,
                              border: 'solid 1px blue', borderRadius: 3,
                     
                      }}
                    >
                    <Grid container
                          item xs={12}
                          justifyContent={'space-between'}
                          style={{minHeight: 40, backgroundColor: 'gray',
                            color: 'white', padding: 5,}}
                    >
                      <Grid item >
                        {message.userName}
                      </Grid>
                      <Grid item >
                       
                         { userPrivat && <ClearIcon style={{cursor: 'pointer', color: 'darkred'}}
                                    onClick={()=> deleteMessage(message.id)}/>
                    }
                      </Grid>
                      
                    </Grid>
                    <Grid item xs={12}
                      style={{minHeight: 60, padding: 5, backgroundColor: 'white'}}
                    >
                      {message.text}

                    </Grid>
                    </Grid>
                  </Grid>
        })
      }
    </Container>
  )
}

type MessagesColumnPropsType = {
  messages: MessageType[]
  getMessages: () => void
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