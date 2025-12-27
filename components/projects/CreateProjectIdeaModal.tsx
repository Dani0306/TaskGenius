"use client";

import { useState } from "react";
import InputField from "./InputField";
import CreatProjectModalActionButtons from "./CreatProjectModalActionButtons";
import { useModal } from "@/providers/context/AppModalProvider";
import AppLogoLanding from "../shared/AppLogoLanding";
import SelectOptions from "../shared/select/SelectOptions";
import { TIMEFRAME_LABELS } from "@/constants/project/timeFrames";
import DatePicker from "../shared/datePicker/DatePicker";
import { Sparkles } from "lucide-react";
import { generateProjectIdea } from "@/actions/ai/generateProjectIdea";
import ProjectIdea from "./ProjectIdea";
import { AIProjectIdea } from "@/types";
import LoaderSpinner from "../shared/loader/LoaderSpinner";
import { createPromptProjectIdea } from "@/lib/prompts/projectIdea";

const CreateProjectIdeaModal = () => {
  const [idea, setIdea] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [constraints, setConstraints] = useState<string>("");
  const [section, setSection] = useState<number>(1);
  const [option, setOption] = useState<"timeframe" | "dueDate">("timeframe");
  const [timeframe, setTimeframe] = useState<string>("timeframe");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const [projectIdea, setProjectIdea] = useState<AIProjectIdea | null>(null);

  const { closeModal } = useModal();

  const createProjectIdeaFn = async () => {
    setLoading(true);
    const prompt = createPromptProjectIdea({
      topic: idea,
      goal,
      constraints,
      timeframe: timeframe || String(dueDate),
      userContext: "",
    });

    const projectIdea = await generateProjectIdea(prompt).finally(() => {
      setLoading(false);
    });
    setProjectIdea(JSON.parse(projectIdea));
    setSection(3);
  };

  const onRetry = () => {
    setSection(2);
    createProjectIdeaFn();
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
                Build alongside with AI to power your productivity
              </h2>
            )}
            <div className="w-full flex flex-col space-y-6 mt-8">
              {section === 1 ? (
                <>
                  <InputField
                    value={idea}
                    setValue={setIdea}
                    textArea
                    placeholder="Describe your idea"
                    label="What do you have in mind? (Min 20 Char)"
                    type="text"
                    name="idea"
                  />

                  <InputField
                    value={goal}
                    setValue={setGoal}
                    textArea
                    placeholder="Describe what you want to achieve"
                    label="What is your goal with this project? (Min 20 Char)"
                    type="text"
                    name="goal"
                  />
                  <CreatProjectModalActionButtons
                    cancelText="Cancel"
                    handleCancelClick={closeModal}
                    confirmText="Next"
                    disabled={!idea || !goal}
                    handleConfirmClick={() => setSection(2)}
                  />
                </>
              ) : section === 2 ? (
                <>
                  <InputField
                    value={constraints}
                    setValue={setConstraints}
                    textArea
                    placeholder="e.g I can only work 1 hour a day."
                    label="What constraints must your project have?"
                    type="text"
                    name="goal"
                  />
                  <div className="flex space-x-4 text-sm items-center mb-8 cursor-pointer">
                    <span
                      className={`${
                        option === "timeframe" &&
                        "border-gray-600 border-b py-1.5"
                      }`}
                      onClick={() => setOption("timeframe")}
                    >
                      Select Timeframe
                    </span>
                    <span
                      className={`${
                        option === "dueDate" && "border-gray-600 border-b py-1"
                      }`}
                      onClick={() => setOption("dueDate")}
                    >
                      Chose Due Date
                    </span>
                  </div>
                  {option === "dueDate" && (
                    <SelectOptions
                      label="Chose the timeframe for this project"
                      data={TIMEFRAME_LABELS}
                      value={timeframe}
                      setValue={setTimeframe}
                    />
                  )}

                  {option === "timeframe" && (
                    <DatePicker date={dueDate} setDate={setDueDate} />
                  )}
                  <CreatProjectModalActionButtons
                    disabled={!timeframe && !dueDate}
                    cancelText="Back"
                    handleCancelClick={() => setSection(1)}
                    confirmText="Generate Idea"
                    handleConfirmClick={createProjectIdeaFn}
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

export default CreateProjectIdeaModal;
