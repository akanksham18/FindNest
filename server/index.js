import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import UserModel from './models/User.js';
import Item from './models/Item.js';

const app = express();
const upload = multer(); // Middleware for handling file uploads

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173', // Replace with your frontend URL
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User Registered Successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Registration Failed', error: error.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        res.status(200).json({ message: 'Login Successful', user: { email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Post item endpoint
app.post('/postitem', upload.single('photo'), async (req, res) => {
    try {
        const { option, itemName, date, location, email, phoneNumber } = req.body;
        const photo = req.file ? req.file.buffer : null;

        if (!option || !itemName || !date || !location || !email || !phoneNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newItem = await Item.create({
            option,
            itemName,
            date: new Date(date),
            location,
            photo,
            email,
            phoneNumber,
        });

        res.status(201).json({ message: 'Item posted successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to post item', error: error.message });
    }
});

// Fetch all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        const formattedItems = items.map(item => ({
            ...item.toObject(),
            photo: item.photo ? `data:image/jpeg;base64,${item.photo.toString('base64')}` : null,
        }));
        res.status(200).json(formattedItems);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items', error: error.message });
    }
});

app.use('/uploads', express.static('uploads'));

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
