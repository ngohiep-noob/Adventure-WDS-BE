const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('refresh-token', refreshTokenSchema);