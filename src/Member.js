import React from 'react'
import { Link } from 'react-router-dom'

function Member(props) {
    return (
        <Link to={"/chat/"+props.id} style={{textDecoration:'none'}}>
        <div  style={{
            maxWidth:'100%',
            background:'#2F4F4F',boxShadow: '4px 4px 12px -9px rgba(255, 255, 255, 0.25), -5px -5px 18px -8px rgba(0, 0, 0, 0.25)'
        }} className='mx-5 my-4 px-5 d-flex py-3 align-items-center'>
            
            <div className="row d-flex justify-content-start align-items-center">
                <div className="col-2 p-0 ">
                <img src={props.img} className="img-fluid" width='50' style={{borderRadius:'50%'}} alt="member-logo"/>
                </div>
                <div className="col-10 pl-4  p-0 d-flex justify-content-start">
                <h4 className="p-0 m-0" style={{color:'white'}}>{props.name}</h4>
                </div>
            </div>
         
 
        
       </div> 
       </Link>
        
    )
}

export default Member
