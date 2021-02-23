import React from 'react'

interface MessageProps {
    message: {
        message: string
    };
    pseudo: {
        pseudo: string
    }
}
 
const Message: React.FC<MessageProps> = ({message, pseudo}) => {

    const msg = message.message
    const pseud = pseudo.pseudo    
    
    return (<>
        <p className='user-message'>
        {pseud}:  {msg}
        </p>
    </>);
}
 
export default Message;