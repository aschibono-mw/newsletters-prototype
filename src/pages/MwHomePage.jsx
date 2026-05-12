import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gwynethImg from '../assets/homepage/Gwenneth.png';
import dannyImg from '../assets/homepage/danny.png';
import summitLogoImg from '../assets/homepage/summitlogo.avif';
import searchIllustration from '../assets/homepage/Search.svg';
import dashboardsIllustration from '../assets/homepage/dashboards.svg';
import alertsIllustration from '../assets/homepage/ALerts.svg';
import { Search, Eye, TrendingUp, MessageCircle, FileText, Users, Target, ChevronDown, ChevronRight, Bell, Settings, Home, Activity, Mail, Video, LayoutDashboard, MoreVertical, Plus, Download, Edit, Newspaper, Share2, Star, Maximize2, Copy, ExternalLink, Calendar, ArrowUp, Briefcase } from 'lucide-react';

// Extracted AI Icon Component for performance - prevents re-creation on each render
const AIIcon = React.memo(({ gradientId }) => (
  <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path d="M5.39262 8.6572L6.41023 6.4275L8.63995 5.38644L6.41023 4.36884L5.39262 2.13913L4.35156 4.36884L2.12186 5.38644L4.35156 6.4275L5.39262 8.6572ZM5.90145 10.4502C5.70153 10.8876 5.08061 10.889 4.87869 10.4525L3.43886 7.3402L0.326533 5.90037C-0.109945 5.69845 -0.108521 5.07753 0.328878 4.87761L3.43886 3.45613L4.87819 0.32761C5.07966 -0.110302 5.70247 -0.10888 5.90194 0.329948L7.32293 3.45613L10.4491 4.87712C10.8879 5.07659 10.8894 5.6994 10.4515 5.90087L7.32293 7.3402L5.90145 10.4502ZM13.2006 12.5712C13.0008 13.006 12.3838 13.0089 12.18 12.5759L11.7067 11.5707L10.7016 11.0974C10.2685 10.8936 10.2714 10.2766 10.7062 10.0767L11.7067 9.6169L12.1789 8.6027C12.3819 8.1668 13.0026 8.16963 13.2016 8.60736L13.6605 9.6169L14.67 10.0758C15.1078 10.2747 15.1106 10.8955 14.6747 11.0985L13.6605 11.5707L13.2006 12.5712Z" fill={`url(#${gradientId})`}/>
    <defs>
      <linearGradient id={gradientId} x1="-1.16561e-07" y1="12.8874" x2="15.0001" y2="12.8872" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B49A0"/>
        <stop offset="1" stopColor="#497C9F"/>
      </linearGradient>
    </defs>
  </svg>
));

