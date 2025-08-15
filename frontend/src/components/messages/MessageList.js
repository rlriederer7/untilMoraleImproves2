import React from 'react';

const MessageList = ({ messages, loading, onLoadMessages }) => {
    return (
        <div>
            <button onClick={onLoadMessages} disabled={loading}>
                {loading ? 'Loading...' : 'Load Messages'}
            </button>

            <div style={{marginTop: '20px'}}>
                {messages.map(message => (
                    <div key={message.message} style={{border: '1px solid white', margin: '10px', padding: '10px'}}>
                        <h3>{message.message}</h3>
                        <p>{message.timePostedMoment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessageList;