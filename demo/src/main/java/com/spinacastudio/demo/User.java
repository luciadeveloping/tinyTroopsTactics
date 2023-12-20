package com.spinacastudio.demo;

public class User {
    int id;
    String name;
    String password;

    public User(){
        id = 0;
        name = "Test user";
        password = "0000000";
    }
    
    public User(int _id, String _name, String _pasword){
        id = _id;
        name = _name;
        password = _pasword;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
