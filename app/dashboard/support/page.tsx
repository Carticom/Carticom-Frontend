'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportRepository, type SupportTicketDto } from '@/features/dashboard/repositories/support.repository';
import { extractErrorMessage } from '@/lib/axios';
import { Loader2, Send, Ticket, CheckCircle2, AlertCircle } from 'lucide-react';

type SupportTicket = SupportTicketDto;

const STATUS_STYLES: Record<SupportTicket['status'], string> = {
  OPEN: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  IN_PROGRESS: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  RESOLVED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  CLOSED: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'};

export default function SupportPage() {
  const queryClient = useQueryClient();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const { data: tickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ['support', 'my-tickets'],
    queryFn: () => supportRepository.getMyTickets()});

  const submitMutation = useMutation({
    mutationFn: async () => {
      return supportRepository.create({ data: { subject, message } });
    },
    onSuccess: () => {
      setSubject('');
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['support', 'my-tickets'] });
    }});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get help, browse documentation, or contact our team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Submit a Ticket</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="How can we help?"
                maxLength={150}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows={5}
                placeholder="Describe your issue..."
              />
            </div>

            {submitMutation.isError && (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                {extractErrorMessage(submitMutation.error)}
              </div>
            )}
            {submitMutation.isSuccess && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Ticket submitted — our team will get back to you within 24 hours.
              </div>
            )}

            <button
              type="button"
              onClick={() => submitMutation.mutate()}
              disabled={!subject.trim() || !message.trim() || submitMutation.isPending}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
            <p className="text-sm text-gray-500 mt-1">We&apos;ll get back to you within 24 hours</p>
            <p className="mt-2 text-sm text-blue-600">support@carticom.com</p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">My Tickets</h3>
            {ticketsLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground/50" />
              </div>
            ) : tickets && tickets.length > 0 ? (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-lg border border-gray-100 dark:border-gray-800 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.subject}</p>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[ticket.status] ?? STATUS_STYLES.OPEN}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{ticket.message}</p>
                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No tickets yet — submit one above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
