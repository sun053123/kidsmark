const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User');

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, 
    { expiresIn: '1h'});
}

function initialScore(user){
    
    user.scores.math_score = 0
    user.scores.science_score = 0
    user.scores.social_score = 0
    user.scores.thai_score = 0
    user.scores.english_score = 0

    user.save();
}

module.exports = {
    Mutation: {
        async login(_, { username, password }){
            const { errors, valid } = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('Worng credentials', { errors });
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match){
                errors.general = 'Wrong crendetials'
                throw new UserInputError('Wrong credentials', { errors });
            }
            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, 
            { registerInput :{ username, email, password, confirmPassword} }, context, info){
        //  Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
        //  Make sure user doesnt already exist
            const user = await User.findOne({ username });

            if(user){
                throw new UserInputError('Username is taken', {
                    errors: { username: 'This username is taken'}
                });
            }ß
        //  hash password and create an auth token
        password = await bcrypt.hash(password, 12); //add value for better hash (add salt)

        const newUser = new User({
            email,
            username,
            password,
            createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        initialScore(res)
        
        
        const token = generateToken(res)

        return {
            ...res._doc,
            id: res._id,
            token
        };
        }
    },
}