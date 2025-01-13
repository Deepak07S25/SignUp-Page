import express, { Request, Response } from "express";
import connectDB from "./config/database";
import User from "./models/user";
import bcrypt from "bcrypt";
import cors from "cors";

interface RegisterRequest {
    firstName: string;
    lastName?: string;
    emailId: string;
    password: string;
    gender?: string;
}

interface LoginRequest {
    emailId: string;
    password: string;
}

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req: Request<{}, {}, RegisterRequest>, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, emailId, password, gender } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            gender,
        });
        await user.save();
        return res.send("User Added successfully");
    } catch (err) {
        return res.status(400).send("Error " + (err as Error).message);
    }
});

app.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<Response> => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email or password");
        }
        return res.send("login successful");
    } catch (err) {
        return res.status(500).send("error " + (err as Error).message);
    }
});

const PORT = 3000;

connectDB()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}....`);
        });
    })
    .catch((err) => {
        console.error("Database not connected:", err);
    }); 