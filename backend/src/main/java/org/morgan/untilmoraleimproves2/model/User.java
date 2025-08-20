package org.morgan.untilmoraleimproves2.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="users")
public class User {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    @CreationTimestamp
    private LocalDateTime accountCreationMoment;

    public Long getUserId() {return userId;}
    public String getUserName() {return userName;}
    public LocalDateTime getAccountCreationMoment() {return accountCreationMoment;}

    public void setUserName(String userName) {this.userName = userName;}
}
