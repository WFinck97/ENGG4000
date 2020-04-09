import express from "express";
import bodyParser from "body-parser";
import { mongoDB } from "./util";
import {ON_DEATH} from "./util";
//create mongodb connection
mongoDB.connect();

import indexRouter from "./routes/index";

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: debug middleware
app.use(function (req, res, next) {
	console.log("=".repeat(64));
	console.log("\x1b[36m", req.headers["x-forwarded-for"] || req.connection.remoteAddress, "\x1b[0m");
	console.log("-".repeat(64));
	console.log(req.body);
	console.log("=".repeat(64) + "\n");
	next();
});

app.use("/", indexRouter);

let application = app.listen(20001, function(){
	console.log(Infinity + " app listening on port 20001!");
});

ON_DEATH(() => {application.close()});