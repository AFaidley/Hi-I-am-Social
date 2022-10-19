const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validators: true,
        },
        thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],
        friends: [{type:Schema.Types.ObjectId, ref: 'user'}],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
)

userSchema.virtual('friendAmount').get(function(){
    return this.friends.length;
})

const User = model('user', userSchema);

// Have to figure out issue with deconstructing
module.exports = {User};