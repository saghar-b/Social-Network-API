const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtsSchema = new Schema(
  {
    thoughtText: {type: String, required:true},
    createdAt :{type : Date , default : Date.now},
    username : {type: String, required : true},
    reactions: [{ type: Schema.Types.ObjectId, ref: 'reactions' }],
  },
  {
    toJSON: {
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
