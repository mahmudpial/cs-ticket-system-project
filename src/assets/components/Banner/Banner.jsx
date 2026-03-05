import { useEffect, useState } from "react";
import "./Banner.css";

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ClockIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 6.5V11l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 11l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function useCountUp(target, duration = 1400, delay = 0) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start, raf;
        setValue(0);
        const timeout = setTimeout(() => {
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 4);
                setValue(Math.floor(ease * target));
                if (progress < 1) raf = requestAnimationFrame(step);
                else setValue(target);
            };
            raf = requestAnimationFrame(step);
        }, delay);
        return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
    }, [target, duration, delay]);
    return value;
}


function StatCard({ label, count, icon: Icon, accent, delay }) {
    const animated = useCountUp(count, 1400, delay);

    const cfg = {
        amber: {
            wrapper: "border-[rgba(245,158,11,0.2)] shadow-[0_0_40px_rgba(245,158,11,0.12)]",
            bg: "from-[rgba(245,158,11,0.08)] to-[rgba(249,115,22,0.03)]",
            iconWrap: "bg-[rgba(245,158,11,0.1)] text-[#fbbf24]",
            count: "text-[#fcd34d]",
            badge: "bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.2)] text-[#fbbf24]",
            badgeLabel: "ACTIVE",
            arc: "bg-[radial-gradient(circle,#f59e0b_0%,transparent_70%)]",
            bar: "from-[#f59e0b] to-[#fb923c]",
        },
        emerald: {
            wrapper: "border-[rgba(16,185,129,0.2)] shadow-[0_0_40px_rgba(16,185,129,0.12)]",
            bg: "from-[rgba(16,185,129,0.08)] to-[rgba(20,184,166,0.03)]",
            iconWrap: "bg-[rgba(16,185,129,0.1)] text-[#34d399]",
            count: "text-[#6ee7b7]",
            badge: "bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.2)] text-[#34d399]",
            badgeLabel: "DONE",
            arc: "bg-[radial-gradient(circle,#10b981_0%,transparent_70%)]",
            bar: "from-[#10b981] to-[#14b8a6]",
        },
    }[accent];

    const barWidth = count === 0 ? "0%" : `${Math.min((count / 30) * 100, 95)}%`;

    return (
        <div
            className={`relative flex flex-col justify-between rounded-[20px] border p-6 
               overflow-hidden w-full min-h-[220px] flex-1 backdrop-blur-md bg-gradient-to-br
               ${cfg.wrapper} ${cfg.bg}`}
        >
            {/* Decorative arc */}
            <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10 pointer-events-none ${cfg.arc}`} />

            {/* Top row */}
            <div className="relative z-10 flex items-start justify-between">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${cfg.iconWrap}`}>
                    <Icon />
                </div>
                <span className={`text-[11px] font-semibold px-[10px] py-1 rounded-full border tracking-[1.5px] uppercase ${cfg.badge}`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {cfg.badgeLabel}
                </span>
            </div>

            {/* Count */}
            <div className="relative z-10 mt-4">
                <div
                    className={`font-black leading-none ${cfg.count}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(3rem, 6vw, 4rem)" }}
                >
                    {String(animated).padStart(2, "0")}
                </div>
                <p className="mt-2 text-[13px] font-medium text-[#94a3b8] tracking-[0.3px]">
                    {label}
                </p>
            </div>

            {/* Progress bar */}
            <div className="relative z-10 mt-5">
                <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                        className={`h-full rounded-full bg-linear-to-r ${cfg.bar}`}
                        style={{ width: barWidth, transition: "width 1.6s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                </div>
                <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-[#475569]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>0</span>
                    <span className="text-[10px] text-[#475569]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{count} tickets</span>
                </div>
            </div>
        </div>
    );
}

export default function Banner({ inProgress = 0, resolved = 0 }) {
    return (
        <>

            <section
                className="relative w-full overflow-hidden pt-[68px]"
                style={{
                    background: "linear-gradient(135deg, #060d1a 0%, #0c1a2e 40%, #071524 70%, #030810 100%)",
                    fontFamily: "'Outfit', sans-serif",
                }}
            >
                {/* ── Content ── */}
                <div className="relative z-10 max-w-[960px] mx-auto px-6 py-20 flex flex-col items-center text-center">

                    {/* Live badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.08)] mb-6">
                        <div className="live-dot" />
                        <span
                            className="text-[12px] text-[#38bdf8] tracking-[1px]"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            Live Dashboard — March 2026
                        </span>
                    </div>

                    {/* ── Stat Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-[760px]">
                        <StatCard
                            label="Tickets In Progress"
                            count={inProgress}   // ← live count from Main
                            icon={ClockIcon}
                            accent="amber"
                            delay={200}
                        />
                        <StatCard
                            label="Tickets Resolved"
                            count={resolved}     // ← live count from Main
                            icon={CheckCircleIcon}
                            accent="emerald"
                            delay={400}
                        />
                    </div>
                </div>

            </section>
        </>
    );
}