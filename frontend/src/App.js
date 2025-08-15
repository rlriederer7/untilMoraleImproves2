import './App.css';
import React, {useState} from "react";
import { messageService } from './services/messageService'
import MessageForm from './components/messages/MessageForm';
import MessageList from './components/messages/MessageList';

function App() {

    const [buttonMessage, setButtonMessage] = useState("Clicky!")
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({messageId:'',message:'',timePostedMoment:''})
    const [loading, setLoading] = useState(false);

    const fetchMessages = async () => {
        setLoading(true);
        try{
            const response = await messageService.getAllMessages();
            const messageData = await response.data;
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
            await messageService.createMessage(newMessage);

            setNewMessage({messageId:'',message:'',timePostedMoment:''})
            await fetchMessages();

        } catch (error){
            console.error('Error creating user: ', error)
        }
    }

    return (
        <div className="App-header">
            <header className="App-header">
                <h1>React App 1</h1>
                <p>{buttonMessage}</p>

                <MessageForm
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    onSubmit={createMessage}
                    loading={loading}
                />

                <MessageList
                    messages={messages}
                    loading={loading}
                    onLoadMessages={fetchMessages}
                />



            </header>
        </div>
);
}

export default App;
