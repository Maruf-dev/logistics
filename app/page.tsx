import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Coverage from "@/components/Coverage";
import Process from "@/components/Process";
import Equipment from "@/components/Equipment";
import Why from "@/components/Why";
import Apply from "@/components/Apply";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <span id="top" />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Stats />
        <Services />
        <Coverage />
        <Process />
        <Equipment />
        <Why />
        <Apply />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
