"use client";

import { useLottie } from "lottie-react";
import animationData from "../../public/Online Work.json";

export const LottieComponent = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <div>
      <div className="w-full">{View}</div>
    </div>
  );
};

export default LottieComponent;
