package org.morgan.untilmoraleimproves2.controller;

import org.morgan.untilmoraleimproves2.model.Message;
import org.morgan.untilmoraleimproves2.repository.MessageRepository;
import org.morgan.untilmoraleimproves2.service.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MessageController {
    @Autowired
    MessageService messageService;
    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message){
        try {
            Message savedMessage = messageService.save(message);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAllMessages(){
        return ResponseEntity.status(HttpStatus.OK).body(messageService.findAll());
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Message> deleteMessage(@PathVariable Long id) {
        Optional<Message> messageOpt = messageService.findById(id);
        if (messageOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Message message = messageOpt.get();
        messageService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @PatchMapping("/messages/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable Long id, @RequestBody Message updates){
        Optional<Message> messageOpt = messageService.findById(id);
        if (messageOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Message existingMessage = messageOpt.get();

        if (updates.getMessage() !=null) {
            existingMessage.setMessage(updates.getMessage());
        }

        Message patchedMessage = messageService.save(existingMessage);
        return ResponseEntity.status(HttpStatus.OK).body(patchedMessage);
    }
}
