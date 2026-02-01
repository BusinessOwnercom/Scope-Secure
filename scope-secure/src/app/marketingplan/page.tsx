"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Check,
  Circle,
  Target,
  Calendar,
  TrendingUp,
  Users,
  Video,
  MessageSquare,
  Mail,
  Gift,
  Megaphone,
  FileText,
  Clock,
  DollarSign,
  BarChart3,
  Flame,
  Star,
  Save,
  Trash2,
  Plus,
  X,
  StickyNote,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────

interface TaskItem {
  id: string;
  label: string;
  checked: boolean;
}

interface NoteItem {
  id: string;
  text: string;
  timestamp: number;
}

interface PhaseSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  tasks: TaskItem[];
  notes: NoteItem[];
}

interface ContentCalendarItem {
  day: number;
  format: string;
  title: string;
  hook: string;
  done: boolean;
}

interface PlanState {
  phases: PhaseSection[];
  contentCalendar: ContentCalendarItem[];
  influencerTracker: InfluencerEntry[];
  globalNotes: NoteItem[];
  lastSaved: number;
}

interface InfluencerEntry {
  id: string;
  name: string;
  platform: string;
  subscribers: string;
  status: "identified" | "contacted" | "shipped" | "reviewed" | "converted";
  discountCode: string;
  notes: string;
  dateContacted: string;
}

// ─── Initial Data ─────────────────────────────────────────────────

