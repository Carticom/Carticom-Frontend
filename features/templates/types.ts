export interface TemplateConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: BusinessCategory;
  previewColor: string;
  previewGradient: string;
  previewIcon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  effects: {
    heroEffect: 'gradient-mesh' | 'liquid-glass' | 'geometric' | 'minimal' | 'cinematic' | 'playful' | 'natural' | 'vibrant' | 'craft';
    cardStyle: 'glass' | 'elevated' | 'bordered' | 'minimal' | 'rounded';
    buttonStyle: 'pill' | 'sharp' | 'soft';
    animationPreset: 'luxury' | 'energetic' | 'calm' | 'bold';
  };
  sections: TemplateSection[];
}

export type BusinessCategory =
  | 'FASHION'
  | 'ELECTRONICS'
  | 'FOOD_BEVERAGE'
  | 'HEALTH_BEAUTY'
  | 'HOME_LIVING'
  | 'SPORTS_FITNESS'
  | 'BOOKS_MEDIA'
  | 'ARTS_CRAFTS';

export type TemplateSection =
  | 'hero'
  | 'showcase'
  | 'storytelling'
  | 'values'
  | 'membership'
  | 'testimonials'
  | 'features'
  | 'categories'
  | 'instagram'
  | 'faq'
  | 'newsletter';

export const BUSINESS_CATEGORIES: { value: BusinessCategory; label: string; description: string }[] = [
  { value: 'FASHION', label: 'Fashion & Luxury', description: 'Apparel, accessories, premium brands' },
  { value: 'ELECTRONICS', label: 'Electronics & Gadgets', description: 'Tech, devices, accessories' },
  { value: 'FOOD_BEVERAGE', label: 'Food & Beverage', description: 'Groceries, drinks, catering' },
  { value: 'HEALTH_BEAUTY', label: 'Health & Beauty', description: 'Skincare, wellness, cosmetics' },
  { value: 'HOME_LIVING', label: 'Home & Living', description: 'Furniture, decor, appliances' },
  { value: 'SPORTS_FITNESS', label: 'Sports & Fitness', description: 'Athletic wear, equipment, supplements' },
  { value: 'BOOKS_MEDIA', label: 'Books & Media', description: 'Books, digital content, stationery' },
  { value: 'ARTS_CRAFTS', label: 'Arts & Crafts', description: 'Handmade, art supplies, custom goods' },
];
