import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Clock, Tag, Percent } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed_amount' | 'free_shipping';
  discount_value: number;
  minimum_order_amount: number | null;
  promo_code: string | null;
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
}

interface OffersSectionProps {
  onApplyPromo?: (promoCode: string) => void;
}

const OffersSection = ({ onApplyPromo }: OffersSectionProps) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers((data || []) as Offer[]);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load offers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDiscount = (type: string, value: number) => {
    switch (type) {
      case 'percentage':
        return `${value}% OFF`;
      case 'fixed_amount':
        return `₹${value} OFF`;
      case 'free_shipping':
        return 'FREE DELIVERY';
      default:
        return 'SPECIAL OFFER';
    }
  };

  const getOfferIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Percent className="h-5 w-5" />;
      case 'fixed_amount':
        return <Tag className="h-5 w-5" />;
      case 'free_shipping':
        return <Gift className="h-5 w-5" />;
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  const isOfferValid = (offer: Offer) => {
    const now = new Date();
    const validFrom = new Date(offer.valid_from);
    const validUntil = offer.valid_until ? new Date(offer.valid_until) : null;
    
    return now >= validFrom && (!validUntil || now <= validUntil);
  };

  const handleApplyPromo = (promoCode: string) => {
    if (onApplyPromo) {
      onApplyPromo(promoCode);
    }
    toast({
      title: 'Promo Code Applied',
      description: `Code "${promoCode}" has been applied to your order`,
    });
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Code Copied',
      description: `Promo code "${code}" copied to clipboard`,
    });
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-8">
        <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No active offers at the moment</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Special Offers & Deals
          </h2>
          <p className="text-muted-foreground">
            Don't miss out on these amazing discounts and offers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const isValid = isOfferValid(offer);
            
            return (
              <Card 
                key={offer.id} 
                className={`relative overflow-hidden ${!isValid ? 'opacity-75' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getOfferIcon(offer.discount_type)}
                      <CardTitle className="text-lg">{offer.title}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="font-bold">
                      {formatDiscount(offer.discount_type, offer.discount_value)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {offer.description}
                  </p>

                  {offer.minimum_order_amount && (
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span>Min. order: ₹{offer.minimum_order_amount}</span>
                    </div>
                  )}

                  {offer.valid_until && (
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        Valid until {new Date(offer.valid_until).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {offer.promo_code && (
                    <div className="space-y-2">
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Promo Code:</p>
                        <div className="flex items-center justify-between">
                          <code className="text-lg font-bold text-primary">
                            {offer.promo_code}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyPromoCode(offer.promo_code!)}
                            disabled={!isValid}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                      
                      {onApplyPromo && (
                        <Button
                          className="w-full"
                          onClick={() => handleApplyPromo(offer.promo_code!)}
                          disabled={!isValid}
                        >
                          Apply Now
                        </Button>
                      )}
                    </div>
                  )}

                  {!isValid && (
                    <Badge variant="destructive" className="w-full justify-center">
                      Offer Expired
                    </Badge>
                  )}
                </CardContent>

                {/* Decorative ribbon for featured offers */}
                {offer.discount_type === 'percentage' && offer.discount_value >= 15 && (
                  <div className="absolute -right-2 -top-2 bg-red-500 text-white px-8 py-1 text-xs font-bold transform rotate-12">
                    HOT DEAL
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;