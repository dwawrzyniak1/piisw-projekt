package pwr.piisw.backend.dtos.song;

import lombok.NonNull;
import lombok.Value;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;

import java.util.Arrays;

@Value
public class SongQueryInfo {
    @NonNull String title;
    @NonNull String artist;
    @NonNull String album;
    @NonNull String spotifyUri;
    @NonNull String spotifyPhotoUlr;
    @NonNull int releaseYear;

    public String toString() {
        return joinArguments(" ", title, artist);
    }

    private String joinArguments(String separator, String... arguments) {
        return Arrays.stream(arguments)
                .reduce("", (acc, next) -> acc + separator + next)
                .strip();
    }

    public boolean doesMatchWithGeniusResponse(GeniusSongInfo song) {
        return title.equalsIgnoreCase(song.getTitle())
            && artist.equalsIgnoreCase(song.getArtist());
    }
}
