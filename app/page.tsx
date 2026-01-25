import { Navbar } from "./components/navbar";
import { HomeSection } from "./components/home-section";
import { AboutSection } from "./components/about-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="snap-y snap-mandatory max-h-screen">
        <HomeSection />
        <AboutSection />
      </main>
    </>
  );
}
