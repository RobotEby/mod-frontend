export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = 'admin' | 'moderator' | 'customer';
export type UserRole = 'admin' | 'customer';
export type OrderStatus =
  | 'pending_payment'
  | 'sent_to_factory'
  | 'in_production'
  | 'shipped'
  | 'delivered';

export interface Category {
  id: string;
  created_at: string | null;
  name: string;
  slug: string;
  image_url: string | null;
}

export interface Notification {
  id: string;
  created_at: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  metadata: Json | null;
}

export interface Product {
  id: string;
  created_at: string | null;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  is_on_sale: boolean | null;
  main_image_url: string | null;
  gallery_images: string[] | null;
  category_id: string | null;
  sku: string | null;
  stock_quantity: number | null;
  low_stock_threshold: number | null;
  dimensions: string | null;
  lead_time: string | null;
}

export interface Order {
  id: string;
  created_at: string | null;
  user_id: string;
  status: OrderStatus;
  total_amount: number;
  shipping_address: string | null;
  shipping_phone: string | null;
}

export interface OrderItem {
  id: string;
  created_at: string | null;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
}

export interface Profile {
  created_at: string | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  role: UserRole;
}

export interface Review {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  images: string[] | null;
  helpful_count: number;
  status: string;
}

export interface UserAddress {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  nickname: string | null;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  reference: string | null;
  is_default: boolean;
}

export interface UserPaymentMethod {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  cardholder_name: string;
  last4: string;
  expiry_month: string;
  expiry_year: string;
  card_type: string;
  is_default: boolean;
}

export interface UserRoleEntry {
  id: string;
  created_at: string | null;
  user_id: string;
  role: AppRole;
}

export interface Wishlist {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
}

export interface WishlistItem {
  id: string;
  added_at: string;
  wishlist_id: string;
  product_id: string;
}

export interface OrderWithItems extends Order {
  items_count?: number;
  customer_name?: string;
}

export interface ProductWithCategory extends Product {
  category?: Category;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product: Product;
}

export interface ProductInput {
  name: string;
  price: number;
  description?: string;
  category_id?: string;
  sku?: string;
  stock_quantity?: number;
}

export interface OrderInput {
  user_id: string;
  total_amount: number;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  shipping_address: string;
}
