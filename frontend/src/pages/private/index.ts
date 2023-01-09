export { default as Dashboard } from "./Dashboard/Dashboard";
export { default as Messages } from "./Messages/Messages";
export { default as Contacts } from "./Contacts/Contacts";
export { default as Settings } from "./Settings/Settings";

// Nested routes
export { default as Profile } from "./Settings/subRoutes/Profile";

// Workspace routes
export { default as General } from "./Settings/subRoutes/workspace/General";
export { default as Users } from "./Settings/subRoutes/workspace/Users";
export { default as Channels } from "./Settings/subRoutes/workspace/Channels";
export { default as ClosingNotes } from "./Settings/subRoutes/workspace/ClosingNotes";
export { default as QuickAnswers } from "./Settings/subRoutes/workspace/QuickAnswers";

// Organization routes
export { default as GeneralOrganization } from "./Settings/subRoutes/workspace/General";
