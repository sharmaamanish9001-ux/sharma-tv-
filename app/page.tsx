import Player from "./player";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
];

export default function HomePage() {
  return (
    export default function Home() {
  return (
    <main>
      <h1>Sharma TV</h1>
      <p>Website is working!</p>
    </main>
  );
}
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 -z-30 bg-[#17110e]" />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-[url('/bg/scene-wide.png')] portrait:bg-[url('/bg/scene-tall.png')]"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 opacity-[0.22] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='.75'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(0,0,0,.18)_42%,rgba(0,0,0,.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/5 to-black/65"
      />

      <header className="fixed inset-x-0 top-0 z-20 flex items-start justify-between pl-[max(1rem,env(safe-area-inset-left))] pt-[max(1rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            Golden Era FM
          </p>
          <p className="mt-1 font-mono text-[9px] tabular-nums text-white/35">
            60s · 70s · timeless
          </p>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-xl">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e7c48c]/70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#f0d39d]" />
            </span>
            <span className="font-mono text-[9px] tracking-[0.13em] text-white/70">
              1,086 LISTENING
            </span>
          </div>
        </div>

        <nav aria-label="Social links" className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-medium text-white/55 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="pointer-events-none absolute left-1/2 top-[39%] z-0 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-serif text-[clamp(2.5rem,7vw,6.5rem)] leading-none text-white/[0.08]">
          Golden Era
        </p>
      </section>

      <section className="relative z-10 mt-auto w-full px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="mx-auto max-w-xl">
          <Player />
        </div>
      </section>
    </main>
  );
}
