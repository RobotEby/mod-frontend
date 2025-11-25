import { Product } from '@/types/products';

export const MockProducts: Product[] = [
  {
    id: crypto.randomUUID(),
    name: 'Poltrona Eames Lounge',
    price: 4500.0,
    main_image_url:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop',
    lead_time: '15 dias úteis',
    description:
      'Um ícone do design moderno, esta poltrona combina conforto supremo com elegância atemporal. Estrutura em madeira moldada e estofamento em couro premium.',
    dimensions: '85cm x 85cm x 80cm',
    gallery_images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    ],
    categories: { name: 'Sala de Estar' },
  },
  {
    id: crypto.randomUUID(),
    name: 'Sofá Modular Velvet',
    price: 3200.0,
    main_image_url:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
    lead_time: '20 dias úteis',
    description:
      'Sofá modular versátil revestido em veludo macio de alta durabilidade. Perfeito para adaptar-se a diferentes layouts de sala.',
    dimensions: '220cm x 95cm x 75cm',
    gallery_images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800',
    ],
    categories: { name: 'Sala de Estar' },
  },
  {
    id: crypto.randomUUID(),
    name: 'Mesa de Jantar Oak',
    price: 2800.0,
    main_image_url:
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop',
    lead_time: '18 dias úteis',
    description:
      'Mesa de jantar robusta em carvalho maciço com acabamento natural. Design minimalista que destaca a beleza dos veios da madeira.',
    dimensions: '180cm x 90cm x 76cm',
    gallery_images: ['https://images.unsplash.com/photo-1615876234882-5f8471432190?w=800'],
    categories: { name: 'Sala de Jantar' },
  },
  {
    id: crypto.randomUUID(),
    name: 'Luminária de Piso Arc',
    price: 890.0,
    main_image_url:
      'https://images.unsplash.com/photo-1513506003011-3b644ab495e9?q=80&w=1000&auto=format&fit=crop',
    lead_time: '5 dias úteis',
    description:
      'Luminária de piso com design em arco, base em mármore pesado e cúpula em metal escovado. Iluminação direta ideal para leitura.',
    dimensions: '170cm (altura) x 30cm (base)',
    gallery_images: [],
    categories: { name: 'Iluminação' },
  },
  {
    id: crypto.randomUUID(),
    name: 'Buffet Minimalista',
    price: 1950.0,
    main_image_url:
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
    lead_time: '12 dias úteis',
    description:
      'Buffet com linhas retas e puxadores ocultos. Espaço interno amplo com prateleiras ajustáveis para organizar suas louças.',
    dimensions: '160cm x 45cm x 80cm',
    gallery_images: [],
    categories: { name: 'Sala de Jantar' },
  },
  {
    id: crypto.randomUUID(),
    name: 'Cadeira de Jantar Shell',
    price: 450.0,
    main_image_url:
      'https://images.unsplash.com/photo-1503602642458-2321114458c9?q=80&w=1000&auto=format&fit=crop',
    lead_time: '7 dias úteis',
    description:
      'Cadeira ergonômica com assento em polipropileno e pés em madeira faia. Conforto e estilo scandi para sua mesa de jantar.',
    dimensions: '46cm x 52cm x 82cm',
    gallery_images: [],
    categories: { name: 'Sala de Jantar' },
  },
  {
    id: crypto.randomUUID(),
    name: 'Cadeira de Jantar Shell',
    price: 450.0,
    main_image_url:
      'https://images.unsplash.com/photo-1503602642458-2321114458c9?q=80&w=1000&auto=format&fit=crop',
    lead_time: '7 dias úteis',
    description:
      'Cadeira ergonômica com assento em polipropileno e pés em madeira faia. Conforto e estilo scandi para sua mesa de jantar.',
    dimensions: '46cm x 52cm x 82cm',
    gallery_images: [],
    categories: { name: 'Sala de Jantar' },
  },
  {
    id: crypto.randomUUID(),
    name: 'Cadeira de Jantar Shell',
    price: 450.0,
    main_image_url:
      'https://images.unsplash.com/photo-1503602642458-2321114458c9?q=80&w=1000&auto=format&fit=crop',
    lead_time: '7 dias úteis',
    description:
      'Cadeira ergonômica com assento em polipropileno e pés em madeira faia. Conforto e estilo scandi para sua mesa de jantar.',
    dimensions: '46cm x 52cm x 82cm',
    gallery_images: [],
    categories: { name: 'Sala de Jantar' },
  },
];
