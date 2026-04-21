# Template Minimalism & Progressive Disclosure Plan

## Overview

This plan documents the updates needed to make our 40 templates more minimalistic while preserving all existing hidden interaction paths. The key principles:

1. **Reduce color noise** - Avoid multi-colored badges/chips
2. **Use Indicator for status** - When color is needed, use the Indicator component
3. **Grey chips for non-status** - Categories, filters, tags should be grey
4. **Progressive disclosure** - Hide complexity until needed
5. **Preserve interactions** - Keep all existing hover states, contextual menus, and hidden paths

---

## Current State Analysis

### Badge Usage (20 occurrences across 12 files)
| File | Count | Usage Pattern |
|------|-------|---------------|
| NotificationCenterTemplate | 3 | Unread counts (red badges) |
| ServiceDeskTemplate | 3 | Ticket counts |
| CollaborationHubTemplate | 3 | Activity counts |
| DocumentManagementTemplate | 2 | Folder counts |
| ApprovalWorkflowTemplate | 2 | Pending counts |
| Others (7 files) | 7 | Various counts |

### Chip Usage (65 occurrences across 20 files)
| File | Count | Usage Pattern |
|------|-------|---------------|
| ApprovalWorkflowTemplate | 9 | Status, workflow types |
| MultiTenantAdminTemplate | 8 | Plans, tenant status |
| AdvancedSearchTemplate | 6 | Filter chips, saved searches |
| NotificationCenterTemplate | 5 | Category, priority |
| AuditLogTemplate | 5 | Event types, severity |
| CollaborationHubTemplate | 4 | Member roles, status |
| CustomFieldsTemplate | 4 | Field types, objects |
| BlogTemplate | 3 | Categories |
| ResourceBookingTemplate | 3 | Amenities, status |
| Others (11 files) | 18 | Various |

### Templates Already Using Indicator Component
- ApprovalWorkflowTemplate
- MultiTenantAdminTemplate
- CustomerPortalTemplate
- KnowledgeBaseTemplate
- ApiManagementTemplate
- BulkDataTemplate

---

## Design Guidelines

### 1. Status Indication Hierarchy

**Level 1: Text only** (minimal)
```jsx
// Before
<Chip label="Active" color="success" size="small" />

// After - just text with semantic color
<Typography variant="caption" color="success.main">Active</Typography>
```

**Level 2: Indicator component** (when color context needed)
```jsx
// Before
<Chip label="Pending" color="warning" size="small" />

// After
<Indicator color="warning" size="small">Pending</Indicator>
```

**Level 3: Icon + text** (maximum clarity)
```jsx
<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
  <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
  <Typography variant="caption">Active</Typography>
</Box>
```

### 2. Chip Color Rules

| Use Case | Before | After |
|----------|--------|-------|
| Status (Active/Inactive/Pending) | `color="success/error/warning"` | Use `<Indicator>` |
| Categories (tags, filters) | `color="primary/secondary"` | `variant="outlined"` (grey) |
| HTTP Methods (GET, POST, etc) | Custom colors | Keep (established convention) |
| Plans (Basic, Pro, Enterprise) | `color="primary/secondary"` | Grey chip + Indicator for "current" |
| Roles (Admin, User, etc) | Multiple colors | Grey chip, Indicator only for "you" |

### 3. Badge Replacement Patterns

| Current Pattern | Replace With |
|-----------------|--------------|
| `<Badge badgeContent={5} color="error">` | Subtle count: `(5)` or `5 new` |
| Notification dot | Keep (minimal) |
| Count on icons | Text beside: `Messages (3)` |

### 4. Progressive Disclosure Enhancements

**Existing patterns to keep:**
- Dialogs for creation/editing
- Drawers for detail panels (480px)
- Collapse/expand sections
- Tabs for view organization
- Tooltips for hover context
- Context menus (3-dot)

**New patterns to add:**
- "Show filters" toggle (hide filter bar by default)
- Expandable table rows for details
- "Advanced options" collapsibles
- Skeleton loading states
- "Load more" instead of pagination where appropriate

---

## Template-by-Template Changes

### Priority 1: High-Impact Templates (8 files, 44 chip/badge uses)

#### 1. ApprovalWorkflowTemplate.jsx (9 chips, 2 badges)
**Current issues:**
- Workflow status uses colored chips (active=green, draft=grey, paused=orange)
- Request status uses colored chips
- Badge for pending counts

**Changes:**
- [ ] Replace status chips with `<Indicator>` component
- [ ] Keep workflow icons (already good progressive disclosure)
- [ ] Convert badge counts to inline text: "Pending Approval (12)"
- [ ] Add collapsible "Filters" section (currently always visible)