const INITIAL_PHASES: PhaseSection[] = [
  {
    id: "arsenal",
    title: "Days 1-7: Build the Arsenal",
    icon: <Video className="h-5 w-5" />,
    notes: [],
    tasks: [
      { id: "a1", label: "Film the hero drop test video (ALL formats: full YouTube, Short, Reel, TikTok)", checked: false },
      { id: "a2", label: "Film \"What zero shift looks like at 300 yards\" video", checked: false },
      { id: "a3", label: "Film \"ScopeSecure vs. Butler Creek\" comparison video", checked: false },
      { id: "a4", label: "Film \"How ScopeSecure installs in 60 seconds\" demo", checked: false },
      { id: "a5", label: "Film \"The math: $250 to protect a $3,000 scope\" talk-to-camera", checked: false },
      { id: "a6", label: "Set up YouTube channel with branding and description", checked: false },
      { id: "a7", label: "Set up Instagram @scopesecure", checked: false },
      { id: "a8", label: "Set up TikTok @scopesecure", checked: false },
      { id: "a9", label: "Set up Facebook Page", checked: false },
      { id: "a10", label: "Post hero drop test video across ALL platforms", checked: false },
      { id: "a11", label: "Set up Brevo/Mailchimp free tier email platform", checked: false },
      { id: "a12", label: "Create 5-email welcome sequence", checked: false },
      { id: "a13", label: "Create buyer's guide PDF lead magnet", checked: false },
      { id: "a14", label: "Add website popup for email capture", checked: false },
      { id: "a15", label: "Join 20-30 Facebook groups (hunting, long range, PRS, brand fan groups)", checked: false },
      { id: "a16", label: "Create Reddit account, start building karma", checked: false },
      { id: "a17", label: "Research and compile influencer target list (20+ names with emails)", checked: false },
      { id: "a18", label: "Buy phone tripod + clip mic for content creation", checked: false },
    ],
  },
  {
    id: "outreach",
    title: "Days 7-14: Start Outreach",
    icon: <Megaphone className="h-5 w-5" />,
    notes: [],
    tasks: [
      { id: "o1", label: "Ship Wave 1 influencer packages (6 units)", checked: false },
      { id: "o2", label: "Begin daily Facebook group participation (be helpful, NO selling yet)", checked: false },
      { id: "o3", label: "Post 2 YouTube videos (Week 1 content calendar)", checked: false },
      { id: "o4", label: "Post daily Reels/TikToks from pre-filmed content", checked: false },
      { id: "o5", label: "Launch Giveaway #1 on Instagram/Facebook", checked: false },
      { id: "o6", label: "Pitch 5 podcasts for guest appearances", checked: false },
      { id: "o7", label: "Start YouTube comment warfare (15 min/day on scope review videos)", checked: false },
      { id: "o8", label: "Register on Sniper's Hide forum", checked: false },
      { id: "o9", label: "Register on Long Range Hunting (LRH) forum", checked: false },
      { id: "o10", label: "Register on Rokslide forum", checked: false },
    ],
  },
  {
    id: "momentum",
    title: "Days 14-30: Build Momentum",
    icon: <TrendingUp className="h-5 w-5" />,
    notes: [],
    tasks: [
      { id: "m1", label: "Switch FB groups from pure value to strategic ScopeSecure mentions", checked: false },
      { id: "m2", label: "Post first Reddit thread with drop test results in r/longrange", checked: false },
      { id: "m3", label: "Ship Wave 2 influencer packages (6 units)", checked: false },
      { id: "m4", label: "Share/amplify first influencer review across all channels", checked: false },
      { id: "m5", label: "Post detailed review on Sniper's Hide with photos & data", checked: false },
      { id: "m6", label: "Post on LRH forum — frame as hunt insurance", checked: false },
      { id: "m7", label: "Post on Rokslide — frame around backcountry durability", checked: false },
      { id: "m8", label: "Send first email campaign to growing list", checked: false },
      { id: "m9", label: "Publish blog article #1: \"Best Scope Protection for Vortex Scopes\"", checked: false },
      { id: "m10", label: "Continue YouTube content calendar (Week 3-4 videos)", checked: false },
      { id: "m11", label: "Continue daily Reels/TikToks", checked: false },
      { id: "m12", label: "Start \"Would You Drop It?\" recurring series", checked: false },
    ],
  },
  {
    id: "compound",
    title: "Days 30-60: Compound & Amplify",
    icon: <Flame className="h-5 w-5" />,
    notes: [],
    tasks: [
      { id: "c1", label: "Analyze which content formats are performing — double down on winners", checked: false },
      { id: "c2", label: "Launch Giveaway #2 in biggest Facebook group (get admin permission)", checked: false },
      { id: "c3", label: "Second round of podcast pitches (5 more shows)", checked: false },
      { id: "c4", label: "Post customer testimonials and UGC across all platforms", checked: false },
      { id: "c5", label: "Publish blog article #2: \"ScopeSecure vs Butler Creek vs Tenebraex\"", checked: false },
      { id: "c6", label: "Publish blog article #3: \"How to Prevent Zero Shift: Complete Guide\"", checked: false },
      { id: "c7", label: "Film fresh content batch (new drop tests, customer stories)", checked: false },
      { id: "c8", label: "Continue YouTube content calendar (Week 5-8 videos)", checked: false },
      { id: "c9", label: "Track influencer discount codes — which are converting?", checked: false },
      { id: "c10", label: "Reddit AMA: \"I'm the inventor of ScopeSecure. AMA.\"", checked: false },
      { id: "c11", label: "Start \"Scope of the Day\" series on Instagram/TikTok", checked: false },
      { id: "c12", label: "Ask existing customers for UGC (photo/video of their setup)", checked: false },
    ],
  },
  {
    id: "optimize",
    title: "Days 60-90: Optimize & Scale",
    icon: <BarChart3 className="h-5 w-5" />,
    notes: [],
    tasks: [
      { id: "s1", label: "Launch Giveaway #3 (influencer collab giveaway)", checked: false },
      { id: "s2", label: "Analyze all channel performance — what's actually driving sales?", checked: false },
      { id: "s3", label: "Collect and deploy best UGC from customers", checked: false },
      { id: "s4", label: "Publish blog article #4: \"Is a $250 Scope Guard Worth It?\"", checked: false },
      { id: "s5", label: "Publish blog article #5: \"Best Scope Protection for Crossbow Hunters\"", checked: false },
      { id: "s6", label: "Film \"90 Days of ScopeSecure Online\" journey recap video", checked: false },
      { id: "s7", label: "Continue YouTube content calendar (Week 9-13 videos)", checked: false },
      { id: "s8", label: "Compile learnings into repeatable playbook", checked: false },
      { id: "s9", label: "Set up referral program (unique codes per customer)", checked: false },
      { id: "s10", label: "Plan next quarter strategy based on what worked", checked: false },
      { id: "s11", label: "Reach out to gun shops for dealer partnerships", checked: false },
      { id: "s12", label: "Contact scope manufacturers (Vortex, Nightforce) about partnership", checked: false },
    ],
  },
];

