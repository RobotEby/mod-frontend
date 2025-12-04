import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Loader2, Check } from 'lucide-react';
import { fetchAddressByZipCode, ViaCepResponse } from '@/lib/viaCepService';

interface ShippingCalculatorProps {
  productPrice: number;
}

interface ShippingOption {
  name: string;
  price: number;
  days: string;
  description: string;
}

export const ShippingCalculator = ({ productPrice }: ShippingCalculatorProps) => {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<ViaCepResponse | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[] | null>(null);
  const [error, setError] = useState('');

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const calculateShipping = (state: string): ShippingOption[] => {
    const freeShippingThreshold = 5000;
    const isFreeShipping = productPrice >= freeShippingThreshold;

    const sulSudeste = ['SP', 'RJ', 'MG', 'ES', 'PR', 'SC', 'RS'];
    const centroOeste = ['GO', 'MT', 'MS', 'DF'];
    const nordeste = ['BA', 'SE', 'AL', 'PE', 'PB', 'RN', 'CE', 'PI', 'MA'];
    const norte = ['AM', 'PA', 'AC', 'RO', 'RR', 'AP', 'TO'];

    let basePrice = 0;
    let baseDays = 7;

    if (sulSudeste.includes(state)) {
      basePrice = isFreeShipping ? 0 : 150;
      baseDays = 7;
    } else if (centroOeste.includes(state)) {
      basePrice = isFreeShipping ? 0 : 200;
      baseDays = 10;
    } else if (nordeste.includes(state)) {
      basePrice = isFreeShipping ? 0 : 280;
      baseDays = 12;
    } else if (norte.includes(state)) {
      basePrice = isFreeShipping ? 0 : 350;
      baseDays = 15;
    }

    return [
      {
        name: 'Padrão',
        price: basePrice,
        days: `${baseDays}-${baseDays + 3} dias úteis`,
        description: isFreeShipping
          ? 'Frete grátis para compras acima de R$ 5.000'
          : 'Entrega padrão',
      },
      {
        name: 'Expresso',
        price: basePrice + 100,
        days: `${Math.max(5, baseDays - 3)}-${baseDays} dias úteis`,
        description: 'Entrega prioritária',
      },
    ];
  };

  const handleCalculate = async () => {
    const cleanZip = zipCode.replace(/\D/g, '');
    if (cleanZip.length !== 8) {
      setError('CEP inválido. Digite 8 números.');
      return;
    }

    setLoading(true);
    setError('');
    setAddress(null);
    setShippingOptions(null);

    try {
      const addressData = await fetchAddressByZipCode(cleanZip);
      if (addressData) {
        setAddress(addressData);
        const options = calculateShipping(addressData.uf);
        setShippingOptions(options);
      } else {
        setError('CEP não encontrado. Verifique e tente novamente.');
      }
    } catch {
      setError('Erro ao calcular frete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Truck className="h-4 w-4 text-primary" />
        <span>Calcular Frete</span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="00000-000"
          value={zipCode}
          onChange={(e) => setZipCode(formatZipCode(e.target.value))}
          maxLength={9}
          className="flex-1"
        />
        <Button
          onClick={handleCalculate}
          disabled={loading || zipCode.replace(/\D/g, '').length !== 8}
          size="sm"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Calcular'}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {address && (
        <div className="flex items-start gap-2 text-sm text-muted-foreground animate-fade-in">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <span>
            {address.logradouro && `${address.logradouro}, `}
            {address.bairro} - {address.localidade}/{address.uf}
          </span>
        </div>
      )}

      {shippingOptions && (
        <div className="space-y-2 animate-fade-in">
          {shippingOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-background rounded-md border"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{option.name}</span>
                  {option.price === 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Grátis
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{option.days}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              <div className="text-right">
                {option.price === 0 ? (
                  <span className="font-bold text-primary">Grátis</span>
                ) : (
                  <span className="font-bold">R$ {option.price.toFixed(2).replace('.', ',')}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">* Prazo de entrega após produção do móvel</p>
    </div>
  );
};
