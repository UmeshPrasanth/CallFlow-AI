package com.umesh.telecalling.controller;

import com.umesh.telecalling.model.Campaign;
import com.umesh.telecalling.repository.CampaignRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CampaignController {

    private final CampaignRepository repo;

    public CampaignController(CampaignRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/campaign")
    public Campaign createCampaign(@RequestBody Campaign campaign) {
        return repo.save(campaign);
    }

    @GetMapping("/campaigns")
    public List<Campaign> getAllCampaigns() {
        return repo.findAll();
    }
}