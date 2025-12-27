import Image from "next/image";

const SignInWithProviderButton = ({
  src,
  provider,
  onClick,
}: {
  src: string;
  provider: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white w-full cursor-pointer transition-all duration-200 rounded-full py-3 text-bsae flex items-center justify-center space-x-4"
    >
      <div className="h-full flex items-center justify-center relative">
        <Image
          src={src}
          width={provider === "Apple" ? 18 : 25}
          height={provider === "Apple" ? 18 : 25}
          alt="Provider Login"
          className="rounded-full"
          objectFit="cover"
        />
      </div>
      <span className="text-black font-medium">Sign In with {provider}</span>
    </button>
  );
};

export default SignInWithProviderButton;
