"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { API_URL, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Itinerary {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  user?: { name: string };
  items?: ItineraryItem[];
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  users?: { name: string };
}

interface ItineraryItem {
  id: string;
  day_number: number;
  time: string;
  title: string;
  description: string;
}

export default function SharedItineraryPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`${API_URL}/v1/itineraries/shared/${id}`).then((r) => r.ok ? r.json() : Promise.reject()),
      fetch(`${API_URL}/v1/reviews/itinerary/${id}`).then((r) => r.ok ? r.json() : { reviews: [], average: 0, count: 0 }),
    ]).then(([itin, revData]) => {
      setItinerary(itin);
      setReviews(revData.reviews || []);
      setAvgRating(revData.average || 0);
      setReviewCount(revData.count || 0);
    }).catch(() => setError("Itinerario no encontrado"))
      .finally(() => setLoading(false));
  }, [id]);

  const submitReview = async () => {
    if (!myRating) return;
    setSubmitting(true);
    setReviewMsg("");
    try {
      await apiFetch("/v1/reviews", {
        method: "POST",
        body: JSON.stringify({ itinerary_id: id, rating: myRating, comment: myComment }),
      });
      setReviewMsg("Gracias por tu valoracion!");
      setMyRating(0);
      setMyComment("");
      const revData = await fetch(`${API_URL}/v1/reviews/itinerary/${id}`).then((r) => r.json());
      setReviews(revData.reviews || []);
      setAvgRating(revData.average || 0);
      setReviewCount(revData.count || 0);
    } catch (err: any) {
      setReviewMsg(err.message || "Error al enviar");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-100 rounded-xl h-8 w-1/3"></div>
          <div className="bg-gray-100 rounded-xl h-40"></div>
        </div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Itinerario no encontrado</h1>
        <p className="text-gray-600 mb-6">{error || "Este itinerario no existe o no esta disponible."}</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">Volver al inicio</Link>
      </div>
    );
  }

  const days = Math.ceil(
    (new Date(itinerary.end_date).getTime() - new Date(itinerary.start_date).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  const items = itinerary.items || [];
  const grouped = items.reduce((acc: Record<number, ItineraryItem[]>, item) => {
    (acc[item.day_number] = acc[item.day_number] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-red-600 hover:text-red-700 text-sm font-medium mb-6 inline-block">← Volver al inicio</Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{itinerary.title}</h1>
        {itinerary.description && <p className="text-gray-600 mb-4">{itinerary.description}</p>}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>📅 {itinerary.start_date} → {itinerary.end_date}</span>
          <span>🕐 {days} dias</span>
          {itinerary.user && <span>👤 {itinerary.user.name}</span>}
          {avgRating > 0 && <span>⭐ {avgRating} ({reviewCount})</span>}
        </div>
      </div>

      {Object.keys(grouped).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Itinerario dia por dia</h2>
          <div className="space-y-3">
            {Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b)).map(([day, dayItems]) => (
              <div key={day} className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-2">Dia {day}</h3>
                <div className="space-y-1">
                  {dayItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      {item.time && <span className="text-gray-400 w-14">{item.time}</span>}
                      <span className="text-gray-700">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Valorar este itinerario</h2>
        {user ? (
          <div className="space-y-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setMyRating(star)} className={`text-2xl transition ${star <= myRating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"}`}>
                  ★
                </button>
              ))}
            </div>
            <textarea value={myComment} onChange={(e) => setMyComment(e.target.value)} placeholder="Comentario opcional..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={3} />
            <button onClick={submitReview} disabled={submitting || !myRating} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition disabled:opacity-50">
              {submitting ? "Enviando..." : "Enviar valoracion"}
            </button>
            {reviewMsg && <p className="text-sm text-green-600">{reviewMsg}</p>}
          </div>
        ) : (
          <p className="text-gray-500 text-sm"><Link href="/login" className="text-red-600 hover:underline">Inicia sesion</Link> para valorar este itinerario.</p>
        )}
      </div>

      {reviews.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Valoraciones ({reviewCount})</h2>
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{rev.users?.name || "Anonimo"}</span>
                  <span className="text-yellow-500">{"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}</span>
                </div>
                {rev.comment && <p className="text-sm text-gray-600">{rev.comment}</p>}
                <div className="text-xs text-gray-400 mt-1">{new Date(rev.created_at).toLocaleDateString("es-ES")}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
