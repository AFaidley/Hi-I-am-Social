const { Schema, model } = require('mongoose');

const Reaction = require('./reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

// Added after re-reading README
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

// Initializing model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;