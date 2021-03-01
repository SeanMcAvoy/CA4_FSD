const router = require(`express`).Router()
var createError = require('http-errors')

const topicModel = require(`../models/topics`)

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


const createNewTopicDocument = (req, res, next) => 
{           
    // Use the new Topic details to create a new Topic document                
    let topicDetails = new Object()
                
    topicDetails.title = req.body.title
    topicDetails.discription = req.body.discription
    topicDetails.tags = req.body.tags
    

    // add the Topic's photos to the topicDetails JSON object
    topicDetails.photos = []
                
    req.files.map((file, index) =>
    {
        topicDetails.photos[index] = {filename:`${file.filename}`}
    })
        
    topicModel.create(topicDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        return res.json(data)        
    })
}


const getAllTopicDocuments = (req, res, next) => 
{   
    //user does not have to be logged in to see Topic details
    topicModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        
        return res.json(data)
    })
}


const getTopicPhotoAsBase64 = (req, res, next) => 
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


const getTopicDocument = (req, res, next) => 
{
    topicModel.findById(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}


const updateTopicDocument = (req, res, next) => 
{
    topicModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deleteTopicDocument = (req, res, next) => 
{
    topicModel.findByIdAndRemove(req.params.id, (err, data) => 
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
    topicModel.findByIdAndUpdate(req.params.id, {$inc: {likeCount: 1}}, (err, data) => 
    {
        
        if(err)
        {
            return next(err)
        }  
        return res.json(data)
    })        
}


// read all records
router.get(`/topics/`, getAllTopicDocuments)

// get one Topic photo
router.get(`/topics/topic_photo/:filename`, getTopicPhotoAsBase64)

// Read one record
router.get(`/topics/get_topic/:id`, verifyUsersJWTPassword, getTopicDocument)

// Add new record
router.post(`/topics/add_topic`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("topicPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewTopicDocument)

// Update one record
router.put(`/topics/update_topic/:id`, verifyUsersJWTPassword, updateTopicDocument)

// Delete one record
router.delete(`/topics/delete_topic/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deleteTopicDocument)

// //like post
router.put(`/topics/like_topic/:id`,likePost)


module.exports = router