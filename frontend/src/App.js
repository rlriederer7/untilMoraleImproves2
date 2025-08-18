import './App.css';
import React, {useState} from "react";
import MessageForm from './components/messages/MessageForm';
import MessageList from './components/messages/MessageList';
import { useMessages } from "./hooks/useMessages";

function App() {
    const [newMessage, setNewMessage] = useState({messageId:'',message:'',timePostedMoment:''})

    const { messages, loading, error, retrieveMessages, generateMessage, eradicateMessage } = useMessages();

    // Mild awkwardness, move somewhere else if rate of kludging is high.
    const buttonMessage = error || (messages.length > 0 ? `There are (${messages.length}) messages` : "Clicky!");

    const handleCreateMessage = async (e) => {
        e.preventDefault();
        const success = await generateMessage(newMessage);
        if (success) {
            setNewMessage({messageId:'', message:'', timePostedMoment:''});
        }
    };

//    useEffect(() => {
//        fetchUsers();
//    }, []);

    return (
        <div className="App-header">
            <header className="App-header">
                <h1>React App 1</h1>
                <p>{buttonMessage}</p>

                <MessageForm
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    onSubmit={handleCreateMessage}
                    loading={loading}
                />

                <MessageList
                    messages={messages}
                    loading={loading}
                    onLoadMessages={retrieveMessages}
                    onDeleteMessage={eradicateMessage}
                />

            </header>
        </div>
);
}

export default App;
