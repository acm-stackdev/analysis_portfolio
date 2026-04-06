"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RoughNotation } from "react-rough-notation";
import {
  Linkedin,
  Mail,
  MessageCircle,
  Facebook,
  Send,
  MailQuestion,
} from "lucide-react";
import Link from "next/link";

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
import z from "zod";
import { contactSchema } from "@/schemas";
import { sendContactMessage } from "@/actions/contact";
import { useTransition } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

export const ContactSection = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    startTransition(() => {
      sendContactMessage(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          form.reset();
        }
      });
    });
  }

  const socials = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/johntin97/",
      label: "LinkedIn",
    },
    {
      name: "FaceBook",
      href: "https://www.facebook.com/profile.php?id=61559895252873",
      icon: Facebook,
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
      className="mx-auto min-h-[95vh] flex flex-col py-16 px-6 md:px-20 lg:px-24 custom-grid bg-background-thin"
    >
      <div className="pb-8 text-center text-3xl md:text-4xl font-bold">
        <RoughNotation type="underline" show={true} animationDuration={1500}>
          Get in touch
        </RoughNotation>
      </div>

      <div className="pb-16 max-w-2xl mx-auto leading-relaxed text-center text-base md:text-lg text-muted-foreground">
        <p>
          As a data analyst, I am motivated by transforming data into actionable
          insights and continuously taking on new challenges. If you’re looking
          to make data-driven decisions or collaborate on impactful projects,
          feel free to reach out!
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-12 lg:gap-20">
        {/* Direct Contact Method */}
        <div className="w-full max-w-sm flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <MailQuestion className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Quick Email</h3>
            <p className="text-sm text-muted-foreground">
              Prefer your own email client? <br /> Click the button below to
              send me a direct message.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit"
          >
            <Link href="mailto:johntin97@outlook.com">
              <Button className="px-8 h-12 text-base font-bold text-secondary bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all">
                Send Direct Email
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Separator */}
        <div className="flex flex-row md:flex-col items-center justify-center gap-4">
          <div className="h-px w-full md:w-px md:h-full bg-border"></div>
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest bg-background-thin px-2 py-1">
            OR
          </span>
          <div className="h-px w-full md:w-px md:h-full bg-border"></div>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-md">
          <div className="bg-background/50 backdrop-blur-sm border border-border p-8 rounded-3xl shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Send a Message</h3>
              <p className="text-xs text-muted-foreground">
                Fill out the form and I'll get back to you shortly.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className="bg-background h-11 border-border/60 focus:border-primary/50 transition-colors"
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
                          className="bg-background h-11 border-border/60 focus:border-primary/50 transition-colors"
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
                          className="bg-background h-11 border-border/60 focus:border-primary/50 transition-colors"
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
                          className="min-h-[140px] bg-background border-border/60 focus:border-primary/50 transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  aria-label="Send Message"
                  className="w-full h-11 text-secondary font-bold group"
                >
                  {isPending ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex md:hidden justify-center items-center gap-8 pt-8 pb-8">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
