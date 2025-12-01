export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const fetchAddressByZipCode = async (zipCode: string): Promise<ViaCepResponse | null> => {
  const cleanZipCode = zipCode.replace(/\D/g, '');

  if (cleanZipCode.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
    const data = await response.json();

    if (data.erro) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};
