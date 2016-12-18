import java.net.UnknownHostException;
import java.util.concurrent.TimeUnit;

public class MainFunct {

	public static void main(String[] args) throws UnknownHostException, InterruptedException {
		Server server = new Server();
		server.startServer();
		String data = "hello world";
		while(true) {
			System.out.println("sending:" + data);
			server.sendAll(data);
			TimeUnit.SECONDS.sleep(1);//send message every second
		}
	}
}