import { Container } from '@mui/material'
import { Navigate } from 'react-router-dom'

// ============================================
// CORE PAGES
// ============================================
import HomePage from '../pages/HomePage'
import InsightsPage from '../pages/InsightsPage'
import DiscoverPage from '../pages/DiscoverPage'
import WorkspacePage from '../pages/WorkspacePage'
import HubPage from '../pages/HubPage'
import AutomationSetupPage from '../pages/AutomationSetupPage'
import ApiTokensPage from '../pages/ApiTokensPage'
import TokenDetailsPage from '../pages/TokenDetailsPage'
import UsersPage from '../pages/UsersPage'
import GenAILensPage from '../pages/GenAILensPage'
import GenAILensV2Page from '../pages/GenAILensV2Page'
import LayoutDemoPage from '../pages/LayoutDemoPage'
import DrawerTestPage from '../pages/DrawerTestPage'
import NewslettersPage from '../pages/NewslettersPage'
import ExplorePage from '../pages/ExplorePage'
import NewMwPage from '../pages/NewMwPage'
import MwHomePage from '../pages/MwHomePage'
import NewMwExplorePage from '../pages/NewMwExplorePage'
import NewMwMonitorPage from '../pages/NewMwMonitorPage'
import NewMwAnalyzePage from '../pages/NewMwAnalyzePage'
import NewMwNewslettersPage from '../pages/NewMwNewslettersPage'
import NewMwOutreachPage from '../pages/NewMwOutreachPage'
import AlertsFeedPage from '../pages/AlertsFeedPage'
import DigestCreatePage from '../pages/DigestCreatePage'
import DigestReportsPage from '../pages/DigestReportsPage'
import MwNewslettersPage from '../pages/MwNewslettersPage'
import MwNewslettersCreatePage from '../pages/MwNewslettersCreatePage'
import MwNewslettersEditorPage from '../pages/MwNewslettersEditorPage'
import MwNewslettersPreviewPage from '../pages/MwNewslettersPreviewPage'
import { MwNewslettersRecipientsPage, MwNewslettersRecipientDetailPage } from '../pages/MwNewslettersRecipientsPage'
import MwAlertsPage from '../pages/MwAlertsPage'
import MwAlertsV2Page from '../pages/MwAlertsV2Page'
import CreateTrackerPage from '../pages/CreateTrackerPage'
import MwAlertsStandalonePage from '../pages/MwAlertsStandalonePage'
import CreateAlertPage from '../pages/CreateAlertPage'
import MwDigestsPage from '../pages/MwDigestsPage'
import CreateDigestPage from '../pages/CreateDigestPage'
import MwNotificationsPage from '../pages/MwNotificationsPage'
import MwMonitorPage from '../pages/MwMonitorPage'
import MwMonitorViewsPage from '../pages/MwMonitorViewsPage'
import MwTrendsCenterPage from '../pages/MwTrendsCenterPage'

// ============================================
// SEATS PAGES (active prototyping)
// ============================================
// Note: V5-V9 archived - see src/pages/_archived/
import SeatsPageV2 from '../pages/SeatsPageV2'
import SeatsPageV10 from '../pages/SeatsPageV10'
import SeatsPageV10NoGroups from '../pages/SeatsPageV10NoGroups'
import CreateUserPageV10 from '../pages/CreateUserPageV10'
import UserDetailPageV10 from '../pages/UserDetailPageV10'
import RolesPageV10 from '../pages/RolesPageV10'
import WorkspacesPageV10 from '../pages/WorkspacesPageV10'
import GroupsPageV10 from '../pages/GroupsPageV10'
import AccountPageV10 from '../pages/AccountPageV10'

