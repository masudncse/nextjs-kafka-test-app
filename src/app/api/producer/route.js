import { Kafka } from 'kafkajs';

// Create a new Kafka client and producer
const kafka = new Kafka({
    clientId: 'nextjs-app',
    brokers: ['localhost:9092'], // Your Kafka broker(s)
});

const producer = kafka.producer();

export async function POST(req) {
    try {
        const { message } = await req.json();

        // Connect the producer
        await producer.connect();

        // Send message to Kafka
        await producer.send({
            topic: 'nextjs-topic',
            messages: [{ value: message }],
        });

        // Disconnect the producer
        await producer.disconnect();

        return new Response(
            JSON.stringify({ success: true, message: 'Message sent to Kafka' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending message to Kafka:', error);
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to send message' }),
            { status: 500 }
        );
    }
}
