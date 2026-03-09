import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LottieComponent } from "./lottieComponent";
import Link from "next/link";

export const HomeSection = () => {
  return (
    <>
      <section id="home" className="relative overflow-hidden">
        <section className="hidden min-h-screen h-fit w-full absolute -z-10 opacity-2.5 top-20 md:flex items-center justify-center select-none">
          <div className="text-center scale-200 rotate-12 font-serif font-stretch-expanded">
            <p className="text-4xl md:text-9xl font-semibold leading-none -mb-5">
              Passionate
            </p>
            <p className="text-4xl md:text-9xl font-semibold leading-none -mb-5">
              Professional
            </p>
            <p className="text-4xl md:text-9xl font-semibold leading-none -mb-5">
              Data-Analyst
            </p>
            <p className="text-4xl md:text-9xl font-semibold leading-none">
              Logical Thinker
            </p>
          </div>
        </section>
        <section className="min-h-screen w-full flex items-center justify-center px-4">
          <div className="max-w-6xl w-full flex flex-col-reverse mt-16 md:mt-0 md:flex-row items-center justify-around gap-8">
            <div className="md:max-w-[60%] w-full pl-0">
              <span className="text-base md:text-md text-primary select-none">
                Hi, my name is
              </span>
              <h1 className="text-4xl md:text-7xl font-bold mt-2 mb-2">
                John Tin
              </h1>
              <h1 className="text-3xl md:text-5xl text-primary mt-3 mb-3 select-none">
                Data-Analyst
              </h1>
              <p className="text-base md:text-md mb-1">
                I am a postgraduate student in Supply Chain and Operations
                Management passionate about optimizing processes and building
                efficient, resilient supply chains.
              </p>
              <p className="text-base md:text-md">
                I combine analytical thinking, Lean and Six Sigma principles,
                and real-world procurement experience to help organizations
                improve operations and make better data-driven decisions.
              </p>
              <div className="mt-5 scale-100 md:scale-110 pl-0 md:pl-7">
                <Button className="text-sm md:text-base mr-4 text-secondary">
                  Download CV
                </Button>
                <Button className="text-sm md:text-base text-secondary">
                  Contact Me!
                </Button>
              </div>
            </div>
            <div className="w-full md:w-auto flex justify-center">
              <LottieComponent />
            </div>
          </div>
        </section>
        <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 w-fit scale-85 text-center select-none">
          <Link
            href="#about"
            className="hover:text-primary transition-colors duration-300"
          >
            <div className="mb-2">Scroll</div>
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center mx-auto">
              <div className="w-1 h-3 bg-primary mt-2 rounded-full animate-bounce"></div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};
