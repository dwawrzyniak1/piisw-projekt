package pwr.piisw.backend.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Checked {
    @Id
    long id;
    @ManyToOne
    @NonNull User user;
    @ManyToOne
    @NonNull Song song;
    long counter;
    @NonNull Date createdAt;
    @NonNull Date updatedAt;

    public Checked updateCounterAndDate() {
        this.setCounter(this.counter + 1);
        this.setUpdatedAt(new Date());
        return this;
    }
}
