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
    const pseu = pseudo.pseudo
    console.log(message.message);
    
    return (<>
            <p className='user-message'>
              {pseu}:  {msg}
            </p>
    </>);
}
 
export default Message;