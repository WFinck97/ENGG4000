import { IConfig, DefaultConfig } from "../config";
import * as Kafka from "node-rdkafka";
import { ON_DEATH } from "./index";

const ERR_TOPIC_ALREADY_EXISTS = 36;

let config: IConfig = new DefaultConfig();
let producer: Kafka.Producer | undefined;

export function setConfig(_config: IConfig) {
    config = _config;
}

export async function ensureTopicExists(options: {topic?: string, numPartitions?: number, replicationFactor?: number }) {
    const adminClient = Kafka.AdminClient.create({
        'bootstrap.servers': config.kafkaServer,
        'sasl.username': config.kafkaUsername,
        'sasl.password': config.kafkaPassword,
        'security.protocl': config.kafkaSecurityProtocol,
        'sasl.mechanisms': config.kafkaSASLMechanism
    })

    return new Promise((resolve, reject) => {
        adminClient.createTopic({
            topic: options.topic || config.kafkaTopic,
            num_partitions: options.numPartitions || 1,
            replication_factor: options.replicationFactor || 3,
            config: {},
        }, (err: any)  => {
            if (!err) {
                console.log(`Created topic ${options.topic || config.kafkaTopic}`);
                return resolve();
            }
            if (err.code == ERR_TOPIC_ALREADY_EXISTS) {
                return resolve();
            }
            return reject(err);
        })
    })
}

function defaultDeliveryReport(err: any, report: any) {
    if (err) {
        console.warn('Error producing', err)
    } else {
        const {topic, partition, value} = report;
        console.log(`Successfully produced report to topic ${topic} partition ${partition} ${value}`);
    }
}

export function  createProducer(): Promise<Kafka.Producer> {
    producer = new Kafka.Producer({
        'bootstrap.servers': config.kafkaServer,
        'sasl.username': config.kafkaUsername,
        'sasl.password': config.kafkaPassword,
        'security.protocol': config.kafkaSecurityProtocol,
        'sasl.mechanisms': config.kafkaSASLMechanism,
        'dr_msg_cb': true
    })
    return new Promise((resolve, reject) => {
        //@ts-ignore
        producer.on('ready', () => {
            console.log(`producer connected to kafka\n`);
            ON_DEATH(() => {
                console.log("flushing kafka producers queue...")
                //@ts-ignore
                if (producer.isConnected()) {
                    //@ts-ignore
                    producer.flush(10000, () => {
                        //@ts-ignore
                        producer.disconnect();
                        console.log('flush complete, disconnection kafka producer...');
                    })
                }
            });
            resolve(producer)
        })
            .on('delivery-report', defaultDeliveryReport)
            .on('event.error', (err) => {
                console.warn('event.error', err);
                reject(err);
            });
        //@ts-ignore
        producer.connect();
    });
}

export async function getProducer(): Promise<Kafka.Producer>  {
    return producer || createProducer()
}
