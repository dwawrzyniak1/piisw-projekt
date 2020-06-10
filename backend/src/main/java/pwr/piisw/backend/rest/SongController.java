package pwr.piisw.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pwr.piisw.backend.dtos.SongRequest;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.exceptions.GeniusScrapingException;
import pwr.piisw.backend.repositories.SongRepository;
import pwr.piisw.backend.services.GeniusProxyService;
import pwr.piisw.backend.services.LyricsScraperService;

@RestController
@RequiredArgsConstructor
public class SongController {

    private final GeniusProxyService proxy;
    private final LyricsScraperService scraper;
    private final SongRepository repository;

    @PostMapping("/song")
    public Song getSong(@RequestBody SongRequest param) throws GeniusScrapingException {
        GeniusSongInfo songInfo = proxy.searchForSong(param.toString()).get();
        String lyrics = scraper.scrapeLyrics(songInfo.getGeniusUrl(), 5);
        return Song.builder()
                .title(songInfo.getTitle())
                .artist(songInfo.getArtist())
                .photoUlr(songInfo.getPhotoUrl())
                .geniusLyrics(lyrics).build();
    }

}
