import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Coverage from "@/components/Coverage";
import Process from "@/components/Process";
import Equipment from "@/components/Equipment";
import Why from "@/components/Why";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <span id="top" />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Coverage />
        <Process />
        <Equipment />
        <Why />
        <QuoteForm />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
