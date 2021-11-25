module.exports.validateRegisterInput = (
    username, 
    email, 
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if (email.trim() === ''){
        errors.email = 'Email must not be empty';
    } else {
        //this is an email valid detector 
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/; 
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === ''){
        errors.password = 'Password must not empty'
    } else if(password.length < 6 ){
        errors.password = 'Password must be atlest 6 characters'
    }else if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 //no error inside if <1 ( 0 error)
    };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if (password.trim() === ''){
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1 //no error inside if <1 ( 0 error)
    };
};

module.exports.validateQuizInput = (body, description, subject, tags, categories, difficulty) => {
    const errors = {};

    if (body.trim() === '') {
        throw new Error('Quiz must be not empty'); // Post must be atleast 1 
    }

    if (description.trim() === '') {
        throw new Error('Description must be not empty'); 
    }

    if (subject.trim() === '') {
        throw new Error('Subject must be not empty'); 
    }

    if (tags.trim() === '') {
        throw new Error('Tag must be not empty'); 
    }

    if (categories.trim() === '') {
        throw new Error('Category must be not empty'); 
    }

    if (difficulty.trim() === '') {
        throw new Error('Difficulty must be not empty'); 
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1 //no error inside if <1 ( 0 error)
    };
};

module.exports.validateQuestionInput = ( body, choice1, correct_answer, explanation) => {
    const errors = {};

    for (var i = 0; i < user_answer.length; i++) {
        if(body[i].trim() === ''){
            throw new UserInputError('Empty Question', {
                errors: {
                    body: 'Comment body ' + [i+1] + 'must not empty.'
                }
            });
        }
        if (correct_answer[i].trim() === '') {
            throw new Error('Correct answer ', [i+1], 'must be not empty.'); 
        }
        if (choice1[i].trim() === '') {
            throw new Error('Incorrect answer ', [i+1], 'must be not empty.'); 
        }
        if (explanation[i].trim() === '') {
            throw new Error('Explanation ', [i+1], 'must be not empty.'); 
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1 //no error inside if <1 ( 0 error)
    };
};