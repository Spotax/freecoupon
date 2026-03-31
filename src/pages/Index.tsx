import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import CourseCard from "@/components/CourseCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchcourses } from "@/utils/fetchcourses";
import { Course } from "@/types/course";

export default function Index() {
  const { page } = useParams<{ page: string }>();
  const currentPage = Number(page) || 1;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await fetchcourses(currentPage);
        setCoursesData(data);
      } catch (err) {
        console.error("Fetch courses error:", err);
        setCoursesData([]);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [currentPage]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(coursesData.map((c) => c.category).filter(Boolean))
    );
  }, [coursesData]);

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        !search || course.title?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [coursesData, search, selectedCategory]);
const coursesWithAds = filteredCourses.map((course) => {
  // si le titre ou l'image est manquant → transforme en pub
  const isAd = !course.title || !course.image;

  return {
    ...course,
    ad: isAd,
    title: isAd ? "Découvrez ce super outil !" : course.title,
    image: isAd ? "/pub-placeholder.png" : course.image,
    category: isAd ? "" : course.category,
    platform: isAd ? "" : course.platform,
    price: isAd ? "" : course.price,
    duration: isAd ? "" : course.duration,
    link: isAd ? "#" : course.link,
  };
});

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold gradient-text">YourFreeCoupons</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            Trouvez votre prochain <span className="gradient-text">cours</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Explorez les meilleures formations en ligne, gratuites et payantes, des meilleures plateformes.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6">
        <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory}/>
          </div>
      </section>
      
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {coursesWithAds.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-20 text-center">
            <p className="text-xl font-medium text-muted-foreground">
              Aucun résultat trouvé
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Essayez avec d'autres termes de recherche
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {coursesWithAds.map((course, i) => (
              <CourseCard
                key={course.id}
                course={{
                  ...course,
                  title: course.title || "Titre indisponible",
                  image: course.image || "/placeholder.png",
                  description: course.description || "Description indisponible",
                  category: course.category || "Unknown",
                  platform: course.platform || "Udemy",
                  price: course.price || "Gratuit",
                  duration: course.duration || "Inconnu",
                  link: course.link || "#",
                }}
                isFavorite={isFavorite(course.id)}
                onToggleFavorite={toggleFavorite}
                index={i}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => navigate(`/${currentPage - 1}`)}
            disabled={currentPage <= 1}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </button>

          {/* Page numbers */}
          {Array.from({ length: 5 }, (_, i) => {
            const start = Math.max(1, currentPage - 2);
            const page = start + i;
            return (
              <button
                key={page}
                onClick={() => navigate(`/${page}`)}
                className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                  page === currentPage
                    ? "gradient-bg text-primary-foreground shadow-lg"
                    : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {page}
              </button>
            );
          })}

          <span className="sm:hidden text-sm font-medium text-muted-foreground px-3">
            Page <span className="text-foreground font-bold">{currentPage}</span>
          </span>

          <button
            onClick={() => navigate(`/${currentPage + 1}`)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}