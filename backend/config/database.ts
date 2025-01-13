import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(
            'mongodb+srv://deepakshy94:CWCW2H25WAJ0rbPy@cluster01.xmdwo.mongodb.net/excellence?retryWrites=true&w=majority&appName=cluster01'
        );
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export default connectDB; 