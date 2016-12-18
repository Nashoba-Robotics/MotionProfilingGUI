import java.net.UnknownHostException;
import java.util.concurrent.TimeUnit;

public class MainFunct {

	public static void main(String[] args) throws UnknownHostException, InterruptedException {
		Server server = new Server();
		server.startServer();
		while(true) {
			server.sendInPnt("test", 1, 2);
			TimeUnit.SECONDS.sleep(1);//send message every second
		}
	}
}