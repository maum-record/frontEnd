'use client';

import { useRouter } from 'next/navigation';

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-600 hover:text-red-600 hover:underline"
    >
      로그아웃
    </button>
  );
}