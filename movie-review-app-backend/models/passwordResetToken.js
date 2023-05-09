const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PasswordResetTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: new Date()
    }
});

PasswordResetTokenSchema.pre('save', async function(next) {
    if (this.isModified('token')) 
        this.token = await bcrypt.hash(this.token, 10);

    next();
});


PasswordResetTokenSchema.methods.compareToken = async function(OTP) {
    const result = await bcrypt.compare(OTP, this.token);
    return result;
};

module.exports = mongoose.model("PasswordResetToken", PasswordResetTokenSchema);