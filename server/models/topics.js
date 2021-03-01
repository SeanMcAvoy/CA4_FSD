const mongoose = require(`mongoose`)

let topicPhotosSchema = new mongoose.Schema(
    {
       filename:{type:String}
    })


let topicsSchema = new mongoose.Schema(
    {
        title: {type: String, required:true},
        discription: {type: String, required:true},
        tags: [String],
        photos:[topicPhotosSchema],
        likeCount: 
        {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
    },
    {
       collection: `topics`
    })

module.exports = mongoose.model(`topics`, topicsSchema)