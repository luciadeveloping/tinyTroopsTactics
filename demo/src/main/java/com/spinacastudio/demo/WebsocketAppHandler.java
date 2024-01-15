package com.spinacastudio.demo;

import java.util.Map;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketExtension;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.util.JSONPObject;

public class WebsocketAppHandler extends TextWebSocketHandler {
    
	private ObjectMapper mapper = new ObjectMapper();
	private WebSocketSession player1Session;
	private WebSocketSession player2Session;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());

		// Assign user to player1 or player2 and send the result back to the session.
		if(player1Session == null){

			player1Session = session;
			SendMessageToSession(session, "SessionId", "1");

		}else if(player2Session == null){

			player2Session = session;
			SendMessageToSession(session, "SessionId", "2");

		}else{
			System.out.println("Ammount of maximum players reached.");
			SendMessageToSession(session, "Error", "Ammount of maximum players reached.");
		}
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		if(session == player1Session) {player1Session = null;}
		else if ( session == player2Session) {player2Session = null;}
		
	}

    @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
		
		//System.out.println("Message received: " + msg.getPayload());
		JsonNode message = mapper.readTree(msg.getPayload()); // Convert to JSON.

		String requestType = message.get("type").asText();
		String contentNode = message.get("content").toString();
		
		if(session == player1Session){
			
			if(player2Session != null){
				
			}

			SendMessageToSession(
				player1Session, 
				requestType, 
				contentNode
				);

		} else if (session == player2Session){

			SendMessageToSession(
				player1Session, 
				requestType, 
				contentNode
			);

		}else{
			System.out.println("An undefined session tried to update input information.");
		}
		
		
	}

	private void SendMessageToSession(
		WebSocketSession session, 
		String type, 
		String content) throws Exception {
			
		session.sendMessage(
		new TextMessage(buildStringedJSON(type, content)));
	}

	private String buildStringedJSON(String type, String content){ // Builds a JSON, returns it as a String
		ObjectNode jsonNode = mapper.createObjectNode();
        jsonNode.put("type", type);
        jsonNode.put("content", content);
		return jsonNode.toString();
	}
}
