import React, {Component} from "react"
import { Container, Button, Card, CardMedia, CardActions, CardContent,Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants";
import axios from "axios"
import "../css/topicStyles.css"
import moment from 'moment';
import {Link} from "react-router-dom"
import Comments from "./Comments";
//single topic


export default class topics extends Component 
{
    componentDidMount() 
    {
        this.props.topic.photos.map(photo => 
        {
            return axios.get(`${SERVER_HOST}/topics/topic_photo/${photo.filename}`)
            .then(res => 
            {         
                document.getElementById(photo._id).src = `data:;base64,${res.data.image}`                                                         
            })
            .catch(err =>
            {
                // do nothing
            })
        })

    }
    
    render() {
        console.log(this.props)
        return (
              <Card className="card">
                  <CardMedia className="media"/>
                  {this.props.topic.photos.map(photo => <img key={photo._id} id={photo._id} alt=""/>)}
                  <div className="overlay">
                      <Typography variant ="h6">{this.props.topic.title}</Typography>
                      <Typography variant ="p">{moment(this.props.topic.createdAt).fromNow()}</Typography>
                  </div>
                  <div className="overlay2">
                  {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
                        ? 
                            <Link style={{color:"white"}} size="small" to={"/EditTopic/" + this.props.topic._id}><MoreHorizIcon fontSize="default"/></Link>
                            : null
                    }
                      
                  </div>
                  <CardContent>
                        <Typography className="title" variant="h6" gutterBottom>{this.props.topic.discription}</Typography>
                  </CardContent>
                  <CardActions className="cardActions">
                  {
                        localStorage.accessLevel > ACCESS_LEVEL_GUEST
                        ? 
                        <Link size="small" color ="primary" to={"/UpdateTopic/" + this.props.topic._id}>
                        {/* <Link size="small" color ="primary"> */}
                            <ThumbUpAltIcon fontSize="small" />
                            like {this.props.topic.likeCount}
                        </Link>
                        
                                 : null
                    }
                      {
                            localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
                                ? 

                                <Link size="small" color ="primary" to={"/DeleteTopic/" + this.props.topic._id}>
                                    <DeleteIcon fontSize="small" />
                                    Delete
                                </Link>
                                  
                            
                                 : null
                    }
                      
                  </CardActions>
                  {/* <Comments comments={this.props.topic.comments}/> */}
                  <Link style={{color:"Black"}} size="small" to={"/Comments"}>Join The Discusion</Link>
              </Card>
            
        )
    }
}