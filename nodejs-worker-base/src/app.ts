import { DefaultConfig} from "./conf";
import { createConsumer } from "./util";
import * as Kafka from "node-rdkafka"
var ON_DEATH = require('death')({uncaughtException: true, debug: true }) ;

let config = new DefaultConfig();

function _process(data: Kafka.ConsumerStreamMessage) {
    console.log("Data received: ", data.value.toString());
}

async function main() {
    const consumer = await createConsumer(config);
    console.log("Connecting...");
    await consumer.connect();
    ON_DEATH(() => {
        console.log('\nDisconnecting consumer...');
        consumer.disconnect();
    });
    console.log(`Kafka consumer connected to ${config.kafkaServer} \nGroup: ${config.kafkaDefaultGroup}\nTopic: ${config.kafkaTopic}\n`);
    consumer.on('ready', () => {
        consumer.subscribe([config.kafkaTopic]);
        consumer.consume();
    }).on('data', _process);

}

main();
