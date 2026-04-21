// Shared constants for Seats pages (V1, V2, V3)
// Icons are added at the component level since they're JSX

// Seat type definitions - base data without icons
// Each page can enhance with icons as needed
export const SEAT_TYPE_IDS = {
  ADMIN: 'admin',
  STANDARD: 'standard',
  VIEW_ONLY: 'view-only',
  NO_ACCESS: 'no-access',
}

export const SEAT_TYPES_BASE = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Full access + user management',
    entitlement: 'users',
  },
  {
    id: 'standard',
    label: 'Standard',
    description: 'Full product access',
    entitlement: 'users',
  },
  {
    id: 'view-only',
    label: 'View-Only',
    description: 'Read-only dashboard access',
    entitlement: 'view-only-users',
  },
  {
    id: 'no-access',
    label: 'No Suite Access',
    description: 'App Agents only',
    entitlement: null,
  },
]

// Contract entitlements - what the customer purchased
export const ENTITLEMENTS = {
  users: { limit: 25, label: 'Platform Users' },
  'view-only-users': { limit: 10, label: 'View-Only Users' },
  'max-admins': { limit: 5, label: 'Max Admins', enabled: true },
}

// OOTB + Custom roles
export const INITIAL_ROLES = [
  { id: 'explore-standard-plus', label: 'Explore+ Standard+ User' },
  { id: 'explore-standard', label: 'Explore+ Standard User' },
  { id: 'custom-analyst', label: 'Analyst' },
  { id: 'custom-operator', label: 'Operator' },
  { id: 'custom-admin', label: 'Admin (Old)' },
  { id: 'custom-viewer', label: 'Dashboard Viewer' },
  { id: 'data-engineer', label: 'Data Engineer' },
  { id: 'report-builder', label: 'Report Builder' },
]

// Mock workspaces
export const WORKSPACES = [
  { id: 'ws-1', name: 'Production', description: 'Main production environment' },
  { id: 'ws-2', name: 'Development', description: 'Development and testing' },
  { id: 'ws-3', name: 'Analytics', description: 'Data analytics workspace' },
  { id: 'ws-4', name: 'Marketing', description: 'Marketing team workspace' },
  { id: 'ws-5', name: 'Operations', description: 'Operations monitoring' },
  { id: 'ws-6', name: 'Sales Operations', description: 'Sales team workflows and reporting' },
  { id: 'ws-7', name: 'Customer Success', description: 'Customer engagement and support' },
  { id: 'ws-8', name: 'Engineering', description: 'Engineering team projects' },
  { id: 'ws-9', name: 'Product', description: 'Product management workspace' },
  { id: 'ws-10', name: 'Finance', description: 'Financial reporting and analysis' },
  { id: 'ws-11', name: 'HR & People', description: 'Human resources workspace' },
  { id: 'ws-12', name: 'Legal', description: 'Legal and compliance' },
  { id: 'ws-13', name: 'Executive', description: 'Executive dashboards and reports' },
  { id: 'ws-14', name: 'Research', description: 'Research and insights' },
  { id: 'ws-15', name: 'Design', description: 'Design team workspace' },
]

// User groups for organizational tagging (used in V3)
export const INITIAL_GROUPS = [
  { id: 1, name: 'APAC' },
  { id: 2, name: 'EMEA' },
  { id: 3, name: 'Engineering' },
  { id: 4, name: 'North America' },
  { id: 5, name: 'Product' },
  { id: 6, name: 'Operations' },
  { id: 7, name: 'Sales' },
  { id: 8, name: 'Marketing' },
  { id: 9, name: 'Finance' },
  { id: 10, name: 'Customer Support' },
  { id: 11, name: 'IT Infrastructure' },
  { id: 12, name: 'Data Science' },
  { id: 13, name: 'Quality Assurance' },
  { id: 14, name: 'Research & Development' },
  { id: 15, name: 'Business Development' },
]

// Mock users with seat types (legacy - no groups)
export const INITIAL_USERS = [
  { id: 1, name: 'Alice Bergson', email: 'alice.bergson@company.com', seatType: 'admin', role: 'explore-standard-plus', status: 'Active', lastActive: '59m ago' },
  { id: 2, name: 'Bobby Bonds', email: 'bobby.bonds@company.com', seatType: 'standard', role: 'explore-standard', status: 'Active', lastActive: '3h ago' },
  { id: 3, name: 'Daniel Smith', email: 'daniel.smith@company.com', seatType: 'standard', role: 'custom-analyst', status: 'Active', lastActive: 'Oct 1, 2025' },
  { id: 4, name: 'Evan Fischer', email: 'evan.fischer@company.com', seatType: 'admin', role: null, status: 'Pending', lastActive: '—' },
  { id: 5, name: 'Grace Hooper', email: 'grace.hooper@company.com', seatType: 'view-only', role: null, status: 'Active', lastActive: '1h ago' },
  { id: 6, name: 'Ophelia Fitzgerald', email: 'ophelia.fitzgerald@company.com', seatType: 'standard', role: 'explore-standard-plus', status: 'Active', lastActive: 'Oct 1, 2025' },
  { id: 7, name: 'Chen Wei', email: 'chen.wei@company.com', seatType: 'standard', role: 'custom-operator', status: 'Active', lastActive: '2h ago' },
  { id: 8, name: 'Maria Garcia', email: 'maria.garcia@company.com', seatType: 'view-only', role: null, status: 'Active', lastActive: '5h ago' },
  { id: 9, name: 'James Wilson', email: 'james.wilson@company.com', seatType: 'standard', role: 'explore-standard', status: 'Inactive', lastActive: 'Oct 15, 2025' },
  { id: 10, name: 'Priya Patel', email: 'priya.patel@company.com', seatType: 'admin', role: 'explore-standard-plus', status: 'Active', lastActive: '30m ago' },
  { id: 11, name: 'Tom Anderson', email: 'tom.anderson@company.com', seatType: 'no-access', role: null, status: 'Active', lastActive: '2d ago' },
]

