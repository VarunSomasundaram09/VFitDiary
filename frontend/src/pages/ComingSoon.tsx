interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark">
      <div className="text-center px-6">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
          Coming in the next module
        </p>
        <h1 className="text-3xl font-display font-bold">{title}</h1>
        <a href="/" className="inline-block mt-6 text-sm text-primary hover:underline">
          ← Back to home
        </a>
      </div>
    </div>
  );
}
