import express from "express"
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./config/dbConnection.js";
import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js"
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors"
import {apiLimiter} from "./middleware/rateLimiter.js";
import logger from "./utils/logger.js";
import otpRoute from "./routes/otp.js";
import fs from "fs"
// creating an instance of express server
const app = express();
dotenv.config();

// defining port
const PORT = process.env.PORT || 5000;
if (process.env.ENV === "development") {
   app.use(morgan('dev'));
}

// integrate morgan into winston
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));

app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message}`);
    res.status(err.status || 500).json({ error: err.message });
}); // integrate winston into express

// defining the root endpoint/route
app.get('/', (req, res) => {
    res.send("Welcome to Danny's Kitchen");
});

// 
app.use(express.json());

// 
app.use(cors());

// configure server to serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// configure uploads via env variable (for the use of Render disk mount path feature when in production)
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)){
    fs.mkdirSync(UPLOADS_DIR, {recursive: true});
}
app.use("/uploads", express.static(UPLOADS_DIR))

// DEFINE ROUTE
app.use( "/api/user", apiLimiter, userRoutes );
app.use("/api/recipe", recipeRoutes);
app.use("/api/otp", otpRoute);


// directory for client build files
const clientBuildPath = path.join(__dirname, "..", "..", "FRONTEND", "build");//React
const clientDistPath = path.join(__dirname, "..", "..", "FRONTEND", "dist");//Vite

// conditionally serve client build files if in production
if (process.env.ENV === "production") {
    if (fs.existsSync(clientBuildPath)) {
        app.use(express.static(clientBuildPath));

        app.get("*", (req, res) => {
            res.sendFile(path.join(clientBuildPath, "index.html"));
        });
    } else if (fs.existsSync(clientDistPath)) {
        app.use(express.static(clientDistPath));
        app.get("*", (req, res) => {
            res.sendFile(path.join(clientDistPath, "index.html"));
        });
    } else {
        console.warn("No client build files found to serve.");
    }
}

// call your app to listen to a port
    dbConnection()

    .then( () => {
        console.log("Database is connected");
         app.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}`);
    });   
})

.catch((err) => {
    console.log(`An error occurred while connecting to database: ${err}`);
});