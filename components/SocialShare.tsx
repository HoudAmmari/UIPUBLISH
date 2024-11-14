"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  affirmation: string;
}

export function SocialShare({ affirmation }: SocialShareProps) {
  const shareText = encodeURIComponent(`${affirmation} #LetsBeReal #RealTalk`);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: `${affirmation} #LetsBeReal #RealTalk`,
        });
      } catch (err) {
        toast.error("Couldn't share the affirmation");
      }
    } else {
      toast.error("Web Share API not supported");
    }
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank')}
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?quote=${shareText}`, '_blank')}
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://www.instagram.com/create/story?text=${shareText}`, '_blank')}
      >
        <Instagram className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
}