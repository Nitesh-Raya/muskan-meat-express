import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Ramesh K.",
    rating: 5,
    comment: "Muskan Meat Shop always delivers on time. The chicken is fresh and neatly packed.",
    location: "Kathmandu"
  },
  {
    id: 2,
    name: "Sunita G.",
    rating: 5,
    comment: "Affordable, hygienic, and reliable. I order from them every week.",
    location: "Bhaktapur"
  },
  {
    id: 3,
    name: "Amit R.",
    rating: 5,
    comment: "Their marinated tandoori chicken is a must-try!",
    location: "Lalitpur"
  },
  {
    id: 4,
    name: "Priya S.",
    rating: 5,
    comment: "Best quality mutton in the valley. The delivery is always on time and the meat is fresh.",
    location: "Kathmandu"
  },
  {
    id: 5,
    name: "Bikash T.",
    rating: 5,
    comment: "I've been ordering from Muskan for months now. Consistent quality and excellent service.",
    location: "Bhaktapur"
  },
  {
    id: 6,
    name: "Meera L.",
    rating: 5,
    comment: "The fish is always fresh and the prawns are amazing. Highly recommended!",
    location: "Lalitpur"
  }
];

const Reviews = () => {
  const averageRating = REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length;
  
  return (
    <section id="reviews" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating)
                      ? 'text-accent fill-accent'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">
              {averageRating.toFixed(1)} out of 5
            </span>
            <span className="text-muted-foreground">
              ({REVIEWS.length} reviews)
            </span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust Muskan Meat Shop 
            for their daily meat needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300 border border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/20" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-accent fill-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Comment */}
                  <blockquote className="text-foreground italic leading-relaxed">
                    "{review.comment}"
                  </blockquote>
                  
                  {/* Customer Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center font-bold text-primary">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Join Our Happy Customers
              </h3>
              <p className="text-muted-foreground mb-6">
                Experience the quality and freshness that our customers love. 
                Place your first order today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary-hover transition-colors"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Shopping
                </button>
                <button 
                  className="border border-border bg-background text-foreground px-6 py-3 rounded-md font-semibold hover:bg-muted transition-colors"
                  onClick={() => window.open('tel:9828913363')}
                >
                  Call to Order
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Reviews;