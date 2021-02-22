import React from 'react'
import { MessageType } from '../App';

interface MessageProps {
    messages: any
}
 
const Message: React.FC<MessageProps> = ({messages}) => {
    // console.log(messages);
    // if(messages) {
    //     messages.map((m:any) => {
    //         console.log(m);
    //     })
    // }
    
    return (<>
        {/* {messages.map((m: any) => { */}
            <p className='user-message'>
                {/* {m.pseudo} */}
            </p>
        {/* })} */}
        
        
    </>);
}
 
export default Message;