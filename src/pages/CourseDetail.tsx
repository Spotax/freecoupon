import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Clock, BarChart3, Heart, Tag } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { fetchFinalLink } from "@/utils/fetchlink";
import { useEffect, useState } from "react";


export default function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {}; 
  const { isFavorite, toggleFavorite } = useFavorites();

  const [finalLink, setFinalLink] = useState<string | null>(null);
 useEffect(() => {
  const cached = localStorage.getItem(course.link);

  if (cached) {
    setFinalLink(cached);
  } else {
    fetchFinalLink(course.link).then((link) => {
      setFinalLink(link);
      localStorage.setItem(course.link, link);
    });
  }
}, [course]);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-heading font-bold text-foreground">Cours introuvable</p>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const fav = isFavorite(course.id);

  return (
    <div className="min-h-screen">
      {/* Back nav */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl px-4 py-10 sm:px-6"
      >
        <div className="overflow-hidden rounded-2xl bg-card card-shadow">
          {/* Hero image */}
          <div className="relative aspect-[21/9] overflow-hidden">
            <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                course.price === "Gratuit" ? "gradient-bg text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}>
                {course.price}
              </span>
              <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {course.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                {course.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4" />
                {course.level}
              </span>
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">
                {course.platform}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-foreground/80">{course.description}</p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={finalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Accéder au cours
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => toggleFavorite(course.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-medium transition-colors ${
                  fav ? "bg-primary/10 text-primary border-primary/30" : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                <Heart className={`h-4 w-4 ${fav ? "fill-primary" : ""}`} />
                {fav ? "Favori" : "Ajouter aux favoris"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
