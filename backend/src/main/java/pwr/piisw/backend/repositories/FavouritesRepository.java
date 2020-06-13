package pwr.piisw.backend.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.entities.Favourite;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.entities.User;

import java.util.List;
import java.util.Optional;

public interface FavouritesRepository extends PagingAndSortingRepository<Favourite, Long> {
    List<Favourite> findAllByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    Optional<Favourite> findBySongAndUser(Song song, User user);
}
