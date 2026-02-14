import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.heyattrangi.com";

    // Static routes
    const routes = [
        "",
        "/about",
        "/services",
        "/resources",
        "/blogs",
        "/aids",
        "/conditions/womens-health", // Explicitly list known conditions for now
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    return routes;
}
