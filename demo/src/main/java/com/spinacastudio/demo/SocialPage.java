package com.spinacastudio.demo;

import java.io.*;
import java.util.List;
import java.util.ArrayList;

public class SocialPage {
    private static final String USERS_FILE = "users.ser"; // Serialized objects file
    List<User> users;

    public SocialPage(){
        users = new ArrayList<>();
        deserializeUsers(); // Load user list
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
        serializeUsers();
        return true;
    }

    public boolean ContainsUserName(String name){
        for (User u : users) { 
            if(name.equals(u.getName())) return true;
        }
        return false;
    }

    public void UpdateName(User user, String newName){
        //User u = GetUser(oldName);
        user.setName(newName);
        serializeUsers();
    }

    public boolean CheckPasswordForUser(String n, String p){
        return GetUser(n).getPassword().equals(p);
    }

    public boolean CheckPasswordForUser(User user, String p){
        return user.getPassword().equals(p);
    }

    public boolean TryRemoveUser(User user){
        //if(!ContainsUserName(user)) return false;
        if (!RemoveUser(user)) return false;
        serializeUsers();
        return true;
    }

    private boolean RemoveUser(User user){
        var bool = users.remove(user);
        return bool;
    }

    private void RemoveUser(String name){
        for(int i = 0; i < users.size(); i++){
            if(name.equals(users.get(i).getName())){
                users.remove(i);
                serializeUsers();
                return;
            }
        }
    }

    // DESERIALIZE USER LIST
    @SuppressWarnings("unchecked")
    private void deserializeUsers() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(USERS_FILE))) {
            users = (List<User>) ois.readObject();
        } catch (FileNotFoundException e) {
            // File not found, start with empty list
            users = new ArrayList<>();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            users = new ArrayList<>();
        }
    }

    // SERIALIZE USER LIST
    private void serializeUsers() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(USERS_FILE))) {
            oos.writeObject(users);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}