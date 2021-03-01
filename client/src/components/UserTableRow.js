import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import Modal from './Modal';
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class UserTableRow extends Component 
{    
    
    constructor(props)
    {
        super(props); 
        this.state = {showModal: false};       
    }
    
    
    handleRowClick = e =>
    {    
        this.toggleModal();       
        
    }
 
      yes = e =>  {
   this.toggleClose();
        }
  toggleClose() 
    {    
     
    
          this.setState({showModal: false})
      

 
    }
    toggleModal() 
    {    
      
 if(this.state.showModal === false){
     this.setState({showModal: true})
 }
 
}
    
    render() 
    {
        console.log(this.props.cars)
        return (
            <tr onClick={this.handleRowClick} >
                <td>{this.props.user.name}</td>
               <td>{this.props.user.email}</td>
               <td>{this.props.user.accessLevel}</td>
            
               {this.state.showModal ?
                                    <Modal 
                                       user = {this.props.user}
                                        closeModal = {this.yes}
                                       
                                      /> : null}
                
            </tr>
        )
    }
}
