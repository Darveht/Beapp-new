import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AppDetailPage from "@/pages/app-detail-page";
import DeveloperConsolePage from "@/pages/developer-console-page";
import UploadAppPage from "@/pages/upload-app-page";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/apps/:id" component={AppDetailPage} />
      <Route path="/search" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/developer" component={DeveloperConsolePage} requiredRole="developer" />
      <ProtectedRoute path="/developer/upload" component={UploadAppPage} requiredRole="developer" />
      <ProtectedRoute path="/developer/edit/:id" component={UploadAppPage} requiredRole="developer" />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
