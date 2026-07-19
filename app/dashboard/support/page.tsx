'use client';

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Support</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get help, browse documentation, or contact our team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Help Center', desc: 'Guides and tutorials' },
          { title: 'FAQ', desc: 'Frequently asked questions' },
          { title: 'Documentation', desc: 'API and integration docs' },
          { title: 'Video Tutorials', desc: 'Learn visually' },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-blue-500 transition-colors cursor-pointer">
            <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Support</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="How can we help?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" rows={5} placeholder="Describe your issue..." />
          </div>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send Message</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
          <p className="text-sm text-gray-500 mt-1">Chat with our support team in real-time</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Start Chat</button>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
          <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours</p>
          <p className="mt-2 text-sm text-blue-600">support@carticom.com</p>
        </div>
      </div>
    </div>
  );
}