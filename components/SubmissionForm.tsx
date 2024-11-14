"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { value: "Career", label: "Career" },
  { value: "Relationships", label: "Relationships" },
  { value: "Finance", label: "Finance" },
  { value: "Personal", label: "Personal" },
  { value: "Fitness", label: "Fitness" },
  { value: "Social", label: "Social" },
  { value: "Health", label: "Health" },
];

export function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affirmation: "",
    category: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://assets.mailerlite.com/jsonp/1187763/forms/137886947822536439/subscribe", {
        method: "POST",
        body: new URLSearchParams({
          "fields[name]": formData.name,
          "fields[email]": formData.email,
          "fields[state]": formData.affirmation,
          "fields[country]": formData.category,
          "ml-submit": "1",
          "anticsrf": "true"
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Your disappointing contribution has been received!");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Failed to submit. The universe is against you today.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", affirmation: "", category: "" });
    setIsSuccess(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        resetForm();
      }
    }}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full h-auto py-4 text-lg font-semibold bg-white/10 dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-neutral-800/70 transition-all duration-300"
        >
          🎭 Disappoint Us & Get Featured
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Share Your Letdown Lines</DialogTitle>
          <p className="text-center text-neutral-600 dark:text-neutral-400">
            Think you've got the most hilariously disappointing affirmation? Share it with us for a chance to make others chuckle (or groan)!
          </p>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 mt-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name (or Nickname)</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                  required
                  placeholder=""
                  autoComplete="given-name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                  required
                  placeholder=""
                  autoComplete="email"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Disappointing Affirmation</label>
                <Textarea
                  value={formData.affirmation}
                  onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })}
                  className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 min-h-[100px]"
                  required
                  placeholder=""
                  maxLength={255}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose a Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="ml-form-embedSubmitLoad" />
                ) : (
                  "Hit Us with It"
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <h4 className="text-xl font-bold mb-2">Thank you!</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                Your contribution to collective disappointment has been received.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}