// ============================================
// STUDIO PAGES
// ============================================
// Note: StudioChatPage, V3, V6 archived - check git history if needed
import StudioPage from '../pages/StudioPage'
import StudioChatPageV4 from '../pages/StudioChatPageV4'
import StudioInfluencerTestPage from '../pages/StudioInfluencerTestPage'
import StudioInfluencerTestPageV2 from '../pages/studio-influencer-test-v2'
import ManageProjectsPage from '../pages/ManageProjectsPage'
import ProjectDetailsPage from '../pages/ProjectDetailsPage'
import ChatProgressionTestPage from '../pages/ChatProgressionTestPage'
import ViewAllHistoryPage from '../pages/ViewAllHistoryPage'
import RecurringPromptDetailsPage from '../pages/RecurringPromptDetailsPage'
import CreateRecurringPromptPage from '../pages/CreateRecurringPromptPage'
import PromptLibraryPage from '../pages/PromptLibraryPage'

// ============================================
// DS COLLECTION PAGES
// ============================================
import DSCollectionPage from '../pages/DSCollectionPage'
import MiraComponentsPage from '../pages/MiraComponentsPage'
import {
  MiraGradientBoxDetailPage,
  MiraPromptCardDetailPage,
  MiraChatInputDetailPage,
  MiraButtonDetailPage,
  MiraPromoBannerDetailPage,
  MiraSourceCardDetailPage,
  MiraFrostedToolbarDetailPage,
  MiraThinkingStateDetailPage,
  MiraActivityMessageDetailPage,
  MiraProgressStubDetailPage,
  MiraChatMessageDetailPage,
  MiraSourcesPanelDetailPage,
  MiraGradientTextDetailPage,
  MiraChipDetailPage,
  MiraStreamToolbarDetailPage,
  MiraAvatarDetailPage,
  MiraSuggestionChipDetailPage,
  MiraFeedbackButtonsDetailPage,
  MiraEmptyStateDetailPage,
} from '../pages/mira'
import ButtonDetailPage from '../pages/ButtonDetailPage'
import FabDetailPage from '../pages/FabDetailPage'
import TextFieldDetailPage from '../pages/TextFieldDetailPage'
import SelectDetailPage from '../pages/SelectDetailPage'
import CheckboxDetailPage from '../pages/CheckboxDetailPage'
import CheckboxGroupDetailPage from '../pages/CheckboxGroupDetailPage'
import RadioDetailPage from '../pages/RadioDetailPage'
import RadioGroupDetailPage from '../pages/RadioGroupDetailPage'
import SwitchDetailPage from '../pages/SwitchDetailPage'
import SliderDetailPage from '../pages/SliderDetailPage'
import RatingDetailPage from '../pages/RatingDetailPage'
import TypographyDetailPage from '../pages/TypographyDetailPage'
import PaletteDetailPage from '../pages/PaletteDetailPage'
import SpacingDetailPage from '../pages/SpacingDetailPage'
import ElevationDetailPage from '../pages/ElevationDetailPage'
import BreakpointsDetailPage from '../pages/BreakpointsDetailPage'
import AutocompleteDetailPage from '../pages/AutocompleteDetailPage'
import ChipDetailPage from '../pages/ChipDetailPage'
import IndicatorDetailPage from '../pages/IndicatorDetailPage'
import ToggleButtonDetailPage from '../pages/ToggleButtonDetailPage'
import FindDetailPage from '../pages/FindDetailPage'
import FileUploadDetailPage from '../pages/FileUploadDetailPage'
import DrawerDetailPage from '../pages/DrawerDetailPage'
import AccordionDetailPage from '../pages/AccordionDetailPage'
import CardDetailPage from '../pages/CardDetailPage'
import ProgressDetailPage from '../pages/ProgressDetailPage'
import TabsDetailPage from '../pages/TabsDetailPage'
import SnackbarDetailPage from '../pages/SnackbarDetailPage'
import AlertDetailPage from '../pages/AlertDetailPage'
import LinkDetailPage from '../pages/LinkDetailPage'
import DialogDetailPage from '../pages/DialogDetailPage'
import DividerDetailPage from '../pages/DividerDetailPage'
import BadgeDetailPage from '../pages/BadgeDetailPage'
import AvatarDetailPage from '../pages/AvatarDetailPage'
import TooltipDetailPage from '../pages/TooltipDetailPage'
import ListDetailPage from '../pages/ListDetailPage'
import TableDetailPage from '../pages/TableDetailPage'
import IconsDetailPage from '../pages/IconsDetailPage'
import PaginationDetailPage from '../pages/PaginationDetailPage'
import StepperDetailPage from '../pages/StepperDetailPage'
import TextareaAutosizeDetailPage from '../pages/TextareaAutosizeDetailPage'
import BreadcrumbsDetailPage from '../pages/BreadcrumbsDetailPage'
import ButtonGroupDetailPage from '../pages/ButtonGroupDetailPage'
import MenuDetailPage from '../pages/MenuDetailPage'
import PaperDetailPage from '../pages/PaperDetailPage'
import SpeedDialDetailPage from '../pages/SpeedDialDetailPage'
import BoxDetailPage from '../pages/BoxDetailPage'
import ContainerDetailPage from '../pages/ContainerDetailPage'
import GridDetailPage from '../pages/GridDetailPage'
import StackDetailPage from '../pages/StackDetailPage'
import AppBarDetailPage from '../pages/AppBarDetailPage'
import BottomNavigationDetailPage from '../pages/BottomNavigationDetailPage'
import PopoverDetailPage from '../pages/PopoverDetailPage'
import TreeListDetailPage from '../pages/TreeListDetailPage'
import EmptyStatePatternPage from '../pages/EmptyStatePatternPage'
import PageHeaderPatternPage from '../pages/PageHeaderPatternPage'
import FormLayoutPatternPage from '../pages/FormLayoutPatternPage'

