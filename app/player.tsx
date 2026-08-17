"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

type Track = {
  title: string;
  artist: string;
  audio: string;
};

const PLAYLISTS: Record<string, Track[]> = {
  "Old Bollywood": [
    {
      title: "Abhi Na Jao Chhod Kar",
      artist: "Mohammed Rafi & Asha Bhosle",
      audio: "/audio/01-abhi-na-jao-chhod-kar.mp3",
    },
    {
      title: "Pal Pal Dil Ke Paas",
      artist: "Kishore Kumar",
      audio: "/audio/02-pal-pal-dil-ke-paas.mp3",
    },
    {
      title: "Tera Mera Pyaar Amar",
      artist: "Lata Mangeshkar",
      audio: "/audio/03-tera-mera-pyaar-amar.mp3",
    },
    {
      title: "Itna Na Mujhse Tu Pyaar Badha",
      artist: "Talat Mahmood & Lata Mangeshkar",
      audio: "/audio/04-itna-na-mujhse-tu-pyaar-badha.mp3",
    },
    {
      title: "Jahan Mein Aesa Kaun Hai",
      artist: "Asha Bhosle",
      audio: "/audio/05-jahan-mein-aesa-kaun-hai.mp3",
    },
    {
      title: "Hum Tere Pyaar Mein",
      artist: "Lata Mangeshkar",
      audio: "/audio/06-hum-tere-pyaar-mein.mp3",
    },
    {
      title: "Yeh Raatein Yeh Mausam",
      artist: "Kishore Kumar & Asha Bhosle",
      audio: "/audio/07-yeh-raatein-yeh-mausam.mp3",
    },
    {
      title: "Aaja Piya Tohe Pyaar Doon",
      artist: "Lata Mangeshkar",
      audio: "/audio/08-aaja-piya-tohe-pyaar-doon.mp3",
    },
    {
      title: "Dekha Ek Khwaab",
      artist: "Lata Mangeshkar & Kishore Kumar",
      audio: "/audio/09-dekha-ek-khwaab.mp3",
    },
    {
      title: "Lag Jaa Gale",
      artist: "Lata Mangeshkar",
      audio: "/audio/10-lag-jaa-gale.mp3",
    },
    {
      title: "Ajeeb Dastaan Hai Yeh",
      artist: "Lata Mangeshkar",
      audio: "/audio/11-ajeeb-dastaan-hai-yeh.mp3",
    },
    {
      title: "Bade Achhe Lagte Hai",
      artist: "Amit Kumar & Kalyani Mitra",
      audio: "/audio/12-bade-achhe-lagte-hai.mp3",
    },
  ],

  "Himachali / पहाड़ी गाने": [
  {
    title: "Chaska",
    artist: "Himachali",
    audio: "/audio/01-chaska.mp3",
  },
  {
    title: "Zhumka Nonstop",
    artist: "Himachali",
    audio: "/audio/02-zhumka-nonstop.mp3",
  },
  {
    title: "Runjhununua",
    artist: "Himachali",
    audio: "/audio/03-runjhunua.mp3",
  },
  {
    title: "Umavatiye",
    artist: "Himachali",
    audio: "/audio/04-umavatiye.mp3",
  },
  {
    title: "Chandramaniye",
    artist: "Himachali",
    audio: "/audio/05-chandramaniye.mp3",
  },
  {
    title: "To Ghati Meri Jhuriye",
    artist: "Himachali",
    audio: "/audio/06-to-ghati-meri-jhuriye.mp3",
  },
  {
    title: "Evergreen Natti",
    artist: "Himachali",
    audio: "/audio/07-evergreen-natti.mp3",
  },
  {
    title: "Mereya Sharabnua",
    artist: "Himachali",
    audio: "/audio/08-mereya-sharabnua.mp3",
  },
  {
    title: "Thekedarnive",
    artist: "Himachali",
    audio: "/audio/09-thekedarnive.mp3",
  },
  {
    title: "Ho Neelma Ho Neelma",
    artist: "Himachali",
    audio: "/audio/10-ho-neelma-ho-neelma.mp3",
  },
  {
    title: "Tera Mera Lagan",
    artist: "Himachali",
    audio: "/audio/11-tera-mera-lagan.mp3",
  },
],

  "New Songs": [],

  "Favorites": [],
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

function Icon({
  name,
  className = "size-5",
}: {
  name: "prev" | "next" | "play" | "pause";
  className?: string;
}) {
  if (name === "prev" || name === "next") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path
          d={
            name === "prev"
              ? "M18 5v14M15 12 6 5v14l9-7Z"
              : "M6 5v14m3-7 9-7v14l-9-7Z"
          }
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      {name === "pause" ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      ) : (
        <path d="M8 5.2v13.6c0 .8.87 1.27 1.53.83l10.2-6.8a1 1 0 0 0 0-1.66l-10.2-6.8A1 1 0 0 0 8 5.2Z" />
      )}
    </svg>
  );
}

function Vinyl({ playing }: { playing: boolean }) {
  return (
    <div className="relative size-20 shrink-0">
      <div
        className="vinyl-record size-full overflow-hidden rounded-full border border-white/15 shadow-[0_8px_28px_rgba(0,0,0,.5)]"
        style={{ animationPlayState: playing ? "running" : "paused" }}
      >
        <div className="absolute inset-[7px] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,#6d4a38,#33221c_48%,#130f0d_100%)]" />
        <div className="absolute inset-[17px] rounded-full border border-white/10 bg-[radial-gradient(circle_at_40%_30%,#b37c57,#5a3728_55%,#241813_100%)] opacity-80" />
        <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#211612] ring-1 ring-white/30" />
        <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7b27a]" />
      </div>
      <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/65 ring-2 ring-white/35" />
    </div>
  );
}

