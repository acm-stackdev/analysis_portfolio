"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RoughNotation } from "react-rough-notation";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactLottie from "./contact-lottie";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export const ContactSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Form submitted! (Backend pending)");
  }

  const socials = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/johntin97/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:johntin97@outlook.com", label: "Email" },
    {
      icon: MessageCircle,
      href: "https://wa.me/+447824583996",
      label: "WhatsApp",
    },
  ];

  return (
    <section
      id="contact"
      className="mx-auto min-h-[90vh] flex flex-col py-10 px-4 custom-grid bg-background-thin"
    >
      <div className="pb-12 text-center text-3xl font-bold">
        <RoughNotation type="underline" show={true} animationDuration={1500}>
          Get in touch
        </RoughNotation>
      </div>
      <div className="pb-12 text-center text-lg">
        <p>Feel free to reach out if you have any questions or queries!</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="hidden md:block w-full max-w-sm">
          <ContactLottie />
        </div>

        <div className="w-full max-w-md space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        className="bg-background"
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
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Subject"
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        className="min-h-[120px] bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                aria-label="Send Message"
                className="w-full text-secondary font-bold"
              >
                Send Message
              </Button>
            </form>
          </Form>

          <div className="flex md:hidden justify-center items-center gap-8 pt-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
