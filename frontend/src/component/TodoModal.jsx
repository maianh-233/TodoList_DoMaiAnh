export function TodoModal({ open, mode, todoId, form, onChange, onClose, onSave }) {
  if (!open) return null;

  const modalTitle = mode === 'edit' ? 'Chỉnh sửa' : 'Thêm công việc mới';

  return (
    <div id="todoModal" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur rounded-3xl w-full max-w-lg border border-pink-100/60 shadow-xl">

        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-6" id="modalTitle">
            {modalTitle}
          </h3>

          <input id="todoId" type="hidden" value={todoId || ''} readOnly />

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Tiêu đề *</label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => onChange((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400"
                placeholder="Nhập tiêu đề công việc"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Mô tả</label>
              <textarea
                id="description"
                rows="3"
                value={form.description}
                onChange={(e) => onChange((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400"
                placeholder="Chi tiết..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Hạn chót</label>
                <input
                  id="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => onChange((prev) => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Ưu tiên</label>
                <select
                  id="priority"
                  value={form.priority}
                  onChange={(e) => onChange((prev) => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400"
                >
                  <option value="LOW">Thấp</option>
                  <option value="MEDIUM">Trung bình</option>
                  <option value="HIGH">Cao</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="
          border-t border-pink-100/60
          bg-white
          p-4
          flex gap-3
          rounded-b-3xl
        ">
          {/* HỦY */}
          <button
            onClick={onClose}
            className="
              flex-1 py-4
              rounded-2xl font-medium
              bg-white
              border border-pink-300
              text-pink-600
              hover:bg-pink-50
              active:scale-[0.98]
              transition
            "
          >
            Hủy
          </button>

          <button
            onClick={onSave}
            className="
              flex-1 py-4
              rounded-2xl font-medium
              bg-white
              border border-blue-300
              text-blue-600
              hover:bg-blue-50
              active:scale-[0.98]
              transition
            "
          >
            Lưu công việc
          </button>


        </div>
      </div>
    </div>
  );
}

