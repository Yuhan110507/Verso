/**
 * Utility functions for Verso
 */

/**
 * Calculate reading time in minutes
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 225);
}

/**
 * Calculate word count from text
 */
export function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date with time
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: any): boolean {
  return !!user && !!user.id;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get color for resonance type
 */
export function getResonanceColor(
  type:
    | "moved"
    | "thoughtful"
    | "beautiful"
    | "gripping"
    | "provoking"
): string {
  const colors: Record<string, string> = {
    moved: "#DCA1A1", // Dusty rose
    thoughtful: "#9CAF88", // Sage
    beautiful: "#C19A6B", // Gold
    gripping: "#800020", // Burgundy
    provoking: "#5C7650", // Reseda green
  };
  return colors[type] || "#36454F"; // Default to charcoal
}

/**
 * Get label for resonance type
 */
export function getResonanceLabel(
  type:
    | "moved"
    | "thoughtful"
    | "beautiful"
    | "gripping"
    | "provoking"
): string {
  const labels: Record<string, string> = {
    moved: "Moved me",
    thoughtful: "Made me think",
    beautiful: "Beautifully written",
    gripping: "Gripping",
    provoking: "Thought-provoking",
  };
  return labels[type] || type;
}

/**
 * Format large numbers with abbreviations
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Check if text contains spoilers or sensitive content
 */
export function hasSensitiveContent(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase();
  return keywords.some((keyword) => lowerText.includes(keyword.toLowerCase()));
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