// Users with groups (for V3 unified experience)
export const INITIAL_USERS_WITH_GROUPS = [
  { id: 1, name: 'Alice Bergson', email: 'alice.bergson@company.com', seatType: 'admin', role: 'explore-standard-plus', groups: [2], status: 'Active', lastActive: '59m ago' },
  { id: 2, name: 'Bobby Bonds', email: 'bobby.bonds@company.com', seatType: 'standard', role: 'explore-standard', groups: [1, 6], status: 'Active', lastActive: '3h ago' },
  { id: 3, name: 'Daniel Smith', email: 'daniel.smith@company.com', seatType: 'standard', role: 'custom-analyst', groups: [1, 2, 3, 4, 5], status: 'Active', lastActive: 'Oct 1, 2025' },
  { id: 4, name: 'Evan Fischer', email: 'evan.fischer@company.com', seatType: 'admin', role: null, groups: [4, 6], status: 'Pending', lastActive: '—' },
  { id: 5, name: 'Grace Hooper', email: 'grace.hooper@company.com', seatType: 'view-only', role: null, groups: [], status: 'Active', lastActive: '1h ago' },
  { id: 6, name: 'Ophelia Fitzgerald', email: 'ophelia.fitzgerald@company.com', seatType: 'standard', role: 'explore-standard-plus', groups: [1, 3, 5], status: 'Active', lastActive: 'Oct 1, 2025' },
  { id: 7, name: 'Chen Wei', email: 'chen.wei@company.com', seatType: 'standard', role: 'custom-operator', groups: [1, 7], status: 'Active', lastActive: '2h ago' },
  { id: 8, name: 'Maria Garcia', email: 'maria.garcia@company.com', seatType: 'view-only', role: null, groups: [2, 8], status: 'Active', lastActive: '5h ago' },
  { id: 9, name: 'James Wilson', email: 'james.wilson@company.com', seatType: 'standard', role: 'explore-standard', groups: [4], status: 'Inactive', lastActive: 'Oct 15, 2025' },
  { id: 10, name: 'Priya Patel', email: 'priya.patel@company.com', seatType: 'admin', role: 'explore-standard-plus', groups: [1, 3], status: 'Active', lastActive: '30m ago' },
  { id: 11, name: 'Tom Anderson', email: 'tom.anderson@company.com', seatType: 'no-access', role: null, groups: [6, 10], status: 'Active', lastActive: '2d ago' },
]

// Internal users (App staff)
export const INITIAL_INTERNAL_USERS = [
  { id: 101, name: 'Support Agent 1', email: 'support1@app.internal', seatType: 'admin', role: 'explore-standard-plus', status: 'Active', lastActive: '10m ago' },
  { id: 102, name: 'Support Agent 2', email: 'support2@app.internal', seatType: 'standard', role: 'explore-standard', status: 'Active', lastActive: '2h ago' },
]

// Internal users with groups (for V3)
export const INITIAL_INTERNAL_USERS_WITH_GROUPS = [
  { id: 101, name: 'Support Agent 1', email: 'support1@app.internal', seatType: 'admin', role: 'explore-standard-plus', groups: [10], status: 'Active', lastActive: '10m ago' },
  { id: 102, name: 'Support Agent 2', email: 'support2@app.internal', seatType: 'standard', role: 'explore-standard', groups: [10], status: 'Active', lastActive: '2h ago' },
]

// Permissions matrix for V1 (more detailed)
export const SEAT_PERMISSIONS = {
  admin: {
    'Explore+': 'Admin',
    'Monitor': 'Admin',
    'Analyze': 'Admin',
    'Alerts': 'Admin',
    'Manage Users & Workspaces': 'Yes',
    'App Agents': 'Yes',
  },
  standard: {
    'Explore+': 'Admin',
    'Monitor': 'Admin',
    'Analyze': 'Admin',
    'Alerts': 'Admin',
    'Manage Users & Workspaces': 'No',
    'App Agents': 'Yes',
  },
  'view-only': {
    'Explore+': 'View',
    'Monitor': 'View',
    'Analyze': 'View',
    'Alerts': 'View',
    'Manage Users & Workspaces': 'No',
    'App Agents': 'Yes',
  },
  'no-access': {
    'Explore+': 'None',
    'Monitor': 'None',
    'Analyze': 'None',
    'Alerts': 'None',
    'Manage Users & Workspaces': 'No',
    'App Agents': 'Yes',
  },
}

// Helper to check if a seat type can have roles assigned
export const canAssignRole = (seatType) => seatType === 'admin' || seatType === 'standard'

// Helper to get entitlement key for a seat type
export const getEntitlementKey = (seatType) => {
  const seat = SEAT_TYPES_BASE.find(s => s.id === seatType)
  return seat?.entitlement || null
}

// ============================================================
// V5 DATA MODEL - Permission Overrides & Workspace Assignments
// ============================================================

// Products with permission levels
export const PRODUCTS = [
  { id: 'explore-plus', label: 'Explore+', category: 'Core' },
  { id: 'monitor', label: 'Monitor', category: 'Core' },
  { id: 'analyze', label: 'Analyze', category: 'Core' },
  { id: 'alerts', label: 'Alerts', category: 'Core' },
]

export const PERMISSION_LEVELS = {
  ADMIN: 'Admin',
  VIEW: 'View',
  NONE: 'None',
}

