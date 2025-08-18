import React, {useState} from "react";

const MessageForm = ({ newMessage, setNewMessage, onSubmit, loading }) => {
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setValidationError('');

        if (!newMessage.message || newMessage.message.trim() === '') {
            setValidationError('Please enter a message before posting.');
            return;
        }

        onSubmit(e);
    };

    const handleMessageChange = (e) => {
        setNewMessage({...newMessage, message: e.target.value});
        if (validationError) {
            setValidationError('');
        }
    };

    return (
        <div>
            {validationError && (
                <div style={{
                    color: 'red',
                    margin: '10px',
                    padding: '10px',
                    border: '1px solid red',
                    borderRadius: '4px',
                    backgroundColor: '#ffebee'
                }}>
                    {validationError}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{margin: '20px'}}>
                <div>
                    <input
                        type="text"
                        placeholder="Message"
                        value={newMessage.message}
                        onChange={handleMessageChange}
                        style={{margin: '5px', padding: '5px'}}
                        disabled={loading}
                    />
                </div>
                <button type="submit" style={{margin: '5px', padding: '5px'}} disabled={loading}>
                    {loading ? 'Posting...' : 'Post Message'}
                </button>
            </form>
        </div>
    )
}

export default MessageForm;