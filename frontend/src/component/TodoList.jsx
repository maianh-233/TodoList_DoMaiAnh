import { TodoCard } from './TodoCard';

export function TodoList({ todos, onToggleComplete, onViewDetail, onEdit, onDelete }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        Không tìm thấy công việc nào phù hợp
      </div>
    );
  }

  return (
    <div id="todoList" className="space-y-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onViewDetail={onViewDetail}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

