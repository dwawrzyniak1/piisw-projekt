package pwr.piisw.backend.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Favourite {
    @Id
    long id;
    @ManyToOne
    @JoinColumn
    @NonNull User user;
    @ManyToOne
    @JoinColumn
    @NonNull Song favouriteSong;
    @NonNull Date createdAt;
}
