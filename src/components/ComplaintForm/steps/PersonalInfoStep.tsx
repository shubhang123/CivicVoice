
import React from "react";
import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
});

type FormValues = z.infer<typeof schema>;

const PersonalInfoStep: React.FC = () => {
  const { formState, setFormState } = useFormContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: formState.personalInfo.name,
      email: formState.personalInfo.email,
      phone: formState.personalInfo.phone,
    },
  });

  React.useEffect(() => {
    const { name, email, phone } = form.getValues();
    setFormState(prev => ({
      ...prev,
      personalInfo: {
        name,
        email,
        phone,
      }
    }));
  }, [form.watch(), setFormState]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      <p className="text-muted-foreground mb-6">
        Please provide your contact details so we can follow up on your complaint.
      </p>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    id="name" 
                    placeholder="Enter your full name" 
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    id="phone" 
                    type="tel" 
                    placeholder="Your phone number" 
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoStep;
