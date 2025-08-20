package org.morgan.untilmoraleimproves2.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="message")
public class Message {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long messageId;
    private String message;
    @CreationTimestamp
    private LocalDateTime timePostedMoment;
    private Long userId;

    public Long getMessageId() {return messageId;}
    public String getMessage() {return message;}
    public LocalDateTime getTimePostedMoment() {return timePostedMoment;}
    public Long getUserId() {return userId;}

    public void setMessage(String message) {this.message = message;}
}
