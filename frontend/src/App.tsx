import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./layout/PrivateRoutes";
import PublicRoutes from "./layout/PublicRoutes";
import { Login, Register } from "src/pages/public";
import {
  Dashboard,
  Messages,
  Contacts,
  Settings,
  Profile,
  QuickAnswers,
  ClosingNotes,
  Channels,
  Users,
  General,
  GeneralOrganization,
} from "src/pages/private";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/" element={<PrivateRoutes />}>
        <Route index element={<Dashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="settings" element={<Settings />}>
          <Route index element={<Navigate to={"profile"} replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="general" element={<General />} />
          <Route path="users" element={<Users />} />
          <Route path="channels" element={<Channels />} />
          <Route path="closing-notes" element={<ClosingNotes />} />
          <Route path="quick-answers" element={<QuickAnswers />} />
          <Route path="organizationGeneral" element={<GeneralOrganization />} />
          <Route path="*" element={<Navigate to={"profile"} replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
