import { useState, useEffect } from "react";

// ── Config ────────────────────────────────────────────────────────────────────

const priorityConfig = {
    critical: { label: "CRITICAL PRIORITY", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    high: { label: "HIGH PRIORITY", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    medium: { label: "MEDIUM PRIORITY", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
    low: { label: "LOW PRIORITY", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
};

const statusConfig = {
    "in-progress": { label: "In Progress", dot: "bg-amber-400", badge: "bg-amber-400/10  text-amber-400  border-amber-400/25" },
    "open": { label: "Open", dot: "bg-emerald-400", badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25" },
    "resolved": { label: "Resolved", dot: "bg-sky-400", badge: "bg-sky-400/10    text-sky-400    border-sky-400/25" },
};

const avatarColors = [
    "bg-sky-500", "bg-violet-500", "bg-amber-500", "bg-emerald-500",
    "bg-rose-500", "bg-pink-500", "bg-cyan-500", "bg-lime-500",
];
const getAvatarColor = (str) => avatarColors[str.charCodeAt(0) % avatarColors.length];
const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });


// ── ToastContainer ────────────────────────────────────────────────────────────

function ToastContainer({ toasts }) {
    return (
        <div className="fixed top-5 right-5 z-[999] flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-2xl backdrop-blur-md min-w-[280px]
                        ${t.type === "resolve" ? "bg-emerald-500/95" : t.type === "warn" ? "bg-amber-500/95" : "bg-sky-500/95"}`}
                    style={{ animation: "slideIn 0.3s cubic-bezier(0.16,1,0.3,1)", fontFamily: "'Outfit',sans-serif" }}
                >
                    <span className="text-lg">
                        {t.type === "resolve" ? "✅" : t.type === "warn" ? "⚠️" : "🎫"}
                    </span>
                    {t.message}
                </div>
            ))}
        </div>
    );
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const cfg = statusConfig[status] || statusConfig["open"];
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${cfg.badge}`}
            style={{ fontFamily: "'Outfit',sans-serif" }}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dot}`}
                style={{ boxShadow: "0 0 5px currentColor" }}
            />
            {cfg.label}
        </span>
    );
}

// ── TicketCard ────────────────────────────────────────────────────────────────

function TicketCard({ ticket, isActive, onClick }) {
    const p = priorityConfig[ticket.priority] || priorityConfig["medium"];
    const avatarBg = getAvatarColor(ticket.customer?.avatar || "A");

    return (
        <div
            onClick={onClick}
            className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-200 overflow-hidden border-2
                ${isActive
                    ? "bg-sky-500/5 border-sky-400/40 shadow-[0_0_0_3px_rgba(14,165,233,0.08),0_4px_20px_rgba(14,165,233,0.08)]"
                    : "bg-[#0c1a2e] border-[rgba(14,165,233,0.1)] hover:border-[rgba(14,165,233,0.25)] hover:shadow-[0_4px_20px_rgba(14,165,233,0.06)] hover:-translate-y-0.5"
                }`}
            style={{ fontFamily: "'Outfit',sans-serif" }}
        >
            {/* Active left accent bar */}
            {isActive && (
                <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-sky-400 to-sky-500 rounded-l-2xl" />
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-[15px] font-bold text-[#f0f9ff] leading-snug flex-1">
                    {ticket.title}
                </h3>
                <StatusBadge status={ticket.status} />
            </div>

            {/* Description */}
            <p className="text-[13px] text-[#64748b] leading-relaxed mb-4 line-clamp-2">
                {ticket.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                {/* Left: id + priority */}
                <div className="flex items-center gap-2">
                    <span
                        className="text-xs font-bold text-[#475569]"
                        style={{ fontFamily: "'JetBrains Mono',monospace" }}
                    >
                        {ticket.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wide uppercase ${p.color} ${p.bg} ${p.border}`}>
                        {p.label}
                    </span>
                </div>

                {/* Right: avatar + date */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-6 h-6 rounded-full ${avatarBg} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                            {ticket.customer?.avatar || "?"}
                        </div>
                        <span className="text-xs text-[#64748b] font-medium">
                            {ticket.customer?.name || "Unknown"}
                        </span>
                    </div>
                    <span className="text-[11px] text-[#475569] flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        {formatDate(ticket.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}

//Task Panel Section

function TaskPanel({ tasks, resolvedTasks, onComplete, onDeleteResolved }) {
    return (
        <div
            className="bg-[#0c1a2e] rounded-2xl border-2 border-[rgba(14,165,233,0.12)] p-6 sticky top-6"
            style={{ fontFamily: "'Outfit',sans-serif" }}
        >
            {/* ── Task Status ── */}
            <h2 className="text-xl font-extrabold text-[#f0f9ff] mb-1 tracking-tight">
                Task Status
            </h2>

            {tasks.length === 0 ? (
                <p className="text-sm text-[#475569] italic mb-6">
                    Select a ticket to add to Task Status
                </p>
            ) : (
                <div className="flex flex-col gap-3 mb-6 mt-3">
                    {tasks.map((t) => (
                        <div
                            key={t.id}
                            className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <span
                                    className="w-2 h-2 rounded-full bg-amber-400 inline-block"
                                    style={{ boxShadow: "0 0 6px #fbbf24" }}
                                />
                                <span
                                    className="text-[11px] font-bold text-[#475569]"
                                    style={{ fontFamily: "'JetBrains Mono',monospace" }}
                                >
                                    {t.id}
                                </span>
                            </div>
                            <p className="text-[13px] font-semibold text-[#e2e8f0] mb-3 leading-snug">
                                {t.title}
                            </p>
                            <button
                                onClick={() => onComplete(t)}
                                className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-[13px] font-bold transition-all duration-200 shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
                                style={{ fontFamily: "'Outfit',sans-serif" }}
                            >
                                ✓ Mark Complete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Divider */}
            <div className="h-px bg-[rgba(14,165,233,0.1)] mb-5" />

            {/* ── Resolved Tasks ── */}
            <h2 className="text-xl font-extrabold text-[#f0f9ff] mb-1 tracking-tight">
                Resolved Task
            </h2>

            {resolvedTasks.length === 0 ? (
                <p className="text-sm text-[#475569] italic">
                    No resolved tasks yet.
                </p>
            ) : (
                <div className="flex flex-col gap-3 mt-3">
                    {resolvedTasks.map((t) => (
                        <div
                            key={t.id}
                            className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-4"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                                <span
                                    className="text-[11px] font-bold text-[#475569]"
                                    style={{ fontFamily: "'JetBrains Mono',monospace" }}
                                >
                                    {t.id}
                                </span>
                            </div>
                            <p className="text-[13px] font-semibold text-[#475569] line-through leading-snug">
                                {t.title}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-[11px] font-semibold text-emerald-400">
                                    ✓ Resolved
                                </span>
                                <button
                                    onClick={() => onDeleteResolved(t)}
                                    className="text-[11px] font-semibold text-red-400/70 hover:text-red-400 transition-colors duration-150"
                                >
                                    ✕ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Main App Function Section
export default function Main({ onStatsChange }) {
    const [tickets, setTickets] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [resolvedTasks, setResolvedTasks] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [toasts, setToasts] = useState([]);

    // ── Load tickets from public/ticket.json ──
    useEffect(() => {
        fetch("/ticket.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => setTickets(data))
            .catch((err) => {
                console.error("Fetch failed:", err);
                setTickets([]); // safe empty fallback
            });
    }, []);

    // ── Notify parent of live stats ──
    useEffect(() => {
        if (onStatsChange) {
            onStatsChange({
                inProgress: activeTasks.length,
                resolved: resolvedTasks.length,
            });
        }
    }, [activeTasks, resolvedTasks, onStatsChange]);

    // ── Toast helper ──
    const addToast = (message, type = "info") => {
        const toastedNumberId = Date.now();
        setToasts((prev) => [...prev, { id: toastedNumberId, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== toastedNumberId));
        }, 3500);
    };

    // ── Card click ──
    const handleCardClick = (ticket) => {
        if (selectedId === ticket.id) { setSelectedId(null); return; }
        setSelectedId(ticket.id);
        const alreadyResolved = resolvedTasks.find((t) => t.id === ticket.id);
        const alreadyActive = activeTasks.find((t) => t.id === ticket.id);
        if (alreadyResolved) {
            addToast(`"${ticket.title}" is already resolved.`, "warn");
        } else if (alreadyActive) {
            addToast(`"${ticket.title}" is already in Task Status.`, "warn");
        } else {
            setActiveTasks((prev) => [...prev, ticket]);
            addToast(`"${ticket.title}" added to Task Status!`, "info");
        }
    };

    // ── Mark complete ──
    const handleComplete = (task) => {
        setActiveTasks((prev) => prev.filter((t) => t.id !== task.id));
        setResolvedTasks((prev) => [...prev, task]);
        setSelectedId(null);
        addToast(`"${task.title}" has been resolved! 🎉`, "resolve");
    };

    const handleDeleteResolved = (task) => {
        setResolvedTasks((prev) => prev.filter((t) => t.id !== task.id));
        addToast(`"${task.title}" removed from resolved.`, "warn");
    };

    return (
        <>
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(30px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            <ToastContainer toasts={toasts} />

            <section
                className="min-h-screen bg-[#060d1a]"
                style={{ fontFamily: "'Outfit',sans-serif" }}
            >
                {/* Subtle background grid */}
                <div
                    className="fixed inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-10">

                    {/* Section header */}
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-2xl font-extrabold text-[#f0f9ff] tracking-tight">
                            Customer Tickets
                        </h2>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {tickets.length} total
                        </span>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">

                        {/* ── Left: Ticket Cards ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tickets.map((ticket) => (
                                <TicketCard
                                    key={ticket.id}
                                    ticket={ticket}
                                    isActive={selectedId === ticket.id}
                                    onClick={() => handleCardClick(ticket)}
                                />
                            ))}
                        </div>

                        {/* ── Right: Task Panel ── */}
                        <TaskPanel
                            tasks={activeTasks}
                            resolvedTasks={resolvedTasks}
                            onComplete={handleComplete}
                            onDeleteResolved={handleDeleteResolved}

                        />
                    </div>
                </div>
            </section>
        </>
    );
}