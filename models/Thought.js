const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtsSchema = new Schema(
  {
    thoughtText: {type: String, required:true},
    timestamps: { createdAt: 'addedAt'},
    username : {type: String, required : true},
    // reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtsSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// Initialize our Post model
const Post = model('post', postSchema);

module.exports = Post;
