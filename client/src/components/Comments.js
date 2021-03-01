import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container, AppBar, Typography, Button, Grow, Grid } from '@material-ui/core';

import axios from "axios"
import Logout from "./Logout"
import logo from '../images/logo.png'


import { ACCESS_LEVEL_NORMAL_USER,ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import DisplayComment from "./DisplayComment";



export default class Comments extends Component 
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
            redirectToDisplayBody:localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
            wasSubmittedAtLeastOnce:false
        }
    }

    componentDidMount() 
    {      
        //this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/topics/get_topic/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                title: res.data.title,
                discription: res.data.discription,
                tags: res.data.tags,
                comments: res.data.comments,
            })            
        })
        .catch(err => 
        {
            // do nothing
        })
    }


    render() {
        console.log(this.state)
        return (
            <Container className="container" maxWidth="lg">
                <AppBar className="appBar" position="static" color="inherit">
                    <Typography className="heading" variant="h2" align="center">{this.state.title}</Typography>
                    {/* <img className="logo" src={logo} height="70" width="70" /> */}
                </AppBar>
                <Grow in>
                    <Container>
                        <br></br>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item sm={8}>
                                
                                <div className="form-container">
                                    <Grid container alignItems="stretch">
                                    <Grid  sm={8}>
                                            
                                            <DisplayComment comment={this.state.comments}/>
                                            

                                    </Grid>
                                   
                                    </Grid>
                                    
                                    {
                                        localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER
                                            ? <div className="add-new-car">
                                                <Link className="blue-button" to={"/AddComment"}>Add Comment</Link>
                                            </div>
                                            : null
                                    }
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div className="form-container">
                                    <h2 className="heading">User Menu</h2>
                                    {
                                        localStorage.accessLevel > ACCESS_LEVEL_GUEST
                                            ? <div className="logout">
                                                {
                                                    localStorage.profilePhoto !== "null"
                                                        ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt="" />
                                                        : null
                                                }
                                                <Logout />
                                            </div>
                                            : <div>
                                                <Link className="green-button" to={"/Login"}>Login</Link>
                                                <Link className="blue-button" to={"/Register"}>Register</Link>
                                                <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br /><br /><br /></div>
                                    }


                                </div>
                            </Grid>

                        </Grid>
                    </Container>
                </Grow>
            </Container>


        )
    }
}