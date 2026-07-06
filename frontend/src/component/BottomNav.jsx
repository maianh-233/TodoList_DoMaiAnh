import { CheckCircle, List, Plus } from 'lucide-react';

export function BottomNav({ onAdd, onFilter }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur border-t border-pink-100/60 lg:hidden bottom-nav z-50">
      <div className="flex items-center justify-around py-3">

        <button onClick={() => onFilter('all')} className="flex flex-col items-center text-pink-500">
          <List className="w-6 h-6" />
          <span className="text-xs mt-1">Tất cả</span>
        </button>

        <button onClick={onAdd} className="flex flex-col items-center -mt-6">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
            <Plus className="w-7 h-7 text-white" />
          </div>
        </button>

        <button
          onClick={() => onFilter('completed')}
          className="flex flex-col items-center text-gray-500"
        >
          <CheckCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Hoàn thành</span>
        </button>
      </div>
    </div>
  );
}

