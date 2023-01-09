import express from "express";
import cors from "cors";
import apiRouters from "./routes/index";
import morgan from "morgan";
import { initIO } from "./utils/socket";
import bodyParser from "body-parser";
import uploadConfig from "./utils/upload";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL as string, "http://localhost:3001"],
  })
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/public/images", express.static(uploadConfig.directory));

app.use(apiRouters);

const PORT = (process.env.BACKEND_PORT as string) || 8070;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

initIO(server);
