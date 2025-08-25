package org.morgan.untilmoraleimproves2.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@Entity
@Table(name="users")
public class User {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String userName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @CreationTimestamp
    private LocalDateTime accountCreationMoment;

    public Long getUserId() {return userId;}
    public String getUserName() {return userName;}
    public String getPassword() {return password;}
    public LocalDateTime getAccountCreationMoment() {return accountCreationMoment;}

    public void setUserName(String userName) {this.userName = userName;}
    public void setPassword(String password) {this.password = password;}

    public User() {}

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

}