import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCatalog from '@/components/ProductCatalog';
import Cart, { CartItem } from '@/components/Cart';
import DeliveryInfo from '@/components/DeliveryInfo';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Product } from '@/components/ProductCard';
import { InventoryProvider } from '@/hooks/useInventory';

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('muskan-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('muskan-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <InventoryProvider>
      <div className="min-h-screen bg-background">
        <Header
          cartItems={totalCartItems}
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <main>
          <Hero />
          <ProductCatalog onAddToCart={handleAddToCart} />
          <DeliveryInfo />
          <Reviews />
          <Contact />
        </main>
        
        <Footer />
        
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClose={() => setIsCartOpen(false)}
          isOpen={isCartOpen}
        />
      </div>
    </InventoryProvider>
  );
};

export default Index;
