import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST,ACCESS_LEVEL_GUEST} from "../config/global_constants"


export default class UpdateTopic extends Component 
{

    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayBody:localStorage.accessLevel >= ACCESS_LEVEL_GUEST
        }
    }
    
    componentDidMount() 
    {   
        axios.put(`${SERVER_HOST}/topics/like_topic/${this.props.match.params.id}`)
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