"use client";

import { useLottie } from "lottie-react";
import animationData from "../../public/404 Not Found.json";

export const NotFoundLottie = () => {
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

export default NotFoundLottie;
