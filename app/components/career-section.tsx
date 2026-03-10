import { RoughNotation } from "react-rough-notation";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export const CareerSection = () => {
  return (
    <section id="career" className="w-full min-h-[95vh] custom-grid">
      <div className="p-10 text-2xl font-bold text-center">
        <RoughNotation
          type="underline"
          show={true}
          animationDuration={1500}
          animationDelay={500}
        >
          Professional Journey
        </RoughNotation>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="relative flex items-start">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Timeline item */}
          <div className="relative flex items-start space-x-8">
            {/* Timeline circle */}
            <div className="relative shrink-0 ml-[13px]">
              <div className="w-6 h-6 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
              </div>
            </div>

            {/* Content */}
            <Popover>
              <PopoverTrigger>
                <div className="flex-1 pb-12">
                  <div className="flex justify-between items-start text-left">
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-3">
                        Marks and Spencer | Sep 2023 - Present
                      </p>
                      <p className="text-lg font-semibold">Data Analyst</p>
                    </div>
                    <div className="flex-2 max-w-2xl ml-28">
                      Employed advanced analytics to reveal pivotal retail
                      trends, achieving process optimizations that substantially
                      increased efficiency and reduced the Customer Failure Rate
                      (CFR) to a remarkable 0.8% for retail orders.
                    </div>
                    <div className="my-5 mx-3 items-center">
                      <Tooltip>
                        <TooltipTrigger>
                          <ChevronRight />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Details</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-5xl">
                <PopoverHeader>
                  <PopoverTitle>Data Analyst</PopoverTitle>
                </PopoverHeader>
                <PopoverHeader>
                  <PopoverTitle>
                    Marks and Spencer | Sep 2023 - Present
                  </PopoverTitle>
                </PopoverHeader>
                <PopoverDescription className="ml-3">
                  <li>
                    Employed advanced analytics to reveal pivotal retail trends,
                    achieving process optimizations that substantially increased
                    efficiency and reduced the Customer Failure Rate (CFR) to a
                    remarkable 0.8% for retail orders.
                  </li>
                  <li>
                    Designed compelling Power BI visualizations that drove
                    data-informed strategies, enhancing operational productivity
                    and spearheading a 20% uplift in operational performance
                    metrics.
                  </li>
                  <li>
                    Optimized data workflows by integrating SQL, Python, Azure
                    Data Factory for building pipelines, Power Automate, and
                    Logic Apps to automate data tasks, markedly cutting down on
                    man-hours and minimizing errors.
                  </li>
                  <li>
                    Developed a network orderwell report for M&S distribution
                    centers, by using data from 5 databases, enhancing the
                    central e-commerce team's allocation efficiency and
                    achieving a 5% overall improvement in operational
                    efficiency.
                  </li>
                  <li>
                    Conducted a performance analysis of the Despatch Department,
                    utilizing hypothesis testing and linear regression to
                    identify key improvement areas, resulting in a 4%
                    enhancement in colleague performance.
                  </li>
                  <li>
                    Involved in the Warehouse Management System upgrade,
                    ensuring a seamless transition and maintaining smooth
                    operation of all critical reports, pipelines, and data
                    flows. Reviewed and rewrote the logic for reporting related
                    to the entire Despatch Operation, ensuring accuracy and
                    efficiency in the new system.
                  </li>
                  <li>
                    Developed a Power Apps solution to collect data for Accuracy
                    Audit checks in the Despatch area, integrated with Azure
                    Pipelines to cross-verify against the Warehouse Management
                    System, and utilized Power BI for data
                    visualization—resulting in a 10% improvement in audit
                    accuracy.
                  </li>
                  <li>
                    Contributed to the full network stock position and manual
                    stock allocation across all Distribution Centres during the
                    M&S cyber incident. Collaborated closely with the Demand &
                    Fulfilment team and DC Operations teams, enhancing stock
                    allocation efficiency under critical conditions.
                  </li>
                  <li>
                    Led the development of a Dispatch Department Performance
                    Report using SQL, Power BI, Azure Data Factory, and
                    PowerApps, improving performance metrics by 10% and
                    designing dashboards tailored for all management levels to
                    support mid-year reviews.
                  </li>
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </section>
  );
};
