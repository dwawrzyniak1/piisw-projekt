package pwr.piisw.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.dtos.song.SongQueryInfo;
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
    public Optional<Song> getSong(SongQueryInfo songQueryInfo) {
        Optional<Song> storedSong = songRepository.findByTitleAndArtist(songQueryInfo.getTitle(), songQueryInfo.getArtist());
        return storedSong.isPresent()
            ? storedSong
            : scrapeAndStore(songQueryInfo);
    }

    private Optional<Song> scrapeAndStore(SongQueryInfo songQueryInfo) {
        Optional<Song> song = retrieveSongFromGenius(songQueryInfo);
        song = song.flatMap(s -> emptyOnSongsMismatch(songQueryInfo, s));
        song.ifPresent(songRepository::save);
        return song;
    }

    private Optional<Song> retrieveSongFromGenius(SongQueryInfo songQueryInfo) {
        Optional<GeniusSongInfo> songInfoOptional = proxy.searchForSong(songQueryInfo.toString());

        if (songInfoOptional.isPresent()) {
            GeniusSongInfo songInfo = songInfoOptional.get();
            String lyrics = scraper.scrapeLyrics(songInfo.getGeniusUrl(), 5);

            Song song = Song.builder()
                    .title(songInfo.getTitle())
                    .artist(songInfo.getArtist())
                    .album(songQueryInfo.getAlbum()) // It is much easier to get album from request
                    .photoUlr(songInfo.getPhotoUrl())
                    .geniusLyrics(lyrics).build();

            return Optional.of(song);
        }

        return Optional.empty();
    }

    private Optional<Song> emptyOnSongsMismatch(SongQueryInfo request, Song retrieved) {
        if (request.doesMatchWithSong(retrieved)) {
            return Optional.of(retrieved);
        }
        return Optional.empty();
    }

}
