import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteTopic extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayBody:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/topics/delete_topic/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {            
            this.setState({redirectToDisplayBody:true})            
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
                {this.state.redirectToDisplayBody ? <Redirect to="/DisplayBody"/> : null}                      
            </div>
        )
    }
}