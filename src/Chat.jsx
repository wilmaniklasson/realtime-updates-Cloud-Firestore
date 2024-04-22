import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './data/firebase-config';
import './Chat.css'; 

const Chat = () => {
    // state lokalt
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // useEffect för att hantera för att hämta meddelanden
    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp')); // Hämta meddelanden ordnade efter tid
        const unsubscribe = onSnapshot(q, (snapshot) => { // Lyssnar på realtidsuppdateringar för meddelande hämtningen
            const loadedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text,
                timestamp: doc.data().timestamp.toDate().toLocaleString() // Formaterar timestamp till en sträng
            }));
            setMessages(loadedMessages);
        });

        return () => unsubscribe(); // Rensar uppkopplingen när komponenten avmonteras
    }, []);

    // Funktion för att skicka ett nytt meddelande
    const sendMessage = async () => {
        if (message !== '') { // Kontrollerar om meddelandefältet inte är tomt
            await addDoc(collection(db, 'messages'), {
                text: message,
                timestamp: new Date() // Datum och tid för meddelandet
            });
            setMessage(''); // Rensar input-fältet efter att meddelandet skickats
        }
    };

    return (
        <div>
            <div className='chat-container'> 
                {messages.map(msg => (
                    <div className="speech-bubble" key={msg.id}>
                        <span className="timestamp">{msg.timestamp}</span> 
                        <span className="message">{msg.text}</span> 
                    </div>
                ))}
            </div>
            <input
                className='message-input'
                value={message}
                onChange={e => setMessage(e.target.value)} 
                type="text"
                placeholder="Write a message..." 
            />
            <button className="send-message-btn" onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
