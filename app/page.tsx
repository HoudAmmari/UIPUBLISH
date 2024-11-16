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
import { Toaster } from "@/components/ui/toaster";
import { EmailSubscription } from "@/components/EmailSubscription";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AffirmationDisplay } from "@/components/AffirmationDisplay";
import { SubmissionForm } from "@/components/SubmissionForm";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  emoji: string;
  icon: any;
  className: string;
  buttonClass: string;
  borderClass: string;
  affirmations: string[];
}

const categories: Category[] = [
  {
    id: "career",
    label: "Career",
    emoji: "💼",
    icon: Building2,
    className: "category-career",
    buttonClass: "category-button-career",
    borderClass: "card-border-career",
    affirmations: [
      "Your dream job just got filled by your less qualified colleague",
      "That promotion? Maybe in another decade",
      "Your 5-year plan is everyone else's 1-year achievement",
      "Your office plant is more successful than your career",
      "That startup idea? Someone's already doing it better",
      "Your boss thinks you're just here for the free coffee",
      "Another meeting? Perfect, more time to stare at the ceiling",
      "Your resume is a work of fiction",
      "Your work emails are the highlight of your day (said no one ever)",
      "Your desk is a mess, just like your career",
      "Your job security is as stable as a house of cards",
      "Your coffee breaks are the only exciting part of your job",
      "You're the reason the coffee machine is always breaking down",
      "Your career path is like a GPS without a signal",
      "Your professional growth is stuck in dial-up speed",
      "Your LinkedIn endorsements are from bots",
      "Your job performance: As expected... poorly",
      "Your work-life balance is just work, really",
      "Your desk chair has seen better days, just like you",
      "Your office gossip is the only thing moving fast",
      "Your keyboard is the only thing getting clicks",
      "Your inbox is a black hole of unread messages",
      "Your career advice is on YouTube, because no one listens to you",
      "Your job title sounds impressive on paper, not in reality",
      "Your career ladder is missing a few rungs",
      "Your professional achievements are imaginary",
      "Your office puns are the only thing keeping you awake",
      "Your work anniversaries are forgotten, like your contributions",
      "Your career trajectory is more like a yo-yo",
      "Your job satisfaction is a myth",
      "Your career goals are as clear as mud",
      "Your performance reviews are just a formality",
      "Your office snacks are better organized than your tasks",
      "Your project deadlines are suggestions, not rules",
      "Your workplace friendships are as deep as puddles",
      "Your office attire is 'casual', meaning 'unwashed'",
      "Your job perks include more stress",
      "Your professional network is just your mom",
      "Your office politics are your only learning opportunities",
      "Your career milestones are birthdays and anniversaries",
      "Your work achievements are only recognized in your dreams",
      "Your job is as fulfilling as a vending machine",
      "Your career aspirations are stuck in a rerun"
    ]
  },
  {
    id: "relationships",
    label: "Relationships",
    emoji: "💔",
    icon: HeartCrack,
    className: "category-relationships",
    buttonClass: "category-button-relationships",
    borderClass: "card-border-relationships",
    affirmations: [
      "Still single? Your cat isn't surprised",
      "Your ex is thriving without your drama",
      "Your perfect match just matched with someone else",
      "Your dating profile is as bland as unseasoned chicken",
      "Your relationship status: It's complicated with Netflix",
      "Your love life is like a broken record",
      "Your date ideas are as exciting as watching paint dry",
      "Your romantic gestures are always misinterpreted",
      "Your conversations are as deep as a puddle",
      "Your flirting skills need a tutorial",
      "Your last relationship was a training wheel for disasters",
      "Your idea of romance is sharing the same Wi-Fi",
      "Your love letters read like spam emails",
      "Your partner was just a placeholder",
      "Your hugs are as warm as icebergs",
      "Your breakup texts are read by autocorrect",
      "Your dates always end with 'it was nice to meet you'",
      "Your romantic playlist is just elevator music",
      "Your love life is sponsored by awkward silences",
      "Your anniversary is just another day on the calendar",
      "Your dates are as predictable as Monday mornings",
      "Your romantic comedy life isn't very funny",
      "Your love story needs better editing",
      "Your pick-up lines are straight out of a cringe library",
      "Your relationship advice is from a sitcom",
      "Your cuddle sessions are one-sided",
      "Your emotional availability is in vacation mode",
      "Your romantic plans are subject to weather",
      "Your love life is sponsored by procrastination",
      "Your dates are always on a budget",
      "Your romantic interests are as fleeting as trends",
      "Your partner is only half-interested",
      "Your love life has more plot holes than a sieve",
      "Your dates always turn into group hangouts",
      "Your romantic gestures are like invisible ink",
      "Your love life is a series of unfortunate events",
      "Your romantic gestures are lost in translation",
      "Your heart is on backorder",
      "Your dates are always double-booked",
      "Your romantic timing is always off",
      "Your relationship goals are set by unrealistic standards",
      "Your love life is stuck in traffic",
      "Your emotional connections are as strong as spaghetti",
      "Your relationship milestones are skipped",
      "Your dates end with 'Let’s do this again sometime… maybe'",
      "Your love life needs a software update"
    ]
  },
  {
    id: "finance",
    label: "Finance",
    emoji: "💸",
    icon: Wallet,
    className: "category-finance",
    buttonClass: "category-button-finance",
    borderClass: "card-border-finance",
    affirmations: [
      "Your savings account is more empty than your social calendar",
      "That crypto investment? Should've bought a lottery ticket",
      "Your budget plan is just a wishlist at this point",
      "Your retirement plan: Working forever",
      "Your investment strategy: Hoping for an inheritance",
      "Your credit score is a horror story",
      "Your bank account is on a permanent diet",
      "Your financial goals are like unicorns",
      "Your debts have debts",
      "Your wallet has more holes than Swiss cheese",
      "Your spending habits are a cautionary tale",
      "Your financial advisor is a magic 8-ball",
      "Your money management skills are a myth",
      "Your emergency fund is just a daydream",
      "Your bank fees are your only savings",
      "Your credit card statements are nightmares",
      "Your financial literacy is from fortune cookies",
      "Your budget spreadsheets are empty",
      "Your paycheck disappears faster than your motivation",
      "Your money grows at the speed of a sloth",
      "Your investments are in imaginary stocks",
      "Your financial plan is like a broken compass",
      "Your expenses always exceed your income",
      "Your money jar is a sieve",
      "Your credit card is your second mortgage",
      "Your financial security is a mirage",
      "Your savings strategy is 'hope and pray'",
      "Your investments are in napkins",
      "Your financial goals are in the witness protection program",
      "Your cash flow is a leaky faucet",
      "Your financial future is a cliffhanger",
      "Your money is always in transit to somewhere else",
      "Your financial independence is someone else's problem",
      "Your budgeting skills are best described as 'winging it'",
      "Your wealth accumulation is stuck in traffic",
      "Your financial portfolio is mostly IOUs",
      "Your savings account is a black hole",
      "Your financial planning is a puzzle missing pieces",
      "Your money habits are on vacation",
      "Your financial dreams are postponed indefinitely",
      "Your wallet's favorite color is empty",
      "Your income is an urban legend",
      "Your financial wisdom comes from guessing",
      "Your bank statements are abstract art",
      "Your money mantra is 'spend first, worry later'"
    ]
  },
  {
    id: "personal",
    label: "Personal",
    emoji: "🤔",
    icon: Brain,
    className: "category-personal",
    buttonClass: "category-button-personal",
    borderClass: "card-border-personal",
    affirmations: [
      "Your self-improvement journey is a circle",
      "That new hobby? Another future garage sale item",
      "Your meditation app judges your consistency",
      "Your journal entries read like a comedy script",
      "Your personal growth is slower than paint drying",
      "Your self-care routine is just binge-watching",
      "Your life goals are written in invisible ink",
      "Your personal development books gather dust",
      "Your ambition is on backorder",
      "Your productivity is in hibernation",
      "Your goals have goals of their own",
      "Your personal achievements are imaginary",
      "Your reflection is still under construction",
      "Your self-confidence is a bit rusty",
      "Your dreams are on hold indefinitely",
      "Your aspirations are stuck in a traffic jam",
      "Your self-love is lost in the mail",
      "Your personal motto is 'maybe later'",
      "Your motivation is perpetually on coffee break",
      "Your inner strength is as hidden as your keys",
      "Your self-awareness is on vacation",
      "Your personal journey has a lot of detours",
      "Your self-esteem needs a tune-up",
      "Your personal milestones are like mirages",
      "Your self-discipline is a flaky friend",
      "Your personal narrative is a choose-your-own-adventure",
      "Your identity crisis is getting too comfortable",
      "Your self-expression is censored by procrastination",
      "Your personal challenges are unresolved cliffhangers",
      "Your self-image is blurry",
      "Your personal brand is nonexistent",
      "Your inner peace is in rush hour",
      "Your personal growth is buffering",
      "Your self-reflection is off the rails",
      "Your personal aspirations are just pipe dreams",
      "Your self-improvement is a never-ending story",
      "Your personal goals are pending approval",
      "Your self-actualization is on a coffee break",
      "Your personal drive is parked",
      "Your self-worth is lost in translation",
      "Your personal development plan needs a map",
      "Your self-inspiration is a broken lightbulb",
      "Your personal progress is a maze",
      "Your personal achievements are in a time capsule",
      "Your self-enhancement is on hold",
      "Your personal mission is stuck in neutral",
      "Your personal breakthrough is in traffic"
    ]
  },
  {
    id: "fitness",
    label: "Fitness",
    emoji: "🏋️‍♂️",
    icon: Dumbbell,
    className: "category-fitness",
    buttonClass: "category-button-fitness",
    borderClass: "card-border-fitness",
    affirmations: [
      "Your gym membership is funding someone else's success",
      "Those new running shoes are great dust collectors",
      "Your fitness goals are as realistic as your diet plans",
      "Your workout routine: Walking to the fridge",
      "Your six-pack is still in transit, indefinitely",
      "Your fitness tracker is just a fancy bracelet",
      "Your exercise regime is Netflix watching",
      "Your gym selfies are the only reps you do",
      "Your dumbbells are collecting more dust than gains",
      "Your fitness plan is a series of excuses",
      "Your push-ups are all in your mind",
      "Your squat form is a work of art (abstract)",
      "Your fitness motivation is on holiday",
      "Your yoga poses are just falling asleep",
      "Your treadmill is a clothes hanger",
      "Your fitness goals are listed under 'Maybe Later'",
      "Your workout playlist is elevator music",
      "Your fitness journey is a scenic drive with no destination",
      "Your burpees are more like burpees of pain",
      "Your fitness app is just a reminder for more Netflix",
      "Your gym bag is a storage unit for laziness",
      "Your fitness dreams are full-body naps",
      "Your personal trainer is a motivational poster",
      "Your fitness progress is a phantom limb",
      "Your stretching is just reaching for snacks",
      "Your cardio is a slow walk to the kitchen",
      "Your fitness ambitions are 'someday soon'",
      "Your weightlifting is just lifting spirits",
      "Your fitness classes are snooze buttons",
      "Your core strength is built on sarcasm",
      "Your fitness inspiration is from old gym memes",
      "Your bench press is pressing snooze",
      "Your fitness routine is a broken record",
      "Your HIIT workouts are just high in idle thoughts",
      "Your fitness goals are marinated in procrastination",
      "Your muscle gains are mythical beasts",
      "Your fitness journey is a merry-go-round",
      "Your workout motivation is in stealth mode",
      "Your fitness goals are on a coffee break",
      "Your exercise equipment is repurposed as decor",
      "Your fitness aspirations are on a timeout",
      "Your gym goals are written in disappearing ink",
      "Your fitness plan is a jigsaw puzzle missing pieces",
      "Your fitness progress is a sitcom plot",
      "Your fitness journey is a never-ending rerun",
      "Your workout intensity is low as your expectations",
      "Your fitness achievements are in the friend zone",
      "Your gym time is snack time with dumbbells"
    ]
  },
  {
    id: "social",
    label: "Social",
    emoji: "🤦‍♂️",
    icon: Users,
    className: "category-social",
    buttonClass: "category-button-social",
    borderClass: "card-border-social",
    affirmations: [
      "Your social life is as active as a sloth on vacation",
      "Your Instagram followers are mostly bots",
      "Your party invites got lost in spam (hopefully)",
      "Your best friend's best friend isn't you",
      "Your social battery: Permanently low",
      "Your group chats are just you talking to yourself",
      "Your social skills are in airplane mode",
      "Your party tricks are forgettable",
      "Your event RSVPs are always 'maybe'",
      "Your social outings are virtual, because real isn't working",
      "Your social media presence is a ghost town",
      "Your conversations are 'Hey' and 'Bye'",
      "Your networking is just networking dreams",
      "Your social calendar is a blank page",
      "Your friends list is a lonely list",
      "Your social gatherings are solo trips",
      "Your idea of mingling is window shopping",
      "Your social events are just excuses to nap",
      "Your social invites are never replies",
      "Your social interactions are mute buttons",
      "Your party attendance is RSVP: Regret Soon Passing",
      "Your social charm is on the fritz",
      "Your hangouts are solo missions",
      "Your social standing is underground",
      "Your group photos are all of yourself",
      "Your social cues are autocorrected",
      "Your friendships are based on passive-aggressive texts",
      "Your social strategy is 'hide and seek'",
      "Your social life is sponsored by invisibility",
      "Your interactions are in the friendzone 2.0",
      "Your social skills are dialed to 'off'",
      "Your social events are 'ghosted' often",
      "Your meetups are imaginary",
      "Your social circles are smaller than your inbox",
      "Your social engagement is 'airing out thoughts'",
      "Your social presence is a mystery",
      "Your social gatherings are solo retreats",
      "Your social energy is on low power",
      "Your social connections are more like connections to nowhere",
      "Your social milestones are minor footnotes",
      "Your social endeavors are daydreams",
      "Your social life is a hidden track",
      "Your interactions are just background noise",
      "Your social calendar is a ghost story",
      "Your social network is a spiderweb of solitude",
      "Your social bonds are as strong as tissue paper",
      "Your social interactions are out of sync",
      "Your social life is an empty auditorium",
      "Your social aspirations are in hibernation"
    ]
  },
  {
    id: "health",
    label: "Health",
    emoji: "🤒",
    icon: Cloud,
    className: "category-health",
    buttonClass: "category-button-health",
    borderClass: "card-border-health",
    affirmations: [
      "Your sleep schedule is more chaotic than your love life",
      "Your daily water intake: Mostly coffee",
      "Your vitamin D levels: As low as your motivation",
      "Your mental health day became a mental health year",
      "Your wellness routine is just scrolling health memes",
      "Your exercise is run-of-the-mill excuses",
      "Your diet plan is 'see food'",
      "Your health goals are in perpetual postponement",
      "Your stress levels are through the roof",
      "Your doctor's appointments are just TV shows",
      "Your immunity is on a coffee break",
      "Your health tracking is a guessing game",
      "Your vitamins are just colorful candy",
      "Your health insurance is your only coverage",
      "Your wellness tips are from dubious sources",
      "Your health routine is 'eat, sleep, repeat'",
      "Your gym visits are ghostly",
      "Your fitness motivation is as steady as a soap bubble",
      "Your wellness journey is a pothole-ridden road",
      "Your health goals are more aspirational than actual",
      "Your hydration is as regular as your exercise",
      "Your mental clarity is as foggy as London",
      "Your health is just surviving, not thriving",
      "Your wellness advice is from outdated memes",
      "Your health supplements are expired",
      "Your diet is a mix of all the wrong foods",
      "Your sleep is a series of interrupted naps",
      "Your health monitoring is a rolling dice",
      "Your fitness tracker thinks you're inactive",
      "Your wellness goals are as flexible as concrete",
      "Your health habits are stuck in rewind",
      "Your nutritional intake is questionably sourced",
      "Your stress management is a work in progress... never",
      "Your health improvement is on a distant planet",
      "Your wellness routines are Netflix marathons",
      "Your exercise habits are 'maybe tomorrow'",
      "Your health regime is a scattered thought",
      "Your well-being is in perpetual pending",
      "Your health status is just functional",
      "Your diet trends are as stable as your mood",
      "Your wellness plans are like fairy tales",
      "Your health checklist is incomplete",
      "Your immunity is playing hide and seek",
      "Your mental health is buffering",
      "Your health journey is a never-ending saga",
      "Your wellness goals are out of reach",
      "Your health is a series of coping mechanisms",
      "Your vitality is on a permanent vacation",
      "Your health progress is as slow as molasses",
      "Your wellness is more wishful thinking"
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
            "p-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm",
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

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setShowSlots(false)}
                    variant="outline"
                    className="button-glow px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full border-2 w-full sm:w-auto"
                  >
                    Back to Categories
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className={cn(
                      "button-glow px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full w-full sm:w-auto",
                      selectedCategoryData?.buttonClass
                    )}
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

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => generateAffirmation()}
                    className={cn(
                      "button-glow px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full w-full sm:w-auto",
                      selectedCategoryData?.buttonClass
                    )}
                  >
                    Get Real
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowSlots(true)}
                    className="button-glow px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full border-2 w-full sm:w-auto"
                  >
                    Try Slots
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card className={cn(
              "p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm",
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
              "p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm",
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
