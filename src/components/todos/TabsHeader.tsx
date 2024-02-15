import { FaCirclePlus } from "react-icons/fa6";
import Button from "../Button";
import Options from "../Options";
import { useTodo } from "../../context/TodoContext";

const TabsHeader = ({
  openCreateTodoModal,
  selectedOption,
  changeTabs,
}: {
  openCreateTodoModal: () => void;
  selectedOption: string;
  changeTabs: (tab: "all" | "isCompleted" | "isNotCompleted") => void;
}) => {
  const { todos } = useTodo();

  const optionsList: {
    title: string;
    slug: "all" | "isCompleted" | "isNotCompleted";
    count: number;
  }[] = [
    {
      title: "All Todos",
      slug: "all",
      count: todos.length,
    },
    {
      title: "Pending",
      slug: "isNotCompleted",
      count: todos.filter((todo) => todo.isComplete !== true).length,
    },
    {
      title: "Completed",
      slug: "isCompleted",
      count: todos.filter((todo) => todo.isComplete === true).length,
    },
  ];

  return (
    <>
      <div className=" w-full px-3 mt-10">
        <Button
          onClick={openCreateTodoModal}
          severity="primary"
          className="mx-auto w-full max-w-[500px]"
        >
          <FaCirclePlus />
          Create a new task
        </Button>
      </div>

      <div className="w-full flex justify-around max-w-[600px] gap-4 my-6">
        {optionsList.map((option) => (
          <Options
            isActive={selectedOption === option.slug}
            key={option.slug}
            title={option.title}
            count={option.count}
            onClick={async () => {
              // TODO: do something
              changeTabs(option.slug);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TabsHeader;
