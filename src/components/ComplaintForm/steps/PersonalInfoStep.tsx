
// import React from "react";
// import { useFormContext } from "@/context/FormContext";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// const schema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   phone: z.string().min(6, { message: "Please enter a valid phone number." }),
// });

// type FormValues = z.infer<typeof schema>;

// const PersonalInfoStep: React.FC = () => {
//   const { formState, setFormState } = useFormContext();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: formState.personalInfo.name,
//       email: formState.personalInfo.email,
//       phone: formState.personalInfo.phone,
//     },
//   });

//   React.useEffect(() => {
//     const { name, email, phone } = form.getValues();
//     setFormState(prev => ({
//       ...prev,
//       personalInfo: {
//         name,
//         email,
//         phone,
//       }
//     }));
//   }, [form.watch(), setFormState]);

//   return (
//     <div className="animate-fade-in">
//       <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
//       <p className="text-muted-foreground mb-6">
//         Please provide your contact details so we can follow up on your complaint.
//       </p>

//       <Form {...form}>
//         <form className="space-y-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem className="grid gap-2">
//                 <FormLabel htmlFor="name">Full Name</FormLabel>
//                 <FormControl>
//                   <Input 
//                     {...field} 
//                     id="name" 
//                     placeholder="Enter your full name" 
//                     className="transition-all focus:ring-2 focus:ring-primary/20"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem className="grid gap-2">
//                 <FormLabel htmlFor="email">Email Address</FormLabel>
//                 <FormControl>
//                   <Input 
//                     {...field} 
//                     id="email" 
//                     type="email" 
//                     placeholder="you@example.com" 
//                     className="transition-all focus:ring-2 focus:ring-primary/20"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem className="grid gap-2">
//                 <FormLabel htmlFor="phone">Phone Number</FormLabel>
//                 <FormControl>
//                   <Input 
//                     {...field} 
//                     id="phone" 
//                     type="tel" 
//                     placeholder="Your phone number" 
//                     className="transition-all focus:ring-2 focus:ring-primary/20"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default PersonalInfoStep;

import React, { useEffect, useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import VoiceInput from "./VoiceInput";

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
});

type FormValues = z.infer<typeof schema>;

type FieldName = "name" | "email" | "phone";

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

  useEffect(() => {
    const { name, email, phone } = form.getValues();
    setFormState((prev) => ({
      ...prev,
      personalInfo: { name, email, phone },
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
          {["name", "email", "phone"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as FieldName}
              render={({ field }) => (
                <FormItem className="grid gap-2 relative">
                  <FormLabel htmlFor={field.name}>{
                    field.name.charAt(0).toUpperCase() + field.name.slice(1)
                  }</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        {...field}
                        id={field.name}
                        type={field.name === "email" ? "email" : "text"}
                        placeholder={`Enter your ${field.name}`}
                        className="transition-all focus:ring-2 focus:ring-primary/20"
                      />
                      <VoiceInput 
                        targetInputId={field.name} 
                        onTranscriptChange={(transcript) => {
                          let processedTranscript = transcript.trim();
                          
                          if (field.name === "email") {
                            processedTranscript = processedTranscript
                              .toLowerCase()
                              .replace(/\bat the rate\b/g, "@")
                              .replace(/\s+/g, "");
                          }
                          
                          form.setValue(field.name as FieldName, processedTranscript);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoStep;