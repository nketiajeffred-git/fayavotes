'use client';

import { useState } from 'react';
import { Logo } from '@/components/logo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, Heart } from 'lucide-react';

interface Nominee {
  id: number;
  name: string;
  category: string;
  imageUrl?: string;
  votes: number;
}

const mockNominees: Nominee[] = [
  { id: 1, name: 'Priscilla Amaniapong', category: 'Outstanding Student of the year', votes: 145 },
  { id: 2, name: 'Joshua Kofi Addo', category: 'Ideal Man of the year', votes: 98 },
  { id: 3, name: 'Lukman Aliyu', category: 'Innovative student of the year', votes: 87 },
  { id: 4, name: 'Esther Obeng Amoah', category: "Best Departmental Women's Commissioner", votes: 156 },
  { id: 5, name: 'Peprah Emmanuel', category: 'Best Male Student of the year', votes: 203 },
  { id: 6, name: 'Baah Anthony', category: 'Best Course Rep of the year', votes: 112 },
];

const categories = [
  'All categories',
  'Outstanding Student of the year',
  'Ideal Man of the year',
  'Ideal Woman of the year',
  'Innovative student of the year',
  "Best Departmental Women's Commissioner",
  'Best Male Student of the year',
  'Best Course Rep of the year',
];

export default function PublicVotingPage() {
  const [nominees] = useState<Nominee[]>(mockNominees);
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNominee, setSelectedNominee] = useState<number | null>(null);
  const [voteCount, setVoteCount] = useState(1);

  const filteredNominees = nominees.filter(nominee => {
    const matchesCategory = selectedCategory === 'All categories' || nominee.category === selectedCategory;
    const matchesSearch = nominee.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVote = () => {
    if (selectedNominee) {
      // In real app, process payment and record vote
      alert(`Voted ${voteCount} time(s) for nominee #${selectedNominee}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy via-navy-light to-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kstu IDCE Golden Palate Awards
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Vote for your favorite nominees and support excellence
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Heart className="w-5 h-5 text-gold" />
              <span className="font-semibold">{nominees.reduce((sum, n) => sum + n.votes, 0)} Total Votes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 border border-gray-300 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <Input
              placeholder="Search nominee name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12"
            />

            <Button size="lg" className="h-12">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        {/* Nominees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNominees.map((nominee) => (
            <Card 
              key={nominee.id} 
              className={`overflow-hidden transition-all hover:shadow-lg ${
                selectedNominee === nominee.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Nominee Image */}
              <div className="relative h-64 bg-gradient-to-br from-navy via-navy-light to-gold">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold">
                    {nominee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                {selectedNominee === nominee.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Nominee Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">{nominee.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{nominee.category}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-gray-700">{nominee.votes} votes</span>
                  </div>
                  <span className="text-xs text-gray-500">#{nominee.id}</span>
                </div>

                <Button
                  onClick={() => setSelectedNominee(nominee.id)}
                  variant={selectedNominee === nominee.id ? 'default' : 'outline'}
                  className="w-full"
                >
                  {selectedNominee === nominee.id ? 'Selected' : 'Vote Now'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredNominees.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">No nominees found matching your criteria</p>
          </Card>
        )}

        {/* Voting Panel */}
        {selectedNominee && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Selected Nominee</p>
                  <p className="font-bold text-navy">
                    {nominees.find(n => n.id === selectedNominee)?.name}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Number of votes</label>
                    <Input
                      type="number"
                      min="1"
                      value={voteCount}
                      onChange={(e) => setVoteCount(parseInt(e.target.value) || 1)}
                      className="w-24"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">GHS {(voteCount * 0.5).toFixed(2)}</p>
                  </div>

                  <Button onClick={handleVote} size="lg" className="h-12 px-8">
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-navy text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <Logo className="mb-4 justify-center" />
          <p className="text-white/70">© 2023 FayaVotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
