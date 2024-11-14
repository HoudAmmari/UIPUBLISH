"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cloud,
  HeartCrack,
  Wallet,
  Brain,
  Building2,
  Dumbbell,
  Users
} from "lucide-react";
import { SlotMachine } from "@/components/RouletteWheel";
import { SocialShare } from "@/components/SocialShare";
import { Toaster } from "@/components/ui/sonner";
import { EmailSubscription } from "@/components/EmailSubscription";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AffirmationDisplay } from "@/components/AffirmationDisplay";
import { SubmissionForm } from "@/components/SubmissionForm";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "career",
    label: "Career",
    emoji: "💼",
    icon: Building2,
    className: "category-career",
    borderClass: "border-[hsl(var(--career))]",
    affirmations: [
      "Your dream job just got filled by your less qualified colleague",
      "That promotion? Maybe in another decade",
      "Your 5-year plan is everyone else's 1-year achievement",
      "Your office plant is more successful than your career",
      "That startup idea? Someone's already doing it better",
      "Your LinkedIn profile is as empty as your ambitions",
      "Your resume gaps are longer than your work experience",
      "Your work-life balance is just all work, no life",
      "Your career path looks more like a career maze",
      "Your professional network consists of spam bots",
      "Your desk plant died from secondhand stress",
      "Your job title is 'Professional Meeting Attendee'",
      "Your workplace motivation is running on empty",
      "Your career goals are as realistic as your childhood dreams",
      "Your business cards are collecting more dust than contacts",
      "Your inbox has more unread emails than your potential",
      "Your workplace skills are as outdated as your computer",
      "Your professional development is stuck in 1999",
      "Your office reputation is 'The One Who Breaks the Printer'",
      "Your salary negotiations ended at 'Thank you for the opportunity'",
      "Your workplace achievements include perfect coffee runs",
      "Your career trajectory resembles a modern art piece",
      "Your networking strategy is avoiding eye contact",
      "Your workplace contributions are mainly emoji reactions",
      "Your performance review was just a long awkward silence"
    ]
  },
  {
    id: "relationships",
    label: "Relationships",
    emoji: "💔",
    icon: HeartCrack,
    className: "category-relationships",
    borderClass: "border-[hsl(var(--relationships))]",
    affirmations: [
      "Still single? Your cat isn't surprised",
      "Your ex is thriving without your drama",
      "Your perfect match just matched with someone else",
      "Your dating profile is as bland as unseasoned chicken",
      "Your relationship status: It's complicated with Netflix",
      "Your love life is as dead as your houseplants",
      "Your romantic prospects are as empty as your fridge",
      "Your dating history is a collection of red flags",
      "Your relationship goals are as realistic as your diet plans",
      "Your last date ended before the appetizers arrived",
      "Your crush is in a committed relationship with someone better",
      "Your romantic gestures are as smooth as sandpaper",
      "Your relationship advice comes from fortune cookies",
      "Your dating app matches are all in different countries",
      "Your love language is passive-aggressive sighing",
      "Your ideal type is 'anyone who messages back'",
      "Your relationship status is 'seen at 2:43 PM'",
      "Your romantic life is a series of left swipes",
      "Your dating strategy is hoping they make the first move",
      "Your relationship goals are inspired by sitcom couples",
      "Your flirting skills peaked in middle school",
      "Your love life is as organized as your sock drawer",
      "Your relationship red flags form a complete flag store",
      "Your dating profile says 'fluent in sarcasm'",
      "Your idea of romance is sharing your Netflix password"
    ]
  },
  {
    id: "finance",
    label: "Finance",
    emoji: "💸",
    icon: Wallet,
    className: "category-finance",
    borderClass: "border-[hsl(var(--finance))]",
    affirmations: [
      "Your savings account is more empty than your social calendar",
      "That crypto investment? Should've bought a lottery ticket",
      "Your budget plan is just a wishlist at this point",
      "Your retirement plan: Working forever",
      "Your investment strategy: Hoping for an inheritance",
      "Your bank account has trust issues",
      "Your financial planning is as stable as a house of cards",
      "Your credit score is playing limbo",
      "Your investment portfolio is a collection of meme stocks",
      "Your emergency fund is for coffee emergencies",
      "Your financial advisor ghosted you",
      "Your money management skills are stuck in preschool",
      "Your wallet is lighter than your workout routine",
      "Your financial future is as clear as mud",
      "Your budget categories: 'Essential' and 'More Essential'",
      "Your stock picks are consistently picking wrong",
      "Your financial literacy is written in crayon",
      "Your debt-free dream is just that - a dream",
      "Your money grows slower than your patience",
      "Your investment returns are negative achievements",
      "Your financial goals are as realistic as your diet",
      "Your savings strategy is finding coins in the couch",
      "Your retirement age keeps getting higher than your hopes",
      "Your bank statements are horror stories",
      "Your financial planning is just wishful thinking"
    ]
  },
  {
    id: "personal",
    label: "Personal",
    emoji: "🤔",
    icon: Brain,
    className: "category-personal",
    borderClass: "border-[hsl(var(--personal))]",
    affirmations: [
      "Your self-improvement journey is a circle",
      "That new hobby? Another future garage sale item",
      "Your meditation app judges your consistency",
      "Your journal entries read like a comedy script",
      "Your personal growth is slower than paint drying",
      "Your life goals are as organized as your junk drawer",
      "Your self-care routine is just procrastination",
      "Your personal boundaries are more flexible than yoga",
      "Your life purpose is still loading",
      "Your identity crisis is having an identity crisis",
      "Your emotional baggage needs its own baggage",
      "Your self-reflection shows mainly regrets",
      "Your personal brand is 'consistently inconsistent'",
      "Your life story is stuck in the draft phase",
      "Your inner peace is on permanent vacation",
      "Your personal space is as cluttered as your mind",
      "Your self-discovery journey keeps finding dead ends",
      "Your life balance is basically a circus act",
      "Your personal achievements need a microscope",
      "Your emotional intelligence took a sick day",
      "Your self-awareness is in airplane mode",
      "Your personal development is on energy-saving mode",
      "Your life choices are a modern art masterpiece",
      "Your authenticity is authentically confused",
      "Your personal mission statement: 'Whatever works'"
    ]
  },
  {
    id: "fitness",
    label: "Fitness",
    emoji: "🏋️‍♂️",
    icon: Dumbbell,
    className: "category-fitness",
    borderClass: "border-[hsl(var(--fitness))]",
    affirmations: [
      "Your gym membership is funding someone else's success",
      "Those new running shoes are great dust collectors",
      "Your fitness goals are as realistic as your diet plans",
      "Your workout routine: Walking to the fridge",
      "Your six-pack is still in transit, indefinitely",
      "Your fitness journey is mostly rest stops",
      "Your personal trainer gave up on you",
      "Your workout playlist is longer than your workout",
      "Your protein shake is basically chocolate milk",
      "Your fitness level: Professional couch tester",
      "Your exercise routine is scrolling workout videos",
      "Your gym selfies are all 'before' pictures",
      "Your fitness tracker counts naps as activity",
      "Your workout plan is theoretical physics",
      "Your athletic ability is watching sports",
      "Your muscle gain is invisible to the naked eye",
      "Your cardio consists of running late",
      "Your flexibility is limited to excuses",
      "Your fitness goals are on permanent snooze",
      "Your gym motivation left with your ex",
      "Your workout intensity: Gentle disappointment",
      "Your fitness progress is measured in sighs",
      "Your exercise equipment is modern art now",
      "Your sports performance is comedy gold",
      "Your physical peak was during naptime"
    ]
  },
  {
    id: "social",
    label: "Social",
    emoji: "🤦‍♂️",
    icon: Users,
    className: "category-social",
    borderClass: "border-[hsl(var(--social))]",
    affirmations: [
      "Your social life is as active as a sloth on vacation",
      "Your Instagram followers are mostly bots",
      "Your party invites got lost in spam (hopefully)",
      "Your best friend's best friend isn't you",
      "Your social battery: Permanently low",
      "Your friend group is an exclusive club of one",
      "Your social calendar is as empty as your promises",
      "Your group chat is just you and your alt accounts",
      "Your social skills peaked in kindergarten",
      "Your friend requests are all from scammers",
      "Your social circle is more of a social dot",
      "Your networking strategy is avoiding people",
      "Your social media presence is a ghost town",
      "Your party tricks are leaving early",
      "Your social anxiety has social anxiety",
      "Your friend zone is the only zone you know",
      "Your social life is in airplane mode",
      "Your conversation skills need a software update",
      "Your social status is 'left on read'",
      "Your friend count is lower than your age",
      "Your social gatherings are virtual only",
      "Your small talk is mostly awkward silence",
      "Your social plans are elaborate cancellation schemes",
      "Your friend recommendations are all relatives",
      "Your social network is a spider's web - empty and dusty"
    ]
  },
  {
    id: "health",
    label: "Health",
    emoji: "🤒",
    icon: Cloud,
    className: "category-health",
    borderClass: "border-[hsl(var(--health))]",
    affirmations: [
      "Your sleep schedule is more chaotic than your love life",
      "Your daily water intake: Mostly coffee",
      "Your vitamin D levels: As low as your motivation",
      "Your mental health day became a mental health year",
      "Your wellness routine is just scrolling health memes",
      "Your diet starts tomorrow (like always)",
      "Your step count is measured in feet, not miles",
      "Your vegetables are all technically french fries",
      "Your medical history is a best-selling novel",
      "Your healthy habits are on permanent vacation",
      "Your immune system is as reliable as public WiFi",
      "Your wellness goals are purely theoretical",
      "Your nutrition plan is based on takeout menus",
      "Your doctor's advice is in one ear, out the other",
      "Your health insurance is basically a prayer circle",
      "Your self-diagnosis skills are from WebMD",
      "Your wellness journey is stuck in traffic",
      "Your healthy lifestyle is more of a guideline",
      "Your medical appointments are social events",
      "Your health goals are written in invisible ink",
      "Your wellness routine is scrolling health apps",
      "Your body is a temple... of doom",
      "Your health choices are questionable at best",
      "Your medical knowledge comes from TV shows",
      "Your wellness plan is a work of fiction"
    ]
  }
];

