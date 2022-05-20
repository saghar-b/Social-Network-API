// Define Mongoose
const mongoose = require('mongoose');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = new mongoose.Schema({

  username: { type: String, required: true  ,unique: true , trim: true},
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thoughts' }],
});

// Create a virtual property `commentCount` that gets the amount of comments per post
userSchema.virtual('thoughtsCount').get(function () {
  return this.thoughts.length;
});

// Using mongoose.model() to compile a model based on the schema
// 'Item' is the name of the model
// grocerySchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('User', userSchema);

// Will add data only if collection is empty to prevent duplicates
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { username: 'saghar', email: "saghar@gmail.com "},
        { username: 'pegah', email: "pegah@gmail.com " },
        { username: 'saba', email: "saba@gmail.com " },
        { username: 'toloo', email: "toloo@gmail.com " },
        { username: 'jeff', email: "jeff@gmail.com " },
        
      ],
      (insertError, insertedUsers) => {
        if (insertError) {
          console.log(insertError);
        }
        console.log('Inserted Users:', insertedUsers);
      }
    );
  }
});

module.exports = User;
