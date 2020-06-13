package pwr.piisw.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.entities.Checked;
import pwr.piisw.backend.entities.Favourite;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.entities.User;
import pwr.piisw.backend.exceptions.UserNotFoundException;
import pwr.piisw.backend.repositories.CheckedRepository;
import pwr.piisw.backend.repositories.FavouritesRepository;
import pwr.piisw.backend.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CheckedRepository checkedRepository;
    private final FavouritesRepository favouritesRepository;

    public User registerUser(String username) {
        Optional<User> userOptional = userRepository.findById(username);
        return userOptional.orElseGet(() -> userRepository.save(new User(username)));
    }

    @Transactional
    public List<Song> getFavouritesPaginated(String username, int page, int size) {
        User user = getUserOrThrow(username);
        Pageable pageable = PageRequest.of(page, size);
        return favouritesRepository.findAllByUserOrderByCreatedAtDesc(user, pageable).stream()
                .map(Favourite::getFavouriteSong)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Song> getLatestCheckedSongsPaginated(String username, int page, int size) {
        User user = getUserOrThrow(username);
        Pageable pageable = PageRequest.of(page, size);
        return checkedRepository.findAllByUserOrderByUpdatedAtDesc(user, pageable).stream()
                .map(Checked::getSong)
                .collect(Collectors.toList());
    }

    private User getUserOrThrow(String username) {
        Optional<User> userOptional = userRepository.findById(username);
        return userOptional
                .orElseThrow(() -> new UserNotFoundException(String.format("User %s not found in database", username)));
    }

}
