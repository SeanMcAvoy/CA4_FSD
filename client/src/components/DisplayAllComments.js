import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container, AppBar, Typography, Button, Grow, Grid } from '@material-ui/core';
import Select from 'react-select'

import axios from "axios"
import Logout from "./Logout"
import logo from '../images/logo.png'
import Topics from "./topics"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
import DisplayComment from "./DisplayComment";
// import topics from "./topics";

var Comments;
export default class DisplayAllComments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: []
        }
    }


    componentDidMount() {
        axios.get(`${SERVER_HOST}/comments/`)
            .then(res => {
                this.setState({ comments: res.data })
                console.log(this.state.comments)

            })
            .catch(err => {
                console.log("could not get comments Data");
            })
    }
    
      
     


    render() {
        
        Comments = this.state.comments.filter(comment => comment.id === 1);
        return (
            <Container className="container" maxWidth="lg">
                <AppBar className="appBar" position="static" color="inherit">
                    <Typography className="heading" variant="h2" align="center">Discusion Forum</Typography>
                    <img className="logo" src={logo} height="70" width="70" />
                    
                </AppBar>
                <Grow in>
                    <Container>
                        <br></br>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item sm={7}>

                                <div className="form-container">
                                    <Grid container alignItems="stretch">
                                        {Comments.map((comments) => (
                                            <Grid key={comments._id} sm={8}>
                                                <DisplayComment key={comments._id} comments={comments} />
                                            </Grid>

                                        ))}
                                    </Grid>

                                    {
                                        localStorage.accessLevel >= ACCESS_LEVEL_GUEST
                                            ? <div className="add-new-car">
                                                <Link className="blue-button" to={"/AddComment"}>Add Comment</Link>
                                            </div>
                                            : null
                                    }
                                    <br>
                                    </br>
                                    <Link className="blue-button" to={"/DisplayBody"}> Back to Topics</Link>
                                     
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