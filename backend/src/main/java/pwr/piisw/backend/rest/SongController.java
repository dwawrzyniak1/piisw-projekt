package pwr.piisw.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pwr.piisw.backend.dtos.SongRequest;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.repositories.SongRepository;
import pwr.piisw.backend.services.GeniusProxyService;
import pwr.piisw.backend.services.LyricsScraperService;

import javax.transaction.Transactional;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class SongController {

    private final GeniusProxyService proxy;
    private final LyricsScraperService scraper;
    private final SongRepository repository;

    @PostMapping("/song")
    @Transactional // lyrics are stored as lob in db
    public Song getSong(@RequestBody SongRequest songRequest) {
        Optional<Song> storedSong = repository.findByTitleAndArtist(songRequest.getTitle(), songRequest.getArtist());

        if (storedSong.isEmpty()) {
            Optional<Song> song = retrieveSongFromGenius(songRequest);
            song = song.flatMap(s -> emptyOnSongsMismatch(songRequest, s));
            song.ifPresent(repository::save);
            return song.orElse(null);
        }

        return storedSong.get();
    }

    private Optional<Song> emptyOnSongsMismatch(SongRequest request, Song retrieved) {
        if (request.doesMatchWithSong(retrieved)) {
            return Optional.of(retrieved);
        }
        return Optional.empty();
    }

    private Optional<Song> retrieveSongFromGenius(SongRequest songRequest) {
        Optional<GeniusSongInfo> songInfoOptional = proxy.searchForSong(songRequest.toString());

        if (songInfoOptional.isPresent()) {
            GeniusSongInfo songInfo = songInfoOptional.get();
            String lyrics = scraper.scrapeLyrics(songInfo.getGeniusUrl(), 5);

            Song song = Song.builder()
                    .title(songInfo.getTitle())
                    .artist(songInfo.getArtist())
//   TODO                 .album(songRequest.getAlbum()) // It is much easier to get album from request
                    .photoUlr(songInfo.getPhotoUrl())
                    .geniusLyrics(lyrics).build();

            return Optional.of(song);
        }

        return Optional.empty();
    }

}
