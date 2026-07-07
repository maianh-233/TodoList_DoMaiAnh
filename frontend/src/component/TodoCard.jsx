import { Calendar, Edit2, Eye, Trash2 } from 'lucide-react';

const priorityBadge = (priority) => {
  if (priority === 'HIGH') return 'bg-red-100 text-red-600';
  if (priority === 'MEDIUM') return 'bg-amber-100 text-amber-600';
  return 'bg-green-100 text-green-600';
};

export function TodoCard({ todo, onToggleComplete, onViewDetail, onEdit, onDelete }) {
  return (
    <div className="todo-card bg-white/80 backdrop-blur rounded-3xl p-5 shadow-sm border border-pink-100/60 hover:shadow-md transition">
      <div className="flex items-center gap-4">

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="w-6 h-6 accent-pink-400 rounded-xl cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <h4
            className={`${
              todo.completed ? 'line-through text-gray-400' : 'font-semibold text-gray-800'
            } text-lg leading-tight`}
          >
            {todo.title}
          </h4>
          {todo.description ? (
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{todo.description}</p>
          ) : null}

          <div className="flex items-center gap-4 mt-3 text-xs">
            {todo.dueDate ? (
              <span className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-4 h-4" />
                {todo.dueDate}
              </span>
            ) : null}

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${priorityBadge(todo.priority)}`}
            >
              {todo.priority}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">

          <button onClick={() => onEdit(todo.id)} className="p-2 hover:bg-gray-100 rounded-2xl">
            <Edit2 className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 hover:bg-gray-100 rounded-2xl text-red-400"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

