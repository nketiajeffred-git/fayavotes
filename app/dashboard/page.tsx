'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MoreVertical, 
  Plus, 
  Search,
  ChevronLeft
} from 'lucide-react';

interface Award {
  id: string;
  title: string;
  organization: string;
  published: boolean;
  serviceFee: string;
  showingResults: boolean;
  image: string;
  pricingType: string;
}

const mockAwards: Award[] = [
  {
    id: '1',
    title: 'Kstu IDCE Golden Palate Awards',
    organization: 'IDCE',
    published: false,
    serviceFee: '1.3% service fee - AR7',
    showingResults: false,
    image: '/images/golden-palate.jpg',
    pricingType: 'Paid (GHS 0.50)'
  },
  {
    id: '2',
    title: 'Kstu CESA Excellence Awards',
    organization: 'CESA',
    published: false,
    serviceFee: '1.3% service fee - TML',
    showingResults: false,
    image: '/images/cesa-excellence.jpg',
    pricingType: 'Paid (GHS 0.50)'
  },
  {
    id: '3',
    title: 'KsTU HCIM Excellence Awards',
    organization: 'HCIM',
    published: false,
    serviceFee: '1.3% service fee - EGH',
    showingResults: false,
    image: '/images/hcim-excellence.jpg',
    pricingType: 'Paid (GHS 0.50)'
  },
];

export default function AwardsPage() {
  const [awards] = useState<Award[]>(mockAwards);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAward, setSelectedAward] = useState<string | null>(null);

  const filteredAwards = awards.filter(award =>
    award.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-navy">Awards</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAwards.map((award) => (
          <Card key={award.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            {/* Award Image */}
            <div className="relative h-64 bg-gradient-to-br from-navy via-navy-light to-gold overflow-hidden">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      className="text-gold"
                    >
                      <path
                        d="M24 3L28.5 18.5L44 23L28.5 27.5L24 43L19.5 27.5L4 23L19.5 18.5L24 3Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">{award.organization}</h3>
                  <p className="text-sm mt-2 opacity-90">EXCELLENCE AWARDS</p>
                </div>
              </div>
              
              {/* More Options */}
              <div className="absolute top-3 right-3">
                <button 
                  onClick={() => setSelectedAward(selectedAward === award.id ? null : award.id)}
                  className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-700" />
                </button>
                
                {selectedAward === award.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                    <a href={`/dashboard/awards/${award.id}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</a>
                    <a href={`/dashboard/awards/${award.id}/view`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View</a>
                    <a href={`/dashboard/awards/${award.id}/categories`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Categories</a>
                    <a href={`/dashboard/awards/${award.id}/nominees`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Nominees</a>
                    <a href={`/dashboard/awards/${award.id}/nominations`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Nominations</a>
                    <a href={`/dashboard/awards/${award.id}/bulk-voting`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Bulk Voting</a>
                    <a href={`/dashboard/awards/${award.id}/stages`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Stages</a>
                    <a href={`/dashboard/awards/${award.id}/votes`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Votes</a>
                    <a href={`/dashboard/awards/${award.id}/results`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Results</a>
                    <a href={`/dashboard/awards/${award.id}/transfer`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Transfer</a>
                    <a href={`/dashboard/awards/${award.id}/payments`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Payments</a>
                  </div>
                )}
              </div>
            </div>

            {/* Award Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-navy mb-1">{award.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {award.published ? 'Published' : 'Not published'} • {award.serviceFee}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-gray-600">Pricing type</span>
                  <p className="font-medium text-navy">{award.pricingType}</p>
                </div>
                <div>
                  <span className="text-gray-600">Showing results</span>
                  <p className="font-medium text-navy">{award.showingResults ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAwards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No awards found</p>
        </div>
      )}
    </div>
  );
}
