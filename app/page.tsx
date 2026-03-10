import { Navbar } from "./components/navbar";
import { HomeSection } from "./components/home-section";
import { AboutSection } from "./components/about-section";
import { Footer } from "./components/footer";
import { CareerSection } from "./components/career-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="snap-y snap-mandatory max-h-screen">
        <HomeSection />
        <AboutSection />
        <CareerSection />
        <Footer />
      </main>
    </>
  );
}
