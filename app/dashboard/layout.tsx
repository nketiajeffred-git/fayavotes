'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { 
  Award, 
  Calendar, 
  Building2, 
  LogOut, 
  User, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'AWARDS', icon: Award, href: '/dashboard' },
  { name: 'EVENTS', icon: Calendar, href: '/dashboard/events' },
  { name: 'ORGANISATIONS', icon: Building2, href: '/dashboard/organizations' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get user from localStorage (in real app, use proper auth)
  const user = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : {};

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* User Dropdown - Desktop */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{user.name}</div>
                  <div className="text-xs opacity-90">({user.organization})</div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Manage organisation <span className="text-primary">1</span></span>
                  </a>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className={`bg-navy text-white ${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-0 lg:gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center justify-center gap-2 py-4 hover:bg-white/10 transition-colors border-b lg:border-b-0 border-white/10"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
