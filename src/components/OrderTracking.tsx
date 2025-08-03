import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Package, Truck, CheckCircle, Clock, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrderStatus {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  order_items?: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

const statusConfig = {
  processing: { icon: Clock, label: 'Processing', color: 'bg-yellow-500' },
  confirmed: { icon: CheckCircle, label: 'Confirmed', color: 'bg-blue-500' },
  preparing: { icon: Package, label: 'Preparing', color: 'bg-orange-500' },
  out_for_delivery: { icon: Truck, label: 'Out for Delivery', color: 'bg-purple-500' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'bg-green-500' },
  cancelled: { icon: Clock, label: 'Cancelled', color: 'bg-red-500' },
};

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderData, setOrderData] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const trackOrder = async () => {
    if (!orderNumber.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please enter your order number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Query orders with order items
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_name,
            quantity,
            unit_price,
            total_price
          )
        `)
        .eq('order_number', orderNumber.trim())
        .single();

      if (orderError) {
        toast({
          title: 'Order Not Found',
          description: 'Please check your order number and try again',
          variant: 'destructive',
        });
        setOrderData(null);
        return;
      }

      // Verify phone number if provided
      if (phoneNumber.trim() && order.customer_phone !== phoneNumber.trim()) {
        toast({
          title: 'Phone Number Mismatch',
          description: 'The phone number does not match our records',
          variant: 'destructive',
        });
        setOrderData(null);
        return;
      }

      setOrderData(order);
      toast({
        title: 'Order Found',
        description: 'Your order details have been loaded',
      });
    } catch (error) {
      console.error('Error tracking order:', error);
      toast({
        title: 'Error',
        description: 'Failed to track order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusProgress = (currentStatus: string) => {
    const statusOrder = ['processing', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder.map((status, index) => ({
      status,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Order</h1>
        <p className="text-muted-foreground">
          Enter your order details to get real-time updates on your delivery
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Your Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Order Number *</label>
              <Input
                placeholder="e.g., MSK-20240101-001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number (optional)</label>
              <Input
                placeholder="Your registered phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <Button 
            onClick={trackOrder} 
            disabled={loading} 
            className="w-full md:w-auto mt-4"
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </Button>
        </CardContent>
      </Card>

      {/* Order Details */}
      {orderData && (
        <div className="space-y-6">
          {/* Order Info */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order #{orderData.order_number}</CardTitle>
                  <p className="text-muted-foreground">
                    Placed on {formatDate(orderData.created_at)}
                  </p>
                </div>
                <Badge 
                  variant={orderData.status === 'delivered' ? 'default' : 'secondary'}
                  className="text-sm"
                >
                  {statusConfig[orderData.status as keyof typeof statusConfig]?.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{orderData.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{orderData.customer_phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-sm text-muted-foreground">{orderData.customer_address}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Payment</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.payment_method.toUpperCase()} - {orderData.payment_status}
                  </p>
                  <p className="font-semibold text-lg">₹{orderData.total_amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Progress */}
          {orderData.status !== 'cancelled' && (
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted"></div>
                  {getStatusProgress(orderData.status).map((step, index) => {
                    const StatusIcon = statusConfig[step.status as keyof typeof statusConfig]?.icon;
                    return (
                      <div key={step.status} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? statusConfig[step.status as keyof typeof statusConfig]?.color
                              : 'bg-muted'
                          } text-white`}
                        >
                          <StatusIcon className="h-6 w-6" />
                        </div>
                        <p className={`text-xs mt-2 text-center ${
                          step.active ? 'font-semibold' : 'text-muted-foreground'
                        }`}>
                          {statusConfig[step.status as keyof typeof statusConfig]?.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orderData.order_items?.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × ₹{item.unit_price}
                        </p>
                      </div>
                      <p className="font-semibold">₹{item.total_price}</p>
                    </div>
                    {index < (orderData.order_items?.length || 0) - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;