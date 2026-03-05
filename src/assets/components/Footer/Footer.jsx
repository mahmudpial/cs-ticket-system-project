import "./Footer.css"
export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-b from-[#060d1a] to-[#030810] border-t border-sky-500/10 font-sans">

            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,0.06),transparent_70%)] pointer-events-none" />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-10 pt-16 pb-12">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.4fr] gap-10">

                    {/* Brand column */}
                    <div className="max-w-sm">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5 mb-5">
                            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                                <rect x="2" y="6" width="24" height="16" rx="3" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
                                <path d="M2 11h24M8 6v16" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="5" cy="8.5" r="1" fill="#0ea5e9" />
                                <path d="M13 15h8M13 18h5" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <span className="font-mono text-[17px] font-bold text-sky-50">
                                <span className="text-sky-500">CS</span> — Ticket System
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9,0_0_20px_rgba(14,165,233,0.4)] animate-pulse -mt-2.5 ml-0.5" />
                        </div>

                        <p className="text-sm text-slate-500 leading-relaxed mb-7">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book.
                        </p>

                        {/* Status badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/[0.06]">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0ea5e9] animate-pulse" />
                            <span className="font-mono text-[11px] text-sky-400 tracking-[0.8px]">
                                System Operational
                            </span>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="text-[15px] font-bold text-sky-50 mb-5 tracking-[0.1px]">Company</p>
                        <div className="flex flex-col gap-3.5">
                            {["About Us", "Our Mission", "Contact Sales"].map((item) => (
                                <span key={item} className="text-sm text-slate-500 cursor-pointer hover:text-slate-200 transition-colors duration-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <p className="text-[15px] font-bold text-sky-50 mb-5 tracking-[0.1px]">Services</p>
                        <div className="flex flex-col gap-3.5">
                            {["Products & Services", "Customer Stories", "Download Apps"].map((item) => (
                                <span key={item} className="text-sm text-slate-500 cursor-pointer hover:text-slate-200 transition-colors duration-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Information */}
                    <div>
                        <p className="text-[15px] font-bold text-sky-50 mb-5 tracking-[0.1px]">Information</p>
                        <div className="flex flex-col gap-3.5">
                            {["Privacy Policy", "Terms & Conditions", "Join Us"].map((item) => (
                                <span key={item} className="text-sm text-slate-500 cursor-pointer hover:text-slate-200 transition-colors duration-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <p className="text-[15px] font-bold text-sky-50 mb-5 tracking-[0.1px]">Social Links</p>
                        <div className="flex flex-col gap-3.5">

                            {/* X / Twitter */}
                            <div className="group flex items-center gap-2.5 cursor-pointer">
                                <div className="w-8 h-8 rounded-lg border border-slate-600/40 bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-sky-500/40 group-hover:bg-sky-500/10">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#94a3b8">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-500 transition-colors duration-200 group-hover:text-sky-400">
                                    @CS — Ticket System
                                </span>
                            </div>

                            {/* LinkedIn */}
                            <div className="group flex items-center gap-2.5 cursor-pointer">
                                <div className="w-8 h-8 rounded-lg border border-slate-600/40 bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-sky-500/40 group-hover:bg-sky-500/10">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#94a3b8">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-500 transition-colors duration-200 group-hover:text-sky-400">
                                    @CS — Ticket System
                                </span>
                            </div>

                            {/* Facebook */}
                            <div className="group flex items-center gap-2.5 cursor-pointer">
                                <div className="w-8 h-8 rounded-lg border border-slate-600/40 bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-sky-500/40 group-hover:bg-sky-500/10">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#94a3b8">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-500 transition-colors duration-200 group-hover:text-sky-400">
                                    @CS — Ticket System
                                </span>
                            </div>

                            {/* Email */}
                            <div className="group flex items-center gap-2.5 cursor-pointer">
                                <div className="w-8 h-8 rounded-lg border border-slate-600/40 bg-white/[0.04] flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-sky-500/40 group-hover:bg-sky-500/10">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <span className="text-sm text-slate-500 transition-colors duration-200 group-hover:text-sky-400">
                                    support@cst.com
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 py-5 px-10 flex items-center justify-center">
                <p className="text-[13px] text-slate-700 tracking-[0.2px]">
                    © 2025 CS — Ticket System By Pial. All rights reserved.
                </p>
            </div>
        </footer>
    );
}