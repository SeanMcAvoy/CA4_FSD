import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditUser extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
           name: ``,
            email: ``,
           accessLevel: ``,
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce:false
        }
    }

    componentDidMount() 
    {      

      
        this.inputToFocus.focus()
 
        axios.get(`${SERVER_HOST}/users/get_user/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
     
        .then(res => 
        {    
          
            this.setState({
               name: res.data.name,
                email: res.data.email,
             accessLevel: res.data.accessLevel
            })      
      
        })
        .catch(err => 
        {
           
           
          
           
            // do nothing
        })
    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()
      const formInputsState = this.validate();

       
      if (Object.keys(formInputsState).every(index => formInputsState[index])) {
        const userObject = {
            name: this.state.name,
            email: this.state.email,
            accessLevel: this.state.accessLevel
        }
    

        axios.put(`${SERVER_HOST}/users/update_user/${this.props.match.params.id}`, userObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {             
            this.setState({redirectToDisplayAllCars:true})
        })
        .catch(err => 
        {
            console.log("Record not EDITED INVALID")
            this.setState({wasSubmittedAtLeastOnce: true})
        })
      
    }
    else {
        alert("Record Not Added Invalid Input")
    }
    }

    
    validateName()
    {    
        const pattern = /^[a-zA-Z\s]*$/;
        return pattern.test(String(this.state.name))
        
    }
    
    
    validateEmail()
    {    
        const pattern = /^\S+@\S+\.\S+$/;
        return pattern.test(String(this.state.email))
     
    }
    
    
    validateLevel()
    {    
        const level = parseInt(this.state.accessLevel)
     if(level == 0 ){
         alert("Warning the User Will Be Blocked From Editing Privelages Until The Access Level They are Given is Increased")
     }
        return (level >= 0 && level <= 2)
      
    }


   


    validate() 
    {
        return {
           name: this.validateName(),
           email: this.validateEmail(),
           accessLevel: this.validateLevel(),
           
        };
    }


    render() 
    {
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
        } 
        
        return (
            <div className="form-container">
    
                {this.state.redirectToDisplayAllCars ? <Redirect to="/Logout"/> : null}  
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Emailr</Form.Label>
                        <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="accessLevel">
                        <Form.Label>accessLevel</Form.Label>
                        <Form.Control type="text" name="accessLevel" value={this.state.accessLevel} onChange={this.handleChange} formInputsState="^(0|1|2)$" />
                    </Form.Group>
                   
        
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayBody"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}