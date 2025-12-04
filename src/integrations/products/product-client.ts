import apiClient from '@/lib/api-client';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  is_on_sale?: boolean;
  main_image_url?: string;
  category_id?: string;
  stock_quantity?: number;
  lead_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  category_id?: string;
  stock_quantity?: number;
  lead_time?: string;
  main_image_url?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

export interface ProductListParams {
  category_id?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort_by?: 'price-asc' | 'price-desc' | 'name' | 'newest';
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export class ProductClient {
  async list(params?: ProductListParams): Promise<ProductListResponse> {
    const response = await apiClient.get<ProductListResponse>('/products', { params });
    return response.data;
  }

  async getById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  }

  async create(data: CreateProductData): Promise<Product> {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  }

  async update(data: UpdateProductData): Promise<Product> {
    const { id, ...updateData } = data;
    const response = await apiClient.put<Product>(`/products/${id}`, updateData);
    return response.data;
  }

  // Deletar produto
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }

  // Buscar produtos por categoria
  async getByCategory(categoryId: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(`/products/category/${categoryId}`);
    return response.data;
  }

  // Buscar produtos em promoção
  async getOnSale(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products/sale');
    return response.data;
  }

  // Buscar produtos relacionados
  async getRelated(productId: string, limit: number = 4): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(`/products/${productId}/related`, {
      params: { limit },
    });
    return response.data;
  }
}
