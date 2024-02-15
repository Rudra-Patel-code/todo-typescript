import moment from "moment";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { useTodo } from "../../context/TodoContext";
import { TodoInterface } from "../../interfaces/todo";
import { classNames } from "../../utils";
import DetailAndEditModal from "./DetailAndEditModal";

const TodoCard = ({ todo }: { todo: TodoInterface }) => {
  const { deleteTodo, toggleTodo } = useTodo();

  const [isEditModal, setIsEditModal] = useState<boolean>(false);

  const toggleTodoStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleTodo(todo._id);
  };

  const deleteTodoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteTodo(todo._id);
  };

  return (
    <>
      {isEditModal && (
        <DetailAndEditModal onClose={() => setIsEditModal(false)} todo={todo} />
      )}
      <div
        role="button"
        onClick={() => setIsEditModal(true)}
        className="flex border-2 border-zinc-800/50 rounded-md shadow- mt-2 cursor-default w-full items-center  py-3 px-3"
      >
        <button
          onClick={toggleTodoStatus}
          className={classNames(
            "p-1 border-[1px] rounded-sm w-5 h-5 md:w-6 md:h-6 flex items-center justify-center",
            todo.isComplete ? "bg-green-600 text-white" : "bg-black text-black"
          )}
        >
          <FaCheck className="text-xs" />
        </button>

        <div className="flex flex-col  justify-center ml-4 mr-4">
          <p
            className={classNames(
              "text-base md:text-lg flex items-center gap-4",
              todo.isComplete ? " opacity-50" : ""
            )}
          >
            <span
              className={classNames(
                "line-clamp-1",
                todo.isComplete ? "line-through" : ""
              )}
            >
              {todo.title}
            </span>
            <span className="hidden sm:block md:text-base text-gray-400 ">
              ( {moment(todo.updatedAt).add("TIME_ZONE", "hours").fromNow(true)}{" "}
              ago )
            </span>
          </p>
          <p
            className={classNames(
              "opacity-75 text-xs sm:text-sm md:text-base line-clamp-1",
              todo.isComplete ? "hidden" : ""
            )}
          >
            {todo.description.substring(0, 50)}
            {todo.description.length > 50 ? "..." : ""}
          </p>
        </div>

        <div className="ml-auto flex flex-shrink-0 gap-2">
          <button
            onClick={deleteTodoHandler}
            className="bg-red-500 p-2 md:p-3 md:text-lg  rounded-md"
          >
            <MdDelete />
          </button>

          <button
            onClick={() => setIsEditModal(true)}
            className="bg-purple-500 p-2 md:p-3 md:text-lg rounded-md"
          >
            <MdEdit />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
