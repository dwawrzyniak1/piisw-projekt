package pwr.piisw.backend.exceptions;

public class GeniusScrapingException extends RuntimeException {

    public GeniusScrapingException(String message) {
        super(message);
    }

    public GeniusScrapingException(String message, Throwable cause) {
        super(message, cause);
    }
}