// ============================================
// GETTING STARTED
// ============================================
import GettingStartedPage from '../pages/GettingStartedPage'
import GettingStartedOverviewPage from '../pages/GettingStartedOverviewPage'
import GettingStartedForDesignersPage from '../pages/GettingStartedForDesignersPage'
import GettingStartedForDevelopersPage from '../pages/GettingStartedForDevelopersPage'

// ============================================
// DESIGNING
// ============================================
import DesigningPage from '../pages/DesigningPage'
import DesigningGetStartedPage from '../pages/DesigningGetStartedPage'
import DesigningKitsPage from '../pages/DesigningKitsPage'
import DesigningPrinciplesPage from '../pages/DesigningPrinciplesPage'
import DesigningLayoutPage from '../pages/DesigningLayoutPage'

// ============================================
// DEVELOPING
// ============================================
import DevelopingPage from '../pages/DevelopingPage'
import DevelopingGetStartedPage from '../pages/DevelopingGetStartedPage'
import DevelopingReactPage from '../pages/DevelopingReactPage'
import DevelopingPatternsPage from '../pages/DevelopingPatternsPage'

// ============================================
// CONTENT GUIDELINES
// ============================================
import ContentPage from '../pages/ContentPage'
import ContentOverviewPage from '../pages/ContentOverviewPage'
import ContentWritingStylePage from '../pages/ContentWritingStylePage'
import ContentActionLabelsPage from '../pages/ContentActionLabelsPage'

// ============================================
// GUIDELINES (Accessibility, AI, Motion)
// ============================================
import GuidelinesPage from '../pages/GuidelinesPage'
import AccessibilityGuidelinePage from '../pages/AccessibilityGuidelinePage'
import AiPresenceGuidelinePage from '../pages/AiPresenceGuidelinePage'
import MotionGuidelinePage from '../pages/MotionGuidelinePage'

// ============================================
// UI PATTERNS (distinct from components)
// ============================================
import UIPatternsPage from '../pages/UIPatternsPage'

