import React from 'react'


export interface NotFoundProps {
    
}
 
const NotFound: React.FC<NotFoundProps> = () => {
    return ( 
        <h2 className="notFound">Y'a rien ici!</h2>
     );
}
 
export default NotFound;