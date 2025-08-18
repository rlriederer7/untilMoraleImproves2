import { messageService } from '../services/messageService';
import { useState } from "react";

export const useMessages = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    const retrieveMessages = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await messageService.getAllMessages();
            const messageData = await response.data;
            setMessages(messageData);
        } catch (error){
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    const generateMessage = async (messageData) => {

        try{
            await messageService.createMessage(messageData);
            await retrieveMessages();
            return { success: true };
        } catch (error) {
            console.error('Error creating user: ', error)
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const eradicateMessage = async (messageId) => {

        try{
            await messageService.deleteMessage(messageId);
            await retrieveMessages();
            return { success: true };
        } catch (error) {
            console.error('Error creating user: ', error)
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        error,
        retrieveMessages,
        generateMessage,
        eradicateMessage,
    };

}