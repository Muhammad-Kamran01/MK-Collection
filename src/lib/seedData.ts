import { supabase } from './supabase';

export async function seedDatabase() {
  console.log('Starting seed...');

  // 1. Seed Categories
  const categories = [
    { name: 'Unstitched', slug: 'unstitched', banner_image: 'https://picsum.photos/seed/unstitched/1200/600' },
    { name: 'Ready to Wear', slug: 'ready-to-wear', banner_image: 'https://picsum.photos/seed/ready/1200/600' },
    { name: 'Luxury', slug: 'luxury', banner_image: 'https://picsum.photos/seed/luxury/1200/600' },
    { name: 'Accessories', slug: 'accessories', banner_image: 'https://picsum.photos/seed/acc/1200/600' },
  ];

  const { error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' });
  if (catError) console.error('Error seeding categories:', catError);

  // 2. Seed Products
  const products = [
    {
      title: 'Embroidered Lawn Suit - 3PC',
      slug: 'embroidered-lawn-suit-3pc',
      description: 'Intricate embroidery on premium lawn fabric.',
      price: 12000,
      discount_price: 8500,
      category: 'Unstitched',
      stock: 50,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['White', 'Blue'],
      fabric: 'Lawn',
      images: ['https://picsum.photos/seed/dress1/800/1200', 'https://picsum.photos/seed/dress1-2/800/1200'],
      featured: true,
      trending: true,
      is_new: true,
      rating: 4.8
    },
    {
      title: 'Silk Collection - Midnight Bloom',
      slug: 'silk-collection-midnight-bloom',
      description: 'Elegant silk for formal evenings.',
      price: 15000,
      category: 'Luxury',
      stock: 30,
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Gold'],
      fabric: 'Silk',
      images: ['https://picsum.photos/seed/dress2/800/1200'],
      featured: true,
      trending: false,
      is_new: true,
      rating: 4.9
    },
    {
      title: 'Cotton Co-ord Set',
      slug: 'cotton-co-ord-set',
      description: 'Perfect for daily comfort.',
      price: 7000,
      discount_price: 5500,
      category: 'Ready to Wear',
      stock: 100,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Yellow', 'Green'],
      fabric: 'Cotton',
      images: ['https://picsum.photos/seed/dress3/800/1200'],
      featured: false,
      trending: true,
      is_new: false,
      rating: 4.5
    }
  ];

  const { error: prodError } = await supabase.from('products').upsert(products, { onConflict: 'slug' });
  if (prodError) console.error('Error seeding products:', prodError);

  // 3. Seed FAQs
  const faqs = [
    { question: 'How Do I Contact Your Customer Service?', answer: 'Our customer service team is available Monday through Friday, 9 AM - 5 PM PKT.' },
    { question: 'When Will My Order Ship?', answer: 'Orders typically ship within 2-3 business days.' },
    { question: 'Can I Cancel Or Modify My Order?', answer: 'Orders can be modified within 2 hours of placement.' }
  ];

  const { error: faqError } = await supabase.from('faqs').upsert(faqs, { onConflict: 'question' });
  if (faqError) console.error('Error seeding FAQs:', faqError);

  console.log('Seed completed!');
  return { success: !catError && !prodError && !faqError };
}
