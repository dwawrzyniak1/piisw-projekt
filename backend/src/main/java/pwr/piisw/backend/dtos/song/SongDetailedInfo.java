package pwr.piisw.backend.dtos.song;

import lombok.Value;
import pwr.piisw.backend.entities.Song;

@Value
public class SongDetailedInfo {
    long id;
    String title;
    String artist;
    String album;
    String photoUrl;
    String lyrics;

    public SongDetailedInfo(Song song) {
        this.id = song.getId();
        this.title = song.getTitle();
        this.artist = song.getArtist();
        this.album = song.getAlbum();
        this.photoUrl = song.getPhotoUlr();
        this.lyrics = song.getGeniusLyrics();
    }
}
