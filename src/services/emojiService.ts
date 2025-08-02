import type { EmojiResponse } from "../types/index.js";

export class EmojiService {
  private static readonly emojis: string[] = [
    "😀",
    "😳",
    "🙄",
    "😍",
    "🤔",
    "😎",
    "🥳",
    "🤩",
    "😴",
    "🤯",
    "😱",
    "🤠",
    "👻",
    "🤖",
    "👽",
    "🐱",
    "🐶",
    "🦄",
    "🌈",
    "✨",
    "🔥",
    "💧",
    "🌍",
    "🌎",
    "🌏",
    "⭐",
    "🌟",
    "💫",
    "⚡",
    "💥",
    "🎉",
    "🎊",
  ];

  /**
   * Récupère tous les emojis
   */
  static getAllEmojis(): EmojiResponse {
    return [...this.emojis];
  }

  /**
   * Récupère un emoji aléatoire
   */
  static getRandomEmoji(): string {
    const randomIndex = Math.floor(Math.random() * this.emojis.length);
    return this.emojis[randomIndex];
  }

  /**
   * Récupère plusieurs emojis aléatoires
   */
  static getRandomEmojis(count: number = 5): string[] {
    const shuffled = [...this.emojis].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, this.emojis.length));
  }

  /**
   * Recherche des emojis par catégorie (visages, animaux, etc.)
   */
  static getEmojisByCategory(category: string): string[] {
    const categories: Record<string, string[]> = {
      faces: ["😀", "😳", "🙄", "😍", "🤔", "😎", "🥳", "🤩", "😴", "🤯", "😱"],
      animals: ["🐱", "🐶", "🦄", "👻", "🤖", "👽"],
      nature: ["🌈", "✨", "🔥", "💧", "🌍", "🌎", "🌏", "⭐", "🌟", "💫", "⚡", "💥"],
      celebration: ["🎉", "🎊", "🥳", "🤩", "✨", "🌟"],
    };

    return categories[category.toLowerCase()] || [];
  }
}
