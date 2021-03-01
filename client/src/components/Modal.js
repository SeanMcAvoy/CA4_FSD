import React, { Component } from 'react';
import { Button } from '@material-ui/core';


import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import {Link} from "react-router-dom"

import axios from "axios"
export default class Modal extends React.Component 
{


//     lowerAccessLevel = e => {
//            let user1 = this.props.user; 
        
//            user1.accessLevel =     user1.accessLevel - 1;
//     alert(user1.accessLevel)

    
//     axios.defaults.withCredentials = true // needed for sessions to work
      
//      axios.put(`${SERVER_HOST}/users/`,user1)
//      .then(res => 
//         {
//         if(res.data)
//         {
//             if (res.data.errorMessage)
//             {
//                 console.log(res.data.errorMessage)    
//             }
//             else
//             {   
//                 console.log("Record added")
//                 this.setState({redirectToDisplayAllCars:true})
//             } 
//         }
//         else
//         {
//             console.log("Record not added")
//         }
//     })
// }

        
         
  
         
                                         
  

    
    render() 
    {
    
 
            
        return ( 
            <div>

     {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditUser/" + this.props.user._id}>Edit</Link> : null}
 
     <div id="exitButton" onClick={this.props.closeModal}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Exit_Official_Logo.png"/></div>
      </div>
      )
  }
    }