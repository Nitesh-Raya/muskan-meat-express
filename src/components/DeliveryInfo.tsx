import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Truck, DollarSign, Phone, CheckCircle } from 'lucide-react';

const DeliveryInfo = () => {
  return (
    <section id="delivery" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Fast & Reliable Delivery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh meat delivered to your doorstep across Kathmandu Valley. 
            Same-day delivery with our cold chain system.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Delivery Features */}
          <div className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Service Areas</h3>
                      <p className="text-muted-foreground mb-3">
                        We deliver across Kathmandu, Bhaktapur, and Lalitpur
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Kathmandu</Badge>
                        <Badge variant="outline">Bhaktapur</Badge>
                        <Badge variant="outline">Lalitpur</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Delivery Hours</h3>
                      <p className="text-muted-foreground mb-3">
                        Daily delivery service from morning to evening
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Service Hours:</span>
                          <span className="font-semibold">6:00 AM - 7:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Same-day cutoff:</span>
                          <span className="font-semibold text-primary">Before 2:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Delivery Speed</h3>
                      <p className="text-muted-foreground mb-3">
                        Fast delivery within local zones
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Local zones:</span>
                          <span className="font-semibold text-accent-foreground">Within 2 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Extended areas:</span>
                          <span className="font-semibold">Same day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Process */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                How to Order
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Browse & Add to Cart</h4>
                    <p className="text-muted-foreground">Select your favorite meat products and add them to cart</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Fill Delivery Details</h4>
                    <p className="text-muted-foreground">Provide your name, phone, and delivery address</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Order Confirmation</h4>
                    <p className="text-muted-foreground">Send order via WhatsApp or call us directly</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Fresh Delivery</h4>
                    <p className="text-muted-foreground">Receive fresh meat at your doorstep</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Contact Info */}
            <Card className="bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Cash on Delivery Available</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span className="font-semibold">Cold Chain Delivery</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent-foreground" />
                    <div>
                      <span className="font-semibold">Quick Order:</span>
                      <div className="text-sm text-muted-foreground">
                        9828913363 • 9841194692
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;