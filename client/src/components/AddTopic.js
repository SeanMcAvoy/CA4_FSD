import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddCar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            title:"",
            discription:"",
            tags:[],
            selectedFiles:null,
            redirectToDisplayBody:localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
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
        formData.append("title", this.state.title)
        formData.append("discription", this.state.discription)
        formData.append("tags",this.state.tags)
        
        if(this.state.selectedFiles)
        {
            for(let i = 0; i < this.state.selectedFiles.length; i++)
            {
                formData.append("topicPhotos", this.state.selectedFiles[i])
            }
        }

        axios.post(`${SERVER_HOST}/topics/add_topic`, formData, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
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
                {this.state.redirectToDisplayBody ? <Redirect to="/DisplayBody"/> : null}                                            
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="discription">
                        <Form.Label>Discription</Form.Label>
                        <Form.Control type="text" name="discription" value={this.state.discription} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" name="tags" value={this.state.tags} onChange={this.handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="photos">
                    <Form.Label>Photos</Form.Label>
                    <Form.Control          
                        type = "file" multiple onChange = {this.handleFileChange}
                    /></Form.Group> <br/><br/>
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/DisplayBody"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}