**Preserve:**
- Stepper interaction for approval flow
- Context menu on workflow cards
- Drag-and-drop step reordering (if exists)

#### 2. MultiTenantAdminTemplate.jsx (8 chips)
**Current issues:**
- Plan chips: Basic (grey), Pro (purple), Enterprise (teal)
- Status chips: active (green), trial (blue), suspended (red)

**Changes:**
- [ ] All plan chips become grey outlined
- [ ] Status uses `<Indicator>` only: `<Indicator color="success">Active</Indicator>`
- [ ] Add "Show suspended" toggle (hide suspended by default)
- [ ] Usage meters stay (good progressive data viz)

**Preserve:**
- Tenant detail dialog
- Quick action menu
- Real-time metrics refresh

#### 3. AdvancedSearchTemplate.jsx (6 chips)
**Current issues:**
- Filter chips with various colors
- Saved search chips

**Changes:**
- [ ] All filter chips become grey outlined with × delete
- [ ] Saved searches become grey, no fill
- [ ] Add "Clear all filters" button
- [ ] Collapse advanced filters by default

**Preserve:**
- Filter builder interactions
- Keyboard shortcuts for search
- Recent searches dropdown

#### 4. NotificationCenterTemplate.jsx (5 chips, 3 badges)
**Current issues:**
- Category chips (mentions, alerts, updates)
- Priority badges
- Unread count badges

**Changes:**
- [ ] Category becomes grey chips (selected = filled grey, unselected = outlined)
- [ ] Remove priority color - use `<Indicator>` only for urgent
- [ ] Unread count becomes text: "Inbox (12 unread)"
- [ ] Add "Mark all read" action in header

**Preserve:**
- Notification grouping
- Quick actions on hover
- Mark as read interaction

#### 5. AuditLogTemplate.jsx (5 chips)
**Current issues:**
- Event type chips (login, update, delete, etc)
- Severity chips (info, warning, error)

**Changes:**
- [ ] Event type chips become grey text pills
- [ ] Severity uses `<Indicator>`: only error gets color, others grey
- [ ] Add time range presets collapse
- [ ] Default to "Last 24 hours" view

**Preserve:**
- Log expansion for details
- Export functionality
- Column sorting

#### 6. CollaborationHubTemplate.jsx (4 chips, 3 badges)
**Current issues:**
- Member role chips (Admin, Member, Guest)
- Activity badges
- Status chips

**Changes:**
- [ ] Roles become grey, only "Admin" gets Indicator
- [ ] Activity count becomes text
- [ ] Online status = green dot only (no chip)

**Preserve:**
- Real-time presence indicators (keep green dots)
- File upload drag-drop
- @mention autocomplete

#### 7. CustomFieldsTemplate.jsx (4 chips)
**Current issues:**
- Field type chips (Text, Number, Dropdown, etc)

**Changes:**
- [ ] Field types become icons + text (no colored chip)
- [ ] Keep small grey pill for count: "12 fields"
- [ ] Active/inactive toggle stays

**Preserve:**
- Drag-and-drop field ordering
- Inline editing
- Section collapse

#### 8. BlogTemplate.jsx (3 chips)
**Current issues:**
- Category chips with colors

**Changes:**
- [ ] All category chips become grey outlined
- [ ] Selected category = filled grey
- [ ] Add "All categories" option

**Preserve:**
- Card hover effects
- Reading time calculation
- Author hover profile

---

### Priority 2: Medium-Impact Templates (12 files, 21 chip/badge uses)

| Template | Chips | Badges | Key Changes |
|----------|-------|--------|-------------|
| ResourceBookingTemplate | 3 | 0 | Amenities → grey chips, status → Indicator |
| MeetingRoomTemplate | 2 | 0 | Room features → grey, availability → Indicator |
| ReportingSystemTemplate | 2 | 0 | Report type → grey, tab counts → inline |
| WorkflowBuilderTemplate | 2 | 0 | Node types → icons only |
| IntegrationMarketplaceTemplate | 2 | 0 | Categories → grey chips |
| BulkDataTemplate | 2 | 0 | Already uses Indicator - good! |
| DocumentManagementTemplate | 2 | 2 | File type → icon, folder count → text |
| InventoryManagementTemplate | 2 | 0 | Stock level → Indicator, category → grey |
| ServiceDeskTemplate | 0 | 3 | Ticket counts → text with number |
| ActivityFeedTemplate | 0 | 1 | Activity type → icon only |
| TeamDirectoryTemplate | 0 | 1 | Department count → inline text |
| DataTableTemplate | 0 | 1 | Row selection count → "3 selected" text |

