import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Github, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Users, 
  BookOpen, 
  Star, 
  GitFork, 
  Calendar,
  Code,
  Mail,
  ExternalLink,
  Cpu,
  Layers,
  AlertCircle,
  TrendingUp,
  Clock,
  Tag,
  Share2,
  X,
  Download,
  GitCommit,
  GitPullRequest,
  Disc,
  Filter,
  Briefcase,
  Activity,
  Trophy,
  Scale,
  Database,
  Palette,
  Settings
} from 'lucide-react';

// --- Constants & Themes ---

const THEMES = {
  default: {
    name: 'Nebula',
    from: 'from-blue-600',
    to: 'to-purple-600',
    accent: 'text-blue-400',
    bgOrb1: 'bg-purple-600/30',
    bgOrb2: 'bg-blue-600/30',
    bgOrb3: 'bg-indigo-600/20'
  },
  emerald: {
    name: 'Matrix',
    from: 'from-emerald-500',
    to: 'to-teal-600',
    accent: 'text-emerald-400',
    bgOrb1: 'bg-emerald-600/30',
    bgOrb2: 'bg-teal-600/30',
    bgOrb3: 'bg-green-600/20'
  },
  sunset: {
    name: 'Sunset',
    from: 'from-orange-500',
    to: 'to-pink-600',
    accent: 'text-orange-400',
    bgOrb1: 'bg-orange-600/30',
    bgOrb2: 'bg-red-600/30',
    bgOrb3: 'bg-pink-600/20'
  },
  cyber: {
    name: 'Cyber',
    from: 'from-pink-500',
    to: 'to-cyan-500',
    accent: 'text-cyan-400',
    bgOrb1: 'bg-pink-600/30',
    bgOrb2: 'bg-cyan-600/30',
    bgOrb3: 'bg-fuchsia-600/20'
  }
};

// --- Components ---

