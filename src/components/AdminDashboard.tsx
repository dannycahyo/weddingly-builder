import { useState, useEffect } from 'react';
import BuilderForm from './BuilderForm';
import RSVPList from './RSVPList';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'builder' | 'rsvps'>(
    'builder',
  );
  const [weddingSite, setWeddingSite] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeddingSite();
  }, []);

  const fetchWeddingSite = async () => {
    try {
      const response = await fetch('/api/wedding/site');
      if (response.ok) {
        const data = await response.json();
        setWeddingSite(data.weddingSite);
      }
    } catch (error) {
      console.error('Failed to fetch wedding site:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSave = (updatedSite: any) => {
    setWeddingSite(updatedSite);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Wedding Admin
              </h1>
              {weddingSite?.slug && (
                <p className="text-sm text-gray-500">
                  theevermore.com/{weddingSite.slug}
                </p>
              )}
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('builder')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'builder'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Builder
            </button>
            <button
              onClick={() => setActiveTab('rsvps')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rsvps'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              RSVP List
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'builder' ? (
          <BuilderForm
            initialData={weddingSite}
            onSave={handleSave}
          />
        ) : (
          <RSVPList siteId={weddingSite?.id} />
        )}
      </main>
    </div>
  );
}
