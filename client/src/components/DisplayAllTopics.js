import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container, AppBar, Typography, Button, Grow, Grid } from '@material-ui/core';

import axios from "axios"

import CarTable from "./CarTable"
import Logout from "./Logout"
import logo from '../images/logo.png'

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"


export default class DisplayAllCars extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cars: []
        }
    }


    componentDidMount() {
        axios.get(`${SERVER_HOST}/cars/`)
            .then(res => {
                this.setState({ cars: res.data })
            })
            .catch(err => {
                // do nothing
            })
    }


    render() {
        return (
            <Container className="container" maxWidth="lg">
                <AppBar className="appBar" position="static" color="inherit">
                    <Typography className="heading" variant="h2" align="center">Discusion Forum</Typography>
                    <img className="logo" src={logo} height="70" width="70" />
                    {/* Login Button */}
                </AppBar>
                <Grow in>
                    <Container>
                        <br></br>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item sm={7}>
                                <div className="table-container">
                                    <CarTable cars={this.state.cars} />
                                    {
                                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
                                            ? <div className="add-new-car">
                                                <Link className="blue-button" to={"/AddCar"}>Add New Car</Link>
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