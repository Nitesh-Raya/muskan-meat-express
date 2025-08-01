import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';

const Contact = () => {
  const openWhatsApp = () => {
    const message = "Hello! I'd like to inquire about your meat products.";
    window.open(`https://wa.me/9779828913363?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openMaps = () => {
    const address = "P82V+9G3 Muskan Butcher Shop, Muskan meat shop, Near, Kathmandu 44600";
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Visit Our Shop
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Come visit us in person or get in touch for fresh meat delivery. 
            We're here to serve you with the finest quality products.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Our Location</h3>
                    <p className="text-muted-foreground mb-4">
                      P82V+9G3 Muskan Butcher Shop<br />
                      Muskan meat shop, Near<br />
                      Kathmandu 44600, Nepal
                    </p>
                    <Button
                      variant="outline"
                      onClick={openMaps}
                      className="w-full sm:w-auto"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Contact Numbers</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-muted-foreground">
                        <a href="tel:9828913363" className="hover:text-primary transition-colors font-medium">
                          📞 9828913363
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <a href="tel:9841194692" className="hover:text-primary transition-colors font-medium">
                          📞 9841194692
                        </a>
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open('tel:9828913363')}
                        className="flex-1"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={openWhatsApp}
                        className="flex-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Business Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Sunday:</span>
                        <span className="font-semibold text-foreground">6:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Same-day delivery:</span>
                        <span className="font-semibold text-primary">Before 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Public Holidays:</span>
                        <span className="font-semibold text-foreground">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Order Form */}
          <div>
            <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Quick Order Inquiry
                </h3>
                
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const phone = formData.get('phone');
                  const message = formData.get('message');
                  
                  const whatsappMessage = `🛒 Quick Inquiry from Website\n\n` +
                    `👤 Name: ${name}\n` +
                    `📞 Phone: ${phone}\n` +
                    `💬 Message: ${message}`;
                  
                  window.open(`https://wa.me/9779828913363?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                }}>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                      placeholder="What would you like to order or ask about?"
                    />
                  </div>
                  
                  <Button type="submit" variant="hero" className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    Send Inquiry via WhatsApp
                  </Button>
                </form>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    🚚 Free delivery within Kathmandu Valley<br />
                    💰 Cash on Delivery available<br />
                    ❄️ Cold chain delivery for freshness
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;