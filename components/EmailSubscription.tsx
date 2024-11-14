"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://assets.mailerlite.com/jsonp/1187763/forms/137886229466187589/subscribe", {
        method: "POST",
        body: new URLSearchParams({
          "fields[email]": email,
          "ml-submit": "1",
          "anticsrf": "true"
        })
      });

      if (response.ok) {
        setIsSubscribed(true);
        toast.success("Successfully subscribed to daily disappointments!");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Maybe it's just not your day.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-white dark:bg-neutral-900"
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-neutral-600 dark:text-neutral-400"
        >
          Thanks for subscribing! Your daily dose of reality checks will arrive soon.
        </motion.div>
      )}
    </motion.div>
  );
}