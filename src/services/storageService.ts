import { supabase } from '@/integrations/supabase/client';

const BUCKET_NAME = 'product-images';

export interface UploadResult {
  url: string;
  path: string;
}

export const storageService = {
  /**
   * Upload an image to Supabase Storage
   */
  uploadImage: async (file: File, folder: string = 'products'): Promise<UploadResult> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw new Error(`Erro ao fazer upload: ${error.message}`);
    }

    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  },

  /**
   * Upload multiple images
   */
  uploadImages: async (files: File[], folder: string = 'products'): Promise<UploadResult[]> => {
    const uploads = files.map((file) => storageService.uploadImage(file, folder));
    return Promise.all(uploads);
  },

  /**
   * Delete an image from storage
   */
  deleteImage: async (path: string): Promise<void> => {
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

    if (error) {
      throw new Error(`Erro ao excluir imagem: ${error.message}`);
    }
  },

  /**
   * Delete multiple images
   */
  deleteImages: async (paths: string[]): Promise<void> => {
    if (paths.length === 0) return;

    const { error } = await supabase.storage.from(BUCKET_NAME).remove(paths);

    if (error) {
      throw new Error(`Erro ao excluir imagens: ${error.message}`);
    }
  },

  /**
   * Get public URL for an image path
   */
  getPublicUrl: (path: string): string => {
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
    return data.publicUrl;
  },
};