import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {["Tous", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === "Tous" ? "" : cat)}
          className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
        >
          {(cat === "Tous" ? "" : cat) === selected && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 rounded-full gradient-bg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className={`relative z-10 ${(cat === "Tous" ? "" : cat) === selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {cat}
          </span>
        </button>
      ))}
    </div>
  );
}