// Seat type permission ceilings - maximum permission level each seat type can have
export const SEAT_PERMISSION_CEILINGS = {
  admin: {
    'explore-plus': 'Admin',
    'monitor': 'Admin',
    'analyze': 'Admin',
    'alerts': 'Admin',
    'manage-users': true,
  },
  standard: {
    'explore-plus': 'Admin',
    'monitor': 'Admin',
    'analyze': 'Admin',
    'alerts': 'Admin',
    'manage-users': false,
  },
  'view-only': {
    'explore-plus': 'View',
    'monitor': 'View',
    'analyze': 'View',
    'alerts': 'View',
    'manage-users': false,
  },
  'no-access': {
    'explore-plus': 'None',
    'monitor': 'None',
    'analyze': 'None',
    'alerts': 'None',
    'manage-users': false,
  },
}

// Role default permissions - what each role grants by default
export const ROLE_PERMISSIONS = {
  'explore-standard-plus': {
    'explore-plus': 'Admin',
    'monitor': 'Admin',
    'analyze': 'Admin',
    'alerts': 'Admin',
  },
  'explore-standard': {
    'explore-plus': 'Admin',
    'monitor': 'View',
    'analyze': 'View',
    'alerts': 'View',
  },
  'custom-analyst': {
    'explore-plus': 'View',
    'monitor': 'Admin',
    'analyze': 'Admin',
    'alerts': 'View',
  },
  'custom-operator': {
    'explore-plus': 'View',
    'monitor': 'Admin',
    'analyze': 'View',
    'alerts': 'Admin',
  },
  'custom-admin': {
    'explore-plus': 'Admin',
    'monitor': 'Admin',
    'analyze': 'Admin',
    'alerts': 'Admin',
  },
  'custom-viewer': {
    'explore-plus': 'View',
    'monitor': 'View',
    'analyze': 'View',
    'alerts': 'View',
  },
  'data-engineer': {
    'explore-plus': 'View',
    'monitor': 'View',
    'analyze': 'Admin',
    'alerts': 'View',
  },
  'report-builder': {
    'explore-plus': 'Admin',
    'monitor': 'View',
    'analyze': 'Admin',
    'alerts': 'View',
  },
}

// V5 Users with permission overrides and workspace assignments
export const INITIAL_USERS_V5 = [
  {
    id: 1,
    name: 'Alice Bergson',
    email: 'alice.bergson@company.com',
    seatType: 'admin',
    role: 'explore-standard-plus',
    groups: [2],
    status: 'Active',
    lastActive: '59m ago',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-2', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-3', role: null, permissionOverrides: {}, accessLevel: 'full' },
    ],
  },
  {
    id: 2,
    name: 'Bobby Bonds',
    email: 'bobby.bonds@company.com',
    seatType: 'standard',
    role: 'explore-standard',
    groups: [1, 6],
    status: 'Active',
    lastActive: '3h ago',
    permissionOverrides: { 'monitor': 'Admin' }, // Upgraded from View to Admin
    workspaceAssignments: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-5', role: 'custom-operator', permissionOverrides: {}, accessLevel: 'full' },
    ],
  },
  {
    id: 3,
    name: 'Daniel Smith',
    email: 'daniel.smith@company.com',
    seatType: 'standard',
    role: 'custom-analyst',
    groups: [1, 2, 3, 4, 5],
    status: 'Active',
    lastActive: 'Oct 1, 2025',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-3', role: null, permissionOverrides: {}, accessLevel: 'full' },
    ],
  },
  {
    id: 4,
    name: 'Evan Fischer',
    email: 'evan.fischer@company.com',
    seatType: 'admin',
    role: null,
    groups: [4, 6],
    status: 'Pending',
    lastActive: '—',
    permissionOverrides: {},
    workspaceAssignments: [],
  },
  {
    id: 5,
    name: 'Grace Hooper',
    email: 'grace.hooper@company.com',
    seatType: 'view-only',
    role: null,
    groups: [],
    status: 'Active',
    lastActive: '1h ago',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'read' },
    ],
  },
  {
    id: 6,
    name: 'Ophelia Fitzgerald',
    email: 'ophelia.fitzgerald@company.com',
    seatType: 'standard',
    role: 'explore-standard-plus',
    groups: [1, 3, 5],
    status: 'Active',
    lastActive: 'Oct 1, 2025',
    permissionOverrides: { 'alerts': 'View' }, // Restricted from Admin to View
    workspaceAssignments: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-4', role: null, permissionOverrides: {}, accessLevel: 'full' },
    ],
  },
  {
    id: 7,
    name: 'Chen Wei',
    email: 'chen.wei@company.com',
    seatType: 'standard',
    role: 'custom-operator',
    groups: [1, 7],
    status: 'Active',
    lastActive: '2h ago',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-5', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-1', role: null, permissionOverrides: { 'monitor': 'View' }, accessLevel: 'read' }, // Workspace-specific override
    ],
  },
  {
    id: 8,
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    seatType: 'view-only',
    role: null,
    groups: [2, 8],
    status: 'Active',
    lastActive: '5h ago',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-4', role: null, permissionOverrides: {}, accessLevel: 'read' },
    ],
  },
  {
    id: 9,
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    seatType: 'standard',
    role: 'explore-standard',
    groups: [4],
    status: 'Inactive',
    lastActive: 'Oct 15, 2025',
    permissionOverrides: {},
    workspaceAssignments: [],
  },
  {
    id: 10,
    name: 'Priya Patel',
    email: 'priya.patel@company.com',
    seatType: 'admin',
    role: 'explore-standard-plus',
    groups: [1, 3],
    status: 'Active',
    lastActive: '30m ago',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-2', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-3', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-4', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-5', role: null, permissionOverrides: {}, accessLevel: 'full' },
    ],
  },
  {
    id: 11,
    name: 'Tom Anderson',
    email: 'tom.anderson@company.com',
    seatType: 'no-access',
    role: null,
    groups: [6, 10],
    status: 'Active',
    lastActive: '2d ago',
    permissionOverrides: {},
    workspaceAssignments: [],
  },
]

