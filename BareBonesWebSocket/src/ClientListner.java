import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.bind.DatatypeConverter;

public class ClientListner implements Runnable{
	private List<Socket> connections;
	private int port;
	private boolean bool = true;
	
	ClientListner(List<Socket> connectionsext, int portext) {
		connections = connectionsext;
		port = portext;
	}
	
   private Thread t;
   private String threadName = "ClientListner";

   public void start() {
      System.out.println("Starting " +  threadName );
      if (t == null) {
         t = new Thread(this, threadName);
         t.start();
      }
   }
   
   public void stop() {
	   bool = false;
   }
   
   public void run() {
	   while(bool) {
		   try {
			   ServerSocket server = new ServerSocket(port);
	
			   System.out.println("\n\nServer has started on localhost:" + server.getLocalPort() + ".\r\nWaiting for a connection...\nConnectionsList: " + connections);
			   Socket tempCon = server.accept();
			   connections.add(tempCon);
		
			   System.out.println("--->A client connected<---");
			   System.out.println(tempCon);
			   
			   InputStream in = tempCon.getInputStream();
		
			   OutputStream out = tempCon.getOutputStream();
			   
			   String data = new Scanner(in,"UTF-8").useDelimiter("\\r\\n\\r\\n").next();
		
			   Matcher get = Pattern.compile("^GET").matcher(data);
		
			   if (get.find()) {
			   	Matcher match = Pattern.compile("Sec-WebSocket-Key: (.*)").matcher(data);
			       match.find();
			       byte[] response = ("HTTP/1.1 101 Switching Protocols\r\n"
			               + "Connection: Upgrade\r\n"
			               + "Upgrade: websocket\r\n"
			               + "Sec-WebSocket-Accept: "
			               + DatatypeConverter
			               .printBase64Binary(
			                       MessageDigest
			                       .getInstance("SHA-1")
			                       .digest((match.group(1) + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
			                               .getBytes("UTF-8")))
			               + "\r\n\r\n")
			               .getBytes("UTF-8");
		
			       out.write(response, 0, response.length);
			   }
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

	   }
   }
}
