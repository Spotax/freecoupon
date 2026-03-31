import { Course } from "@/types/course";

export async function fetchcourses(page: number): Promise<Course[]> {
  const baseUrl = `https://couponami.com/all/${page}`;
  const res = await fetch(baseUrl);
  const htmlString = await res.text();
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  const cards = Array.from(doc.querySelectorAll(".card"));
  const results = await Promise.all(
    cards.map(async (card, idx) => {
      const linkElement = card.querySelector(".card-header");
      const coursePageLink = linkElement?.getAttribute("href");
      const title = linkElement?.textContent?.trim();
      const description = card.querySelector(".description")?.textContent?.trim();
      const image = card.querySelector(".image img")?.getAttribute("src");
      const category = card.querySelector(".catSpan")?.textContent?.trim();
      const duration = card.querySelector(".horizontal")?.textContent?.trim();
      const langue = card.querySelector(".disc-fee")?.textContent?.trim();
      const slug = coursePageLink?.split("/").pop();
      const goLink = slug
        ? `https://couponami.com/go/${slug}`
        : "#";

      return {
        id: page * 100 + idx,
        title,
        description,
        image,
        category,
        platform: "Udemy",
        price: "Gratuit",
        link: goLink, 
        duration,
        langue,
      };
    })
  );
  return results;
}