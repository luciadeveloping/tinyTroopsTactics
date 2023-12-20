package com.spinacastudio.demo;

public class Message {
    int id;
    String content;
    User user;

    public Message(){
        id = 0;
        content = "Test Message";
        user = new User();
    }

    public Message(int _id, String _content, User _user){
        id = _id;
        content = _content;
        user = _user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
