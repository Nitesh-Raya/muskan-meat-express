import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Minus, ShoppingBag, Phone } from 'lucide-react';
import { Product } from './ProductCard';
import { toast } from '@/hooks/use-toast';

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onClose, isOpen }: CartProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create order summary
    const orderSummary = items.map(item => 
      `${item.name} - ${item.quantity} ${item.unit} × ₹${item.price} = ₹${item.price * item.quantity}`
    ).join('\n');

    const message = `🛒 NEW ORDER from Muskan Meat Shop Website\n\n` +
      `👤 Customer: ${customerInfo.name}\n` +
      `📞 Phone: ${customerInfo.phone}\n` +
      `📍 Address: ${customerInfo.address}\n\n` +
      `📦 Order Details:\n${orderSummary}\n\n` +
      `💰 Total Amount: ₹${totalAmount.toLocaleString()}\n` +
      `📊 Total Items: ${totalItems}`;

    const whatsappUrl = `https://wa.me/9779828913363?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Order Sent!",
      description: "Your order has been sent via WhatsApp. We'll confirm shortly!",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-background h-full overflow-y-auto">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="sticky top-0 bg-background border-b z-10">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shopping Cart
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            {totalItems > 0 && (
              <Badge variant="outline" className="w-fit">
                {totalItems} items
              </Badge>
            )}
          </CardHeader>

          <CardContent className="p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Add some delicious meat products to get started!</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
                        🥩
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-semibold">₹{item.price}/{item.unit}</span>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Free delivery within Kathmandu Valley
                  </p>
                </div>

                <Separator />

                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Delivery Information</h3>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                    
                    <textarea
                      placeholder="Delivery Address *"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Order Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={handlePlaceOrder}
                  >
                    Order via WhatsApp
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open('tel:9828913363')}
                  >
                    <Phone className="w-4 h-4" />
                    Call to Order
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Cash on Delivery available • Same day delivery before 2 PM
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;