import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import { ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

export default class EditTopic extends Component 
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
  
        axios.get(`${SERVER_HOST}/topics/get_topic/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                title: res.data.title,
                discription: res.data.discription,
                tags: res.data.tags,
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

        const topicObject = {
            title: this.state.title,
            discription: this.state.discription,
            tags: this.state.tags,
        }

        axios.put(`${SERVER_HOST}/topics/update_topic/${this.props.match.params.id}`, topicObject, {headers:{"authorization":localStorage.token}})
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
                        <Form.Label>Topic Title</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Form.Group controlId="discription">
                        <Form.Label>Discription</Form.Label>
                        <Form.Control type="text" name="discription" value={this.state.discription} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="tags" id="tag">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" name="tags" value={this.state.tags} onChange={this.handleChange} />
                
                    </Form.Group>
                    
                    <Form.Group controlId="photos">
                    <Form.Label>Photos</Form.Label>
                    <Form.Control          
                        type = "file" multiple onChange = {this.handleFileChange}
                    /></Form.Group> <br/>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/DisplayBody"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}