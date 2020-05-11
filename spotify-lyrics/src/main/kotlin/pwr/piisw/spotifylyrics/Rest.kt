package pwr.piisw.spotifylyrics

import org.springframework.web.bind.annotation.*

@RestController
class Rest(val userRepository: UserRepository) {

    @PostMapping("/user")
    fun addUser(@RequestBody username: String) = userRepository.save(User(username = username))

    @GetMapping("/user")
    fun getAllUsers(): MutableList<User> = userRepository.findAll()

    @GetMapping("/user/{username}")
    fun getByUsername(@RequestParam("username") username: String) = userRepository.findByUsername(username)
}