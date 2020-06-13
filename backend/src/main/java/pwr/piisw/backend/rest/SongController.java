package pwr.piisw.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.dtos.requests.SongCheckRequest;
import pwr.piisw.backend.entities.Favourite;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.services.SongCrudService;
import pwr.piisw.backend.services.SongRetrievalService;

import java.util.Optional;

@RestController
@RequestMapping("/song")
@RequiredArgsConstructor
public class SongController {

    private final SongRetrievalService retrievalService;
    private final SongCrudService crudService;

    @PostMapping
    public Song checkSongDetails(@RequestBody SongCheckRequest songCheck) {
        Optional<Song> song = retrievalService.getSong(songCheck.getSong());
        song.ifPresent(s -> crudService.markAsChecked(s, songCheck.getUsername()));
        return song.orElse(null);
    }

    @PostMapping("/{songId}")
    public Favourite markAsFavourite(@PathVariable Long songId, @RequestBody String username) {
        return crudService.markAsFavourite(songId, username);
    }
}
