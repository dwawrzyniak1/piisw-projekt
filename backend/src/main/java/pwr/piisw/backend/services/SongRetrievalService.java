package pwr.piisw.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.dtos.requests.SongInfo;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.repositories.SongRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SongRetrievalService {

    private final GeniusProxyService proxy;
    private final LyricsScraperService scraper;
    private final SongRepository songRepository;

    @Transactional // lyrics are stored as lob in db
    public Optional<Song> getSong(SongInfo songInfo) {
        Optional<Song> storedSong = songRepository.findByTitleAndArtist(songInfo.getTitle(), songInfo.getArtist());
        return storedSong.isPresent()
            ? storedSong
            : scrapeAndStore(songInfo);
    }

    private Optional<Song> scrapeAndStore(SongInfo songInfo) {
        Optional<Song> song = retrieveSongFromGenius(songInfo);
        song = song.flatMap(s -> emptyOnSongsMismatch(songInfo, s));
        song.ifPresent(songRepository::save);
        return song;
    }

    private Optional<Song> retrieveSongFromGenius(SongInfo songRequest) {
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

    private Optional<Song> emptyOnSongsMismatch(SongInfo request, Song retrieved) {
        if (request.doesMatchWithSong(retrieved)) {
            return Optional.of(retrieved);
        }
        return Optional.empty();
    }

}
