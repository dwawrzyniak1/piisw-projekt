package pwr.piisw.backend.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@Entity
public class Checked {
    @Id
    long id;
    @ManyToOne
    User user;
    @ManyToOne
    Song song;
    Date createdAt;
}
