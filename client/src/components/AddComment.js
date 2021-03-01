import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"


import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"


export default class AddComment extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            id:"",
            body:"",
            redirectToDisplayBody:localStorage.accessLevel <= ACCESS_LEVEL_GUEST,
            wasSubmittedAtLeastOnce:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        let formData = new FormData()                  
        formData.append("id", this.state.id)
        formData.append("body", this.state.body)
        
        

        axios.post(`${SERVER_HOST}/comments/add_comment`, formData, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
        .then(res => 
        {           
            this.setState({redirectToDisplayBody:true})
        })
        .catch(err =>
        {
            this.setState({wasSubmittedAtLeastOnce: true})
        })
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
                {this.state.redirectToDisplayBody ? <Redirect to="/Comments"/> : null}                                            
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="id">
                        <Form.Label>TopicID</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="id" value={this.state.id} onChange={this.handleChange} />
                    </Form.Group>
    
    
                    <Form.Group controlId="body">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control type="text" name="body" value={this.state.body} onChange={this.handleChange} />
                    </Form.Group>
    
                      <br/>
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/Comments"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}