function SeekBar({
  current,
  duration,
  onSeek,
}: {
  current: number;
  duration: number;
  onSeek: (value: number) => void;
}) {
  const percentage = duration ? Math.min(100, (current / duration) * 100) : 0;

  return (
    <div className="group relative h-6 w-full">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-[#e5bf82] shadow-[0_0_10px_rgba(229,191,130,.8)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        aria-label="Seek"
        type="range"
        min="0"
        max={duration || 0}
        step="0.1"
        value={Math.min(current, duration || 0)}
        disabled={!duration}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onSeek(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f2d6a4]"
      />
    </div>
  );
}


  
 export default function Player() {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState("Old Bollywood");

  const TRACKS = PLAYLISTS[selectedPlaylist];

  const audioRef = useRef<HTMLAudioElement>(null);

  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

 const track = useMemo(
  () => TRACKS[trackIndex],
  [TRACKS, trackIndex]
);

  const loadTrack = useCallback(async (index: number, autoplay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextIndex = (index + TRACKS.length) % TRACKS.length;
    setTrackIndex(nextIndex);
    setCurrent(0);
    setDuration(0);
    audio.src = TRACKS[nextIndex].audio;
    audio.load();

    if (autoplay) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }, [TRACKS]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }, []);

  const next = useCallback(() => {
    void loadTrack(trackIndex + 1, true);
  }, [loadTrack, trackIndex]);

  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    void loadTrack(trackIndex - 1, true);
  }, [loadTrack, trackIndex]);

  const seek = useCallback((value: number) => {
    if (audioRef.current) audioRef.current.currentTime = value;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = TRACKS[trackIndex].audio;
    audio.load();

    const onLoaded = () => setDuration(audio.duration);
    const onTime = () => setCurrent(audio.currentTime);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => void loadTrack(trackIndex + 1, true);
    const onError = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [loadTrack, trackIndex]);

  const controls = (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        aria-label="Previous track"
        onClick={previous}
        className="flex size-9 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white active:scale-95"
      >
        <Icon name="prev" className="size-[18px]" />
      </button>
      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={() => void toggle()}
        className="flex size-11 items-center justify-center rounded-full bg-[#f3dfbd] text-[#241812] shadow-[0_6px_20px_rgba(0,0,0,.35)] transition hover:scale-105 active:scale-95"
      >
        <Icon name={playing ? "pause" : "play"} className="size-[18px]" />
      </button>
      <button
        type="button"
        aria-label="Next track"
        onClick={next}
        className="flex size-9 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white active:scale-95"
      >
        <Icon name="next" className="size-[18px]" />
      </button>
    </div>
  );

  const info = (
    <div className="min-w-0">
      <p className="truncate text-[15px] font-semibold leading-tight text-white">{track.title}</p>
      <p className="truncate pt-0.5 text-[12px] text-white/65">{track.artist}</p>
    </div>
  );

  const timeline = (
    <>
      <SeekBar current={current} duration={duration} onSeek={seek} />
      <div className="flex justify-between font-mono text-[10px] tabular-nums text-white/45">
        <span>{formatTime(current)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </>
  );

  return (
    <>
      <video
  autoPlay
  muted
  loop
  playsInline
  className="fixed top-1/2 left-1/2 w-[100vh] h-[100vw] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover opacity-60 -z-10"
  >
  <source
  src="/bg/WhatsApp%20Video%202026-08-17%20at%2010.21.19%20AM.mp4"
  type="video/mp4"
/>
</video>

<audio ref={audioRef} preload="metadata" />
      <div className="hidden items-center rounded-full border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 pr-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,.8),inset_0_1px_0_rgba(255,255,255,.2)] backdrop-blur-3xl backdrop-saturate-[1.7] sm:flex">
        <Vinyl playing={playing} />
        <div className="min-w-0 flex-1 px-4">
          {info}
          <div className="mt-1">{timeline}</div>
        </div>
        {controls}
      </div>
<div className="w-full max-w-3xl mb-4">
  <div className="flex items-center justify-between gap-3">
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-white/50">
        SHARMA TV
      </p>
      <h2 className="text-xl font-bold text-white">
        Music Player
      </h2>
    </div>

    <select
      value={selectedPlaylist}
      onChange={(e) => {
        setSelectedPlaylist(e.target.value);
        setTrackIndex(0);
        setPlaying(false);
      }}
      className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white outline-none backdrop-blur"
    >
      {Object.keys(PLAYLISTS).map((playlist) => (
        <option
          key={playlist}
          value={playlist}
          className="bg-black text-white"
        >
          {playlist}
        </option>
      ))}
    </select>
  </div>
</div>
      <div className="flex flex-col rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,.8),inset_0_1px_0_rgba(255,255,255,.2)] backdrop-blur-3xl backdrop-saturate-[1.7] sm:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <Vinyl playing={playing} />
          <div className="min-w-0 flex-1">
            {info}
            <div className="mt-1">{timeline}</div>
          </div>
        </div>
        <div className="mt-2 flex justify-center">{controls}</div>
      </div>
    </>
  );
}
