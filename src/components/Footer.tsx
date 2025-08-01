import { MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                M
              </div>
              <div>
                <h3 className="text-xl font-bold">Muskan Meat Shop</h3>
                <p className="text-sm opacity-80">Fresh • Quality • Hygienic</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Your trusted neighborhood meat shop in Kathmandu Valley. 
              We provide fresh, high-quality meat with reliable delivery service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#delivery" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Delivery Info
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 opacity-80" />
                <p className="text-sm opacity-90">
                  P82V+9G3 Muskan Butcher Shop<br />
                  Near Kathmandu 44600
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 opacity-80" />
                <div className="text-sm opacity-90">
                  <a href="tel:9828913363" className="hover:opacity-100 transition-opacity">
                    9828913363
                  </a>
                  {" • "}
                  <a href="tel:9841194692" className="hover:opacity-100 transition-opacity">
                    9841194692
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 opacity-80" />
                <p className="text-sm opacity-90">6:00 AM - 7:00 PM Daily</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>✓ Fresh Meat Delivery</li>
              <li>✓ Same-day Delivery</li>
              <li>✓ Cash on Delivery</li>
              <li>✓ Cold Chain System</li>
              <li>✓ Quality Guarantee</li>
              <li>✓ Hygienic Packaging</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80">
              © {currentYear} Muskan Meat Shop. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <span className="text-sm opacity-80">Follow us:</span>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-8 h-8 bg-secondary-foreground/20 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/30 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 bg-secondary-foreground/20 rounded-lg flex items-center justify-center hover:bg-secondary-foreground/30 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs opacity-70">
              Made with ❤️ for fresh meat lovers in Kathmandu Valley
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;