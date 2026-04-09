// package com.umesh.telecalling.controller;

// import com.umesh.telecalling.model.Lead;
// import com.umesh.telecalling.repository.LeadRepository;
// import org.springframework.web.bind.annotation.*;

// import java.time.LocalDateTime;
// import java.util.List;

// @RestController
// @RequestMapping("/api")
// @CrossOrigin
// public class LeadController {

//     private final LeadRepository repo;

//     public LeadController(LeadRepository repo) {
//         this.repo = repo;
//     }

//     @PostMapping("/leads")
//     public List<Lead> uploadLeads(@RequestBody List<Lead> leads) {
//         for (Lead lead : leads) {
//             lead.setStatus("Pending");
//             lead.setLastCall(LocalDateTime.now());
//         }
//         return repo.saveAll(leads);
//     }

//     @PutMapping("/leads/{id}/status")
//     public Lead updateStatus(@PathVariable Long id, @RequestParam String status) {
//         Lead lead = repo.findById(id).orElseThrow();
//         lead.setStatus(status);
//         return repo.save(lead);
//     }

//     @GetMapping("/leads")
//     public List<Lead> getLeads() {
//         return repo.findAll();
//     }
// }


package com.umesh.telecalling.controller;

import com.umesh.telecalling.model.Lead;
import com.umesh.telecalling.repository.LeadRepository;
import com.umesh.telecalling.service.OllamaService; // ✅ ADDED
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LeadController {

    private final LeadRepository repo;
    private final OllamaService aiService; // ✅ ADDED

    // ✅ UPDATED CONSTRUCTOR (DO NOT WORRY — Spring handles it)
    public LeadController(LeadRepository repo, OllamaService aiService) {
        this.repo = repo;
        this.aiService = aiService;
    }

    // ================= EXISTING API (UNCHANGED) =================
    @PostMapping("/leads")
    public List<Lead> uploadLeads(@RequestBody List<Lead> leads) {
        for (Lead lead : leads) {
            lead.setStatus("Pending");
            lead.setLastCall(LocalDateTime.now());
        }
        return repo.saveAll(leads);
    }

    // ================= EXISTING API (UNCHANGED) =================
    @PutMapping("/leads/{id}/status")
    public Lead updateStatus(@PathVariable Long id, @RequestParam String status) {
        Lead lead = repo.findById(id).orElseThrow();
        lead.setStatus(status);
        return repo.save(lead);
    }

    // ================= EXISTING API (UNCHANGED) =================
    @GetMapping("/leads")
    public List<Lead> getLeads() {
        return repo.findAll();
    }

    // ================= NEW AI API (ADDED) =================
    @PostMapping("/ai-process")
public List<Lead> processLeads() {

    List<Lead> leads = repo.findAll();

    for (Lead lead : leads) {

        String aiResponse = aiService.generateResponse(lead.getName());

        System.out.println("🔥 AI RESPONSE: " + aiResponse);

        // 🔥 THIS LINE IS MUST
        lead.setAiMessage(aiResponse);

        String lower = aiResponse.toLowerCase();

        if (lower.contains("interested")) {
            lead.setStatus("interested");
        } else if (lower.contains("callback")) {
            lead.setStatus("callback");
        } else {
            lead.setStatus("not-interested");
        }

        lead.setLastCall(LocalDateTime.now());
    }

    return repo.saveAll(leads);
}
}