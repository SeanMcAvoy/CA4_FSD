import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import PrivateRoute from "./components/PrivateRoute"
import DisplayBody from "./components/DisplayBody"
import AddTopic from "./components/AddTopic"
import EditTopic from "./components/EditTopic"
import DeleteTopic from "./components/DeleteTopic"
import UpdateTopic from "./components/UpdateTopic";
import Comments from "./components/DisplayAllComments";
import AddComment from "./components/AddComment"
import EditPassword from "./components/EditPassword"
import AdminArea from "./components/AdminArea"
import EditUser from "./components/EditUser"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"
import DeleteComment from "./components/DeleteComment"



if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={DisplayBody} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/EditPassword/:id"  component={EditPassword} />
                    <PrivateRoute exact path="/AdminArea"  component={AdminArea} />
                    <PrivateRoute exact path="/Logout" component={Logout}/>
                    <PrivateRoute exact path="/AddTopic" component={AddTopic} />
                    <PrivateRoute exact path="/EditTopic/:id" component={EditTopic} />
                    <PrivateRoute exact path="/DeleteTopic/:id" component={DeleteTopic}/>
                    <PrivateRoute exact path="/UpdateTopic/:id" component={UpdateTopic}/>
                    <Route exact path="/Comments" component={Comments} />
                    <PrivateRoute exact path="/AddComment" component={AddComment} />
                    <PrivateRoute exact path="/DeleteComment/:id" component={DeleteComment}/>
                    <Route exact path="/EditUser/:id" component={EditUser} />
                    {/* <PrivateRoute exact path="/AddComment" component={AddComment} /> */}
                    <Route exact path="/DisplayBody" component={DisplayBody}/> 
                    <Route path="*" component={DisplayBody}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}