import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

function App() {

    const [buttonMessage, setButtonMessage] = useState("Clicky!")
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({messageId:'',message:'',timePostedMoment:''})
    const [loading, setLoading] = useState(false);

    const fetchMessages = async () => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:8080/api/messages');
            const messageData = await response.json();
            setMessages(messageData);
            setButtonMessage(`There are ${messageData.length} messages`);
        } catch (error){
            setButtonMessage('An error occurred: ' + error.message);
        }
        setLoading(false);
    }

//    useEffect(() => {
//        fetchUsers();
//    }, []);

    const createMessage = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:8080/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(newMessage)
            });

            if (response.ok){
                setNewMessage({messageId:'',message:'',timePostedMoment:''})
                fetchMessages();
            }

        } catch (error){
            console.error('Error creating user:', error)
        }
    }

    return (
        <div className="App-header">
            <header className="App-header">
                <h1>React App 1</h1>
                <p>{buttonMessage}</p>

                <form onSubmit={createMessage} style={{margin: '20px'}}>
                    <div>
                        <input
                            type="text"
                            placeholder="Message"
                            value={newMessage.message}
                            onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                            style={{margin: '5px', padding: '5px'}}
                        />
                    </div>
                    <button type="submit" style={{margin: '5px', padding: '5px'}}>
                        Post Message
                    </button>
                </form>

                <button onClick={fetchMessages} disabled={loading}>
                    {loading ? 'Loading' : 'Load Messages'}
                </button>


                <div style={{marginTop: '20px'}}>
                    {messages.map(message => (
                        <div key={message.message} style={{border: '1px solid white', margin: '10px', padding: '10px'}}>
                            <h3>{message.message}</h3>
                            <p>{message.timePostedMoment}</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
);
}

export default App;
