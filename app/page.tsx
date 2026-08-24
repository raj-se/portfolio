import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import Marquee from "@/components/Marquee";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="relative">
      <div className="grain-overlay" aria-hidden />
      <ScrollProgress />
      <CursorGlow />
      <BackToTop />
      <Header />
      <Hero />
      <Marquee />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  );
}