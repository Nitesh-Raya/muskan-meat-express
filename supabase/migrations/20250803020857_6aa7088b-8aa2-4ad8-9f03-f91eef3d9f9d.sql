-- Create core tables for the enhanced meat shop features

-- Orders table for order tracking
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL DEFAULT 'cod' CHECK (payment_method IN ('cod', 'esewa', 'khalti', 'fonepay', 'stripe')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author TEXT NOT NULL DEFAULT 'Muskan Meat Shop',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Offers and discounts
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
  discount_value DECIMAL(10,2) NOT NULL,
  minimum_order_amount DECIMAL(10,2),
  promo_code TEXT UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Product inventory status
CREATE TABLE public.inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'low_stock', 'out_of_stock')),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Referral system
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_phone TEXT NOT NULL,
  referrer_name TEXT NOT NULL,
  referral_code TEXT NOT NULL UNIQUE,
  referred_phone TEXT,
  referred_name TEXT,
  reward_amount DECIMAL(10,2) NOT NULL DEFAULT 50.00,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'claimed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is an e-commerce site)
CREATE POLICY "Allow public read access to blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access to offers" ON public.offers FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access to inventory" ON public.inventory FOR SELECT USING (true);

-- Allow public insert for orders, newsletter, and referrals
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read orders by phone" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert order items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read order items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert referrals" ON public.referrals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read referrals" ON public.referrals FOR SELECT USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON public.inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.blog_posts (title, slug, content, excerpt, published) VALUES
('How to Store Fresh Meat at Home', 'how-to-store-fresh-meat', 'Proper storage of fresh meat is crucial for maintaining quality and safety...', 'Learn the best practices for storing fresh meat to maintain quality and safety.', true),
('Best Spices for Chicken Curry', 'best-spices-chicken-curry', 'Creating the perfect chicken curry requires the right blend of spices...', 'Discover the essential spices that make the perfect chicken curry.', true),
('Why Our Mutton Tastes Better', 'why-our-mutton-tastes-better', 'At Muskan Meat Shop, we take pride in sourcing the finest quality mutton...', 'Learn about our quality sourcing and preparation methods.', true);

INSERT INTO public.offers (title, description, discount_type, discount_value, minimum_order_amount, promo_code) VALUES
('Welcome Offer', '10% Off on Orders Above ₹1000', 'percentage', 10.00, 1000.00, 'MUSKAN10'),
('Weekend Special', 'Free Sukuti with Every Mutton Order', 'free_shipping', 0.00, 500.00, 'WEEKEND'),
('First Time Buyer', '₹100 Off on First Order', 'fixed_amount', 100.00, 800.00, 'FIRST100');

-- Insert inventory data for existing products
INSERT INTO public.inventory (product_id, stock_quantity, status) VALUES
('1', 25, 'in_stock'),
('2', 30, 'in_stock'),
('3', 15, 'in_stock'),
('4', 20, 'in_stock'),
('5', 18, 'in_stock'),
('6', 12, 'in_stock'),
('7', 8, 'in_stock'),
('8', 10, 'in_stock'),
('9', 6, 'in_stock'),
('10', 3, 'low_stock'),
('11', 5, 'in_stock'),
('12', 22, 'in_stock'),
('13', 16, 'in_stock'),
('14', 14, 'in_stock'),
('15', 9, 'in_stock'),
('16', 12, 'in_stock'),
('17', 15, 'in_stock'),
('18', 2, 'low_stock'),
('19', 8, 'in_stock'),
('20', 0, 'out_of_stock'),
('21', 20, 'in_stock'),
('22', 25, 'in_stock'),
('23', 18, 'in_stock'),
('24', 22, 'in_stock');