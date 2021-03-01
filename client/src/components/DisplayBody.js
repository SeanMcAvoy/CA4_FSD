import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container, AppBar, Typography, Button, Grow, Grid } from '@material-ui/core';

import axios from "axios"
import Logout from "./Logout"
import logo from '../images/logo.png'
import Topics from "./topics"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"
// import topics from "./topics";


export default class DisplayAllCars extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topics: []
        }
    }


    componentDidMount() {
        axios.get(`${SERVER_HOST}/topics/`)
            .then(res => {
                this.setState({ topics: res.data })
                console.log(this.state.topics)

            })
            .catch(err => {
                console.log("could not get Topic Data");
            })
    }


    render() {
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
                                    {/* <CarTable topics={this.state.topics} /> */}
                                    <Grid container alignItems="stretch">
                                        {this.state.topics.map((topic) => (
                                            <Grid key={topic._id} sm={6}>
                                                <Topics key={topic._id} topic={topic} />
                                            </Grid>

                                        ))}
                                    </Grid>

                                    {
                                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
                                            ? <div className="add-new-car">
                                                <Link className="blue-button" to={"/AddTopic"}>Add New Topic</Link>
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
                                    {
                                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
                                            ? <div>

                                                <div id="admin_button">
                                                    <div className="admin_area">
                                                        <Link className="green-button" to={"/AdminArea"}>Admin Area</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            : null
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