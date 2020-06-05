package pwr.piisw.backend.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id String username;
    String language;
    @OneToMany(mappedBy = "user")
    Set<Favourite> favourites;
}
