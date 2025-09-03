import React from 'react';

const MessageList = ({ messages, loading, onLoadMessages, onDeleteMessage }) => {
    return (
        <div>
            <button onClick={onLoadMessages} disabled={loading}>
                {loading ? 'Loading...' : 'Load Messages'}
            </button>

            <div style={{marginTop: '20px'}}>
                {messages.map(message => (
                    <div key={message.messageId} style={{border: '1px solid white', margin: '10px', padding: '10px'}}>
                        <h3>{message.message}</h3>
                        <p>{message.timePostedMoment}</p>
                        <button type="delete" style={{margin: '5px', padding: '5px'}} disabled={loading} onClick = {() => onDeleteMessage(message.messageId)}>
                            {loading ? 'Deleting...' : 'Delete Message'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessageList;