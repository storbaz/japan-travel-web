"use client";

import Link from "next/link";

interface AffiliateCardProps {
  title: string;
  description: string;
  url: string;
  icon: string;
  cta?: string;
  className?: string;
}

export default function AffiliateCard({ title, description, url, icon, cta = "Ver oferta", className = "" }: AffiliateCardProps) {
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5 hover:shadow-md transition-all ${className}`}>
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <Link href={url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            {cta} ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
