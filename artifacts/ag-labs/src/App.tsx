import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

const PortfolioPage = lazy(() => import("@/pages/portfolio"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </WouterRouter>
  );
}

export default App;
