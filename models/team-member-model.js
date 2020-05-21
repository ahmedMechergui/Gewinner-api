const mongoose = require('mongoose');
const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: String,
        required: true,
        trim: true
    },
    imageURL: {
        type: String,
        required: true
    }
});

const TeamMember = mongoose.model('TeamMember' , teamMemberSchema);
module.exports = TeamMember;