---

### Priority 3: Low-Impact Templates (20 files, minimal changes)

These templates have 0-1 chip/badge uses each. Review for consistency but minimal changes needed:

- OnboardingTemplate (1 chip) - Progress indicator, keep
- PricingTemplate (1 chip) - "Popular" badge → Indicator
- EcommerceTemplate (1 chip, 1 badge) - Cart count → keep, category → grey
- EmailCampaignTemplate (1 chip) - Status → Indicator
- AuthTemplate - No chips/badges
- SettingsTemplate - No chips/badges
- DashboardTemplate (1 badge) - Alert count → Indicator dot only
- ApiManagementTemplate (1 badge) - Already uses Indicator
- UserManagementTemplate (1 badge) - Role → Indicator, keep MFA badge
- CustomerPortalTemplate - Already uses Indicator
- KnowledgeBaseTemplate - Already uses Indicator
- TimesheetTemplate - Review for status colors
- CustomerHealthTemplate - Health scores → Indicator
- FeedbackBoardTemplate - Vote counts → text
- SurveyBuilderTemplate - Question types → icons
- PermissionManagerTemplate - Permissions → Indicator pattern
- FormBuilderTemplate - Field types → icons
- GoalTrackingTemplate - Progress → bars not chips
- SubscriptionBillingTemplate - Plan status → Indicator
- AnalyticsDashboardTemplate - Metrics → numbers, no chips

---

## Hidden Interactions to Preserve

### Hover Interactions
- [ ] Card elevation on hover (all card-based templates)
- [ ] Table row highlight on hover (all table templates)
- [ ] Icon tooltips on hover (all icon buttons)
- [ ] Preview panels on hover (DocumentManagement, KnowledgeBase)

### Contextual Menus
- [ ] 3-dot menu (MoreVertIcon) actions
- [ ] Right-click context menus (if any)
- [ ] Long-press actions (mobile)

### Keyboard Shortcuts
- [ ] Search focus (Cmd/Ctrl + K pattern)
- [ ] Escape to close dialogs
- [ ] Tab navigation through forms
- [ ] Enter to submit

### Drag and Drop
- [ ] Field reordering (CustomFields, FormBuilder)
- [ ] Component arrangement (ReportingSystem, WorkflowBuilder)
- [ ] File upload drop zones (DocumentManagement, Collaboration)

### Toggle/Switch States
- [ ] Active/inactive toggles
- [ ] View mode switches (grid/list)
- [ ] Filter panel show/hide
- [ ] Sidebar collapse

### Click Interactions
- [ ] Row click to open details
- [ ] Avatar click for user profile
- [ ] Breadcrumb navigation
- [ ] Tab switching without page reload

---

## Implementation Order

### Phase 1: Create Shared Components (1 session)
- [ ] Export `Indicator` to shared components if not already
- [ ] Create `StatusText` component for text-only status
- [ ] Create `CountBadge` component (grey, minimal)
- [ ] Document patterns in component library

### Phase 2: High-Impact Templates (2-3 sessions)
1. ApprovalWorkflowTemplate
2. MultiTenantAdminTemplate
3. AdvancedSearchTemplate
4. NotificationCenterTemplate
5. AuditLogTemplate
6. CollaborationHubTemplate
7. CustomFieldsTemplate
8. BlogTemplate

### Phase 3: Medium-Impact Templates (1-2 sessions)
- Batch update remaining 12 templates
- Focus on consistency

### Phase 4: Low-Impact Review (1 session)
- Quick pass through 20 templates
- Ensure consistent patterns
- Document any unique patterns worth keeping

### Phase 5: Documentation & Testing (1 session)
- Update README with new patterns
- Screenshot all templates
- Test dark mode compatibility
- Test colorblind modes

---

## Success Metrics

After implementation:
- [ ] Zero colored Chip components for status (use Indicator)
- [ ] All category/filter chips are grey
- [ ] Badge count reduced by 50%+ (replaced with text)
- [ ] Every template has at least one progressive disclosure pattern
- [ ] All hidden interactions documented and preserved
- [ ] Passes WCAG AA contrast in all 8 palette modes

---

## Notes

- The `Indicator` component already supports 14 colors and dark mode
- Indicator uses light tinted backgrounds (subtle) vs Chip filled (heavy)
- Keep HTTP method colors (GET=green, POST=blue, etc) - these are industry standard
- Real-time indicators (presence dots) should stay colorful - they're functional
- Progress bars and charts keep their colors - data viz is different
