import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, X, Phone, MapPin } from 'lucide-react';
import muskanLogo from '@/assets/muskan-logo.png';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
}

const Header = ({ cartItems, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-lg sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        {/* Top contact bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>9828913363, 9841194692</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Delivery: 6 AM - 7 PM daily</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Same-day delivery before 2 PM
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img 
              src={muskanLogo} 
              alt="Muskan Meat Shop Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Muskan Meat Shop</h1>
              <p className="text-sm text-muted-foreground">Fresh • Quality • Hygienic</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-foreground hover:text-primary transition-colors">
              Products
            </a>
            <a href="#delivery" className="text-foreground hover:text-primary transition-colors">
              Delivery
            </a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors">
              Reviews
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[20px] h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <a 
                href="#products" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a 
                href="#delivery" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Delivery
              </a>
              <a 
                href="#reviews" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;