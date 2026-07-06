export function Pagination({ currentPage, totalPages, onPageChange }) {
  // Keep same container id style from HTML
  return (
    <div id="pagination" className="flex justify-center gap-2 mt-10">

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-5 py-2.5 rounded-2xl text-sm ${
            p === currentPage ? 'bg-pink-500 text-white' : 'bg-white border'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

