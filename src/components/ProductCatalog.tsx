import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard, { Product } from './ProductCard';

// Import natural product images
import chickenWholeImg from '@/assets/natural-chicken-whole.jpg';
import chickenPiecesImg from '@/assets/natural-chicken-pieces.jpg';
import chickenBreastImg from '@/assets/natural-chicken-breast-raw.jpg';
import muttonGoatImg from '@/assets/natural-mutton-goat.jpg';
import beefRawImg from '@/assets/natural-beef-raw.jpg';
import fishFreshImg from '@/assets/natural-fish-fresh.jpg';
import seafoodPrawnsImg from '@/assets/natural-seafood-prawns.jpg';

const PRODUCTS: Product[] = [
  // Chicken
  { id: '1', name: 'Whole Chicken (With Skin)', price: 360, unit: 'kg', category: 'Chicken', featured: true, image: chickenWholeImg },
  { id: '2', name: 'Chicken Curry Cut', price: 380, unit: 'kg', category: 'Chicken', featured: true, image: chickenPiecesImg },
  { id: '3', name: 'Boneless Chicken Breast', price: 520, unit: 'kg', category: 'Chicken', image: chickenBreastImg },
  { id: '4', name: 'Chicken Drumsticks', price: 420, unit: 'kg', category: 'Chicken', image: chickenWholeImg },
  { id: '5', name: 'Chicken Wings', price: 400, unit: 'kg', category: 'Chicken', image: chickenPiecesImg },
  { id: '6', name: 'Chicken Liver', price: 300, unit: 'kg', category: 'Chicken', image: chickenBreastImg },

  // Mutton
  { id: '7', name: 'Mutton Curry Cut', price: 1100, unit: 'kg', category: 'Mutton', featured: true, image: muttonGoatImg },
  { id: '8', name: 'Boneless Mutton', price: 1300, unit: 'kg', category: 'Mutton', image: beefRawImg },
  { id: '9', name: 'Mutton Mince (Keema)', price: 1250, unit: 'kg', category: 'Mutton', image: muttonGoatImg },
  { id: '10', name: 'Mutton Liver', price: 700, unit: 'kg', category: 'Mutton', image: beefRawImg },
  { id: '11', name: 'Mutton Ribs & Chops', price: 1150, unit: 'kg', category: 'Mutton', image: muttonGoatImg },

  // Buffalo Meat
  { id: '12', name: 'Buff Curry Cut', price: 450, unit: 'kg', category: 'Buffalo', image: beefRawImg },
  { id: '13', name: 'Boneless Buff', price: 550, unit: 'kg', category: 'Buffalo', image: muttonGoatImg },
  { id: '14', name: 'Buff Mince', price: 520, unit: 'kg', category: 'Buffalo', image: beefRawImg },
  { id: '15', name: 'Buff Liver', price: 300, unit: 'kg', category: 'Buffalo', image: muttonGoatImg },

  // Fish & Seafood
  { id: '16', name: 'Rohu/Katla Fish', price: 480, unit: 'kg', category: 'Fish & Seafood', image: fishFreshImg },
  { id: '17', name: 'Tilapia', price: 450, unit: 'kg', category: 'Fish & Seafood', image: fishFreshImg },
  { id: '18', name: 'Prawns (Medium)', price: 950, unit: 'kg', category: 'Fish & Seafood', featured: true, image: seafoodPrawnsImg },
  { id: '19', name: 'Dry Fish (Sukuti)', price: 750, unit: 'kg', category: 'Fish & Seafood', image: fishFreshImg },
  { id: '20', name: 'Crab (On Order)', price: 250, unit: 'piece', category: 'Fish & Seafood', image: seafoodPrawnsImg },

  // Ready-to-Cook
  { id: '21', name: 'Tandoori Chicken (Marinated)', price: 350, unit: '500g', category: 'Ready-to-Cook', featured: true, image: chickenBreastImg },
  { id: '22', name: 'Chicken Seekh Kabab (Frozen)', price: 280, unit: '6 pcs', category: 'Ready-to-Cook', image: chickenPiecesImg },
  { id: '23', name: 'Buff Momos (Frozen)', price: 200, unit: '10 pcs', category: 'Ready-to-Cook', image: beefRawImg },
  { id: '24', name: 'Chicken Nuggets', price: 220, unit: 'pack', category: 'Ready-to-Cook', image: chickenWholeImg },
];

const CATEGORIES = ['All', 'Chicken', 'Mutton', 'Buffalo', 'Fish & Seafood', 'Ready-to-Cook'];

interface ProductCatalogProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Fresh Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide selection of fresh, high-quality meat and seafood. 
            All products are hygienically prepared and delivered fresh to your door.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Category Stats */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;