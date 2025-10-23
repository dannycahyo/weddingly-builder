import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import type { RSVP } from '../lib/validations';

interface RSVPListProps {
  siteId?: string;
}

export default function RSVPList({ siteId }: RSVPListProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [analytics, setAnalytics] = useState({
    totalAttending: 0,
    totalDeclined: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch('/api/rsvp/list');
      if (!response.ok) {
        throw new Error('Failed to fetch RSVPs');
      }

      const data = await response.json();
      setRsvps(data.rsvps);
      setAnalytics(data.analytics);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch RSVPs';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/rsvp/export');
      if (!response.ok) {
        throw new Error('Failed to export RSVPs');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rsvps-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('RSVPs exported successfully!');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to export RSVPs';
      toast.error(message);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading RSVPs...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total RSVPs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {analytics.total}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {analytics.totalAttending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Declined
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {analytics.totalDeclined}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {/* RSVP Table */}
      <Card>
        <CardHeader>
          <CardTitle>RSVP Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {rsvps.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No RSVPs yet. Share your wedding website to start
              receiving responses!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dietary Restrictions</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvps.map((rsvp) => (
                    <TableRow key={rsvp.id}>
                      <TableCell className="font-medium">
                        {rsvp.fullName}
                      </TableCell>
                      <TableCell>{rsvp.email || '-'}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            rsvp.attending
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rsvp.attending ? 'Attending' : 'Declined'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {rsvp.dietaryRestrictions || '-'}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {rsvp.message || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(rsvp.createdAt), 'PPp')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
