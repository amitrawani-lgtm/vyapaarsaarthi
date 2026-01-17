import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image as ImageIcon, Loader2, User, Bot, Paperclip } from 'lucide-react';
import { cn } from '../lib/utils';
import api from '../api/axios';

export default function CommandCenter() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: 'Namaste! How can I help you manage your business today? You can send voice notes, images of bills, or type your query.', type: 'text' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), role: 'user', content: input, type: 'text' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await api.post('/ai/chat', { message: userMessage.content });

            const data = response.data;

            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: data.response, type: 'text' }]);

        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'error', content: "Error: " + error.message, type: 'text' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isImage = file.type.startsWith('image/');
        const isAudio = file.type.startsWith('audio/');

        // Optimistic UI update
        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: isImage ? `Sent an image: ${file.name}` : `Sent audio: ${file.name}`,
            type: isImage ? 'image' : 'audio',
            fileUrl: URL.createObjectURL(file)
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        // Optional: Add a prompt if needed, or let backend infer
        // formData.append('message', 'Analyze this');

        try {
            const response = await api.post('/ai/process', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;

            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: data.response, type: 'text' }]);

        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'error', content: "Error: " + error.message, type: 'text' }]);
        } finally {
            setIsLoading(false);
            // Reset file input
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Vyapaar AI Assistant</h3>
                        <p className="text-xs text-slate-500 flex items-center">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5"></span>
                            Online
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                        <div className={cn(
                            "max-w-[80%] rounded-2xl p-4 shadow-sm",
                            msg.role === 'user'
                                ? "bg-indigo-600 text-white rounded-br-none"
                                : msg.role === 'error'
                                    ? "bg-rose-100 text-rose-800 rounded-bl-none"
                                    : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                        )}>
                            {msg.type === 'image' && msg.fileUrl && (
                                <img src={msg.fileUrl} alt="Upload" className="max-w-xs rounded-lg mb-2" />
                            )}
                            {msg.type === 'audio' && (
                                <div className="flex items-center space-x-2 bg-white/20 p-2 rounded-lg mb-2">
                                    <Mic className="w-4 h-4" />
                                    <span className="text-xs">Audio File</span>
                                </div>
                            )}
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                            <span className="text-sm text-slate-500">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex items-end space-x-2">
                    <div className="flex-1 bg-slate-100 rounded-2xl p-2 flex items-center space-x-2 focus-within:ring-2 focus-within:ring-indigo-100 transition-all border border-transparent focus-within:border-indigo-200">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-200 rounded-xl transition-colors"
                            title="Upload Image/Audio"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*,audio/*"
                            onChange={handleFileUpload}
                        />
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 py-2 text-sm text-slate-800 placeholder:text-slate-400"
                            rows={1}
                        />
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isLoading}
                        className={cn(
                            "p-3 rounded-xl transition-all shadow-md",
                            !input.trim() || isLoading
                                ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
                        )}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-center text-xs text-slate-400 mt-2">
                    AI can make mistakes. Verify important info.
                </p>
            </div>
        </div>
    );
}
