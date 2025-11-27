
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCreateRolloffQuote } from '@/hooks/useRolloffQuotes';

const quoteFormSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  business_name: z.string().optional(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  location: z.string().min(2, 'Please enter your location'),
  dumpster_sizes: z.array(z.string()).min(1, 'Please select at least one dumpster size'),
  material_types: z.string().optional(),
  project_duration: z.string().optional(),
  best_contact_time: z.string().optional(),
  notes: z.string().optional(),
  smsConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to SMS communications to submit this form',
  }),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface RolloffQuoteFormProps {
  townSlug: string;
  townName: string;
}

const dumpsterSizes = ['12 Yard', '15 Yard', '20 Yard', '30 Yard'];
const contactTimes = ['Morning (8AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-8PM)', 'Anytime'];
const projectDurations = ['1-3 days', '4-7 days', '1-2 weeks', '2-4 weeks', 'More than 4 weeks'];

const RolloffQuoteForm = ({ townSlug, townName }: RolloffQuoteFormProps) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const { toast } = useToast();
  const createQuote = useCreateRolloffQuote();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      full_name: '',
      business_name: '',
      phone: '',
      email: '',
      location: '',
      dumpster_sizes: [],
      material_types: '',
      project_duration: '',
      best_contact_time: '',
      notes: '',
      smsConsent: false,
    },
  });

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    form.setValue('dumpster_sizes', newSizes);
  };

  const onSubmit = async (data: QuoteFormData) => {
    try {
      // Explicitly construct the object with required fields properly typed
      const quoteData = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        business_name: data.business_name || undefined,
        material_types: data.material_types || undefined,
        project_duration: data.project_duration || undefined,
        best_contact_time: data.best_contact_time || undefined,
        notes: data.notes || undefined,
        town_slug: townSlug,
        dumpster_sizes: selectedSizes,
      };

      await createQuote.mutateAsync(quoteData);

      toast({
        title: "Quote Request Submitted!",
        description: `We'll contact you soon about your rolloff dumpster rental in ${townName}.`,
      });

      form.reset();
      setSelectedSizes([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="quote-form" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-professional-dark mb-4 font-poppins">
              Get Your Free Quote
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Tell us about your project and we'll provide a competitive quote
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rolloff Dumpster Quote Request</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you with pricing and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="business_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Business or company name (optional)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="smsConsent"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <div className="flex items-start space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <FormLabel className="text-xs text-gray-500 cursor-pointer leading-relaxed">
                            I consent to receive marketing text messages (e.g., service reminders or billing updates) from Dumpster Diverz at the number provided, including messages sent via MessageDesk. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Unsubscribe anytime by replying STOP or clicking the unsubscribe link (where available). Reply HELP for help. <a href="/privacy-policy" className="underline">Privacy Policy</a> & <a href="/terms-of-service" className="underline">Terms</a>.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Project location (city or ZIP code)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Dumpster Size(s) Needed *</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {dumpsterSizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={size}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => handleSizeToggle(size)}
                          />
                          <label
                            htmlFor={size}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                    {form.formState.errors.dumpster_sizes && (
                      <p className="text-sm font-medium text-destructive mt-1">
                        {form.formState.errors.dumpster_sizes.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="material_types"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Materials</FormLabel>
                          <FormControl>
                            <Input placeholder="Type of materials to dispose" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="project_duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="How long will you need the dumpster?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectDurations.map((duration) => (
                                <SelectItem key={duration} value={duration}>
                                  {duration}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="best_contact_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Time to Contact</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="When is the best time to reach you?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {contactTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project requirements or any questions..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="bg-diverz-pink hover:bg-diverz-pink-dark text-white font-semibold py-3 px-8 flex-1"
                      disabled={createQuote.isPending}
                    >
                      {createQuote.isPending ? 'Submitting...' : 'Order Now'}
                    </Button>
                    <Button
                      type="submit"
                      variant="outline"
                      className="border-diverz-purple text-diverz-purple hover:bg-diverz-purple hover:text-white font-semibold py-3 px-8 flex-1"
                      disabled={createQuote.isPending}
                    >
                      Get a Quote
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RolloffQuoteForm;
