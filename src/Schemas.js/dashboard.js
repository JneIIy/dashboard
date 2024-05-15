const { model, Schema } = require('mongoose');

const schema = new Schema({
    userID: String,
    access_token: String,
    refresh_token: String,
    expires_in: Number,
    secretAccessKey: String,
    user: {
        id: String,
        username: String,
        discriminator: String,
        avatar: String

    },
    lastUpdated: {
        type: Number,
        default: Date.now()
    }
});


module.exports = model('dashboard', schema);