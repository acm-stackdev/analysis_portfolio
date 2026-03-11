import { RoughNotation } from "react-rough-notation";
import Image from "next/image";

export const AboutSection = () => {
  return (
    <>
      <section
        id="about"
        className="w-full min-h-[95vh] text-center bg-background-thin custom-grid py-10 md:py-10"
      >
        <div className="pb-5 text-2xl font-bold">
          <RoughNotation
            type="underline"
            show={true}
            animationDuration={1500}
            animationDelay={500}
          >
            About Me
          </RoughNotation>
        </div>
        <div className="max-w-7xl mx-auto pt-0 md:pt-5 md:grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
          <div className="flex justify-center p-10 md:p-0">
            <Image
              src="/hero.jpg"
              alt="Profile"
              width={300}
              height={300}
              objectFit="fill"
              className="rounded-3xl"
            />
          </div>
          <div className="text-left max-w-2xl mx-5 md:mx-0">
            <p className="text-base md:text-md leading-relaxed text-left md:text-justify">
              Analytical Data & BI Specialist with expertise in Azure
              technologies, Power BI, and SQL. Proven track record in designing
              robust star schemas and governed datasets that bridge the gap
              between technical data engineering and actionable business
              intelligence. Skilled in automating workflows via Power Platform
              to enhance warehouse and data operations.
            </p>
            <div className="mt-4 font-bold">Education Background</div>
            <div>
              <h1 className="font-semibold text-primary text-base md:text-lg mt-4">
                Master's Supply Chain and Operation Management
              </h1>
              <h2 className="text-base md:text-md italic mt-2">
                University of Nottingham | 2021 ~ 2022
              </h2>
              <p className="text-base md:text-md mt-2">Merit - 68.2%</p>
              <li className="text-base md:text-md ml-6 leading-relaxed mt-2">
                Attained the highest score in a group project involving the
                analysis of Boots Pharmaceutical's supply chain strategy,
                standing out amongst 232 students.
              </li>
              <li className="text-sm md:text-base ml-6 leading-relaxed mt-2">
                Successfully developed Work Breakdown Structures (WBS) and
                resource histograms for intricate projects. Utilized tools such
                as PERT and Monte Carlo simulation analysis and Earned Value
                Analysis techniques to effectively manage projects, with a
                success rate of 75%.
              </li>
              <li className="text-sm md:text-base ml-6 leading-relaxed mt-2">
                Performed a comprehensive operation and strategy analysis for
                DHL using the Operation Strategy Matrix, identifying key Order
                Qualifiers and Order Winners.
              </li>
            </div>
            <div>
              <h1 className="font-semibold text-primary text-base md:text-lg mt-4">
                Bachelor of Science: Engineering
              </h1>
              <h2 className="text-sm md:text-base italic mt-2">
                West Yangon Technological University | 2013 ~ 2019
              </h2>
              <p className="text-sm md:text-base mt-2">GPA: 4.84/5.0</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
