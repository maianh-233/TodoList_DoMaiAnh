import { useCallback, useEffect, useState } from 'react';
import { getCurrentUser } from '../auth/auth';

import { BottomNav } from '../component/BottomNav';
import { Pagination } from '../component/Pagination';
import { Sidebar } from '../component/Sidebar';
import { TodoList } from '../component/TodoList';
import { TodoModal } from '../component/TodoModal';
import { TopHeader } from '../component/TopHeader';

const itemsPerPage = 8;
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/todos';

export default function HomePage() {
  const user = getCurrentUser();

  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentTimeFilter, setCurrentTimeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [modalTodoId, setModalTodoId] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
  });

  // =========================
  // FETCH DATA (CORE)
  // =========================
  const fetchTodos = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError('');

    try {
      const page0 = currentPage - 1;

      let url = API_BASE;

      const keyword = searchTerm.trim().toLowerCase();

      if (keyword) {
        url = `${API_BASE}/search?` + new URLSearchParams({
          userId: user.id,
          keyword,
          page: page0,
          size: itemsPerPage,
        });
      } else if (currentFilter !== 'all') {
        url = `${API_BASE}/filter?` + new URLSearchParams({
          userId: user.id,
          completed: currentFilter === 'completed',
          page: page0,
          size: itemsPerPage,
        });
      } else if (priorityFilter) {
        url = `${API_BASE}/priority?` + new URLSearchParams({
          userId: user.id,
          priority: priorityFilter,
          page: page0,
          size: itemsPerPage,
        });
      } else if (currentTimeFilter !== 'all') {
        url = `${API_BASE}/time?` + new URLSearchParams({
          userId: user.id,
          type: currentTimeFilter,
          page: page0,
          size: itemsPerPage,
        });
      } else {
        url = `${API_BASE}?` + new URLSearchParams({
          userId: user.id,
          page: page0,
          size: itemsPerPage,
        });
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Lỗi tải dữ liệu');

      const data = await res.json();

      setTodos(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Lỗi server');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, [
    user?.id,
    currentPage,
    currentFilter,
    currentTimeFilter,
    priorityFilter,
    searchTerm
  ]);

  // =========================
  // AUTO FETCH WHEN STATE CHANGE
  // =========================
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // =========================
  // MODAL HANDLERS
  // =========================
  const openCreateModal = () => {
    setModalMode('create');
    setModalTodoId('');
    setForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'MEDIUM',
    });
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    setModalMode('edit');
    setModalTodoId(id);

    setForm({
      title: todo.title,
      description: todo.description || '',
      dueDate: todo.dueDate || '',
      priority: todo.priority,
    });

    setModalOpen(true);
  };

  // =========================
  // SAVE TODO
  // =========================
  const saveTodo = useCallback(async () => {
    if (!form.title.trim()) return alert('Nhập tiêu đề!');
    if (!user?.id) return;

    const payload = {
      title: form.title,
      description: form.description,
      dueDate: form.dueDate || null,
      priority: form.priority,
    };

    const url =
      modalMode === 'edit'
        ? `${API_BASE}/${modalTodoId}?userId=${user.id}`
        : `${API_BASE}?userId=${user.id}`;

    await fetch(url, {
      method: modalMode === 'edit' ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setModalOpen(false);
    setCurrentPage(1);
    fetchTodos();
  }, [form, modalMode, modalTodoId, user, fetchTodos]);

  // =========================
  // TOGGLE COMPLETE
  // =========================
  const toggleComplete = useCallback(async (id) => {
    if (!user?.id) return;

    await fetch(`${API_BASE}/${id}/toggle?userId=${user.id}`, {
      method: 'PATCH',
    });

    setCurrentPage(1);
    fetchTodos();
  }, [user, fetchTodos]);

  // =========================
  // DELETE TODO
  // =========================
  const deleteTodo = useCallback(async (id) => {
    if (!confirm('Xóa task?')) return;
    if (!user?.id) return;

    await fetch(`${API_BASE}/${id}?userId=${user.id}`, {
      method: 'DELETE',
    });

    setCurrentPage(1);
    fetchTodos();
  }, [user, fetchTodos]);

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-pink-50/40 overflow-x-hidden">
      <div className="flex h-screen w-full relative">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onAdd={openCreateModal}
          timeFilter={currentTimeFilter}
          onTimeFilter={setCurrentTimeFilter}
        />

        {/* Phần nội dung chính: Đảm bảo có w-full và lg:w-[calc(100%-18rem)] để không bị sidebar đè lên nút burger */}
        <div className="flex-1 flex flex-col w-full lg:pl-72 transition-all duration-300">

          <TopHeader
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            onOpenSidebar={() => setSidebarOpen(prev => !prev)}
          />

          <div className="flex-1 p-4 overflow-auto">
            {error && (
              <div className="text-red-500 mb-3">{error}</div>
            )}

            <TodoList
              todos={todos}
              onToggleComplete={toggleComplete}
              onEdit={openEditModal}
              onDelete={deleteTodo}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <BottomNav
        onAdd={openCreateModal}
        onFilter={setCurrentFilter}
      />

      <TodoModal
        open={modalOpen}
        mode={modalMode}
        form={form}
        onChange={setForm}
        onClose={() => setModalOpen(false)}
        onSave={saveTodo}
      />
    </div>
  );
}