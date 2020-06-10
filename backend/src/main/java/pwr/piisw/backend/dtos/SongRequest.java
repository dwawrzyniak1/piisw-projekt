package pwr.piisw.backend.dtos;

import lombok.NonNull;
import lombok.Value;

@Value
public class SongRequest {
    @NonNull String title;
    String artist;
    String album;
    public String toString() {
        return title
            + nonNullString(artist)
            + nonNullString(album);
    }
    private String nonNullString(String str) {
        return str == null ? "" : " " + str;
    }
}
