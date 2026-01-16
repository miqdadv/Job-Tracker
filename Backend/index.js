import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import useRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import trackerRoute from "./routes/tracker.route.js";
dotenv.config({});

const app = express();

// app.get("/", (req, res) => {
//   return res
//     .status(200)
//     .json({ message: "Welcome to API of Job Tracker Application",
//      timeStamp: new Date().toISOString(),
//      success: true
//      });
// });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

const PORT = process.env.PORT || 5001;

// API's
app.use("/api/user", useRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);
app.use("/api/tracker", trackerRoute); 

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});


// import express from "express";
// import cookieParser from "cookie-parser";
// // import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import useRoute from "./routes/user.routes.js";
// import companyRoute from "./routes/company.route.js"; 
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

// dotenv.config();

// const app = express();

// /* =======================
//    CORS — MUST BE FIRST
// ======================= */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://elodia-histographic-dubitably.ngrok-free.dev"
// ];

// // Main CORS middleware
// app.use((req, res, next) => {
//    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   console.log('Headers:', req.headers);
//   const origin = req.headers.host;
//   console.log("headers: ", req.headers);
// //   console.log("headers: ", req);
// //   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
// //   }
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, X-Access-Token, X-XSRF-TOKEN, Cookie, Set-Cookie');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Expose-Headers', 'set-cookie, Set-Cookie');
  
//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }
  
//   next();  
// });

// /* =======================
//    BODY & COOKIE PARSERS
// ======================= */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// /* =======================
//    ROUTES
// ======================= */
// app.use("/api/user", useRoute);
// app.use("/api/company", companyRoute);
// app.use("/api/job", jobRoute);
// app.use("/api/application", applicationRoute);

// /* =======================
//    SERVER
// ======================= */
// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });
