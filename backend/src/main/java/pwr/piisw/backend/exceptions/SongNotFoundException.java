package pwr.piisw.backend.exceptions;

public class SongNotFoundException extends RuntimeException {

    public SongNotFoundException(String message) {
        super(message);
    }
}