// V5 Internal users with permission overrides
export const INITIAL_INTERNAL_USERS_V5 = [
  {
    id: 101,
    name: 'Support Agent 1',
    email: 'support1@app.internal',
    seatType: 'admin',
    role: 'explore-standard-plus',
    groups: [10],
    status: 'Active',
    lastActive: '10m ago',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-2', role: null, permissionOverrides: {}, accessLevel: 'full' },
    ],
  },
  {
    id: 102,
    name: 'Support Agent 2',
    email: 'support2@app.internal',
    seatType: 'standard',
    role: 'explore-standard',
    groups: [10],
    status: 'Active',
    lastActive: '2h ago',
    permissionOverrides: {},
    workspaceAssignments: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'read' },
    ],
  },
]

// ============================================================
// V5 HELPER FUNCTIONS
// ============================================================

const PERMISSION_HIERARCHY = { 'Admin': 3, 'View': 2, 'None': 1 }

/**
 * Get effective permission for a user on a product
 * @param {object} user - User object with role, permissionOverrides, workspaceAssignments
 * @param {string} productId - Product ID (e.g., 'explore-plus')
 * @param {string|null} workspaceId - Workspace ID (null for account level)
 * @returns {{ level: string, source: string, roleDefault: string|null }}
 */
export const getEffectivePermission = (user, productId, workspaceId = null) => {
  const seatCeiling = SEAT_PERMISSION_CEILINGS[user.seatType]?.[productId] || 'None'
  const roleDefault = user.role && ROLE_PERMISSIONS[user.role]
    ? ROLE_PERMISSIONS[user.role][productId] || 'None'
    : null

  // If checking workspace-level permission
  if (workspaceId) {
    const wsAssignment = user.workspaceAssignments?.find(ws => ws.workspaceId === workspaceId)
    if (!wsAssignment) {
      return { level: 'None', source: 'no-access', roleDefault }
    }

    // Check workspace-specific override first
    if (wsAssignment.permissionOverrides?.[productId]) {
      const override = wsAssignment.permissionOverrides[productId]
      // Clamp to seat ceiling
      const effectiveLevel = PERMISSION_HIERARCHY[override] > PERMISSION_HIERARCHY[seatCeiling]
        ? seatCeiling
        : override
      return { level: effectiveLevel, source: 'workspace-override', roleDefault }
    }

    // Then workspace-specific role
    if (wsAssignment.role && ROLE_PERMISSIONS[wsAssignment.role]) {
      const wsRoleLevel = ROLE_PERMISSIONS[wsAssignment.role][productId] || 'None'
      const effectiveLevel = PERMISSION_HIERARCHY[wsRoleLevel] > PERMISSION_HIERARCHY[seatCeiling]
        ? seatCeiling
        : wsRoleLevel
      return { level: effectiveLevel, source: 'workspace-role', roleDefault }
    }
  }

  // Check account-level override
  if (user.permissionOverrides?.[productId]) {
    const override = user.permissionOverrides[productId]
    const effectiveLevel = PERMISSION_HIERARCHY[override] > PERMISSION_HIERARCHY[seatCeiling]
      ? seatCeiling
      : override
    return { level: effectiveLevel, source: 'account-override', roleDefault }
  }

  // Fall back to account role
  if (roleDefault) {
    const effectiveLevel = PERMISSION_HIERARCHY[roleDefault] > PERMISSION_HIERARCHY[seatCeiling]
      ? seatCeiling
      : roleDefault
    return { level: effectiveLevel, source: 'role', roleDefault }
  }

  // Fall back to seat ceiling (no role assigned)
  return { level: seatCeiling, source: 'seat', roleDefault }
}

/**
 * Check if a permission level exceeds the seat ceiling
 * @param {string} seatType - Seat type ID
 * @param {string} productId - Product ID
 * @param {string} level - Permission level to check
 * @returns {boolean}
 */
export const exceedsSeatCeiling = (seatType, productId, level) => {
  const ceiling = SEAT_PERMISSION_CEILINGS[seatType]?.[productId] || 'None'
  return PERMISSION_HIERARCHY[level] > PERMISSION_HIERARCHY[ceiling]
}

/**
 * Check if user has any permission overrides (account or workspace level)
 * @param {object} user - User object
 * @returns {boolean}
 */
export const hasPermissionOverrides = (user) => {
  // Check account-level overrides
  if (user.permissionOverrides && Object.keys(user.permissionOverrides).length > 0) {
    return true
  }
  // Check workspace-level overrides
  if (user.workspaceAssignments?.some(ws =>
    ws.permissionOverrides && Object.keys(ws.permissionOverrides).length > 0
  )) {
    return true
  }
  return false
}

/**
 * Get workspace count for a user
 * @param {object} user - User object
 * @returns {number}
 */
export const getWorkspaceCount = (user) => {
  return user.workspaceAssignments?.length || 0
}

// ============================================================
// V10 DATA MODEL - PRD seat types (platform, view-only, interactor + integration seats add-on)
// ============================================================

// Platform users: ~92 total (15 Admin, 77 Standard)
// View-Only users: ~50 total
// Interactor users: ~99 total
// Integration seats tracked separately via integrationSeats field

