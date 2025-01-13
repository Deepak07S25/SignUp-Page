import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
    firstName: string;
    lastName?: string;
    emailId: string;
    password: string;
    gender?: string;
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value: string) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value);
            }
        },
    },
    gender: {
        type: String,
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User; 