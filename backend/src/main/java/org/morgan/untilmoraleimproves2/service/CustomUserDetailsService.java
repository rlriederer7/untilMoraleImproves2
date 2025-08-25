package org.morgan.untilmoraleimproves2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.morgan.untilmoraleimproves2.repository.UserRepository;
import org.morgan.untilmoraleimproves2.model.User;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.User.UserBuilder;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private org.morgan.untilmoraleimproves2.service.UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("User by that name not found: " + username));

        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(username);
        builder.password(user.getPassword());
        builder.roles("USER");

        return builder.build();

    }


}