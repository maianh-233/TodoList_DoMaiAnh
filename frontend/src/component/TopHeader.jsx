import { Search } from 'lucide-react';

export function TopHeader({
  searchTerm,
  onSearchTermChange,
  priorityFilter,
  onPriorityFilterChange,
  onOpenSidebar,
}) {
  return (
    <header className="bg-white/70 backdrop-blur border-b border-pink-100/60 px-4 lg:px-6 py-4 flex items-center gap-4">
      {/* NÚT BURGER: Thêm lg:hidden để ẩn hoàn toàn trên desktop */}
      <button
        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-2xl hover:bg-pink-50 border border-pink-100/60"
        onClick={onOpenSidebar}
        aria-label="Mở sidebar"
      >
        <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600">
          ☰
        </span>
      </button>

      {/* Ô tìm kiếm */}
      <div className="flex-1 relative">
        <input
          id="searchInput"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          type="text"
          placeholder="Tìm kiếm công việc..."
          className="w-full pl-12 pr-4 py-3 bg-pink-50/50 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-200 border border-pink-100/50"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-5 top-3.5" />
      </div>

      {/* Lọc ưu tiên */}
      <select
        id="priorityFilter"
        value={priorityFilter}
        onChange={(e) => onPriorityFilterChange(e.target.value)}
        className="hidden sm:block bg-white/80 border border-pink-100/60 rounded-3xl px-5 py-3 text-sm focus:outline-none"
      >
        <option value="">Tất cả ưu tiên</option>
        <option value="HIGH">Cao</option>
        <option value="MEDIUM">Trung bình</option>
        <option value="LOW">Thấp</option>
      </select>
    </header>
  );
}