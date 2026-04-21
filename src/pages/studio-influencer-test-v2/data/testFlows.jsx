import { Box, Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import ChatMessage from '../components/ChatMessage'
import ToolInvocationCard from '../components/ToolInvocationCard'
import {
  SocialStatsCard,
  PodcasterCard,
  LocationCard,
  JournalistRowCard,
  CompactRowCard,
} from '../components/cards'
import { MOCK_JOURNALISTS } from './mockJournalists'

export const TEST_FLOWS = [
  // AC1 - Search Flows
  {
    id: 'ac1-name',
    category: 'AC1',
    title: 'Search by Name',
    description: 'User searches for a specific journalist by name',
    userQuery: 'Find me Sarah Chen',
    render: () => (
      <>
        <ChatMessage role="user">Show me socials for tech influencer, Sarah Chen</ChatMessage>
        <ChatMessage role="assistant">
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={3}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I found Sarah Chen, a tech journalist at TechCrunch covering AI and enterprise software. She has 45K followers on X and is based in San Francisco.
          </Typography>
          <SocialStatsCard data={MOCK_JOURNALISTS.sarahChen} />
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Would you like to see her recent articles or contact details?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-topic',
    category: 'AC1',
    title: 'Search by Recent Content (Topic)',
    description: 'User searches for journalists covering a specific topic',
    userQuery: "Who's been writing about climate tech lately?",
    render: () => (
      <>
        <ChatMessage role="user">Who's been writing about climate tech lately?</ChatMessage>
        <ChatMessage role="assistant">
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={5}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here are 3 journalists who've recently covered climate tech:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>1. Marcus Webb</strong> – Published "The Rise of Carbon Capture Startups" 2 days ago (Forbes)
              </Typography>
              <PodcasterCard data={MOCK_JOURNALISTS.marcusWebb} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>2. Priya Sharma</strong> – Wrote about EV battery recycling last week (Bloomberg Green)
              </Typography>
              <PodcasterCard data={MOCK_JOURNALISTS.priyaSharma} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>3. Tom Eriksson</strong> – Covers cleantech funding for Sifted, 4 articles this month
              </Typography>
              <PodcasterCard data={MOCK_JOURNALISTS.tomEriksson} />
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to pull up more details on any of them?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-location',
    category: 'AC1',
    title: 'Search by Metadata (Location)',
    description: 'User searches for influencers in a specific location',
    userQuery: 'Show me influencers based in London',
    render: () => (
      <>
        <ChatMessage role="user">Show me influencers based in London</ChatMessage>
        <ChatMessage role="assistant">
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={12}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Found 12 influencers based in London. Here are the top 3 by follower count:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <LocationCard data={{ ...MOCK_JOURNALISTS.jamesOkonkwo, articleCount: 34 }} />
            <LocationCard data={{ ...MOCK_JOURNALISTS.chloeMartin, articleCount: 28 }} />
            <LocationCard data={{ ...MOCK_JOURNALISTS.devPatel, articleCount: 19 }} />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Would you like to filter by industry or platform?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-multiple',
    category: 'AC1',
    title: 'Search by Multiple Criteria',
    description: 'User combines location and topic filters',
    userQuery: 'Find journalists in Berlin who cover fintech',
    render: () => (
      <>
        <ChatMessage role="user">Find journalists in Berlin who cover fintech</ChatMessage>
        <ChatMessage role="assistant">
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={4}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Sure, I found 4 fintech journalists based in Berlin for you:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <JournalistRowCard data={MOCK_JOURNALISTS.lenaFischer} />
            <JournalistRowCard data={MOCK_JOURNALISTS.kaiMueller} />
            <JournalistRowCard data={MOCK_JOURNALISTS.sofiaBergmann} />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to add any other filters, like follower count or recent activity?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-no-results',
    category: 'AC1',
    title: 'No Results Handling',
    description: 'User searches for someone with no exact match',
    userQuery: 'Find me John Smith who writes about quantum computing',
    render: () => (
      <>
        <ChatMessage role="user">Find me John Smith who writes about quantum computing</ChatMessage>
        <ChatMessage role="assistant">
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={0}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Hmm, I found a few "John Smiths" but none that match quantum computing specifically. Could you help me narrow it down? Maybe you know:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">The publication they write for?</Typography></li>
            <li><Typography variant="body2">Their location or social handle?</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Alternatively, I can show you other journalists covering quantum computing if that helps!
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  // AC2 - Channel Flows
  {
    id: 'ac2-channel',
    category: 'AC2',
    title: 'Listed By Channel',
    description: 'User requests journalists on a specific platform',
    userQuery: 'Show me tech journalists on LinkedIn',
    render: () => (
      <>
        <ChatMessage role="user">Show me tech journalists on LinkedIn</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here are tech journalists active on <strong>LinkedIn</strong>:
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Followers</TableCell>
                  <TableCell>Recent Post</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link href="#" underline="hover">Sarah Chen</Link>
                  </TableCell>
                  <TableCell>12K</TableCell>
                  <TableCell>Why AI agents are the next platform shift</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link href="#" underline="hover">Marcus Webb</Link>
                  </TableCell>
                  <TableCell>8K</TableCell>
                  <TableCell>5 climate startups to watch in 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link href="#" underline="hover">Priya Sharma</Link>
                  </TableCell>
                  <TableCell>6K</TableCell>
                  <TableCell>The death of the traditional power grid</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want to see journalists on a different channel like Twitter or Substack?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac2-compare',
    category: 'AC2',
    title: 'Compare Across Channels',
    description: 'User asks where a journalist is most active',
    userQuery: 'Where is Marcus Webb most active?',
    render: () => (
      <>
        <ChatMessage role="user">Where is Marcus Webb most active?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Marcus Webb is on a few platforms, here's the breakdown:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Twitter:</strong> 34K followers, posts 2-3x daily</Typography></li>
            <li><Typography variant="body2"><strong>LinkedIn:</strong> 8K followers, posts weekly (longer thought leadership pieces)</Typography></li>
            <li><Typography variant="body2"><strong>Substack:</strong> 2.1K subscribers, monthly newsletter</Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Looks like Twitter is his go-to for quick takes, while LinkedIn is where he shares deeper analysis.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to pull his recent content from any of these?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  // Edge Cases
  {
    id: 'edge-fuzzy',
    category: 'Edge',
    title: 'Fuzzy Match with Misspelled Name',
    description: 'User misspells a name and system suggests corrections',
    userQuery: 'Find me Sara Chen',
    render: () => (
      <>
        <ChatMessage role="user">Find me Sara Chen</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Did you mean <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>Sarah Chen</Link> from TechCrunch? I also found a <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>Sara Cheng</Link> who covers healthcare at STAT News.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Let me know which one you're looking for!
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-too-many',
    category: 'Edge',
    title: 'Too Many Results',
    description: 'Query returns too many results, system asks for refinement',
    userQuery: 'Show me journalists who cover startups',
    render: () => (
      <>
        <ChatMessage role="user">Show me journalists who cover startups</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            That's a popular beat – I found 200+ journalists covering startups! To give you the most relevant results, could you narrow it down a bit?
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Any specific region? (e.g., US, Europe, APAC)</Typography></li>
            <li><Typography variant="body2">A particular stage? (e.g., seed, Series A, late-stage)</Typography></li>
            <li><Typography variant="body2">Industry focus? (e.g., fintech, health, SaaS)</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-wrong-channel',
    category: 'Edge',
    title: 'Person Not on Requested Channel',
    description: 'User asks for journalist on a platform they are not active on',
    userQuery: 'Show me Sarah Chen on TikTok',
    render: () => (
      <>
        <ChatMessage role="user">Show me Sarah Chen on TikTok</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            It looks like Sarah Chen isn't active on TikTok – but she does have a strong presence on <strong>Twitter</strong> (45K followers) and <strong>LinkedIn</strong> (13K).
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Would either of those work for you?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-ambiguous',
    category: 'Edge',
    title: 'Ambiguous Query',
    description: 'User asks a vague question that needs clarification',
    userQuery: "Who's popular right now?",
    render: () => (
      <>
        <ChatMessage role="user">Who's popular right now?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            I'd love to help – could you give me a bit more context? Are you looking for:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Journalists trending in a specific topic?</Typography></li>
            <li><Typography variant="body2">Influencers with the fastest-growing followings?</Typography></li>
            <li><Typography variant="body2">People with the most engagement this week?</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-no-contact',
    category: 'Edge',
    title: 'Contact Info Unavailable',
    description: 'User asks for email but its not available',
    userQuery: "What's Priya Sharma's email?",
    render: () => (
      <>
        <ChatMessage role="user">What's Priya Sharma's email?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Unfortunately, I don't have Priya Sharma's email on file (she keeps that private). I can give you her <Link href="#" underline="hover">Twitter DMs</Link> (open) or her <Link href="#" underline="hover">LinkedIn profile</Link> if you'd like to reach out there instead.
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-stale',
    category: 'Edge',
    title: 'Stale/Outdated Profile',
    description: 'Journalist has changed roles or publications',
    userQuery: 'Find me Jake Morrison at The Verge',
    render: () => (
      <>
        <ChatMessage role="user">Find me Jake Morrison at The Verge</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            I found Jake Morrison, but heads up – it looks like he left The Verge about 3 months ago. According to recent activity, he's now freelancing and publishing on Substack.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to pull up his current profile?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-inactive',
    category: 'Edge',
    title: 'Inactive/Dormant Profile',
    description: 'Journalist hasnt posted in a while',
    userQuery: 'Find me Rachel Torres',
    render: () => (
      <>
        <ChatMessage role="user">Find me Rachel Torres</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            I found <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>Rachel Torres</Link>; she used to cover crypto for CoinDesk. Just a heads up though, her last post was about 8 months ago and her accounts have been pretty quiet since.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Would you still like her details, or should I suggest some active journalists in that space instead?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-time-based',
    category: 'Edge',
    title: 'Time-Based Query',
    description: 'User asks about coverage from a specific time period',
    userQuery: 'Who covered the OpenAI drama back in November?',
    render: () => (
      <>
        <ChatMessage role="user">Who covered the OpenAI drama back in November?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Ah, that was a wild news cycle! Here are a few journalists who were all over it:
          </Typography>
          <Box component="ol" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Kara Swisher</strong> – Broke several insider scoops on Twitter/X</Typography></li>
            <li><Typography variant="body2"><strong>Will Knight</strong> – Wrote a detailed timeline piece for WIRED</Typography></li>
            <li><Typography variant="body2"><strong>Casey Newton</strong> – Covered the fallout extensively on Platformer</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-followup',
    category: 'Edge',
    title: 'Follow-Up on Previous Search',
    description: 'User refines a previous search',
    userQuery: 'Actually, go back to that London list – who covers healthcare?',
    render: () => (
      <>
        <ChatMessage role="user">Actually, go back to that London list – who covers healthcare?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Good call! From the London influencers I showed you earlier, here's who focuses on healthcare:
          </Typography>
          <Box component="ol" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Dr. Aisha Patel</strong> – NHS policy and digital health, 42K followers</Typography></li>
            <li><Typography variant="body2"><strong>Ben Hartley</strong> – Biotech investing, 28K followers</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The others were more fintech and lifestyle-focused. Want the full London list again with industry tags?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-duplicates',
    category: 'Edge',
    title: 'Duplicate Profiles',
    description: 'System finds multiple profiles that might be the same person',
    userQuery: "I'm seeing two Marcus Webbs – which is the real one?",
    render: () => (
      <>
        <ChatMessage role="user">I'm seeing two Marcus Webbs – which is the real one?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Good catch! There are indeed two profiles:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Marcus Webb (Verified)</strong> – Forbes contributor, 34K Twitter followers, consistent posting history</Typography></li>
            <li><Typography variant="body2"><strong>Marcus Webb</strong> – Smaller account, 1.2K followers, hasn't posted since 2022</Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            The first one is almost certainly who you're looking for. Want me to merge these or hide the inactive one from future searches?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-alternatives',
    category: 'Edge',
    title: 'Requesting Alternatives',
    description: 'User asks for similar journalists when one is unavailable',
    userQuery: "Sarah Chen isn't responding – who else covers AI like her?",
    render: () => (
      <>
        <ChatMessage role="user">Sarah Chen isn't responding – who else covers AI like her?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            No worries, here are a few journalists with similar beats and reach:
          </Typography>
          <Box component="ol" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Emily Zhang</strong> – VentureBeat, focuses on enterprise AI – very responsive to pitches</Typography></li>
            <li><Typography variant="body2"><strong>David Park</strong> – The Information, covers AI funding rounds</Typography></li>
            <li><Typography variant="body2"><strong>Nisha Patel</strong> – MIT Tech Review, more technical/research angle</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Any of these feel like a good fit? I can also filter by response rate if that helps.
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-conflicting',
    category: 'Edge',
    title: 'Conflicting Criteria',
    description: 'User provides criteria that contradict each other',
    userQuery: 'Show me micro-influencers with over 500K followers',
    render: () => (
      <>
        <ChatMessage role="user">Show me micro-influencers with over 500K followers</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Just checking – micro-influencers are typically defined as having under 100K followers, so 500K would put them in a different tier. Did you mean:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Micro-influencers</strong> (10K–100K followers)?</Typography></li>
            <li><Typography variant="body2"><strong>Mid-tier influencers</strong> (100K–500K)?</Typography></li>
            <li><Typography variant="body2"><strong>Macro-influencers</strong> (500K+)?</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-bulk',
    category: 'Edge',
    title: 'Bulk/Export Request',
    description: 'User asks to export a large list',
    userQuery: 'Can you give me all fintech journalists in a spreadsheet?',
    render: () => (
      <>
        <ChatMessage role="user">Can you give me all fintech journalists in a spreadsheet?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            I've got 87 fintech journalists on file. I can export them as a CSV with name, outlet, location, channels, and follower counts. Want me to:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Send the full list?</Typography></li>
            <li><Typography variant="body2">Filter it first (by region, follower count, etc.)?</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Just say the word and I'll have it ready for download.
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-credibility',
    category: 'Edge',
    title: 'Credibility/Verification Check',
    description: 'User asks if a journalist is legitimate',
    userQuery: 'Is James Okonkwo legit?',
    render: () => (
      <>
        <ChatMessage role="user">Is James Okonkwo legit?</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Good instinct to check! Here's what I've got on <strong>James Okonkwo</strong>:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Verified on Twitter and LinkedIn</Typography></li>
            <li><Typography variant="body2">Bylines at Forbes, Sifted, and City AM</Typography></li>
            <li><Typography variant="body2">Consistent posting history since 2019</Typography></li>
            <li><Typography variant="body2">Engagement looks organic (no red flags)</Typography></li>
          </Box>
          <Typography variant="body1">
            He checks out. Want a deeper breakdown of his audience demographics?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-regional',
    category: 'Edge',
    title: 'Non-English/Regional Content',
    description: 'User asks for journalists covering a non-English region',
    userQuery: 'Find journalists covering tech in Latin America',
    render: () => (
      <>
        <ChatMessage role="user">Find journalists covering tech in Latin America</ChatMessage>
        <ChatMessage role="assistant">
          <Typography variant="body1" sx={{ mb: 2 }}>
            Great region – lots happening there! Here are a few to start:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <CompactRowCard data={{ ...MOCK_JOURNALISTS.carolinaMejia, beats: ['Startups', 'Tech (Spanish/English)'] }} />
            <CompactRowCard data={{ ...MOCK_JOURNALISTS.lucasFerriera, beats: ['Fintech (Portuguese)'] }} />
            <CompactRowCard data={{ ...MOCK_JOURNALISTS.diegoOrozco, beats: ['VC funding', 'LATAM'] }} />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Should I filter by language or specific country?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
]
