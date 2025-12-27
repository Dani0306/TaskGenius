import Image from "next/image";

type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeMap = {
  sm: {
    container: "w-5 h-5", // 20px
    text: "text-sm", // 14px
    gap: "space-x-1",
  },
  md: {
    container: "w-7 h-7", // 28px
    text: "text-base md:text-lg", // 16–18px
    gap: "space-x-1.5",
  },
  lg: {
    container: "w-9 h-9", // 36px
    text: "text-lg md:text-xl", // 18–20px
    gap: "space-x-2",
  },
  xl: {
    container: "w-12 h-12", // 48px
    text: "text-xl md:text-2xl", // 20–24px
    gap: "space-x-3",
  },
};

const AppLogoLanding = ({ size = "md" }: { size?: LogoSize }) => {
  const { container, text, gap } = sizeMap[size];

  return (
    <div className={`flex ${gap} items-center`}>
      <div className={`relative ${container}`}>
        <Image src={"/star.png"} alt="star logo" fill />
      </div>

      <span className={`font-semibold text-black ${text}`}>TaskGenius AI</span>
    </div>
  );
};

export default AppLogoLanding;
