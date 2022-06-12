const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    }, 
    location: {
        type: String,
        require: true
    },
    banner: {
        type: String,
        require: [true, 'banner image is required'] 
    },
    speakers:{
        type: [String],
        require: [true, 'event can\'t be run without speaker']
    }
    ,
    date:{
        type: Date,
        require: true
    },
    slug: [String],
})

registerSchema.pre('save', function (next) {
    return this.slug = [this.name, this.speakers]  
})
const registerModel = mongoose.model('registerModel', registerSchema);
module.exports = registerModel;
