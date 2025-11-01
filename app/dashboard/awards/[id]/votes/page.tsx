'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Search, Filter } from 'lucide-react';
import { formatDateTime, formatCurrency } from '@/lib/utils';

interface Vote {
  id: string;
  nominee: string;
  category: string;
  amount: number;
  currency: string;
  type: 'Normal' | 'Bulk';
  timestamp: Date;
  transactionId: string;
}

const mockVotes: Vote[] = [
  {
    id: '1',
    nominee: 'Peprah Emmanuel',
    category: 'Best Male Student of the year',
    amount: 3.00,
    currency: 'GHS',
    type: 'Normal',
    timestamp: new Date('2023-08-07T23:49:00'),
    transactionId: 'TXN001'
  },
  {
    id: '2',
    nominee: 'Esther Obeng Amoah',
    category: "Best Departmental Women's Commissioner",
    amount: 23.00,
    currency: 'GHS',
    type: 'Bulk',
    timestamp: new Date('2023-08-07T23:41:00'),
    transactionId: 'TXN002'
  },
  {
    id: '3',
    nominee: 'Peprah Emmanuel',
    category: 'Best Male Student of the year',
    amount: 3.00,
    currency: 'GHS',
    type: 'Normal',
    timestamp: new Date('2023-08-07T23:40:00'),
    transactionId: 'TXN003'
  },
  {
    id: '4',
    nominee: 'Esther Obeng Amoah',
    category: "Best Departmental Women's Commissioner",
    amount: 6.00,
    currency: 'GHS',
    type: 'Normal',
    timestamp: new Date('2023-08-07T23:40:00'),
    transactionId: 'TXN004'
  },
  {
    id: '5',
    nominee: 'Baah Anthony',
    category: 'Best Course Rep of the year',
    amount: 23.00,
    currency: 'GHS',
    type: 'Bulk',
    timestamp: new Date('2023-08-07T23:40:00'),
    transactionId: 'TXN005'
  },
];

const sidebarItems = [
  { id: 'edit', label: 'Edit Award' },
  { id: 'categories', label: 'Categories' },
  { id: 'nominees', label: 'Nominees' },
  { id: 'nominations', label: 'Nominations' },
  { id: 'bulk-voting', label: 'Bulk Voting' },
  { id: 'stages', label: 'Stages' },
  { id: 'votes', label: 'Votes', active: true },
  { id: 'results', label: 'Results' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'payments', label: 'Payments' },
];

export default function VotesPage() {
  const router = useRouter();
  const [votes] = useState<Vote[]>(mockVotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');

  const filteredVotes = votes.filter(vote =>
    vote.nominee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = votes.reduce((sum, vote) => sum + vote.amount, 0);
  const totalVotes = votes.length;

  return (
    <div>
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-navy mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Awards</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <a
                  key={item.id}
                  href={`/dashboard/awards/1/${item.id}`}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-navy">Votes</h1>
              <p className="text-sm text-gray-600 mt-1">Kstu IDCE Golden Palate Awards</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6">
              <div className="text-sm text-gray-600 mb-1">Total Votes</div>
              <div className="text-3xl font-bold text-navy">{totalVotes}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
              <div className="text-3xl font-bold text-primary">{formatCurrency(totalRevenue)}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-gray-600 mb-1">Average per Vote</div>
              <div className="text-3xl font-bold text-navy">
                {formatCurrency(totalRevenue / totalVotes || 0)}
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Transaction ID"
                className="h-10"
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>All categories</option>
                <option>Best Male Student of the year</option>
                <option>Best Departmental Women&apos;s Commissioner</option>
                <option>Best Course Rep of the year</option>
              </select>

              <Button>
                <Search className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </div>
          </Card>

          {/* Votes Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nominee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVotes.map((vote) => (
                    <tr key={vote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{vote.nominee}</div>
                        <div className="text-xs text-gray-500">{vote.category}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {vote.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-navy">
                        {formatCurrency(vote.amount, vote.currency)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {Math.floor(vote.amount / 0.5)} votes
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          vote.type === 'Bulk'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {vote.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(vote.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredVotes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No votes found</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
