import React from 'react'

interface MessageProps {
    message: {
        message: string 
    };
    pseudo: {
        pseudo: string
    }
    isUser: any;
}
 
const Message: React.FC<MessageProps> = ({message, pseudo, isUser}) => {

    const msg = message.message
    const pseud = pseudo.pseudo    

        return (<>
            {isUser(pseud) ?
                <p className='user-message'>
                    <strong>{pseud} :</strong>  {msg}
                </p>
            :
                <p className='not-user-message'>
                    <strong>{pseud} :</strong>  {msg}
                </p>
            }
        </>)
}
 
export default Message;