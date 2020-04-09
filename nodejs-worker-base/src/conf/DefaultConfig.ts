//dotenv is needed to allow nodejs to access .env variables
import * as  dotenv from "dotenv";
dotenv.config();
import { _throw } from "../util";

export interface IConfig {
    kafkaServer: string;
    kafkaTopic: string;
    kafkaSecurityProtocol: string;
    kafkaUsername: string;
    kafkaPassword: string;
    kafkaSASLMechanism: string;
    kafkaDefaultGroup: string;
}
export class DefaultConfig implements IConfig {
    kafkaServer: string;
    kafkaTopic: string;
    kafkaSecurityProtocol: string;
    kafkaUsername: string;
    kafkaPassword: string;
    kafkaSASLMechanism: string;
    kafkaDefaultGroup: string;
    constructor() {
        //@ts-ignore
        this.kafkaTopic = process.env.KAFKA_TOPIC || _throw("KAFKA_TOPIC not defined");
        //@ts-ignore
        this.kafkaServer = process.env.KAFKA_BOOTSRAP || _throw("KAFKA_TOPIC not defined");
        //@ts-ignore
        this.kafkaSecurityProtocol = process.env.KAFKA_SECURITY_PROTOCOL || _throw("KAFKA_TOPIC Protocol not defined");
        //@ts-ignore
        this.kafkaUsername = process.env.KAFKA_SASL_USERNAME || _throw("KAFKA_TOPIC not defined");
        //@ts-ignore
        this.kafkaPassword = process.env.KAFKA_SASL_PASSWORD || _throw("KAFKA_TOPIC not defined");
        //@ts-ignore
        this.kafkaSASLMechanism = process.env.KAFKA_SASL_MECHANISM || _throw("KAFKA_TOPIC Mechanism not defined");
        //@ts-ignore
        this.kafkaDefaultGroup = process.env.KAFKA_DEFAULT_GROUP || _throw("KAFKA_TOPIC Group not defined");
    }

}