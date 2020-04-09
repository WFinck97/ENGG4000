//dotenv is needed to allow nodejs to access .env variables
import * as  dotenv from "dotenv";
dotenv.config();
import { _throw } from "../util";

const missingEnv = ", make sure you have it defined in your .env file in the root directory";

export interface IConfig {
    //Mongodb Config
    mongoUser: string;
    mongoPassword: string;
    mongoHost: string;
    mongoDefaultDatabase: string;

    //Kafka Config
    kafkaServer: string;
    kafkaTopic: string;
    kafkaSecurityProtocol: string;
    kafkaUsername: string;
    kafkaPassword: string;
    kafkaSASLMechanism: string;
    kafkaDefaultGroup: string;
}
export class DefaultConfig implements IConfig {
    //Mongodb Config
    mongoUser: string;
    mongoPassword: string;
    mongoHost: string;
    mongoDefaultDatabase: string;
    //Kafka Config
    kafkaServer: string;
    kafkaTopic: string;
    kafkaSecurityProtocol: string;
    kafkaUsername: string;
    kafkaPassword: string;
    kafkaSASLMechanism: string;
    kafkaDefaultGroup: string;
    constructor() {
        //@ts-ignore
        this.mongoHost = process.env.MDB_HOST || _throw("MDB_HOST not defined" + missingEnv);
        //@ts-ignore
        this.mongoUser = process.env.MDB_USER || _throw("MDB_USER not defined" + missingEnv);
        //@ts-ignore
        this.mongoPassword = process.env.MDB_PASSWORD || _throw("MDB_PASSWORD not defined" + missingEnv);
        //@ts-ignore
        this.mongoDefaultDatabase = process.env.MDB_DATABASE || _throw("MDB_DATABASE not defined" + missingEnv);
        //@ts-ignore
        this.kafkaTopic = process.env.KAFKA_TOPIC || _throw("KAFKA_TOPIC not defined" + missingEnv);
        //@ts-ignore
        this.kafkaServer = process.env.KAFKA_BOOTSRAP || _throw("KAFKA_BOOTSRAP not defined");
        //@ts-ignore
        this.kafkaSecurityProtocol = process.env.KAFKA_SECURITY_PROTOCOL || _throw("KAFKA_SECURITY_PROTOCOL not defined" + missingEnv);
        //@ts-ignore
        this.kafkaUsername = process.env.KAFKA_SASL_USERNAME || _throw("KAFKA_SASL_USERNAME not defined" + missingEnv);
        //@ts-ignore
        this.kafkaPassword = process.env.KAFKA_SASL_PASSWORD || _throw("KAFKA_SASL_PASSWORD not defined" + missingEnv);
        //@ts-ignore
        this.kafkaSASLMechanism = process.env.KAFKA_SASL_MECHANISM || _throw("KAFKA_SASL_MECHANISM not defined" + missingEnv);
        //@ts-ignore
        this.kafkaDefaultGroup = process.env.KAFKA_DEFAULT_GROUP || _throw("KAFKA_DEFAULT_GROUP not defined" + missingEnv);
    }

}