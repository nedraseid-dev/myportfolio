import { useState, FormEvent } from "react";
import { PortfolioData } from "../types";
import { Mail, MapPin, Send, CheckCircle2, RefreshCw, Github, Linkedin, Twitter } from "lucide-react";

interface PortfolioContactProps {
  data: PortfolioData;
}

export default function PortfolioContact({ data }: PortfolioContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate real network submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitSuccess(false);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-16 bg-[#121212] border-t border-border/40 relative">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left column: Reach out */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              05 / Connected
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase">
              Start A <br />
              <span className="text-primary">Conversation</span>
            </h2>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Have an opening, a freelance project, or just want to talk tech? Shoot me a message directly or connect via social networks.
            </p>
          </div>

          <div className="space-y-4 pt-6 lg:pt-0">
            {data.socials.email && (
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-[#1a1a1a] border border-border rounded-lg text-primary">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Email Address</div>
                  <a href={`mailto:${data.socials.email}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    {data.socials.email}
                  </a>
                </div>
              </div>
            )}

            {data.socials.telegram && (
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-[#1a1a1a] border border-border rounded-lg text-primary">
                  <Send className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Telegram</div>
                  <a
                    href={data.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {data.socials.telegram.replace("https://t.me/", "@")}
                  </a>
                </div>
              </div>
            )}

            {data.socials.linkedin && (
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-[#1a1a1a] border border-border rounded-lg text-primary">
                  <Linkedin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">LinkedIn</div>
                  <a
                    href={data.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate max-w-[200px] block"
                  >
                    ned-seid
                  </a>
                </div>
              </div>
            )}

            {data.socials.github && (
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-[#1a1a1a] border border-border rounded-lg text-primary">
                  <Github className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">GitHub</div>
                  <a
                    href={data.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    nedraseid-dev
                  </a>
                </div>
              </div>
            )}

            {data.socials.twitter && (
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-[#1a1a1a] border border-border rounded-lg text-primary">
                  <Twitter className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">X / Twitter</div>
                  <a
                    href={data.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    NedraSeid64192
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-[#1a1a1a] border border-border rounded-lg text-primary">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Primary Base</div>
                <div className="text-sm font-semibold text-foreground">{data.location}</div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground/40 font-mono hidden lg:block">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
        </div>

        {/* Right column: Action contact form */}
        <div className="lg:col-span-7 bg-[#1a1a1a] border border-border rounded-lg p-6 md:p-8 relative min-h-[400px] flex flex-col justify-center">
          {submitSuccess ? (
            <div className="text-center py-8 space-y-5 animate-fade-in select-none">
              <div className="inline-flex p-4 bg-primary/10 border border-primary/20 rounded-full text-primary">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">Message Dispatched Successfully!</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto font-light leading-relaxed">
                  Thanks, <span className="text-primary font-semibold">{formData.name}</span>. I have received your message and will respond to <span className="text-foreground">{formData.email}</span> within 24 hours.
                </p>
              </div>
              <button
                onClick={handleResetForm}
                className="mt-4 px-4 py-2 bg-[#252525] hover:bg-[#303030] text-foreground text-xs font-mono rounded border border-border transition-colors cursor-pointer flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-muted-foreground">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-[#202020] border border-border rounded px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-[#202020] border border-border rounded px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-muted-foreground">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we collaborate?"
                  className="w-full bg-[#202020] border border-border rounded px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-muted-foreground">Message Body</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, or role openings..."
                  className="w-full bg-[#202020] border border-border rounded px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-all resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:brightness-110 active:scale-[0.98] text-primary-foreground font-mono uppercase tracking-wider text-xs font-bold py-3.5 rounded transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground/40 font-mono text-center pt-8 border-t border-border/40 col-span-1 lg:hidden">
          © {new Date().getFullYear()} {data.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}
