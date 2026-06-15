export const getFallbackImage = (category, title = '') => {
  const t = title.toLowerCase();

  // Specific title matches for known local images
  if (t.includes('engineering graphic')) return '/engineering_graphics.png';
  if (t.includes('physics lab manual')) return '/physics_lab_manual.png';
  if (t.includes('laptop cooling') || t.includes('laptop stand')) return '/laptop_cooling_pad.png';
  if (t.includes('extension board')) return '/extension_board.png';
  if (t.includes('mattress') || t.includes('bed')) return 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400&h=400&fit=crop';
  if (t.includes('drafting table')) return 'https://images.unsplash.com/photo-1580130086202-ce46d57cc82b?q=80&w=400&h=400&fit=crop';

  switch (category) {
    case 'Books':
      return 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=400&fit=crop';
    case 'Calculators':
      return 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop';
    case 'Electronics':
      return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400&h=400&fit=crop';
    case 'Bicycles':
      return 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=400&fit=crop';
    case 'Lab Equipment':
      return 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop';
    case 'Hostel Essentials':
      return 'https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=400&h=400&fit=crop';
    case 'Stationery':
      return 'https://images.unsplash.com/photo-1531346878377-a541e4ab0ad3?q=80&w=400&h=400&fit=crop';
    case 'Furniture':
      return 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=400&h=400&fit=crop';
    default:
      return 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=400&h=400&fit=crop';
  }
};
