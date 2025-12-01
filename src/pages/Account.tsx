import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
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
import { mockAuthService } from '@/lib/mockAuth';
import { User, Package, ShoppingBag, CheckCircle } from 'lucide-react';

const orderStatusMap = {
  pending_payment: { label: 'Aguardando Pagamento', variant: 'secondary' as const },
  sent_to_factory: { label: 'Enviado à Marcenaria', variant: 'default' as const },
  in_production: { label: 'Em Produção', variant: 'default' as const },
  shipped: { label: 'Enviado', variant: 'default' as const },
  delivered: { label: 'Entregue', variant: 'default' as const },
};

const Account = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setState(user.state || '');
      setZipCode(user.zip_code || '');
    }
  }, [user]);

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
    const { error } = await mockAuthService.signOut();
    if (error) {
      toast.success('Logout realizado com sucesso');
    } else {
      navigate('/');
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await mockAuthService.updateProfile({
        full_name: fullName,
        phone,
        address,
        city,
        state,
        zip_code: zipCode,
      });

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
                            className="bg-muted"
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
                          placeholder="Número de telefone"
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
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Meus Endereços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="space-y-2">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">CEP</Label>
                          <Input
                            id="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="00000-000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="UF"
                            maxLength={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Nome da cidade"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="neighborhood">Bairro</Label>
                          <Input id="neighborhood" placeholder="Nome do bairro" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="street">Rua/Avenida</Label>
                          <Input
                            id="street"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nome da rua"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number">Número</Label>
                          <Input id="number" placeholder="123" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="complement">Complemento</Label>
                          <Input id="complement" placeholder="Apt, Bloco, etc. (opcional)" />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? 'Salvando...' : 'Salvar Endereço'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Formas de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Adicionar Cartão de crédito/débito</h3>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input id="cardNumber" placeholder="0000 0000 0000 0000" maxLength={19} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome no cartão</Label>
                          <Input id="cardName" placeholder="Nome do titular" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Validade</Label>
                            <Input id="cardExpiry" placeholder="MM/AA" maxLength={5} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input id="cardCvv" placeholder="000" maxLength={4} type="password" />
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={() => toast.success('Cartão adicionado com sucesso!')}
                        >
                          Adicionar Cartão
                        </Button>

                        <h3 className="font-semibold mb-4">Endereço de cobrança</h3>
                        <div className="space-y-2">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="zipCode">CEP</Label>
                              <Input
                                id="zipCode"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="00000-000"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">Estado</Label>
                              <Input
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="UF"
                                maxLength={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="city">Cidade</Label>
                              <Input
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Nome da cidade"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="street">Rua/Avenida</Label>
                              <Input
                                id="street"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Nome da rua"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="number">Número</Label>
                              <Input id="number" placeholder="123" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="complement">Complemento</Label>
                              <Input id="complement" placeholder="Apt, Bloco, etc. (opcional)" />
                            </div>
                          </div>

                          <Separator />

                          <Button type="submit" disabled={saving}>
                            {saving ? 'Salvando...' : 'Salvar Endereço'}
                          </Button>
                        </div>
                      </form>
                    </div>
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
