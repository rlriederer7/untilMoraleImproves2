package org.morgan.untilmoraleimproves2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.morgan.untilmoraleimproves2.repository.MessageRepository;
import org.morgan.untilmoraleimproves2.model.Message;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message save(Message message){
        return messageRepository.save(message);
    }

    public List<Message> findAll() {
        return messageRepository.findAll();
    }

    public Optional<Message> findById(Long id){
        return messageRepository.findById(id);
    }

    public void deleteById(Long id) {
        messageRepository.deleteById(id);
    }
}
