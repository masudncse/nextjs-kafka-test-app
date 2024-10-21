import { Kafka } from 'kafkajs';

// Create a new Kafka client and consumer
const kafka = new Kafka({
    clientId: 'nextjs-app',
    brokers: ['localhost:9092'], // Your Kafka broker(s)
});

const consumer = kafka.consumer({ groupId: 'nextjs-group' });

const runConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'nextjs-topic', fromBeginning: true });

    const messages = [];

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            messages.push({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
        },
    });

    return messages;
};

export async function GET() {
    try {
        const messages = await runConsumer();
        return new Response(JSON.stringify({ success: true, messages }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error consuming messages from Kafka:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to consume messages' }),
            { status: 500 }
        );
    }
}

export function POST() {
    return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET' },
    });
}
