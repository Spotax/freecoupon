import { motion } from "framer-motion";
import { Heart, Calendar, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  index: number;
}

export default function CourseCard({ course, isFavorite, onToggleFavorite, index }: CourseCardProps) {
  const isAd = course.ad === true;
  const displayTitle = isAd ? "" : course.title;
  const displayImage = isAd ? "/pub-placeholder.png" : course.image;
  const displayCategory = isAd ? null : course.category;
  const displayPlatform = isAd ? null : course.platform;
  const displayDuration = isAd ? null : course.duration;
  const displayLink = isAd ? course.link || "#" : `/course/${course.id}`;
  const displayState = isAd ? {} : { course };
  const displayTarget = isAd ? "_blank" : undefined;
  const linkClass = isAd
    ? "bg-yellow-400 text-black hover:bg-yellow-500"
    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-card card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={displayImage}
          alt={displayTitle}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {isAd && (
          <span className="absolute top-3 left-3 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-black">
            PUB
          </span>
        )}

        {/* Favorite button */}
        {!isAd && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(course.id);
            }}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-all hover:bg-background/80"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isFavorite ? "fill-primary text-primary" : "text-foreground"}`}
            />
          </button>
        )}

        {/* Price badge */}
         {!isAd && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
              course.price === "Gratuit" ? "gradient-bg text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {course.price}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {!isAd && (
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {displayCategory}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{displayPlatform}</span>
          </div>
        )}

        <h3 className="mb-3 font-heading text-lg font-semibold leading-tight text-foreground line-clamp-2">
          {displayTitle}
        </h3>

        {!isAd && (
          <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {displayDuration}
            </span>
            <span className="flex items-center gap-1">
              <Languages className="h-3.5 w-3.5" />
              {course.langue}
            </span>
          </div>
        )}
        <div className="mt-auto">

        <Link
          to={displayLink}
          state={displayState}
          target={displayTarget}
          className={`mt-4 flex items-center justify-center rounded-lg py-2.5 text-sm font-medium transition-all ${linkClass}`}
        >
          {isAd ? "Découvrir" : "Voir le cours"}
        </Link>
        </div>
      </div>
    </motion.div>
  );
}