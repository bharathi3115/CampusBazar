import React, { useState } from 'react';
import { Send, Image as ImageIcon, MoreVertical, Search, Check, CheckCheck, Package } from 'lucide-react';

const SellerMessages = () => {
  const conversations = [
    {
      id: 1,
      buyerName: 'Rahul S.',
      productName: 'Scientific Calculator',
      lastMessage: 'Can you reduce the price?',
      timestamp: '10:30 AM',
      unread: 1,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
      productImage: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      buyerName: 'Priya M.',
      productName: 'Engineering Graphics Book',
      lastMessage: 'I will pick it up tomorrow.',
      timestamp: 'Yesterday',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      productImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      buyerName: 'Akash K.',
      productName: 'Drawing Board',
      lastMessage: 'Is this still available?',
      timestamp: 'Tuesday',
      unread: 2,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Akash',
      productImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=100&h=100&fit=crop'
    }
  ];

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi, is the calculator still available?', sender: 'buyer', time: '10:15 AM' },
    { id: 2, text: 'Yes, it is available and in great condition.', sender: 'me', time: '10:20 AM' },
    { id: 3, text: 'Can you reduce the price?', sender: 'buyer', time: '10:30 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col sm:flex-row gap-6">
      
      {/* Left Panel: Conversation List */}
      <div className="w-full sm:w-1/3 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon transition-all" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              className={`flex items-start gap-3 p-4 cursor-pointer border-b border-slate-50 transition-colors ${activeChat.id === chat.id ? 'bg-theme-maroon/5 border-l-4 border-l-theme-maroon' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
            >
              <div className="relative flex-shrink-0">
                <img src={chat.avatar} alt={chat.buyerName} className="w-12 h-12 rounded-full border border-slate-200 bg-white" />
                {chat.unread > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-theme-maroon text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">{chat.unread}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className={`font-bold text-sm truncate ${activeChat.id === chat.id ? 'text-theme-maroon' : 'text-slate-900'}`}>{chat.buyerName}</h4>
                  <span className="text-xs font-bold text-slate-400 whitespace-nowrap ml-2">{chat.timestamp}</span>
                </div>
                <p className="text-xs font-bold text-slate-500 truncate mb-1 flex items-center gap-1"><Package className="w-3 h-3"/> {chat.productName}</p>
                <p className={`text-sm truncate ${chat.unread > 0 ? 'font-bold text-slate-800' : 'text-slate-500'}`}>{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Chat Window */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden hidden sm:flex">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.buyerName} className="w-10 h-10 rounded-full border border-slate-200 bg-white" />
            <div>
              <h3 className="font-bold text-slate-900">{activeChat.buyerName}</h3>
              <p className="text-xs font-medium text-emerald-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Online</p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-200"><MoreVertical className="w-5 h-5" /></button>
        </div>

        {/* Product Reference Card */}
        <div className="p-3 bg-white border-b border-slate-100 flex items-center gap-3">
          <img src={activeChat.productImage} className="w-12 h-12 rounded-lg object-cover border border-slate-200" alt="Product" />
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Inquiry about</p>
            <p className="font-bold text-theme-maroon text-sm">{activeChat.productName}</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'me' ? 'bg-theme-maroon text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}`}>
                <p className="text-sm">{msg.text}</p>
                <div className={`text-[10px] mt-1 flex items-center gap-1 ${msg.sender === 'me' ? 'text-white/70 justify-end' : 'text-slate-400'}`}>
                  {msg.time} {msg.sender === 'me' && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <button type="button" className="p-2 text-slate-400 hover:text-theme-maroon bg-slate-50 hover:bg-theme-maroon/10 rounded-xl transition-all">
              <ImageIcon className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-theme-maroon focus:bg-white transition-all"
            />
            <button type="submit" className="p-2.5 bg-theme-maroon text-white rounded-xl hover:bg-theme-dark-maroon shadow-md shadow-theme-maroon/20 transition-all flex items-center justify-center">
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerMessages;
