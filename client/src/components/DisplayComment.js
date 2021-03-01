import React, {Component} from "react"
import {Link} from "react-router-dom"
import "../css/comments.css"
import moment from 'moment';
import { ACCESS_LEVEL_GUEST } from "../config/global_constants";
import DeleteIcon from '@material-ui/icons/Delete';

export default class DisplayComment extends Component 
{    
    
    
    
    render() 
    {

        return (
            <div className="comments">
                <h6>{this.props.comments.body} 
                {
                            localStorage.accessLevel > ACCESS_LEVEL_GUEST
                                ? 

                                <Link size="small" color ="primary" to={"/DeleteComment/" + this.props.comments._id}>
                                    <DeleteIcon id="deleteComment"/>
                                </Link>
                                  
                            
                                 : null
                    }
                </h6>
                <p>{moment(this.props.comments.postedAt).fromNow()}</p>
                
                
            </div>
            
        )
    }
}