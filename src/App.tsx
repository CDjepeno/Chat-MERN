import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './App.css';
import Form from './component/Form';
import Message from './component/Message';

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

  const createMessage = () => {
    const pseudo = match.params.pseudo;

    const createM = {
      message: message,
      pseudo: pseudo
    }

    addMessage(createM)  
    setMessage(" ")
    setLength(140)
  }
  // console.log(messages);
  
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
  

  return (
    <div className="box">
      <div>
        <div className="messages">
          {messages  && 
          <>
            <Message messages={messages}/>
            <Message messages={messages}/>
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
