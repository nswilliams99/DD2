
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HOAQuoteForm = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    hoaName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    units: '',
    currentProvider: '',
    serviceType: '',
    additionalInfo: '',
    smsConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.hoaName.trim()) {
      newErrors.hoaName = 'HOA name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.units.trim()) {
      newErrors.units = 'Number of units is required';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Service type is required';
    }

    if (!formData.smsConsent) {
      newErrors.smsConsent = 'You must consent to SMS communications';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with your custom quote.",
      });
      
      // Reset form
      setFormData({
        contactName: '',
        hoaName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        units: '',
        currentProvider: '',
        serviceType: '',
        additionalInfo: '',
        smsConsent: false
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us at 970-888-7274.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section className="py-16 bg-background" aria-labelledby="hoa-quote-heading">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 id="hoa-quote-heading" className="text-3xl md:text-4xl font-bold text-dark-neutral mb-4 font-poppins">
              Request Your HOA Quote
            </h2>
            <p className="text-lg text-professional-medium font-inter">
              Get a custom waste management solution for your community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Contact Information Section */}
            <fieldset className="space-y-4">
              <legend className="text-xl font-semibold text-dark-neutral mb-4 font-poppins flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" aria-hidden="true" />
                Contact Information
              </legend>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-dark-neutral font-medium">
                    Contact Name *
                  </Label>
                  <Input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className={`transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/20 ${
                      errors.contactName ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    }`}
                    placeholder="Your full name"
                    required
                    aria-describedby={errors.contactName ? 'contactName-error' : undefined}
                    aria-invalid={!!errors.contactName}
                  />
                  {errors.contactName && (
                    <p id="contactName-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.contactName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hoaName" className="text-dark-neutral font-medium">
                    HOA/Community Name *
                  </Label>
                  <Input
                    id="hoaName"
                    type="text"
                    value={formData.hoaName}
                    onChange={(e) => handleInputChange('hoaName', e.target.value)}
                    className={`transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/20 ${
                      errors.hoaName ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    }`}
                    placeholder="Community name"
                    required
                    aria-describedby={errors.hoaName ? 'hoaName-error' : undefined}
                    aria-invalid={!!errors.hoaName}
                  />
                  {errors.hoaName && (
                    <p id="hoaName-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.hoaName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-dark-neutral font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-1" aria-hidden="true" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/20 ${
                      errors.email ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    }`}
                    placeholder="your.email@example.com"
                    required
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-dark-neutral font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-1" aria-hidden="true" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/20 ${
                      errors.phone ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    }`}
                    placeholder="(970) 555-0123"
                    required
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* SMS Consent Checkbox */}
              <div className="col-span-full">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="sms-consent"
                    checked={formData.smsConsent}
                    onCheckedChange={(checked) => handleInputChange('smsConsent', !!checked)}
                    className="mt-0.5"
                  />
                  <Label 
                    htmlFor="sms-consent" 
                    className={`text-xs cursor-pointer leading-relaxed ${
                      errors.smsConsent ? 'text-destructive' : 'text-gray-500'
                    }`}
                  >
                    I consent to receive marketing text messages (e.g., service reminders or billing updates) from Dumpster Diverz at the number provided, including messages sent via MessageDesk. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Unsubscribe anytime by replying STOP or clicking the unsubscribe link (where available). Reply HELP for help. <a href="/privacy-policy" className="underline">Privacy Policy</a> & <a href="/terms-of-service" className="underline">Terms</a>.
                  </Label>
                </div>
                {errors.smsConsent && (
                  <p role="alert" className="text-sm text-destructive font-medium mt-1">
                    {errors.smsConsent}
                  </p>
                )}
              </div>
            </fieldset>

            {/* Community Details Section */}
            <fieldset className="space-y-4">
              <legend className="text-xl font-semibold text-dark-neutral mb-4 font-poppins flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" aria-hidden="true" />
                Community Details
              </legend>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-dark-neutral font-medium">
                    Community Address *
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/20 ${
                      errors.address ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    }`}
                    placeholder="Street address"
                    required
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && (
                    <p id="address-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-dark-neutral font-medium">
                    City *
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/20 ${
                      errors.city ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    }`}
                    placeholder="Windsor, Fort Collins, etc."
                    required
                    aria-describedby={errors.city ? 'city-error' : undefined}
                    aria-invalid={!!errors.city}
                  />
                  {errors.city && (
                    <p id="city-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="units" className="text-dark-neutral font-medium">
                    Number of Units *
                  </Label>
                  <Input
                    id="units"
                    type="number"
                    min="1"
                    value={formData.units}
                    onChange={(e) => handleInputChange('units', e.target.value)}
                    className={`transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/20 ${
                      errors.units ? 'border-destructive focus-visible:ring-destructive/20' : ''
                    }`}
                    placeholder="Total homes/units"
                    required
                    aria-describedby={errors.units ? 'units-error' : undefined}
                    aria-invalid={!!errors.units}
                  />
                  {errors.units && (
                    <p id="units-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.units}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-dark-neutral font-medium">
                    Service Type *
                  </Label>
                  <Select 
                    value={formData.serviceType} 
                    onValueChange={(value) => handleInputChange('serviceType', value)}
                  >
                    <SelectTrigger 
                      id="serviceType"
                      className={`focus-visible:ring-4 focus-visible:ring-primary/20 ${
                        errors.serviceType ? 'border-destructive focus-visible:ring-destructive/20' : ''
                      }`}
                      aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
                      aria-invalid={!!errors.serviceType}
                    >
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-border shadow-lg z-50">
                      <SelectItem value="trash-only">Trash Collection Only</SelectItem>
                      <SelectItem value="trash-recycling">Trash + Recycling</SelectItem>
                      <SelectItem value="full-service">Full Service Package</SelectItem>
                      <SelectItem value="custom">Custom Solution</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.serviceType && (
                    <p id="serviceType-error" role="alert" className="text-sm text-destructive font-medium">
                      {errors.serviceType}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentProvider" className="text-dark-neutral font-medium">
                  Current Waste Provider (Optional)
                </Label>
                <Input
                  id="currentProvider"
                  type="text"
                  value={formData.currentProvider}
                  onChange={(e) => handleInputChange('currentProvider', e.target.value)}
                  className="focus-visible:ring-4 focus-visible:ring-primary/20"
                  placeholder="Current provider name"
                />
              </div>
            </fieldset>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-dark-neutral font-medium">
                Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                className="min-h-[100px] focus-visible:ring-4 focus-visible:ring-primary/20"
                placeholder="Any specific requirements, questions, or details about your community..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold font-inter transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                data-analytics-event="hoa-form-submit"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
                    Submitting Request...
                  </span>
                ) : (
                  'Submit Quote Request'
                )}
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-professional-medium font-inter">
                Or call us directly at{' '}
                <a 
                  href="tel:970-888-7274" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 rounded"
                >
                  970-888-7274
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HOAQuoteForm;
