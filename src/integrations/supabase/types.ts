export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null;
          id: string;
          image_url: string | null;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          image_url?: string | null;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          image_url?: string | null;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean;
          message: string;
          metadata: Json | null;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          message: string;
          metadata?: Json | null;
          title: string;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          message?: string;
          metadata?: Json | null;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string | null;
          id: string;
          order_id: string;
          price_at_purchase: number;
          product_id: string;
          quantity: number;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          order_id: string;
          price_at_purchase: number;
          product_id: string;
          quantity?: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          order_id?: string;
          price_at_purchase?: number;
          product_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string | null;
          id: string;
          shipping_address: string | null;
          shipping_phone: string | null;
          status: Database['public']['Enums']['order_status'];
          total_amount: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          shipping_address?: string | null;
          shipping_phone?: string | null;
          status?: Database['public']['Enums']['order_status'];
          total_amount: number;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          shipping_address?: string | null;
          shipping_phone?: string | null;
          status?: Database['public']['Enums']['order_status'];
          total_amount?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category_id: string | null;
          created_at: string | null;
          description: string | null;
          dimensions: string | null;
          discount_percent: number | null;
          gallery_images: string[] | null;
          id: string;
          is_on_sale: boolean | null;
          lead_time: string | null;
          low_stock_threshold: number | null;
          main_image_url: string | null;
          name: string;
          original_price: number | null;
          price: number;
          product_status: string | null;
          sku: string | null;
          stock_quantity: number | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          dimensions?: string | null;
          discount_percent?: number | null;
          gallery_images?: string[] | null;
          id?: string;
          is_on_sale?: boolean | null;
          lead_time?: string | null;
          low_stock_threshold?: number | null;
          main_image_url?: string | null;
          name: string;
          original_price?: number | null;
          price: number;
          product_status?: string | null;
          sku?: string | null;
          stock_quantity?: number | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          dimensions?: string | null;
          discount_percent?: number | null;
          gallery_images?: string[] | null;
          id?: string;
          is_on_sale?: boolean | null;
          lead_time?: string | null;
          low_stock_threshold?: number | null;
          main_image_url?: string | null;
          name?: string;
          original_price?: number | null;
          price?: number;
          product_status?: string | null;
          sku?: string | null;
          stock_quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          address: string | null;
          created_at: string | null;
          full_name: string | null;
          id: string;
          phone: string | null;
          role: Database['public']['Enums']['user_role'];
        };
        Insert: {
          address?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id: string;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'];
        };
        Update: {
          address?: string | null;
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'];
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          comment: string | null;
          created_at: string;
          helpful_count: number;
          id: string;
          images: string[] | null;
          product_id: string;
          rating: number;
          status: string;
          title: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          helpful_count?: number;
          id?: string;
          images?: string[] | null;
          product_id: string;
          rating: number;
          status?: string;
          title?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          helpful_count?: number;
          id?: string;
          images?: string[] | null;
          product_id?: string;
          rating?: number;
          status?: string;
          title?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      user_addresses: {
        Row: {
          city: string;
          complement: string | null;
          created_at: string;
          id: string;
          is_default: boolean;
          neighborhood: string;
          nickname: string | null;
          number: string;
          reference: string | null;
          state: string;
          street: string;
          updated_at: string;
          user_id: string;
          zip_code: string;
        };
        Insert: {
          city: string;
          complement?: string | null;
          created_at?: string;
          id?: string;
          is_default?: boolean;
          neighborhood: string;
          nickname?: string | null;
          number: string;
          reference?: string | null;
          state: string;
          street: string;
          updated_at?: string;
          user_id: string;
          zip_code: string;
        };
        Update: {
          city?: string;
          complement?: string | null;
          created_at?: string;
          id?: string;
          is_default?: boolean;
          neighborhood?: string;
          nickname?: string | null;
          number?: string;
          reference?: string | null;
          state?: string;
          street?: string;
          updated_at?: string;
          user_id?: string;
          zip_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_addresses_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      user_payment_methods: {
        Row: {
          card_type: string;
          cardholder_name: string;
          created_at: string;
          expiry_month: string;
          expiry_year: string;
          id: string;
          is_default: boolean;
          last4: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          card_type: string;
          cardholder_name: string;
          created_at?: string;
          expiry_month: string;
          expiry_year: string;
          id?: string;
          is_default?: boolean;
          last4: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          card_type?: string;
          cardholder_name?: string;
          created_at?: string;
          expiry_month?: string;
          expiry_year?: string;
          id?: string;
          is_default?: boolean;
          last4?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_payment_methods_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      user_roles: {
        Row: {
          created_at: string | null;
          id: string;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          role?: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          role?: Database['public']['Enums']['app_role'];
          user_id?: string;
        };
        Relationships: [];
      };
      wishlist_items: {
        Row: {
          added_at: string;
          id: string;
          product_id: string;
          wishlist_id: string;
        };
        Insert: {
          added_at?: string;
          id?: string;
          product_id: string;
          wishlist_id: string;
        };
        Update: {
          added_at?: string;
          id?: string;
          product_id?: string;
          wishlist_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_wishlist_id_fkey';
            columns: ['wishlist_id'];
            isOneToOne: false;
            referencedRelation: 'wishlists';
            referencedColumns: ['id'];
          },
        ];
      };
      wishlists: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_product_avg_rating: {
        Args: { product_uuid: string };
        Returns: number;
      };
      get_product_review_count: {
        Args: { product_uuid: string };
        Returns: number;
      };
      has_role: {
        Args: {
          _role: Database['public']['Enums']['app_role'];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: 'admin' | 'moderator' | 'customer';
      order_status:
        | 'pending_payment'
        | 'sent_to_factory'
        | 'in_production'
        | 'shipped'
        | 'delivered';
      user_role: 'admin' | 'customer';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ['admin', 'moderator', 'customer'],
      order_status: ['pending_payment', 'sent_to_factory', 'in_production', 'shipped', 'delivered'],
      user_role: ['admin', 'customer'],
    },
  },
} as const;
