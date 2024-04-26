import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSantize from "express-mongo-sanitize";
import "express-async-errors";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRouters from "./routes/userRoutes.js";
import errorMiddleware from "./middelwares/errorMiddleware.js";
import jobsRoutes from "./routes/jobsRoute.js";

dotenv.config();

connectDB();
// swagger api config
// swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    severs: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerDoc(options);
const app = express();

app.use(helmet());
app.use(xss());
app.use(mongoSantize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRouters);
app.use("/api/v1/job", jobsRoutes);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.MODE} mode on the port ${PORT}`.bgCyan
      .white
  );
});
