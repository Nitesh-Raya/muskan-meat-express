import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, ShoppingCart, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image?: string;
  description?: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [inventory, setInventory] = useState<{
    stock_quantity: number;
    status: string;
  } | null>(null);

  useEffect(() => {
    fetchInventory();
  }, [product.id]);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('stock_quantity, status')
        .eq('product_id', product.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Not found is ok
        console.error('Error fetching inventory:', error);
      } else {
        setInventory(data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const getStockBadge = () => {
    if (!inventory) return null;
    
    switch (inventory.status) {
      case 'in_stock':
        return (
          <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3" />
            In Stock
          </Badge>
        );
      case 'low_stock':
        return (
          <Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-800">
            <AlertTriangle className="h-3 w-3" />
            Only {inventory.stock_quantity} Left!
          </Badge>
        );
      case 'out_of_stock':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <X className="h-3 w-3" />
            Out of Stock
          </Badge>
        );
      default:
        return null;
    }
  };

  const isOutOfStock = inventory?.status === 'out_of_stock';

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }
    
    onAddToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.unit} of ${product.name} added to your cart.`,
    });
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border bg-gradient-to-b from-card to-card/50">
      <CardContent className="p-6">
        {/* Product Image */}
        <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-4 relative overflow-hidden">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl opacity-20">🥩</div>
            </div>
          )}
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              Popular
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>

          {/* Price and Stock Status */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">₹{product.price}</span>
              <span className="text-sm text-muted-foreground">/{product.unit}</span>
            </div>
            {getStockBadge()}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Qty:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={decrementQuantity}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={incrementQuantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="cart"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart - ₹{(product.price * quantity).toLocaleString()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;