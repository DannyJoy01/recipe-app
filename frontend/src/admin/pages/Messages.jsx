import React, { useState, useEffect } from 'react';
import SideBar from '../components/reusables/SideBar';
import Header from '../components/reusables/Header';
import { Mail, UserRound, Reply, Archive } from 'lucide-react';

const messages = [
  {
    id: 1,
    name: 'David Johnson',
    email: 'david@example.com',
    subject: 'Feedback on UI',
    message:
      "Love the UI of your app! It's clean and super easy to use. The navigation feels intuitive, and the colors are great.",
    isRead: false,
    date: '2 hours ago',
  },
  {
    id: 2,
    name: 'Linda Green',
    email: 'linda@example.com',
    subject: 'Bug Report',
    message:
      "I found a small bug when uploading a recipe. The image didn't load at first, but after a page refresh, it worked fine. It seems to be an intermittent issue.",
    isRead: false,
    date: '5 hours ago',
  },
  {
    id: 3,
    name: 'Michael Lee',
    email: 'michael@example.com',
    subject: 'Feature Suggestion',
    message:
      'Please consider adding support for dark mode. It would be amazing! It would be much easier on the eyes, especially at night.',
    isRead: true,
    date: '1 day ago',
  },
];

const MessageListItem = ({ id, name, subject, date, isRead, isSelected, onClick }) => (
  <div
    className={`p-4 rounded-xl cursor-pointer transition-all border ${isSelected ? 'bg-gray-700 border-teal-500 shadow-md' : 'bg-gray-800 hover:bg-gray-700/60 border-gray-700'}`} onClick={() => onClick(id)}>
    <div className="flex items-center justify-between gap-4 mb-1">
      <h3 className={`font-semibold ${isRead ? 'text-gray-300' : 'text-white'}`}>{name}</h3>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
    <p className={`truncate text-sm ${isRead ? 'text-gray-400' : 'text-white font-semibold'}`}>
      {subject}
    </p>
  </div>
);

const MessagesDashboard = () => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    // Automatically select first message if none is selected
    if (messages.length > 0) {
      setSelectedMessageId(messages[0].id);
    }
  }, []);

  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col ml-64 pt-16">
        <Header />
        <main className="p-6 md:p-8 flex-1 flex">
          <div className="max-w-7xl mx-auto flex w-full h-full space-x-6">

            {/* Inbox List */}
            <div className="w-1/3 bg-gray-800 p-4 rounded-2xl shadow-lg flex flex-col">
              <div className="flex items-center gap-2 text-white mb-6">
                <Mail size={20} />
                <h1 className="text-2xl font-bold">Inbox</h1>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((msg) => (
                  <MessageListItem
                    key={msg.id}
                    {...msg}
                    isSelected={msg.id === selectedMessageId}
                    onClick={setSelectedMessageId}
                  />
                ))}
              </div>
            </div>

            {/* Message Detail */}
            <div className="w-2/3 bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col">
              {selectedMessage ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.subject}</h2>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <UserRound size={16} />
                        <span>From:</span>
                        <span className="font-semibold text-white">{selectedMessage.name}</span>
                        <span className="text-gray-500">&lt;{selectedMessage.email}&gt;</span>
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{selectedMessage.date}</span>
                  </div>

                  <div className="flex-1 overflow-y-auto border-y border-gray-700 py-6 my-4 text-gray-300 leading-relaxed whitespace-pre-wrap">
                    <p>{selectedMessage.message}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition">
                      <Reply size={18} />
                      <span className="font-medium">Reply</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
                      <Archive size={18} />
                      <span className="font-medium">Archive</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p className="text-xl">Select a message to view its contents.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagesDashboard;
