import React from 'react'

interface FormProps {
    message: any; 
    handleSubmit: any;
    handleChange: any
    length: number;
}
 
const Form: React.FC<FormProps> = ({message, handleChange, handleSubmit, length}) => {

    const handlekeyUp = (e: any) => {
        if(e.key === 'Enter')
        handleSubmit(e)
    }
    return ( 
        <form className='form' onSubmit={handleSubmit}>
            <textarea
                value={message}
                onChange={e => handleChange(e)} 
                required
                name="message"
                maxLength={140}
                onKeyUp={handlekeyUp}
            >
            </textarea>
            <div className='info '>{length}</div>
            <button type="submit">Envoyer !</button>
        </form>
     );
}
 
export default Form;