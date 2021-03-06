import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class Server extends WebSocketServer{
	
	public Server() throws UnknownHostException {
		
	}
	
	private ArrayList<WebSocket> connections = new ArrayList<WebSocket>();

	public int getConNum() {
		return connections.size();
	}
	
	public WebSocket getCon(int i) {
		if(i < connections.size())
			return connections.get(i);
		else
			return null;
	}
	
	public void sendAll(String data) {
		if(connections.size() > 0) {
			for(int i = 0; i < connections.size(); i++) {
				//System.out.println(i + '-' + connections.size());
				connections.get(i).send(data);
			}
		}
	}
	
	public void sendInPnt(String inputName, int val, int time) {
		//send a point that will be parsed by javascript client
		String data = "{"
				+ "\"proto\":\"singlPnt\","
				+ "\"input\":\"" + inputName
				+ "\",\"value\":" + val
				+ ",\"time\":" + time
				+ "}";
		sendAll(data);
	}
	
	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		//Handle new connection here
		System.out.println("client connected");
		connections.add(conn);
	}
 
	@Override
	public void onMessage(WebSocket conn, String message) {
		//Handle client received message here
		//send a message back:
		conn.send("message recieved:" + message + "\n\tFrom:" + conn);
	}
 
	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		//Handle closing connection here
		System.out.println("connection closed by:" + conn + "\n\tCode:" + code + "because:" + reason + "\n\tRemote:" + remote);
		if(connections.contains(conn)) {
			connections.remove(connections.indexOf(conn));
		}
	}
 
	@Override
	public void onError(WebSocket conn, Exception exc) {
		//Handle error during transport here
		conn.close(0);
		System.out.println("Connection:" + conn + " closed\n\texc:" + exc);
	}
	
	public void startServer() {
		super.start();
		InetSocketAddress address = new InetSocketAddress("MPGUI", 1768);
		super.setAddress(address);
		System.out.println("Server running on-->\n-port number: " + super.getPort() + "\n-address/" + super.getAddress() + "\n-Server=" + super.toString());
	}
}
