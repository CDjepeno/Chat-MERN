import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './App.css';
import './animations.css'
import Form from './pages/Form';
import Message from './component/Message';
import FirebaseService from './services/FirebaseAPI';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {io} from 'socket.io-client'


type Params = {
  pseudo: string;
}

type MessageType = {
  msg: {
    message: string,
    pseudo: string
  }
}


const Chat: React.FC<RouteComponentProps<Params>> = ({match}) => {
	const [input, setInput] = useState({message: "", pseudo: ""});
	const [messages, setMessages] = useState<any>([])
	const [length, setLength] = useState(140);
	const ENDPOINT = "http://localhost:8000"
	let pseudo: any;
	let Messages;
	let socketRef = useRef<any>()
	
	useEffect(() => {
		pseudo = match.params.pseudo
		socketRef.current = io(ENDPOINT)
		socketRef.current.emit("pseudo", pseudo)

		socketRef.current.on("message", (pseudo: any ,message: any) => {
			// console.log(message);
			
			setMessages([ ...messages, pseudo ])			
		})

		
		// socketRef.current.on('message', (message: any, pseudo:any) => {			
			// 	setMessages((messages: any) => [ ...messages, ...message ]);
			//   });

		return () => socketRef.current.disconnect()

	},[messages])

	

	const elementPosition = useRef<HTMLInputElement>(null);

	const handleChange = (e: any) => {
		const {value} = e.target; 
		const lengthR = 140 - value.length
		setLength(lengthR)
		
		setInput(value)
	}
  
	// const FetchMessages = async() => {
	// 	const data: any = await FirebaseService.getMessages();
	// 	setMessages(data)
	// }

	const createMessage = (message: string) => {
		
		const createM = {
			message: message,
			pseudo: pseudo
		}
		setMessages([...messages, {...createM}])
		// addMessage(createM)  
		// FirebaseService.postMessage(createM)
		setLength(140)
	}

	const handleSubmit = (e: any) => {
		// const {pseudo, message} = input
		pseudo = match.params.pseudo
		let message = input 
				
		socketRef.current.emit('message', {pseudo, message});
		e.preventDefault();
		setInput({message: "", pseudo})
	}
	
	// console.log(messages);
	

	const isUser = (pseudo: string) => {
		return pseudo === match.params.pseudo		
	}

	if(messages){
		Messages  = Object.keys(messages).map(key => {
			console.log(key);
			
			return (
				<CSSTransition 
					key={key}
					timeout={200} 
					classNames='fade'
				>
					<Message 
						isUser={isUser} 
						message={messages[key]} 
						pseudo={messages[key]} 
					/>
				</CSSTransition>
			)
		})
	}

	useEffect(() => {
		const ref = elementPosition.current;
		
		if(ref)
		ref.scrollTop = ref.scrollHeight;

	},[messages])

	// const renderChat = () => {
	// 	return messages.map(({pseudo, message}, index:any) => (
			
	// 			<div key={index}>
	// 				{/* <TransitionGroup className="message"> */}
	// 					{message}
	// 				{/* </TransitionGroup>					 */}
	// 			</div>
		
	// 	))
	// }
	
	
	return (<>
		<div className="box">
			<div className="messages" ref={elementPosition}>
			{/* {renderChat()} */}
				{Messages  && 
				<TransitionGroup className="message">
					{Messages}
				</TransitionGroup>
				}
			</div>
			
			<Form 
				handleSubmit={handleSubmit} 
				handleChange={handleChange}
				message={input.message} 
				length={length}
			/>
		</div>
	</>);
}

export default Chat;
