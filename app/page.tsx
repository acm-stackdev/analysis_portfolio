import { Navbar } from "./components/navbar";
import { HomeSection } from "./components/home-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="snap-y snap-mandatory max-h-screen">
        <HomeSection />
      </main>
    </>
  );
}
