package com.spinacastudio.demo;

public class User {
    String name;
    String password;

    public User(){}
    
    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }
    public void setName(String newName){
        name = newName;
    }

    public String getPassword(){
        return password;
    }

    public String ToString(){
        return "USER : Name: " + name + ", Password:" + password;
    }
}