// ============================================
// TEMPLATES
// ============================================
import TemplatesPage from '../pages/TemplatesPage'
import DashboardTemplate from '../pages/templates/DashboardTemplate'
import AuthTemplate from '../pages/templates/AuthTemplate'
import EcommerceTemplate from '../pages/templates/EcommerceTemplate'
import BlogTemplate from '../pages/templates/BlogTemplate'
import SettingsTemplate from '../pages/templates/SettingsTemplate'
import DataTableTemplate from '../pages/templates/DataTableTemplate'
import OnboardingTemplate from '../pages/templates/OnboardingTemplate'
import OnboardingTemplateV2 from '../pages/templates/OnboardingTemplateV2'
import AnalyticsDashboardTemplate from '../pages/templates/AnalyticsDashboardTemplate'
import CollaborationHubTemplate from '../pages/templates/CollaborationHubTemplate'
import ReportingSystemTemplate from '../pages/templates/ReportingSystemTemplate'
import IntegrationMarketplaceTemplate from '../pages/templates/IntegrationMarketplaceTemplate'
import AuditLogTemplate from '../pages/templates/AuditLogTemplate'
import BulkDataTemplate from '../pages/templates/BulkDataTemplate'
import DocumentManagementTemplate from '../pages/templates/DocumentManagementTemplate'
import ApprovalWorkflowTemplate from '../pages/templates/ApprovalWorkflowTemplate'
import NotificationCenterTemplate from '../pages/templates/NotificationCenterTemplate'
import ActivityFeedTemplate from '../pages/templates/ActivityFeedTemplate'
import EmailCampaignTemplate from '../pages/templates/EmailCampaignTemplate'
import GoalTrackingTemplate from '../pages/templates/GoalTrackingTemplate'
import FormBuilderTemplate from '../pages/templates/FormBuilderTemplate'
import InventoryManagementTemplate from '../pages/templates/InventoryManagementTemplate'
import CustomerPortalTemplate from '../pages/templates/CustomerPortalTemplate'
import TeamDirectoryTemplate from '../pages/templates/TeamDirectoryTemplate'
import SubscriptionBillingTemplate from '../pages/templates/SubscriptionBillingTemplate'
import KnowledgeBaseTemplate from '../pages/templates/KnowledgeBaseTemplate'
import TimesheetTemplate from '../pages/templates/TimesheetTemplate'
import ResourceBookingTemplate from '../pages/templates/ResourceBookingTemplate'
import SurveyBuilderTemplate from '../pages/templates/SurveyBuilderTemplate'
import MultiTenantAdminTemplate from '../pages/templates/MultiTenantAdminTemplate'

// ============================================
// UXR PAGES
// ============================================
import CheckboxUXRLandingPage from '../pages/uxr/checkbox/CheckboxUXRLandingPage'
import CheckboxInteractivePage from '../pages/uxr/checkbox/CheckboxInteractivePage'
import CheckboxGuidedPage from '../pages/uxr/checkbox/CheckboxGuidedPage'

// ============================================
// ROUTE DEFINITIONS
// ============================================

