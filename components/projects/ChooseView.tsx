import { NotebookPen, SparklesIcon } from "lucide-react";
import React, { useState } from "react";
import CreateProjectIdeaModal from "./CreateProjectIdeaModal";
import ImproviseWithAi from "./ImproviseWithAi";

const ChooseView = () => {
  const [section, setSection] = useState<number | null>(null);

  return (
    <>
      {!section ? (
        <div className="w-full h-full flex flex-col mt-28 items-center overflow-auto no-scrollbar">
          <h2 className="text-2xl lg:text-3xl font-semibold text-black text-center">
            Let&apos;s start building your project.
          </h2>
          <p className="text-gray-600 text-sm text-center px-2">
            Choose how you&apos;d like to begin and let our AI assist you in
            bringing your vision to life.
          </p>
          <div className="flex flex-col items-center gap-5 lg:flex-row justify-center mt-13 px-6">
            <div
              onClick={() => setSection(1)}
              className={`bg-white p-5 w-full lg:w-[40%] space-y-4 flex flex-col shadow-xl min-h-[230px] rounded-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
            >
              <NotebookPen className="size-14 bg-primary/20 text-primary rounded-xl p-4" />
              <strong className="text-black font-semibold">
                Already have somthing in mind?
              </strong>
              <p className="text-sm">
                Perfect! Describe your project, and we&apos;ll help you
                structure and build it from the ground up.
              </p>
            </div>
            <div
              onClick={() => setSection(2)}
              className={`bg-white p-5 w-full lg:w-[40%] flex flex-col space-y-4 shadow-xl min-h-[230px] rounded-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
            >
              <SparklesIcon className="size-14 bg-primary/20 text-primary rounded-xl p-4" />
              <strong className="text-black font-semibold">
                Want to improvise with AI?
              </strong>
              <p className="text-sm">
                Feeling spontaneous? Let our AI generate creative project ideas
                for you to explore and develop.
              </p>
            </div>
          </div>
        </div>
      ) : section === 1 ? (
        <CreateProjectIdeaModal />
      ) : (
        <ImproviseWithAi />
      )}
    </>
  );
};

export default ChooseView;
