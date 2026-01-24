import { Color } from '@/types/editor';

// Verso brand colors
export const brandColors: Color[] = [
  {
    name: 'Charcoal',
    value: '#2D2A26',
    category: 'brand',
  },
  {
    name: 'Burgundy',
    value: '#800020',
    category: 'brand',
  },
  {
    name: 'Sage',
    value: '#9CAF88',
    category: 'brand',
  },
  {
    name: 'Cream',
    value: '#FDFCFA',
    category: 'brand',
  },
];

// Text colors for writing
export const textColors: Color[] = [
  {
    name: 'Charcoal',
    value: '#2D2A26',
    category: 'primary',
  },
  {
    name: 'Body',
    value: '#3D3A36',
    category: 'primary',
  },
  {
    name: 'Secondary',
    value: '#75716B',
    category: 'muted',
  },
  {
    name: 'Burgundy',
    value: '#800020',
    category: 'accent',
  },
  {
    name: 'Sage',
    value: '#9CAF88',
    category: 'accent',
  },
  {
    name: 'Navy',
    value: '#1E3A5F',
    category: 'literary',
  },
  {
    name: 'Forest',
    value: '#2D5F3F',
    category: 'literary',
  },
  {
    name: 'Amber',
    value: '#B8860B',
    category: 'literary',
  },
  {
    name: 'Deep Purple',
    value: '#4B3C5C',
    category: 'literary',
  },
  {
    name: 'Crimson',
    value: '#A52A2A',
    category: 'literary',
  },
];

// Highlight colors (subtle, literary-focused)
export const highlightColors: Color[] = [
  {
    name: 'Soft Yellow',
    value: '#FFFACD',
    category: 'warm',
  },
  {
    name: 'Pale Green',
    value: '#E8F4E8',
    category: 'cool',
  },
  {
    name: 'Blush',
    value: '#FFF0F0',
    category: 'warm',
  },
  {
    name: 'Lavender',
    value: '#F0E8FF',
    category: 'cool',
  },
  {
    name: 'Cream',
    value: '#FDFCFA',
    category: 'neutral',
  },
  {
    name: 'Mint',
    value: '#E8F8F5',
    category: 'cool',
  },
  {
    name: 'Peach',
    value: '#FFE8DC',
    category: 'warm',
  },
  {
    name: 'Sky',
    value: '#E3F2FD',
    category: 'cool',
  },
];

// Default colors
export const defaultTextColor = textColors[0].value; // Charcoal
export const defaultHighlightColor = highlightColors[0].value; // Soft Yellow

// Get color by value
export const getColorByValue = (value: string, type: 'text' | 'highlight'): Color | undefined => {
  const colors = type === 'text' ? textColors : highlightColors;
  return colors.find(color => color.value.toLowerCase() === value.toLowerCase());
};

// Get colors by category
export const getColorsByCategory = (category: string, type: 'text' | 'highlight'): Color[] => {
  const colors = type === 'text' ? textColors : highlightColors;
  return colors.filter(color => color.category === category);
};

// Check if color is valid
export const isValidColor = (value: string): boolean => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexPattern.test(value);
};
