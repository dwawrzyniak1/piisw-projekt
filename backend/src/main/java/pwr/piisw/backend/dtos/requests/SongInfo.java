package pwr.piisw.backend.dtos.requests;

import lombok.NonNull;
import lombok.Value;
import pwr.piisw.backend.entities.Song;

@Value
public class SongInfo {
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

    public boolean doesMatchWithSong(Song song) {
        return title.equals(song.getTitle())
            && artist.equals(song.getArtist());
    }
}
