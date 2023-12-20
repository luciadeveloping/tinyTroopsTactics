package com.spinacastudio.demo;

import java.util.List;
import java.util.ArrayList;


public class SocialPage {
    
    List<Message> chatLog;

    public SocialPage(){
        chatLog = new ArrayList<Message>();
    }

    public List<Message> getChatLog() {
        return chatLog;
    }

    public void addMessage(Message message){
        chatLog.add(message);
    }

}
