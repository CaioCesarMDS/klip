import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layouts/AppLayout";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { RecentsPage } from "@/pages/RecentsPage";
import { SettingsPages } from "@/pages/SettingsPage";

export const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<RecentsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/settings" element={<SettingsPages />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
