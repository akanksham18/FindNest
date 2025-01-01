import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    option: String,
    itemName: String,
    date: Date,
    location: String,
    photo: Buffer, // Store image as binary data
    email: String,
    phoneNumber: String,
});

export default mongoose.model('Item', ItemSchema);
