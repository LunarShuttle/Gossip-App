import React,{useState,useEffect,useContext} from 'react'
import { User } from './App'


function ChatItem(props) {
    const context = useContext(User)
    const [client, setClient] = useState()
    useEffect(() => {
        if((props.sender === context.uid) && (props.receiver === props.client.id) ){
            setClient('mr-3 ml-5 my-2 px-3  py-3 ')
        }
        else if( (props.sender === props.client.id) && (props.receiver === context.uid) ){
            setClient('mr-5 ml-3 my-2 px-3  py-3 ')
        }
        else{
            setClient('d-none')
        }
    }, [props.sender,context.uid,props.receiver,props.client.id])
    return (
        <div className={props.sender === context.uid ? 'd-flex justify-content-end mr-5' : 'd-flex justify-content-start ml-5'}>
        <div  style={{
            display: 'inline-block',
            color:'white',
            overflowWrap:'break-word',
            whiteSpace:'wrap',
            wordBreak:'break-all',
            maxWidth:'100%',
            background:'#2F4F4F',boxShadow: '4px 4px 12px -9px rgba(255, 255, 255, 0.25), -5px -5px 18px -8px rgba(0, 0, 0, 0.25)'
        }} className={client}>
            
    <p className="p-0 m-0" >{props.content} </p>        
       </div>
       </div> 
    )
}

export default ChatItem
