'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAdminAuth<T extends {}>(
	Component: React.ComponentType<T>
  ) {
	return function ProtectedRoute(props: T) {
	  const router = useRouter();
  
	  useEffect(() => {
		const token = localStorage.getItem('admin-token');
		if (!token) {
		  router.replace('/admin/login');
		}
	  }, [router]);
  
	  return <Component {...props as T} />;
	};
  }
  