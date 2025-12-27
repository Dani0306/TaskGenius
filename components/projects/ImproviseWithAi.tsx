import { useState } from "react";
import LoaderSpinner from "../shared/loader/LoaderSpinner";
import AppLogoLanding from "../shared/AppLogoLanding";
import CreatProjectModalActionButtons from "./CreatProjectModalActionButtons";
import SelectOptions from "../shared/select/SelectOptions";
import { Sparkles } from "lucide-react";
import ProjectIdea from "./ProjectIdea";
import ProjectAreas from "./ProjectAreas";
import {
  EXCLUSION_OPTIONS,
  PROJECT_SIZE_OPTIONS,
  PROJECT_VIBE_OPTIONS,
  TIME_COMMITMENT_OPTIONS,
} from "@/constants/project/improviseProject";
import { AIProjectIdea } from "@/types";
import { generateProjectImprovised } from "@/lib/prompts/projectImprovise";
import { generateProjectIdea } from "@/actions/ai/generateProjectIdea";
import { useToast } from "@/providers/toast/ToastProvider";
import { useModal } from "@/providers/context/AppModalProvider";

const ImproviseWithAi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [section, setSection] = useState<number>(1);
  const [time_commitment, setTime_commitment] = useState<string>("");
  const [interests, setTnterests] = useState<string>("personal");

  const [vibe, setVibe] = useState<string>("");
  const [project_size, setProject_size] = useState<string>("");
  const [exclusions, setExclusions] = useState<string>("");
  const [projectIdea, setProjectIdea] = useState<AIProjectIdea | null>(null);

  const { toast } = useToast();
  const { closeModal } = useModal();

  const generateProjectIdeaFn = async () => {
    setLoading(true);

    const prompt = generateProjectImprovised({
      interests,
      time_commitment,
      vibe,
      exclusions,
      project_size,
    });

    const result = await generateProjectIdea(prompt)
      .catch((err) => {
        toast({
          title: "Error generating idea.",
          description: err.message ?? "Unknown error",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });

    setProjectIdea(JSON.parse(result!));
    setSection(3);
  };

  const onRetry = () => {
    setSection(2);
    generateProjectIdeaFn();
  };

  return (
    <div className="w-full h-full ">
      <div className="w-[90%] h-full lg:w-[70%] mx-auto flex flex-col items-center space-y-5 overflow-auto no-scrollbar">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-3">
            <LoaderSpinner message="Generating Project Idea..." />
          </div>
        ) : (
          <>
            <div className="mt-12">
              <AppLogoLanding size="sm" />
            </div>
            {section !== 3 && (
              <h2 className="text-2xl lg:text-3xl font-semibold text-black text-center">
                Let AI Spark Your Next Great Project
              </h2>
            )}
            <div className="w-full flex flex-col space-y-10 mt-8">
              {section === 1 ? (
                <>
                  <span className="font-medium text-sm">
                    What are you interested in?
                  </span>
                  <ProjectAreas
                    selectedArea={interests}
                    setSelectedArea={setTnterests}
                  />

                  <SelectOptions
                    label="How much time do you want to dedicate this project?"
                    data={TIME_COMMITMENT_OPTIONS}
                    value={time_commitment}
                    setValue={setTime_commitment}
                  />

                  <CreatProjectModalActionButtons
                    cancelText="Cancel"
                    handleCancelClick={() => closeModal()}
                    confirmText="Next"
                    handleConfirmClick={() => setSection(2)}
                  />
                </>
              ) : section === 2 ? (
                <>
                  <SelectOptions
                    label="What's the vibe this project inspires in you?"
                    data={PROJECT_VIBE_OPTIONS}
                    value={vibe}
                    setValue={setVibe}
                  />

                  <SelectOptions
                    label="How big of a project is this?"
                    data={PROJECT_SIZE_OPTIONS}
                    value={project_size}
                    setValue={setProject_size}
                  />

                  <SelectOptions
                    label="What are the things we should definitely not include?"
                    data={EXCLUSION_OPTIONS}
                    value={exclusions}
                    setValue={setExclusions}
                  />

                  <CreatProjectModalActionButtons
                    cancelText="Back"
                    handleCancelClick={() => setSection(1)}
                    confirmText="Generate Idea"
                    handleConfirmClick={generateProjectIdeaFn}
                    icon={Sparkles}
                  />
                </>
              ) : (
                <ProjectIdea onRetry={onRetry} projectIdea={projectIdea!} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImproviseWithAi;
