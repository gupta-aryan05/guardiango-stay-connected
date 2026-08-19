import { SAFETY_TIPS } from "@/lib/journey";

type Props = {
  /** compact renders a tighter list for the active-journey screen */
  compact?: boolean;
  limit?: number;
};

export function SafetyTips({ compact = false, limit }: Props) {
  const tips = limit ? SAFETY_TIPS.slice(0, limit) : SAFETY_TIPS;

  if (compact) {
    return (
      <div className="rounded-2xl border bg-card p-6 shadow-card">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Safety tips &amp; precautions
        </p>
        <ul className="mt-3 space-y-3">
          {tips.map((tip) => (
            <li key={tip.title} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-safe" aria-hidden="true" />
              <span>
                <span className="text-sm font-semibold">{tip.title}</span>
                <span className="block text-sm text-muted-foreground">{tip.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="px-4 pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            Stay prepared
          </span>
          <h2 className="mt-4 text-3xl font-bold">Safety tips &amp; precautions</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Small habits that make a solo journey safer, whatever timer you set.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, i) => (
            <div
              key={tip.title}
              className="rounded-2xl border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-safe-gradient text-sm font-bold text-safe-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold">{tip.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tip.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
