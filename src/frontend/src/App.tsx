import { Layout } from "@/components/Layout";
import { TipsModal } from "@/components/TipsModal";
import { AwarenessSection } from "@/pages/AwarenessSection";
import { EmailAnalyzerSection } from "@/pages/EmailAnalyzerSection";
import { EmailScannerSection } from "@/pages/EmailScannerSection";
import { HeroSection } from "@/pages/HeroSection";
import { PhishingExamplesSection } from "@/pages/PhishingExamplesSection";
import { QuizSection } from "@/pages/QuizSection";
import { UrlCheckerSection } from "@/pages/UrlCheckerSection";
import { WebsiteSimSection } from "@/pages/WebsiteSimSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AwarenessSection />
      <EmailAnalyzerSection />
      <WebsiteSimSection />
      <UrlCheckerSection />
      <EmailScannerSection />
      <PhishingExamplesSection />
      <QuizSection />
    </Layout>
  );
}
