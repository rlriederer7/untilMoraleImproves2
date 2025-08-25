package org.morgan.untilmoraleimproves2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.morgan.untilmoraleimproves2.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserName(String userName);
    boolean existsByUserName(String userName);
}
