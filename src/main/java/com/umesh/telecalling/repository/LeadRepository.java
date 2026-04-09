package com.umesh.telecalling.repository;

import com.umesh.telecalling.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Lead, Long> {
}