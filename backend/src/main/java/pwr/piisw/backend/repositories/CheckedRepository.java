package pwr.piisw.backend.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.entities.Checked;

public interface CheckedRepository extends PagingAndSortingRepository<Checked, Long> {
}
