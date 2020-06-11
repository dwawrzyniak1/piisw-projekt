package pwr.piisw.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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
    public User registerUser(@RequestBody String username) {
        return service.registerUser(username);
    }

    @GetMapping(path = "/{username}/favourites", params = {"page", "size"})
    public List<Song> getPaginatedFavourites(
        @PathVariable("username") String username,
        @RequestParam("page") int page,
        @RequestParam("size") int size
    ) {
        return service.getFavouritesPaginated(username, page, size);
    }

    @GetMapping(path = "/{username}/checked", params = {"page", "size"})
    public List<Song> getLatestCheckedSongs(
        @PathVariable("username") String username,
        @RequestParam("page") int page,
        @RequestParam("size") int size
    ) {
        return service.getLatestCheckedSongsPaginated(username, page, size);
    }

}
