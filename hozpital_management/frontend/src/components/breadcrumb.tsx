'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Breadcrumb: React.FC = () => {
  const pathname = usePathname(); // Get current path
  const pathnames = pathname.split('/').filter((x) => x); // Split the pathname into breadcrumb items

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {/* Render dynamic breadcrumb items */}
      {pathnames.map((value, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={href}>
            <Link href={href} className="hover:text-blue-900">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
            {index < pathnames.length - 1 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
