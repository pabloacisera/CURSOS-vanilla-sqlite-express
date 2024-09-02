import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import  userRoutes  from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "http:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      // Permitir la carga de archivos HTML
      frameSrc: ["'self'"], // Permitir iframes si es necesario
    },
  })
);

// Routes
app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