const SplashScreen = ({ finishLoading }) => {
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Start the exit animation slightly before unmounting
    const timer = setTimeout(() => {
      setAnimateOut(true);
    }, 2500); // Start fading out at 2.5s

    const finishTimer = setTimeout(() => {
      finishLoading();
    }, 3000); // Unmount at 3s

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [finishLoading]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${animateOut ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <div className="relative">
        {/* Glowing Orb Background behind Logo */}
        <div className="absolute inset-0 bg-blue-600/30 rounded-full blur-[60px] animate-pulse"></div>
        
        {/* Main Logo Container */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-bounce-slight">
            <Github size={80} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
          
          <div className="mt-8 overflow-hidden">
            <h1 className="text-5xl font-black text-white tracking-tighter animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-gray-400">
              Jixu
            </h1>
          </div>
          
          <div className="mt-2 overflow-hidden">
             <p className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase animate-slide-up-delay opacity-0 fill-mode-forwards">
               Profile Analyzer
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BackgroundOrbs = ({ theme }) => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000">
    <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] animate-blob mix-blend-screen ${theme.bgOrb1}`}></div>
    <div className={`absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen ${theme.bgOrb2}`}></div>
    <div className={`absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen ${theme.bgOrb3}`}></div>
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

// --- Charts & Visuals ---

const DonutChart = ({ data }) => {
  // Calculate conic gradient segments
  let cumulative = 0;
  const segments = data.map(item => {
    const start = cumulative;
    cumulative += parseFloat(item.percentage);
    return `${item.color} ${start}% ${cumulative}%`;
  }).join(', ');

  return (
    <div className="relative w-32 h-32 rounded-full" style={{ background: `conic-gradient(${segments})` }}>
      <div className="absolute inset-4 bg-[#161b22] rounded-full flex items-center justify-center">
        <div className="text-center">
           <span className="text-xs text-gray-500 block">Top</span>
           <span className="text-sm font-bold text-white block">{data[0]?.lang || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

const DevRankCard = ({ score, rank, theme }) => (
  <GlassCard className="p-6 relative overflow-hidden group">
    <div className={`absolute inset-0 bg-gradient-to-br ${theme.from} ${theme.to} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2">
          <Trophy size={16} className="text-yellow-400" /> Jixu DevRank
        </h3>
        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          {rank}
        </div>
        <p className="text-xs text-gray-500 mt-2">Score: {score.toLocaleString()}</p>
      </div>
      <div className="h-16 w-16 rounded-full border-4 border-white/10 flex items-center justify-center bg-white/5 shadow-inner">
        <span className={`text-xl font-bold ${theme.accent}`}>{rank}</span>
      </div>
    </div>
  </GlassCard>
);

// --- Skeleton Loaders ---
const SkeletonPulse = ({ className }) => (
  <div className={`bg-white/10 animate-pulse rounded ${className}`}></div>
);

const ProfileSkeleton = () => (
  <GlassCard className="p-8 animate-fade-in">
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
      <SkeletonPulse className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
      <div className="flex-1 w-full space-y-4">
        <SkeletonPulse className="h-8 w-3/4 md:w-1/3" />
        <SkeletonPulse className="h-4 w-1/4" />
        <SkeletonPulse className="h-16 w-full md:w-2/3" />
        <div className="flex gap-4">
          <SkeletonPulse className="h-4 w-20" />
          <SkeletonPulse className="h-4 w-20" />
          <SkeletonPulse className="h-4 w-20" />
        </div>
      </div>
    </div>
  </GlassCard>
);

const RepoGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <GlassCard key={i} className="p-5 h-40 flex flex-col justify-between">
        <div>
          <SkeletonPulse className="h-6 w-3/4 mb-3" />
          <SkeletonPulse className="h-4 w-full mb-2" />
          <SkeletonPulse className="h-4 w-2/3" />
        </div>
        <div className="flex gap-3 mt-4">
          <SkeletonPulse className="h-4 w-8" />
          <SkeletonPulse className="h-4 w-8" />
        </div>
      </GlassCard>
    ))}
  </div>
);

// --- Real Components ---

