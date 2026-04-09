package com.umesh.telecalling.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class OllamaService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResponse(String name) {

        String url = "http://localhost:11434/api/generate";

        Map<String, Object> request = Map.of(
                "model", "llama3",
                "prompt",
                "Act as a tele-calling agent.\n" +
                "Customer name: " + name + ".\n" +
                "Generate:\n" +
                "1. Short call message\n" +
                "2. Final decision (only one word: interested / callback / not-interested)\n" +
                "Format:\nmessage: ...\nstatus: ...",
                "stream", false
        );

        Map response = restTemplate.postForObject(url, request, Map.class);

        return response.get("response").toString();
    }
}