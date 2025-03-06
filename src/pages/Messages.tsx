
import React, { useState, useEffect } from 'react';
import { Search, Send, UserCircle, Phone, Video, Menu, X, Paperclip, Image, File, Smile } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  unreadCount: number;
  isTyping?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: Array<{
    id: string;
    type: 'image' | 'file';
    url: string;
    name: string;
    size?: number;
  }>;
}

// Sample data - in a real app, this would come from Supabase
const sampleUsers: ChatUser[] = [
  { id: '1', name: 'Dr. Ankit Sharma', status: 'online', unreadCount: 2 },
  { id: '2', name: 'Preeti Gupta', status: 'online', unreadCount: 0 },
  { id: '3', name: 'Vikram Singh', status: 'away', lastSeen: new Date(Date.now() - 30 * 60000), unreadCount: 0 },
  { id: '4', name: 'Neha Patel', status: 'offline', lastSeen: new Date(Date.now() - 120 * 60000), unreadCount: 5 },
  { id: '5', name: 'Raj Malhotra', status: 'online', unreadCount: 0, isTyping: true },
  { id: '6', name: 'Dr. Sanjay Kumar', status: 'offline', lastSeen: new Date(Date.now() - 240 * 60000), unreadCount: 0 },
  { id: '7', name: 'Priya Verma', status: 'away', lastSeen: new Date(Date.now() - 45 * 60000), unreadCount: 1 },
];

