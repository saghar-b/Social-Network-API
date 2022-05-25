const { mongoose, Schema, model } = require('mongoose');


// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: { type: String },
    username: {
      type: String, required: true
    },
    createdAt: {
        type: Date,default: Date.now,get: (createdAtVal) => createdAtVal.toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  },

);
// Schema to create thoughts model
const thoughtsSchema = new Schema(
  {
    thoughtText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);


thoughtsSchema.virtual('reactionsCount').get(function () {
  return this.reactions.length;
});

// Initialize our Post model
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