const INITIAL_CONTENT_CALENDAR: ContentCalendarItem[] = [
  { day: 1, format: "Long (5 min)", title: "I Dropped My Rifle From 12 Feet — Here's What Happened", hook: "The hero drop test video", done: false },
  { day: 1, format: "Short (60s)", title: "Will this scope survive a 12-foot drop?", hook: "Quick cut of the drop + result", done: false },
  { day: 4, format: "Long (4 min)", title: "ScopeSecure vs Butler Creek — One Actually Works", hook: "Side-by-side comparison", done: false },
  { day: 4, format: "Short (30s)", title: "Your $20 scope cap isn't protecting anything", hook: "Butler Creek falls off on impact", done: false },
  { day: 7, format: "Long (3 min)", title: "How to Install ScopeSecure in 60 Seconds", hook: "Installation walkthrough", done: false },
  { day: 7, format: "Short (45s)", title: "POV: Your $3,000 scope hits concrete", hook: "Slow-mo drop, dramatic", done: false },
  { day: 10, format: "Long (5 min)", title: "Why Zero Shift Ruins Hunts (and How to Prevent It)", hook: "Educational — what zero shift is", done: false },
  { day: 10, format: "Short (30s)", title: "This is what a 2 MOA zero shift looks like at 600 yards", hook: "Visual of miss distance", done: false },
  { day: 14, format: "Long (4 min)", title: "The Most Expensive Scope Drop I've Ever Seen", hook: "Story format + solution", done: false },
  { day: 14, format: "Short (60s)", title: "$250 vs $8,000 elk hunt — easy math", hook: "Quick value prop", done: false },
  { day: 17, format: "Long (5 min)", title: "I Tested Every Scope Guard on the Market — Only One Passed", hook: "Comparison test", done: false },
  { day: 17, format: "Short (30s)", title: "3 scope guards, 1 drop test, only 1 survivor", hook: "Compilation of failures", done: false },
  { day: 21, format: "Long (6 min)", title: "Scope Protection Tier List — S Tier to Trash Tier", hook: "Tier list format (trending)", done: false },
  { day: 21, format: "Short (45s)", title: "Ranking every scope guard from garbage to goated", hook: "Quick tier list", done: false },
  { day: 24, format: "Long (4 min)", title: "What Happens Inside Your Scope When You Drop It", hook: "Animated/diagrammed explanation", done: false },
  { day: 24, format: "Short (30s)", title: "Your scope has 47 moving parts. Here's what breaks first.", hook: "Educational hook", done: false },
  { day: 28, format: "Long (5 min)", title: "My Scope Setup for Elk Season — And Why I Won't Hunt Without This", hook: "Personal gear video", done: false },
  { day: 28, format: "Short (60s)", title: "My non-negotiable piece of gear for any hunt over $1,000", hook: "Gear reveal format", done: false },
  { day: 31, format: "Long (4 min)", title: "A Customer Dropped His Rifle From a Tree Stand — Here's His Story", hook: "Customer testimonial", done: false },
  { day: 31, format: "Short (30s)", title: "He dropped his rifle climbing into a tree stand...", hook: "Cliffhanger hook", done: false },
  { day: 35, format: "Long (5 min)", title: "We Took ScopeSecure to the Gun Show — Reactions Were INSANE", hook: "Film reactions at gun show", done: false },
  { day: 35, format: "Short (45s)", title: "Gun show guys react to a 12-foot scope drop", hook: "Best reaction clips", done: false },
  { day: 38, format: "Long (6 min)", title: "How to Zero Your Rifle and KEEP It Zeroed", hook: "Educational — general audience", done: false },
  { day: 38, format: "Short (30s)", title: "3 things that destroy your zero (and one fix)", hook: "Listicle format", done: false },
  { day: 42, format: "Long (4 min)", title: "Why PRS Shooters Are Switching to ScopeSecure", hook: "Competition angle", done: false },
  { day: 42, format: "Short (60s)", title: "Your competition rig deserves better than a flip cap", hook: "Direct challenge", done: false },
  { day: 45, format: "Long (5 min)", title: "Crossbow Scopes Are MORE Fragile Than Rifle Scopes — Here's Proof", hook: "Crossbow market angle", done: false },
  { day: 45, format: "Short (30s)", title: "Your crossbow scope is one bump away from disaster", hook: "Fear hook", done: false },
  { day: 49, format: "Long (6 min)", title: "The $250 Accessory That Saved a $30,000 Hunt", hook: "Story-driven, aspirational", done: false },
  { day: 49, format: "Short (45s)", title: "Would you risk your once-in-a-lifetime hunt?", hook: "Emotional hook", done: false },
  { day: 52, format: "Long (4 min)", title: "ScopeSecure Field Test — 30 Days in the Backcountry", hook: "Real-world durability test", done: false },
  { day: 52, format: "Short (30s)", title: "30 days of abuse. Zero shift: 0.", hook: "Results reveal", done: false },
  { day: 56, format: "Long (5 min)", title: "How We Make ScopeSecure — American Manufacturing Tour", hook: "Behind-the-scenes", done: false },
  { day: 56, format: "Short (60s)", title: "Made in America. Tested like hell.", hook: "Manufacturing montage", done: false },
  { day: 59, format: "Long (5 min)", title: "The Drop Test That Broke the Internet (recut)", hook: "Re-release with fresh angles", done: false },
  { day: 59, format: "Short (30s)", title: "1 million people watched me drop a rifle. Here's what they missed.", hook: "Callback hook", done: false },
  { day: 63, format: "Long (6 min)", title: "Best Scope Mounts for Long Range — And the One Accessory Everyone Forgets", hook: "SEO play → ScopeSecure", done: false },
  { day: 63, format: "Short (45s)", title: "The accessory nobody talks about but everyone needs", hook: "Curiosity gap", done: false },
  { day: 66, format: "Long (4 min)", title: "I Let My Subscriber Destroy-Test My ScopeSecure", hook: "Audience participation", done: false },
  { day: 66, format: "Short (30s)", title: "He tried to break it. He couldn't.", hook: "Challenge format", done: false },
  { day: 70, format: "Long (5 min)", title: "Hunting Season Prep Checklist — Don't Forget This One Thing", hook: "Seasonal content", done: false },
  { day: 70, format: "Short (60s)", title: "Your pre-hunt checklist is missing something", hook: "Checklist format", done: false },
  { day: 73, format: "Long (6 min)", title: "Why Every Gun Shop Should Carry ScopeSecure", hook: "B2B angle", done: false },
  { day: 73, format: "Short (30s)", title: "Gun shop owners: your customers need this", hook: "Direct address", done: false },
  { day: 77, format: "Long (5 min)", title: "We Got 326 Scopes in Our Configurator — Find Yours in 10 Seconds", hook: "Product feature highlight", done: false },
  { day: 77, format: "Short (45s)", title: "What scope do you run? We support 326 models.", hook: "Engagement bait", done: false },
  { day: 80, format: "Long (4 min)", title: "AMA: Your Scope Protection Questions Answered", hook: "Q&A from comments/DMs", done: false },
  { day: 80, format: "Short (30s)", title: "The #1 question I get about ScopeSecure", hook: "FAQ format", done: false },
  { day: 84, format: "Long (6 min)", title: "90 Days of ScopeSecure Online — What We Learned", hook: "Transparency/journey content", done: false },
  { day: 84, format: "Short (60s)", title: "We went from gun shows to the internet. Here's what happened.", hook: "Story hook", done: false },
  { day: 87, format: "Long (5 min)", title: "The Ultimate Scope Protection Guide for 2025-2026", hook: "Evergreen SEO content", done: false },
  { day: 87, format: "Short (30s)", title: "Protect your glass. Period.", hook: "Brand manifesto", done: false },
  { day: 90, format: "Long (5 min)", title: "What's Next for ScopeSecure", hook: "Future plans, tease new products", done: false },
  { day: 90, format: "Short (60s)", title: "This is just the beginning.", hook: "Montage of best moments", done: false },
];

