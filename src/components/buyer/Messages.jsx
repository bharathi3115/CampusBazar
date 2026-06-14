import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  Image as ImageIcon, 
  Smile, 
  Send,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    name: 'Sarah M.',
    item: 'Engineering Graphics Textbook',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah M.',
    unread: 2,
    lastActive: '10m ago',
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hi, is the Engineering Graphics textbook still available?', time: '10:00 AM' },
      { id: 2, sender: 'me', text: 'Yes, it is! Are you on campus today?', time: '10:05 AM', status: 'read' },
      { id: 3, sender: 'them', text: 'I can meet at the library around 2 PM.', time: '10:15 AM' },
      { id: 4, sender: 'them', text: 'Does that work for you?', time: '10:16 AM' }
    ]
  },
  {
    id: 2,
    name: 'David K.',
    item: 'Mountain Bicycle',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David K.',
    unread: 0,
    lastActive: '2h ago',
    online: false,
    messages: [
      { id: 1, sender: 'me', text: 'Hi David, what is the lowest price you would accept for the bicycle?', time: 'Yesterday', status: 'read' },
      { id: 2, sender: 'them', text: 'I can do ₹3000 if you pick it up today.', time: 'Yesterday' }
    ]
  },
  {
    id: 3,
    name: 'Prof. Miller',
    item: 'Physics Lab Coat',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prof. Miller',
    unread: 1,
    lastActive: '1d ago',
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'The lab coat is in excellent condition.', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'Great, I will take it.', time: 'Yesterday', status: 'read' },
      { id: 3, sender: 'them', text: 'Sure, meet me at the lab.', time: 'Yesterday' }
    ]
  },
  {
    id: 4,
    name: 'Priya M.',
    item: 'Casio Scientific Calculator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya M.',
    unread: 0,
    lastActive: '3d ago',
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Thanks for the purchase!', time: 'Monday' },
      { id: 2, sender: 'me', text: 'Thank you! Works perfectly.', time: 'Monday', status: 'read' }
    ]
  }
];

const Messages = () => {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState(INITIAL_CONVERSATIONS[0].id);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const activeChat = conversations.find(c => c.id === activeChatId);

  // Scroll to bottom when active chat changes or new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages]);

  // Mark as read when opening a chat
  useEffect(() => {
    if (activeChat && activeChat.unread > 0) {
      setConversations(prev => prev.map(c => 
        c.id === activeChatId ? { ...c, unread: 0 } : c
      ));
    }
  }, [activeChatId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsgObj = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setConversations(prev => prev.map(c => 
      c.id === activeChatId 
      ? { ...c, messages: [...c.messages, newMsgObj], lastActive: 'Just now' }
      : c
    ));
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex max-w-7xl mx-auto">
      
      {/* Left Sidebar - Chat List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50 flex-shrink-0">
        
        {/* Sidebar Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-theme-maroon" /> Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl transition-all outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-100 ${activeChatId === chat.id ? 'bg-theme-maroon/5 border-l-4 border-l-theme-maroon' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-sm" />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={`text-sm truncate ${chat.unread > 0 ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>
                      {chat.name}
                    </h3>
                    <span className="text-xs font-bold text-slate-400">{chat.lastActive}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs truncate ${chat.unread > 0 ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>
                      {chat.messages[chat.messages.length - 1].sender === 'me' ? 'You: ' : ''}
                      {chat.messages[chat.messages.length - 1].text}
                    </p>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 bg-theme-maroon text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Active Chat */}
      <div className="flex-1 flex flex-col bg-white hidden md:flex relative">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
                  {activeChat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">{activeChat.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
                    <span className="text-theme-maroon bg-theme-maroon/10 px-1.5 py-0.5 rounded font-bold">{activeChat.item}</span>
                    <span>{activeChat.online ? 'Online' : `Last active ${activeChat.lastActive}`}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-2 text-slate-400 hover:text-theme-maroon hover:bg-theme-maroon/10 rounded-full transition-colors"><Phone className="w-5 h-5" /></button>
                <button className="p-2 text-slate-400 hover:text-theme-maroon hover:bg-theme-maroon/10 rounded-full transition-colors"><Video className="w-5 h-5" /></button>
                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><Info className="w-5 h-5" /></button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
              {/* Date Divider */}
              <div className="flex items-center justify-center my-4">
                <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
              </div>

              {activeChat.messages.map((msg, idx) => {
                const isMe = msg.sender === 'me';
                const showAvatar = !isMe && (idx === 0 || activeChat.messages[idx-1].sender !== 'them');
                
                return (
                  <div key={msg.id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                      <div className="w-8 flex-shrink-0">
                        {showAvatar && <img src={activeChat.avatar} alt="" className="w-8 h-8 rounded-full shadow-sm" />}
                      </div>
                    )}
                    
                    <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                      <div 
                        className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                          isMe 
                          ? 'bg-theme-maroon text-white rounded-br-sm' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-[10px] font-bold text-slate-400">{msg.time}</span>
                        {isMe && (
                          msg.status === 'read' ? <CheckCircle2 className="w-3 h-3 text-blue-500" /> : 
                          msg.status === 'sent' ? <CheckCircle2 className="w-3 h-3 text-slate-300" /> :
                          <Clock className="w-3 h-3 text-slate-300" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2 sm:gap-3 bg-slate-50 p-2 sm:p-2 rounded-2xl border border-slate-200 focus-within:border-theme-maroon focus-within:ring-1 focus-within:ring-theme-maroon transition-all">
                <div className="flex gap-1 pb-1 px-1 text-slate-400">
                  <button type="button" className="p-1.5 hover:text-theme-maroon hover:bg-theme-maroon/10 rounded-lg transition-colors"><Smile className="w-5 h-5" /></button>
                  <button type="button" className="p-1.5 hover:text-theme-maroon hover:bg-theme-maroon/10 rounded-lg transition-colors"><Paperclip className="w-5 h-5" /></button>
                  <button type="button" className="p-1.5 hover:text-theme-maroon hover:bg-theme-maroon/10 rounded-lg transition-colors hidden sm:block"><ImageIcon className="w-5 h-5" /></button>
                </div>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 py-2.5 text-sm"
                />
                <button 
                  type="submit" 
                  disabled={!newMessage.trim()}
                  className="p-2.5 bg-theme-maroon text-white rounded-xl hover:bg-theme-dark-maroon transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-theme-maroon/20"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-slate-400 bg-slate-50/50">
            <MessageSquare className="w-16 h-16 mb-4 text-slate-200" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Your Messages</h3>
            <p className="text-sm font-medium max-w-xs text-center">Select a conversation from the sidebar to start chatting.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Messages;
