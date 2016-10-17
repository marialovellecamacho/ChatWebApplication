package com.exam.chat;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import com.exam.chat.bean.ChatMessage;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
 
/** 
 * @ServerEndpoint gives the relative name for the end point
 * This will be accessed via ws://<server>:<port>/<appname>/echo
 * "echo" is the address to access this class from the server
 */
@ServerEndpoint("/echo/{username}") 
public class ChatServer {
	
	private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<Session>());
	
    /**
     * @OnOpen allows us to intercept the creation of a new session.
     * The session class allows us to send data to the user.
     * In the method onOpen, we'll let the user know that the handshake was 
     * successful.
     */
    @OnOpen
    public void onOpen(@PathParam(value="username") String username, Session session){
        System.out.println("id: " + session.getId() + " has opened a connection"); 
        ObjectMapper mapper = new ObjectMapper();
        try {
        	sessions.add(session);
            for (Session sess : sessions) {
        		if (sess.isOpen()) {
        			ChatMessage msg = new ChatMessage(username, "online", "online");
        			sess.getBasicRemote().sendText(mapper.writeValueAsString(msg));
        		}        	
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
 
    /**
     * When a user sends a message to the server, this method will intercept the message
     * and allow us to react to it. For now the message is read as a String.
     */
    @OnMessage
    public void onMessage(String message, Session session){
    	ObjectMapper mapper = new ObjectMapper();
    	ChatMessage cm = null;
    	
    	try {
			cm = mapper.readValue(message, ChatMessage.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
    	if(cm != null) {
	        System.out.println("Message from " + cm.getUsername() + ": " + cm.getMessage());
	        try {
	        	for (Session sess : sessions) {
	        		if (sess.isOpen())
	        			sess.getBasicRemote().sendText(message);
	            }
	        } catch (IOException ex) {
	            ex.printStackTrace();
	        }
    	}
    }
 
    /**
     * The user closes the connection.
     * 
     * Note: you can't send messages to the client from this method
     */
    @OnClose
    public void onClose(@PathParam(value="username") String username, Session session){
    	ObjectMapper mapper = new ObjectMapper();
        System.out.println(session.getId() + " is now offline.");
        for (Session sess : sessions) {
    		if (sess.isOpen()) {
    			ChatMessage msg = new ChatMessage(username, "offline", "offline");
    			try {
					sess.getBasicRemote().sendText(mapper.writeValueAsString(msg));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
    		}        	
        }
    }
}
