package com.spinacastudio.demo;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class UserFileHandler {

    // Ruta del archivo donde se almacenarán los usuarios
    private static final String FILE_PATH = "users.txt";

    // Escribe la lista de usuarios en el archivo
    public static void writeUsers(List<User> users) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_PATH))) {
            // Se utiliza ObjectOutputStream para escribir la lista de usuarios en el archivo
            oos.writeObject(users);
        } catch (IOException e) {
            e.printStackTrace(); // Imprime cualquier excepción ocurrida durante la escritura
        }
    }

    // Lee la lista de usuarios desde el archivo
    @SuppressWarnings("unchecked")
    public static List<User> readUsers() {
        List<User> users = new ArrayList<>();

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_PATH))) {
            // Se utiliza ObjectInputStream para leer la lista de usuarios desde el archivo
            Object obj = ois.readObject();
            
            // Verifica si el objeto leído es una lista y la asigna a la variable 'users'
            if (obj instanceof List) {
                users = (List<User>) obj;
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace(); // Imprime cualquier excepción ocurrida durante la lectura
        }

        return users;
    }
}
