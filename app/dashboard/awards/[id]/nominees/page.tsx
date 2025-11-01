'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Plus, Search, Download, Image as ImageIcon, MoreVertical } from 'lucide-react';

interface Nominee {
  id: number;
  name: string;
  categories: string[];
  status: 'Published' | 'Draft';
  createdAt: string;
  imageUrl?: string;
}

const mockNominees: Nominee[] = [
  {
    id: 1,
    name: 'Priscilla Amaniapong',
    categories: ['AR7647', 'Outstanding Student of the year', 'AV0265', 'Ideal Woman of the year'],
    status: 'Published',
    createdAt: 'Jul 15, 2023 21:45 PM',
    imageUrl: '/nominees/priscilla.jpg'
  },
  {
    id: 2,
    name: 'Joshua Kofi Addo',
    categories: ['AR7647', 'Ideal Man of the year'],
    status: 'Published',
    createdAt: 'Jul 14, 2023 08:58 AM',
    imageUrl: '/nominees/joshua.jpg'
  },
  {
    id: 3,
    name: 'Lukman Aliyu',
    categories: ['AR7647', 'Innovative student of the year'],
    status: 'Published',
    createdAt: 'Jul 14, 2023 08:48 AM',
    imageUrl: '/nominees/lukman.jpg'
  },
];

const sidebarItems = [
  { id: 'edit', label: 'Edit Award' },
  { id: 'categories', label: 'Categories' },
  { id: 'nominees', label: 'Nominees', active: true },
  { id: 'nominations', label: 'Nominations' },
  { id: 'bulk-voting', label: 'Bulk Voting' },
  { id: 'stages', label: 'Stages' },
  { id: 'votes', label: 'Votes' },
  { id: 'results', label: 'Results' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'payments', label: 'Payments' },
];

export default function NomineesPage() {
  const router = useRouter();
  const [nominees, setNominees] = useState<Nominee[]>(mockNominees);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');

  const filteredNominees = nominees.filter(nominee =>
    nominee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h1 className="text-2xl font-bold text-navy">Nominees</h1>
              <p className="text-sm text-gray-600 mt-1">Kstu IDCE Golden Palate Awards</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <MoreVertical className="w-4 h-4 mr-2" />
              </Button>
              <Button onClick={() => router.push('/dashboard/awards/1/nominees/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Create nominee
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>All categories</option>
                <option>Outstanding Student of the year</option>
                <option>Ideal Man of the year</option>
                <option>Ideal Woman of the year</option>
                <option>Innovative student of the year</option>
              </select>

              <Input
                placeholder="Nominee name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download codes
              </Button>
              <Button variant="outline">
                <ImageIcon className="w-4 h-4 mr-2" />
                Download images
              </Button>
            </div>
          </Card>

          {/* Nominees List */}
          <div className="space-y-4">
            {filteredNominees.map((nominee) => (
              <Card key={nominee.id} className="p-6">
                <div className="flex items-start gap-4">
                  {/* Nominee Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-navy flex items-center justify-center text-white text-xl font-bold">
                      {nominee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>

                  {/* Nominee Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-navy">{nominee.id}. {nominee.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                          nominee.status === 'Published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {nominee.status}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Categories */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {nominee.categories.map((category, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                            category.startsWith('AR') || category.startsWith('AV')
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 mt-3">{nominee.createdAt}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredNominees.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-gray-500">No nominees found</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
