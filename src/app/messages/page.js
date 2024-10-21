'use client'
import { useState, useEffect } from 'react';

export default function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/consumer');
                const data = await res.json();
                setMessages(data.messages || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Kafka Consumer in Next.js</h1>
            {messages.length === 0 ? (
                <p>No messages found</p>
            ) : (
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            {msg.value} (Offset: {msg.offset}, Partition: {msg.partition})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
