import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import accountRoutes from "./routes/accountRoutes.js";
import fetchRoutes from "./routes/fetchRoutes.js";
import serialNoRoutes from "./routes/serialNoRoutes.js";
import b2bRoutes from "./routes/b2bRoutes.js";
import scriptRoutes from "./scripts/routes/scriptRoutes.js";
import operationRoutes from "./routes/operationRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import analyticRoutes from "./routes/analyticRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import dotenv from "dotenv";

const referrer_domain = "https://onthecard.me";
const referrer_domain_ca = "https://onthecard.co";
const support_domain = "https://otckythuat.web.app";
const app = express();

// app.all("/*", (req, res, next) => {
//   const condition = req.get("origin");
//   if (
//     condition === referrer_domain ||
//     condition === support_domain ||
//     condition === referrer_domain_ca
//   ) {
//     next();
//   } else {
//     res.send({ message: "Invalid Request" });
//   }
// });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/internal", operationRoutes);
app.use("/accountOTC", accountRoutes);
app.use("/fetchOTC", fetchRoutes);
app.use("/serialNo", serialNoRoutes);
app.use("/b2b", b2bRoutes);
app.use("/runScript", scriptRoutes);
app.use("/techsupport", supportRoutes);
app.use("/email", emailRoutes);
app.use("/analytic", analyticRoutes);
app.use("/features", featureRoutes);

const CONNECTION_URL = process.env.DB_CONNECT;
// const CONNECTION_URL = process.env.DB_CONNECT_CA;
const PORT = process.env.PORT || 8080;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
