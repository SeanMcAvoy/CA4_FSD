const router = require(`express`).Router()
var createError = require('http-errors')

const commentModel = require(`../models/comments`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})



const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {    
        return next()
    }
    else
    {
        return next(createError(401))
    }
}


const createNewCommentDocument = (req, res, next) => 
{           
    // Use the new Comment details to create a new Comment document                
    let commentDetails = new Object()
       
    commentDetails.id = req.body.id
    commentDetails.topic = req.body.topic
    commentDetails.body = req.body.body
    
        
    commentModel.create(commentDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        return res.json(data)        
    })
}


const getAllCommentDocuments = (req, res, next) => 
{   
    //user does not have to be logged in to see Comment details
    commentModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        
        return res.json(data)
    })
}


const getCommentPhotoAsBase64 = (req, res, next) => 
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
    {     
        if(err)
        {
            return next(err)
        }  
        
        if(fileData)
        {  
            return res.json({image:fileData})                           
        }   
        else
        {
            return res.json({image:null})
        }
    })             
}


const getCommentDocument = (req, res, next) => 
{
    commentModel.findById(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}


const updateCommentDocument = (req, res, next) => 
{
    commentModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deleteCommentDocument = (req, res, next) => 
{
    commentModel.findByIdAndRemove(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })      
}

// 

const likePost = (req, res, next) => 
{
    commentModel.findByIdAndUpdate(req.params.id, {$inc: {likeCount: 1}}, (err, data) => 
    {
        
        if(err)
        {
            return next(err)
        }  
        alert("hello")
        return res.json(data)
    })        
}


// read all records
router.get(`/comments/`, getAllCommentDocuments)

// get one Comment photo
router.get(`/comments/comment_photo/:filename`, getCommentPhotoAsBase64)

// Read one record
router.get(`/comments/get_comment/:id`, verifyUsersJWTPassword, getCommentDocument)

// Add new record
router.post(`/comments/add_comment`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("commentPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewCommentDocument)

// Update one record
router.put(`/comments/update_comment/:id`, verifyUsersJWTPassword, updateCommentDocument)

// Delete one record
router.delete(`/comments/delete_comment/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deleteCommentDocument)




module.exports = router