// Core routes
export const coreRoutes = [
  { path: '/', element: () => <Navigate to="/mw-newsletters" replace /> },
  { path: '/insights', element: InsightsPage, props: ['chatOpen'] },
  { path: '/discover', element: DiscoverPage, props: ['chatOpen'] },
  { path: '/workspace', element: WorkspacePage, props: ['chatOpen'] },
  { path: '/hub', element: HubPage, props: ['chatOpen'] },
  { path: '/automation', element: AutomationSetupPage },
  { path: '/api-tokens', element: ApiTokensPage },
  {
    path: '/api-tokens/:tokenId',
    element: TokenDetailsPage,
    wrapper: (children) => (
      <Container maxWidth="lg" sx={{ flex: 1, py: 4, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Container>
    )
  },
  { path: '/users', element: UsersPage, props: ['chatOpen'] },
  { path: '/genai-lens', element: GenAILensPage, props: ['chatOpen'] },
  { path: '/genai-lens-v2', element: GenAILensV2Page },
  { path: '/layout-demo', element: LayoutDemoPage, props: ['chatOpen'] },
  { path: '/drawer-test', element: DrawerTestPage, props: ['chatOpen'] },
  { path: '/newsletters', element: NewslettersPage, props: ['chatOpen'] },
  { path: '/explore', element: ExplorePage },
  { path: '/newmw', element: NewMwPage },
  { path: '/mw-home', element: MwHomePage },
  { path: '/newmw/explore', element: NewMwExplorePage },
  { path: '/newmw/monitor', element: NewMwMonitorPage },
  { path: '/newmw/analyze', element: NewMwAnalyzePage },
  { path: '/newmw/newsletters', element: NewMwNewslettersPage },
  { path: '/newmw/outreach', element: NewMwOutreachPage },
  { path: '/alerts-feed', element: AlertsFeedPage },
  { path: '/digest-create', element: DigestCreatePage },
  { path: '/digest-reports', element: DigestReportsPage },
  { path: '/mw-newsletters', element: MwNewslettersPage },
  { path: '/mw-newsletters/create', element: MwNewslettersCreatePage },
  { path: '/mw-newsletters/editor/:id', element: MwNewslettersEditorPage },
  { path: '/mw-newsletters/preview/:seriesId', element: MwNewslettersPreviewPage },
  { path: '/mw-newsletters/recipients', element: MwNewslettersRecipientsPage },
  { path: '/mw-newsletters/recipients/:listId', element: MwNewslettersRecipientDetailPage },
  { path: '/mw-alerts', element: MwAlertsPage },
  { path: '/mw-alerts-v2', element: MwAlertsV2Page },
  { path: '/mw-alerts/create', element: CreateTrackerPage },
  { path: '/alerts', element: MwAlertsStandalonePage },
  { path: '/alerts/create', element: CreateAlertPage },
  { path: '/digests', element: MwDigestsPage },
  { path: '/digests/create', element: CreateDigestPage },
  { path: '/mw-notifications', element: MwNotificationsPage },
  { path: '/mw-monitor', element: MwMonitorPage },
  { path: '/mw-monitor/views/:viewId', element: MwMonitorViewsPage },
  { path: '/mw-monitor/trends', element: MwTrendsCenterPage },
]

// Seats routes (V5-V9 archived - see src/pages/_archived/)
export const seatsRoutes = [
  { path: '/seats-v2', element: SeatsPageV2, props: ['chatOpen'] },
  { path: '/account-v10', element: AccountPageV10, props: ['chatOpen'] },
  { path: '/seats-v10', element: SeatsPageV10, props: ['chatOpen'] },
  { path: '/seats-v10/users/new', element: CreateUserPageV10, props: ['chatOpen'] },
  { path: '/seats-v10/users/:userId', element: UserDetailPageV10, props: ['chatOpen'] },
  { path: '/seats-v10/roles', element: RolesPageV10, props: ['chatOpen'] },
  { path: '/seats-v10/workspaces', element: WorkspacesPageV10, props: ['chatOpen'] },
  { path: '/seats-v10/groups', element: GroupsPageV10, props: ['chatOpen'] },
  // No-Groups variant (limited feature set)
  { path: '/seats-v10-no-groups', element: SeatsPageV10NoGroups, props: ['chatOpen'] },
  { path: '/seats-v10-no-groups/users/new', element: CreateUserPageV10, props: ['chatOpen'], extraProps: { hideGroups: true } },
  { path: '/seats-v10-no-groups/users/:userId', element: UserDetailPageV10, props: ['chatOpen'], extraProps: { hideGroups: true } },
  { path: '/seats-v10-no-groups/roles', element: RolesPageV10, props: ['chatOpen'] },
  { path: '/seats-v10-no-groups/workspaces', element: WorkspacesPageV10, props: ['chatOpen'] },
]

// Studio routes
export const studioRoutes = [
  { path: '/studio', element: StudioPage, props: ['chatOpen'] },
  { path: '/studio/chat', element: StudioChatPageV4 },
  { path: '/studio/chat-progression', element: ChatProgressionTestPage },
  { path: '/studio/influencer-test', element: StudioInfluencerTestPage },
  { path: '/studio/influencer-test-v2', element: StudioInfluencerTestPageV2 },
  { path: '/studio/projects', element: ManageProjectsPage },
  { path: '/studio/projects/:projectId', element: ProjectDetailsPage },
  { path: '/studio/recurring/new', element: CreateRecurringPromptPage },
  { path: '/studio/recurring/:promptId', element: RecurringPromptDetailsPage },
  { path: '/studio/library', element: PromptLibraryPage },
  { path: '/history', element: ViewAllHistoryPage },
]

// DS Collection routes
export const dsCollectionRoutes = [
  { path: '/ds-collection', element: DSCollectionPage, props: ['mode', 'colorblindType'] },
  { path: '/mira-components', element: MiraComponentsPage },
  { path: '/mira-components/gradient-box', element: MiraGradientBoxDetailPage },
  { path: '/mira-components/prompt-card', element: MiraPromptCardDetailPage },
  { path: '/mira-components/chat-input', element: MiraChatInputDetailPage },
  { path: '/mira-components/button', element: MiraButtonDetailPage },
  { path: '/mira-components/promo-banner', element: MiraPromoBannerDetailPage },
  { path: '/mira-components/source-card', element: MiraSourceCardDetailPage },
  { path: '/mira-components/frosted-toolbar', element: MiraFrostedToolbarDetailPage },
  { path: '/mira-components/thinking-state', element: MiraThinkingStateDetailPage },
  { path: '/mira-components/activity-message', element: MiraActivityMessageDetailPage },
  { path: '/mira-components/progress-stub', element: MiraProgressStubDetailPage },
  { path: '/mira-components/chat-message', element: MiraChatMessageDetailPage },
  { path: '/mira-components/sources-panel', element: MiraSourcesPanelDetailPage },
  { path: '/mira-components/gradient-text', element: MiraGradientTextDetailPage },
  { path: '/mira-components/chip', element: MiraChipDetailPage },
  { path: '/mira-components/stream-toolbar', element: MiraStreamToolbarDetailPage },
  { path: '/mira-components/avatar', element: MiraAvatarDetailPage },
  { path: '/mira-components/suggestion-chip', element: MiraSuggestionChipDetailPage },
  { path: '/mira-components/feedback-buttons', element: MiraFeedbackButtonsDetailPage },
  { path: '/mira-components/empty-state', element: MiraEmptyStateDetailPage },
  { path: '/ds-collection/button', element: ButtonDetailPage },
  { path: '/ds-collection/fab', element: FabDetailPage },
  { path: '/ds-collection/text-field', element: TextFieldDetailPage },
  { path: '/ds-collection/select', element: SelectDetailPage },
  { path: '/ds-collection/checkbox', element: CheckboxDetailPage },
  { path: '/ds-collection/checkbox-group', element: CheckboxGroupDetailPage },
  { path: '/ds-collection/radio', element: RadioDetailPage },
  { path: '/ds-collection/radio-group', element: RadioGroupDetailPage },
  { path: '/ds-collection/switch', element: SwitchDetailPage },
  { path: '/ds-collection/slider', element: SliderDetailPage },
  { path: '/ds-collection/rating', element: RatingDetailPage },
  { path: '/ds-collection/typography', element: TypographyDetailPage },
  { path: '/ds-collection/palette', element: PaletteDetailPage },
  { path: '/ds-collection/spacing', element: SpacingDetailPage },
  { path: '/ds-collection/elevation', element: ElevationDetailPage },
  { path: '/ds-collection/breakpoints', element: BreakpointsDetailPage },
  { path: '/ds-collection/autocomplete', element: AutocompleteDetailPage },
  { path: '/ds-collection/chip', element: ChipDetailPage },
  { path: '/ds-collection/indicator', element: IndicatorDetailPage },
  { path: '/ds-collection/toggle-button', element: ToggleButtonDetailPage },
  { path: '/ds-collection/find', element: FindDetailPage },
  { path: '/ds-collection/file-upload', element: FileUploadDetailPage },
  { path: '/ds-collection/drawer', element: DrawerDetailPage },
  { path: '/ds-collection/accordion', element: AccordionDetailPage },
  { path: '/ds-collection/card', element: CardDetailPage },
  { path: '/ds-collection/progress', element: ProgressDetailPage },
  { path: '/ds-collection/tabs', element: TabsDetailPage },
  { path: '/ds-collection/snackbar', element: SnackbarDetailPage },
  { path: '/ds-collection/alert', element: AlertDetailPage },
  { path: '/ds-collection/links', element: LinkDetailPage },
  { path: '/ds-collection/dialog', element: DialogDetailPage },
  { path: '/ds-collection/divider', element: DividerDetailPage },
  { path: '/ds-collection/badge', element: BadgeDetailPage },
  { path: '/ds-collection/avatar', element: AvatarDetailPage },
  { path: '/ds-collection/tooltip', element: TooltipDetailPage },
  { path: '/ds-collection/list', element: ListDetailPage },
  { path: '/ds-collection/table', element: TableDetailPage },
  { path: '/ds-collection/icons', element: IconsDetailPage },
  { path: '/ds-collection/pagination', element: PaginationDetailPage },
  { path: '/ds-collection/stepper', element: StepperDetailPage },
  { path: '/ds-collection/textarea-autosize', element: TextareaAutosizeDetailPage },
  { path: '/ds-collection/breadcrumbs', element: BreadcrumbsDetailPage },
  { path: '/ds-collection/button-group', element: ButtonGroupDetailPage },
  { path: '/ds-collection/menu', element: MenuDetailPage },
  { path: '/ds-collection/paper', element: PaperDetailPage },
  { path: '/ds-collection/speed-dial', element: SpeedDialDetailPage },
  { path: '/ds-collection/box', element: BoxDetailPage },
  { path: '/ds-collection/container', element: ContainerDetailPage },
  { path: '/ds-collection/grid', element: GridDetailPage },
  { path: '/ds-collection/stack', element: StackDetailPage },
  { path: '/ds-collection/app-bar', element: AppBarDetailPage },
  { path: '/ds-collection/bottom-navigation', element: BottomNavigationDetailPage },
  { path: '/ds-collection/popover', element: PopoverDetailPage },
  { path: '/ds-collection/tree-list', element: TreeListDetailPage },
]

// Getting Started routes
export const gettingStartedRoutes = [
  { path: '/getting-started', element: GettingStartedPage },
  { path: '/getting-started/overview', element: GettingStartedOverviewPage },
  { path: '/getting-started/for-designers', element: GettingStartedForDesignersPage },
  { path: '/getting-started/for-developers', element: GettingStartedForDevelopersPage },
]

// Designing routes
export const designingRoutes = [
  { path: '/designing', element: DesigningPage },
  { path: '/designing/get-started', element: DesigningGetStartedPage },
  { path: '/designing/design-kits', element: DesigningKitsPage },
  { path: '/designing/principles', element: DesigningPrinciplesPage },
  { path: '/designing/layout', element: DesigningLayoutPage },
]

// Developing routes
export const developingRoutes = [
  { path: '/developing', element: DevelopingPage },
  { path: '/developing/get-started', element: DevelopingGetStartedPage },
  { path: '/developing/react', element: DevelopingReactPage },
  { path: '/developing/patterns', element: DevelopingPatternsPage },
]

// Content routes
export const contentRoutes = [
  { path: '/content', element: ContentPage },
  { path: '/content/overview', element: ContentOverviewPage },
  { path: '/content/writing-style', element: ContentWritingStylePage },
  { path: '/content/action-labels', element: ContentActionLabelsPage },
]

// Guidelines routes (Accessibility, AI, Motion)
export const guidelineRoutes = [
  { path: '/guidelines', element: GuidelinesPage },
  { path: '/guidelines/accessibility', element: AccessibilityGuidelinePage },
  { path: '/guidelines/ai-presence', element: AiPresenceGuidelinePage },
  { path: '/guidelines/motion', element: MotionGuidelinePage },
]

// UI Patterns routes (workflow-level guidance)
export const patternRoutes = [
  { path: '/patterns', element: UIPatternsPage },
  { path: '/patterns/empty-state', element: EmptyStatePatternPage },
  { path: '/patterns/page-header', element: PageHeaderPatternPage },
  { path: '/patterns/form-layout', element: FormLayoutPatternPage },
]

// Template routes
export const templateRoutes = [
  { path: '/templates', element: TemplatesPage },
  { path: '/templates/dashboard', element: DashboardTemplate },
  { path: '/templates/auth', element: AuthTemplate },
  { path: '/templates/ecommerce', element: EcommerceTemplate },
  { path: '/templates/blog', element: BlogTemplate },
  { path: '/templates/settings', element: SettingsTemplate },
  { path: '/templates/data-table', element: DataTableTemplate },
  { path: '/templates/onboarding', element: OnboardingTemplate },
  { path: '/templates/onboarding-v2', element: OnboardingTemplateV2 },
  { path: '/templates/analytics-dashboard', element: AnalyticsDashboardTemplate },
  { path: '/templates/collaboration-hub', element: CollaborationHubTemplate },
  { path: '/templates/reporting-system', element: ReportingSystemTemplate },
  { path: '/templates/integration-marketplace', element: IntegrationMarketplaceTemplate },
  { path: '/templates/audit-log', element: AuditLogTemplate },
  { path: '/templates/bulk-data', element: BulkDataTemplate },
  { path: '/templates/document-management', element: DocumentManagementTemplate },
  { path: '/templates/approval-workflow', element: ApprovalWorkflowTemplate },
  { path: '/templates/notification-center', element: NotificationCenterTemplate },
  { path: '/templates/activity-feed', element: ActivityFeedTemplate },
  { path: '/templates/email-campaign', element: EmailCampaignTemplate },
  { path: '/templates/goal-tracking', element: GoalTrackingTemplate },
  { path: '/templates/form-builder', element: FormBuilderTemplate },
  { path: '/templates/inventory-management', element: InventoryManagementTemplate },
  { path: '/templates/customer-portal', element: CustomerPortalTemplate },
  { path: '/templates/team-directory', element: TeamDirectoryTemplate },
  { path: '/templates/subscription-billing', element: SubscriptionBillingTemplate },
  { path: '/templates/knowledge-base', element: KnowledgeBaseTemplate },
  { path: '/templates/timesheet', element: TimesheetTemplate },
  { path: '/templates/resource-booking', element: ResourceBookingTemplate },
  { path: '/templates/survey-builder', element: SurveyBuilderTemplate },
  { path: '/templates/multi-tenant', element: MultiTenantAdminTemplate },
]

// UXR routes
export const uxrRoutes = [
  { path: '/uxr/checkbox', element: CheckboxUXRLandingPage },
  { path: '/uxr/checkbox/interactive', element: CheckboxInteractivePage },
  { path: '/uxr/checkbox/guided', element: CheckboxGuidedPage },
]

// All routes combined
export const allRoutes = [
  ...coreRoutes,
  ...seatsRoutes,
  ...studioRoutes,
  ...dsCollectionRoutes,
  ...gettingStartedRoutes,
  ...designingRoutes,
  ...developingRoutes,
  ...contentRoutes,
  ...guidelineRoutes,
  ...patternRoutes,
  ...templateRoutes,
  ...uxrRoutes,
]
