"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export function EmailCapture() {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {
          register,
          handleSubmit,
          formState: { errors },
    } = useForm<FormData>({
          resolver: zodResolver(schema),
    });

  const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
                const res = await fetch("/api/waitlist", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email: data.email }),
                });
                if (!res.ok) {
                          throw new Error("Failed to join waitlist");
                }
                setSubmitted(true);
        } catch (err) {
                setError("Something went wrong. Please try again.");
        } finally {
                setIsLoading(false);
        }
  };

  return (
        <section className="bg-charcoal py-20 md:py-28">
              <Container>
                      <motion.div
                                  className="mx-auto max-w-2xl rounded-xl border border-accent/20 bg-charcoal-light p-8 text-center md:p-12"
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6 }}
                                >
                        {submitted ? (
                                              <motion.div
                                                              initial={{ opacity: 0, scale: 0.9 }}
                                                              animate={{ opacity: 1, scale: 1 }}
                                                            >
                                                            <CheckCircle className="mx-auto h-16 w-16 text-green-check" />
                                                            <h3 className="mt-4 font-heading text-2xl font-bold uppercase text-white">
                                                                            You&apos;re In
                                                            </h3>h3>
                                                            <p className="mt-2 text-warm-gray">
                                                                            Welcome to the community. Check your inbox for exclusive deals.
                                                            </p>p>
                                              </motion.div>motion.div>
                                            ) : (
                                              <>
                                                            <Mail className="mx-auto h-10 w-10 text-accent" />
                                                            <h2 className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                                                                            Join 10,000+ Shooters
                                                                            <br />
                                                                            Protecting Their Glass
                                                            </h2>h2>
                                                            <p className="mx-auto mt-3 max-w-md text-warm-gray">
                                                                            Get exclusive deals, field tips, and product updates. No spam —
                                                                            just the good stuff.
                                                            </p>p>
                                              
                                                            <form
                                                                              onSubmit={handleSubmit(onSubmit)}
                                                                              className="mt-8 flex flex-col gap-3 sm:flex-row"
                                                                            >
                                                                            <div className="flex-1">
                                                                                              <input
                                                                                                {...register("email")}
                                                                                                                    type="email"
                                                                                                                    placeholder="Enter your email"
                                                                                                                    className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-warm-gray-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                                                                                                                    aria-label="Email address"
                                                                                                                  />
                                                                              {errors.email && (
                                                                                                  <p className="mt-1 text-left text-sm text-red-cross">
                                                                                                    {errors.email.message}
                                                                                                    </p>p>
                                                                                              )}
                                                                            </div>div>
                                                                            <Button type="submit" size="md" disabled={isLoading}>
                                                                              {isLoading ? "Joining..." : "Join the Community"}
                                                                            </Button>Button>
                                                            </form>form>
                                              
                                                {error && (
                                                                <p className="mt-3 text-sm text-red-cross">{error}</p>p>
                                                            )}
                                              
                                                            <p className="mt-4 text-xs text-warm-gray-dark">
                                                                            Unsubscribe anytime. We respect your privacy.
                                                            </p>p>
                                              </>>
                                            )}
                      </motion.div>motion.div>
              </Container>Container>
        </section>section>
      );
}</></section>
