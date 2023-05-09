const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const EmailVerificationTokenSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        expires: 3600
    }
});


EmailVerificationTokenSchema.pre('save', async function(next) {
    if (this.isModified('token')) 
        this.token = await bcrypt.hash(this.token, 10);
    
    next();
});


EmailVerificationTokenSchema.methods.compareToken = async function(OTP) {
    const result = await bcrypt.compare(OTP, this.token);
    return result;
};

module.exports = mongoose.model("EmailVerificationToken", EmailVerificationTokenSchema)