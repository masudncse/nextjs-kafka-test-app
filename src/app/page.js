'use client'
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    try {
      const res = await fetch('/api/producer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.message || 'Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('Failed to send message');
    }
  };

  return (
      <div style={{ padding: '20px' }}>
        <h1>Kafka Producer in Next.js</h1>
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
        />
        <button onClick={handleSendMessage}>Send to Kafka</button>
        {response && <p>{response}</p>}
      </div>
  );
}
