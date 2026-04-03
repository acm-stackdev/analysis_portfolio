"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeLottie from "./home-lottie";

export const HomeSection = () => {
  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById("about");
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      <section id="home" className="relative overflow-hidden pb-15">
        <section className="hidden min-h-[95vh] h-fit w-full absolute -z-10 opacity-2.5 top-20 md:flex items-center justify-center select-none">
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
        <section className="min-h-[95vh] w-full flex items-center justify-center px-4">
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
              <p className="text-base md:text-md mb-1 text-justify">
                A Business Intelligence Developer at Marks & Spencer who enjoys
                transforming complex data into meaningful insights and scalable
                BI solutions.
              </p>
              <p className="text-base md:text-md mb-1 text-justify">
                With a background in engineering and supply chain, I'm
                passionate about solving real-world problems using data. I've
                completed the Data Fellowship Level 4 programme and continue
                exploring machine learning in my free time.
              </p>
              <p className="text-base md:text-md text-justify">
                Outside of work, I enjoy reading, travelling, and sharing my
                learning journey through a Facebook page where I post about
                data, career growth, and personal experiences.
              </p>
              <div className="mt-5">
                <Button
                  aria-label="Download CV"
                  className="text-sm font-bold md:text-base mr-4 text-secondary"
                >
                  <Link href="/resume">View My CV</Link>
                </Button>
                <Button
                  aria-label="Contact Me"
                  className="text-sm font-bold md:text-base text-secondary"
                >
                  <Link href="mailto:johntin97@outlook.com">Contact Me!</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-auto flex justify-center">
              <HomeLottie />
            </div>
          </div>
        </section>
        <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 w-fit scale-85 text-center select-none">
          <Link
            href="#about"
            onClick={handleScrollToAbout}
            aria-label="Scroll to about section"
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
