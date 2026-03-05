import { useState, useEffect } from "react";

const TicketIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="6" width="24" height="16" rx="3" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M2 11h24M8 6v16" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="5" cy="8.5" r="1" fill="#0ea5e9" />
        <path d="M13 15h8M13 18h5" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const menuItems = ["Home", "FAQ", "Change", "Blog", "Download", "Contact"];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("Home");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <style>{`
        

        body { font-family: 'Outfit', sans-serif; background: #060d1a; }

        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-mono-jb { font-family: 'JetBrains Mono', monospace; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #0ea5e9, 0 0 20px rgba(14,165,233,0.4); }
          50% { opacity: 0.5; box-shadow: 0 0 4px #0ea5e9; }
        }
        .animate-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: #0ea5e9;
          border-radius: 2px;
          box-shadow: 0 0 6px #0ea5e9;
        }

        .btn-ticket-shine::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-ticket-shine:hover::before { opacity: 1; }
      `}</style>

            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-[68px] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-b
          ${scrolled
                        ? "bg-[#060d1a]/90 backdrop-blur-xl border-b-[rgba(14,165,233,0.12)] shadow-[0_4px_40px_rgba(0,0,0,0.6),0_1px_0_rgba(14,165,233,0.08)]"
                        : "bg-transparent border-transparent"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-[10px] cursor-pointer shrink-0">
                    <TicketIcon />
                    <div className="flex flex-col leading-none">
                        <span className="font-mono-jb text-[17px] font-bold tracking-[-0.3px] text-[#f0f9ff]">
                            <span className="text-[#0ea5e9]">CS</span>-Ticket
                        </span>
                        <span className="font-outfit text-[9px] font-medium tracking-[3px] uppercase text-[#475569] mt-0.5">
                            Support System
                        </span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse-dot ml-0.5 -mt-2" />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-1 list-none">
                    {menuItems.map((item) => (
                        <li key={item} className="relative">
                            <span
                                onClick={() => setActive(item)}
                                className={`relative block px-[14px] py-[7px] font-outfit text-[14px] font-medium rounded-lg cursor-pointer transition-all duration-200 border
                  ${active === item
                                        ? "text-[#38bdf8] bg-[rgba(14,165,233,0.07)] border-[rgba(14,165,233,0.15)] nav-link-active"
                                        : "text-[#94a3b8] border-transparent hover:text-[#e2e8f0] hover:bg-[rgba(14,165,233,0.07)] hover:border-[rgba(14,165,233,0.15)]"
                                    }`}
                            >
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:block w-px h-5 bg-[rgba(71,85,105,0.4)]" />

                    <button
                        className="btn-ticket-shine hidden md:flex items-center gap-2 px-5 py-[9px] font-outfit text-[14px] font-semibold text-white rounded-[10px] border-none cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0"
                        style={{
                            background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)",
                            boxShadow: "0 2px 20px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 30px rgba(14,165,233,0.45), inset 0 1px 0 rgba(255,255,255,0.2)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 20px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"}
                    >
                        <span className="w-5 h-5 bg-[rgba(255,255,255,0.2)] rounded-[5px] flex items-center justify-center shrink-0">
                            <PlusIcon />
                        </span>
                        New Ticket
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 rounded-lg bg-transparent border border-[rgba(71,85,105,0.3)] hover:border-[rgba(14,165,233,0.3)] transition-colors duration-200"
                    >
                        <span className={`block w-5 h-0.5 bg-[#94a3b8] rounded-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "translate-y-[7px] rotate-45 bg-[#0ea5e9]" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-[#94a3b8] rounded-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-[#94a3b8] rounded-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "-translate-y-[7px] -rotate-45 bg-[#0ea5e9]" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden fixed top-[68px] left-0 right-0 z-40 flex flex-col gap-1 p-4 bg-[#060d1a]/95 backdrop-blur-xl border-b border-[rgba(14,165,233,0.12)] animate-slide-down">
                    {menuItems.map((item) => (
                        <div
                            key={item}
                            onClick={() => { setActive(item); setMenuOpen(false); }}
                            className={`px-4 py-[11px] text-[15px] font-medium rounded-[10px] cursor-pointer transition-all duration-200 border font-outfit
                ${active === item
                                    ? "text-[#38bdf8] bg-[rgba(14,165,233,0.07)] border-[rgba(14,165,233,0.15)]"
                                    : "text-[#94a3b8] border-transparent hover:text-[#38bdf8] hover:bg-[rgba(14,165,233,0.07)] hover:border-[rgba(14,165,233,0.15)]"
                                }`}
                        >
                            {item}
                        </div>
                    ))}
                    <div className="mt-2 pt-3 border-t border-[rgba(71,85,105,0.2)]">
                        <button
                            className="w-full flex items-center justify-center gap-2 py-3 text-[15px] font-semibold text-white rounded-[10px] border-none cursor-pointer font-outfit"
                            style={{
                                background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
                                boxShadow: "0 4px 20px rgba(14,165,233,0.25)",
                            }}
                        >
                            <PlusIcon />
                            New Ticket
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}