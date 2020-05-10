package pwr.piisw.spotifylyrics

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController("/api")
class Rest {

    @GetMapping("/hello")
    fun greetings(): String = "Hejka!"

}