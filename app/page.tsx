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
      "Dream jobs are called that for a reason—keep dreaming.",
      "The office printer is more reliable than you.",
      "Promotion day? Don't hold your breath.",
      "Team meetings: where productivity goes to die.",
      "Even your coffee mug is tired of you.",
      "Dress for the job you want. Oh wait, you still don’t have it.",
      "The 'career ladder' was missing when you showed up.",
      "Office plants grow faster than your professional skills.",
      "That project due date is laughing at you.",
      "When deadlines approach, so does your panic.",
      "Success is overrated—stay mediocre.",
      "Emails are basically formal begging at this point.",
      "Your boss is only impressed with your snack drawer.",
      "Co-workers avoid you, not because you're busy.",
      "The lunch break is the highlight of your career.",
      "Job titles mean nothing when you’re crying in the restroom.",
      "LinkedIn endorsements: because validation is free.",
      "Every 'urgent' task can wait until tomorrow.",
      "The office keyboard: 80% crumbs, 20% work.",
      "The highlight of today? Figuring out how to fake productivity.",
      "Hustle culture sounds exhausting. Keep procrastinating.",
      "HR sent out another email just for you.",
      "Your badge works. That’s your achievement for the day.",
      "Stress eating is practically a team-building exercise.",
      "That spreadsheet hasn’t been updated since dinosaurs roamed.",
      "Casual Fridays don’t mean 'don’t shower'.",
      "When someone asks how you’re doing, just laugh.",
      "The stapler gets more respect than you.",
      "You're not climbing the ladder; you’re clinging to it.",
      "Every team building event feels like detention.",
      "Lunch leftovers: the only reward you’ll ever get.",
      "The annual review might as well be a roast.",
      "Copy-pasting from last year’s report—innovation at its finest.",
      "You're just here for the Wi-Fi and the coffee.",
      "Unpaid overtime: the real company culture.",
      "Deadlines: the ultimate diet plan.",
      "Professional networking? More like begging strangers on LinkedIn.",
      "That email signature won’t make you important.",
      "Today’s big win: surviving without quitting.",
      "Every promotion feels like a practical joke.",
      "Career advice? Keep Googling it.",
      "Surprise meetings are the office equivalent of a jump scare.",
      "You were hired to 'help out.' Still waiting to start.",
      "The only thing growing here is your frustration.",
      "Projects aren’t ‘in progress’; they’re just lost forever.",
      "Corporate values are as real as unicorns.",
      "If you quit today, who would even notice?",
      "Success? Let’s aim for survival first.",
      "Work anniversaries are like birthdays—depressing and unavoidable.",
      "You’re just here to keep the coffee machine company."
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
      "Romance is dead—and you’re holding the shovel.",
      "Every 'let’s talk' leads to emotional annihilation.",
      "Swiping left on love, right into disappointment.",
      "Your crush is probably blocking your number right now.",
      "Netflix remains the most stable relationship you’ve had.",
      "Flirting is just awkwardness with extra steps.",
      "Love languages? How about 'leave me alone'?",
      "Relationships are just subscription services for arguments.",
      "Ghosting is your soulmate's signature move.",
      "Dates end quicker than your last paycheck.",
      "Red flags? You collect them like Pokémon.",
      "Your DMs are just tumbleweeds and scammers.",
      "Breakups are basically unpaid therapy sessions.",
      "Shared playlists only last until the first fight.",
      "Every 'let’s hang out' ends in cancellation.",
      "Cuffing season skipped you again this year.",
      "Eye contact is your ultimate act of bravery.",
      "Romantic gestures are just missed opportunities for cringe.",
      "Compatibility: nonexistent, but you tried.",
      "Dinner dates become silent staring contests.",
      "You fall in love faster than your Wi-Fi disconnects.",
      "The only sparks you’ll feel are from static electricity.",
      "Fate’s matchmaking algorithm is clearly broken.",
      "Every love story needs a plot twist—yours is ending.",
      "Online dating apps: where self-esteem goes to die.",
      "True love might just be a myth… like unicorns.",
      "Soulmates? Maybe in the next life.",
      "Couple goals start and end with matching pajamas.",
      "Your longest relationship is with procrastination.",
      "Flirting looks better in rom-coms.",
      "That one ex? Probably still living rent-free in your head.",
      "Mutual interests mean 'we both enjoy arguing'.",
      "First dates: auditions for future disappointments.",
      "Relationship milestones feel more like speed bumps.",
      "Texting back is not a love language.",
      "The closest you’ve come to commitment is your Netflix queue.",
      "All the good ones are taken—or imaginary.",
      "Heartbreak builds character, so you’re practically a superhero.",
      "Shared interests don’t make up for shared headaches.",
      "Singlehood: The gift that keeps on giving… nothing.",
      "Compromise feels a lot like losing.",
      "Valentine’s Day is just overpriced disappointment.",
      "The word 'forever' sounds exhausting anyway.",
      "Communication is key—and you’ve lost it.",
      "Relationships are just polite forms of chaos.",
      "You're the blueprint for modern dating disasters.",
      "You confuse mixed signals with good intentions.",
      "The honeymoon phase? You blinked and missed it.",
      "Every 'we need to talk' feels like a job interview."
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
      "Budgeting is just organized sadness.",
      "Your wallet echoes when opened.",
      "Every pay raise is just a tax increase waiting to happen.",
      "Impulse buying is your superpower.",
      "Savings goals? More like fictional aspirations.",
      "Investing in crypto: because regular gambling wasn’t enough.",
      "Bills arrive faster than your paycheck.",
      "Debt collectors know you by first name.",
      "Financial planning = buying coffee and crying later.",
      "Every 'treat yourself' leads to immediate regret.",
      "Cash flow? More like cash trickle.",
      "That 'on sale' tag is your financial downfall.",
      "Your bank app crashes from pure disappointment.",
      "Every online order is a step further from your budget.",
      "Your emergency fund was a good idea, once.",
      "That lottery ticket is still your retirement plan.",
      "Taxes: the annual heartbreak.",
      "Living paycheck to paycheck has become a personality trait.",
      "Discount codes are your survival strategy.",
      "Bank statements are basically horror novels.",
      "Your budget has more holes than Swiss cheese.",
      "Credit card points are the only rewards you’ll see.",
      "Debt snowballs faster than your dreams.",
      "Expenses are constant; income is not.",
      "You could live off ramen indefinitely. Maybe you will.",
      "Every financial decision leads to instant regret.",
      "Skipping coffee today saves $5 for another disaster tomorrow.",
      "Bank overdrafts feel personal at this point.",
      "Investments? More like guesses.",
      "Spending less is the ultimate self-care… supposedly.",
      "Inflation is your arch-nemesis.",
      "Your retirement fund needs a miracle.",
      "Even your piggy bank is depressed.",
      "Financial freedom is just a very distant relative.",
      "Every financial seminar feels like stand-up comedy.",
      "Coupons: the real MVP of your wallet.",
      "Debt-free living is just a Pinterest board.",
      "Your bank balance is a punchline.",
      "Payday celebrations last five minutes.",
      "The only interest you gain is on your credit card.",
      "Every refund feels like divine intervention.",
      "Debt denial is your coping mechanism.",
      "Groceries are just overpriced regrets.",
      "Your net worth is just your student loans in reverse.",
      "Financial security is a group chat you weren’t invited to.",
      "You think you’re broke until rent is due.",
      "Living within your means? What means?",
      "Expenses are forever; savings are temporary.",
      "Your financial plan is titled 'we’ll see'."
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
      "Every self-help book you buy becomes a coaster.",
      "Meditation time always turns into nap time.",
      "Your inner peace packed its bags and left years ago.",
      "Personal growth is just procrastination in disguise.",
      "Trying to love yourself feels like a group project.",
      "Every 'new me' attempt is just the old you in disguise.",
      "Your self-esteem needs a GPS to find you.",
      "Personal breakthroughs are just delayed breakdowns.",
      "Journaling turned into doodling and then into nothing.",
      "Every 'live in the moment' advice feels exhausting.",
      "You set goals just to avoid achieving them.",
      "Therapy is expensive, so you opted for TikTok advice.",
      "Every personality quiz labels you as 'work in progress.'",
      "That 'vision board' is now just wall art.",
      "You strive for progress but settle for survival.",
      "Introspection is just overthinking with a fancy name.",
      "Your potential left a note saying 'brb' years ago.",
      "Every time you try to start fresh, you end up in the same mess.",
      "Self-discovery feels like opening a badly packed suitcase.",
      "The journey to self-love is stuck in a traffic jam.",
      "Motivational quotes are your wallpaper but not your reality.",
      "Your best ideas come at 3 a.m., never at work.",
      "Life goals are fun to write, less fun to chase.",
      "You aspire to inspire… or at least survive Mondays.",
      "Breaking bad habits feels like breaking concrete walls.",
      "Every 'new habit' lasts as long as your Wi-Fi connection.",
      "Your bucket list is just a list of abandoned dreams.",
      "Personal boundaries are as weak as wet cardboard.",
      "Self-care means binging shows and avoiding calls.",
      "Your comfort zone has become a permanent residence.",
      "Learning something new always feels overrated.",
      "Your greatest skill is hitting snooze.",
      "All those online courses you signed up for? Still unopened.",
      "Your ambition is a roller coaster that’s always stuck at the top.",
      "Confidence is a party you weren’t invited to.",
      "Every attempt at self-improvement ends with snacks.",
      "Mindfulness turns into mind-full-of-stress.",
      "Growth is supposed to be uncomfortable, but this feels absurd.",
      "You’re a masterpiece… in progress… with no deadline.",
      "Every 'I got this' moment turns into 'I don’t got this.'",
      "Becoming your best self is harder than advertised.",
      "You’re the hero of your story—lost, confused, and late.",
      "Climbing mountains of self-doubt is your cardio.",
      "Every motivational speech reminds you how unmotivated you are.",
      "Personal growth is a marathon, and you're still at the starting line.",
      "The only thing evolving in your life is your excuses.",
      "Your biggest achievement today was finding clean socks.",
      "Dreaming big is great, but napping feels better.",
      "You’re the definition of 'good intentions gone wrong.'"
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
      "That gym membership is just a donation at this point.",
      "Those running shoes are more decorative than functional.",
      "Stretching? Does reaching for the remote count?",
      "Every push-up feels like a push-down.",
      "Skipping leg day? More like skipping all days.",
      "Protein shakes taste like regret and desperation.",
      "Your yoga poses are more 'ouch' than 'zen.'",
      "Every workout begins with enthusiasm and ends with snacks.",
      "The only heavy lifting you do is with your grocery bags.",
      "Squats? More like sitting down dramatically.",
      "Cardio feels like running away from responsibilities.",
      "Your treadmill is just a coat rack with ambition.",
      "Pre-workout motivation disappears the moment you stand up.",
      "Rest days? They turned into rest months.",
      "Exercise routines are like one-night stands: brief and regrettable.",
      "Fitness goals are postponed until further notice.",
      "Every gym selfie is just evidence of confusion.",
      "Your core strength is as elusive as your goals.",
      "Calories burned: 10. Calories consumed: 1000.",
      "The dumbbells aren't the only thing weighing you down.",
      "Personal trainers should offer therapy with every session.",
      "Every 'I’ll start Monday' turns into next year.",
      "Your workout playlist is 90% procrastination.",
      "Burpees are a personal attack.",
      "Skipping rope is the closest thing to exercise you’ve done.",
      "Every gym visit feels like a guilt trip.",
      "Sweat is just regret leaving the body… or so they say.",
      "Those fitness influencers are clearly not human.",
      "Lifting weights is less appealing than lifting snacks.",
      "Every workout plan turns into a nap plan.",
      "The only thing you’ve gained is soreness.",
      "Mirror selfies at the gym don’t count as progress.",
      "The heaviest thing you lift is your phone.",
      "Morning runs sound great… in theory.",
      "Every fitness app notification feels like a personal insult.",
      "Resistance bands? More like relationship bands—they snap easily.",
      "That one plank you did last year was enough.",
      "Every yoga session ends in existential dread.",
      "Sweatpants are your gym outfit and your lifestyle.",
      "You bought fitness gear just to look at it.",
      "Every HIIT workout leaves you emotionally hit.",
      "Those fitness goals are now distant memories.",
      "Resting heart rate: the only consistent thing in your routine.",
      "Every new workout trend feels like a new form of torture.",
      "The gym smells like effort, and that’s not for you.",
      "Your fitness 'progress' is mostly wishful thinking.",
      "Exercise is overrated. Rest is underrated.",
      "Muscles take time to build, but so do excuses.",
      "The only marathon you’ve completed is a Netflix one."
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
      "Socializing is just anxiety with extra steps.",
      "Your group chats are eerily quiet for a reason.",
      "Party invites are myths you’ve only heard of.",
      "Your small talk skills are smaller than your patience.",
      "Crowded rooms feel like survival challenges.",
      "Conversations always lead to 'I should’ve stayed home.'",
      "Your social calendar is emptier than your fridge.",
      "Networking events are just forced awkwardness.",
      "Social batteries drain faster than your phone.",
      "Every 'we should hang out' remains a lie.",
      "Making eye contact feels like climbing Everest.",
      "Your idea of mingling is saying hi and fleeing.",
      "RSVP stands for 'Really Seldom Participates.'",
      "Friendships mostly exist in your imagination.",
      "You talk to yourself more than anyone else.",
      "Silence is your favorite party guest.",
      "Every 'catching up' feels like being interrogated.",
      "Socializing online feels safer than the real thing.",
      "You’re an introvert’s introvert.",
      "Social plans are always subject to cancellation.",
      "Friendship goals? Just avoiding group drama.",
      "Every phone call feels like an ambush.",
      "The mute button is your best friend.",
      "Parties are just loud excuses for snacks.",
      "Awkward pauses are your specialty.",
      "You excel at forgetting names instantly.",
      "Making new friends feels like starting a second job.",
      "Your social interactions are mostly emojis.",
      "Group photos always make you look like an extra.",
      "Every 'how are you?' feels like a trick question.",
      "Muting group chats is self-care.",
      "You’ve ghosted more people than a haunted house.",
      "Friendship requests are as rare as compliments.",
      "Socializing feels like a video game on hard mode.",
      "Every invitation feels like a chore.",
      "The best part of going out is coming back home.",
      "You prefer binge-watching over bonding.",
      "Social cues are more like social mysteries.",
      "Every 'let’s grab coffee' becomes 'never mind.'",
      "Your DMs are quieter than a library.",
      "You’d rather schedule time with your pillow.",
      "The only networking you enjoy is Wi-Fi.",
      "Social media: where pretending to care is an art.",
      "Every friendship comes with expiration dates.",
      "Hanging out alone feels more productive.",
      "Social events are just introvert nightmares.",
      "Being the life of the party sounds exhausting.",
      "Your charisma went on permanent leave."
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
      "Hydration plans always turn into coffee addiction.",
      "Sleep schedules are a myth you stopped believing in.",
      "Mental clarity left you on 'read.'",
      "Diet plans are just cruel jokes.",
      "Stress management? More like stress acceptance.",
      "Your wellness routine includes more whining than winning.",
      "Every health goal feels like a faraway dream.",
      "Eating healthy is harder than it looks on Instagram.",
      "The gym is basically your haunted house.",
      "Skipping vitamins feels like rebellion.",
      "Every yoga pose ends in mild regret.",
      "Doctor visits are just lectures in disguise.",
      "Your daily steps consist of walking to the fridge.",
      "Caffeine runs through your veins, not motivation.",
      "Fast food feels like the only meal prep you need.",
      "Naps are your best health investment.",
      "The closest thing to cardio is laughing at memes.",
      "Every health app reminder feels like an insult.",
      "Fruits and veggies are decorative items in your fridge.",
      "Meditation sessions turn into random daydreams.",
      "The only lifting you do is lifting your excuses.",
      "Staying hydrated? Is that even fun?",
      "Your immune system is on permanent vacation.",
      "Wellness routines end faster than a viral trend.",
      "Skipping meals for snacks isn’t the same as fasting.",
      "Your Fitbit is basically a jewelry piece now.",
      "The only detox you do is deleting apps.",
      "Taking the stairs feels like climbing Everest.",
      "Every diet starts with hope and ends with chocolate.",
      "Counting calories always turns into forgetting math.",
      "Stress eating has become your new hobby.",
      "Drinking water feels like a chore.",
      "That yoga mat is just a very expensive rug.",
      "The last health tip you followed was in a meme.",
      "Health journeys feel like reality shows gone wrong.",
      "Doctor’s advice always comes with a side of guilt.",
      "Vitamin D? You barely see sunlight.",
      "Fitness motivation is more fiction than fact.",
      "Healthy meals feel like punishment.",
      "Daily walks are just guilt trips outdoors.",
      "Skipping workouts has become your cardio.",
      "Your idea of self-care is eating cake.",
      "Every attempt to improve health ends in naps.",
      "The only health advice you take is 'sleep more.'",
      "The closest you’ve come to running is running late.",
      "Wellness is just wishful thinking at this point.",
      "Resting heart rate: high from overthinking.",
      "Doctor’s notes are just essays on your mistakes.",
      "Health insurance is the closest you’ve come to health."
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
