import mongoose = require("mongoose");
import { IConfig, DefaultConfig } from "../config";
import { ON_DEATH } from "./index";

let config = new DefaultConfig();

let _mongoose: mongoose.Mongoose | undefined;

export function setConfig(_config: IConfig) {
    config = _config;
}

async function createConnection(): Promise<mongoose.Connection> {
    let uri =
        "mongodb+srv://" +
        config.mongoUser +
        ":" +
        config.mongoPassword+
        "@" +
        config.mongoHost;
    ON_DEATH(() => {
        disconnect();
    })
	return new Promise((resolve,reject) => {
	     mongoose.connect(uri, {
            dbName: config.mongoDefaultDatabase,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
         mongoose.connection.on("connecting", () => {
            console.log("initiating mongoose connection")
         })
             .on("connected", () => {
                 console.log("mongoose connection created");
                 resolve(mongoose.connection)
             })
             .on("disconnected", () => console.warn("mongoose connection closed"))
             .on("reconnected", () => console.log("reconnecting to mongo"))
             .on("error", (err) => {
                 console.error(err);
                 reject(err);
             })
    })
}

export async function connect(): Promise<mongoose.Connection> {
    if (!_mongoose) {
        console.log("creating new mongo connection")
        return await createConnection();
    } else if (_mongoose.connection.readyState === 1) {
        console.log("defined mongo connected closed, reconnecting");
        return await createConnection();
    } else {
        return _mongoose.connection;
    }
}

export async function disconnect() {
    if (_mongoose && _mongoose.connection.readyState === 1) {
        console.log(`disconnecting from mongodb...`);
        await _mongoose.disconnect();
        console.log('mongodb disconnected');
    }
}
