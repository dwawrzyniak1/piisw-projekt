package pwr.piisw.backend.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.entities.Checked;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.entities.User;

import java.util.List;
import java.util.Optional;

public interface CheckedRepository extends PagingAndSortingRepository<Checked, Long> {
    List<Checked> findAllByUserOrderByUpdatedAtDesc(User user, Pageable pageable);

    Optional<Checked> findByUserAndSong(User user, Song song);
}
