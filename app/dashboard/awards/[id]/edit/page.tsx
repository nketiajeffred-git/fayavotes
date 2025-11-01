'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Upload, X } from 'lucide-react';

const sidebarItems = [
  { id: 'edit', label: 'Edit Award', active: true },
  { id: 'categories', label: 'Categories' },
  { id: 'nominees', label: 'Nominees' },
  { id: 'nominations', label: 'Nominations' },
  { id: 'bulk-voting', label: 'Bulk Voting' },
  { id: 'stages', label: 'Stages' },
  { id: 'votes', label: 'Votes' },
  { id: 'results', label: 'Results' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'payments', label: 'Payments' },
];

export default function EditAwardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    organization: 'Anas Tech Consult',
    awardName: 'Kstu IDCE Golden Palate Awards',
    votingStartDate: '2023-07-15',
    votingStartTime: '00:00',
    votingEndDate: '2023-08-12',
    votingEndTime: '23:45',
    activateNominations: true,
    nominationStartDate: '2023-06-28',
    nominationStartTime: '00:00',
    nominationEndDate: '2023-07-15',
    nominationEndTime: '00:00',
    nominationType: 'free',
    votingType: 'paid',
    costPerVote: '0.5',
    bulkVoting: false,
  });

  const [awardLogo, setAwardLogo] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAwardLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
  };

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
            <h1 className="text-2xl font-bold text-navy">Edit Award</h1>
            <button 
              onClick={() => router.back()}
              className="text-primary hover:underline flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Go back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Award Logo */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">Award logo</h2>
              <p className="text-sm text-gray-600 mb-4">
                This is the first image people will see at the top of your award.<br />
                Use a high quality square image.
              </p>

              <div className="space-y-4">
                {awardLogo ? (
                  <div className="relative w-64 h-64 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img src={awardLogo} alt="Award logo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setAwardLogo(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click image to pick logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </Card>

            {/* About the Award */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">About the award</h2>
              <p className="text-sm text-gray-600 mb-4">
                Let people know who is hosting the awards.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-primary">*</span> Organisation
                  </label>
                  <Input
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-primary">*</span> Award name
                  </label>
                  <Input
                    name="awardName"
                    value={formData.awardName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-primary">*</span> Voting start date
                    </label>
                    <Input
                      type="date"
                      name="votingStartDate"
                      value={formData.votingStartDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-primary">*</span> Voting start time
                    </label>
                    <Input
                      type="time"
                      name="votingStartTime"
                      value={formData.votingStartTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-primary">*</span> Voting end date
                    </label>
                    <Input
                      type="date"
                      name="votingEndDate"
                      value={formData.votingEndDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="text-primary">*</span> Voting end time
                    </label>
                    <Input
                      type="time"
                      name="votingEndTime"
                      value={formData.votingEndTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Nominations */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">Nominations</h2>
              <p className="text-sm text-gray-600 mb-4">
                Set nomination dates and pricing.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="activateNominations"
                    name="activateNominations"
                    checked={formData.activateNominations}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="activateNominations" className="text-sm font-medium text-gray-700">
                    Activate nominations
                  </label>
                </div>

                {formData.activateNominations && (
                  <>
                    <p className="text-sm text-primary">
                      * Manage the information you want to collect from nominees.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-primary">*</span> Nomination start date
                        </label>
                        <Input
                          type="date"
                          name="nominationStartDate"
                          value={formData.nominationStartDate}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-primary">*</span> Nomination start time
                        </label>
                        <Input
                          type="time"
                          name="nominationStartTime"
                          value={formData.nominationStartTime}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-primary">*</span> Nomination end date
                        </label>
                        <Input
                          type="date"
                          name="nominationEndDate"
                          value={formData.nominationEndDate}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="text-primary">*</span> Nomination end time
                        </label>
                        <Input
                          type="time"
                          name="nominationEndTime"
                          value={formData.nominationEndTime}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={formData.nominationType === 'free' ? 'default' : 'outline'}
                          onClick={() => setFormData(prev => ({ ...prev, nominationType: 'free' }))}
                        >
                          Free nominations
                        </Button>
                        <Button
                          type="button"
                          variant={formData.nominationType === 'fixed' ? 'default' : 'outline'}
                          onClick={() => setFormData(prev => ({ ...prev, nominationType: 'fixed' }))}
                        >
                          Fixed price
                        </Button>
                        <Button
                          type="button"
                          variant={formData.nominationType === 'category' ? 'default' : 'outline'}
                          onClick={() => setFormData(prev => ({ ...prev, nominationType: 'category' }))}
                        >
                          Price per category
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Award Pricing */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">Award pricing</h2>
              <p className="text-sm text-gray-600 mb-4">
                Setup the pricing schema you want to use.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={formData.votingType === 'paid' ? 'default' : 'outline'}
                    onClick={() => setFormData(prev => ({ ...prev, votingType: 'paid' }))}
                  >
                    Paid voting
                  </Button>
                  <Button
                    type="button"
                    variant={formData.votingType === 'social' ? 'default' : 'outline'}
                    onClick={() => setFormData(prev => ({ ...prev, votingType: 'social' }))}
                  >
                    Social voting
                  </Button>
                </div>

                {formData.votingType === 'paid' && (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="bulkVoting"
                        name="bulkVoting"
                        checked={formData.bulkVoting}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor="bulkVoting" className="text-sm font-medium text-gray-700">
                        Normal voting
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="bulkVoting2"
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor="bulkVoting2" className="text-sm font-medium text-gray-700">
                        Bulk voting
                      </label>
                    </div>

                    <div className="max-w-xs">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="text-primary">*</span> Cost per vote
                      </label>
                      <div className="flex gap-2">
                        <select className="w-24 h-10 border border-gray-300 rounded-md px-3">
                          <option>GHS</option>
                          <option>USD</option>
                        </select>
                        <Input
                          type="number"
                          step="0.01"
                          name="costPerVote"
                          value={formData.costPerVote}
                          onChange={handleChange}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button type="submit" size="lg">
                Save Changes
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
