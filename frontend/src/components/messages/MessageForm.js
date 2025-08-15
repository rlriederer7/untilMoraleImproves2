import React from 'react';

const MessageForm = ({ newMessage, setNewMessage, onSubmit, loading }) => {
    return (
        <form onSubmit={onSubmit} style={{margin: '20px'}}>
            <div>
                <input
                    type="text"
                    placeholder="Message"
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                    style={{margin: '5px', padding: '5px'}}
                    disabled={loading}
                />
            </div>
            <button type="submit" style={{margin: '5px', padding: '5px'}} disabled={loading}>
                {loading ? 'Posting...' : 'Post Message'}
            </button>
        </form>
    )
}

export default MessageForm;