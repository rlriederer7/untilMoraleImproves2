package org.morgan.untilmoraleimproves2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.morgan.untilmoraleimproves2.model.Message;

public interface MessageRepository extends JpaRepository<Message,Long> {
}
