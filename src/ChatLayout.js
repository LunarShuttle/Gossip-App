import React,{useState,useEffect, useContext} from 'react'
import ChatItem from './ChatItem'
import {db,auth} from './firebase'
import { User } from './App'
import firebase from 'firebase'
import './ChatLayout.css'
import { Link } from 'react-router-dom'


function ChatLayout(props) {
    const context = useContext(User)
    const [member, setMember] = useState([])
    const [client, setClient] = useState({})
    const [messages, setMessages] = useState([])
    const [inputer, setInput] = useState('')

    useEffect(() => {
        db.collection('Users').onSnapshot(snap=>{
            setMember(snap.docs.map((doc)=>{
             return ({id:doc.id,data:doc.data()})
        }
            ))
            
        })
        member.map((mem)=>{
            if(mem.data.id === props.match.params.id){
                 setClient(mem.data)
                
            }
        })
    }, [client,member])
    
    useEffect(() => {
        db.collection('Messages').orderBy("timestamp","asc").onSnapshot(snap=>{
            setMessages(snap.docs.map((doc)=>({id:doc.id,data:doc.data()})))
        })
    }, [messages])
        
    useEffect(()=>{
        auth.onAuthStateChanged(user =>{
          if(user){
              
          }
          else{
            window.location.reload()
          }
        })
      },[])

    function sendM(){
        db.collection("Messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            content:inputer,
            sender:context.uid,
            receiver:client.id
        })
    }

     return (
        <div className="container base p-0 d-flex flex-column chat__layout__base">
          
         <div className="d-flex align-items-center justify-content-center py-3 layout__placement" >
            <div className="row m-0 p-0 align-items-center">
                <div className="col-2 m-0 p-0">
                    <img src={client.img} className="img-fluid " width="30" style={{borderRadius:'50%'}} alt="client-logo"/>
                </div>
                <div className="col-8 m-0 p-0  text-center">
                    <h3 className="m-0 p-0" style={{color:'white'}}>{client.name}</h3>

                </div>
                <div className="col-2 m-0 p-0 ">
               <Link to="/"> <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
</svg>
</Link>
                </div>
            </div>
        </div>
        <div className="pt-2" style={{height:'75%',overflowY:'auto'}}>
          {
              messages.map((message)=>{
     
                if((message.data.sender === context.uid) || (message.data.receiver === context.uid) ){
                    return(
                        <>
                        <ChatItem key={message.id} content={message.data.content} sender={message.data.sender} receiver={message.data.receiver} client={client} />
                    <br/>
                    </>
                        )
                }
              })
          }
        
        </div>
        <div  className="d-flex justify-content-center align-items-center mt-4" style={{height:'10%'}}>
            <input placeholder="type your chat" onChange={(e)=>setInput(e.target.value)}  className="px-2  text-left d-flex align-items-center" style={{backgroundColor:'black',height:'60%',width:'70%',borderRadius:'50px',color:'white',border:'0px solid transparent'}}>

            </input>
            <div className="mx-2 add__chat d-flex align-items-center justify-content-center" onClick={()=>{sendM()}} style={{borderRadius:'50px',backgroundColor:'black',color:'white',height:'2.3rem',width:'2.3rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="white" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
            </div>
            
        </div>
        </div>
    )
}

export default ChatLayout
