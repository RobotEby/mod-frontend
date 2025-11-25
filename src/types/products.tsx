export interface Product {
  id: string;
  name: string;
  price: number;
  main_image_url: string;
  lead_time: string;
  description: string;
  dimensions: string;
  gallery_images: string[];
  categories: {
    name: string;
  };
}
