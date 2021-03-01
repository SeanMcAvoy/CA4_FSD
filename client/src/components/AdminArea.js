import React, {Component} from "react"
import UserTable from "./UserTable.js"
import axios from "axios"
import UserPiChart from "./UserPieChart"
import {Redirect, Link} from "react-router-dom"




import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
export default class AdminArea extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            users:[]
        }
    }
  
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/users/`)
        .then(res => 
        { 
            
            this.setState({users: res.data})      
                                             
        })
        .catch(err =>
        {
            // do nothing
        })
    }
    render() 
  
    {   

        
      
        console.log(this.state.users)
        return (   
            <div>
           
<Link className="red-button" to={"/DisplyBody"}>Exit</Link>
       <UserPiChart  user={this.state.users}/>
            <UserTable users ={this.state.users} /> 

       </div>


        )
    }
}