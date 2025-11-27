import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { ColorSystemProvider } from "./components/ColorSystemProvider";
import GeoRedirector from "./components/GeoRedirector";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PayMyBill from "./pages/PayMyBill";
import ResidentialService from "./pages/ResidentialService";
import CommercialService from "./pages/CommercialService";
import RollOffService from "./pages/RollOffService";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal";

import SitemapXML from "./pages/SitemapXML";
import DynamicSitemapGenerator from "./components/seo/DynamicSitemapGenerator";
import ContentAnalytics from "./components/ContentAnalytics";

// Keep only Windsor for residential
import Windsor from "./pages/residential/Windsor";

// Roll-off town pages
import RolloffTownPage from "./components/rolloff/RolloffTownPage";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ColorSystemProvider>
          <HelmetProvider>
          <Helmet>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-C0E6YGLW9W"></script>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-C0E6YGLW9W');
              `}
            </script>
          </Helmet>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ContentAnalytics />
            <DynamicSitemapGenerator />
            <Analytics />
            <BrowserRouter>
              <GeoRedirector />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pay-my-bill" element={<PayMyBill />} />
                <Route path="/residential" element={<ResidentialService />} />
                <Route path="/commercial" element={<CommercialService />} />
                <Route path="/roll-off-dumpsters" element={<RollOffService />} />
                
                <Route path="/legal" element={<Legal />} />
                
                {/* Redirect old legal pages to new combined legal page */}
                <Route path="/privacy-policy" element={<Navigate to="/legal" replace />} />
                <Route path="/terms-of-service" element={<Navigate to="/legal" replace />} />
                
                {/* Redirect services page to home */}
                <Route path="/services" element={<Navigate to="/" replace />} />
                
                <Route path="/sitemap" element={<SitemapXML />} />
                
                {/* Keep only Windsor residential page */}
                <Route path="/residential/windsor" element={<Windsor />} />
                
                {/* Redirect other residential towns to main residential page */}
                <Route path="/residential/fort-collins" element={<Navigate to="/residential" replace />} />
                <Route path="/residential/wellington" element={<Navigate to="/residential" replace />} />
                <Route path="/residential/greeley" element={<Navigate to="/residential" replace />} />
                <Route path="/residential/north-county" element={<Navigate to="/residential" replace />} />
                <Route path="/residential/severance" element={<Navigate to="/residential" replace />} />
                 
                 {/* Redirect commercial size pages to main commercial page */}
                 <Route path="/commercial/2-yard" element={<Navigate to="/commercial" replace />} />
                 <Route path="/commercial/3-yard" element={<Navigate to="/commercial" replace />} />
                 <Route path="/commercial/4-yard" element={<Navigate to="/commercial" replace />} />
                 <Route path="/commercial/6-yard" element={<Navigate to="/commercial" replace />} />
                 <Route path="/commercial/8-yard" element={<Navigate to="/commercial" replace />} />
                  
                   {/* Roll-off town pages - dynamic route */}
                    <Route path="/roll-off-dumpsters/:slug" element={<RolloffTownPage />} />
                 
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
        </ColorSystemProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
