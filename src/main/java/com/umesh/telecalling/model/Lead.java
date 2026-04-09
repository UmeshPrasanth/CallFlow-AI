// package com.umesh.telecalling.model;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// public class Lead {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String aiMessage;
//     private String name;
//     private String phone;
//     private String status;
//     private LocalDateTime lastCall;
//     private LocalDateTime followUp;

//     public Lead() {}

//     public Long getId() { return id; }
//     public String getName() { return name; }
//     public String getPhone() { return phone; }
//     public String getStatus() { return status; }
//     public LocalDateTime getLastCall() { return lastCall; }
//     public LocalDateTime getFollowUp() { return followUp; }

//     public void setName(String name) { this.name = name; }
//     public void setPhone(String phone) { this.phone = phone; }
//     public void setStatus(String status) { this.status = status; }
//     public void setLastCall(LocalDateTime lastCall) { this.lastCall = lastCall; }
//     public void setFollowUp(LocalDateTime followUp) { this.followUp = followUp; }
    
// }

package com.umesh.telecalling.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private String status;

    private String aiMessage; // 🔥 AI message

    private LocalDateTime lastCall;
    private LocalDateTime followUp;

    public Lead() {}

    // ================= GETTERS =================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }

    public String getAiMessage() {
        return aiMessage;
    }

    public LocalDateTime getLastCall() {
        return lastCall;
    }

    public LocalDateTime getFollowUp() {
        return followUp;
    }

    // ================= SETTERS =================

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAiMessage(String aiMessage) {   // 🔥 IMPORTANT
        this.aiMessage = aiMessage;
    }

    public void setLastCall(LocalDateTime lastCall) {
        this.lastCall = lastCall;
    }

    public void setFollowUp(LocalDateTime followUp) {
        this.followUp = followUp;
    }
}