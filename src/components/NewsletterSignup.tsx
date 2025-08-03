import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, User, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'inline' | 'card' | 'footer';
}

const NewsletterSignup = ({ className = '', variant = 'card' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.trim().toLowerCase(),
          phone: phone.trim() || null,
          name: name.trim() || null,
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: 'Already Subscribed',
            description: 'This email is already subscribed to our newsletter',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
        setEmail('');
        setPhone('');
        setName('');
        toast({
          title: 'Successfully Subscribed!',
          description: 'You will now receive our weekly deals & fresh updates',
        });
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: 'Subscription Failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="space-y-4">
      {!subscribed ? (
        <>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              <h3 className="font-semibold text-lg">Stay Updated!</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Subscribe for weekly deals & fresh updates!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              
              {variant === 'card' && (
                <>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Get exclusive deals, new product alerts, and freshness tips delivered to your inbox.
            </p>
          </form>
        </>
      ) : (
        <div className="text-center space-y-3 py-4">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <div>
            <h3 className="font-semibold text-lg text-green-700">Thank You!</h3>
            <p className="text-sm text-muted-foreground">
              You've successfully subscribed to our newsletter
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSubscribed(false)}
            className="text-sm"
          >
            Subscribe Another Email
          </Button>
        </div>
      )}
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className={`bg-muted/50 p-4 rounded-lg ${className}`}>
        {content}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        {content}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {content}
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;