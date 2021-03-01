import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"


import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"

var userComment;

export default class AddComment2 extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            title:"",
            discription:"",
            tags:[],
            comments:[],
            selectedFiles:null,
            redirectToDisplayBody:localStorage.accessLevel < ACCESS_LEVEL_GUEST,
            wasSubmittedAtLeastOnce:false
        }
    }


    componentDidMount() 
    {     
        //this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        // this.setState({[e.target.name]: e.target.value})
        userComment = e.target.value;
    }


    handleFileChange = (e) => 
    {
        this.setState({selectedFiles: e.target.files})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        let CommentArray = this.state.comments;
        CommentArray.push(userComment);
        this.setState({comment: CommentArray});

        const commentObject ={
            title: this.state.title,
            discription: this.state.discription,
            tags:this.state.tags,
            comments:this.state.comments,
        }

        axios.put(`${SERVER_HOST}/topics/update_topic/${this.props.match.params.id}`, commentObject)
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
                    <Form.Group controlId="body">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control type="text" name="comments"  onChange={this.handleChange} />
                    </Form.Group>
    
                      <br/>
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
            
                    <Link className="red-button" to={"/DisplayBody"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}