'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Plus, Search, MoreVertical, Edit, Trash2 } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  status: 'Published' | 'Draft';
  createdAt: string;
}

const mockCategories: Category[] = [
  { id: 1, name: 'Best Departmental Executive of the year', status: 'Published', createdAt: 'Jun 28, 2023 22:58 PM' },
  { id: 2, name: "Best Departmental Women's Commissioner", status: 'Published', createdAt: 'Jun 28, 2023 22:58 PM' },
  { id: 3, name: 'Best Department of the year', status: 'Published', createdAt: 'Jun 28, 2023 22:58 PM' },
  { id: 4, name: 'Student Entrepreneur of the year', status: 'Published', createdAt: 'Jun 28, 2023 22:57 PM' },
  { id: 5, name: 'Innovative student of the year', status: 'Published', createdAt: 'Jun 28, 2023 22:57 PM' },
];

const sidebarItems = [
  { id: 'edit', label: 'Edit Award' },
  { id: 'categories', label: 'Categories', active: true },
  { id: 'nominees', label: 'Nominees' },
  { id: 'nominations', label: 'Nominations' },
  { id: 'bulk-voting', label: 'Bulk Voting' },
  { id: 'stages', label: 'Stages' },
  { id: 'votes', label: 'Votes' },
  { id: 'results', label: 'Results' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'payments', label: 'Payments' },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [publishCategory, setPublishCategory] = useState(true);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = () => {
    if (categoryName.trim()) {
      const newCategory: Category = {
        id: categories.length + 1,
        name: categoryName,
        status: publishCategory ? 'Published' : 'Draft',
        createdAt: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setCategories([...categories, newCategory]);
      setCategoryName('');
      setShowModal(false);
    }
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
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
            <div>
              <h1 className="text-2xl font-bold text-navy">Categories</h1>
              <p className="text-sm text-gray-600 mt-1">Kstu IDCE Golden Palate Awards</p>
            </div>
            <Button onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create category
            </Button>
          </div>

          {/* Category List */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          category.status === 'Published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="text-navy hover:text-primary"
                            onClick={() => {
                              setEditingCategory(category);
                              setCategoryName(category.name);
                              setPublishCategory(category.status === 'Published');
                              setShowModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No categories found</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Create/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-navy mb-4">
              {editingCategory ? 'Edit category' : 'Create category'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-primary">*</span> Category name
                </label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g., Best Student of the Year"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publishCategory"
                  checked={publishCategory}
                  onChange={(e) => setPublishCategory(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="publishCategory" className="text-sm font-medium text-gray-700">
                  Publish category
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleCreateCategory} className="flex-1">
                {editingCategory ? 'Update' : 'Create'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                  setCategoryName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
