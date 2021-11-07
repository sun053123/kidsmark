const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String, 

    role: Boolean,
    scores: 
        {
            science_score: String,
            math_score: String,
            english_score: String,
            thai_score: String,
            social_score: String
        }
    ,
    histories: [
        {
            body:String,
            username:String,
            createdAt: String
        }
    ],
    favorites: [
        {
            body:String,
            createdAt: String
        }
    ]
});

module.exports = model('User', UserSchema);