export default function MeltwaterHomepage() {
  // ====================CONSTANTS ====================
  
  // Color palette for consistency - memoized to prevent recreating on each render
  const COLORS = useMemo(() => ({
    teal: '#2A9E9F',
    tealLight: '#E1F1F2',
    tealBright: '#28BBBB',
    purple: '#B627A1',
    gradientStart: '#F8E8F6',
    gradientEnd: '#E9F6F6'
  }), []);

  // Reusable className patterns - memoized to prevent recreating on each render
  const CLASSES = useMemo(() => ({
    sidebarItem: 'flex items-center gap-3 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer text-sm',
    sidebarSubItem: 'flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer',
    panelButton: 'w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center gap-3',
    iconSize: 'w-4 h-4',
    iconSizeMd: 'w-5 h-5',
    tooltip: 'tooltip-text'
  }), []);

  // Memoized inline styles to prevent object recreation on each render
  const STYLES = useMemo(() => ({
    gradientBackground: { background: 'linear-gradient(90deg, #F8E8F6 0%, #E9F6F6 100%)' },
    chartContainer: { minHeight: '280px', marginTop: '16px' },
    cybertruckModule: { height: '100%' }
  }), []);

  // ==================== NAVIGATION ====================
  const navigate = useNavigate();

  // ==================== STATE ====================

  const [currentSlide, setCurrentSlide] = useState(0);
  const [summitSlide, setSummitSlide] = useState(0);
  const [expertSlide, setExpertSlide] = useState(0);
  const [emergingSlide, setEmergingSlide] = useState(0);
  const totalEmergingSlides = 3;
  const [sentimentMenuOpen, setSentimentMenuOpen] = useState(false);
  const [narrativeMenuOpen, setNarrativeMenuOpen] = useState(false);
  const [miraPanelOpen, setMiraPanelOpen] = useState(false);
  const [miraSearchOpen, setMiraSearchOpen] = useState(false);
  const [miraSearchValue, setMiraSearchValue] = useState('');
  const [miraFieldHeight, setMiraFieldHeight] = useState(50);
  const [addSearchOpen, setAddSearchOpen] = useState(false);
  const [addSearchFilter, setAddSearchFilter] = useState('');
  const miraTextareaRef = useRef(null);
  const miraCursorRef = useRef(null);
  const suppressMiraOpenRef = useRef(false);
  const [graphHover, setGraphHover] = useState(null); // {x: number, values: {positive, neutral, negative}}
  const [aiSentimentMenuOpen, setAiSentimentMenuOpen] = useState(false);
  const [aiNarrativeMenuOpen, setAiNarrativeMenuOpen] = useState(false);
  const [cybertruckMenuOpen, setCybertruckMenuOpen] = useState(false);
  const [aiCybertruckMenuOpen, setAiCybertruckMenuOpen] = useState(false);
  const [reactionBreakdownMenuOpen, setReactionBreakdownMenuOpen] = useState(false);
  const [aiReactionBreakdownMenuOpen, setAiReactionBreakdownMenuOpen] = useState(false);
  const [journalistsMenuOpen, setJournalistsMenuOpen] = useState(false);
  const [emergingInsightsMenuOpen, setEmergingInsightsMenuOpen] = useState(false);
  const [journalistPanelMenuIdx, setJournalistPanelMenuIdx] = useState(null);
  const [moduleOrder, setModuleOrder] = useState([0, 1, 2, 3]);
  const [draggedModuleIdx, setDraggedModuleIdx] = useState(null);
  const [dragOverModuleIdx, setDragOverModuleIdx] = useState(null);
  const draggedModuleRef = useRef(null);
  const [aiJournalistsMenuOpen, setAiJournalistsMenuOpen] = useState(false);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [panelView, setPanelView] = useState('default'); // 'default' or 'chat'
  const [chatInputFocused, setChatInputFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState('homepage'); // 'homepage' or 'design-components'
  const [designComponentsSubsection, setDesignComponentsSubsection] = useState('homepage-data-modules'); // subsection within design components
  const [randomModuleIndices, setRandomModuleIndices] = useState([0, 1]); // Indices of modules to display on homepage
  const [isLoadingModules, setIsLoadingModules] = useState(false); // Loading state for module randomization
  const [expandedMenus, setExpandedMenus] = useState({
    'explore+': false,
    'monitor': false,
    'mediaRelations': false,
    'engage': false,
    'report': false,
    'content': false,
    'account': false,
    'designComponentsDropdown': false
  });

  // Throttle reference for mouse move optimization
  const lastMouseMoveTime = useRef(0);
  
  // Throttled mouse move handler - reduces state updates by ~90%
  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    // Throttle to 16ms (60fps) - prevents excessive state updates
    if (now - lastMouseMoveTime.current < 16) return;
    
    lastMouseMoveTime.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  // Optimized click-outside handler - single event listener for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Batch check all menus in single pass - more efficient than multiple checks
      const checks = [
        { isOpen: sentimentMenuOpen, selector: '[data-sentiment-menu]', close: () => setSentimentMenuOpen(false) },
        { isOpen: narrativeMenuOpen, selector: '[data-narrative-menu]', close: () => setNarrativeMenuOpen(false) },
        { isOpen: aiSentimentMenuOpen, selector: '[data-ai-sentiment-menu]', close: () => setAiSentimentMenuOpen(false) },
        { isOpen: aiNarrativeMenuOpen, selector: '[data-ai-narrative-menu]', close: () => setAiNarrativeMenuOpen(false) },
        { isOpen: cybertruckMenuOpen, selector: '[data-cybertruck-menu]', close: () => setCybertruckMenuOpen(false) },
        { isOpen: aiCybertruckMenuOpen, selector: '[data-ai-cybertruck-menu]', close: () => setAiCybertruckMenuOpen(false) },
        { isOpen: reactionBreakdownMenuOpen, selector: '[data-reaction-breakdown-menu]', close: () => setReactionBreakdownMenuOpen(false) },
        { isOpen: aiReactionBreakdownMenuOpen, selector: '[data-ai-reaction-breakdown-menu]', close: () => setAiReactionBreakdownMenuOpen(false) },
        { isOpen: journalistsMenuOpen, selector: '[data-journalists-menu]', close: () => setJournalistsMenuOpen(false) },
        { isOpen: aiJournalistsMenuOpen, selector: '[data-ai-journalists-menu]', close: () => setAiJournalistsMenuOpen(false) },
        { isOpen: emergingInsightsMenuOpen, selector: '[data-emerging-insights-menu]', close: () => setEmergingInsightsMenuOpen(false) },
        { isOpen: journalistPanelMenuIdx !== null, selector: '[data-journalist-panel-menu]', close: () => setJournalistPanelMenuIdx(null) },
        { isOpen: expandedMenus['designComponentsDropdown'], selector: '[data-design-components-dropdown]', close: () => setExpandedMenus(prev => ({ ...prev, designComponentsDropdown: false })) },
        { isOpen: miraSearchOpen, selector: '[data-mira-search]', close: () => setMiraSearchOpen(false) },
        { isOpen: addSearchOpen, selector: '[data-add-search]', close: () => { setAddSearchOpen(false); setAddSearchFilter(''); } }
      ];
      
      // Early exit if no menus are open - saves processing
      if (!checks.some(check => check.isOpen)) return;
      
      // Process all open menus
      checks.forEach(({ isOpen, selector, close }) => {
        if (isOpen && !event.target.closest(selector)) {
          close();
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sentimentMenuOpen, narrativeMenuOpen, aiSentimentMenuOpen, aiNarrativeMenuOpen, cybertruckMenuOpen, aiCybertruckMenuOpen, reactionBreakdownMenuOpen, aiReactionBreakdownMenuOpen, journalistsMenuOpen, aiJournalistsMenuOpen, emergingInsightsMenuOpen, journalistPanelMenuIdx, expandedMenus, miraSearchOpen, addSearchOpen]);

  useEffect(() => {
    const ta = miraTextareaRef.current;
    if (!ta) return;
    // Measure natural height without animating
    ta.style.transition = 'none';
    ta.style.height = 'auto';
    const target = ta.scrollHeight;
    ta.style.height = target + 'px';
    // Update state so the header and textarea animate together via CSS
    requestAnimationFrame(() => setMiraFieldHeight(target));
  }, [miraSearchValue]);


  const toggleMenu = useCallback((menuKey) => {
    setExpandedMenus(prev => {
      // If clicking an already open menu, close it
      if (prev[menuKey]) {
        return { ...prev, [menuKey]: false };
      }
      // Otherwise, close all menus and open only the clicked one
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return { ...allClosed, [menuKey]: true };
    });
  }, []);

  const slides = useMemo(() => [
    {
      title: "Bloomberg Terminal Integration",
      subtitle: "Access financial data seamlessly",
      image: "BLOOMBERG"
    },
    {
      title: "Reuters News Feed",
      subtitle: "Real-time global coverage",
      image: "REUTERS"
    }
  ], []);

  const alerts = useMemo(() => [
    { time: "2 min ago",   text: "Tesla brand mentions spiked 63% on X following cryptic product teaser videos — analysts speculate affordable Model Y launch imminent." },
    { time: "25 min ago",  text: "Spike Detected: Tesla Cybertruck recall coverage surging across 8,400+ automotive and news sources, driving negative sentiment to a 30-day high." },
    { time: "1 hr ago",    text: "Elon Musk's latest X post referencing Tesla's Robotaxi program generated 180k+ engagements within 4 hours, triggering a positive mention spike." },
    { time: "4 hrs ago",   text: "Spike Detected: Tesla boycott conversation on Reddit and X increased 41% this week, tied to renewed criticism of Musk's political affiliations." },
    { time: "11 hrs ago",  text: "Tesla Q3 earnings coverage drove a 52% increase in brand mentions across financial media — sentiment trending positive following better-than-expected delivery numbers." }
  ], []);

  // ==================== OPTIMIZED HANDLERS ====================
  
  const handleMiraPanelToggle = useCallback(() => {
    setPanelView('default');
    setMiraPanelOpen(prev => !prev);
  }, []);

  const handleMiraPanelClose = useCallback(() => {
    setMiraPanelOpen(false);
    setPanelView('default');
  }, []);

  const handleExpandInsight = useCallback(() => {
    setPanelView('chat');
    setMiraPanelOpen(true);
  }, []);

  const handleSeeJournalists = useCallback(() => {
    setPanelView('journalists');
    setMiraPanelOpen(true);
  }, []);

  const handleCreateSpikeAlert = useCallback(() => {
    setPanelView('spikeAlert');
    setMiraPanelOpen(true);
  }, []);

  const handleModuleDragStart = useCallback((e, moduleIdx) => {
    draggedModuleRef.current = moduleIdx;
    setDraggedModuleIdx(moduleIdx);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleModuleDragOver = useCallback((e, moduleIdx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedModuleRef.current !== moduleIdx) setDragOverModuleIdx(moduleIdx);
  }, []);

  const handleModuleDrop = useCallback((e, targetModuleIdx) => {
    e.preventDefault();
    const dragged = draggedModuleRef.current;
    if (dragged === null || dragged === targetModuleIdx) { setDragOverModuleIdx(null); return; }
    setModuleOrder(prev => {
      const next = [...prev];
      const a = next.indexOf(dragged);
      const b = next.indexOf(targetModuleIdx);
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
    draggedModuleRef.current = null;
    setDraggedModuleIdx(null);
    setDragOverModuleIdx(null);
  }, []);

  const handleModuleDragEnd = useCallback(() => {
    draggedModuleRef.current = null;
    setDraggedModuleIdx(null);
    setDragOverModuleIdx(null);
  }, []);

  const handleSentimentMenuToggle = useCallback(() => {
    setSentimentMenuOpen(prev => !prev);
  }, []);

  const handleNarrativeMenuToggle = useCallback(() => {
    setNarrativeMenuOpen(prev => !prev);
  }, []);

  const handleAiSentimentMenuToggle = useCallback(() => {
    setAiSentimentMenuOpen(prev => !prev);
  }, []);

  const handleAiNarrativeMenuToggle = useCallback(() => {
    setAiNarrativeMenuOpen(prev => !prev);
  }, []);

  const handleChatInputFocus = useCallback(() => {
    setChatInputFocused(true);
  }, []);

  const handleChatInputBlur = useCallback(() => {
    setChatInputFocused(false);
  }, []);

  const handleNavigateToDesignComponents = useCallback(() => {
    setCurrentPage('design-components');
    setDesignComponentsSubsection('homepage-data-modules');
  }, []);

  const handleNavigateToHomepage = useCallback(() => {
    setCurrentPage('homepage');
  }, []);

  const handleNavigateToFirstTimeUX = useCallback(() => {
    setCurrentPage('first-time-ux');
  }, []);

  const handleNavigateToInsightsVersion = useCallback(() => {
    setCurrentPage('insights-version');
  }, []);

  const handleDesignComponentsSubsectionChange = useCallback((subsection) => {
    setDesignComponentsSubsection(subsection);
  }, []);


  const handleGraphMouseLeave = useCallback(() => {
    setGraphHover(null);
  }, []);

  // Randomizer function to select 2 random modules from the 4 available
  const randomizeModules = useCallback(() => {
    setIsLoadingModules(true);
    
    setTimeout(() => {
      const totalModules = 5; // We have 5 modules in total
      const indices = [0, 1, 2, 3, 4];
      
      // Fisher-Yates shuffle to get random indices
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Take first 2 indices and sort them to maintain consistent order
      setRandomModuleIndices(indices.slice(0, 2).sort((a, b) => a - b));
      setIsLoadingModules(false);
    }, 1500); // 1.5 second delay
  }, []);

  // Initialize with random modules on component mount
  useEffect(() => {
    randomizeModules();
  }, [randomizeModules]);

  return (
    <div className="bg-gray-50">
      {/* Shimmer Animation Styles */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          @keyframes skeletonPulse {
            0%, 100% {
              opacity: 1;
              background-color: #e5e7eb;
            }
            50% {
              opacity: 0.4;
              background-color: #f3f4f6;
            }
          }
          
          .skeleton-animate {
            animation: skeletonPulse 1.5s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Shared SVG Definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <radialGradient id="miraGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 1.19209e-06) rotate(135) scale(28.2843)">
            <stop stopColor={COLORS.tealBright}/>
            <stop offset="1" stopColor={COLORS.purple}/>
          </radialGradient>
          <clipPath id="miraClip">
            <rect width="16" height="7" fill="white" transform="translate(2 7)"/>
          </clipPath>
        </defs>
      </svg>

      {/* Main content wrapper with slide animation */}
      <div className={`flex-1 flex flex-col transition-[flex] duration-500 ease-out overflow-y-auto`}>
      {/* Header hidden - MUI layout provides it */}
      <header style={{display:"none"}} className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4 w-64">
          <svg width="38" height="16" viewBox="0 0 38 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.9996 0C23.3205 0 26.824 3.58041 26.824 7.99978C26.824 12.4187 23.3205 16 18.9996 16C14.6774 16 11.176 12.4187 11.176 7.99978C11.176 3.58041 14.6774 0 18.9996 0ZM18.9996 11.4288C20.8515 11.4288 22.3533 9.89442 22.3533 7.99978C22.3533 6.10601 20.8515 4.57168 18.9996 4.57168C17.1468 4.57168 15.6476 6.10601 15.6476 7.99978C15.6476 9.89442 17.1468 11.4288 18.9996 11.4288ZM33.4105 8.35965C32.599 9.43882 31.6194 10.5019 30.6403 11.5088C28.9394 13.2664 27.0108 14.802 25.0691 16H30.7573C33.702 13.8286 36.3034 10.914 38 7.99978C36.3034 5.08646 33.702 2.17183 30.7573 0H25.0691C27.0108 1.19797 28.9394 2.73404 30.6403 4.49161C31.6194 5.49854 32.599 6.56118 33.4105 7.64078V7.64383C33.4871 7.74174 33.5344 7.86358 33.5344 7.99848C33.5344 8.13294 33.4871 8.25521 33.4105 8.35269V8.35965ZM4.58904 8.35965C5.40012 9.43882 6.38057 10.5019 7.35974 11.5088C9.05978 13.2664 10.9892 14.802 12.9309 16H7.24272C4.29754 13.8286 1.69578 10.914 0 7.99978C1.69578 5.08646 4.29754 2.17183 7.24272 0H12.9309C10.9892 1.19797 9.05978 2.73404 7.35974 4.49161C6.38057 5.49854 5.40012 6.56118 4.58904 7.64078V7.64383C4.51244 7.74174 4.46563 7.86358 4.46563 7.99848C4.46563 8.13294 4.51244 8.25521 4.58904 8.35269V8.35965Z" fill="#28BBBB"/>
          </svg>
          <span className="font-semibold text-xl">Home</span>
        </div>
        
        <div className="flex items-center gap-4 ml-auto">
          <button 
            className="mira-companion-btn flex items-center gap-2 px-3 text-sm rounded transition-all" style={{height: '36px'}}
            onClick={handleMiraPanelToggle}
          >
            <svg className="wand-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.9537 4.74253L8.23954 5.46261C8.41567 5.56124 8.61039 5.36651 8.51177 5.19039L7.79169 3.90454L8.51177 2.61869C8.61039 2.44257 8.41567 2.24784 8.23954 2.34647L6.9537 3.06654L5.66785 2.34647C5.49173 2.24784 5.297 2.44257 5.39563 2.61869L6.1157 3.90454L5.39563 5.19039C5.297 5.36651 5.49173 5.56124 5.66785 5.46261L6.9537 4.74253ZM16.0955 12.2083L14.8096 11.4882C14.6335 11.3896 14.4388 11.5843 14.5374 11.7605L15.2575 13.0463L14.5374 14.3322C14.4388 14.5083 14.6335 14.703 14.8096 14.6044L16.0955 13.8843L17.3813 14.6044C17.5574 14.703 17.7522 14.5083 17.6535 14.3322L16.9335 13.0463L17.6535 11.7605C17.7522 11.5843 17.5574 11.3896 17.3813 11.4882L16.0955 12.2083ZM17.6535 2.61869C17.7522 2.44257 17.5574 2.24784 17.3813 2.34647L16.0955 3.06654L14.8096 2.34647C14.6335 2.24784 14.4388 2.44257 14.5374 2.61869L15.2575 3.90454L14.5374 5.19039C14.4388 5.36651 14.6335 5.56124 14.8096 5.46261L16.0955 4.74253L17.3813 5.46261C17.5574 5.56124 17.7522 5.36651 17.6535 5.19039L16.9335 3.90454L17.6535 2.61869ZM12.1874 6.03C11.8903 5.73289 11.4103 5.73289 11.1132 6.03L2.22283 14.9204C1.92572 15.2175 1.92572 15.6974 2.22283 15.9945L4.00548 17.7772C4.30258 18.0743 4.78253 18.0743 5.07963 17.7772L13.9624 8.89442C14.2595 8.59731 14.2595 8.11737 13.9624 7.82026L12.1874 6.03ZM11.4027 10.2124L9.78764 8.59731L11.6465 6.73849L13.2615 8.35353L11.4027 10.2124Z" fill="#000000"/>
            </svg>
            <span className="hidden sm:inline">Mira Companion</span>
          </button>
          
          {/* Apps Button */}
          <button className="flex items-center justify-center w-9 h-9 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
          
          {/* Notifications Button */}
          <button className="flex items-center justify-center w-9 h-9 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <Bell className="w-4 h-4 text-gray-600" />
          </button>
          
          {/* Help Button */}
          <button className="flex items-center gap-3 px-4 border border-gray-300 hover:bg-gray-50 transition-colors" style={{height: '36px'}}>
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Help</span>
          </button>
          
          {/* Company/User Button */}
          <button className="flex items-center gap-3 px-4 border border-gray-300 hover:bg-gray-50 transition-colors relative rounded-r" style={{height: '36px', paddingRight: '0'}}>
            <span className="text-sm font-medium text-gray-700">John Smith</span>
            <div className="w-9 h-full bg-gray-200 flex items-center justify-center" style={{marginLeft: '12px'}}>
              <img 
                src="data:image/png;base64,
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"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`sidebar-nav bg-white border-r border-gray-200 flex-shrink-0 flex flex-col fixed left-0 top-0 bottom-0 z-10 overflow-x-hidden transition-all duration-300${miraPanelOpen ? ' sidebar-collapsed' : ''}`} style={{display:'none', paddingTop: '53px', width: miraPanelOpen ? '64px' : '256px'}}>
          <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
            <div className="px-3 mb-1 tooltip-container">
              <div 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${currentPage === 'homepage' ? 'bg-teal-50' : 'hover:bg-gray-50'}`}
                style={{color: '#000000'}}
                onClick={handleNavigateToHomepage}
              >
                <Home className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium sidebar-text">Home</span>
              </div>
              <span className="tooltip-text">Home</span>
            </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div className={CLASSES.sidebarSubItem} onClick={() => navigate('/mw-explore')}>
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm sidebar-text">Explore</span>
              <span className="tooltip-text">Explore</span>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div 
              className={CLASSES.sidebarSubItem}
              onClick={() => toggleMenu('explore+')}
            >
              <Search className="w-4 h-4" />
              <span className="text-sm sidebar-text">Explore+</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 sidebar-arrow ${expandedMenus['explore+'] ? 'rotate-180' : ''}`} />
            </div>
            <span className="tooltip-text">Explore+</span>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out sidebar-submenu sidebar-submenu ${expandedMenus['explore+'] ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-8 mt-1 space-y-1 pl-3 border-l-2 border-gray-200">
                <div className={CLASSES.sidebarItem}>
                  Discovery
                </div>
                <div className={CLASSES.sidebarItem}>
                  Analytics
                </div>
                <div className={CLASSES.sidebarItem}>
                  Insight Pages
                </div>
                <div className={CLASSES.sidebarItem}>
                  Assets
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div
              className={CLASSES.sidebarSubItem}
              onClick={() => { toggleMenu('monitor'); navigate('/mw-monitor'); }}
            >
              <Activity className="w-4 h-4" />
              <span className="text-sm sidebar-text">Monitor</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${expandedMenus['monitor'] ? 'rotate-180' : ''}`} />
            <span className="tooltip-text">Monitor</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out sidebar-submenu ${expandedMenus['monitor'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-8 mt-1 space-y-1 pl-3 border-l-2 border-gray-200">
                <div className={CLASSES.sidebarItem} onClick={() => navigate('/mw-monitor')}>
                  Views
                </div>
                <div className={CLASSES.sidebarItem} onClick={() => navigate('/mw-monitor/trends')}>
                  Trends Center
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div className={CLASSES.sidebarSubItem}>
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm sidebar-text">Analyze</span>
              <span className="tooltip-text">Analyze</span>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div 
              className={CLASSES.sidebarSubItem}
              onClick={() => toggleMenu('mediaRelations')}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm sidebar-text">Media Relations</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${expandedMenus['mediaRelations'] ? 'rotate-180' : ''}`} />
            <span className="tooltip-text">Media Relations</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out sidebar-submenu ${expandedMenus['mediaRelations'] ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-8 mt-1 space-y-1 pl-3 border-l-2 border-gray-200">
                <div className={CLASSES.sidebarItem}>
                  Media Lists
                </div>
                <div className={CLASSES.sidebarItem}>
                  Search
                </div>
                <div className={CLASSES.sidebarItem}>
                  Outreach
                </div>
                <div className={CLASSES.sidebarItem}>
                  PR Assistant
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div 
              className={CLASSES.sidebarSubItem}
              onClick={() => toggleMenu('engage')}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm sidebar-text">Engage</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${expandedMenus['engage'] ? 'rotate-180' : ''}`} />
            <span className="tooltip-text">Engage</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out sidebar-submenu ${expandedMenus['engage'] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-8 mt-1 space-y-1 pl-3 border-l-2 border-gray-200">
                <div className={CLASSES.sidebarItem}>
                  Conversations
                </div>
                <div className={CLASSES.sidebarItem}>
                  Publish
                </div>
                <div className={CLASSES.sidebarItem}>
                  Asset Library
                </div>
                <div className={CLASSES.sidebarItem}>
                  Measure
                </div>
                <div className={CLASSES.sidebarItem}>
                  Advertise
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div className={CLASSES.sidebarSubItem}>
              <Target className="w-4 h-4" />
              <span className="text-sm sidebar-text">Author Segments</span>
              <span className="tooltip-text">Author Segments</span>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div className={CLASSES.sidebarSubItem} onClick={() => navigate('/mw-newsletters-current')}>
              <FileText className="w-4 h-4" />
              <span className="text-sm sidebar-text">Newsletters</span>
              <span className="tooltip-text">Newsletters</span>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div 
              className={CLASSES.sidebarSubItem}
              onClick={() => toggleMenu('report')}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm sidebar-text">Report</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${expandedMenus['report'] ? 'rotate-180' : ''}`} />
            <span className="tooltip-text">Report</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out sidebar-submenu ${expandedMenus['report'] ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-8 mt-1 space-y-1 pl-3 border-l-2 border-gray-200">
                <div className={CLASSES.sidebarItem} onClick={() => navigate('/digests')}>
                  Digest Reports
                </div>
                <div className={CLASSES.sidebarItem}>
                  Insight Reports
                </div>
                <div className={CLASSES.sidebarItem}>
                  Customer Score Reports
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-3 mb-1 tooltip-container">
            <div className={CLASSES.sidebarSubItem} onClick={() => navigate('/mw-alerts-v2')}>
              <Bell className="w-4 h-4" />
              <span className="text-sm sidebar-text">Alerts</span>
              <span className="tooltip-text">Alerts</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4 px-3">
            <div 
              className={CLASSES.sidebarSubItem}
              onClick={() => toggleMenu('content')}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm sidebar-text">Content</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${expandedMenus['content'] ? 'rotate-180' : ''}`} />
            <span className="tooltip-text">Content</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out sidebar-submenu ${expandedMenus['content'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-8 mt-1 space-y-1 pl-3 border-l-2 border-gray-200">
                <div className={CLASSES.sidebarItem}>
                  Tags
                </div>
                <div className={CLASSES.sidebarItem}>
                  Automation
                </div>
                <div className={CLASSES.sidebarItem}>
                  Incoming RSS Feeds
                </div>
                <div className={CLASSES.sidebarItem}>
                  Added Content
                </div>
                <div className={CLASSES.sidebarItem}>
                  Labels
                </div>
                <div className={CLASSES.sidebarItem}>
                  Newsfeeds
                </div>
                <div className={CLASSES.sidebarItem}>
                  Sources
                </div>
              </div>
            </div>
            
            <div 
              className={CLASSES.sidebarSubItem}
              onClick={() => toggleMenu('account')}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm sidebar-text">Account</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${expandedMenus['account'] ? 'rotate-180' : ''}`} />
            <span className="tooltip-text">Account</span>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out sidebar-submenu ${expandedMenus['account'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-8 mt-1 space-y-1 pl-3 border-l-2 border-gray-200">
                <div className={CLASSES.sidebarItem}>
                  Profile
                </div>
                <div className={CLASSES.sidebarItem} onClick={() => navigate('/seats-v10')}>
                  Manage Users
                </div>
                <div className={CLASSES.sidebarItem} onClick={() => navigate('/seats-v10/roles')}>
                  Roles
                </div>
                <div className={CLASSES.sidebarItem}>
                  Third Party Integrations
                </div>
                <div className={CLASSES.sidebarItem}>
                  Social Connections
                </div>
                <div className={CLASSES.sidebarItem}>
                  Approved Senders
                </div>
                <div className={CLASSES.sidebarItem}>
                  Email Integration
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg cursor-pointer" style={STYLES.gradientBackground} onClick={() => navigate('/studio')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="url(#paint0_radial_9718_1148)"/>
                <g clipPath="url(#clip0_9718_1148)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0158 7.11438C11.8413 7.11438 13.3214 8.63006 13.3214 10.5009C13.3214 12.3716 11.8413 13.8876 10.0158 13.8876C8.18985 13.8876 6.71065 12.3716 6.71065 10.5009C6.71065 8.63006 8.18985 7.11438 10.0158 7.11438ZM10.0158 11.9525C10.7982 11.9525 11.4326 11.303 11.4326 10.5009C11.4326 9.69922 10.7982 9.0497 10.0158 9.0497C9.23308 9.0497 8.59973 9.69922 8.59973 10.5009C8.59973 11.303 9.23308 11.9525 10.0158 11.9525ZM16.1039 10.6532C15.7611 11.1101 15.3472 11.5601 14.9336 11.9864C14.215 12.7304 13.4003 13.3805 12.58 13.8876H14.983C16.2271 12.9684 17.326 11.7346 18.0428 10.5009C17.326 9.26762 16.2271 8.03377 14.983 7.11438H12.58C13.4003 7.62151 14.215 8.27177 14.9336 9.0158C15.3472 9.44206 15.7611 9.89191 16.1039 10.3489V10.3502C16.1363 10.3917 16.1562 10.4432 16.1562 10.5004C16.1562 10.5573 16.1363 10.609 16.1039 10.6503V10.6532ZM3.92791 10.6532C4.27056 11.1101 4.68477 11.5601 5.09843 11.9864C5.81663 12.7304 6.63173 13.3805 7.45205 13.8876H5.04899C3.80477 12.9684 2.70562 11.7346 1.98922 10.5009C2.70562 9.26762 3.80477 8.03377 5.04899 7.11438H7.45205C6.63173 7.62151 5.81663 8.27177 5.09843 9.0158C4.68477 9.44206 4.27056 9.89191 3.92791 10.3489V10.3502C3.89555 10.3917 3.87578 10.4432 3.87578 10.5004C3.87578 10.5573 3.89555 10.609 3.92791 10.6503V10.6532Z" fill="white"/>
                </g>
                <defs>
                  <radialGradient id="paint0_radial_9718_1148" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 1.19209e-06) rotate(135) scale(28.2843)">
                    <stop stopColor="#28BBBB"/>
                    <stop offset="1" stopColor="#B627A1"/>
                  </radialGradient>
                  <clipPath id="clip0_9718_1148">
                    <rect width="16" height="7" fill="white" transform="translate(2 7)"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="text-sm sidebar-text">Mira Studio</span>
              <span className="ml-auto bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded sidebar-badge">New</span>
            </div>
            <span className="tooltip-text">Mira Studio</span>

            <div className="border-t border-gray-200 mt-4 pt-4" />

            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${currentPage === 'first-time-ux' ? 'bg-teal-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
              style={{marginTop: '4px'}}
              onClick={handleNavigateToFirstTimeUX}
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm sidebar-text">First Time UX</span>
              <span className="tooltip-text">First Time UX</span>
            </div>

            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${currentPage === 'insights-version' ? 'bg-teal-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
              style={{marginTop: '4px'}}
              onClick={handleNavigateToInsightsVersion}
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm sidebar-text">Insights Version</span>
              <span className="tooltip-text">Insights Version</span>
            </div>
          </div>
          

        </nav>
        
        <div className="p-4 text-xs text-gray-500 sidebar-footer">
          <div>© 2026 Meltwater</div>
          <div className="mt-1">Copyright • Privacy • X TOS •</div>
          <div>YouTube TOS</div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto transition-all duration-300" style={{marginLeft: '0px'}}>
        <main className="flex-1">
          {/* Decorative Header Section - Full Width */}
          <div className="w-full bg-white relative border-b border-gray-200" style={{height: `${98 + miraFieldHeight + (miraSearchValue ? 40 : 0)}px`, overflow: 'visible', zIndex: 40, transition: 'height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'}}>
            {/* Decorative mask layer — clips shapes to header bounds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Top left teal circle */}
              <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full" style={{background: 'rgba(232, 247, 247, 0.6)'}}></div>
              {/* Bottom left lighter teal shape */}
              <div className="absolute left-0 bottom-0 w-80 h-40 rounded-tr-full" style={{background: 'rgba(232, 247, 247, 0.4)'}}></div>
              {/* Top right pink/purple rounded rectangle */}
              <div className="absolute -right-2 -top-12 w-72 h-20 rounded-3xl" style={{background: 'rgba(248, 232, 246, 0.7)'}}></div>
            </div>

            {/* Content - expands header as textarea grows */}
            <div className="relative flex flex-col items-center justify-center px-6" style={{zIndex: 50, paddingTop: '49px', paddingBottom: '49px'}}>
              <div className="relative w-3/5" data-mira-search>
                {/* Bordered field container */}
                <div className="rounded-lg relative" style={{
                  transition: 'background 0.2s',
                  background: miraSearchOpen
                    ? 'linear-gradient(white, white) padding-box, linear-gradient(to right, #B02E9C, #177E80) border-box'
                    : 'linear-gradient(white, white) padding-box, linear-gradient(to right, #D1D5DB, #D1D5DB) border-box',
                  border: '1.5px solid transparent',
                }}>
                  <svg className="absolute left-4 top-[16px] w-5 h-5 pointer-events-none" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="20" height="20" rx="10" fill="url(#mira_search_grad)"/>
                      <g clipPath="url(#mira_search_clip)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.0158 7.11438C11.8413 7.11438 13.3214 8.63006 13.3214 10.5009C13.3214 12.3716 11.8413 13.8876 10.0158 13.8876C8.18985 13.8876 6.71065 12.3716 6.71065 10.5009C6.71065 8.63006 8.18985 7.11438 10.0158 7.11438ZM10.0158 11.9525C10.7982 11.9525 11.4326 11.303 11.4326 10.5009C11.4326 9.69922 10.7982 9.0497 10.0158 9.0497C9.23308 9.0497 8.59973 9.69922 8.59973 10.5009C8.59973 11.303 9.23308 11.9525 10.0158 11.9525ZM16.1039 10.6532C15.7611 11.1101 15.3472 11.5601 14.9336 11.9864C14.215 12.7304 13.4003 13.3805 12.58 13.8876H14.983C16.2271 12.9684 17.326 11.7346 18.0428 10.5009C17.326 9.26762 16.2271 8.03377 14.983 7.11438H12.58C13.4003 7.62151 14.215 8.27177 14.9336 9.0158C15.3472 9.44206 15.7611 9.89191 16.1039 10.3489V10.3502C16.1363 10.3917 16.1562 10.4432 16.1562 10.5004C16.1562 10.5573 16.1363 10.609 16.1039 10.6503V10.6532ZM3.92791 10.6532C4.27056 11.1101 4.68477 11.5601 5.09843 11.9864C5.81663 12.7304 6.63173 13.3805 7.45205 13.8876H5.04899C3.80477 12.9684 2.70562 11.7346 1.98922 10.5009C2.70562 9.26762 3.80477 8.03377 5.04899 7.11438H7.45205C6.63173 7.62151 5.81663 8.27177 5.09843 9.0158C4.68477 9.44206 4.27056 9.89191 3.92791 10.3489V10.3502C3.89555 10.3917 3.87578 10.4432 3.87578 10.5004C3.87578 10.5573 3.89555 10.609 3.92791 10.6503V10.6532Z" fill="white"/>
                      </g>
                      <defs>
                        <radialGradient id="mira_search_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 1.19209e-06) rotate(135) scale(28.2843)">
                          <stop stopColor="#28BBBB"/>
                          <stop offset="1" stopColor="#B627A1"/>
                        </radialGradient>
                        <clipPath id="mira_search_clip">
                          <rect width="16" height="7" fill="white" transform="translate(2 7)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  <textarea
                    ref={miraTextareaRef}
                    rows={1}
                    value={miraSearchValue}
                    onChange={e => setMiraSearchValue(e.target.value)}
                    onFocus={() => { if (suppressMiraOpenRef.current) { suppressMiraOpenRef.current = false; return; } if (!miraSearchValue) setMiraSearchOpen(true); }}
                    onClick={e => { if (!miraSearchValue) setMiraSearchOpen(true); miraCursorRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd }; }}
                    onSelect={e => { miraCursorRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd }; }}
                    onBlur={e => { miraCursorRef.current = { start: e.target.selectionStart, end: e.target.selectionEnd }; }}
                    placeholder="Hello, I'm Mira, I can help with quick things like creating a search, report, or an alert..."
                    className="w-full pl-12 pr-4 pb-3 focus:outline-none resize-none overflow-hidden bg-transparent"
                    style={{lineHeight: '1.5', minHeight: '50px', height: `${miraFieldHeight}px`, transition: 'height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)', paddingTop: '15px'}}
                  />
                  {/* Toolbar inside the field */}
                  <div style={{
                    overflow: addSearchOpen ? 'visible' : 'hidden',
                    maxHeight: addSearchOpen ? 'none' : miraSearchValue ? '55px' : '0px',
                    marginTop: '-6px',
                    opacity: miraSearchValue ? 1 : 0,
                    transition: 'max-height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out',
                  }}>
                    <div className="flex items-center justify-between px-3 pt-1" style={{paddingLeft: '48px', paddingBottom: '23px'}}>
                      <div className="flex items-center gap-2">
                        <div className="relative" data-add-search>
                          <button
                            className="flex items-center gap-1.5 px-3 py-1 border border-gray-300 text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                            style={{borderRadius: '2px'}}
                            onClick={() => { setAddSearchOpen(prev => !prev); setAddSearchFilter(''); setMiraSearchOpen(false); }}
                          >
                            Add A Search
                          </button>
                          {addSearchOpen && (() => {
                            const teslaSearches = ['Tesla Brand', 'Cybertruck', 'Elon Musk', 'Space X', 'Model S', 'Model Y', 'DOGE', 'Robotaxi', 'FSD Beta', 'Tesla Energy', 'Model 3'];
                            const filtered = teslaSearches.filter(s => s.toLowerCase().includes(addSearchFilter.toLowerCase()));
                            const visible = filtered.slice(0, 5);
                            const remaining = filtered.length - visible.length;
                            return (
                              <div className="absolute left-0 bg-white rounded-xl shadow-xl border border-gray-200" style={{top: 'calc(100% + 6px)', width: '300px', zIndex: 10001}}>
                                <div className="px-3 pt-3 pb-2">
                                  <div className="flex items-center gap-2 px-2 py-1.5">
                                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                      type="text"
                                      placeholder="Enter Search name"
                                      value={addSearchFilter}
                                      onChange={e => setAddSearchFilter(e.target.value)}
                                      onClick={e => e.stopPropagation()}
                                      className="flex-1 text-sm outline-none bg-transparent"
                                      autoFocus
                                    />
                                  </div>
                                </div>
                                <div className="border-b border-gray-200" />
                                <div className="px-4 pt-3 pb-1">
                                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Standard Searches</p>
                                </div>
                                {visible.map(name => (
                                  <button
                                    key={name}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                                    onClick={() => {
                                      const cursor = miraCursorRef.current;
                                      const pos = cursor ? cursor.start : miraSearchValue.length;
                                      const end = cursor ? cursor.end : miraSearchValue.length;
                                      const newVal = miraSearchValue.slice(0, pos) + name + miraSearchValue.slice(end);
                                      setMiraSearchValue(newVal);
                                      setAddSearchOpen(false);
                                      setAddSearchFilter('');
                                      setMiraSearchOpen(false);
                                      suppressMiraOpenRef.current = true;
                                      requestAnimationFrame(() => {
                                        const ta = miraTextareaRef.current;
                                        if (ta) { const newPos = pos + name.length; ta.selectionStart = newPos; ta.selectionEnd = newPos; ta.focus(); }
                                      });
                                    }}
                                  >
                                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-800">{name}</span>
                                  </button>
                                ))}
                                {remaining > 0 && (
                                  <>
                                    <div className="border-t border-gray-200" />
                                    <button className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                      <ChevronDown className="w-4 h-4" />
                                      Show {remaining} More
                                    </button>
                                  </>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                        <button className="hover:bg-gray-100 rounded-full transition-colors" style={{marginLeft: '5px', padding: '10.5px'}}>
                          <Calendar className="w-4 h-4 text-gray-900" />
                        </button>
                      </div>
                      <button className="rounded-full flex items-center justify-center transition-colors hover:opacity-90" style={{backgroundColor: '#15827F', width: '35.6px', height: '35.6px', marginRight: '3px'}}>
                        <ArrowUp className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                {miraSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden" style={{zIndex: 9999, padding: '10px'}}>
                    <div className="px-4 pt-3 pb-1">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Suggested Mira Prompts</p>
                    </div>
                    {[
                      { Icon: Briefcase,  label: 'Prepare executives for media interviews with comprehensive briefings on journalists and topics', body: "Create a media brief for [person of interest] and [journalist] to discuss [topic]" },
                      { Icon: FileText,   label: 'Get a comprehensive report on your media coverage, including reach, sentiment, and key themes', body: "Give me a coverage report for [Brand], over [time period]" },
                      { Icon: Bell,       label: 'Create a concise briefing on the latest news about your brand, industry, or topics of interest to share with your team or executives', body: "Give me a news briefing for [Topic], over [time period]" },
                      { Icon: Users,      label: 'Track where your press releases appear across news and social media channels', body: "Create an impact report for this press release: [Insert press release URL]" },
                      { Icon: TrendingUp, label: 'Generate a summary of the latest news and trends in your industry to stay informed and ahead of the curve', body: "Give me an industry roundup for [Industry], over [time period]" },
                    ].map(({ Icon, label, body }, idx) => (
                      <button
                        key={idx}
                        className="w-full flex items-center gap-3 hover:bg-gray-50 transition-colors text-left" style={{paddingTop: '8.3px', paddingBottom: '8.3px', paddingLeft: '26px', paddingRight: '26px', marginLeft: '-10px', marginRight: '-10px', width: 'calc(100% + 20px)'}}
                        onMouseDown={e => {
                          e.preventDefault();
                          setMiraSearchValue(body);
                          setMiraSearchOpen(false);
                        }}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#EEECF5'}}>
                          <Icon className="w-5 h-5" style={{color: '#7B4CA0', strokeWidth: 1.75}} />
                        </div>
                        <span className="text-sm text-gray-800">{label}</span>
                      </button>
                    ))}
                    <div className="border-t border-gray-200 mt-1" style={{marginLeft: '-10px', marginRight: '-10px'}} />
                    <div className="px-4 pt-3 pb-1">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Create a search</p>
                    </div>
                    {[
                      { Icon: Search,   label: 'Create brand search' },
                      { Icon: Target,   label: 'Create industry search' },
                      { Icon: FileText, label: 'Brief me on a topic' },
                    ].map(({ Icon, label }, idx) => (
                      <button
                        key={idx}
                        className="w-full flex items-center gap-3 px-4 hover:bg-gray-50 transition-colors text-left"
                        style={{paddingTop: '8.3px', paddingBottom: '8.3px'}}
                        onMouseDown={e => {
                          e.preventDefault();
                          setMiraSearchValue(label);
                          setMiraSearchOpen(false);
                        }}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#EEECF5'}}>
                          <Icon className="w-5 h-5" style={{color: '#7B4CA0', strokeWidth: 1.75}} />
                        </div>
                        <span className="text-sm text-gray-800">{label}</span>
                      </button>
                    ))}
                    <div className="h-2" />
                  </div>
                )}
              </div>

            </div>
          </div>
          
          {/* Conditional Content Based on Current Page */}
          {(currentPage === 'homepage' || currentPage === 'first-time-ux' || currentPage === 'insights-version') ? (
          <div className="max-w-7xl mx-auto px-6 py-8">

            {/* Greeting Row */}
            <div className="flex justify-center mb-6">
              <h1 className="text-3xl font-bold" style={{fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700}}>{currentPage === 'first-time-ux' ? "Welcome to Meltwater, John! Let's get started." : "Welcome back John! Here's what's happening today..."}</h1>
            </div>

            {/* 2x2 Modules Grid */}
            <div className="grid grid-cols-2 gap-7">

              {/* Card 1: Recent Emerging Insight */}
              <div className="bg-white rounded border border-gray-200 shadow-sm p-5 flex flex-col h-[474px]" draggable={true} onDragStart={(e) => handleModuleDragStart(e, 0)} onDragOver={(e) => handleModuleDragOver(e, 0)} onDrop={(e) => handleModuleDrop(e, 0)} onDragEnd={handleModuleDragEnd} style={{order: moduleOrder.indexOf(0), opacity: draggedModuleIdx === 0 ? 0.5 : 1, outline: dragOverModuleIdx === 0 && draggedModuleIdx !== 0 ? '2px dashed #2A9E9F' : 'none', outlineOffset: '3px', transition: 'opacity 0.15s ease'}}>
                <div className="flex items-center justify-between mb-3 module-drag-handle">
                  <h2 className="text-base font-bold">{currentPage === 'insights-version' ? 'Emerging Insights' : 'Recent Emerging Insight'}</h2>
                  <div className="relative" data-emerging-insights-menu>
                    <button
                      className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full transition-[background-color,box-shadow] duration-75 cursor-pointer"
                      onClick={() => setEmergingInsightsMenuOpen(prev => !prev)}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-900" />
                    </button>
                    {emergingInsightsMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3" onClick={() => setEmergingInsightsMenuOpen(false)}>
                          <Plus className="w-4 h-4 text-gray-600" />
                          <span>Add To Dashboard</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3" onClick={() => setEmergingInsightsMenuOpen(false)}>
                          <Bell className="w-4 h-4 text-gray-600" />
                          <span>Create Alert</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3" onClick={() => setEmergingInsightsMenuOpen(false)}>
                          <Download className="w-4 h-4 text-gray-600" />
                          <span>CSV Download</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3" onClick={() => setEmergingInsightsMenuOpen(false)}>
                          <Edit className="w-4 h-4 text-gray-600" />
                          <span>Edit Widget</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Slides wrapper — sliding track */}
                <div style={{position:'relative', flex:1, minHeight:0, overflow:'hidden'}}>

                  {/* Slide 0: Area Chart */}
                  <div style={{
                    position:'absolute', top:0, left:0, right:0, bottom:0,
                    display:'flex', flexDirection:'column',
                    transform: currentPage === 'insights-version' ? `translateX(${(0 - emergingSlide) * 100}%)` : 'none',
                    transition: currentPage === 'insights-version' ? 'transform 0.45s cubic-bezier(0.0, 0.0, 0.2, 1.0)' : 'none',
                  }}>
                    <div className="rounded-lg px-3 pt-3 pb-[17px] mb-[11px]" style={{background: 'linear-gradient(135deg, rgba(237,228,255,0.55) 0%, rgba(228,244,255,0.55) 100%)', border: '1px solid rgba(180,160,220,0.25)'}}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <AIIcon gradientId="paint0_linear_ai_modules1" />
                        <span className="font-semibold" style={{color: '#7B4CA0', fontSize:'14px'}}>AI Insight: Tesla Cybercore tech now in the media</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed" style={{fontSize:'14px'}}>
                        We noticed increasing mentions in this past week on Tesla's <strong>cybercore battery</strong> technology announcement, peaking at 60k. Mentions decline to normal levels again at end of week.
                      </p>
                    </div>
                    <div className="mb-1">
                      <svg viewBox="0 0 645 238" className="w-full" style={{height: '223px'}}>
                        <defs>
                          <linearGradient id="emeringAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E0EFFB" stopOpacity="1"/>
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>
                          </linearGradient>
                        </defs>
                        <g transform="translate(0,25)">
                          <text x="32" y="23" textAnchor="end" fontSize="12.5" fill="#111827">60K</text>
                          <text x="32" y="75" textAnchor="end" fontSize="12.5" fill="#111827">40K</text>
                          <text x="32" y="126" textAnchor="end" fontSize="12.5" fill="#111827">20K</text>
                          <text x="32" y="178" textAnchor="end" fontSize="12.5" fill="#111827">0</text>
                          <line x1="40" y1="20" x2="625" y2="20" stroke="#EAEAEA" strokeWidth="0.75"/>
                          <line x1="40" y1="72" x2="625" y2="72" stroke="#EAEAEA" strokeWidth="0.75"/>
                          <line x1="40" y1="123" x2="625" y2="123" stroke="#EAEAEA" strokeWidth="0.75"/>
                          <line x1="40" y1="175" x2="625" y2="175" stroke="#EAEAEA" strokeWidth="0.75"/>
                          <path d="M42,123 L139,125 L187,110 L236,114 L333,20 L430,108 L527,101 L625,130 L625,175 L42,175 Z" fill="url(#emeringAreaGrad)"/>
                          <polyline points="42,123 139,125 187,110 236,114 333,20 430,108 527,101 625,130" fill="none" stroke="#3C94E3" strokeWidth="2.75" strokeLinejoin="round" strokeLinecap="round"/>
                          <circle cx="333" cy="-8" r="16.1" fill="#1E9BE0"/>
                          <path transform="translate(333,-8) scale(1.24)" d="M0,-5.5 C-3.5,-5.5 -5.5,-3 -5.5,-0.5 C-5.5,1.8 -4,3.5 -2.2,4.2 L-2,5 L2,5 L2.2,4.2 C4,3.5 5.5,1.8 5.5,-0.5 C5.5,-3 3.5,-5.5 0,-5.5 Z" fill="white"/>
                          <line transform="translate(333,-8) scale(1.24)" x1="-2" y1="5.8" x2="2" y2="5.8" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                          <line transform="translate(333,-8) scale(1.24)" x1="-1.4" y1="7.2" x2="1.4" y2="7.2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                          <text x="42"  y="198" textAnchor="middle" fontSize="12.5" fill="#111827">Apr 6</text>
                          <text x="139" y="198" textAnchor="middle" fontSize="12.5" fill="#111827">Apr 7</text>
                          <text x="236" y="198" textAnchor="middle" fontSize="12.5" fill="#111827">Apr 8</text>
                          <text x="333" y="198" textAnchor="middle" fontSize="12.5" fill="#111827">Apr 9</text>
                          <text x="430" y="198" textAnchor="middle" fontSize="12.5" fill="#111827">Apr 10</text>
                          <text x="527" y="198" textAnchor="middle" fontSize="12.5" fill="#111827">Apr 11</text>
                          <text x="625" y="198" textAnchor="middle" fontSize="12.5" fill="#111827">Apr 12</text>
                        </g>
                      </svg>
                    </div>
                    {currentPage !== 'insights-version' && (
                      <div className="pt-3" style={{marginTop: '-21px'}}>
                        <div className="flex gap-2">
                          <button className="emerging-action-btn flex-1 py-2 px-1 border border-teal-600 text-teal-700 transition-colors" style={{fontSize:'14px', fontFamily:'Helvetica, Arial, sans-serif', fontWeight:700, borderRadius:'2px'}} onClick={handleExpandInsight}>Explore Insight</button>
                          <button className="emerging-action-btn flex-1 py-2 px-1 border border-teal-600 text-teal-700 transition-colors" style={{fontSize:'14px', fontFamily:'Helvetica, Arial, sans-serif', fontWeight:700, borderRadius:'2px'}} onClick={handleCreateSpikeAlert}>Create Spike Alert</button>
                          <button className="emerging-action-btn flex-1 py-2 px-1 border border-teal-600 text-teal-700 transition-colors" style={{fontSize:'14px', fontFamily:'Helvetica, Arial, sans-serif', fontWeight:700, borderRadius:'2px'}} onClick={handleSeeJournalists}>Driving Journalists</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Slide 1: Sentiment Trend */}
                  {currentPage === 'insights-version' && (
                    <div style={{
                      position:'absolute', top:0, left:0, right:0, bottom:0,
                      display:'flex', flexDirection:'column', overflow:'hidden',
                      transform:`translateX(${(1 - emergingSlide) * 100}%)`,
                      transition:'transform 0.45s cubic-bezier(0.0, 0.0, 0.2, 1.0)',
                    }}>
                      <div className="rounded-lg px-3 pt-3 pb-[13px] mb-[8px]" style={{background:'linear-gradient(135deg, rgba(237,228,255,0.55) 0%, rgba(228,244,255,0.55) 100%)',border:'1px solid rgba(180,160,220,0.25)',flexShrink:0}}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <AIIcon gradientId="paint0_linear_ai_slide1" />
                          <span className="font-semibold" style={{color:'#7B4CA0',fontSize:'14px'}}>AI Insight: Sentiment shifts after Cybercore announcement</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed" style={{fontSize:'13px'}}>Positive sentiment spiked to 30% of mentions in the week of Mar 21–31, driven by coverage of Tesla's battery efficiency claims. Negative sentiment remained elevated at 15% through Apr 10.</p>
                      </div>
                      <div className="flex items-center justify-center gap-4 mb-2 flex-wrap" style={{marginTop:'5px'}}>
                        {[['#9CA3AF','Neutral'],['#22C55E','Positive'],['#EF4444','Negative'],['#3B82F6','Not Rated']].map(([c,l])=>(
                          <span key={l} className="flex items-center gap-1 text-xs text-gray-600">
                            <span style={{width:9,height:9,borderRadius:'50%',background:c,display:'inline-block',flexShrink:0}}></span>{l}
                          </span>
                        ))}
                      </div>
                      <div style={{flex:1, minHeight:0, position:'relative'}}>
                        <svg viewBox="0 0 620 230" preserveAspectRatio="xMidYMin meet" style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}>
                          {['350K','300K','250K','200K','150K','100K','50K','0'].map((l,i)=>(
                            <text key={i} x="18" y={12+i*28} textAnchor="end" fontSize="13" fill="#111827">{l}</text>
                          ))}
                          {[12,40,68,96,124,152,180,208].map((y,i)=>(
                            <line key={i} x1="42" y1={y} x2="618" y2={y} stroke="#F3F4F6" strokeWidth="1"/>
                          ))}
                          {[[120,40,35,0],[100,50,30,0],[150,45,40,0],[200,60,50,5],[180,55,45,0],[140,35,30,0],[90,25,20,0]].map(([n,p,neg,nr],i)=>{
                            const sc=196/350, x=44+i*83, w=70, bot=208;
                            const negH=neg*sc, pxNeg=bot-negH;
                            const posH=p*sc, pxPos=pxNeg-posH;
                            const neuH=n*sc, pxNeu=pxPos-neuH;
                            const nrH=nr*sc, pxNr=pxNeu-nrH;
                            return(<g key={i}>
                              <rect x={x} y={pxNeu} width={w} height={neuH} fill="#9CA3AF"/>
                              <rect x={x} y={pxPos} width={w} height={posH} fill="#22C55E"/>
                              <rect x={x} y={pxNeg} width={w} height={negH} fill="#EF4444"/>
                              {nr>0&&<rect x={x} y={pxNr} width={w} height={nrH} fill="#3B82F6"/>}
                            </g>);
                          })}
                          {['Apr 13','Apr 14','Apr 15','Apr 16','Apr 17','Apr 18','Apr 19'].map((l,i)=>(
                            <text key={i} x={79+i*83} y={224} textAnchor="middle" fontSize="12" fill="#111827">{l}</text>
                          ))}
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Slide 2: Word Cloud */}
                  {currentPage === 'insights-version' && (
                    <div style={{
                      position:'absolute', top:0, left:0, right:0, bottom:0,
                      display:'flex', flexDirection:'column', overflow:'hidden',
                      transform:`translateX(${(2 - emergingSlide) * 100}%)`,
                      transition:'transform 0.45s cubic-bezier(0.0, 0.0, 0.2, 1.0)',
                    }}>
                      <div className="rounded-lg px-3 pt-3 pb-[13px] mb-[8px]" style={{background:'linear-gradient(135deg, rgba(237,228,255,0.55) 0%, rgba(228,244,255,0.55) 100%)',border:'1px solid rgba(180,160,220,0.25)',flexShrink:0}}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <AIIcon gradientId="paint0_linear_ai_slide2" />
                          <span className="font-semibold" style={{color:'#7B4CA0',fontSize:'14px'}}>AI Insight: "Elon Musk" dominates Tesla conversation</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed" style={{fontSize:'13px'}}>Over 40% of Tesla mentions this month also referenced Elon Musk personally. "Cybertruck" and "Model Y" are the top product keywords, while "China" and "Trump" reflect geopolitical coverage.</p>
                      </div>
                      <div className="flex-1 relative overflow-hidden" style={{minHeight:0, transform:'translate(55px, 20px) scaleX(1.2) scaleY(1.3)', transformOrigin:'center center'}}>
                        {[
                          {word:'elon musk',size:32,x:'30%',y:'46%',w:700},
                          {word:'tesla',size:22,x:'33%',y:'24%',w:700},
                          {word:'@elonmusk',size:15,x:'60%',y:'38%',w:400},
                          {word:'twitter',size:15,x:'48%',y:'31%',w:400},
                          {word:'spacex',size:14,x:'62%',y:'26%',w:400},
                          {word:'united states',size:12,x:'8%',y:'57%',w:400},
                          {word:'@tesla',size:12,x:'24%',y:'65%',w:400},
                          {word:'cybertruck',size:13,x:'48%',y:'62%',w:400},
                          {word:'model y',size:12,x:'38%',y:'70%',w:400},
                          {word:'openai',size:13,x:'22%',y:'33%',w:400},
                          {word:'china',size:12,x:'30%',y:'57%',w:400},
                          {word:'america',size:12,x:'16%',y:'22%',w:400},
                          {word:'europe',size:11,x:'9%',y:'46%',w:400},
                          {word:'iran',size:11,x:'22%',y:'41%',w:400},
                          {word:'xai',size:13,x:'36%',y:'49%',w:400},
                          {word:'starlink',size:11,x:'66%',y:'49%',w:400},
                          {word:'texas',size:11,x:'78%',y:'42%',w:400},
                          {word:'trump',size:12,x:'64%',y:'60%',w:400},
                          {word:'grok',size:11,x:'70%',y:'66%',w:400},
                          {word:'earth',size:11,x:'79%',y:'64%',w:400},
                          {word:'south africa',size:12,x:'54%',y:'17%',w:400},
                          {word:'california',size:11,x:'75%',y:'23%',w:400},
                          {word:'elon',size:13,x:'40%',y:'19%',w:400},
                          {word:'us',size:12,x:'56%',y:'26%',w:400},
                          {word:'american',size:12,x:'38%',y:'64%',w:400},
                          {word:'major',size:11,x:'57%',y:'68%',w:400},
                        ].map(({word,size,x,y,w},i)=>(
                          <span key={i} style={{position:'absolute',left:x,top:y,fontSize:size,fontWeight:w,color:'#29AEFF',whiteSpace:'nowrap',transform:'translate(-50%,-50%)',lineHeight:1.2}}>{word}</span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>{/* end slides wrapper */}

                {currentPage === 'insights-version' && (
                  <div className="flex items-center justify-between px-2 py-3 border-t border-gray-100" style={{position: "relative", top: "17px"}}>
                    <button onClick={() => setEmergingSlide(s => (s - 1 + totalEmergingSlides) % totalEmergingSlides)} className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-500 rotate-180" />
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalEmergingSlides }).map((_, i) => (
                        <button key={i} onClick={() => setEmergingSlide(i)} className="rounded-full border-none p-0 cursor-pointer transition-all" style={{ width: i === emergingSlide ? 10 : 8, height: i === emergingSlide ? 10 : 8, background: i === emergingSlide ? '#0D9488' : '#D1D5DB' }} />
                      ))}
                    </div>
                    <button onClick={() => setEmergingSlide(s => (s + 1) % totalEmergingSlides)} className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card 2: My Searches */}
              <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col h-[474px]" draggable={true} onDragStart={(e) => handleModuleDragStart(e, 1)} onDragOver={(e) => handleModuleDragOver(e, 1)} onDrop={(e) => handleModuleDrop(e, 1)} onDragEnd={handleModuleDragEnd} style={{order: currentPage === 'insights-version' ? moduleOrder.indexOf(2) : moduleOrder.indexOf(1), opacity: draggedModuleIdx === 1 ? 0.5 : 1, outline: dragOverModuleIdx === 1 && draggedModuleIdx !== 1 ? '2px dashed #2A9E9F' : 'none', outlineOffset: '3px', transition: 'opacity 0.15s ease'}}>
                <div className="px-5 pt-5 pb-4 flex items-center justify-between module-drag-handle">
                  <h2 className="text-base font-bold">Recent Searches</h2>
                  <div className="flex items-center text-gray-900" style={{gap:'13px'}}>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full hover:text-black transition-[background-color,box-shadow] duration-75 transition-colors"><Plus className="w-4 h-4" /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Create Search</span>
                    </div>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full hover:text-black transition-[background-color,box-shadow] duration-75 transition-colors"><Search className="w-4 h-4" /></button>
                      <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Lookup searches</span>
                    </div>
                  </div>
                </div>
                <div className="px-5 grid grid-cols-[160px_180px_1fr] pb-2 text-xs font-semibold text-gray-700">
                  <span>Name</span>
                  <span style={{paddingLeft: '30px'}}>Mentions Trend</span>
                  <span style={{paddingLeft: '15px'}}>Last edited <span className="text-gray-500">↓</span></span>
                </div>
                <div className="border-b border-gray-200" />
                <div className="flex-1 min-h-0 overflow-y-auto px-5 flex flex-col">
                  {[
                    { name: 'Tesla Brand',   trend: 'green', points: '0,21 9,19 18,22 27,18 36,20 44,16 53,18 62,14 71,15 79,12 88,14 97,10 106,8 114,11 123,7 132,5' },
                    { name: 'Cybertruck',    trend: 'green', points: '0,23 9,18 18,24 27,15 36,21 44,13 53,19 62,10 71,16 79,8 88,14 97,6 106,9 114,4 123,7 132,3' },
                    { name: 'Elon Musk',     trend: 'red',   points: '0,6 9,8 18,5 27,10 36,8 44,12 53,10 62,14 71,13 79,16 88,15 97,18 106,17 114,15 123,19 132,22' },
                    { name: 'Space X',       trend: 'red',   points: '0,5 9,9 18,4 27,12 36,7 44,15 53,10 62,18 71,12 79,20 88,14 97,22 106,18 114,23 123,20 132,25' },
                    { name: 'Model S',       trend: 'green', points: '0,22 9,21 18,22 27,20 36,19 44,18 53,16 62,15 71,14 79,13 88,11 97,9 106,7 114,8 123,6 132,4' },
                    { name: 'Model Y',       trend: 'green', points: '0,20 9,17 18,14 27,19 36,11 44,16 53,8 62,13 71,6 79,11 88,4 97,9 106,5 114,8 123,4 132,2' },
                    { name: 'DOGE',          trend: 'red',   points: '0,8 9,6 18,10 27,8 36,13 44,11 53,15 62,14 71,17 79,16 88,18 97,19 106,20 114,18 123,21 132,23' },
                    { name: 'Robotaxi',      trend: 'green', points: '0,23 9,22 18,23 27,21 36,22 44,20 53,18 62,15 71,12 79,9 88,7 97,5 106,4 114,6 123,3 132,2' },
                    { name: 'FSD Beta',      trend: 'green', points: '0,21 9,23 18,19 27,22 36,17 44,20 53,15 62,17 71,13 79,15 88,10 97,12 106,8 114,10 123,6 132,5' },
                    { name: 'Tesla Energy',  trend: 'red',   points: '0,7 9,9 18,6 27,11 36,9 44,13 53,12 62,15 71,14 79,17 88,16 97,19 106,18 114,20 123,19 132,22' },
                    { name: 'Model 3',       trend: 'green', points: '0,22 9,19 18,21 27,16 36,18 44,21 53,15 62,18 71,12 79,16 88,9 97,13 106,7 114,10 123,5 132,3' },
                  ].slice(0, currentPage === 'first-time-ux' ? 2 : 11).map((item, i) => (
                    <div key={i} className="grid grid-cols-[160px_180px_1fr] border-b border-gray-200 items-center rounded" style={{paddingTop:'17.5px', paddingBottom:'17.5px', marginLeft:'-20px', marginRight:'-20px', paddingLeft:'20px', paddingRight:'20px'}}>
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-teal-700 cursor-pointer hover:underline">{item.name}</span>
                      </div>
                      <div className="flex justify-start" style={{paddingLeft: '30px'}}>
                        {item.trend === 'green' ? (
                          <svg viewBox="0 0 132 28" className="w-[110px] h-6">
                            <defs>
                              <linearGradient id={`sg${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.35"/>
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            <path d={`M${item.points.split(' ').join(' L')} L132,28 L0,28 Z`} fill={`url(#sg${i})`}/>
                            <polyline points={item.points} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 132 28" className="w-[110px] h-6">
                            <defs>
                              <linearGradient id={`sr${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35"/>
                                <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            <path d={`M${item.points.split(' ').join(' L')} L132,28 L0,28 Z`} fill={`url(#sr${i})`}/>
                            <polyline points={item.points} fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-500" style={{paddingLeft: '15px'}}>{currentPage === 'first-time-ux' ? 'Just now' : '8/13/05 - 10:16 AM'}</span>
                    </div>
                  ))}
                  {currentPage === 'first-time-ux' && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2" style={{width: '80%'}}>
                        <img src={searchIllustration} alt="" style={{width: '121px', height: '121px', flexShrink: 0, marginRight: '15px'}} />
                        <div>
                          <span className="text-sm text-gray-500">Based on your brand, we created sample searches to get started with. Use these searches to build alerts and dashboards.</span>
                          <div className="mt-3">
                            <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 transition-colors">Create New Search</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-5 border-t border-gray-200 flex justify-center" style={{paddingTop:'18px', paddingBottom:'12px'}}>
                  <button className="flex items-center gap-1 text-teal-700 text-sm font-bold hover:text-teal-800" style={{position:'relative', top:'-2px'}}>
                    All Searches <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3: My Dashboards */}
              <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col h-[474px]" draggable={true} onDragStart={(e) => handleModuleDragStart(e, 2)} onDragOver={(e) => handleModuleDragOver(e, 2)} onDrop={(e) => handleModuleDrop(e, 2)} onDragEnd={handleModuleDragEnd} style={{order: currentPage === 'insights-version' ? moduleOrder.indexOf(1) : moduleOrder.indexOf(2), opacity: draggedModuleIdx === 2 ? 0.5 : 1, outline: dragOverModuleIdx === 2 && draggedModuleIdx !== 2 ? '2px dashed #2A9E9F' : 'none', outlineOffset: '3px', transition: 'opacity 0.15s ease'}}>
                <div className="px-5 pt-5 pb-4 flex items-center justify-between module-drag-handle">
                  <h2 className="text-base font-bold">Recent Dashboards</h2>
                  <div className="flex items-center text-gray-900" style={{gap:'13px'}}>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full hover:text-black transition-[background-color,box-shadow] duration-75 transition-colors"><Plus className="w-4 h-4" /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Create Dashboard</span>
                    </div>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full hover:text-black transition-[background-color,box-shadow] duration-75 transition-colors"><Search className="w-4 h-4" /></button>
                      <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Search Dashboards</span>
                    </div>
                  </div>
                </div>
                <div className="px-5 grid grid-cols-[160px_180px_1fr] pb-2 text-xs font-semibold text-gray-700">
                  <span>Name <span className="text-gray-500">↑</span></span>
                  <span className="pl-12">Used in</span>
                  <span>Last edited <span className="text-gray-500">↓</span></span>
                </div>
                <div className="border-b border-gray-200" />
                <div className="flex-1 min-h-0 overflow-y-auto px-5 flex flex-col">
                  {[
                    { name: 'Tesla Brand',      used: '5 places',  edited: 'Oct 13, 2025 - 10:16 AM' },
                    { name: 'Competitors',      used: '2 places',  edited: 'Oct 13, 2025 - 10:16 AM' },
                    { name: 'Crypto Markets',   used: '1 place',   edited: 'Oct 13, 2025 - 10:16 AM' },
                    { name: 'Space X vs Tesla', used: '15 places', edited: 'Oct 13, 2025 - 10:16 AM' },
                    { name: 'Cybertruck Launch',used: '3 places',  edited: 'Oct 11, 2025 - 9:04 AM'  },
                    { name: 'FSD Coverage',     used: '7 places',  edited: 'Oct 10, 2025 - 2:30 PM'  },
                    { name: 'Tesla Recalls',    used: '4 places',  edited: 'Oct 9, 2025 - 11:45 AM'  },
                    { name: 'Elon Media',       used: '9 places',  edited: 'Oct 8, 2025 - 3:15 PM'   },
                    { name: 'Model 3 Launch',   used: '6 places',  edited: 'Oct 7, 2025 - 8:50 AM'   },
                    { name: 'Tesla Energy',     used: '2 places',  edited: 'Oct 6, 2025 - 1:20 PM'   },
                  ].slice(0, currentPage === 'first-time-ux' ? 2 : 10).map((item, i) => (
                    <div key={i} className="grid grid-cols-[160px_180px_1fr] border-b border-gray-200 items-center rounded" style={{paddingTop:'19.5px', paddingBottom:'19.5px', marginLeft:'-20px', marginRight:'-20px', paddingLeft:'20px', paddingRight:'20px'}}>
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-teal-700 cursor-pointer hover:underline">{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 pl-12">{item.used}</span>
                      <span className="text-sm text-gray-500">{currentPage === 'first-time-ux' ? 'Just now' : item.edited}</span>
                    </div>
                  ))}
                  {currentPage === 'first-time-ux' && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2" style={{width: '80%'}}>
                        <img src={dashboardsIllustration} alt="" style={{width: '121px', height: '121px', flexShrink: 0, marginRight: '15px'}} />
                        <div>
                          <span className="text-sm text-gray-500">Based on your brand, we created sample dashboards to get started with. Use these dashboards to track and visualize your data.</span>
                          <div className="mt-3">
                            <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 transition-colors">Create New Dashboard</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-5 border-t border-gray-200 flex justify-center" style={{paddingTop:'18px', paddingBottom:'12px'}}>
                  <button className="flex items-center gap-1 text-teal-700 text-sm font-bold hover:text-teal-800" style={{position:'relative', top:'-2px'}}>
                    All Dashboards <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 4: Alerts */}
              <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col h-[474px]" draggable={true} onDragStart={(e) => handleModuleDragStart(e, 3)} onDragOver={(e) => handleModuleDragOver(e, 3)} onDrop={(e) => handleModuleDrop(e, 3)} onDragEnd={handleModuleDragEnd} style={{order: moduleOrder.indexOf(3), opacity: draggedModuleIdx === 3 ? 0.5 : 1, outline: dragOverModuleIdx === 3 && draggedModuleIdx !== 3 ? '2px dashed #2A9E9F' : 'none', outlineOffset: '3px', transition: 'opacity 0.15s ease'}}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 module-drag-handle">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold">Recent Alerts</h2>
                    <span className="text-sm text-gray-500">{currentPage === 'first-time-ux' ? '(Unread - 1)' : '(Unread - 5)'}</span>
                  </div>
                  <div className="flex items-center text-gray-900" style={{gap:'13px'}}>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full hover:text-black transition-[background-color,box-shadow] duration-75"><Bell className="w-4 h-4" /></button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Create Alert</span>
                    </div>
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full hover:text-black transition-[background-color,box-shadow] duration-75"><Settings className="w-4 h-4" /></button>
                      <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Go To Settings</span>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-gray-100 flex-1 min-h-0 overflow-y-auto flex flex-col">
                  {(currentPage === 'first-time-ux' ? alerts.slice(0, 1) : alerts).map((alert, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50 cursor-pointer border-l-4 border-gray-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-900">Spike Detection</span>
                            <span className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</span>
                          </div>
                          <p className="text-sm text-gray-700">{alert.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {currentPage === 'first-time-ux' && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-2" style={{width: '80%'}}>
                        <img src={alertsIllustration} alt="" style={{width: '121px', height: '121px', flexShrink: 0, marginRight: '15px'}} />
                        <div>
                          <span className="text-sm text-gray-500">Based on your brand, we created sample alerts to get started with. Use these alerts to stay on top of important changes in your media landscape.</span>
                          <div className="mt-3">
                            <button className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 transition-colors">Create New Alert</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-5 border-t border-gray-200 flex justify-center" style={{paddingTop:'18px', paddingBottom:'12px'}}>
                  <button className="flex items-center gap-1 text-teal-700 text-sm font-bold hover:text-teal-800" style={{position:'relative', top:'-2px'}}>
                    All Alerts <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* More From Meltwater + Expert Tips */}
            <div className="mt-8 mb-8 flex gap-7">

              {/* Expert Tips */}
              {(() => {
                const experts = [
                  { name: 'Danny Gardner',  title: 'Brand Monitoring Expert',   initials: 'DG', color: '#0D9488', photo: dannyImg },
                  { name: 'Sarah Chen',     title: 'Social Media Strategist',   initials: 'SC', color: '#0891B2' },
                  { name: 'Marcus Williams',title: 'Media Relations Pro',        initials: 'MW', color: '#0D9488' },
                  { name: 'Priya Patel',    title: 'Competitive Intelligence',  initials: 'PP', color: '#0891B2' },
                ];
                const totalExperts = experts.length;
                const expert = experts[expertSlide];
                return (
                  <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col h-[474px]" style={{width: 'calc(50% - 14px)'}}>
                    <style>{`
                      @keyframes et-fade {
                        from { opacity: 0; }
                        to   { opacity: 1; }
                      }
                    `}</style>

                    {/* Header */}
                    <div className="px-5 pt-5 pb-4 flex items-center justify-between border-b border-gray-200">
                      <h2 className="text-base font-bold">Expert Tips From Meltwater Users</h2>
                    </div>

                    {/* Sliding panel track */}
                    <div style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
                      {experts.map((e, i) => (
                        <div key={i} style={{
                          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                          display: 'flex',
                          transform: `translateX(${(i - expertSlide) * 100}%)`,
                          transition: 'transform 0.45s cubic-bezier(0.0, 0.0, 0.2, 1.0)',
                        }}>

                          {/* Left panel — teal bg */}
                          <div style={{
                            width: 'calc(42% - 65px)', flexShrink: 0,
                            background: '#E0F7F5',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            padding: '28px 16px',
                          }}>
                            <div style={{
                              width: 101, height: 101, borderRadius: '50%',
                              background: e.color,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              marginBottom: 16,
                              boxShadow: '0 4px 14px rgba(13,148,136,0.3)',
                              overflow: 'hidden', flexShrink: 0,
                            }}>
                              {e.photo
                                ? <img src={e.photo} alt={e.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                                : <span style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-1px' }}>{e.initials}</span>
                              }
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: 4 }}>{e.name}</div>
                            <div style={{ fontSize: 11, color: '#555', textAlign: 'center', lineHeight: 1.4 }}>{e.title}</div>
                          </div>

                          {/* Right panel — white */}
                          <div style={{
                            flex: 1,
                            background: 'white',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20px 18px',
                            borderLeft: '1px solid #E5F7F5',
                          }}>
                            <div style={{ fontSize: 23, fontWeight: 800, color: '#0D9488', lineHeight: 1.2, marginBottom: 10, fontFamily: 'Helvetica, Arial, sans-serif' }}>
                              Learn how your peers are using Meltwater
                            </div>
                            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5, marginBottom: 18 }}>
                              Real tips and workflows from people who use it every day.
                            </div>
                            <button style={{
                              background: '#0d9488', color: 'white',
                              border: 'none', borderRadius: 6,
                              padding: '11px 16px', fontSize: 13, fontWeight: 700,
                              cursor: 'pointer', alignSelf: 'flex-start',
                            }}>
                              See {e.name.split(' ')[0]}'s tips
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* Arrows + Dots */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                      <button onClick={() => setExpertSlide(s => (s - 1 + totalExperts) % totalExperts)} className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-gray-500 rotate-180" />
                      </button>
                      <div className="flex gap-2">
                        {Array.from({ length: totalExperts }).map((_, i) => (
                          <button key={i} onClick={() => setExpertSlide(i)} className="rounded-full border-none p-0 cursor-pointer transition-all" style={{ width: i === expertSlide ? 10 : 8, height: i === expertSlide ? 10 : 8, background: i === expertSlide ? '#0D9488' : '#D1D5DB' }} />
                        ))}
                      </div>
                      <button onClick={() => setExpertSlide(s => (s + 1) % totalExperts)} className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* More From Meltwater */}
              {(() => {
                const totalSummitSlides = 4;
                const slides = [
                  {
                    banner: (
                      <div style={{ height: 220, background: 'linear-gradient(to right, #ffffff 0%, #fff5f0 30%, #ffcce8 60%, #f4a0d0 80%, #e87ac0 100%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-start' }}>
                        <div style={{ padding: '24px 28px', zIndex: 2, position: 'relative' }}>
                          <div style={{ marginBottom: 6 }}>
                            <img src={summitLogoImg} alt="Summit" style={{ height: 44, width: 'auto', display: 'block' }} />
                          </div>
                          <div style={{ marginTop: 20 }}>
                            <div style={{ fontSize: 14, color: '#444', marginBottom: 4, fontStyle: 'italic' }}>Here's the goop!</div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: '#111', fontFamily: 'Helvetica, Arial, sans-serif', lineHeight: 1.1, marginBottom: 14 }}>Gwyneth Paltrow</div>
                            <div style={{ display: 'inline-block', background: 'linear-gradient(to right, #FF8C42, #E85AA0)', borderRadius: 999, padding: '6px 18px', fontSize: 13, fontWeight: 700, color: 'white' }}>Keynote Speaker</div>
                          </div>
                        </div>
                        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '52%', overflow: 'hidden' }}>
                          <img src={gwynethImg} alt="Gwyneth Paltrow" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                        </div>
                      </div>
                    ),
                    title: "The future's taking shape. Don't get left behind!",
                    body: "Join us at Meltwater Summit, May 5-6, with keynote Gwyneth Paltrow and the leaders shaping what's next.",
                    cta: 'Register Today',
                  },
                  {
                    banner: (
                      <div style={{ height: 220, background: 'linear-gradient(135deg, #7B3FA0 0%, #9B3BB5 30%, #2A9E9F 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 28 }}>
                        <div style={{ fontSize: 18, color: 'white', fontWeight: 700, marginBottom: 16, textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>Hello, I'm Mira. How can I help you out?</div>
                        <div style={{ background: 'white', borderRadius: 12, padding: '14px 18px', width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                          <span style={{ fontSize: 13, color: '#aaa' }}>Ask me a question...</span>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2A9E9F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                          </div>
                        </div>
                        {/* Mira eye icon */}
                        <div style={{ position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)', width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #7B3FA0, #2A9E9F)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', zIndex: 3 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="white"/><circle cx="12" cy="12" r="1.5" fill="#7B3FA0"/><line x1="6" y1="12" x2="4" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="18" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </div>
                      </div>
                    ),
                    title: 'Meet Mira Studio',
                    body: 'Your AI-powered teammate for faster insights, smarter reporting, and better decisions',
                    cta: 'Try it now!',
                  },
                  {
                    banner: (
                      <div style={{ height: 220, background: '#f8f9fa', position: 'relative', overflow: 'hidden' }}>
                        {/* Simulated data table */}
                        <div style={{ margin: '12px 14px', background: 'white', borderRadius: 8, border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: 10 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ fontWeight: 700, color: '#111', fontSize: 11 }}>Results for week of Jun 23, 2025 (3 results)</span>
                            <div style={{ border: '1px solid #d1d5db', borderRadius: 6, padding: '3px 8px', fontSize: 10, color: '#444', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                              Download CSV
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 55px 50px 80px', gap: 4, borderBottom: '1px solid #f0f0f0', paddingBottom: 4, marginBottom: 4, color: '#888', fontSize: 9, fontWeight: 600 }}>
                            <span>Model</span><span>Prompt</span><span>Date</span><span>Emotion</span><span>Keywords</span>
                          </div>
                          {[
                            { icon: '◯', name: 'Product brand analysis', sub: 'Over the past few months...', date: '07/20', emoji: '😄', tags: ['Product Launch', 'New Release'] },
                            { icon: '✦', name: 'Product brand analysis', sub: 'I found out these results...', date: '07/15', emoji: null, tags: ['Release', '+2'] },
                          ].map((row, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 55px 50px 80px', gap: 4, paddingBottom: 4, alignItems: 'center' }}>
                              <span style={{ fontSize: 16, color: i === 0 ? '#888' : '#4F8EF7' }}>{row.icon}</span>
                              <div><div style={{ fontWeight: 600, fontSize: 10, color: '#111' }}>{row.name}</div><div style={{ color: '#888', fontSize: 9 }}>{row.sub}</div></div>
                              <span style={{ fontSize: 9, color: '#666' }}>{row.date}</span>
                              <span style={{ fontSize: 14 }}>{row.emoji || ''}</span>
                              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>{row.tags.map(t => <span key={t} style={{ background: '#e0f2fe', borderRadius: 4, padding: '1px 5px', fontSize: 8, color: '#0369a1' }}>{t}</span>)}</div>
                            </div>
                          ))}
                        </div>
                        {/* Mira eye icon overlapping bottom */}
                        <div style={{ position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)', width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #7B3FA0, #2A9E9F)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', zIndex: 3 }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="white"/><circle cx="12" cy="12" r="1.5" fill="#7B3FA0"/><line x1="6" y1="12" x2="4" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="18" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </div>
                      </div>
                    ),
                    title: 'GenAI Lens',
                    body: 'Discover what ChatGPT, Gemini, and other AI Assistants say about your brand, products, and competitors.',
                    cta: 'Try it now!',
                  },
                  {
                    banner: (
                      <div style={{ height: 220, background: 'linear-gradient(135deg, #c7f0f0 0%, #d4e8f7 40%, #e8d4f0 100%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Floating UI cards */}
                        <div style={{ position: 'absolute', top: 14, left: 14, background: 'white', borderRadius: 6, padding: '6px 10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: 9, color: '#333', width: 80 }}>
                          <div style={{ height: 6, background: '#e0e0e0', borderRadius: 3, marginBottom: 4 }}/>
                          <div style={{ height: 4, background: '#f0f0f0', borderRadius: 3 }}/>
                        </div>
                        <div style={{ position: 'absolute', top: 14, right: 14, background: 'white', borderRadius: 6, padding: '6px 10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 90 }}>
                          <div style={{ height: 5, background: '#e0e0e0', borderRadius: 3, marginBottom: 3 }}/>
                          <div style={{ height: 4, background: '#f0f0f0', borderRadius: 3, width: '70%' }}/>
                        </div>
                        {/* Person silhouette area */}
                        <div style={{ width: 90, height: 120, borderRadius: '50% 50% 0 0', background: 'linear-gradient(to bottom, #e8a020, #f0b830)', opacity: 0.7 }}/>
                        {/* Kite/diamond logo */}
                        <div style={{ position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)', width: 52, height: 52, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 3 }}>
                          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                            <path d="M16 4L28 16L16 28L4 16Z" fill="url(#kite1)"/>
                            <defs><linearGradient id="kite1" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#2A9E9F"/><stop offset="1" stopColor="#1a7a7a"/></linearGradient></defs>
                          </svg>
                        </div>
                      </div>
                    ),
                    title: 'Influencer Marketing',
                    body: 'All-in-one influencer marketing to discover, vet, collaborate, pay, and measure campaign impact',
                    cta: 'Learn More',
                  },
                ];
                const slide = slides[summitSlide];
                return (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-[474px]" style={{width: 'calc(50% - 14px)'}}>
                    <style>{`
                      @keyframes mfm-fade-up {
                        from { opacity: 0; transform: translateY(10px); }
                        to   { opacity: 1; transform: translateY(0); }
                      }
                      .mfm-text-fade { animation: mfm-fade-up 0.4s cubic-bezier(0.0, 0.0, 0.2, 1.0) both; }
                    `}</style>

                    {/* Header */}
                    <div className="flex items-center px-5 py-4 border-b border-gray-200">
                      <h2 className="text-base font-bold">More From Meltwater</h2>
                    </div>

                    {/* Sliding banner track */}
                    <div style={{ overflow: 'hidden', flexShrink: 0 }}>
                      <div style={{
                        display: 'flex',
                        transform: `translateX(-${summitSlide * 100}%)`,
                        transition: 'transform 0.45s cubic-bezier(0.0, 0.0, 0.2, 1.0)',
                      }}>
                        {slides.map((s, i) => (
                          <div key={i} style={{ minWidth: '100%', flexShrink: 0 }}>{s.banner}</div>
                        ))}
                      </div>
                    </div>

                    {/* Body text + CTA */}
                    <div className="flex flex-col flex-1 justify-center min-h-0 overflow-hidden">
                      <div className="px-6 pt-2 pb-1 text-center">
                        <p className="text-base font-bold text-gray-900 mb-1">{slide.title}</p>
                        <p className="text-sm text-gray-500 leading-snug">{slide.body}</p>
                      </div>
                      <div className="flex justify-center py-2">
                        <button className="px-10 py-3 text-white text-sm font-bold rounded" style={{ background: '#0d9488' }}>{slide.cta}</button>
                      </div>
                    </div>

                    {/* Footer: Arrows + Dots */}
                    <div className="flex items-center justify-between px-4 py-3">
                      <button onClick={() => setSummitSlide(s => (s - 1 + totalSummitSlides) % totalSummitSlides)} className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-gray-500 rotate-180" />
                      </button>
                      <div className="flex gap-2">
                        {Array.from({ length: totalSummitSlides }).map((_, i) => (
                          <button key={i} onClick={() => setSummitSlide(i)} className="rounded-full border-none p-0 cursor-pointer transition-all" style={{ width: i === summitSlide ? 10 : 8, height: i === summitSlide ? 10 : 8, background: i === summitSlide ? '#1a9e9b' : '#D1D5DB' }} />
                        ))}
                      </div>
                      <button onClick={() => setSummitSlide(s => (s + 1) % totalSummitSlides)} className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Guides & Resources */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Resources & Product Updates</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">

                {/* Explore insights and trends */}
                <div className="bg-white pt-6 px-6 pb-[20px] rounded border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#E1F1F2'}}>
                      <Search className="w-5 h-5" style={{stroke: '#2A9E9F'}} />
                    </div>
                    <h3 className="font-semibold">Explore Insights and Trends</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    Create and manage searches to monitor brand, competitor, and industry media coverage
                  </p>
                  <div className="flex gap-3 mt-auto pt-[10px]">
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Product Updates <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Resources <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Training <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Monitor media coverage */}
                <div className="bg-white pt-6 px-6 pb-[20px] rounded border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#E1F1F2'}}>
                      <Eye className="w-5 h-5" style={{stroke: '#2A9E9F'}} />
                    </div>
                    <h3 className="font-semibold">Monitor Media Coverage</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    Personalize your monitoring experience to easily view, organize, and share relevant media coverage
                  </p>
                  <div className="flex gap-3 mt-auto pt-[10px]">
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Product Updates <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Resources <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Training <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Engage on social media */}
                <div className="bg-white pt-6 px-6 pb-[20px] rounded border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#E1F1F2'}}>
                      <MessageCircle className="w-5 h-5" style={{stroke: '#2A9E9F'}} />
                    </div>
                    <h3 className="font-semibold">Engage on Social Media</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    Manage social media marketing across your connected channels to publish, respond, and measure performance
                  </p>
                  <div className="flex gap-3 mt-auto pt-[10px]">
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Product Updates <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Resources <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Training <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Report on media coverage */}
                <div className="bg-white pt-6 px-6 pb-[20px] rounded border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#E1F1F2'}}>
                      <FileText className="w-5 h-5" style={{stroke: '#2A9E9F'}} />
                    </div>
                    <h3 className="font-semibold">Report on Media Coverage</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    Access and manage all of your reports
                  </p>
                  <div className="flex gap-3 mt-auto pt-[10px]">
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Product Updates <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Resources <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Training <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Find and engage with journalists */}
                <div className="bg-white pt-6 px-6 pb-[20px] rounded border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#E1F1F2'}}>
                      <Users className="w-5 h-5" style={{stroke: '#2A9E9F'}} />
                    </div>
                    <h3 className="font-semibold">Find and Engage with Journalists</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    Conduct media research, manage media lists, and pitch relevant story ideas to contacts
                  </p>
                  <div className="flex gap-3 mt-auto pt-[10px]">
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Product Updates <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Resources <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Training <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Deepen your understanding of audiences */}
                <div className="bg-white pt-6 px-6 pb-[20px] rounded border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#E1F1F2'}}>
                      <Target className="w-5 h-5" style={{stroke: '#2A9E9F'}} />
                    </div>
                    <h3 className="font-semibold">GenAI Lens</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">
                    Understand existing audiences, identify new ones, generate author lists, and download Ad Targets
                  </p>
                  <div className="flex gap-3 mt-auto pt-[10px]">
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Product Updates <ChevronRight className="w-3.5 h-3.5" /></button>
                    <button className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold">Resources <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

              </div>
            </div>

          </div>
          ) : (
          /* Design Components Page */
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Back to Home Button */}
            <button 
              onClick={handleNavigateToHomepage}
              className="flex items-center gap-2 text-teal-700 hover:text-teal-800 mb-4 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6">Design Components</h1>
            
            {/* Subsection Navigation Dropdown */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section:
              </label>
              <div className="relative inline-block" data-design-components-dropdown>
                <button
                  onClick={() => {
                    const newState = !expandedMenus['designComponentsDropdown'];
                    setExpandedMenus(prev => ({ ...prev, designComponentsDropdown: newState }));
                  }}
                  className="flex items-center justify-between w-64 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left shadow-sm"
                >
                  <span className="text-sm text-gray-700">Homepage Data Modules</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ml-3 ${expandedMenus['designComponentsDropdown'] ? 'rotate-180' : ''}`} />
                </button>
                {expandedMenus['designComponentsDropdown'] && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                      onClick={() => {
                        handleDesignComponentsSubsectionChange('homepage-data-modules');
                        setExpandedMenus(prev => ({ ...prev, designComponentsDropdown: false }));
                      }}
                    >
                      <span>Homepage Data Modules</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Subsection Content */}
            {designComponentsSubsection === 'homepage-data-modules' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Homepage Data Modules</h2>
                
                {/* Grid of Modules - 2 columns per row */}
                <div className="grid grid-cols-2 gap-6" style={{ gridAutoRows: '1fr' }}>
                  {/* Tesla Sentiment Summary Module */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow flex flex-col" style={{ height: '500px' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Tesla Sentiment Summary</h2>
                      <div className="flex items-center gap-2">
                        <div className="relative" data-sentiment-menu>
                          <button 
                            className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full transition-[background-color,box-shadow] duration-75 cursor-pointer"
                            onClick={handleSentimentMenuToggle}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          {sentimentMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                              <div className="px-4 py-2 border-b border-gray-200 mb-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">View Sentiment by</span>
                              </div>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => {
                                  const positiveLine = document.getElementById('positive-line-dc');
                                  const neutralLine = document.getElementById('neutral-line-dc');
                                  const negativeLine = document.getElementById('negative-line-dc');
                                  
                                  if (positiveLine && neutralLine && negativeLine) {
                                    positiveLine.setAttribute('points', "0,85 100,110 200,95 300,125 400,105 500,135 600,120");
                                    neutralLine.setAttribute('points', "0,80 100,75 200,85 300,70 400,80 500,75 600,85");
                                    negativeLine.setAttribute('points', "0,65 100,55 200,70 300,45 400,60 500,40 600,50");
                                  }
                                  setSentimentMenuOpen(false);
                                }}
                              >
                                <Newspaper className="w-4 h-4 text-gray-600" />
                                <span>News</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => {
                                  const positiveLine = document.getElementById('positive-line-dc');
                                  const neutralLine = document.getElementById('neutral-line-dc');
                                  const negativeLine = document.getElementById('negative-line-dc');
                                  
                                  if (positiveLine && neutralLine && negativeLine) {
                                    positiveLine.setAttribute('points', "0,90 100,120 200,110 300,140 400,130 500,145 600,135");
                                    neutralLine.setAttribute('points', "0,70 100,65 200,75 300,60 400,70 500,65 600,75");
                                    negativeLine.setAttribute('points', "0,50 100,40 200,55 300,30 400,45 500,25 600,35");
                                  }
                                  setSentimentMenuOpen(false);
                                }}
                              >
                                <Share2 className="w-4 h-4 text-gray-600" />
                                <span>Social</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => {
                                  const positiveLine = document.getElementById('positive-line-dc');
                                  const neutralLine = document.getElementById('neutral-line-dc');
                                  const negativeLine = document.getElementById('negative-line-dc');
                                  
                                  if (positiveLine && neutralLine && negativeLine) {
                                    positiveLine.setAttribute('points', "0,95 100,105 200,100 300,115 400,110 500,120 600,115");
                                    neutralLine.setAttribute('points', "0,75 100,80 200,78 300,85 400,80 500,85 600,82");
                                    negativeLine.setAttribute('points', "0,55 100,50 200,58 300,45 400,52 500,40 600,48");
                                  }
                                  setSentimentMenuOpen(false);
                                }}
                              >
                                <Star className="w-4 h-4 text-gray-600" />
                                <span>Reviews</span>
                              </button>
                              <div className="border-t border-gray-200 my-2"></div>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => {
                                  setSentimentMenuOpen(false);
                                }}
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                                <span>Add To Dashboard</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => {
                                  setSentimentMenuOpen(false);
                                }}
                              >
                                <Bell className="w-4 h-4 text-gray-600" />
                                <span>Create Sentiment Alert</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => {
                                  setSentimentMenuOpen(false);
                                }}
                              >
                                <Download className="w-4 h-4 text-gray-600" />
                                <span>CSV Download</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => {
                                  setSentimentMenuOpen(false);
                                }}
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                                <span>Edit Widget</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  
                  
                  {/* Line Graph - Sentiment Trends over 24 hours */}
                  <div className="mb-6 flex-1">
                    <p className="text-sm text-gray-600 mb-3" style={{marginTop: '-15px'}}><span className="font-semibold">38k Mentions</span> over the past 24 hours</p>
                    <div className="relative h-40 ml-8 mr-4">
                      <div className="absolute inset-0 border-l-2 border-b-2 border-gray-300">
                        {/* Y-axis labels */}
                        <div className="absolute -left-10 top-0 text-xs text-gray-500">20k</div>
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-xs text-gray-500">15k</div>
                        <div className="absolute -left-10 bottom-0 text-xs text-gray-500">5k</div>
                        
                        {/* Grid lines */}
                        <div className="absolute w-full h-px bg-gray-200 top-1/4"></div>
                        <div className="absolute w-full h-px bg-gray-200 top-1/2"></div>
                        <div className="absolute w-full h-px bg-gray-200 top-3/4"></div>
                        
                        {/* Positive sentiment line (green) */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                          <polyline
                            id="positive-line-dc"
                            points="0,85 100,110 200,95 300,125 400,105 500,135 600,120"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            vectorEffect="non-scaling-stroke"
                            style={{transition: 'points 0.5s ease-in-out'}}
                          />
                        </svg>
                        
                        {/* Neutral sentiment line (grey) */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                          <polyline
                            id="neutral-line-dc"
                            points="0,80 100,75 200,85 300,70 400,80 500,75 600,85"
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="3"
                            vectorEffect="non-scaling-stroke"
                            style={{transition: 'points 0.5s ease-in-out'}}
                          />
                        </svg>
                        
                        {/* Negative sentiment line (red) */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                          <polyline
                            id="negative-line-dc"
                            points="0,65 100,55 200,70 300,45 400,60 500,40 600,50"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            vectorEffect="non-scaling-stroke"
                            style={{transition: 'points 0.5s ease-in-out'}}
                          />
                        </svg>
                        
                        {/* Interactive hover overlay */}
                        <div 
                          className="absolute inset-0 cursor-crosshair"
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const xPercent = (x / rect.width) * 100;
                            
                            const yToValue = (y) => Math.round(20 - ((y / 160) * 15));
                            
                            const parsePoints = (pointsStr) => pointsStr.split(' ').map(p => {
                              const [px, py] = p.split(',').map(Number);
                              return { x: px, y: py };
                            });
                            
                            const positivePoints = parsePoints("0,85 100,110 200,95 300,125 400,105 500,135 600,120");
                            const neutralPoints = parsePoints("0,80 100,75 200,85 300,70 400,80 500,75 600,85");
                            const negativePoints = parsePoints("0,65 100,55 200,70 300,45 400,60 500,40 600,50");
                            
                            const xInSvg = (xPercent / 100) * 600;
                            let closestIndex = 0;
                            let minDist = Infinity;
                            positivePoints.forEach((point, i) => {
                              const dist = Math.abs(point.x - xInSvg);
                              if (dist < minDist) {
                                minDist = dist;
                                closestIndex = i;
                              }
                            });
                            
                            setGraphHover({
                              x: xPercent,
                              yPositions: {
                                positive: positivePoints[closestIndex].y,
                                neutral: neutralPoints[closestIndex].y,
                                negative: negativePoints[closestIndex].y
                              },
                              values: {
                                positive: yToValue(positivePoints[closestIndex].y),
                                neutral: yToValue(neutralPoints[closestIndex].y),
                                negative: yToValue(negativePoints[closestIndex].y)
                              }
                            });
                          }}
                          onMouseLeave={() => setGraphHover(null)}
                        />
                        
                        {/* Vertical hover line - always centered */}
                        {graphHover && (
                          <div 
                            className="absolute top-0 bottom-0 w-px bg-gray-400 pointer-events-none"
                            style={{ 
                              left: `${graphHover.x}%`,
                              transform: 'translateX(-50%)'
                            }}
                          />
                        )}
                        
                        {/* Tooltip - centered above the line */}
                        {graphHover && (
                          <div 
                            className="absolute bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 pointer-events-none z-10"
                            style={{ 
                              left: `${graphHover.x}%`, 
                              top: '-80px',
                              transform: 'translateX(-50%)',
                              minWidth: '160px'
                            }}
                          >
                            <div className="text-xs font-semibold text-gray-700 mb-2">Sentiment Values</div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-xs text-gray-600">Positive:</span>
                              <span className="text-xs font-semibold text-gray-900">{graphHover.values.positive}k</span>
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                              <span className="text-xs text-gray-600">Neutral:</span>
                              <span className="text-xs font-semibold text-gray-900">{graphHover.values.neutral}k</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <span className="text-xs text-gray-600">Negative:</span>
                              <span className="text-xs font-semibold text-gray-900">{graphHover.values.negative}k</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="flex justify-between text-xs text-gray-500 mt-2 ml-8 mr-4">
                      <span>24h ago</span>
                      <span>18h</span>
                      <span>12h</span>
                      <span>6h</span>
                      <span>Now</span>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex gap-4 mt-4 text-xs ml-8">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-green-500"></div>
                        <span className="text-gray-600">Positive Sentiment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-gray-400"></div>
                        <span className="text-gray-600">Neutral Sentiment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-red-500"></div>
                        <span className="text-gray-600">Negative Sentiment</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Insight: Tesla Cybercore tech now in the media */}
                  <div className="p-4 rounded-lg border border-gray-200 relative" style={STYLES.gradientBackground}>
                    {/* Ellipse menu button */}
                    <div className="absolute top-2 right-2" data-ai-sentiment-menu>
                      <button 
                        className="p-1 hover:bg-white/50 rounded transition-colors"
                        onClick={() => setAiSentimentMenuOpen(!aiSentimentMenuOpen)}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      {aiSentimentMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          <button 
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                            onClick={handleExpandInsight}
                          >
                            <Maximize2 className="w-4 h-4 text-gray-600" />
                            <span>Expand this insight</span>
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => setAiSentimentMenuOpen(false)}
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                            <span>Copy insight</span>
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => setAiSentimentMenuOpen(false)}
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600" />
                            <span>See sources</span>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <AIIcon gradientId="paint0_linear_ai_3" />
                      <span className="text-xs font-semibold text-gray-900">AI Insight: Tesla Cybercore tech now in the media</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Negative sentiment slow increasing in the past 6 hours following Tesla's battery technology announcement, peaking at 18k. Positive sentiment declining steadily, reaching lowest point in 24 hours.
                    </p>
                  </div>
                  </div>

                  {/* Tesla Narrative Summary Module */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow flex flex-col" style={{ height: '500px' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Tesla Narrative Summary</h2>
                      <div className="flex items-center gap-2">
                        <div className="relative" data-narrative-menu>
                          <button 
                            className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full transition-[background-color,box-shadow] duration-75 cursor-pointer"
                            onClick={handleNarrativeMenuToggle}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          {narrativeMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setNarrativeMenuOpen(false)}
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                                <span>Add To Dashboard</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setNarrativeMenuOpen(false)}
                              >
                                <Bell className="w-4 h-4 text-gray-600" />
                                <span>Create Alert</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setNarrativeMenuOpen(false)}
                              >
                                <Download className="w-4 h-4 text-gray-600" />
                                <span>CSV Download</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setNarrativeMenuOpen(false)}
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                                <span>Edit Widget</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                  {/* Heat Map */}
                  <div className="mb-4 flex-1">
                    <div className="grid grid-cols-6 gap-2">
                      {/* Header Row */}
                      <div className="text-xs font-semibold text-gray-600"></div>
                      <div className="text-xs font-semibold text-gray-600 text-center">1/18</div>
                      <div className="text-xs font-semibold text-gray-600 text-center">1/19</div>
                      <div className="text-xs font-semibold text-gray-600 text-center">1/20</div>
                      <div className="text-xs font-semibold text-gray-600 text-center">1/21</div>
                      <div className="text-xs font-semibold text-gray-600 text-center">Now</div>
                      
                      {/* Row 1: Robotaxis */}
                      <div className="text-xs font-medium text-gray-700 flex items-center">Robotaxis</div>
                      <div className="h-10 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium">78</div>
                      <div className="h-10 bg-green-400 rounded flex items-center justify-center text-white text-xs font-medium">65</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">42</div>
                      <div className="h-10 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium">81</div>
                      <div className="h-10 bg-green-600 rounded flex items-center justify-center text-white text-xs font-medium">92</div>
                      
                      {/* Row 2: Optimus */}
                      <div className="text-xs font-medium text-gray-700 flex items-center">Optimus</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">48</div>
                      <div className="h-10 bg-red-400 rounded flex items-center justify-center text-white text-xs font-medium">28</div>
                      <div className="h-10 bg-red-500 rounded flex items-center justify-center text-white text-xs font-medium">15</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">45</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">52</div>
                      
                      {/* Row 3: Berlin Gigafactory */}
                      <div className="text-xs font-medium text-gray-700 flex items-center">Berlin Gigafactory</div>
                      <div className="h-10 bg-green-400 rounded flex items-center justify-center text-white text-xs font-medium">68</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">50</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">47</div>
                      <div className="h-10 bg-green-400 rounded flex items-center justify-center text-white text-xs font-medium">71</div>
                      <div className="h-10 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium">85</div>
                      
                      {/* Row 4: Tesla Stock */}
                      <div className="text-xs font-medium text-gray-700 flex items-center">Tesla Stock</div>
                      <div className="h-10 bg-red-400 rounded flex items-center justify-center text-white text-xs font-medium">32</div>
                      <div className="h-10 bg-red-500 rounded flex items-center justify-center text-white text-xs font-medium">18</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">44</div>
                      <div className="h-10 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-medium">55</div>
                      <div className="h-10 bg-green-400 rounded flex items-center justify-center text-white text-xs font-medium">73</div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex justify-center gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-gray-600">Positive</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <span className="text-gray-600">Neutral</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-gray-600">Negative</span>
                    </div>
                  </div>
                  
                  {/* AI Narrative Insight */}
                  <div className="p-4 rounded-lg border border-gray-200 relative" style={STYLES.gradientBackground}>
                    {/* Ellipse menu button */}
                    <div className="absolute top-2 right-2" data-ai-narrative-menu>
                      <button 
                        className="p-1 hover:bg-white/50 rounded transition-colors"
                        onClick={() => setAiNarrativeMenuOpen(!aiNarrativeMenuOpen)}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      {aiNarrativeMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          <button 
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => setAiNarrativeMenuOpen(false)}
                          >
                            <Maximize2 className="w-4 h-4 text-gray-600" />
                            <span>Expand this insight</span>
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => setAiNarrativeMenuOpen(false)}
                          >
                            <Copy className="w-4 h-4 text-gray-600" />
                            <span>Copy insight</span>
                          </button>
                          <button 
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                            onClick={() => setAiNarrativeMenuOpen(false)}
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600" />
                            <span>See sources</span>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <AIIcon gradientId="paint0_linear_ai_4" />
                      <span className="text-xs font-semibold text-gray-900">AI Narrative Insight</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Innovation narrative strengthening with positive momentum. Safety concerns from Days 2-3 have neutralized. Pricing sentiment improved today following Model 3 discount announcement. Leadership narrative trending positively.
                    </p>
                  </div>
                  </div>

                  {/* Cybertruck Global Sentiment Map Module */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow flex flex-col" style={{ height: '500px' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold">Cybertruck Global Sentiment Map</h2>
                      <div className="flex items-center gap-2">
                        <div className="relative" data-cybertruck-menu>
                          <button 
                            className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full transition-[background-color,box-shadow] duration-75 cursor-pointer"
                            onClick={() => setCybertruckMenuOpen(!cybertruckMenuOpen)}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          {cybertruckMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setCybertruckMenuOpen(false)}
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                                <span>Add To Dashboard</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setCybertruckMenuOpen(false)}
                              >
                                <Bell className="w-4 h-4 text-gray-600" />
                                <span>Create Alert</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setCybertruckMenuOpen(false)}
                              >
                                <Download className="w-4 h-4 text-gray-600" />
                                <span>CSV Download</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setCybertruckMenuOpen(false)}
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                                <span>Edit Widget</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '-35px' }}>
                    {/* Bubble Chart - Top 4 Countries */}
                    <div 
                      className="flex-1 bg-white rounded-lg p-3 relative mb-1" 
                      style={STYLES.chartContainer}
                      onMouseMove={handleMouseMove}
                    >
                      <svg viewBox="0 -20 700 350" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                        {/* Grid lines */}
                        <line x1="80" y1="265" x2="660" y2="265" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="80" y1="211" x2="660" y2="211" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="80" y1="157" x2="660" y2="157" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="80" y1="103" x2="660" y2="103" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="80" y1="49" x2="660" y2="49" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="80" y1="15" x2="660" y2="15" stroke="#e5e7eb" strokeWidth="1" />
                        
                        {/* Y-axis (Engagement) */}
                        <line x1="80" y1="15" x2="80" y2="265" stroke="#6b7280" strokeWidth="2" />
                        <text x="30" y="20" className="text-xs" fill="#6b7280">40k</text>
                        <text x="30" y="54" className="text-xs" fill="#6b7280">35k</text>
                        <text x="30" y="108" className="text-xs" fill="#6b7280">25k</text>
                        <text x="30" y="162" className="text-xs" fill="#6b7280">15k</text>
                        <text x="30" y="216" className="text-xs" fill="#6b7280">10k</text>
                        <text x="35" y="270" className="text-xs" fill="#6b7280">5k</text>
                        
                        {/* X-axis (Reach) */}
                        <line x1="80" y1="265" x2="660" y2="265" stroke="#6b7280" strokeWidth="2" />
                        <text x="75" y="285" className="text-xs" fill="#6b7280">200</text>
                        <text x="210" y="285" className="text-xs" fill="#6b7280">2.5k</text>
                        <text x="350" y="285" className="text-xs" fill="#6b7280">5k</text>
                        <text x="490" y="285" className="text-xs" fill="#6b7280">7.5k</text>
                        <text x="630" y="285" className="text-xs" fill="#6b7280">10k</text>
                        <text x="340" y="305" style={{fontSize: '14px'}} className="font-semibold" fill="#374151">Reach</text>
                        <text x="10" y="153" style={{fontSize: '14px'}} className="font-semibold" fill="#374151" transform="rotate(-90, 10, 153)">Engagement</text>
                        
                        {/* Bubble 1: USA - Positive (large reach) */}
                        <g 
                          className="cursor-pointer" 
                          onMouseEnter={() => setHoveredBubble({ country: 'USA', engagement: '32k', reach: '8.2k', outlets: '450' })}
                          onMouseLeave={() => setHoveredBubble(null)}
                        >
                          <circle cx="510" cy="52" r="60" fill="#10b981" fillOpacity="0.2" stroke="#047857" strokeWidth="2" />
                          <circle cx="510" cy="52" r="40" fill="#10b981" fillOpacity="0.35" />
                          <text x="510" y="59" textAnchor="middle" className="text-lg font-bold" fill="#065f46" pointerEvents="none">USA</text>
                        </g>
                        
                        {/* Bubble 2: China - Positive (medium reach) */}
                        <g 
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredBubble({ country: 'China', engagement: '28k', reach: '6.1k', outlets: '320' })}
                          onMouseLeave={() => setHoveredBubble(null)}
                        >
                          <circle cx="380" cy="64" r="52" fill="#10b981" fillOpacity="0.2" stroke="#047857" strokeWidth="2" />
                          <circle cx="380" cy="64" r="35" fill="#10b981" fillOpacity="0.35" />
                          <text x="380" y="71" textAnchor="middle" className="text-lg font-bold" fill="#065f46" pointerEvents="none">China</text>
                        </g>
                        
                        {/* Bubble 3: Germany - Negative (medium reach) */}
                        <g 
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredBubble({ country: 'Germany', engagement: '18k', reach: '3.5k', outlets: '280' })}
                          onMouseLeave={() => setHoveredBubble(null)}
                        >
                          <circle cx="250" cy="132" r="50" fill="#ef4444" fillOpacity="0.2" stroke="#991b1b" strokeWidth="2" />
                          <circle cx="250" cy="132" r="33" fill="#ef4444" fillOpacity="0.35" />
                          <text x="250" y="139" textAnchor="middle" className="text-lg font-bold" fill="#991b1b" pointerEvents="none">Germany</text>
                        </g>
                        
                        {/* Bubble 4: Canada - Neutral (smaller reach) */}
                        <g 
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredBubble({ country: 'Canada', engagement: '12k', reach: '2.1k', outlets: '180' })}
                          onMouseLeave={() => setHoveredBubble(null)}
                        >
                          <circle cx="170" cy="184" r="40" fill="#9ca3af" fillOpacity="0.2" stroke="#6b7280" strokeWidth="2" />
                          <circle cx="170" cy="184" r="28" fill="#9ca3af" fillOpacity="0.35" />
                          <text x="170" y="191" textAnchor="middle" className="text-lg font-bold" fill="#4b5563" pointerEvents="none">Canada</text>
                        </g>
                      </svg>
                      
                      {/* Custom White Tooltip - Follows Mouse */}
                      {hoveredBubble && (
                        <div 
                          className="absolute bg-white text-black px-3 py-2 rounded-lg shadow-lg text-xs font-medium pointer-events-none"
                          style={{
                            left: `${mousePosition.x + 10}px`,
                            top: `${mousePosition.y - 40}px`,
                            zIndex: 1000
                          }}
                        >
                          <div>{hoveredBubble.country}: {hoveredBubble.engagement} engagement, {hoveredBubble.reach} reach, {hoveredBubble.outlets} outlets</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Legend */}
                    <div className="flex justify-center gap-8 mb-4 text-xs" style={{marginTop: '-8px'}}>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 opacity-40 border-2 border-green-700 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Positive Sentiment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-400 opacity-40 border-2 border-gray-600 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Neutral Sentiment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-500 opacity-40 border-2 border-red-800 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Negative Sentiment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-xs italic">Bubble size = Media Reach</span>
                      </div>
                    </div>
                    
                    {/* AI Cybertruck Insight */}
                    <div className="p-4 rounded-lg border border-gray-200 relative" style={STYLES.gradientBackground}>
                      {/* Ellipse menu button */}
                      <div className="absolute top-2 right-2" data-ai-cybertruck-menu>
                        <button 
                          className="p-1 hover:bg-white/50 rounded transition-colors"
                          onClick={() => setAiCybertruckMenuOpen(!aiCybertruckMenuOpen)}
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {aiCybertruckMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button 
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiCybertruckMenuOpen(false)}
                            >
                              <Maximize2 className="w-4 h-4 text-gray-600" />
                              <span>Expand this insight</span>
                            </button>
                            <button 
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiCybertruckMenuOpen(false)}
                            >
                              <Copy className="w-4 h-4 text-gray-600" />
                              <span>Copy insight</span>
                            </button>
                            <button 
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiCybertruckMenuOpen(false)}
                            >
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                              <span>See sources</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                      <AIIcon gradientId="paint0_linear_ai_5" />
                        <span className="text-xs font-semibold text-gray-900">AI Cybertruck Insight</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        USA leads Cybertruck conversation with 32k engagement and 8.2k reach, driven by 450+ media outlets covering design innovation and pre-orders.
                      </p>
                    </div>
                    </div>
                  </div>

                  {/* Reaction Breakdown Module */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow flex flex-col" style={{ height: '500px' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold">Reaction Breakdown</h2>
                      <div className="flex items-center gap-2">
                        <div className="relative" data-reaction-breakdown-menu>
                          <button 
                            className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full transition-[background-color,box-shadow] duration-75 cursor-pointer"
                            onClick={() => setReactionBreakdownMenuOpen(!reactionBreakdownMenuOpen)}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          {reactionBreakdownMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setReactionBreakdownMenuOpen(false)}
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                                <span>Add To Dashboard</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setReactionBreakdownMenuOpen(false)}
                              >
                                <Bell className="w-4 h-4 text-gray-600" />
                                <span>Create Alert</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setReactionBreakdownMenuOpen(false)}
                              >
                                <Download className="w-4 h-4 text-gray-600" />
                                <span>CSV Download</span>
                              </button>
                              <button 
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setReactionBreakdownMenuOpen(false)}
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                                <span>Edit Widget</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '-35px' }}>
                    {/* Stacked Bar Chart - Last 7 Days */}
                    <div className="flex-1 bg-white rounded-lg p-4 relative mb-1" style={STYLES.chartContainer}>
                      <p className="text-sm text-gray-600 mb-0"><span className="font-semibold">Last 7 Days</span> - Reaction breakdown by source</p>
                      
                      <div className="relative" style={{ height: '220px', paddingTop: '20px', marginTop: '-20px' }}>
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-5 bottom-10" style={{ width: '40px' }}>
                          <div className="h-full flex flex-col justify-between items-end pr-2 text-xs text-gray-500">
                            <span>15k</span>
                            <span>12k</span>
                            <span>9k</span>
                            <span>6k</span>
                            <span>3k</span>
                            <span>0</span>
                          </div>
                        </div>
                        
                        {/* Chart area */}
                        <div className="absolute left-12 right-4 top-5 bottom-10">
                          <div className="h-full flex items-end justify-between gap-2">
                            
                            {/* Monday - 12.1k total */}
                            <div className="flex-1 group relative flex items-end justify-center" style={{ height: '100%' }}>
                              <div className="w-full flex flex-col justify-end" style={{ height: '80%' }}>
                                <div className="w-full bg-teal-500 rounded-t" style={{ height: '43%' }}></div>
                                <div className="w-full bg-blue-500" style={{ height: '38%' }}></div>
                                <div className="w-full bg-purple-500 rounded-b" style={{ height: '19%' }}></div>
                              </div>
                              <div className="hidden group-hover:flex absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 text-xs whitespace-nowrap z-50 flex-col gap-1">
                                <div className="font-semibold mb-1">Monday</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded"></div><span>News: 5.2k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span>Social: 4.6k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Forum: 2.3k</span></div>
                              </div>
                            </div>
                            
                            {/* Tuesday - 10.9k total */}
                            <div className="flex-1 group relative flex items-end justify-center" style={{ height: '100%' }}>
                              <div className="w-full flex flex-col justify-end" style={{ height: '73%' }}>
                                <div className="w-full bg-teal-500 rounded-t" style={{ height: '35%' }}></div>
                                <div className="w-full bg-blue-500" style={{ height: '45%' }}></div>
                                <div className="w-full bg-purple-500 rounded-b" style={{ height: '20%' }}></div>
                              </div>
                              <div className="hidden group-hover:flex absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 text-xs whitespace-nowrap z-50 flex-col gap-1">
                                <div className="font-semibold mb-1">Tuesday</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded"></div><span>News: 3.8k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span>Social: 4.9k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Forum: 2.2k</span></div>
                              </div>
                            </div>
                            
                            {/* Wednesday - 13.8k total */}
                            <div className="flex-1 group relative flex items-end justify-center" style={{ height: '100%' }}>
                              <div className="w-full flex flex-col justify-end" style={{ height: '92%' }}>
                                <div className="w-full bg-teal-500 rounded-t" style={{ height: '40%' }}></div>
                                <div className="w-full bg-blue-500" style={{ height: '38%' }}></div>
                                <div className="w-full bg-purple-500 rounded-b" style={{ height: '22%' }}></div>
                              </div>
                              <div className="hidden group-hover:flex absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 text-xs whitespace-nowrap z-50 flex-col gap-1">
                                <div className="font-semibold mb-1">Wednesday</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded"></div><span>News: 5.5k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span>Social: 5.3k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Forum: 3.0k</span></div>
                              </div>
                            </div>
                            
                            {/* Thursday - 10.2k total */}
                            <div className="flex-1 group relative flex items-end justify-center" style={{ height: '100%' }}>
                              <div className="w-full flex flex-col justify-end" style={{ height: '68%' }}>
                                <div className="w-full bg-teal-500 rounded-t" style={{ height: '32%' }}></div>
                                <div className="w-full bg-blue-500" style={{ height: '33%' }}></div>
                                <div className="w-full bg-purple-500 rounded-b" style={{ height: '35%' }}></div>
                              </div>
                              <div className="hidden group-hover:flex absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 text-xs whitespace-nowrap z-50 flex-col gap-1">
                                <div className="font-semibold mb-1">Thursday</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded"></div><span>News: 3.3k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span>Social: 3.4k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Forum: 3.5k</span></div>
                              </div>
                            </div>
                            
                            {/* Friday - 14.3k total */}
                            <div className="flex-1 group relative flex items-end justify-center" style={{ height: '100%' }}>
                              <div className="w-full flex flex-col justify-end" style={{ height: '95%' }}>
                                <div className="w-full bg-teal-500 rounded-t" style={{ height: '42%' }}></div>
                                <div className="w-full bg-blue-500" style={{ height: '40%' }}></div>
                                <div className="w-full bg-purple-500 rounded-b" style={{ height: '18%' }}></div>
                              </div>
                              <div className="hidden group-hover:flex absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 text-xs whitespace-nowrap z-50 flex-col gap-1">
                                <div className="font-semibold mb-1">Friday</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded"></div><span>News: 6.0k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span>Social: 5.7k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Forum: 2.6k</span></div>
                              </div>
                            </div>
                            
                            {/* Saturday - 9.0k total */}
                            <div className="flex-1 group relative flex items-end justify-center" style={{ height: '100%' }}>
                              <div className="w-full flex flex-col justify-end" style={{ height: '60%' }}>
                                <div className="w-full bg-teal-500 rounded-t" style={{ height: '32%' }}></div>
                                <div className="w-full bg-blue-500" style={{ height: '38%' }}></div>
                                <div className="w-full bg-purple-500 rounded-b" style={{ height: '30%' }}></div>
                              </div>
                              <div className="hidden group-hover:flex absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 text-xs whitespace-nowrap z-50 flex-col gap-1">
                                <div className="font-semibold mb-1">Saturday</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded"></div><span>News: 2.9k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span>Social: 3.4k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Forum: 2.7k</span></div>
                              </div>
                            </div>
                            
                            {/* Sunday - 8.2k total */}
                            <div className="flex-1 group relative flex items-end justify-center" style={{ height: '100%' }}>
                              <div className="w-full flex flex-col justify-end" style={{ height: '55%' }}>
                                <div className="w-full bg-teal-500 rounded-t" style={{ height: '31%' }}></div>
                                <div className="w-full bg-blue-500" style={{ height: '33%' }}></div>
                                <div className="w-full bg-purple-500 rounded-b" style={{ height: '36%' }}></div>
                              </div>
                              <div className="hidden group-hover:flex absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3 text-xs whitespace-nowrap z-50 flex-col gap-1">
                                <div className="font-semibold mb-1">Sunday</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded"></div><span>News: 2.5k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span>Social: 2.7k</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded"></div><span>Forum: 3.0k</span></div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="absolute left-12 right-4 bottom-0 flex justify-between text-xs text-gray-600">
                          <span className="flex-1 text-center">Mon</span>
                          <span className="flex-1 text-center">Tue</span>
                          <span className="flex-1 text-center">Wed</span>
                          <span className="flex-1 text-center">Thu</span>
                          <span className="flex-1 text-center">Fri</span>
                          <span className="flex-1 text-center">Sat</span>
                          <span className="flex-1 text-center">Sun</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex justify-center gap-6 mb-4 text-xs relative" style={{ marginTop: '-10px', zIndex: 10 }}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-teal-500 rounded"></div>
                        <span className="text-gray-700 font-medium">News</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-gray-700 font-medium">Social</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-gray-700 font-medium">Forum</span>
                      </div>
                    </div>
                    
                    {/* AI Cybertruck Insight */}
                    <div className="p-4 rounded-lg border border-gray-200 relative" style={{ ...STYLES.gradientBackground, marginTop: '21px' }}>
                      {/* Ellipse menu button */}
                      <div className="absolute top-2 right-2" data-ai-reaction-breakdown-menu>
                        <button 
                          className="p-1 hover:bg-white/50 rounded transition-colors"
                          onClick={() => setAiReactionBreakdownMenuOpen(!aiReactionBreakdownMenuOpen)}
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {aiReactionBreakdownMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button 
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiReactionBreakdownMenuOpen(false)}
                            >
                              <Maximize2 className="w-4 h-4 text-gray-600" />
                              <span>Expand this insight</span>
                            </button>
                            <button 
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiReactionBreakdownMenuOpen(false)}
                            >
                              <Copy className="w-4 h-4 text-gray-600" />
                              <span>Copy insight</span>
                            </button>
                            <button 
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiReactionBreakdownMenuOpen(false)}
                            >
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                              <span>See sources</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                      <AIIcon gradientId="paint0_linear_ai_6" />
                        <span className="text-xs font-semibold text-gray-900">AI Reaction Breakdown Insight</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Peak activity on Friday with 14.3k total Wednesday shows balanced engagement across all sources (13.8k total). Thursday exhibits unusual Forum dominance (35% share). Weekend dip evident with Sunday at 8.2k total
                      </p>
                    </div>
                    </div>
                  </div>

                  {/* Top 5 Journalists Mentioning Tesla Module */}
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow flex flex-col" style={{ height: '500px' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold">Top 5 Journalists Mentioning Tesla</h2>
                      <div className="flex items-center gap-2">
                        <div className="relative" data-journalists-menu>
                          <button
                            className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full transition-[background-color,box-shadow] duration-75 cursor-pointer"
                            onClick={() => setJournalistsMenuOpen(!journalistsMenuOpen)}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          {journalistsMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                              <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setJournalistsMenuOpen(false)}
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                                <span>Add To Dashboard</span>
                              </button>
                              <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setJournalistsMenuOpen(false)}
                              >
                                <Bell className="w-4 h-4 text-gray-600" />
                                <span>Create Alert</span>
                              </button>
                              <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setJournalistsMenuOpen(false)}
                              >
                                <Download className="w-4 h-4 text-gray-600" />
                                <span>CSV Download</span>
                              </button>
                              <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                onClick={() => setJournalistsMenuOpen(false)}
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                                <span>Edit Widget</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '-35px' }}>
                    {/* Horizontal Bar Chart */}
                    <div className="flex-1 bg-white rounded-lg p-3 relative mb-1" style={{...STYLES.chartContainer, minHeight: '240px'}}>
                      <svg viewBox="0 0 600 278" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                        {/* Y-axis */}
                        <line x1="145" y1="10" x2="145" y2="215" stroke="#6b7280" strokeWidth="2" />
                        {/* X-axis */}
                        <line x1="145" y1="215" x2="582" y2="215" stroke="#6b7280" strokeWidth="2" />

                        {/* Vertical grid lines */}
                        <line x1="253" y1="10" x2="253" y2="215" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="361" y1="10" x2="361" y2="215" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="469" y1="10" x2="469" y2="215" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="577" y1="10" x2="577" y2="215" stroke="#e5e7eb" strokeWidth="1" />

                        {/* X-axis labels */}
                        <text x="145" y="230" textAnchor="middle" fill="#6b7280" style={{fontSize: '11px'}}>0</text>
                        <text x="253" y="230" textAnchor="middle" fill="#6b7280" style={{fontSize: '11px'}}>100</text>
                        <text x="361" y="230" textAnchor="middle" fill="#6b7280" style={{fontSize: '11px'}}>200</text>
                        <text x="469" y="230" textAnchor="middle" fill="#6b7280" style={{fontSize: '11px'}}>300</text>
                        <text x="577" y="230" textAnchor="middle" fill="#6b7280" style={{fontSize: '11px'}}>400</text>

                        {/* X-axis title */}
                        <text x="363" y="252" textAnchor="middle" style={{fontSize: '13px', fontWeight: '600'}} fill="#374151">Mentions (Last 30 Days)</text>

                        {/* Bar 1: Sarah Chen - 342 */}
                        <text x="140" y="33" textAnchor="end" style={{fontSize: '11px', fontWeight: '500'}} fill="#374151">Sarah Chen</text>
                        <text x="140" y="45" textAnchor="end" style={{fontSize: '9px'}} fill="#9ca3af">Bloomberg</text>
                        <rect x="145" y="18" width="369" height="26" fill="#0d9488" fillOpacity="0.85" rx="3" />
                        <text x="520" y="36" style={{fontSize: '11px', fontWeight: '600'}} fill="#374151">342</text>

                        {/* Bar 2: John Koetsier - 298 */}
                        <text x="140" y="72" textAnchor="end" style={{fontSize: '11px', fontWeight: '500'}} fill="#374151">John Koetsier</text>
                        <text x="140" y="84" textAnchor="end" style={{fontSize: '9px'}} fill="#9ca3af">Forbes</text>
                        <rect x="145" y="57" width="322" height="26" fill="#0d9488" fillOpacity="0.7" rx="3" />
                        <text x="473" y="75" style={{fontSize: '11px', fontWeight: '600'}} fill="#374151">298</text>

                        {/* Bar 3: Michael Taylor - 276 */}
                        <text x="140" y="111" textAnchor="end" style={{fontSize: '11px', fontWeight: '500'}} fill="#374151">Michael Taylor</text>
                        <text x="140" y="123" textAnchor="end" style={{fontSize: '9px'}} fill="#9ca3af">Reuters</text>
                        <rect x="145" y="96" width="298" height="26" fill="#0d9488" fillOpacity="0.55" rx="3" />
                        <text x="449" y="114" style={{fontSize: '11px', fontWeight: '600'}} fill="#374151">276</text>

                        {/* Bar 4: Emily Rodriguez - 251 */}
                        <text x="140" y="150" textAnchor="end" style={{fontSize: '11px', fontWeight: '500'}} fill="#374151">Emily Rodriguez</text>
                        <text x="140" y="162" textAnchor="end" style={{fontSize: '9px'}} fill="#9ca3af">CNBC</text>
                        <rect x="145" y="135" width="271" height="26" fill="#0d9488" fillOpacity="0.4" rx="3" />
                        <text x="422" y="153" style={{fontSize: '11px', fontWeight: '600'}} fill="#374151">251</text>

                        {/* Bar 5: David Park - 218 */}
                        <text x="140" y="189" textAnchor="end" style={{fontSize: '11px', fontWeight: '500'}} fill="#374151">David Park</text>
                        <text x="140" y="201" textAnchor="end" style={{fontSize: '9px'}} fill="#9ca3af">TechCrunch</text>
                        <rect x="145" y="174" width="235" height="26" fill="#0d9488" fillOpacity="0.25" rx="3" />
                        <text x="386" y="192" style={{fontSize: '11px', fontWeight: '600'}} fill="#374151">218</text>
                      </svg>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center gap-8 mb-4 text-xs" style={{marginTop: '-8px'}}>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-3 rounded-sm" style={{backgroundColor: '#0d9488', opacity: 0.8}}></div>
                        <span className="text-gray-700 font-medium">Total Tesla Mentions (Last 30 Days)</span>
                      </div>
                    </div>

                    {/* AI Journalists Insight */}
                    <div className="p-4 rounded-lg border border-gray-200 relative mb-4" style={STYLES.gradientBackground}>
                      <div className="absolute top-2 right-2" data-ai-journalists-menu>
                        <button
                          className="p-1 hover:bg-white/50 rounded transition-colors"
                          onClick={() => setAiJournalistsMenuOpen(!aiJournalistsMenuOpen)}
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {aiJournalistsMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiJournalistsMenuOpen(false)}
                            >
                              <Maximize2 className="w-4 h-4 text-gray-600" />
                              <span>Expand this insight</span>
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiJournalistsMenuOpen(false)}
                            >
                              <Copy className="w-4 h-4 text-gray-600" />
                              <span>Copy insight</span>
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                              onClick={() => setAiJournalistsMenuOpen(false)}
                            >
                              <ExternalLink className="w-4 h-4 text-gray-600" />
                              <span>See sources</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <AIIcon gradientId="paint0_linear_ai_7" />
                        <span className="text-xs font-semibold text-gray-900">AI Journalist Insight</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Sarah Chen leads Tesla coverage with 342 mentions, driven by Bloomberg's EV market share and earnings focus. Tech-focused journalists (Koetsier, Park) increased coverage frequency 18% MoM, signaling growing mainstream investment interest in the brand.
                      </p>
                    </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
          )}
        </main>
      </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .mira-companion-btn {
          background: transparent;
          border: 1px solid #D1D5DB;
          transition: background 1.5s ease-in-out;
        }
        
        .mira-companion-btn:hover {
          background: linear-gradient(90deg, #F8E8F6 0%, #E9F6F6 100%);
        }
        
        .wand-icon path {
          transition: fill 0.2s ease-in-out;
        }
        
        .mira-companion-btn:hover .wand-icon path {
          fill: #B526A0;
        }
        
        /* Cybertruck bubble hover - custom white tooltip */
        .bubble-group {
          cursor: pointer;
          position: relative;
        }
        
        .bubble-tooltip {
          display: none;
          position: absolute;
          background: white;
          color: black;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          pointer-events: none;
          z-index: 1000;
        }
        
        .bubble-group:hover .bubble-tooltip {
          display: block;
        }
        
        /* Tooltip styles */
        .tooltip-container {
          position: relative;
        }
        
        .tooltip-text {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 10px;
          background-color: #1f2937;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          white-space: nowrap;
          z-index: 1000;
          pointer-events: none;
          transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
          z-index: 9999;
        }
        
        .tooltip-text::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: #1f2937;
        }
        
        /* Tooltips only visible in collapsed icon mode */
        aside.sidebar-collapsed .tooltip-container:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }

        @media (max-width: 995px) {
          aside .tooltip-container:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
          }
        }
        
        .journalist-plus-btn:hover svg {
          stroke: white;
        }

        .journalist-name-link:hover {
          color: #007264;
          text-decoration: underline;
        }

        .module-drag-handle {
          cursor: grab;
          user-select: none;
        }
        .module-drag-handle:active {
          cursor: grabbing;
        }

        .emerging-action-btn:hover {
          background-color: #00726E !important;
          color: white !important;
        }

        /* Allow tooltips to escape the clipping boundary in collapsed mode.
           CSS spec: overflow-x:visible is coerced to auto when overflow-y is auto/scroll.
           Setting both axes to visible on nav removes the formatting context entirely. */
        aside.sidebar-collapsed {
          overflow: visible !important;
        }
        aside.sidebar-collapsed nav {
          overflow: visible !important;
        }

        /* Collapsed sidebar state (class-based, mirrors responsive rules) */
        aside.sidebar-collapsed .sidebar-text,
        aside.sidebar-collapsed .sidebar-arrow,
        aside.sidebar-collapsed .sidebar-submenu,
        aside.sidebar-collapsed .sidebar-badge,
        aside.sidebar-collapsed .sidebar-footer {
          display: none !important;
        }

        aside.sidebar-collapsed nav {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        aside.sidebar-collapsed nav > div {
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-bottom: 0 !important;
        }

        aside.sidebar-collapsed nav > div > div {
          justify-content: center !important;
          padding: 0.75rem !important;
          gap: 0 !important;
          margin: 0 0.5rem !important;
          min-height: 2.5rem;
          display: flex !important;
          align-items: center !important;
        }

        aside.sidebar-collapsed nav > div > div > * {
          margin: 0 !important;
        }

        aside.sidebar-collapsed svg[class*="lucide-chevron"],
        aside.sidebar-collapsed .sidebar-arrow {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }

        /* Responsive sidebar */
        @media (max-width: 995px) {
          aside {
            width: 4rem !important;
          }

          .flex-1.flex.flex-col.min-w-0 {
            margin-left: 4rem !important;
          }

          .sidebar-text,
          .sidebar-arrow,
          .sidebar-submenu,
          .sidebar-badge {
            display: none !important;
          }

          aside nav {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          aside nav > div {
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-bottom: 0 !important;
          }

          aside nav > div > div {
            justify-content: center !important;
            padding: 0.75rem !important;
            gap: 0 !important;
            margin: 0 0.5rem !important;
            min-height: 2.5rem;
            display: flex !important;
            align-items: center !important;
          }

          aside nav > div > div > * {
            margin: 0 !important;
          }

          /* Force hide all chevron arrows */
          aside svg[class*="lucide-chevron"],
          aside .sidebar-arrow {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
        }
      `}</style>
      </div>

      {/* Mira Companion Side Panel */}
      <div 
        className="bg-white border-l border-gray-300 flex-shrink-0 h-screen overflow-y-auto"
        style={{
          width: '480px',
          transition: 'margin-right 250ms ease-out',
          marginRight: miraPanelOpen ? '0px' : '-480px'
        }}
      >
        <div className="flex flex-col h-full w-[480px]">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Mira Companion</h2>
            <button 
              onClick={handleMiraPanelClose}
              className="p-1 hover:bg-gray-100 hover:shadow-[0_0_0_6px_#f3f4f6] rounded-full transition-[background-color,box-shadow] duration-75 cursor-pointer"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {panelView === 'default' ? (
              <>
                {/* Default View - Original Content */}
                {/* Mira Icon */}
<div className="flex justify-center mb-6">
                  <img 
                    src="data:image/webp;base64,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"
                    alt="Mira Companion"
                    className="w-24 h-24 rounded-full"
                  />
                </div>

                {/* Greeting */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Hello, <span className="font-bold">John!</span></h3>
                  <p className="text-gray-700 mt-1">I'm your Mira Companion! How can I help you today?</p>
                </div>

                {/* Take Action Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">Take Action</h4>
                  <div className="space-y-3">
                    <button className={CLASSES.panelButton}>
                      <Search className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-sm">Pick up where you left off with Tesla News U...</span>
                      <svg className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                        <path d="M9 3v18" strokeWidth="2"/>
                      </svg>
                    </button>
                    
                    <button className={CLASSES.panelButton}>
                      <Bell className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-sm">Create an alert for Tesla News Update</span>
                    </button>
                    
                    <button className={CLASSES.panelButton}>
                      <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-sm">Analyze or add article</span>
                    </button>
                    
                    <button className={CLASSES.panelButton}>
                      <Bell className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-sm">Create an alert</span>
                    </button>
                    
                    <button className={CLASSES.panelButton}>
                      <Target className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-sm">Check for a source</span>
                    </button>
                  </div>
                </div>

                {/* Get Help Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Get Help</h4>
                  <div className="space-y-3">
                    <button className={CLASSES.panelButton}>
                      <MessageCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-sm">Provide account support</span>
                    </button>
                    
                    <button className={CLASSES.panelButton}>
                      <Search className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <span className="text-sm">Help me get started with Explore</span>
                    </button>
                    
                    <button className={CLASSES.panelButton}>
                      <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">How many searches do I have left?</span>
                    </button>
                    
                    <button className={CLASSES.panelButton}>
                      <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">How far back can I search in Meltwater?</span>
                    </button>
                  </div>
                </div>
              </>
            ) : panelView === 'spikeAlert' ? (
              <>
                {/* Spike Alert View */}
                <div className="flex flex-col gap-4">
                  {/* Mira Message */}
                  <div className="flex gap-2 items-start">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <rect width="24" height="24" rx="12" fill="url(#paint0_radial_sa0)"/>
                      <g clipPath="url(#clip0_sa0)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0158 9.11182C13.8413 9.11182 15.3214 10.591 15.3214 12.4168C15.3214 14.2424 13.8413 15.722 12.0158 15.722C10.1899 15.722 8.71066 14.2424 8.71066 12.4168C8.71066 10.591 10.1899 9.11182 12.0158 9.11182ZM12.0158 13.8334C12.7982 13.8334 13.4326 13.1995 13.4326 12.4168C13.4326 11.6344 12.7982 11.0005 12.0158 11.0005C11.2331 11.0005 10.5997 11.6344 10.5997 12.4168C10.5997 13.1995 11.2331 13.8334 12.0158 13.8334ZM18.1039 12.5655C17.7611 13.0113 17.3472 13.4505 16.9336 13.8665C16.215 14.5926 15.4003 15.2271 14.58 15.722H16.983C18.2271 14.8249 19.326 13.6208 20.0428 12.4168C19.326 11.2132 18.2271 10.0091 16.983 9.11182H14.58C15.4003 9.60674 16.215 10.2413 16.9336 10.9675C17.3472 11.3835 17.7611 11.8225 18.1039 12.2685V12.2697C18.1363 12.3102 18.1562 12.3605 18.1562 12.4163C18.1562 12.4718 18.1363 12.5223 18.1039 12.5626V12.5655ZM5.92792 12.5655C6.27058 13.0113 6.68478 13.4505 7.09844 13.8665C7.81664 14.5926 8.63174 15.2271 9.45206 15.722H7.049C5.80478 14.8249 4.70563 13.6208 3.98923 12.4168C4.70563 11.2132 5.80478 10.0091 7.049 9.11182H9.45206C8.63174 9.60674 7.81664 10.2413 7.09844 10.9675C6.68478 11.3835 6.27058 11.8225 5.92792 12.2685V12.2697C5.89556 12.3102 5.87579 12.3605 5.87579 12.4163C5.87579 12.4718 5.89556 12.5223 5.92792 12.5626V12.5655Z" fill="white"/>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_sa0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 1.43051e-06) rotate(135) scale(33.9411)">
                          <stop stopColor="#28BBBB"/>
                          <stop offset="1" stopColor="#B627A1"/>
                        </radialGradient>
                        <clipPath id="clip0_sa0">
                          <rect width="16" height="6.83146" fill="white" transform="translate(4 9)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="flex-1 -mt-3">
                      <div className="rounded-lg p-4 bg-white">
                        <p className="text-base text-gray-800 leading-7">I can help you create a <strong>Spike Alert</strong> for <strong>Cybercore Battery</strong> — that is a new key term driving this insight.</p>
                      </div>
                    </div>
                  </div>

                  {/* Spike Alert Form */}
                  <div className="bg-white border border-gray-300 p-5 flex flex-col gap-6" style={{borderRadius: '4px'}}>

                    {/* Searches */}
                    <div>
                      <h3 className="text-base font-bold mb-0.5">1. Select Searches</h3>
                      <p className="text-sm text-gray-500 mb-3">We'll create a basic search to help set up this alert</p>
                      <div className="border border-gray-300 px-4 py-3 flex items-center justify-between" style={{borderRadius: '4px'}}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#DCFCE7'}}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 12L6 7.5L9 10L13.5 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M11 5H13.5V7.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Cybercore Battery</p>
                            <p className="text-xs text-gray-400">Standard search</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1.5 text-sm font-medium" style={{color:'#2A9E9F'}}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            View Spike history
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sensitivity */}
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-base font-bold">2. Select Sensitivity</h3>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Customize how often you receive alerts based on spikes in your search volume</p>
                      <fieldset className="border border-gray-300 px-4 cursor-pointer hover:border-gray-400 transition-colors" style={{borderRadius: '4px', paddingTop: '2px', paddingBottom: '12px'}}>
                        <legend className="text-xs text-gray-500 px-1" style={{marginLeft: '-3px'}}>Sensitivity level</legend>
                        <div className="flex items-center justify-between" style={{paddingTop: '8px'}}>
                          <span className="text-base text-gray-800">Balanced Alerts (recommended)</span>
                          <svg className="flex-shrink-0 ml-2" width="10" height="6" viewBox="0 0 10 6" fill="currentColor" style={{color:'#6B7280'}}>
                            <path d="M0 0l5 6 5-6z"/>
                          </svg>
                        </div>
                      </fieldset>
                    </div>

                    {/* Recipients */}
                    <div>
                      <h3 className="text-base font-bold mb-0.5">3. Select Recipients</h3>
                      <p className="text-sm text-gray-500 mb-3">Send alerts to the following people</p>
                      <div className="flex items-center justify-between border border-gray-300 px-4 py-3" style={{borderRadius: '4px'}}>
                        <span className="text-sm text-gray-400">Search by name or enter an email address</span>
                        <svg className="flex-shrink-0 ml-2" width="10" height="6" viewBox="0 0 10 6" fill="currentColor" style={{color:'#6B7280'}}>
                          <path d="M0 0l5 6 5-6z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Delivery Method */}
                    <div>
                      <h3 className="text-base font-bold mb-0.5">4. Select Delivery Method</h3>
                      <p className="text-sm text-gray-500 mb-4">How would you like to receive alerts?</p>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Standard</p>
                      <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 cursor-pointer" />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 cursor-pointer" />
                          <span className="text-sm text-gray-700">Meltwater web</span>
                        </label>
                      </div>
                    </div>

                    {/* Create Spike Alert Button */}
                    <button className="w-full py-2.5 text-sm font-semibold text-white transition-colors" style={{background: 'linear-gradient(to right, #8B49A0, #497C9F)', borderRadius: '4px'}}>
                      Create Spike Alert
                    </button>

                  </div>
                </div>
              </>
            ) : panelView === 'journalists' ? (
              <>
                {/* Journalists View */}
                <div className="flex flex-col gap-4">
                  {/* Mira Message */}
                  <div className="flex gap-2 items-start">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <rect width="24" height="24" rx="12" fill="url(#paint0_radial_j0)"/>
                      <g clipPath="url(#clip0_j0)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0158 9.11182C13.8413 9.11182 15.3214 10.591 15.3214 12.4168C15.3214 14.2424 13.8413 15.722 12.0158 15.722C10.1899 15.722 8.71066 14.2424 8.71066 12.4168C8.71066 10.591 10.1899 9.11182 12.0158 9.11182ZM12.0158 13.8334C12.7982 13.8334 13.4326 13.1995 13.4326 12.4168C13.4326 11.6344 12.7982 11.0005 12.0158 11.0005C11.2331 11.0005 10.5997 11.6344 10.5997 12.4168C10.5997 13.1995 11.2331 13.8334 12.0158 13.8334ZM18.1039 12.5655C17.7611 13.0113 17.3472 13.4505 16.9336 13.8665C16.215 14.5926 15.4003 15.2271 14.58 15.722H16.983C18.2271 14.8249 19.326 13.6208 20.0428 12.4168C19.326 11.2132 18.2271 10.0091 16.983 9.11182H14.58C15.4003 9.60674 16.215 10.2413 16.9336 10.9675C17.3472 11.3835 17.7611 11.8225 18.1039 12.2685V12.2697C18.1363 12.3102 18.1562 12.3605 18.1562 12.4163C18.1562 12.4718 18.1363 12.5223 18.1039 12.5626V12.5655ZM5.92792 12.5655C6.27058 13.0113 6.68478 13.4505 7.09844 13.8665C7.81664 14.5926 8.63174 15.2271 9.45206 15.722H7.049C5.80478 14.8249 4.70563 13.6208 3.98923 12.4168C4.70563 11.2132 5.80478 10.0091 7.049 9.11182H9.45206C8.63174 9.60674 7.81664 10.2413 7.09844 10.9675C6.68478 11.3835 6.27058 11.8225 5.92792 12.2685V12.2697C5.89556 12.3102 5.87579 12.3605 5.87579 12.4163C5.87579 12.4718 5.89556 12.5223 5.92792 12.5626V12.5655Z" fill="white"/>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_j0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 1.43051e-06) rotate(135) scale(33.9411)">
                          <stop stopColor="#28BBBB"/>
                          <stop offset="1" stopColor="#B627A1"/>
                        </radialGradient>
                        <clipPath id="clip0_j0">
                          <rect width="16" height="6.83146" fill="white" transform="translate(4 9)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="flex-1 -mt-3">
                      <div className="rounded-lg p-4 bg-white">
                        <p className="text-base text-gray-800 leading-7">Here are journalists driving this <strong>cybercore battery</strong> insight over the past 24 hours.</p>
                      </div>
                    </div>
                  </div>

                  {/* Journalist Cards */}
                  {[
                    {
                      initials: 'LF', bg: '#4B5563', name: 'Leonardo Fitzgerald',
                      location: 'New York',
                      socials: ['linkedin', 'x'],
                      bio: 'Their social media presence amplifies news and increases potential coverage',
                      tags: ['General News & Wire Services', 'Sky News Regional']
                    },
                    {
                      initials: 'IR', bg: '#B45309', name: 'Isabella Ramirez',
                      location: 'New York',
                      socials: ['linkedin', 'x', 'instagram', 'pinterest', 'tiktok'],
                      bio: 'Their reporting style engages readers and generates high audience interaction and reach',
                      tags: ['SportsFan portal and apps', 'Social Media Influencers']
                    },
                    {
                      initials: 'BC', bg: '#6B7280', name: 'Benjamin Callahan',
                      location: 'Washington',
                      socials: ['linkedin', 'instagram', 'tiktok'],
                      bio: 'Their recent articles closely align with our industry, ensuring our news will reach a relevant and engaged audience interested in our sector',
                      tags: ['Trading Post', 'National Business Media Contacts']
                    },
                    {
                      initials: 'SP', bg: '#0F766E', name: 'Sophia Park',
                      location: 'San Francisco',
                      socials: ['linkedin', 'x', 'instagram'],
                      bio: 'Covers clean energy and EV markets with a strong following in tech and finance communities, driving significant referral traffic',
                      tags: ['Tech & Innovation', 'EV Industry Weekly']
                    },
                    {
                      initials: 'MR', bg: '#7C3AED', name: 'Marcus Reynolds',
                      location: 'Austin',
                      socials: ['linkedin', 'x', 'tiktok'],
                      bio: 'Their automotive beat reaches a highly engaged audience of early adopters and industry analysts across multiple platforms',
                      tags: ['Automotive Press', 'Consumer Technology Review']
                    }
                  ].map((j, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 relative">
                      {/* Add to list button */}
                      <div className="absolute top-3 right-3" data-journalist-panel-menu>
                        <div className="relative group">
                          <button
                            className="journalist-plus-btn w-7 h-7 rounded-full border flex items-center justify-center transition-colors cursor-pointer"
                            style={journalistPanelMenuIdx === idx ? {backgroundColor:'#007264', borderColor:'#007264'} : {borderColor:'#111827'}}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor='#007264'; e.currentTarget.style.borderColor='#007264'; }}
                            onMouseLeave={e => { if(journalistPanelMenuIdx !== idx){ e.currentTarget.style.backgroundColor=''; e.currentTarget.style.borderColor='#111827'; } }}
                            onClick={() => setJournalistPanelMenuIdx(journalistPanelMenuIdx === idx ? null : idx)}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke={journalistPanelMenuIdx === idx ? 'white' : '#111827'} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          {journalistPanelMenuIdx !== idx && (
                            <div className="absolute right-0 top-8 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              Add journalist to media list or author list
                            </div>
                          )}
                          {journalistPanelMenuIdx === idx && (
                            <div className="absolute right-0 mt-1 top-8 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                              <button
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setJournalistPanelMenuIdx(null)}
                              >
                                Add {j.name} to Media List
                              </button>
                              <button
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setJournalistPanelMenuIdx(null)}
                              >
                                Add {j.name} to Author List
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Header row */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm" style={{backgroundColor: j.bg}}>{j.initials}</div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="journalist-name-link font-bold text-base cursor-pointer">{j.name}</span>
                            {j.socials.includes('linkedin') && (
                              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{backgroundColor:'#0077B5', fontSize:'9px'}}>in</span>
                            )}
                            {j.socials.includes('x') && (
                              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{backgroundColor:'#000', fontSize:'10px'}}>𝕏</span>
                            )}
                            {j.socials.includes('instagram') && (
                              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{backgroundColor:'#C13584', fontSize:'10px'}}>◎</span>
                            )}
                            {j.socials.includes('pinterest') && (
                              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{backgroundColor:'#E60023', fontSize:'11px'}}>P</span>
                            )}
                            {j.socials.includes('tiktok') && (
                              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{backgroundColor:'#010101', fontSize:'10px'}}>♪</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">{j.location}</p>
                        </div>
                      </div>
                      {/* Bio */}
                      <p className="text-sm text-gray-800 mb-3 leading-5">{j.bio}</p>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {j.tags.map((tag, ti) => (
                          <span key={ti} className="px-3 py-1 text-xs font-semibold text-gray-700 rounded-full" style={{border:'1.5px dashed #9CA3AF'}}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Chat View - Expanded Insight */}
                <div className="flex flex-col gap-4">
                  {/* Mira Message 1 */}
                  <div className="flex gap-2 items-start">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <rect width="24" height="24" rx="12" fill="url(#paint0_radial_msg1)"/>
                      <g clipPath="url(#clip0_msg1)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0158 9.11182C13.8413 9.11182 15.3214 10.591 15.3214 12.4168C15.3214 14.2424 13.8413 15.722 12.0158 15.722C10.1899 15.722 8.71066 14.2424 8.71066 12.4168C8.71066 10.591 10.1899 9.11182 12.0158 9.11182ZM12.0158 13.8334C12.7982 13.8334 13.4326 13.1995 13.4326 12.4168C13.4326 11.6344 12.7982 11.0005 12.0158 11.0005C11.2331 11.0005 10.5997 11.6344 10.5997 12.4168C10.5997 13.1995 11.2331 13.8334 12.0158 13.8334ZM18.1039 12.5655C17.7611 13.0113 17.3472 13.4505 16.9336 13.8665C16.215 14.5926 15.4003 15.2271 14.58 15.722H16.983C18.2271 14.8249 19.326 13.6208 20.0428 12.4168C19.326 11.2132 18.2271 10.0091 16.983 9.11182H14.58C15.4003 9.60674 16.215 10.2413 16.9336 10.9675C17.3472 11.3835 17.7611 11.8225 18.1039 12.2685V12.2697C18.1363 12.3102 18.1562 12.3605 18.1562 12.4163C18.1562 12.4718 18.1363 12.5223 18.1039 12.5626V12.5655ZM5.92792 12.5655C6.27058 13.0113 6.68478 13.4505 7.09844 13.8665C7.81664 14.5926 8.63174 15.2271 9.45206 15.722H7.049C5.80478 14.8249 4.70563 13.6208 3.98923 12.4168C4.70563 11.2132 5.80478 10.0091 7.049 9.11182H9.45206C8.63174 9.60674 7.81664 10.2413 7.09844 10.9675C6.68478 11.3835 6.27058 11.8225 5.92792 12.2685V12.2697C5.89556 12.3102 5.87579 12.3605 5.87579 12.4163C5.87579 12.4718 5.89556 12.5223 5.92792 12.5626V12.5655Z" fill="white"/>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_msg1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 1.43051e-06) rotate(135) scale(33.9411)">
                          <stop stopColor="#28BBBB"/>
                          <stop offset="1" stopColor="#B627A1"/>
                        </radialGradient>
                        <clipPath id="clip0_msg1">
                          <rect width="16" height="6.83146" fill="white" transform="translate(4 9)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="flex-1 -mt-3">
                      <div className="rounded-lg p-4 bg-white">
                        <p className="text-base text-gray-800 leading-8">I've expanded this insight. Here's more on Tesla's sentiment.</p>
                      </div>
                    </div>
                  </div>

                  {/* Mira Message 2 - Expanded Insight */}
                  <div className="flex gap-2 items-start">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <rect width="24" height="24" rx="12" fill="url(#paint0_radial_msg2)"/>
                      <g clipPath="url(#clip0_msg2)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0158 9.11182C13.8413 9.11182 15.3214 10.591 15.3214 12.4168C15.3214 14.2424 13.8413 15.722 12.0158 15.722C10.1899 15.722 8.71066 14.2424 8.71066 12.4168C8.71066 10.591 10.1899 9.11182 12.0158 9.11182ZM12.0158 13.8334C12.7982 13.8334 13.4326 13.1995 13.4326 12.4168C13.4326 11.6344 12.7982 11.0005 12.0158 11.0005C11.2331 11.0005 10.5997 11.6344 10.5997 12.4168C10.5997 13.1995 11.2331 13.8334 12.0158 13.8334ZM18.1039 12.5655C17.7611 13.0113 17.3472 13.4505 16.9336 13.8665C16.215 14.5926 15.4003 15.2271 14.58 15.722H16.983C18.2271 14.8249 19.326 13.6208 20.0428 12.4168C19.326 11.2132 18.2271 10.0091 16.983 9.11182H14.58C15.4003 9.60674 16.215 10.2413 16.9336 10.9675C17.3472 11.3835 17.7611 11.8225 18.1039 12.2685V12.2697C18.1363 12.3102 18.1562 12.3605 18.1562 12.4163C18.1562 12.4718 18.1363 12.5223 18.1039 12.5626V12.5655ZM5.92792 12.5655C6.27058 13.0113 6.68478 13.4505 7.09844 13.8665C7.81664 14.5926 8.63174 15.2271 9.45206 15.722H7.049C5.80478 14.8249 4.70563 13.6208 3.98923 12.4168C4.70563 11.2132 5.80478 10.0091 7.049 9.11182H9.45206C8.63174 9.60674 7.81664 10.2413 7.09844 10.9675C6.68478 11.3835 6.27058 11.8225 5.92792 12.2685V12.2697C5.89556 12.3102 5.87579 12.3605 5.87579 12.4163C5.87579 12.4718 5.89556 12.5223 5.92792 12.5626V12.5655Z" fill="white"/>
                      </g>
                      <defs>
                        <radialGradient id="paint0_radial_msg2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 1.43051e-06) rotate(135) scale(33.9411)">
                          <stop stopColor="#28BBBB"/>
                          <stop offset="1" stopColor="#B627A1"/>
                        </radialGradient>
                        <clipPath id="clip0_msg2">
                          <rect width="16" height="6.83146" fill="white" transform="translate(4 9)"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="flex-1 -mt-3">
                      <div className="rounded-lg p-4 bg-white">
                        <h4 className="font-semibold text-base mb-3 leading-8">New Cybercore battery announcement</h4>
                        <p className="text-base text-gray-700 mb-4 leading-6">Analysts are split: many rate the stock a Buy with aggressive AI/robotics upside targets, while a sizable group still has Hold/Sell ratings, producing an overall "Hold" consensus.</p>
                        <p className="text-base text-gray-700 mb-4 leading-6">Recent notes describe Tesla as transitioning from carmaker to AI/robotics platform, which excites bulls but reinforces the "high expectation, high risk" narrative.</p>
                        
                        <h4 className="font-semibold text-base mb-3 mt-4 leading-8">Price action and momentum</h4>
                        <p className="text-base text-gray-700 mb-4 leading-6">The stock recently pulled back more than 10–25% from record highs but has started to rebound, with some coverage framing the move as consolidation rather than structural weakness.</p>
                        <p className="text-base text-gray-700 mb-4 leading-6">Dip‑buying and raised price targets signal returning confidence, though volatility remains elevated and near‑term trading sentiment is cautious rather than euphoric.</p>
                        
                        <h4 className="font-semibold text-base mb-3 mt-4 leading-8">Narrative around autonomy and AI</h4>
                        <p className="text-base text-gray-700 mb-4 leading-6">Enthusiasm centers on autonomy, robotaxis, and the Optimus robot, which are seen as key drivers of a potential multi‑trillion‑dollar valuation over the next few years.</p>
                        <p className="text-base text-gray-700 mb-4 leading-6">Musk's warnings about "agonizingly slow" early rollouts are interpreted more as realism than a red flag, so they have not significantly damaged sentiment.</p>
                        
                        <h4 className="font-semibold text-base mb-3 mt-4 leading-8">Key risks weighing on sentiment</h4>
                        <p className="text-base text-gray-700 mb-4 leading-6">Concerns persist about slowing EV demand, competition (especially from Chinese automakers), and whether current price levels already discount much of the AI/robotics story.</p>
                        <p className="text-base text-gray-700 mb-4 leading-6">This creates a polarized backdrop where bulls view dips as buying opportunities while bears see an overvalued, volatile stock tied closely to execution risk and macro headlines.</p>

                        <button className="mt-2 mb-4 py-2.5 text-sm font-semibold text-white transition-colors block" style={{background: 'linear-gradient(to right, #8B49A0, #497C9F)', borderRadius: '4px', width: '100%', textAlign: 'center'}}>
                          Create Search for Cybercore battery
                        </button>

                        {/* Rating SVG */}
                        <svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-2">
                          <path d="M18 10.3833C18.3 10.3833 18.575 10.5083 18.825 10.7583C19.075 11.0083 19.2 11.2833 19.2 11.5833V12.5333C19.2 12.6222 19.1917 12.7055 19.175 12.7833C19.1583 12.8611 19.1333 12.9333 19.1 13L17.1167 17.65C17.0167 17.8833 16.8305 18.0667 16.5583 18.2C16.2861 18.3333 16.0222 18.4 15.7667 18.4L8.39999 18.3833V10.3833L12.3 6.48332C12.5111 6.27221 12.7528 6.1361 13.025 6.07499C13.2972 6.01388 13.5417 6.04443 13.7583 6.16666C13.975 6.28888 14.1139 6.4861 14.175 6.75832C14.2361 7.03054 14.2333 7.32777 14.1667 7.64999L13.6 10.3833H18ZM9.59999 10.8833V17.1833H16L18 12.5333V11.5833H12.1333L12.95 7.54999L9.59999 10.8833ZM5.99999 18.3833C5.65554 18.3833 5.36943 18.2658 5.14165 18.0308C4.91388 17.7958 4.79999 17.5133 4.79999 17.1833V11.5833C4.79999 11.2533 4.91388 10.9708 5.14165 10.7358C5.36943 10.5008 5.65554 10.3833 5.99999 10.3833H8.39999V11.5833H5.99999V17.1833H8.39999V18.3833H5.99999Z" fill="#616161"/>
                          <path d="M46 14.061C46.3 14.061 46.575 13.936 46.825 13.686C47.075 13.436 47.2 13.161 47.2 12.861V11.911C47.2 11.8221 47.1917 11.7388 47.175 11.661C47.1583 11.5832 47.1333 11.511 47.1 11.4443L45.1167 6.79435C45.0167 6.56101 44.8305 6.37768 44.5583 6.24435C44.2861 6.11101 44.0222 6.04435 43.7667 6.04435L36.4 6.06101V14.061L40.3 17.961C40.5111 18.1721 40.7528 18.3082 41.025 18.3693C41.2972 18.4305 41.5417 18.3999 41.7583 18.2777C41.975 18.1555 42.1139 17.9582 42.175 17.686C42.2361 17.4138 42.2333 17.1166 42.1667 16.7943L41.6 14.061H46ZM37.6 13.561V7.26101H44L46 11.911V12.861H40.1333L40.95 16.8943L37.6 13.561ZM34 6.06101C33.6555 6.06101 33.3694 6.17851 33.1417 6.41351C32.9139 6.64851 32.8 6.93101 32.8 7.26101V12.861C32.8 13.191 32.9139 13.4735 33.1417 13.7085C33.3694 13.9435 33.6555 14.061 34 14.061H36.4V12.861H34V7.26101H36.4V6.06101H34Z" fill="#616161"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Chat Input - Show in chat, journalists, and spikeAlert views */}
          {(panelView === 'chat' || panelView === 'journalists' || panelView === 'spikeAlert') && (
            <div className="p-6">
              <div className="relative">
                <textarea
                  placeholder="Enter any adjustments you would like to make"
                  rows="1"
                  onFocus={handleChatInputFocus}
                  onBlur={handleChatInputBlur}
                  className="w-full px-4 py-4 pr-12 text-base border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-teal-500 transition-colors resize-none align-top"
                  style={{ minHeight: '64px' }}
                />
                <button className={`absolute right-3 top-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${chatInputFocused ? 'bg-teal-500' : 'bg-gray-200'}`}>
                  <svg className={`w-4 h-4 transition-colors ${chatInputFocused ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Export with display name for better debugging
MeltwaterHomepage.displayName = 'MeltwaterHomepage';