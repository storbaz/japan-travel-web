import {
  blogTemplates,
  cityData,
  foodTypes,
  tipTopics,
  culturalTopics,
  seasonData,
  specialDates,
  type BlogTemplate,
} from "../src/lib/blog-templates";

// ============================================================
// Blog Auto-Generation Script
// Ejecuta: npx ts-node scripts/generate-blog.ts
// GitHub Actions lo ejecuta automaticamente
// ============================================================

function today(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}


// Build a markdown FAQ section from a list of {q, a} items
function buildFaq(faq: { q: string; a: string }[]): string {
  return faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");
}

// Check if today matches a special date
function getSpecialDateArticle(date: Date): BlogTemplate | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const matched = specialDates.find((sd) => sd.month === month && Math.abs(sd.day - day) <= 3);
  if (!matched) return null;

  const template = blogTemplates.find((t) => t.id === "special-date")!;
  return { ...template, specialDate: matched.topic };
}

// Generate a city guide article
function generateCityArticle(date: Date): { template: BlogTemplate; vars: Record<string, string> } {
  const template = blogTemplates.find((t) => t.id === "city-guide")!;
  const cities = Object.keys(cityData);
  const city = pickRandom(cities);
  const data = cityData[city];

  return {
    template,
    vars: {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      year: date.getFullYear().toString(),
      intro: data.intro,
      neighborhoods: data.neighborhoods,
      foodList: data.foodList,
      transport: data.transport,
      itinerary: data.itinerary,
      budget: data.budget,
      mistakes: data.mistakes,
      faq: buildFaq(data.faq),
    },
  };
}

// Generate a food guide article
function generateFoodArticle(date: Date): { template: BlogTemplate; vars: Record<string, string> } {
  const template = blogTemplates.find((t) => t.id === "food-guide")!;
  const food = pickRandom(foodTypes);

  return {
    template,
    vars: {
      foodType: food.type,
      year: date.getFullYear().toString(),
      intro: food.intro,
      description: food.description,
      history: food.history,
      prices: food.prices,
      bestPlaces: food.bestPlaces,
      howToOrder: food.howToOrder,
      mistakes: food.mistakes,
      faq: buildFaq(food.faq),
    },
  };
}

// Generate a practical tips article
function generateTipsArticle(date: Date): { template: BlogTemplate; vars: Record<string, string> } {
  const template = blogTemplates.find((t) => t.id === "practical-tips")!;
  const tip = pickRandom(tipTopics);

  return {
    template,
    vars: {
      tipTopic: tip.topic,
      year: date.getFullYear().toString(),
      intro: tip.intro,
      importance: tip.importance,
      essentialInfo: tip.essentialInfo,
      commonMistakes: tip.commonMistakes,
      ourTips: tip.ourTips,
      realCases: tip.realCases,
      faq: buildFaq(tip.faq),
    },
  };
}

// Generate a culture article
function generateCultureArticle(date: Date): { template: BlogTemplate; vars: Record<string, string> } {
  const template = blogTemplates.find((t) => t.id === "culture")!;
  const cultural = pickRandom(culturalTopics);

  return {
    template,
    vars: {
      culturalTopic: cultural.topic,
      intro: cultural.intro,
      history: cultural.history,
      modernLife: cultural.modernLife,
      whereToExperience: cultural.whereToExperience,
      howToExperience: cultural.howToExperience,
      funFacts: cultural.funFacts,
      faq: buildFaq(cultural.faq),
    },
  };
}

// Generate a seasonal article
function generateSeasonalArticle(date: Date): { template: BlogTemplate; vars: Record<string, string> } {
  const template = blogTemplates.find((t) => t.id === "seasonal")!;
  const month = date.getMonth() + 1;
  let season: string;
  if (month >= 3 && month <= 5) season = "primavera";
  else if (month >= 6 && month <= 8) season = "verano";
  else if (month >= 9 && month <= 11) season = "otonno";
  else season = "invierno";

  const data = seasonData[season];

  return {
    template,
    vars: {
      season: data.season,
      year: date.getFullYear().toString(),
      intro: data.intro,
      weather: data.weather,
      events: data.events,
      packing: data.packing,
      planning: data.planning,
      mistakes: data.mistakes,
      faq: buildFaq(data.faq),
    },
  };
}

