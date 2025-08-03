import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Phone } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const whatsappNumber = '+9779876543210'; // Replace with actual WhatsApp number
  const defaultMessage = "Hi! I'm interested in your fresh meat products. Could you help me with my order?";

  const quickQuestions = [
    "What's the delivery time?",
    "Is boneless mutton available?",
    "How do I place a bulk order?",
    "What are your payment options?",
    "Do you deliver to my area?",
  ];

  const sendWhatsAppMessage = (messageText: string) => {
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  const makeCall = () => {
    window.open(`tel:${whatsappNumber}`, '_self');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
          <Card className="shadow-2xl border-green-200">
            <CardHeader className="bg-green-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <div>
                    <CardTitle className="text-white text-sm">Muskan Meat Shop</CardTitle>
                    <p className="text-green-100 text-xs">Usually replies instantly</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-600 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  👋 Hi there! How can we help you today?
                </p>
              </div>

              {/* Quick Questions */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Quick Questions:</p>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs h-auto py-2 px-3"
                    onClick={() => sendWhatsAppMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Or send a custom message:</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full p-2 text-sm border rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => sendWhatsAppMessage(message || defaultMessage)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  onClick={makeCall}
                  variant="outline"
                  size="sm"
                  className="border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                We'll respond as soon as possible!
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;