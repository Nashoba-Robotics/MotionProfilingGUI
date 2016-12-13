import java.io.IOException;
import java.security.NoSuchAlgorithmException;

public class MainFunct {

	public static void main(String[] args) throws NoSuchAlgorithmException, IOException {
		Server mainServer = new Server();
		mainServer.startListening(0);//0 for any available port
	}

}
