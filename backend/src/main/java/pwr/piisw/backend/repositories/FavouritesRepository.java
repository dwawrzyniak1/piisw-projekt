package pwr.piisw.backend.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.entities.Favourite;

public interface FavouritesRepository extends PagingAndSortingRepository<Favourite, Long> {
}
