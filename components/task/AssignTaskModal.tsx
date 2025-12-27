import { Project, Task } from "@/types";
import AssignTaskUsersList from "./AssignTaskUsersList";

const AssignTaskModal = ({
  project,
  task,
}: {
  project: Project;
  task: Task;
}) => {
  return (
    <div className="h-full flex flex-col items-center space-y-2 mx-auto w-[90%] lg:w-[70%]">
      <h2 className="text-black font-semibold text-2xl mt-12">Assign task</h2>
      <p className="text-center text-gray-600 mb-8">{task.title}</p>

      <AssignTaskUsersList project={project} task={task} />
    </div>
  );
};

export default AssignTaskModal;
