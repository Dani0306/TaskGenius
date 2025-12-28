import { Project } from "@/types";
import { User } from "@supabase/supabase-js";
import { NotebookPen, SparklesIcon } from "lucide-react";
import React, { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import CreateTaskWithAIModal from "./CreateTaskWithAIModal";

const ChooseTaskTypeToCreate = ({
  project,
  user,
}: {
  project: Project;
  user: User;
}) => {
  const [section, setSection] = useState<number | null>(null);

  return (
    <>
      {!section ? (
        <div className="w-full h-full flex flex-col mt-28 items-center overflow-auto no-scrollbar">
          <h2 className="text-2xl lg:text-3xl font-semibold text-black text-center">
            Let&apos;s create a new task
          </h2>
          <p className="text-gray-600 text-sm text-center px-2">
            Choose how you&apos;d like to create your task.
          </p>

          <div className="flex flex-col items-center gap-5 lg:flex-row justify-center mt-13 px-6">
            {/* Manual task */}
            <div
              onClick={() => setSection(1)}
              className="bg-white p-5 w-full lg:w-[40%] space-y-4 flex flex-col shadow-xl min-h-[230px] rounded-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <NotebookPen className="size-14 bg-primary/20 text-primary rounded-xl p-4" />
              <strong className="text-black font-semibold">
                Create my own
              </strong>
              <p className="text-sm text-gray-600">
                Create your task manually by defining its details, priority, and
                subtasks at your own pace.
              </p>
            </div>

            {/* AI-generated task */}
            <div
              onClick={() => setSection(2)}
              className="bg-white p-5 w-full lg:w-[40%] flex flex-col space-y-4 shadow-xl min-h-[230px] rounded-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <SparklesIcon className="size-14 bg-primary/20 text-primary rounded-xl p-4" />
              <strong className="text-black font-semibold">AI</strong>
              <p className="text-sm text-gray-600">
                Let AI suggest a clear task structure, including subtasks and
                priorities, based on your goal.
              </p>
            </div>
          </div>
        </div>
      ) : section === 1 ? (
        <CreateTaskModal project={project} user={user} />
      ) : (
        <CreateTaskWithAIModal project={project} user={user} />
      )}
    </>
  );
};

export default ChooseTaskTypeToCreate;
