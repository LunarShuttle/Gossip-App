import './App.css';
import Logo from './Images/Logo.png'
import GLogo from './Images/GoogleL.png'
import  {db, auth , provider } from './firebase'
import Main from './Main'
import { createContext, useEffect,useState } from 'react';
let User = createContext()
function App() {
  const [logStatus, setLogStatus] = useState()
 
  useEffect(()=>{
    auth.onAuthStateChanged(user =>{
      if(user){
          setLogStatus(
              <User.Provider value={user} >
                  <Main />
              </User.Provider>
          )
      }
      else{
          setLogStatus(<Login />)
      }
    })
  },[])
  return (
    <div className="App" >
      {logStatus}
    </div>
  );
}


function Login() {
  const [members, setMembers] = useState([])

  useEffect(() => {
      db.collection('Users').onSnapshot(snap=>{
          setMembers(snap.docs.map((doc)=>({id:doc.id,data:doc.data()})))
         
      })
  }, [])

  function signIn(){
    auth.signInWithRedirect(provider)
    .then(({user}) => {
     
      
      /*Finding out whether a user already exists*/
       let status = members.some((ex) =>{
         return (
           ex.data.email === user.email
           )
         })
         if(status === false){
     
          db.collection("Users").add({
            name:user.displayName,
            email:user.email,
            phone:user.phoneNumber,
            img:user.photoURL,
            id:user.uid,
      
        })
        }
        else{
          console.log(status)
        } 
        
      })
    .catch(error => console.log(error.message))
  }
  return (
    <div className="d-flex base justify-content-center align-items-center flex-column" style={{backgroundColor:'#2F4F4F',height:'100vh'}} onClick={signIn} >
      <div >
        <img src={Logo} className="img-fluid" alt="app-logo"/>
      </div>
      <div style={{backgroundColor:'white',borderRadius:'3px',maxWidth:'80%',boxShadow:' 0px 9px 39px -15px rgba(0,0,0,0.75)'}} onClick={signIn} className="signIn-btn container p-2 mt-4 d-flex align-items-center justify-content-center ">
        <div style={{backgroundColor:'white'}}>
          <img src={GLogo} className="img-fluid mr-4 ml-2" width="30" alt="google-logo" />
        </div>
        <div style={{backgroundColor:'white'}}>
          <h5 className="p-0 m-0 pr-1">Sign in with Google</h5>
        </div>
       </div> 
    </div>
  )
}



export default App;
export {User}
