import { Navbar } from "./components/navbar";
import { HomeSection } from "./components/home-section";
import { AboutSection } from "./components/about-section";
import { Footer } from "./components/footer";
import { CareerSection } from "./components/career-section";
import { SideNav } from "./components/side-nav";

export default function Home() {
  return (
    <>
      <Navbar />
      <SideNav />
      <main className="snap-y snap-mandatory max-h-screen">
        <HomeSection />
        <AboutSection />
        <CareerSection />
        <Footer />
      </main>
    </>
  );
}
