
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const QuoteRequestForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    address: '',
    message: '',
    smsConsent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.smsConsent) {
      toast({
        title: "Consent Required",
        description: "Please check the SMS consent box to submit your quote request.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await supabase
        .from('quote_requests')
        .insert(formData);

      if (error) throw error;

      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 2 business hours with a custom quote.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service_type: '',
        address: '',
        message: '',
        smsConsent: false,
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        <CardDescription>
          Get a custom quote for your waste management needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                aria-describedby="name-error"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                aria-describedby="email-error"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="sms-consent"
                checked={formData.smsConsent}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, smsConsent: !!checked }))}
                className="mt-0.5"
              />
              <Label 
                htmlFor="sms-consent" 
                className="text-xs text-gray-500 cursor-pointer leading-relaxed"
              >
                I consent to receive marketing text messages (e.g., service reminders or billing updates) from Dumpster Diverz at the number provided, including messages sent via MessageDesk. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Unsubscribe anytime by replying STOP or clicking the unsubscribe link (where available). Reply HELP for help. <a href="/privacy-policy" className="underline">Privacy Policy</a> & <a href="/terms-of-service" className="underline">Terms</a>.
              </Label>
            </div>
            <div>
              <Label htmlFor="service_type">Service Type *</Label>
              <Select value={formData.service_type} onValueChange={(value) => setFormData(prev => ({ ...prev, service_type: value }))}>
                <SelectTrigger aria-describedby="service-error" className="h-12 rounded-lg border-gray-300 bg-white shadow-md shadow-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential Waste Collection</SelectItem>
                  <SelectItem value="commercial">Commercial Waste Management</SelectItem>
                  <SelectItem value="rolloff">Roll-off Dumpster Rental</SelectItem>
                  <SelectItem value="recycling">Recycling Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Service Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Service address (street, city, state, zip)"
            />
          </div>

          <div>
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              placeholder="Tell us about your service needs, pickup frequency, or any questions..."
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-diverz-purple hover:bg-diverz-purple-dark"
          >
            {loading ? "Submitting..." : "Request Quote"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;
