import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './App.css';
import Form from './component/Form';
import Message from './component/Message';
// firebase
import base from './firebase'
import FirebaseService from './services/FirebaseAPI';
import firebase from 'firebase/app';

type Params = {
  pseudo: string;
}

export interface MessageType {
  msg: {
    message: string
    pseudo: string
  }
}


const App: React.FC<RouteComponentProps<Params>> = ({match}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])
  const [length, setLength] = useState(140)
  const Messages  = Object.keys(messages)

  const createMessage = () => {
    const pseudo = match.params.pseudo;
    const createM = {
      message: message,
      pseudo: pseudo
    }

    FirebaseService.addMessage(createM)
    addMessage(createM)  
    setMessage(" ")
    setLength(140)
  }
  
  const addMessage = (Message: any) => {
    const msg: any = {...messages};

    msg[`message-${Date.now()}`] = Message

    setMessages(msg)
  }

  const handleChange = (e: any) => {
    const {value} = e.target; 
    const lengthR = 140 - value.length
    setLength(lengthR)
    setMessage(value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setMessage(message);
    createMessage();
  }
  
  
  const FetchMessages = async() => {
    const data: any = await FirebaseService.getMessages();
    
    setMessages(data)
    
  }
  
  useEffect(() => {
    FetchMessages();
    createMessage();
  },[])
  
 

  return (
    <div className="box">
      <div>
        <div className="messages">
          {messages  && 
          <>
           {Messages.map((key: any) => {    
              return(
                <div className="message">
                  <Message key={key} message={messages[key]} pseudo={messages[key]} />
                </div>
              )
            })
          } 
          </> 
          }
        </div>
      </div>
      <Form 
        handleSubmit={handleSubmit} 
        handleChange={handleChange}
        message={message} 
        length={length}
      />
      <h2>Bonjour {match.params.pseudo}</h2>
    </div>
  );
}

export default App;
