package pwr.piisw.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.dtos.song.SongBasicInfo;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.entities.User;
import pwr.piisw.backend.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody String username) {
        User user = service.registerUser(username);
        return ResponseEntity.ok(user.getUsername());
    }

    @GetMapping(path = "/{username}/favourites")
    public List<SongBasicInfo> getPaginatedFavourites(
        @PathVariable("username") String username,
        Pageable pageable
    ) {
        return service.getFavouritesPaginated(username, pageable);
    }

    @GetMapping(path = "/{username}/checked")
    public List<SongBasicInfo> getLatestCheckedSongs(
        @PathVariable("username") String username,
        Pageable pageable
    ) {
        return service.getLatestCheckedSongsPaginated(username, pageable);
    }

}
