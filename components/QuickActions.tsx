import { useRouter } from 'next/navigation'

export const QuickActions: React.FC<{ onStartDaily?: () => void; onResume?: () => void }> = ({ onStartDaily, onResume }) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={onStartDaily} className="p-4 bg-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">🎯 Start Daily Challenge</button>
        <button onClick={() => router.push('/profile')} className="p-4 bg-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">👤 View My Profile</button>
      </div>
    </div>
  );
};