export const INITIAL_USERS_V10 = [
  // Platform Admins (15 users)
  { id: 1, name: 'Alice Bergson', email: 'alice.bergson@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 2, name: 'Bobby Bonds', email: 'bobby.bonds@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 3, name: 'Priya Patel', email: 'priya.patel@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: true, slack: true } },
  { id: 4, name: 'Evan Fischer', email: 'evan.fischer@company.com', seatType: 'platform', platformSubType: 'admin', role: null, status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 5, name: 'Olivia Thompson', email: 'olivia.thompson@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 6, name: 'Liam Anderson', email: 'liam.anderson@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 7, name: 'Emma Martinez', email: 'emma.martinez@company.com', seatType: 'platform', platformSubType: 'admin', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: true, slack: true } },
  { id: 8, name: 'Noah Johnson', email: 'noah.johnson@company.com', seatType: 'platform', platformSubType: 'admin', role: 'custom-operator', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 9, name: 'Ava Williams', email: 'ava.williams@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 10, name: 'William Brown', email: 'william.brown@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 11, name: 'Sophia Jones', email: 'sophia.jones@company.com', seatType: 'platform', platformSubType: 'admin', role: 'custom-analyst', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 12, name: 'James Davis', email: 'james.davis@company.com', seatType: 'platform', platformSubType: 'admin', role: 'custom-operator', status: 'Active', integrationSeats: { teams: true, slack: true } },
  { id: 13, name: 'Isabella Miller', email: 'isabella.miller@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 14, name: 'Benjamin Wilson', email: 'benjamin.wilson@company.com', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard', status: 'Pending', integrationSeats: { teams: true, slack: false } },
  { id: 15, name: 'Mia Moore', email: 'mia.moore@company.com', seatType: 'platform', platformSubType: 'admin', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: true } },
  // Platform Standard users (77 users)
  { id: 16, name: 'Lucas Taylor', email: 'lucas.taylor@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 17, name: 'Charlotte Thomas', email: 'charlotte.thomas@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 18, name: 'Henry Jackson', email: 'henry.jackson@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 19, name: 'Amelia White', email: 'amelia.white@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 20, name: 'Alexander Harris', email: 'alexander.harris@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 21, name: 'Harper Martin', email: 'harper.martin@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Pending', integrationSeats: { teams: true, slack: true } },
  { id: 22, name: 'Sebastian Garcia', email: 'sebastian.garcia@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 23, name: 'Evelyn Clark', email: 'evelyn.clark@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 24, name: 'Jack Rodriguez', email: 'jack.rodriguez@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 25, name: 'Abigail Lewis', email: 'abigail.lewis@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 26, name: 'Owen Lee', email: 'owen.lee@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 27, name: 'Emily Walker', email: 'emily.walker@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 28, name: 'Daniel Hall', email: 'daniel.hall@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Pending', integrationSeats: { teams: true, slack: false } },
  { id: 29, name: 'Elizabeth Allen', email: 'elizabeth.allen@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 30, name: 'Matthew Young', email: 'matthew.young@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 31, name: 'Sofia King', email: 'sofia.king@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: true, slack: true } },
  { id: 32, name: 'Joseph Wright', email: 'joseph.wright@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 33, name: 'Avery Scott', email: 'avery.scott@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 34, name: 'David Green', email: 'david.green@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 35, name: 'Ella Adams', email: 'ella.adams@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Pending', integrationSeats: { teams: true, slack: false } },
  { id: 36, name: 'Carter Baker', email: 'carter.baker@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 37, name: 'Scarlett Nelson', email: 'scarlett.nelson@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 38, name: 'Michael Hill', email: 'michael.hill@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 39, name: 'Grace Campbell', email: 'grace.campbell@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 40, name: 'Jayden Mitchell', email: 'jayden.mitchell@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 41, name: 'Chloe Roberts', email: 'chloe.roberts@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 42, name: 'Wyatt Carter', email: 'wyatt.carter@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 43, name: 'Victoria Phillips', email: 'victoria.phillips@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: true, slack: true } },
  { id: 44, name: 'Gabriel Evans', email: 'gabriel.evans@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 45, name: 'Riley Turner', email: 'riley.turner@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 46, name: 'Julian Torres', email: 'julian.torres@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 47, name: 'Penelope Parker', email: 'penelope.parker@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 48, name: 'Grayson Collins', email: 'grayson.collins@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 49, name: 'Layla Edwards', email: 'layla.edwards@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Pending', integrationSeats: { teams: true, slack: false } },
  { id: 50, name: 'Leo Stewart', email: 'leo.stewart@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 51, name: 'Zoey Sanchez', email: 'zoey.sanchez@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 52, name: 'Lincoln Morris', email: 'lincoln.morris@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 53, name: 'Nora Rogers', email: 'nora.rogers@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Inactive', integrationSeats: { teams: true, slack: true } },
  { id: 54, name: 'Isaiah Reed', email: 'isaiah.reed@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 55, name: 'Lily Cook', email: 'lily.cook@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 56, name: 'Jaxon Morgan', email: 'jaxon.morgan@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 57, name: 'Eleanor Bell', email: 'eleanor.bell@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 58, name: 'Asher Murphy', email: 'asher.murphy@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 59, name: 'Hannah Bailey', email: 'hannah.bailey@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 60, name: 'Mateo Rivera', email: 'mateo.rivera@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 61, name: 'Addison Cooper', email: 'addison.cooper@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 62, name: 'Maverick Richardson', email: 'maverick.richardson@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 63, name: 'Aubrey Cox', email: 'aubrey.cox@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Pending', integrationSeats: { teams: true, slack: true } },
  { id: 64, name: 'Ezra Howard', email: 'ezra.howard@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 65, name: 'Stella Ward', email: 'stella.ward@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 66, name: 'Elias Torres', email: 'elias.torres@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 67, name: 'Natalie Peterson', email: 'natalie.peterson@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Inactive', integrationSeats: { teams: false, slack: true } },
  { id: 68, name: 'Carson Gray', email: 'carson.gray@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 69, name: 'Leah Ramirez', email: 'leah.ramirez@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 70, name: 'Hudson James', email: 'hudson.james@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 71, name: 'Hazel Watson', email: 'hazel.watson@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 72, name: 'Colton Brooks', email: 'colton.brooks@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 73, name: 'Violet Kelly', email: 'violet.kelly@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: true, slack: true } },
  { id: 74, name: 'Dominic Sanders', email: 'dominic.sanders@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 75, name: 'Aurora Price', email: 'aurora.price@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 76, name: 'Austin Bennett', email: 'austin.bennett@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 77, name: 'Savannah Wood', email: 'savannah.wood@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Pending', integrationSeats: { teams: false, slack: true } },
  { id: 78, name: 'Everett Barnes', email: 'everett.barnes@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 79, name: 'Brooklyn Ross', email: 'brooklyn.ross@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 80, name: 'Kai Henderson', email: 'kai.henderson@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 81, name: 'Bella Coleman', email: 'bella.coleman@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 82, name: 'Zachary Jenkins', email: 'zachary.jenkins@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 83, name: 'Claire Perry', email: 'claire.perry@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: true, slack: true } },
  { id: 84, name: 'Nolan Powell', email: 'nolan.powell@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 85, name: 'Skylar Long', email: 'skylar.long@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 86, name: 'Christian Patterson', email: 'christian.patterson@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 87, name: 'Lucy Hughes', email: 'lucy.hughes@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: true } },
  { id: 88, name: 'Aaron Flores', email: 'aaron.flores@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 89, name: 'Anna Washington', email: 'anna.washington@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: true, slack: false } },
  { id: 90, name: 'Ian Butler', email: 'ian.butler@company.com', seatType: 'platform', platformSubType: 'standard', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 91, name: 'Caroline Simmons', email: 'caroline.simmons@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-analyst', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 92, name: 'Axel Foster', email: 'axel.foster@company.com', seatType: 'platform', platformSubType: 'standard', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  // View-Only users (50 users)
  { id: 93, name: 'Grace Hooper', email: 'grace.hooper@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 94, name: 'Maria Garcia', email: 'maria.garcia@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 95, name: 'James Wilson', email: 'james.wilson@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 96, name: 'Genesis Gonzales', email: 'genesis.gonzales@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 97, name: 'Nathan Bryant', email: 'nathan.bryant@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 98, name: 'Kennedy Alexander', email: 'kennedy.alexander@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 99, name: 'Miles Russell', email: 'miles.russell@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 100, name: 'Samantha Griffin', email: 'samantha.griffin@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 101, name: 'Cooper Diaz', email: 'cooper.diaz@company.com', seatType: 'view-only', role: null, status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 102, name: 'Paisley Hayes', email: 'paisley.hayes@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 103, name: 'Bentley Myers', email: 'bentley.myers@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 104, name: 'Piper Ford', email: 'piper.ford@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 105, name: 'Easton Hamilton', email: 'easton.hamilton@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 106, name: 'Naomi Graham', email: 'naomi.graham@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 107, name: 'Santiago Sullivan', email: 'santiago.sullivan@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 108, name: 'Emilia Wallace', email: 'emilia.wallace@company.com', seatType: 'view-only', role: null, status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 109, name: 'Weston West', email: 'weston.west@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 110, name: 'Elena Cole', email: 'elena.cole@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 111, name: 'Wesley Jordan', email: 'wesley.jordan@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 112, name: 'Sarah Owens', email: 'sarah.owens@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 113, name: 'Silas Reynolds', email: 'silas.reynolds@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 114, name: 'Madelyn Fisher', email: 'madelyn.fisher@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 115, name: 'Declan Ellis', email: 'declan.ellis@company.com', seatType: 'view-only', role: null, status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 116, name: 'Willow Harrison', email: 'willow.harrison@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 117, name: 'Ryder Gibson', email: 'ryder.gibson@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 118, name: 'Ruby McDonald', email: 'ruby.mcdonald@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 119, name: 'Roman Cruz', email: 'roman.cruz@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 120, name: 'Ivy Marshall', email: 'ivy.marshall@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 121, name: 'Jasper Ortiz', email: 'jasper.ortiz@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 122, name: 'Jade Gomez', email: 'jade.gomez@company.com', seatType: 'view-only', role: null, status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 123, name: 'Emmett Murray', email: 'emmett.murray@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 124, name: 'Ariana Freeman', email: 'ariana.freeman@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 125, name: 'Parker Wells', email: 'parker.wells@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 126, name: 'Eva Webb', email: 'eva.webb@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 127, name: 'Theodore Simpson', email: 'theodore.simpson@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 128, name: 'Alice Stevens', email: 'alice.stevens@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 129, name: 'Blake Tucker', email: 'blake.tucker@company.com', seatType: 'view-only', role: null, status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 130, name: 'Maya Porter', email: 'maya.porter@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 131, name: 'Damian Hunter', email: 'damian.hunter@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 132, name: 'Valentina Hicks', email: 'valentina.hicks@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 133, name: 'Beau Crawford', email: 'beau.crawford@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 134, name: 'Autumn Henry', email: 'autumn.henry@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 135, name: 'Finn Boyd', email: 'finn.boyd@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 136, name: 'Clara Mason', email: 'clara.mason@company.com', seatType: 'view-only', role: null, status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 137, name: 'Harrison Morales', email: 'harrison.morales@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 138, name: 'Serenity Kennedy', email: 'serenity.kennedy@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 139, name: 'Rowan Warren', email: 'rowan.warren@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 140, name: 'Luna Dixon', email: 'luna.dixon@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 141, name: 'Landon Ramos', email: 'landon.ramos@company.com', seatType: 'view-only', role: null, status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 142, name: 'Gianna Reyes', email: 'gianna.reyes@company.com', seatType: 'view-only', role: null, status: 'Active', integrationSeats: { teams: false, slack: false } },
  // Interactor users (99 users)
  { id: 143, name: 'Chen Wei', email: 'chen.wei@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 144, name: 'August Burns', email: 'august.burns@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 145, name: 'Madeline Gordon', email: 'madeline.gordon@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 146, name: 'Myles Shaw', email: 'myles.shaw@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 147, name: 'Peyton Holmes', email: 'peyton.holmes@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 148, name: 'Chase Rice', email: 'chase.rice@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 149, name: 'Adalynn Robertson', email: 'adalynn.robertson@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 150, name: 'Brandon Hunt', email: 'brandon.hunt@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 151, name: 'Mackenzie Black', email: 'mackenzie.black@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 152, name: 'Jace Palmer', email: 'jace.palmer@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 153, name: 'Reagan Stone', email: 'reagan.stone@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 154, name: 'Bryson Knight', email: 'bryson.knight@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 155, name: 'Adaline Webb', email: 'adaline.webb@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 156, name: 'Xavier Carroll', email: 'xavier.carroll@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 157, name: 'Kinsley Ferguson', email: 'kinsley.ferguson@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 158, name: 'Kayden Rose', email: 'kayden.rose@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 159, name: 'Eloise Kim', email: 'eloise.kim@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 160, name: 'Jesse Dean', email: 'jesse.dean@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 161, name: 'Delilah Lane', email: 'delilah.lane@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 162, name: 'Jason Perkins', email: 'jason.perkins@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 163, name: 'Athena Fox', email: 'athena.fox@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 164, name: 'Greyson Ray', email: 'greyson.ray@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 165, name: 'Lila Harvey', email: 'lila.harvey@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 166, name: 'Sawyer Little', email: 'sawyer.little@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 167, name: 'Rylee Vasquez', email: 'rylee.vasquez@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 168, name: 'Derek Sims', email: 'derek.sims@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 169, name: 'Hailey Chapman', email: 'hailey.chapman@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 170, name: 'Tristan Curtis', email: 'tristan.curtis@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 171, name: 'Brooke Spencer', email: 'brooke.spencer@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 172, name: 'Cameron Porter', email: 'cameron.porter@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 173, name: 'Daisy Nguyen', email: 'daisy.nguyen@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 174, name: 'Josiah Chavez', email: 'josiah.chavez@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 175, name: 'Quinn Medina', email: 'quinn.medina@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 176, name: 'Jonathan O\'Brien', email: 'jonathan.obrien@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 177, name: 'Melody Castro', email: 'melody.castro@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 178, name: 'Tucker Morrison', email: 'tucker.morrison@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 179, name: 'Julia Hansen', email: 'julia.hansen@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 180, name: 'Vincent Fernandez', email: 'vincent.fernandez@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 181, name: 'Faith Garza', email: 'faith.garza@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 182, name: 'George Harvey', email: 'george.harvey@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 183, name: 'Alexandra Nichols', email: 'alexandra.nichols@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 184, name: 'Diego Weaver', email: 'diego.weaver@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 185, name: 'Morgan Grant', email: 'morgan.grant@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 186, name: 'Kevin Dunn', email: 'kevin.dunn@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 187, name: 'Trinity Fields', email: 'trinity.fields@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 188, name: 'Maxwell Sharp', email: 'maxwell.sharp@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 189, name: 'Alyssa Snyder', email: 'alyssa.snyder@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 190, name: 'Adam Barnes', email: 'adam.barnes@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 191, name: 'Rachel Watts', email: 'rachel.watts@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 192, name: 'Joel Holland', email: 'joel.holland@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 193, name: 'Isabelle Drake', email: 'isabelle.drake@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 194, name: 'Marcus Cross', email: 'marcus.cross@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 195, name: 'Sophie Cannon', email: 'sophie.cannon@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 196, name: 'Patrick Barker', email: 'patrick.barker@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 197, name: 'Lauren Reeves', email: 'lauren.reeves@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 198, name: 'Braxton Randall', email: 'braxton.randall@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 199, name: 'Molly Walsh', email: 'molly.walsh@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 200, name: 'Kyle Erickson', email: 'kyle.erickson@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 201, name: 'Paige Holt', email: 'paige.holt@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 202, name: 'Travis Lamb', email: 'travis.lamb@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 203, name: 'Brielle Jennings', email: 'brielle.jennings@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 204, name: 'Cole Manning', email: 'cole.manning@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 205, name: 'Katherine Moss', email: 'katherine.moss@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 206, name: 'Derek Thornton', email: 'derek.thornton@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 207, name: 'Vanessa Schneider', email: 'vanessa.schneider@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 208, name: 'Seth Floyd', email: 'seth.floyd@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 209, name: 'Jordyn Hampton', email: 'jordyn.hampton@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 210, name: 'Cody Chandler', email: 'cody.chandler@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 211, name: 'Alina Sharp', email: 'alina.sharp@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 212, name: 'Preston Blake', email: 'preston.blake@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 213, name: 'Camila Pearson', email: 'camila.pearson@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 214, name: 'Shane Mccarthy', email: 'shane.mccarthy@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 215, name: 'Teagan Dawson', email: 'teagan.dawson@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 216, name: 'Grant Fitzgerald', email: 'grant.fitzgerald@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 217, name: 'Gabriella Conner', email: 'gabriella.conner@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 218, name: 'Brady Atkins', email: 'brady.atkins@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 219, name: 'Fiona Daniels', email: 'fiona.daniels@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 220, name: 'Oscar Wise', email: 'oscar.wise@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 221, name: 'Eliana Norris', email: 'eliana.norris@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 222, name: 'Gage Luna', email: 'gage.luna@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 223, name: 'Anastasia Paul', email: 'anastasia.paul@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 224, name: 'Damien Bates', email: 'damien.bates@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 225, name: 'Mariana Hardy', email: 'mariana.hardy@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 226, name: 'Felix Schwartz', email: 'felix.schwartz@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 227, name: 'Cecilia Keller', email: 'cecilia.keller@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 228, name: 'Andres Avery', email: 'andres.avery@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 229, name: 'Sierra Beck', email: 'sierra.beck@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 230, name: 'Tanner Browning', email: 'tanner.browning@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 231, name: 'Cassidy Salazar', email: 'cassidy.salazar@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 232, name: 'Anderson Frost', email: 'anderson.frost@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 233, name: 'Hope Maldonado', email: 'hope.maldonado@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 234, name: 'Marcus Chen', email: 'marcus.chen@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 235, name: 'Olivia Foster', email: 'olivia.foster@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 236, name: 'Ryan Patel', email: 'ryan.patel@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Pending', integrationSeats: { teams: false, slack: false } },
  { id: 237, name: 'Nicole Park', email: 'nicole.park@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 238, name: 'Tyler Kim', email: 'tyler.kim@company.com', seatType: 'interactor', role: 'explore-standard', status: 'Inactive', integrationSeats: { teams: false, slack: false } },
  { id: 239, name: 'Amanda Lee', email: 'amanda.lee@company.com', seatType: 'interactor', role: 'custom-operator', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 240, name: 'Justin Wang', email: 'justin.wang@company.com', seatType: 'interactor', role: 'custom-analyst', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 241, name: 'Stephanie Liu', email: 'stephanie.liu@company.com', seatType: 'interactor', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
]

export const INITIAL_INTERNAL_USERS_V10 = [
  { id: 1001, name: 'Support Agent 1', email: 'support1@app.internal', seatType: 'platform', platformSubType: 'admin', role: 'explore-standard-plus', status: 'Active', integrationSeats: { teams: false, slack: false } },
  { id: 1002, name: 'Support Agent 2', email: 'support2@app.internal', seatType: 'interactor', role: 'explore-standard', status: 'Active', integrationSeats: { teams: false, slack: false } },
]

// LocalStorage key for V10 users persistence (bump version to clear stale cache)
export const V10_USERS_STORAGE_KEY = 'seatsV10Users_v2'

// Helper to generate realistic lastActive values based on status and user id
const LAST_ACTIVE_VALUES = [
  '5m ago', '12m ago', '30m ago', '45m ago', '1h ago', '2h ago', '3h ago', '5h ago',
  'Yesterday', '2 days ago', '3 days ago', 'Last week', 'Jan 15, 2026', 'Jan 10, 2026', 'Dec 28, 2025'
]

// Apply lastActive to V10 users
INITIAL_USERS_V10.forEach((user, index) => {
  user.lastActive = user.status === 'Pending' ? '—' : user.status === 'Inactive' ? 'Dec 15, 2025' : LAST_ACTIVE_VALUES[index % LAST_ACTIVE_VALUES.length]
})

INITIAL_INTERNAL_USERS_V10.forEach((user, index) => {
  user.lastActive = user.status === 'Pending' ? '—' : user.status === 'Inactive' ? 'Dec 15, 2025' : LAST_ACTIVE_VALUES[index % LAST_ACTIVE_VALUES.length]
})

// Canonical group assignments by user name (from INITIAL_USERS_WITH_GROUPS)
const CANONICAL_GROUPS = {
  'Alice Bergson': [2],           // EMEA
  'Bobby Bonds': [1, 6],          // APAC, Operations
  'Daniel Smith': [1, 2, 3, 4, 5], // APAC, EMEA, Engineering, North America, Product
  'Evan Fischer': [4, 6],         // North America, Operations
  'Grace Hooper': [],             // No groups
  'Ophelia Fitzgerald': [1, 3, 5], // APAC, Engineering, Product
  'Chen Wei': [1, 7],             // APAC, Sales
  'Maria Garcia': [2, 8],         // EMEA, Marketing
  'James Wilson': [4],            // North America
  'Priya Patel': [1, 3],          // APAC, Engineering
  'Tom Anderson': [6, 10],        // Operations, Customer Support
}

// Group assignment patterns for users without canonical assignments
const GROUP_PATTERNS = [
  [1, 2, 3, 5, 6],      // APAC, EMEA, Engineering, Product, Operations (5 groups)
  [1, 3],               // APAC, Engineering (2 groups)
  [2, 5, 7],            // EMEA, Product, Sales (3 groups)
  [4, 6, 8, 9],         // North America, Operations, Marketing, Finance (4 groups)
  [3, 12],              // Engineering, Data Science (2 groups)
  [5, 13, 14],          // Product, Quality Assurance, R&D (3 groups)
  [7, 8, 15],           // Sales, Marketing, Business Development (3 groups)
  [1],                  // APAC only (1 group)
  [6, 9, 10],           // Operations, Finance, Customer Support (3 groups)
  [3, 5, 11, 12, 13, 14], // Engineering, Product, IT, Data Science, QA, R&D (6 groups)
  [],                   // No groups
  [2, 4],               // EMEA, North America (2 groups)
  [1, 2, 4],            // APAC, EMEA, North America (3 groups - regional)
]

// Apply groups to V10 users - use canonical if available, otherwise pattern
INITIAL_USERS_V10.forEach((user, index) => {
  if (CANONICAL_GROUPS[user.name]) {
    user.groups = CANONICAL_GROUPS[user.name]
  } else {
    user.groups = GROUP_PATTERNS[index % GROUP_PATTERNS.length]
  }
})

INITIAL_INTERNAL_USERS_V10.forEach((user, index) => {
  if (CANONICAL_GROUPS[user.name]) {
    user.groups = CANONICAL_GROUPS[user.name]
  } else {
    user.groups = GROUP_PATTERNS[(index + 5) % GROUP_PATTERNS.length]
  }
})
