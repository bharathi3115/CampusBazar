import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MoreVertical, Phone, Video, Info, Paperclip, 
  Image as ImageIcon, Smile, Send, CheckCircle2, Clock, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client';

const SellerMessages = ({ initialChatId }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(initialChatId || null);
  const [messages, setMessages] = useState([]);

  const dummyConversations = [
    {
      _id: 'dummy_conv_1',
      buyerId: { _id: 'd1', name: 'Rahul S.', email: 'rahul@example.com' },
      sellerId: user || { _id: 'seller1', name: 'Seller' },
      productId: { title: 'Scientific Calculator', img: '' },
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      unreadBySeller: 1
    },
    {
      _id: 'dummy_conv_2',
      buyerId: { _id: 'd2', name: 'Priya M.', email: 'priya@example.com' },
      sellerId: user || { _id: 'seller1', name: 'Seller' },
      productId: { title: 'Engineering Graphics Book', img: '' },
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      unreadBySeller: 0
    },
    {
      _id: 'dummy_conv_3',
      buyerId: { _id: 'd3', name: 'Akash K.', email: 'akash@example.com' },
      sellerId: user || { _id: 'seller1', name: 'Seller' },
      productId: { title: 'Drawing Board', img: '' },
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
      unreadBySeller: 0
    },
    {
      _id: 'dummy_conv_4',
      buyerId: { _id: 'd4', name: 'Neha P.', email: 'neha@example.com' },
      sellerId: user || { _id: 'seller1', name: 'Seller' },
      productId: { title: 'Mountain Bicycle', img: '' },
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 2880).toISOString(),
      unreadBySeller: 0
    },
    {
      _id: 'dummy_conv_5',
      buyerId: { _id: 'd5', name: 'David K.', email: 'david@example.com' },
      sellerId: user || { _id: 'seller1', name: 'Seller' },
      productId: { title: 'Physics Lab Coat', img: '' },
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 4320).toISOString(),
      unreadBySeller: 0
    }
  ];

  const dummyMessagesMap = {
    'dummy_conv_1': [
      { _id: 'm1', senderId: 'd1', text: 'Hi, is the calculator still available?', createdAt: new Date(Date.now() - 1000 * 60 * 125).toISOString() },
      { _id: 'm2', senderId: user?._id || 'seller1', text: 'Yes it is! When do you want to meet?', createdAt: new Date(Date.now() - 1000 * 60 * 122).toISOString() },
      { _id: 'm3', senderId: 'd1', text: 'How about tomorrow evening near the library?', createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() }
    ],
    'dummy_conv_2': [
      { _id: 'm4', senderId: 'd2', text: 'Can you reduce the price a bit?', createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString() }
    ],
    'dummy_conv_3': [
      { _id: 'm5', senderId: 'd3', text: 'Is the drawing board in good condition?', createdAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString() }
    ],
    'dummy_conv_4': [
      { _id: 'm6', senderId: 'd4', text: 'I am interested in the bicycle.', createdAt: new Date(Date.now() - 1000 * 60 * 2880).toISOString() }
    ],
    'dummy_conv_5': [
      { _id: 'm7', senderId: 'd5', text: 'What size is the lab coat?', createdAt: new Date(Date.now() - 1000 * 60 * 4320).toISOString() }
    ]
  };
  
  useEffect(() => {
    if (initialChatId) {
      setActiveChatId(initialChatId);
    }
  }, [initialChatId]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const fetchConversations = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/messages/conversations/${user._id}`);
      if (res.ok) {
        const data = await res.json();
        const realData = Array.isArray(data) ? data : [];
        const combinedData = [...realData, ...dummyConversations];
        setConversations(combinedData);
        if (!activeChatId && combinedData.length > 0) {
          setActiveChatId(combinedData[0]._id);
        }
      } else {
        setConversations(dummyConversations);
      }
    } catch (err) {
      console.error(err);
      setConversations(dummyConversations);
    }
  };

  useEffect(() => {
    if (!user) return;
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('join_chat', user._id);

    newSocket.on('receive_message', (msg) => {
      setMessages(prev => {
        if (msg.conversationId === activeChatId) {
          return [...prev, msg];
        }
        return prev;
      });
      fetchConversations();
    });

    return () => newSocket.close();
  }, [user, activeChatId]);

  useEffect(() => {
    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (activeChatId && user) {
      if (activeChatId.startsWith('dummy_conv_')) {
        setMessages(dummyMessagesMap[activeChatId] || []);
        return;
      }
      
      const fetchMessages = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/messages/${activeChatId}`);
          if (res.ok) {
            const data = await res.json();
            setMessages(Array.isArray(data) ? data : []);
          } else {
            setMessages([]);
          }
          
          // Mark read
          await fetch(`http://localhost:5000/api/messages/${activeChatId}/read`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id })
          });
          fetchConversations();
        } catch (err) {
          console.error(err);
        }
      };
      fetchMessages();
    }
  }, [activeChatId, user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const activeChat = conversations.find(c => c._id === activeChatId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !socket) return;
    
    if (activeChatId.startsWith('dummy_conv_')) {
      alert("This is a dummy conversation. You cannot send messages.");
      return;
    }

    const isMeBuyer = activeChat.buyerId._id === user._id;
    const receiverId = isMeBuyer ? activeChat.sellerId._id : activeChat.buyerId._id;

    const messageData = {
      conversationId: activeChatId,
      senderId: user._id,
      receiverId,
      text: newMessage
    };

    socket.emit('send_message', messageData);

    setMessages(prev => [...prev, {
      ...messageData,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'sent'
    }]);
    setNewMessage('');
    fetchConversations();
  };

  const getChatDisplay = (chat) => {
    const isMeBuyer = chat.buyerId._id === user._id;
    const otherUser = isMeBuyer ? chat.sellerId : chat.buyerId;
    const unread = isMeBuyer ? chat.unreadByBuyer : chat.unreadBySeller;
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser?.name || 'User'}`;
    
    // Formatting relative time simply for UI
    let lastActive = 'Just now';
    if (chat.lastMessageAt) {
      const diff = Date.now() - new Date(chat.lastMessageAt).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins > 1440) lastActive = `${Math.floor(mins/1440)}d ago`;
      else if (mins > 60) lastActive = `${Math.floor(mins/60)}h ago`;
      else if (mins > 0) lastActive = `${mins}m ago`;
    }

    return { name: otherUser?.name || 'Unknown', avatar, unread, item: chat.productId?.title || 'Unknown Product', lastActive };
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
          {conversations.map(chat => {
            const display = getChatDisplay(chat);
            return (
              <div 
                key={chat._id}
                onClick={() => setActiveChatId(chat._id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-100 ${activeChatId === chat._id ? 'bg-theme-maroon/5 border-l-4 border-l-theme-maroon' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={display.avatar} alt={display.name} className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-sm" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className={`text-sm truncate ${display.unread > 0 ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>
                        {display.name}
                      </h3>
                      <span className="text-xs font-bold text-slate-400">{display.lastActive}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs truncate ${display.unread > 0 ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>
                        {display.item}
                      </p>
                      {display.unread > 0 && (
                        <span className="w-5 h-5 bg-theme-maroon text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                          {display.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Active Chat */}
      <div className="flex-1 flex flex-col bg-white hidden md:flex relative">
        {activeChat ? (
          (() => {
            const display = getChatDisplay(activeChat);
            return (
              <>
                {/* Chat Header */}
                <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={display.avatar} alt={display.name} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">{display.name}</h3>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
                        <span className="text-theme-maroon bg-theme-maroon/10 px-1.5 py-0.5 rounded font-bold">{display.item}</span>
                        <span>Online</span>
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
                  <div className="flex items-center justify-center my-4">
                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
                  </div>

                  {messages.map((msg, idx) => {
                    const isMe = msg.senderId === user._id;
                    const showAvatar = !isMe && (idx === 0 || messages[idx-1].senderId !== msg.senderId);
                    const timeString = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    return (
                      <div key={msg._id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {!isMe && (
                          <div className="w-8 flex-shrink-0">
                            {showAvatar && <img src={display.avatar} alt="" className="w-8 h-8 rounded-full shadow-sm" />}
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
                            <span className="text-[10px] font-bold text-slate-400">{timeString}</span>
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
            );
          })()
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

export default SellerMessages;
