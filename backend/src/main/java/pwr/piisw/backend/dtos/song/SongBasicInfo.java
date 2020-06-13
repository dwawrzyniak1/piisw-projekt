package pwr.piisw.backend.dtos.song;

import lombok.Data;
import pwr.piisw.backend.entities.Song;

@Data
public class SongBasicInfo {
    long id;
    String title;
    String artist;
    String album;
    String photoUrl;

    public SongBasicInfo(Song song) {
        this.id = song.getId();
        this.title = song.getTitle();
        this.artist = song.getArtist();
        this.album = song.getAlbum();
        this.photoUrl = song.getPhotoUlr();
    }
}