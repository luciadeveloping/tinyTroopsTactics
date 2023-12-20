package com.spinacastudio.demo;

public class User {
    private long id;
	private String name;
    private int victories;

    public User() {
    }

    public User(String newName) {
        name = newName;
        victories = 0;
    }

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setDescription(String name) {
		this.name = name;
	}

    public int getVictories() {
        return victories;
    }

    public void setVictories(int victories) {
        this.victories = victories;
    }
	
	@Override
	public String toString() {
		return "User [id =" + id + ", name =" + name + ", victories =" + victories + "]";
	}
}
