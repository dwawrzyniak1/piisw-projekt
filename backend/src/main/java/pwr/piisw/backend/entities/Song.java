package pwr.piisw.backend.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@Entity
public class Song {
    @Id
    long id;
    String title;
    String artist;
    String album;
    String photoUlr;
    long geniusId;
    String language;
    @OneToMany(mappedBy = "favouriteSong")
    Set<Favourite> likedBy;
}