export default function Home() {
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("career");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showSlots, setShowSlots] = useState(false);

  const generateAffirmation = (categoryId = selectedCategory) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    const affirmations = category.affirmations;
    const newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(newAffirmation);
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    const randomIndex = Math.floor(Math.random() * categories.length);
    const newCategory = categories[randomIndex].id;
    setSelectedCategory(newCategory);
    generateAffirmation(newCategory);
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setCurrentAffirmation("");
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
      <Toaster />
      <ThemeToggle />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Cloud className="w-12 h-12 text-[hsl(var(--health))]" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--career))] via-[hsl(var(--relationships))] to-[hsl(var(--finance))]">
                Underwhelming Inspirations
              </h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              Your daily dose of disappointing reality
            </p>
          </div>

          <Card className={cn(
            "p-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-xl border-2 border-dashed transition-colors duration-300",
            selectedCategoryData?.borderClass
          )}>
            {showSlots ? (
              <div className="space-y-8">
                <SlotMachine
                  isSpinning={isSpinning}
                  onSpinComplete={handleSpinComplete}
                  categories={categories}
                  selectedCategory={selectedCategory}
                />
                
                <AffirmationDisplay 
                  affirmation={currentAffirmation}
                  isSpinning={isSpinning}
                />

                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setShowSlots(false)}
                    variant="outline"
                    className="button-glow px-8 py-6 text-lg rounded-full border-2"
                  >
                    Back to Categories
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="button-glow px-8 py-6 text-lg rounded-full bg-[hsl(var(--career))] hover:bg-[hsl(var(--career))/90] border-none"
                  >
                    Pull the Lever
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid grid-cols-4 gap-2 sm:grid-cols-7 p-1 bg-transparent">
                    {categories.map(({ id, icon: Icon, className }) => (
                      <TabsTrigger 
                        key={id} 
                        value={id}
                        className={className}
                      >
                        <Icon className="w-5 h-5" />
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {categories.map(({ id, label, emoji }) => (
                    <TabsContent key={id} value={id}>
                      <h2 className="text-xl font-semibold text-center mb-4">
                        {emoji} {label}
                      </h2>
                    </TabsContent>
                  ))}
                </Tabs>

                <AffirmationDisplay 
                  affirmation={currentAffirmation}
                />

                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => generateAffirmation()}
                    className={`button-glow px-8 py-6 text-lg rounded-full ${categories.find(c => c.id === selectedCategory)?.className}`}
                  >
                    Get Real
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowSlots(true)}
                    className="button-glow px-8 py-6 text-lg rounded-full border-2"
                  >
                    Try Slots
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card className={cn(
              "p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border-2 border-dashed transition-colors duration-300",
              selectedCategoryData?.borderClass
            )}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span role="img" aria-label="dice">🎲</span>
                Daily Disappointment
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Subscribe for your daily dose of reality checks
              </p>
              <EmailSubscription />
            </Card>
            <Card className={cn(
              "p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border-2 border-dashed transition-colors duration-300",
              selectedCategoryData?.borderClass
            )}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span role="img" aria-label="target">🎯</span>
                Customizable Letdowns
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Got a particularly disappointing thought? Share it with the world!
              </p>
              <SubmissionForm />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}