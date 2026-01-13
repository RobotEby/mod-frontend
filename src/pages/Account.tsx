import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser, selectUserLoading } from '@/features/user/userSelectors';
import { signOut } from '@/features/user/userThunks';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { getMockOrderWithItems } from '@/lib/mockData';
import { User, Package, ShoppingBag, CheckCircle, MapPin, CreditCard, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AddressForm } from '@/components/AddressForm';
import { PaymentMethodForm } from '@/components/PaymentMethodForm';
import { AddressFormData, PaymentMethodFormData } from '@/lib/validationSchemas';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const orderStatusMap = {
  pending_payment: { label: 'Aguardando Pagamento', variant: 'secondary' as const },
  sent_to_factory: { label: 'Enviado à Marcenaria', variant: 'default' as const },
  in_production: { label: 'Em Produção', variant: 'default' as const },
  shipped: { label: 'Enviado', variant: 'default' as const },
  delivered: { label: 'Entregue', variant: 'default' as const },
};

const Account = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const authLoading = useAppSelector(selectUserLoading);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
    queryKey: ['user-addresses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: paymentMethods, isLoading: isLoadingPayments } = useQuery({
    queryKey: ['user-payment-methods', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_payment_methods')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: orders, isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      await new Promise((resolve) => setTimeout(resolve, 300));
      return getMockOrderWithItems(user.id);
    },
    enabled: !!user,
  });

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      toast.success('Conta desvinculada');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao sair');
    }
  };

  const addAddressMutation = useMutation({
    mutationFn: async (data: AddressFormData) => {
      if (!user) throw new Error('User not found');

      const { error } = await supabase.from('user_addresses').insert({
        user_id: user.id,
        nickname: data.nickname || null,
        street: data.street,
        number: data.number,
        complement: data.complement || null,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        reference: data.reference || null,
        is_default: data.is_default,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
      toast.success('Endereço adicionado com sucesso!');
      setShowAddressForm(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao adicionar endereço');
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      const { error } = await supabase.from('user_addresses').delete().eq('id', addressId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
      toast.success('Endereço removido com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao remover endereço');
    },
  });

  const setDefaultAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      const { error } = await supabase
        .from('user_addresses')
        .update({ is_default: true })
        .eq('id', addressId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses'] });
      toast.success('Endereço padrão atualizado!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atualizar endereço padrão');
    },
  });

  const addPaymentMethodMutation = useMutation({
    mutationFn: async (data: PaymentMethodFormData) => {
      if (!user) throw new Error('User not found');

      let card_type = 'Desconhecido';
      const firstDigit = data.card_number[0];
      if (firstDigit === '4') card_type = 'Visa';
      else if (firstDigit === '5') card_type = 'Mastercard';
      else if (firstDigit === '3') card_type = 'Amex';

      const { error } = await supabase.from('user_payment_methods').insert({
        user_id: user.id,
        card_type,
        last4: data.card_number.slice(-4),
        cardholder_name: data.cardholder_name,
        expiry_month: data.expiry_month,
        expiry_year: data.expiry_year,
        is_default: data.is_default,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-payment-methods'] });
      toast.success('Cartão adicionado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao adicionar cartão');
    },
  });

  const deletePaymentMethodMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const { error } = await supabase.from('user_payment_methods').delete().eq('id', paymentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-payment-methods'] });
      toast.success('Cartão removido com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao remover cartão');
    },
  });

  const setDefaultPaymentMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const { error } = await supabase
        .from('user_payment_methods')
        .update({ is_default: true })
        .eq('id', paymentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-payment-methods'] });
      toast.success('Cartão padrão atualizado!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao atualizar cartão padrão');
    },
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone,
        })
        .eq('id', user!.id);

      if (error) throw error;

      toast.success('Perfil atualizado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) {
    return null;
  }

  const activeOrders = orders?.filter((order) => order.status !== 'delivered') || [];

  const deliveredOrders = orders?.filter((order) => order.status === 'delivered') || [];

  const renderOrderCard = (order: any) => (
    <Card key={order.id}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Pedido #{order.id.slice(0, 8)}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <Badge variant={orderStatusMap[order.status]?.variant || 'secondary'}>
            {orderStatusMap[order.status]?.label || order.status}
          </Badge>
        </div>

        <div className="space-y-2">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
                <img
                  src={
                    item.products?.main_image_url ||
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200'
                  }
                  alt={item.products?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.products?.name}</p>
                <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                R$ {Number(item.price_at_purchase).toFixed(2).replace('.', ',')}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-primary">
            R$ {Number(order.total_amount).toFixed(2).replace('.', ',')}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Minha Conta</h1>
            <p className="text-muted-foreground">Gerencie seus dados e acompanhe seus pedidos</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        <Tabs defaultValue="profile" className="flex gap-6">
          <TabsList className="flex flex-col h-fit w-48 bg-muted/30 p-2">
            <TabsTrigger value="profile" className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="addresses" className="w-full justify-start gap-2">
              <Package className="h-4 w-4" />
              Endereços
            </TabsTrigger>
            <TabsTrigger value="payment" className="w-full justify-start gap-2">
              <ShoppingBag className="h-4 w-4" />
              Pagamento
            </TabsTrigger>
            <TabsTrigger value="orders" className="w-full justify-start gap-2">
              <Package className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="delivered" className="w-full justify-start gap-2">
              <CheckCircle className="h-4 w-4" />
              Recebidos
            </TabsTrigger>
            <TabsTrigger value="all" className="w-full justify-start gap-2">
              <ShoppingBag className="h-4 w-4" />
              Todas
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 space-y-6">
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Pedidos em Andamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                      ))}
                    </div>
                  ) : activeOrders.length > 0 ? (
                    <div className="space-y-4">{activeOrders.map(renderOrderCard)}</div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Você não tem pedidos em andamento</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivered">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Pedidos Entregues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                      ))}
                    </div>
                  ) : deliveredOrders.length > 0 ? (
                    <div className="space-y-4">{deliveredOrders.map(renderOrderCard)}</div>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Você ainda não recebeu nenhum pedido</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Todas as Compras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                      ))}
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="space-y-4">{orders.map(renderOrderCard)}</div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Você ainda não fez nenhuma compra</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Nome Completo</Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Seu nome completo"
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value={user.email} disabled className="bg-muted" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(00) 00000-0000"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Segurança</h3>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            toast.info('Funcionalidade de alteração de senha em breve')
                          }
                        >
                          Alterar Senha
                        </Button>
                      </div>

                      <Separator />
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Meus Endereços
                    </div>
                    <Button onClick={() => setShowAddressForm(!showAddressForm)}>
                      {showAddressForm ? 'Cancelar' : 'Adicionar Endereço'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {showAddressForm ? (
                    <AddressForm
                      onSubmit={async (data) => {
                        await addAddressMutation.mutateAsync(data);
                      }}
                    />
                  ) : (
                    <div className="space-y-4">
                      {isLoadingAddresses ? (
                        <div className="space-y-4">
                          {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full" />
                          ))}
                        </div>
                      ) : addresses && addresses.length > 0 ? (
                        addresses.map((address) => (
                          <Card key={address.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  {address.nickname && (
                                    <p className="font-semibold">{address.nickname}</p>
                                  )}
                                  <p className="text-sm">
                                    {address.street}, {address.number}
                                    {address.complement && ` - ${address.complement}`}
                                  </p>
                                  <p className="text-sm">
                                    {address.neighborhood}, {address.city} - {address.state}
                                  </p>
                                  <p className="text-sm">CEP: {address.zip_code}</p>
                                  {address.reference && (
                                    <p className="text-sm text-muted-foreground">
                                      Referência: {address.reference}
                                    </p>
                                  )}
                                  {address.is_default && (
                                    <Badge variant="default" className="mt-2">
                                      Padrão
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  {!address.is_default && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setDefaultAddressMutation.mutate(address.id)}
                                    >
                                      Tornar Padrão
                                    </Button>
                                  )}
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Remover Endereço</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Tem certeza que deseja remover este endereço? Esta ação
                                          não pode ser desfeita.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => deleteAddressMutation.mutate(address.id)}
                                        >
                                          Remover
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            Você ainda não tem endereços cadastrados
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Formas de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Adicionar Novo Cartão</h3>
                      <PaymentMethodForm
                        onSubmit={async (data) => {
                          await addPaymentMethodMutation.mutateAsync(data);
                        }}
                      />
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-4">Cartões Salvos</h3>
                      {isLoadingPayments ? (
                        <div className="space-y-4">
                          {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full" />
                          ))}
                        </div>
                      ) : paymentMethods && paymentMethods.length > 0 ? (
                        <div className="space-y-4">
                          {paymentMethods.map((payment) => (
                            <Card key={payment.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <p className="font-semibold">{payment.card_type}</p>
                                      {payment.is_default && (
                                        <Badge variant="default">Padrão</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm">•••• •••• •••• {payment.last4}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {payment.cardholder_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Validade: {payment.expiry_month}/{payment.expiry_year}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    {!payment.is_default && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDefaultPaymentMutation.mutate(payment.id)}
                                      >
                                        Tornar Padrão
                                      </Button>
                                    )}
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Remover Cartão</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Tem certeza que deseja remover este cartão? Esta ação
                                            não pode ser desfeita.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() =>
                                              deletePaymentMethodMutation.mutate(payment.id)
                                            }
                                          >
                                            Remover
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Você ainda não possui cartões salvos
                        </p>
                      )}
                    </div>

                    <Separator />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
