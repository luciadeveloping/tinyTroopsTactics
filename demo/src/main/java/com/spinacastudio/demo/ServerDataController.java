package com.spinacastudio.demo;

import java.net.InetAddress;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/serverData")
public class ServerDataController {

    ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/serverIP")
    public String getMethodName() {
        return GetHostIP();
    }
    
    private String GetHostIP(){
        String serverIP;
        try {
            serverIP = InetAddress.getLocalHost().getHostAddress();

        } catch (Exception e) {
            e.printStackTrace();
            serverIP = "Couldn't get Server IP.";
        }

        return serverIP;
    }
}
