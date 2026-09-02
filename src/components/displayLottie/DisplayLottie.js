import React, {Suspense, useContext, useMemo} from "react";
import Lottie from "lottie-react";
import Loading from "../../containers/loading/Loading";
import StyleContext from "../../contexts/StyleContext";
import {recolorLottie} from "./recolorLottie";

export default function DisplayLottie({animationData, darkModeColors}) {
  // Unit tests render this component without a StyleProvider.
  const isDark = Boolean(useContext(StyleContext)?.isDark);
  const themedData = useMemo(
    () =>
      isDark && darkModeColors
        ? recolorLottie(animationData, darkModeColors)
        : animationData,
    [animationData, darkModeColors, isDark]
  );
  return (
    <Suspense fallback={<Loading />}>
      <Lottie
        animationData={themedData}
        loop={true}
        autoplay={true}
        style={{width: "100%", height: "100%"}}
      />
    </Suspense>
  );
}
