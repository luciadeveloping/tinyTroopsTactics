package com.spinacastudio.demo;

import java.util.List;
import java.util.ArrayList;


public class SocialPage {
    
    List<User> users;

    public SocialPage(){
        users = new ArrayList<User>();
    }

    public List<User> getUsers(){
        return users;
    }

    public User GetUser(String name){
        for (User user : users) {
            if(name.equals(user.getName())) return user;
        }
        return null;
    }

    public boolean TryAddUser(User user){

        if(ContainsUserName(user.getName())) return false; // If a user exists with the same name return error.

        users.add(user);
        return true;
    }

    public boolean ContainsUserName(String name){
        for (User u : users) { 
            if(name.equals(u.getName())) return true;
        }
        return false;
    }

    public void UpdateName(String oldName, String newName){
        User u = GetUser(oldName);
        u.setName(newName);
    }

    public boolean CheckPasswordForUser(String n, String p){
        return GetUser(n).getPassword().equals(p);
    }

    public boolean TryRemoveUser(String name){
        if(!ContainsUserName(name)) return false;

        RemoveUser(name);
        return true;
    }

    private void RemoveUser(String name){
        for(int i = 0; i < users.size(); i++){
            if(name.equals(users.get(i).getName())){
                users.remove(i);
            }
        }
    }
}
