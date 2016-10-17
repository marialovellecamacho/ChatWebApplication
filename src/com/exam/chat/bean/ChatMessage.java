package com.exam.chat.bean;

public class ChatMessage {

	private String username;
	private String message;
	private String type = "message";
	
	public ChatMessage() {
		
	}
	
	public ChatMessage(String username, String message, String type) {
		this.username = username;
		this.message = message;
		this.type = type;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}
