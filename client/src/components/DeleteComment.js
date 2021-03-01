import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteComment extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectTocomment:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/comments/delete_comment/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {            
            this.setState({redirectTocomment:true})            
        })
        .catch(err =>
        {
            // Do nothing
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirectTocomment ? <Redirect to="/Comments"/> : null}                      
            </div>
        )
    }
}