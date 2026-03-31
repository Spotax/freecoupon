export async function fetchFinalLink(goUrl: string): Promise<string> {
  try {
    const res = await fetch(goUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const finalLink = doc
      .querySelector(".ui.violet.message a")
      ?.getAttribute("href");

    return finalLink ?? goUrl;
  } catch (err) {
    console.error("Erreur fetchFinalLink:", err);
    return goUrl;
  }
}