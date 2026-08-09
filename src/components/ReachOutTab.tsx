import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Copy, Check, Loader2 } from "lucide-react";
import { profile } from "../data/content";
import { useReachOut } from "../context/ReachOutContext";

const ease = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "sending" | "sent" | "error";

export default function ReachOutTab() {
  const { open, setOpen } = useReachOut();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const keyConfigured = profile.web3formsAccessKey && profile.web3formsAccessKey !== "YOUR_WEB3FORMS_ACCESS_KEY";

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    if (!keyConfigured) {
      // no key set up yet — fall back to opening the visitor's mail app
      const subject = encodeURIComponent(`Portfolio message from ${name || "a visitor"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: profile.web3formsAccessKey,
          name,
          email,
          message,
          subject: `Portfolio message from ${name || "a visitor"}`,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function resetForm() {
    setStatus("idle");
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
      <div className="pointer-events-auto relative">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
              className="absolute bottom-full left-1/2 mb-3 w-[min(92vw,360px)] -translate-x-1/2 rounded-2xl border border-white/15 bg-panel/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md"
            >
              {status === "sent" ? (
                <div className="py-4 text-center">
                  <p className="font-display text-lg text-cream">
                    {keyConfigured ? "Message sent." : "Your email app should be open."}
                  </p>
                  <p className="mt-2 text-sm text-fog">
                    {keyConfigured
                      ? "Thanks for reaching out — I'll get back to you soon."
                      : "Didn't pop up? No default mail app is a common reason — copy the address instead and send it from wherever you check email."}
                  </p>
                  {!keyConfigured && (
                    <button
                      onClick={handleCopy}
                      className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cream/90 transition-colors hover:border-white/35 hover:text-cream"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      {copied ? "Copied" : "Copy email address"}
                    </button>
                  )}
                  <button
                    onClick={resetForm}
                    className="mt-4 block w-full font-mono text-xs uppercase tracking-wider text-blue-glow hover:text-cream transition-colors"
                  >
                    Back
                  </button>
                </div>
              ) : status === "error" ? (
                <div className="py-4 text-center">
                  <p className="font-display text-lg text-cream">That didn't go through.</p>
                  <p className="mt-2 text-sm text-fog">
                    Something went wrong on my end — copy the address below and email me directly instead.
                  </p>
                  <button
                    onClick={handleCopy}
                    className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cream/90 transition-colors hover:border-white/35 hover:text-cream"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy email address"}
                  </button>
                  <button
                    onClick={resetForm}
                    className="mt-4 block w-full font-mono text-xs uppercase tracking-wider text-blue-glow hover:text-cream transition-colors"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSend}>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-blue-glow">Reach out</p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="text-fog hover:text-cream transition-colors"
                      aria-label="Close"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-cream/80">Say hello — this goes straight to my inbox.</p>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-cream placeholder:text-fog/60 outline-none focus:border-blue-glow/60"
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-cream placeholder:text-fog/60 outline-none focus:border-blue-glow/60"
                  />
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's on your mind?"
                    rows={4}
                    className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-cream placeholder:text-fog/60 outline-none focus:border-blue-glow/60"
                  />
                  {/* honeypot — Web3Forms silently drops any submission where this is filled in */}
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-cream py-2.5 font-mono text-xs uppercase tracking-wider text-void transition-colors hover:bg-blue-glow disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        Sending
                        <Loader2 size={13} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send
                        <Send size={13} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(!open)}
          initial={{ y: 6 }}
          animate={{ y: 0 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3, ease }}
          className="flex items-center gap-2 rounded-t-2xl border border-b-0 border-white/15 bg-cream px-6 py-3 font-mono text-xs uppercase tracking-wider text-void shadow-[0_-8px_30px_rgba(111,227,255,0.15)]"
        >
          <MessageCircle size={14} />
          {open ? "Close" : "Reach out"}
        </motion.button>
      </div>
    </div>
  );
}