const StatCard = ({ icon: Icon, label, value, colorClass }) => (
  <GlassCard className="p-4 flex items-center space-x-4 hover:bg-white/10 transition-colors duration-300 group">
    <div className={`p-3 rounded-xl bg-white/5 ${colorClass} group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </GlassCard>
);

const ActivityItem = ({ event }) => {
  let icon = <Activity size={16} className="text-gray-400" />;
  let actionText = "performed an action";
  let target = event.repo.name;

  switch (event.type) {
    case 'PushEvent':
      icon = <GitCommit size={16} className="text-yellow-400" />;
      actionText = `pushed to ${event.payload.ref?.replace('refs/heads/', '') || 'branch'}`;
      break;
    case 'PullRequestEvent':
      icon = <GitPullRequest size={16} className="text-purple-400" />;
      actionText = `${event.payload.action} PR in`;
      break;
    case 'IssuesEvent':
      icon = <Disc size={16} className="text-green-400" />;
      actionText = `${event.payload.action} issue in`;
      break;
    case 'WatchEvent':
      icon = <Star size={16} className="text-yellow-400" />;
      actionText = "starred";
      break;
    case 'CreateEvent':
      icon = <Code size={16} className="text-blue-400" />;
      actionText = `created ${event.payload.ref_type}`;
      break;
    default:
      break;
  }

  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
      <div className="mt-1">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">
          <span className="font-semibold text-white">{actionText}</span> <span className="text-blue-400">{target}</span>
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <Clock size={10} /> {new Date(event.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const LanguageAnalysis = ({ repos }) => {
  const stats = useMemo(() => {
    if (!repos) return [];
    const counts = {};
    let total = 0;
    repos.forEach(repo => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
        total++;
      }
    });
    
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([lang, count]) => ({
        lang,
        percentage: ((count / total) * 100).toFixed(1),
        color: getLanguageColor(lang)
      }));
  }, [repos]);

  if (stats.length === 0) return null;

  return (
    <GlassCard className="p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Cpu size={18} className="text-purple-400" />
          Language Insights
        </h3>
      </div>
     
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <DonutChart data={stats} />
        
        <div className="flex-1 w-full">
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-gray-800 mb-4">
            {stats.map((stat, i) => (
              <div 
                key={stat.lang}
                style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }}
                className="h-full hover:brightness-110 transition-all relative group"
              >
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {stats.map(stat => (
              <div key={stat.lang} className="flex items-center justify-between text-sm text-gray-300">
                <div className="flex items-center gap-2">
                   <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }}></span>
                   <span className="font-medium">{stat.lang}</span>
                </div>
                <span className="text-gray-500">{stat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

const RepoCard = ({ repo, theme }) => (
  <GlassCard className="p-5 flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${theme.from} to-transparent -mr-10 -mt-10 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
    
    <div className="flex justify-between items-start mb-3 relative z-10">
      <h3 className={`text-lg font-bold truncate pr-2 group-hover:brightness-125 transition-colors ${theme.accent}`}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <BookOpen size={18} />
          {repo.name}
        </a>
      </h3>
      <div className="flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
        <span>{repo.visibility}</span>
      </div>
    </div>
    
    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
      {repo.description || "No description provided."}
    </p>

    {/* Metadata Row */}
    <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
       {repo.license && (
         <span className="flex items-center gap-1"><Scale size={12}/> {repo.license.spdx_id}</span>
       )}
       <span className="flex items-center gap-1"><Database size={12}/> {Math.round(repo.size / 1024)} MB</span>
    </div>

    {/* Topics/Tags */}
    {repo.topics && repo.topics.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {repo.topics.slice(0, 3).map(topic => (
          <span key={topic} className={`text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${theme.accent}`}>
            {topic}
          </span>
        ))}
        {repo.topics.length > 3 && (
          <span className="text-xs px-2 py-0.5 text-gray-500">+{repo.topics.length - 3}</span>
        )}
      </div>
    )}

    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">
      <div className="flex items-center gap-4">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
            {repo.language}
          </div>
        )}
        <div className="flex items-center gap-1 hover:text-yellow-400 transition-colors" title="Stars">
          <Star size={14} />
          {repo.stargazers_count}
        </div>
        <div className="flex items-center gap-1 hover:text-green-400 transition-colors" title="Forks">
          <GitFork size={14} />
          {repo.forks_count}
        </div>
      </div>
      <div className="text-gray-600">
        {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
      </div>
    </div>
  </GlassCard>
);

const App = () => {
  const [loadingSplash, setLoadingSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('stars'); 
  const [repoFilter, setRepoFilter] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [rateLimit, setRateLimit] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const theme = THEMES[currentTheme];

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('jixu_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const addToRecent = (username) => {
    const newRecent = [username, ...recentSearches.filter(u => u !== username)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('jixu_recent_searches', JSON.stringify(newRecent));
  };

  const removeRecent = (e, username) => {
    e.stopPropagation();
    const newRecent = recentSearches.filter(u => u !== username);
    setRecentSearches(newRecent);
    localStorage.setItem('jixu_recent_searches', JSON.stringify(newRecent));
  }

  const fetchProfile = async (searchQuery) => {
    if (!searchQuery?.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);
    setEvents([]);
    setRepoFilter('');
    setQuery(searchQuery);

    try {
      const userRes = await fetch(`https://api.github.com/users/${searchQuery}`);
      // Check for rate limit headers
      const limit = userRes.headers.get('X-RateLimit-Remaining');
      if (limit) setRateLimit(limit);

      const userData = await userRes.json();

      if (userData.message === 'Not Found') {
        throw new Error('User not found');
      }

      // Parallel fetch for repos and events to speed up loading
      const [reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${searchQuery}/repos?per_page=100&sort=updated`),
        fetch(`https://api.github.com/users/${searchQuery}/events?per_page=10`)
      ]);

      const reposData = await reposRes.json();
      const eventsData = await eventsRes.json();

      setUser(userData);
      setRepos(Array.isArray(reposData) ? reposData : []);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      addToRecent(userData.login);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProfile(query);
  };

  // Derived Stats
  const totalStars = useMemo(() => repos.reduce((acc, repo) => acc + repo.stargazers_count, 0), [repos]);
  const totalForks = useMemo(() => repos.reduce((acc, repo) => acc + repo.forks_count, 0), [repos]);

  // DevRank Calculation
  const devRank = useMemo(() => {
    if (!user) return { score: 0, rank: 'N/A' };
    
    // Simple heuristic algorithm
    const score = (user.followers * 10) + (totalStars * 5) + (totalForks * 3) + (user.public_repos * 2);
    
    let rank = 'C';
    if (score > 10000) rank = 'S+';
    else if (score > 5000) rank = 'S';
    else if (score > 2000) rank = 'A';
    else if (score > 1000) rank = 'B';
    
    return { score, rank };
  }, [user, totalStars, totalForks]);

  // Sorted & Filtered Repos
  const processedRepos = useMemo(() => {
    let r = [...repos];
    
    // Filter
    if (repoFilter) {
      r = r.filter(repo => repo.name.toLowerCase().includes(repoFilter.toLowerCase()));
    }

    // Sort
    if (sortType === 'stars') return r.sort((a, b) => b.stargazers_count - a.stargazers_count);
    if (sortType === 'forks') return r.sort((a, b) => b.forks_count - a.forks_count);
    return r.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }, [repos, sortType, repoFilter]);

  const shareProfile = () => {
    if (user) {
      navigator.clipboard.writeText(window.location.href); 
      alert(`Copied link for ${user.login}!`);
    }
  };

  const exportData = () => {
    if (!user) return;
    const dataStr = JSON.stringify({ user, repos, events, score: devRank }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user.login}-profile-analysis.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-200 font-sans relative selection:bg-white/20">
      
      {loadingSplash && <SplashScreen finishLoading={() => setLoadingSplash(false)} />}

      <BackgroundOrbs theme={theme} />

      {/* --- Navbar --- */}
      <nav className="relative z-50 border-b border-white/5 bg-[#0f1117]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setUser(null); setQuery('');}}>
            <div className={`bg-gradient-to-br ${theme.from} ${theme.to} p-2 rounded-lg shadow-lg`}>
              <Github className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Jixu<span className="font-light">Analyzer</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
             
             {/* Theme Toggle */}
             <div className="relative">
                <button 
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Palette size={20} />
                </button>
                {showThemeMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#161b22] border border-white/10 rounded-xl shadow-2xl p-2 z-50">
                    <p className="text-xs text-gray-500 mb-2 px-2">Select Theme</p>
                    {Object.entries(THEMES).map(([key, t]) => (
                      <button
                        key={key}
                        onClick={() => { setCurrentTheme(key); setShowThemeMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-white/5 transition-colors ${currentTheme === key ? 'text-white bg-white/10' : 'text-gray-400'}`}
                      >
                         <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${t.from} ${t.to}`}></div>
                         {t.name}
                      </button>
                    ))}
                  </div>
                )}
             </div>

             <div className="hidden md:flex items-center gap-6">
               {rateLimit && (
                 <span className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5" title="API Requests Remaining">
                   API: {rateLimit}
                 </span>
               )}
               <a href="https://github.com/Jixu-Dev" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                 <Github size={16}/> GitHub
               </a>
               <a href="mailto:rohitgowda255@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                 <Mail size={16} /> Contact
               </a>
             </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search Section */}
        <div className={`max-w-2xl mx-auto transition-all duration-500 ${user ? 'mb-12' : 'mb-32 mt-20 text-center'}`}>
          {!user && (
            <>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-up">
                Discover GitHub <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.from} ${theme.to}`}>Profiles</span>
              </h1>
              <p className="text-gray-400 mb-8 text-lg animate-fade-in-up animation-delay-200">
                Gamified analytics, deep insights, and repository visualization.
              </p>
            </>
          )}
          
          <form onSubmit={handleSubmit} className="relative group z-20">
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.from} ${theme.to} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000`}></div>
            <div className="relative flex items-center bg-[#161b22] border border-white/10 rounded-2xl p-2 shadow-2xl">
              <Search className="text-gray-400 ml-4" size={20} />
              <input 
                type="text" 
                placeholder="Enter GitHub username..." 
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-4 py-3 text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading}
                className={`bg-gradient-to-r ${theme.from} ${theme.to} text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? '...' : 'Analyze'}
              </button>
            </div>
          </form>

          {/* Recent Searches Chips */}
          {!loading && recentSearches.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 justify-center animate-fade-in">
               <span className="text-sm text-gray-500 flex items-center gap-1"><Clock size={14}/> Recent:</span>
               {recentSearches.map(u => (
                 <button
                   key={u}
                   onClick={() => fetchProfile(u)}
                   className={`group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 px-3 py-1 rounded-full text-sm text-gray-300 transition-all`}
                 >
                   <span>{u}</span>
                   <span 
                     onClick={(e) => removeRecent(e, u)}
                     className="p-0.5 rounded-full hover:bg-white/20 text-gray-500 hover:text-red-400"
                   >
                     <X size={12} />
                   </span>
                 </button>
               ))}
            </div>
          )}
        </div>

        {/* Loading State - Skeleton */}
        {loading && (
          <div className="animate-fade-in space-y-8">
            <ProfileSkeleton />
            <GlassCard className="p-6 mt-6 h-32">
               <SkeletonPulse className="h-6 w-48 mb-4" />
               <SkeletonPulse className="h-4 w-full" />
            </GlassCard>
            <RepoGridSkeleton />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-md mx-auto mb-12 animate-fade-in">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-red-500/5">
              <AlertCircle size={20} />
              {error}
            </div>
          </div>
        )}

        {/* Profile Content */}
        {!loading && user && (
          <div className="animate-fade-in-up space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Profile Card */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Profile Card */}
                <GlassCard className="p-8 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${theme.from} to-transparent opacity-10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none`}></div>

                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.from} ${theme.to} rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse`}></div>
                      <img 
                        src={user.avatar_url} 
                        alt={user.login} 
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#161b22] shadow-2xl object-cover"
                      />
                      {user.hireable && (
                        <a href={`mailto:${user.email || 'rohitgowda255@gmail.com'}`} className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-[#161b22] flex items-center gap-1 shadow-lg transition-colors cursor-pointer">
                          <Briefcase size={10} /> HIRE ME
                        </a>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4 text-center md:text-left w-full">
                      <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-4">
                        <div>
                          <h2 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                            {user.name || user.login}
                            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                              <ExternalLink size={20} />
                            </a>
                          </h2>
                          <p className={`font-mono ${theme.accent}`}>@{user.login}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={exportData} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-green-400 transition-colors" title="Export JSON">
                            <Download size={20} />
                          </button>
                          <button onClick={shareProfile} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Share Profile">
                            <Share2 size={20} />
                          </button>
                        </div>
                      </div>
                      
                      {user.bio && <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">{user.bio}</p>}
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                        {user.company && <span className="flex items-center gap-1"><Users size={16} className={theme.accent} /> {user.company}</span>}
                        {user.location && <span className="flex items-center gap-1"><MapPin size={16} className="text-red-400" /> {user.location}</span>}
                        {user.blog && <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" className={`flex items-center gap-1 hover:${theme.accent} transition-colors`}><LinkIcon size={16} className="text-green-400" /> Website</a>}
                        {user.twitter_username && <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" className={`flex items-center gap-1 hover:${theme.accent} transition-colors`}><Twitter size={16} className="text-sky-400" /> @{user.twitter_username}</a>}
                        <span className="flex items-center gap-1"><Calendar size={16} className="text-yellow-400" /> Joined {new Date(user.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Users} label="Followers" value={user.followers.toLocaleString()} colorClass="text-pink-400" />
                  <StatCard icon={Users} label="Following" value={user.following.toLocaleString()} colorClass="text-purple-400" />
                  <StatCard icon={Star} label="Total Stars" value={totalStars.toLocaleString()} colorClass="text-yellow-400" />
                  <StatCard icon={BookOpen} label="Public Repos" value={user.public_repos.toLocaleString()} colorClass="text-blue-400" />
                </div>
                
                {/* Language Analysis */}
                <LanguageAnalysis repos={repos} />
              </div>

              {/* Right Column: Score & Activity */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* DevRank Score */}
                <DevRankCard score={devRank.score} rank={devRank.rank} theme={theme} />

                {/* Activity Timeline */}
                <GlassCard className="p-6 h-auto min-h-[300px]">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-green-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-1">
                    {events.length > 0 ? (
                      events.map(event => <ActivityItem key={event.id} event={event} />)
                    ) : (
                      <p className="text-gray-500 text-sm">No recent public activity found.</p>
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Repositories Section */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Layers size={24} className={theme.accent} />
                  Repositories <span className="text-gray-500 text-lg font-normal">({user.public_repos})</span>
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  {/* Repo Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                    <input 
                      type="text" 
                      placeholder="Find a repository..." 
                      className="bg-[#161b22] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-gray-500 w-full sm:w-64"
                      value={repoFilter}
                      onChange={(e) => setRepoFilter(e.target.value)}
                    />
                  </div>

                  {/* Sort Buttons */}
                  <div className="flex bg-[#161b22] p-1 rounded-lg border border-white/10">
                    {['stars', 'forks', 'updated'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSortType(type)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          sortType === type 
                            ? `bg-gradient-to-r ${theme.from} ${theme.to} text-white shadow-lg` 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedRepos.map(repo => (
                  <RepoCard key={repo.id} repo={repo} theme={theme} />
                ))}
              </div>
              
              {processedRepos.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No repositories found matching your filter.</p>
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      {/* --- Footer --- */}
      <footer className="relative z-10 border-t border-white/5 bg-[#0f1117]/80 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <div className={`bg-gradient-to-br ${theme.from} ${theme.to} p-1.5 rounded-lg`}>
                  <Code className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold text-white">Jixu</span>
              </div>
              <p className="text-gray-500 text-sm">
                Advanced GitHub profile analytics & visualization.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/Jixu-Dev" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Github size={20} />
                </div>
                <span className="hidden sm:inline">Jixu-Dev</span>
              </a>
              
              <a 
                href="mailto:rohitgowda255@gmail.com" 
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="hidden sm:inline">rohitgowda255@gmail.com</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Jixu. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Tailwind & Custom Animations Setup */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        /* New Splash Screen Animations */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-out forwards;
          animation-delay: 0.8s;
        }
        @keyframes bounceSlight {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-bounce-slight {
          animation: bounceSlight 2s infinite ease-in-out;
        }
        .fill-mode-forwards {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

// Helper for language colors
const getLanguageColor = (lang) => {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#F05138',
    Vue: '#41b883',
    React: '#61dafb',
    Dart: '#00B4AB',
    Shell: '#89e051',
    Kotlin: '#A97BFF',
    Svelte: '#FF3E00',
    Elixir: '#4e2a8e',
    Lua: '#000080',
    Perl: '#0298c3'
  };
  return colors[lang] || '#8b949e'; // Default gray
};

export default App;