const STORAGE_KEY = "scopesecure-marketing-plan-v1";

function getDefaultState(): PlanState {
  return {
    phases: INITIAL_PHASES,
    contentCalendar: INITIAL_CONTENT_CALENDAR,
    influencerTracker: [],
    globalNotes: [],
    lastSaved: Date.now(),
  };
}

// ─── Main Page Component ─────────────────────────────────────────

export default function MarketingPlanPage() {
  const [state, setState] = useState<PlanState | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>("arsenal");
  const [showInfluencerForm, setShowInfluencerForm] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [dailyChecklist, setDailyChecklist] = useState<Record<string, boolean>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as PlanState;
        setState(parsed);
      } catch {
        setState(getDefaultState());
      }
    } else {
      setState(getDefaultState());
    }

    const savedDaily = localStorage.getItem(STORAGE_KEY + "-daily");
    if (savedDaily) {
      try {
        const parsed = JSON.parse(savedDaily);
        // Reset daily if it's a new day
        const savedDate = new Date(parsed._date).toDateString();
        const today = new Date().toDateString();
        if (savedDate === today) {
          setDailyChecklist(parsed);
        }
      } catch { /* use empty */ }
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    if (state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastSaved: Date.now() }));
    }
  }, [state]);

  useEffect(() => {
    if (Object.keys(dailyChecklist).length > 0) {
      localStorage.setItem(STORAGE_KEY + "-daily", JSON.stringify({ ...dailyChecklist, _date: Date.now() }));
    }
  }, [dailyChecklist]);

  const toggleTask = useCallback((phaseId: string, taskId: string) => {
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map(phase =>
          phase.id === phaseId
            ? {
                ...phase,
                tasks: phase.tasks.map(task =>
                  task.id === taskId ? { ...task, checked: !task.checked } : task
                ),
              }
            : phase
        ),
      };
    });
  }, []);

  const toggleContentItem = useCallback((index: number) => {
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        contentCalendar: prev.contentCalendar.map((item, i) =>
          i === index ? { ...item, done: !item.done } : item
        ),
      };
    });
  }, []);

  const addNote = useCallback((phaseId: string, text: string) => {
    if (!text.trim()) return;
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map(phase =>
          phase.id === phaseId
            ? {
                ...phase,
                notes: [...phase.notes, { id: crypto.randomUUID(), text, timestamp: Date.now() }],
              }
            : phase
        ),
      };
    });
  }, []);

  const deleteNote = useCallback((phaseId: string, noteId: string) => {
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map(phase =>
          phase.id === phaseId
            ? { ...phase, notes: phase.notes.filter(n => n.id !== noteId) }
            : phase
        ),
      };
    });
  }, []);

  const addGlobalNote = useCallback((text: string) => {
    if (!text.trim()) return;
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        globalNotes: [...prev.globalNotes, { id: crypto.randomUUID(), text, timestamp: Date.now() }],
      };
    });
  }, []);

  const deleteGlobalNote = useCallback((noteId: string) => {
    setState(prev => {
      if (!prev) return prev;
      return { ...prev, globalNotes: prev.globalNotes.filter(n => n.id !== noteId) };
    });
  }, []);

  const addInfluencer = useCallback((entry: Omit<InfluencerEntry, "id">) => {
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        influencerTracker: [...prev.influencerTracker, { ...entry, id: crypto.randomUUID() }],
      };
    });
  }, []);

  const updateInfluencerStatus = useCallback((id: string, status: InfluencerEntry["status"]) => {
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        influencerTracker: prev.influencerTracker.map(inf =>
          inf.id === id ? { ...inf, status } : inf
        ),
      };
    });
  }, []);

  const deleteInfluencer = useCallback((id: string) => {
    setState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        influencerTracker: prev.influencerTracker.filter(inf => inf.id !== id),
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    if (window.confirm("This will reset ALL progress, notes, and tracking data. Are you sure?")) {
      setState(getDefaultState());
      setDailyChecklist({});
      localStorage.removeItem(STORAGE_KEY + "-daily");
    }
  }, []);

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal">
        <div className="animate-pulse text-accent font-heading text-2xl">Loading plan...</div>
      </div>
    );
  }

  // Calculate stats
  const totalTasks = state.phases.reduce((sum, p) => sum + p.tasks.length, 0);
  const completedTasks = state.phases.reduce((sum, p) => sum + p.tasks.filter(t => t.checked).length, 0);
  const totalContent = state.contentCalendar.length;
  const completedContent = state.contentCalendar.filter(c => c.done).length;
  const overallProgress = Math.round(((completedTasks + completedContent) / (totalTasks + totalContent)) * 100);

  return (
    <div className="min-h-screen bg-charcoal-deep">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-accent/20 bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold uppercase tracking-wider text-accent">
                ScopeSecure War Room
              </h1>
              <p className="text-sm text-warm-gray/60">90-Day Marketing Blitz — Private Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-warm-gray/50">Overall Progress</p>
                <p className="font-heading text-2xl font-bold text-accent">{overallProgress}%</p>
              </div>
              <button
                onClick={resetAll}
                className="rounded-lg p-2 text-warm-gray/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                title="Reset all progress"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 w-full rounded-full bg-charcoal-light overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent/80 to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">

        {/* ─── Stats Cards ─────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Target />} label="Tasks Done" value={`${completedTasks}/${totalTasks}`} />
          <StatCard icon={<Video />} label="Content Created" value={`${completedContent}/${totalContent}`} />
          <StatCard icon={<Users />} label="Influencers Tracked" value={String(state.influencerTracker.length)} />
          <StatCard icon={<DollarSign />} label="Budget Left" value={`$${Math.max(0, 4500 - (state.influencerTracker.filter(i => i.status !== "identified").length * 300)).toLocaleString()}`} />
        </div>

        {/* ─── Daily Routine Checklist ─────────────── */}
        <section className="rounded-xl border border-accent/20 bg-charcoal p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-accent" />
            <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
              Today&apos;s Daily Routine
            </h2>
            <span className="text-sm text-warm-gray/50">Resets daily</span>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { id: "d1", label: "Check & respond to all social comments/DMs (10 min)", emoji: "💬" },
              { id: "d2", label: "Engage in 3-4 Facebook groups (10 min)", emoji: "👥" },
              { id: "d3", label: "Post one piece of content — Reel, TikTok, Short, or group post (10 min)", emoji: "📱" },
              { id: "d4", label: "YouTube comment warfare — 3-5 scope videos (10 min)", emoji: "🎯" },
              { id: "d5", label: "Check Reddit — respond to scope protection questions (5 min)", emoji: "📡" },
              { id: "d6", label: "Influencer follow-ups — check for reviews, send thanks (5 min)", emoji: "🤝" },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setDailyChecklist(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                  dailyChecklist[item.id]
                    ? "bg-accent/10 border border-accent/30"
                    : "bg-charcoal-light border border-transparent hover:border-white/10"
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className={`text-sm flex-1 ${dailyChecklist[item.id] ? "text-accent line-through" : "text-warm-gray"}`}>
                  {item.label}
                </span>
                {dailyChecklist[item.id] && <Check className="h-4 w-4 text-accent flex-shrink-0" />}
              </button>
            ))}
          </div>
        </section>

        {/* ─── Phase Sections (Accordion) ──────────── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
              90-Day Task Tracker
            </h2>
          </div>

          <div className="space-y-3">
            {state.phases.map(phase => {
              const phaseDone = phase.tasks.filter(t => t.checked).length;
              const phaseTotal = phase.tasks.length;
              const phasePercent = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;
              const isOpen = activeSection === phase.id;

              return (
                <div key={phase.id} className="rounded-xl border border-white/10 bg-charcoal overflow-hidden">
                  <button
                    onClick={() => setActiveSection(isOpen ? null : phase.id)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-charcoal-light transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-accent">{phase.icon}</span>
                      <span className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
                        {phase.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-semibold ${phasePercent === 100 ? "text-green-400" : "text-warm-gray/60"}`}>
                        {phaseDone}/{phaseTotal}
                      </span>
                      <div className="hidden sm:block w-24 h-2 rounded-full bg-charcoal-light overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            phasePercent === 100 ? "bg-green-400" : "bg-accent"
                          }`}
                          style={{ width: `${phasePercent}%` }}
                        />
                      </div>
                      <ChevronDown className={`h-5 w-5 text-warm-gray transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 px-6 py-4 space-y-2">
                          {phase.tasks.map(task => (
                            <button
                              key={task.id}
                              onClick={() => toggleTask(phase.id, task.id)}
                              className={`flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                                task.checked
                                  ? "bg-accent/5"
                                  : "hover:bg-charcoal-light"
                              }`}
                            >
                              <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                                task.checked
                                  ? "border-accent bg-accent text-charcoal"
                                  : "border-warm-gray/30"
                              }`}>
                                {task.checked && <Check className="h-3 w-3" />}
                              </span>
                              <span className={`text-sm leading-relaxed ${
                                task.checked ? "text-warm-gray/50 line-through" : "text-warm-gray"
                              }`}>
                                {task.label}
                              </span>
                            </button>
                          ))}

                          {/* Phase Notes */}
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                              <StickyNote className="h-4 w-4 text-accent/70" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-warm-gray/50">Phase Notes</span>
                            </div>
                            {phase.notes.map(note => (
                              <div key={note.id} className="flex items-start gap-2 mb-2 group">
                                <p className="flex-1 text-sm text-warm-gray/70 bg-charcoal-light rounded px-3 py-2">
                                  {note.text}
                                  <span className="block text-xs text-warm-gray/30 mt-1">
                                    {new Date(note.timestamp).toLocaleDateString()} {new Date(note.timestamp).toLocaleTimeString()}
                                  </span>
                                </p>
                                <button
                                  onClick={() => deleteNote(phase.id, note.id)}
                                  className="mt-2 opacity-0 group-hover:opacity-100 text-warm-gray/30 hover:text-red-400 transition-all"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                            <NoteInput onSubmit={(text) => addNote(phase.id, text)} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Content Calendar ────────────────────── */}
        <section className="rounded-xl border border-white/10 bg-charcoal overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="h-6 w-6 text-accent" />
                <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                  YouTube Content Calendar
                </h2>
              </div>
              <span className="text-sm text-warm-gray/60">
                {completedContent}/{totalContent} filmed
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-left">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50 w-12"></th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50 w-16">Day</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50 w-28">Format</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50">Title</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50 hidden md:table-cell">Hook</th>
                </tr>
              </thead>
              <tbody>
                {state.contentCalendar.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-white/5 transition-colors hover:bg-charcoal-light cursor-pointer ${
                      item.done ? "bg-accent/5" : ""
                    }`}
                    onClick={() => toggleContentItem(index)}
                  >
                    <td className="px-4 py-3">
                      <span className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                        item.done ? "border-accent bg-accent text-charcoal" : "border-warm-gray/30"
                      }`}>
                        {item.done && <Check className="h-3 w-3" />}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono text-accent">{item.day}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                        item.format.startsWith("Long") ? "bg-blue-500/20 text-blue-300" : "bg-purple-500/20 text-purple-300"
                      }`}>
                        {item.format}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${item.done ? "text-warm-gray/50 line-through" : "text-white"}`}>
                        {item.title}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-warm-gray/50">{item.hook}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Influencer Tracker ──────────────────── */}
        <section className="rounded-xl border border-white/10 bg-charcoal overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-accent" />
                <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                  Influencer Pipeline
                </h2>
              </div>
              <button
                onClick={() => setShowInfluencerForm(!showInfluencerForm)}
                className="flex items-center gap-2 rounded-lg bg-accent/10 border border-accent/30 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/20 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Influencer
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showInfluencerForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <InfluencerForm
                  onSubmit={(entry) => { addInfluencer(entry); setShowInfluencerForm(false); }}
                  onCancel={() => setShowInfluencerForm(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {state.influencerTracker.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Users className="h-12 w-12 text-warm-gray/20 mx-auto mb-3" />
              <p className="text-warm-gray/40">No influencers tracked yet. Add your first target above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50">Platform</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50 hidden md:table-cell">Subs</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50 hidden md:table-cell">Code</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-warm-gray/50 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.influencerTracker.map(inf => (
                    <tr key={inf.id} className="border-b border-white/5 hover:bg-charcoal-light transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-white">{inf.name}</p>
                        {inf.notes && <p className="text-xs text-warm-gray/40 mt-0.5">{inf.notes}</p>}
                      </td>
                      <td className="px-4 py-3 text-sm text-warm-gray">{inf.platform}</td>
                      <td className="px-4 py-3 text-sm text-warm-gray hidden md:table-cell">{inf.subscribers}</td>
                      <td className="px-4 py-3">
                        <select
                          value={inf.status}
                          onChange={(e) => updateInfluencerStatus(inf.id, e.target.value as InfluencerEntry["status"])}
                          className="rounded bg-charcoal-light border border-white/10 px-2 py-1 text-xs text-white focus:border-accent focus:outline-none"
                        >
                          <option value="identified">Identified</option>
                          <option value="contacted">Contacted</option>
                          <option value="shipped">Shipped</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="converted">Converting Sales</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-accent hidden md:table-cell">{inf.discountCode || "—"}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteInfluencer(inf.id)}
                          className="text-warm-gray/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ─── Global Notes / War Journal ──────────── */}
        <section className="rounded-xl border border-white/10 bg-charcoal p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-accent" />
            <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
              War Journal
            </h2>
            <span className="text-sm text-warm-gray/50">Ideas, observations, wins</span>
          </div>

          <div className="space-y-3 mb-4">
            {state.globalNotes.length === 0 && (
              <p className="text-warm-gray/30 text-sm italic">No entries yet. Start documenting your journey.</p>
            )}
            {state.globalNotes.map(note => (
              <div key={note.id} className="flex items-start gap-2 group">
                <div className="flex-1 rounded-lg bg-charcoal-light px-4 py-3">
                  <p className="text-sm text-warm-gray whitespace-pre-wrap">{note.text}</p>
                  <p className="text-xs text-warm-gray/30 mt-2">
                    {new Date(note.timestamp).toLocaleDateString()} at {new Date(note.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteGlobalNote(note.id)}
                  className="mt-3 opacity-0 group-hover:opacity-100 text-warm-gray/30 hover:text-red-400 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <NoteInput onSubmit={addGlobalNote} placeholder="Log an observation, idea, or win..." multiline />
        </section>

        {/* ─── Quick Reference: Key Numbers ────────── */}
        <section className="rounded-xl border border-accent/20 bg-charcoal p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6 text-accent" />
            <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
              Key Numbers to Remember
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <KeyNumber label="Break-Even Point" value="18 sales" sub="at $249.99/unit" />
            <KeyNumber label="Budget" value="$4,500" sub="$500 buffer" />
            <KeyNumber label="Influencer Units" value="12" sub="~$300/unit shipped" />
            <KeyNumber label="Giveaway Units" value="3" sub="for contests" />
            <KeyNumber label="YouTube Target" value="2x/week" sub="1 long + 1 Short" />
            <KeyNumber label="Reels/TikTok Target" value="Daily" sub="from batch-filmed content" />
            <KeyNumber label="Facebook Groups" value="20-30" sub="joined and active" />
            <KeyNumber label="Scope Database" value="326" sub="scopes in configurator" />
            <KeyNumber label="CTA Link" value="/#configurator" sub="every link goes here" />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-warm-gray/20 text-xs">
            ScopeSecure War Room — Private Dashboard — Not indexed by search engines
          </p>
          {state.lastSaved && (
            <p className="text-warm-gray/15 text-xs mt-1">
              Last saved: {new Date(state.lastSaved).toLocaleString()}
            </p>
          )}
        </footer>
      </main>
    </div>
  );
}

// ─── Sub-Components ───────────────────────────────────────────────

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-charcoal p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-warm-gray/50">{label}</span>
      </div>
      <p className="font-heading text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function KeyNumber({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg bg-charcoal-light px-4 py-3">
      <p className="text-xs text-warm-gray/50 uppercase tracking-wider">{label}</p>
      <p className="font-heading text-xl font-bold text-accent mt-1">{value}</p>
      <p className="text-xs text-warm-gray/40">{sub}</p>
    </div>
  );
}

function NoteInput({ onSubmit, placeholder = "Add a note...", multiline = false }: { onSubmit: (text: string) => void; placeholder?: string; multiline?: boolean }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  if (multiline) {
    return (
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleSubmit(); }}
          placeholder={placeholder}
          rows={3}
          className="flex-1 rounded-lg bg-charcoal-light border border-white/10 px-4 py-3 text-sm text-white placeholder:text-warm-gray/30 focus:border-accent focus:outline-none resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="self-end rounded-lg bg-accent/10 border border-accent/30 px-4 py-3 text-accent hover:bg-accent/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
        placeholder={placeholder}
        className="flex-1 rounded-lg bg-charcoal-light border border-white/10 px-4 py-2 text-sm text-white placeholder:text-warm-gray/30 focus:border-accent focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="rounded-lg bg-accent/10 border border-accent/30 px-3 py-2 text-accent hover:bg-accent/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function InfluencerForm({ onSubmit, onCancel }: { onSubmit: (entry: Omit<InfluencerEntry, "id">) => void; onCancel: () => void }) {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [subscribers, setSubscribers] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      platform,
      subscribers,
      discountCode: discountCode.trim(),
      notes: notes.trim(),
      status: "identified",
      dateContacted: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-white/5 px-6 py-4 space-y-4 bg-charcoal-light/50">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray/50 mb-1">Name / Channel *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Mark and Sam"
            className="w-full rounded-lg bg-charcoal border border-white/10 px-3 py-2 text-sm text-white placeholder:text-warm-gray/30 focus:border-accent focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray/50 mb-1">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-lg bg-charcoal border border-white/10 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
          >
            <option>YouTube</option>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Podcast</option>
            <option>Forum</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray/50 mb-1">Subscribers/Followers</label>
          <input
            type="text"
            value={subscribers}
            onChange={(e) => setSubscribers(e.target.value)}
            placeholder="e.g., 45K"
            className="w-full rounded-lg bg-charcoal border border-white/10 px-3 py-2 text-sm text-white placeholder:text-warm-gray/30 focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray/50 mb-1">Discount Code</label>
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            placeholder="e.g., CHANNEL10"
            className="w-full rounded-lg bg-charcoal border border-white/10 px-3 py-2 text-sm text-white font-mono placeholder:text-warm-gray/30 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-gray/50 mb-1">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contact email, content style, etc."
            className="w-full rounded-lg bg-charcoal border border-white/10 px-3 py-2 text-sm text-white placeholder:text-warm-gray/30 focus:border-accent focus:outline-none"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-charcoal hover:bg-accent-hover transition-colors"
        >
          Add Influencer
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-6 py-2 text-sm text-warm-gray hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
