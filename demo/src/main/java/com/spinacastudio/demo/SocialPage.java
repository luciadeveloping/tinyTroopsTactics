package com.spinacastudio.demo;

import java.util.List;
import java.util.ArrayList;


public class SocialPage {
    
    List<Message> chatLog;
    List<User> users;

    public SocialPage(){
        chatLog = new ArrayList<Message>();
        users = new ArrayList<User>();
    }

    public List<Message> getChatLog() {
        return chatLog;
    }

    public List<User> getUsers(){
        return users;
    }

    public void addMessage(Message message){
        chatLog.add(message);
    }

    public void addUser(User user){
        users.add(user);
    }

    public User removeUser(int id){
        for (User user : users) {
            if(user.id == id){
                return user;
            }
        }
        return null;
    }

}
