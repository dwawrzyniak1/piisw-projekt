package pwr.piisw.backend.dtos.inbound;

import lombok.Value;
import pwr.piisw.backend.dtos.song.SongQueryInfo;

@Value
public class SongDetailsRequest {
    String username;
    SongQueryInfo song;
}
