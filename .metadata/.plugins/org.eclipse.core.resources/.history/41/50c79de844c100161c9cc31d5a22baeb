import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class Server {
	public List<Socket> connections = new ArrayList<Socket>();
    
	public void startListening(int port) {//port=0 for any that is available
		ClientListner listner = new ClientListner(connections, port);
		listner.start();
	}
}
