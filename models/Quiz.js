const { model, Schema } = require('mongoose');

const quizSchema = new Schema({

  body: String,
  description: String,
  username: String,
  createdAt: String,
  subject: String,
  tags: String,
  categories: String,
  difficulty: String,

  questions: [
      {
          body: String,
          username: String,
          correct_answer: String,
          incorrect_answer: String,
          explanation: String
  }],

  comments: [
      {
          body: String,
          username: String,
          createdAt: String
      }
  ],
  likes: [
      {
          username: String,
          createdAt: String
      }
  ],
  user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
  }
})

module.exports = model('Quiz', quizSchema);