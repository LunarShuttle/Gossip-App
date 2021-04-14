import React,{useContext,useState,useEffect} from 'react'
import {User} from './App'
import Logo from './Images/Logo.png'
import Member from './Member'
import './App.css'
import {auth, db} from './firebase'
import './Home.css'

function Home() {
    const context = useContext(User)
    const [members, setMembers] = useState([])
    useEffect(() => {
        db.collection('Users').onSnapshot(snap=>{
            setMembers(snap.docs.map((doc)=>({id:doc.id,data:doc.data()})))
           
        })
    }, [members])

    useEffect(()=>{
        auth.onAuthStateChanged(user =>{
          if(user){
             
          }
          else{
            window.location.reload()
          }
        })
      },[])

    return (
        <div className="container base p-0 home__layout__base" style={{backgroundColor:'#2F4F4F',height:'100vh'}}>
            <div>
                <img src={Logo} className="img-fluid" width="400" alt="app-logo"/>
            </div>
            <div className="pt-2" style={{height:'70%',overflowY:'auto'}}>
                {
                    members.map((member)=>{
                        return(
                            context.email !== member.data.email ?
                             <Member key={member.id} img={member.data.img} name={member.data.name} id={member.data.id} />
                             :
                             <></>
                        )
                    })
                }
            </div>
            <div className="d-flex align-items-center justify-content-center down__bar">
            <svg onClick={()=>{auth.signOut()}} style={{cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="white" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
  <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
</svg>
            </div>
        </div>
    )
}

export default Home
