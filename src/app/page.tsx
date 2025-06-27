"use client";
import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import ReactMarkdown from "react-markdown";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

type Message = z.infer<typeof messageSchema>;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(null);
    const userMsg: Message = { role: "user", content: input };
    const safe = messageSchema.safeParse(userMsg);
    if (!safe.success) {
      setHasError("Message cannot be empty.");
      return;
    }
    setIsLoading(true);
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const formData = new FormData();
      formData.append("messages", JSON.stringify([...messages, userMsg]));
      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setHasError(err.message || "Failed to get response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center text-gray-800">RAG Chat Demo</h1>
      <div className="relative w-full max-w-3xl flex flex-col items-center">
        <div
          className="w-full h-[700px] bg-white rounded-xl shadow-lg p-4 overflow-y-auto flex flex-col"
        >
          {messages.length === 0 && !isLoading && (
            <div className="text-gray-400 text-center my-8">Ask me anything about my resume...</div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                  <span className="text-blue-700 font-bold">AI</span>
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900 rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_h1]:mb-1 [&_h2]:mb-1">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
                  <span className="text-gray-700 font-bold">U</span>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                <span className="text-blue-700 font-bold">AI</span>
              </div>
              <div className="max-w-[75%] px-4 py-3 rounded-2xl bg-gray-100 text-gray-400 text-sm animate-pulse">
                ...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Fixed chat input bar at bottom, with more padding from window edge */}
        <form
          className="fixed bottom-0 left-0 w-full flex justify-center bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent py-4 z-10"
          style={{ marginBottom: 32 }}
          onSubmit={handleSend}
        >
          <div className="w-full max-w-3xl flex gap-2 px-2">
            <input
              type="text"
              className="flex-1 rounded-full border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow text-gray-900"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-base disabled:opacity-50 shadow"
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </div>
        </form>
        {hasError && (
          <div className="text-red-600 text-sm text-center mt-2 absolute left-0 right-0 bottom-24">
            {hasError}
          </div>
        )}
      </div>
    </div>
  );
}