const sampleMessages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', senderId: '1', recipientId: 'current', content: 'Hello, how are you?', timestamp: new Date(Date.now() - 60 * 60000), read: true },
    { id: 'm2', senderId: 'current', recipientId: '1', content: 'I\'m good, thanks for asking. How about you?', timestamp: new Date(Date.now() - 58 * 60000), read: true },
    { id: 'm3', senderId: '1', recipientId: 'current', content: 'Doing well! Have you seen the latest sales report?', timestamp: new Date(Date.now() - 55 * 60000), read: true },
    { id: 'm4', senderId: 'current', recipientId: '1', content: 'Yes, the numbers look promising.', timestamp: new Date(Date.now() - 50 * 60000), read: true },
    { id: 'm5', senderId: '1', recipientId: 'current', content: 'Great! Let\'s discuss the marketing strategy for the new product line tomorrow.', timestamp: new Date(Date.now() - 45 * 60000), read: false },
    { id: 'm6', senderId: '1', recipientId: 'current', content: 'I\'ll prepare the presentation by then.', timestamp: new Date(Date.now() - 43 * 60000), read: false },
  ],
  '2': [
    { id: 'm7', senderId: 'current', recipientId: '2', content: 'Hi Preeti, are we still meeting at 3 PM?', timestamp: new Date(Date.now() - 120 * 60000), read: true },
    { id: 'm8', senderId: '2', recipientId: 'current', content: 'Yes, confirmed. I\'ll bring the samples.', timestamp: new Date(Date.now() - 115 * 60000), read: true },
  ],
  '4': [
    { id: 'm9', senderId: '4', recipientId: 'current', content: 'Hello! Could you please review the client proposal?', timestamp: new Date(Date.now() - 300 * 60000), read: true },
    { id: 'm10', senderId: '4', recipientId: 'current', content: 'I\'ve attached the revised version.', timestamp: new Date(Date.now() - 298 * 60000), read: true, attachments: [{ id: 'a1', type: 'file', url: '#', name: 'client_proposal_v2.pdf', size: 2500000 }] },
    { id: 'm11', senderId: '4', recipientId: 'current', content: 'Also, here are the product images they requested.', timestamp: new Date(Date.now() - 295 * 60000), read: false, attachments: [{ id: 'a2', type: 'image', url: '#', name: 'product_lineup.jpg' }] },
    { id: 'm12', senderId: '4', recipientId: 'current', content: 'Let me know your thoughts when you get a chance.', timestamp: new Date(Date.now() - 290 * 60000), read: false },
    { id: 'm13', senderId: '4', recipientId: 'current', content: 'The client is expecting feedback by tomorrow.', timestamp: new Date(Date.now() - 240 * 60000), read: false },
    { id: 'm14', senderId: '4', recipientId: 'current', content: 'Thanks!', timestamp: new Date(Date.now() - 235 * 60000), read: false },
  ],
  '7': [
    { id: 'm15', senderId: '7', recipientId: 'current', content: 'The manufacturing facility tour is scheduled for next Thursday.', timestamp: new Date(Date.now() - 180 * 60000), read: true },
    { id: 'm16', senderId: 'current', recipientId: '7', content: 'Perfect. I\'ll make the necessary arrangements.', timestamp: new Date(Date.now() - 175 * 60000), read: true },
    { id: 'm17', senderId: '7', recipientId: 'current', content: 'Don\'t forget to bring the safety equipment!', timestamp: new Date(Date.now() - 60 * 60000), read: false },
  ]
};

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<ChatUser[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false);

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Load messages when a user is selected
    if (selectedUser) {
      setMessages(sampleMessages[selectedUser.id] || []);
      
      // Mark messages as read
      if (selectedUser.unreadCount > 0) {
        const updatedUsers = users.map(u => 
          u.id === selectedUser.id ? { ...u, unreadCount: 0 } : u
        );
        setUsers(updatedUsers);
      }
    }
  }, [selectedUser]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: 'current',
      recipientId: selectedUser.id,
      content: newMessage,
      timestamp: new Date(),
      read: false
    };

    // Add message to chat
    setMessages(prev => [...prev, newMsg]);
    
    // Update in sampleMessages (in a real app, would send to Supabase)
    if (sampleMessages[selectedUser.id]) {
      sampleMessages[selectedUser.id] = [...sampleMessages[selectedUser.id], newMsg];
    } else {
      sampleMessages[selectedUser.id] = [newMsg];
    }

    // Clear input
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Group messages by date
  const groupedMessages: Record<string, Message[]> = {};
  messages.forEach(message => {
    const dateString = formatDate(message.timestamp);
    if (!groupedMessages[dateString]) {
      groupedMessages[dateString] = [];
    }
    groupedMessages[dateString].push(message);
  });

  return (
    <div className="flex h-[calc(100vh-4rem)] relative bg-background">
      {/* Mobile menu button */}
      <div className="md:hidden absolute left-4 top-4 z-10">
        <Button variant="outline" size="icon" onClick={() => setShowMobileSidebar(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Users sidebar */}
      <div className={`
        ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-transform duration-200 ease-in-out
        h-full w-full md:w-80 border-r bg-card md:flex flex-col absolute md:relative z-20
      `}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Messages</h2>
          {showMobileSidebar && (
            <Button variant="ghost" size="icon" onClick={() => setShowMobileSidebar(false)} className="md:hidden">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No contacts found
              </div>
            ) : (
              filteredUsers.map(user => (
                <div
                  key={user.id}
                  className={`
                    flex items-center p-3 rounded-md cursor-pointer
                    ${selectedUser?.id === user.id ? 'bg-muted' : 'hover:bg-muted/50'}
                  `}
                  onClick={() => {
                    setSelectedUser(user);
                    setShowMobileSidebar(false);
                  }}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card
                      ${user.status === 'online' ? 'bg-green-500' : 
                        user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}
                    `}></span>
                  </div>
                  
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{user.name}</p>
                      {user.unreadCount > 0 && (
                        <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5">
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.isTyping ? (
                        <span className="text-primary">Typing...</span>
                      ) : user.status === 'online' ? (
                        <span className="text-green-500">Online</span>
                      ) : user.lastSeen ? (
                        `Last seen ${formatTime(user.lastSeen)}`
                      ) : (
                        'Offline'
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.status === 'online' ? (
                      <span className="text-green-500">Online</span>
                    ) : selectedUser.status === 'away' ? (
                      <span className="text-yellow-500">Away</span>
                    ) : selectedUser.lastSeen ? (
                      `Last seen ${formatTime(selectedUser.lastSeen)}`
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-6">
                {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                  <div key={date} className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Separator className="flex-grow" />
                      <span className="mx-2 text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                        {date}
                      </span>
                      <Separator className="flex-grow" />
                    </div>

                    {dateMessages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`
                            max-w-[80%] rounded-lg p-3 break-words
                            ${message.senderId === 'current' 
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'}
                          `}
                        >
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mb-2 space-y-2">
                              {message.attachments.map(attachment => (
                                <div 
                                  key={attachment.id}
                                  className={`
                                    rounded-md p-2 flex items-center gap-2
                                    ${message.senderId === 'current' 
                                      ? 'bg-primary-foreground/10 text-primary-foreground'
                                      : 'bg-background text-foreground'}
                                  `}
                                >
                                  {attachment.type === 'image' ? (
                                    <Image className="h-4 w-4" />
                                  ) : (
                                    <File className="h-4 w-4" />
                                  )}
                                  <span className="text-sm truncate">{attachment.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <p>{message.content}</p>
                          <p 
                            className={`
                              text-[10px] mt-1 text-right
                              ${message.senderId === 'current' 
                                ? 'text-primary-foreground/70'
                                : 'text-muted-foreground'}
                            `}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsAttachmentDialogOpen(true)}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Select a contact to start chatting or search for someone specific.
            </p>
            <Button onClick={() => setShowMobileSidebar(true)} className="md:hidden">
              View Contacts
            </Button>
          </div>
        )}
      </div>

      {/* Attachment Dialog */}
      <Dialog open={isAttachmentDialogOpen} onOpenChange={setIsAttachmentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Attachment</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Image className="h-8 w-8" />
              <span>Upload Image</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <File className="h-8 w-8" />
              <span>Upload Document</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// MessageSquare component needed for empty state
const MessageSquare: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
};

export default MessagesPage;
