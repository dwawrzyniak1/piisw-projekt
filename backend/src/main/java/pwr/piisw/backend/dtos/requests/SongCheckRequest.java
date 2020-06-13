package pwr.piisw.backend.dtos.requests;

import lombok.Value;

@Value
public class SongCheckRequest {
    String username;
    SongInfo song;
}
