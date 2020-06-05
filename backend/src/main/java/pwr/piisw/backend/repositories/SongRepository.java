package pwr.piisw.backend.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.entities.Song;

public interface SongRepository extends PagingAndSortingRepository<Song, Long> {
}
