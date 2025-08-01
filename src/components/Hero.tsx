import { Button } from '@/components/ui/button';
import { Truck, Clock, Shield, Star } from 'lucide-react';
import heroImage from '@/assets/hero-meat-shop.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-background to-muted overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fresh meat selection at Muskan Meat Shop"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium">Kathmandu's Trusted Meat Shop</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Fresh & 
                <span className="text-primary block">Quality Meat</span>
                <span className="text-2xl lg:text-3xl font-normal text-muted-foreground block mt-2">
                  Delivered to Your Door
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Premium quality chicken, mutton, buffalo meat, and seafood. 
                Hygienically prepared with same-day delivery across Kathmandu Valley.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('tel:9828913363')}
              >
                Call to Order
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Free Delivery</h3>
                  <p className="text-sm text-muted-foreground">Within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Same Day</h3>
                  <p className="text-sm text-muted-foreground">Order before 2 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">100% Fresh</h3>
                  <p className="text-sm text-muted-foreground">Quality guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats/Info Card */}
          <div className="lg:flex justify-center">
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-border max-w-md">
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Serving Kathmandu Since Years</h3>
                  <p className="text-muted-foreground">Your trusted neighborhood meat shop</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Products</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    📍 Near Kathmandu 44600
                  </p>
                  <p className="text-sm text-muted-foreground">
                    🕕 6 AM - 7 PM Daily
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;