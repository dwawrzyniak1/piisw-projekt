package pwr.piisw.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.dtos.inbound.SongDetailsRequest;
import pwr.piisw.backend.dtos.outbound.SongDetailsResponse;
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
    public ResponseEntity<SongDetailsResponse> checkSongDetails(@RequestBody SongDetailsRequest songDetailsRequest) {
        Optional<Song> song = retrievalService.getSong(songDetailsRequest.getSong());
        song.ifPresent(s -> crudService.markAsChecked(s, songDetailsRequest.getUsername()));
        Optional<SongDetailsResponse> responseBody = song.map(s -> new SongDetailsResponse(s, songDetailsRequest.getUsername()));
        return responseBody.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body(new SongDetailsResponse("Couldn't find song within Genius resources")));
    }

    @PostMapping("/{songId}")
    public ResponseEntity<String> markAsFavourite(@PathVariable Long songId, @RequestBody String username) {
        crudService.markAsFavourite(songId, username);
        return ResponseEntity.ok("succeed");
    }
}
