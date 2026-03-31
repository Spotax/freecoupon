import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Search, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: BookOpen, title: "Cours variés", desc: "Des milliers de formations en ligne couvrant tous les domaines." },
  { icon: Search, title: "Recherche intelligente", desc: "Trouvez rapidement le cours parfait grâce à nos filtres avancés." },
  { icon: Heart, title: "Favoris personnalisés", desc: "Sauvegardez vos cours préférés et retrouvez-les facilement." },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold gradient-text">YourFreeCoupons</span>
          </div>
          <button
            onClick={() => navigate("/1")}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Explorer les cours
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-heading text-5xl font-bold sm:text-6xl lg:text-7xl leading-tight">
                Apprenez sans limites avec{" "}
                <span className="gradient-text">YourFreeCoupons</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Votre plateforme tout-en-un pour découvrir, comparer et accéder aux meilleures formations en ligne —
                gratuites et payantes — des plus grandes plateformes comme Udemy, Coursera et bien d'autres.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <button
                onClick={() => navigate("/1")}
                className="inline-flex items-center gap-2 rounded-xl gradient-bg px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Découvrir les cours
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Pourquoi <span className="gradient-text">YourFreeCoupons</span> ?
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="rounded-2xl border border-border bg-card p-8 text-center hover:border-primary/50 transition-colors"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-bg">
                  <f.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © 2026 YourFreeCoupons. Tous droits réservés.
      </footer>
    </div>
  );
}
