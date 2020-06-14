package pwr.piisw.backend.services;

import org.springframework.stereotype.Service;
import pwr.piisw.backend.dtos.song.SongQueryInfo;

import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

@Service
public class Supervisor {

    private ConcurrentHashMap<SongQueryInfo, Boolean> isSongScraped;

    public Supervisor() {
        this.isSongScraped = new ConcurrentHashMap<>();
    }

    public <T> T performSupervised(SongQueryInfo queryInfo, Supplier<T> supplier) throws InterruptedException {
        if (isSongScraped.getOrDefault(queryInfo, false)) {
            waitForFinish(queryInfo);
        }
        isSongScraped.put(queryInfo, true);
        T result = supplier.get();
        isSongScraped.remove(queryInfo);
        return result;
    }

    private void waitForFinish(SongQueryInfo queryInfo) throws InterruptedException {
        while (isSongScraped.getOrDefault(queryInfo, false)) {
            Thread.sleep(50);
        }
    }

}
