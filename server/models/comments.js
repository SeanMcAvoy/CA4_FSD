const mongoose = require(`mongoose`)

let commentsSchema = new mongoose.Schema(
   {
        id: {type: Number,required:true },
        body: {type: String, required:true},
        postedAt: {
            type: Date,
            default: new Date(),
        },
   },

   {
       collection: `comments`
   })

module.exports = mongoose.model(`comments`, commentsSchema)