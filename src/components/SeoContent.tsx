interface SeoFaq {
  q: string;
  a: string;
}

interface SeoContentProps {
  title: string;
  paragraphs: string[];
  faqs?: SeoFaq[];
}

export default function SeoContent({ title, paragraphs, faqs = [] }: SeoContentProps) {
  return (
    <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {p}
        </p>
      ))}
      {faqs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Preguntas frecuentes</h3>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{f.q}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
