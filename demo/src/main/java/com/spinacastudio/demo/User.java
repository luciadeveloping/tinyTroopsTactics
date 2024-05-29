package com.spinacastudio.demo;

import java.io.Serializable;

public class User implements Serializable {
    // To ensure serialization
    private static final long serialVersionUID = 1L;
    
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

    @Override
    public String toString(){
        return "USER : Name: " + name + ", Password:" + password;
    }
}
