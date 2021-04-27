import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './App.css';
import './animations.css'
import Form from '../component/Form';
import Message from '../component/Message';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {io} from 'socket.io-client'


type Params = {
  pseudo: string;
}

const Chat: React.FC<RouteComponentProps<Params>> = ({match}) => {
	const [input, setInput] = useState({message: "", pseudo: ""});
	const [messages, setMessages] = useState<any>([])
	const [length, setLength] = useState(140);
	const ENDPOINT = "http://localhost:8000"
	const elementPosition = useRef<HTMLInputElement>(null);
	let pseudo: string;
	let Messages;
	let socketRef = useRef<any>()
	
	useEffect(() => {
		pseudo = match.params.pseudo
		socketRef.current = io(ENDPOINT)
		socketRef.current.emit("pseudo", pseudo)

		socketRef.current.on("message", (message: string) => {
			console.log(message);
			
			setMessages([ ...messages, message ])			
		})

		const ref = elementPosition.current;
		
		if(ref)
		ref.scrollTop = ref.scrollHeight;

		return () => socketRef.current.disconnect()

	},[messages])


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

	const handleSubmit = (e: any) => {
		pseudo = match.params.pseudo
		let message = input 
				
		socketRef.current.emit('message', {pseudo, message});
		e.preventDefault();
		setInput({message: "", pseudo})
	}	

	const isUser = (pseudo: string) => {
		return pseudo === match.params.pseudo		
	}

	if(messages){
		Messages  = Object.keys(messages).map(key => {			
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

	return (<>
		<div className="box">
			<div className="messages" ref={elementPosition}>
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
