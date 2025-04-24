import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect.js";
import userRoutes from "./routes/userRoutes.js"
import storeRoutes from './routes/storeRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishfavsRoutes from "./routes/wishfavsRoutes.js";
import storeLayoutRoutes from "./routes/storeLayoutRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import {notFound} from "./middlewares/errorHandling.js";
import {errorHandler} from "./middlewares/errorHandling.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));


app.use('/api/auth', authRoutes);

// Session setup (required for Passport to work)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/api", (req, res, next) => {
  console.log('Facebook App ID:', process.env.FACEBOOK_APP_ID);
  console.log('Facebook App Secret:', process.env.FACEBOOK_APP_SECRET);
  console.log('Good app ID:', process.env.GOOGLE_CLIENT_ID);
  console.log('Google App Secret:', process.env.GOOGLE_CLIENT_SECRET);
  next()
}, (req, res) => {
    res.json({ "fruits": ["apple", "orange"] });
});

app.use("/api/user", userRoutes);
app.use('/api/stores', storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishfavs", wishfavsRoutes)
app.use("/api/layouts", storeLayoutRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

