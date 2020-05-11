package pwr.piisw.spotifylyrics

import org.springframework.data.jpa.repository.JpaRepository
import javax.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue var id: Long = 0,
    @Column(unique = true) val username: String,
    @ManyToMany
    @JoinTable(name = "favourites")
    var favourites: MutableList<Song> = ArrayList()
)

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): User?
}

@Entity
data class Song(
    @Id @GeneratedValue val id: Long = 0,
    val title: String,
    val artistName: String,
    val genre: String = "",
    val language: String = "",
    val lyrics: String = "", // TODO: need to be check if it should be mapped to some CLOB or something
    @ManyToMany(mappedBy = "favourites")
    val likedBy: MutableList<User> = ArrayList()
)

interface SongRepository : JpaRepository<Song, Long>