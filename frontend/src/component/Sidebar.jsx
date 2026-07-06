import { CheckSquare, Plus } from 'lucide-react';

export function Sidebar({
  onAdd,
  timeFilter,
  onTimeFilter,
  isOpen,
  onClose,
}) {
  const Button = ({ type, label, className = '' }) => {
    const active = timeFilter === type;
    return (
      <button
        onClick={() => onTimeFilter(type)}
        className={`flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-left transition
          ${
            active
              ? 'bg-pink-50 text-pink-700 border border-pink-100'
              : 'text-gray-700 hover:bg-white/70'
          }
          ${className}`}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      {/* Overlay – CHỈ mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Sidebar – dùng chung */}
        <aside
          className={`
            fixed lg:static
            top-0 left-0 z-50
            h-screen w-72
            bg-white/80 backdrop-blur
            border-r border-pink-100/60
            transition-transform duration-300
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
          `}
        >
        {/* Header */}
        <div className="p-6 border-b border-pink-100/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md border border-white/60">
              <CheckSquare className="w-7 h-7 text-pink-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              ToDoList
            </h1>
          </div>
        </div>

        {/* Add */}
        <div className="p-4">
          <button
            onClick={onAdd}
            className="
              w-full
              bg-pink-50
              border border-pink-200
              text-pink-600
              py-4 rounded-2xl
              font-semibold
              flex items-center justify-center gap-2
              hover:bg-pink-100
              transition
            "
          >
            <Plus className="w-6 h-6 text-pink-500" />
            Thêm công việc
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 mt-4">
          <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">
            LỌC THEO THỜI GIAN
          </p>
          <div className="space-y-1">
            <Button type="all" label="Tất cả" />
            <Button type="today" label="Hôm nay" />
            <Button type="week" label="Tuần này" />
            <Button
              type="overdue"
              label="Quá hạn"
              className="text-red-600 hover:bg-red-50"
            />
            <Button type="upcoming" label="Sắp tới" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-6 text-xs text-gray-400">
          <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-100/60 p-3">
            Tip: Lọc + tìm kiếm để thấy đúng việc cần làm.
          </div>
        </div>
      </aside>
    </>
  );
}