function fillTemplate(template: BlogTemplate, vars: Record<string, string>): { title: string; description: string; content: string; tags: string[] } {
  let title = template.titlePattern;
  let description = template.descriptionPattern;
  const tags = template.tags.map((t) => {
    let tag = t;
    for (const [key, value] of Object.entries(vars)) {
      tag = tag.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    }
    return tag;
  });

  for (const [key, value] of Object.entries(vars)) {
    title = title.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    description = description.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }

  let content = "";
  if (template.introPattern) {
    let intro = template.introPattern;
    for (const [key, value] of Object.entries(vars)) {
      intro = intro.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    }
    content += intro + "\n\n";
  }

  for (const section of template.sections) {
    let heading = section.heading;
    let body = section.content;
    for (const [key, value] of Object.entries(vars)) {
      heading = heading.replace(new RegExp(`\\{${key}\\}`, "g"), value);
      body = body.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    }
    content += `\n## ${heading}\n\n${body}\n`;
  }

  if (template.cta) {
    content += `\n[cta:${template.cta}]\n`;
  }

  return { title, description, content, tags };
}

function generateBlogPost() {
  const now = today();
  const dayOfMonth = now.getDate();

  // Priority 1: Special date (first 5 days of month)
  if (dayOfMonth <= 5) {
    const special = getSpecialDateArticle(now);
    if (special) {
      const topic = special.specialDate!;
      const vars = { topic, year: now.getFullYear().toString() };
      const filled = fillTemplate(special, vars);
      return buildPost(now, special, filled);
    }
  }

  // Priority 2: Seasonal article (1st of each season month)
  if ([3, 6, 9, 12].includes(now.getMonth() + 1) && dayOfMonth <= 5) {
    const { template, vars } = generateSeasonalArticle(now);
    const filled = fillTemplate(template, vars);
    return buildPost(now, template, filled);
  }

  // Priority 3: Random article
  const generators = [generateCityArticle, generateFoodArticle, generateTipsArticle, generateCultureArticle];
  const generator = pickRandom(generators);
  const { template, vars } = generator(now);
  const filled = fillTemplate(template, vars);
  return buildPost(now, template, filled);
}

function buildPost(
  _date: Date,
  template: BlogTemplate,
  filled: { title: string; description: string; content: string; tags: string[] }
) {
  const dateStr = _date.toISOString().split("T")[0];
  const slug = slugify(`${filled.title}-${dateStr}`);

  return {
    slug,
    title: filled.title,
    description: filled.description,
    category: template.category,
    readTime: template.readTime,
    date: dateStr,
    tags: filled.tags,
    content: filled.content,
  };
}

// ============================================================
// Main: generate and append to blog-generated.ts
// ============================================================
import * as fs from "fs";
import * as path from "path";

const GENERATED_FILE = path.join(__dirname, "..", "src", "lib", "blog-generated.ts");

function main() {
  const post = generateBlogPost();

  // Read existing generated posts or create empty array
  let existingPosts: any[] = [];
  if (fs.existsSync(GENERATED_FILE)) {
    const content = fs.readFileSync(GENERATED_FILE, "utf-8");
    const match = content.match(/export const generatedBlogPosts: BlogPost\[\] = (\[[\s\S]*\]);\s*$/);
    if (match) {
      existingPosts = JSON.parse(match[1]);
    }
  }

  // Check for duplicate slugs
  if (existingPosts.some((p: any) => p.slug === post.slug)) {
    console.log(`Post "${post.title}" already exists. Skipping.`);
    return;
  }

  existingPosts.push(post);

  // Write back
  const fileContent = `// This file is auto-generated by scripts/generate-blog.ts
// DO NOT EDIT MANUALLY

import type { BlogPost } from "./blog";

export const generatedBlogPosts: BlogPost[] = ${JSON.stringify(existingPosts, null, 2)};
`;

  fs.writeFileSync(GENERATED_FILE, fileContent, "utf-8");
  console.log(`Generated: "${post.title}" (${post.slug})`);
  console.log(`Total generated posts: ${existingPosts.length}`);
}

main();
