package pwr.piisw.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Song {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String title;
    String artist;
    String album;
    String photoUlr;
    @Lob
    String geniusLyrics;
    String spotifyUri;
    int releaseYear;
    @OneToMany(mappedBy = "favouriteSong")
    Set<Favourite> likedBy;
}
