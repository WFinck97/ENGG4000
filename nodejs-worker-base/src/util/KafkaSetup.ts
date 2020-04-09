import { IConfig } from "../conf"
import * as Kafka from "node-rdkafka"



export async function createConsumer(config: IConfig): Promise<Kafka.KafkaConsumer> {
    return new Kafka.KafkaConsumer({
        'bootstrap.servers': config.kafkaServer,
        'sasl.username': config.kafkaUsername,
        'sasl.password': config.kafkaPassword,
        'security.protocol': config.kafkaSecurityProtocol,
        'sasl.mechanisms': config.kafkaSASLMechanism,
        'group.id': config.kafkaDefaultGroup
    }, {
        'auto.offset.reset': 'earliest'
    })
}