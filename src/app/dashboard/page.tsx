'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Eye, TrendingUp, Calendar, Mail, MapPin, RefreshCw,
  ChevronLeft, ChevronRight, CalendarDays, ToggleLeft, ToggleRight, Linkedin,
} from 'lucide-react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ViewEntry   { date: string; count: number; }
interface ClickTotals { email: number; whatsapp: number; address: number; instagram: number; linkedin: number; }
interface AnalyticsData {
  views: ViewEntry[];
  last7: ViewEntry[];
  totalViews: number;
  avgViews: number;
  totalClicks: ClickTotals;
  from: string;
  to: string;
}

// ─── Instagram SVG icon ───────────────────────────────────────────────────────
function InstagramIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none" />
    </svg>
  );
}

// ─── WhatsApp SVG icon ────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.524 5.849L.057 23.5l5.805-1.521A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.494-5.178-1.362l-.372-.22-3.444.903.921-3.355-.242-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

// ─── Colors ───────────────────────────────────────────────────────────────────
const PIE_COLORS = ['#4f46e5', '#25d366', '#ef4444', '#e1306c', '#0077b5'];

const CLICK_META = [
  { key: 'email',     label: 'Email',     color: '#4f46e5', bg: '#eef2ff' },
  { key: 'whatsapp',  label: 'WhatsApp',  color: '#25d366', bg: '#f0fdf4' },
  { key: 'address',   label: 'Alamat',    color: '#ef4444', bg: '#fef2f2' },
  { key: 'instagram', label: 'Instagram', color: '#e1306c', bg: '#fff0f5' },
  { key: 'linkedin',  label: 'LinkedIn',  color: '#0077b5', bg: '#eff8ff' },
] as const;

// ─── Date helpers ─────────────────────────────────────────────────────────────
function toDateStr(d: Date) { return d.toISOString().slice(0, 10); }
function parseDate(s: string) { return new Date(s + 'T00:00:00'); }
function fmtDisplay(d: Date) {
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function fmtFull(s: string) {
  return new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtChart(date: string) {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

const MONTH_NAMES = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const DAY_NAMES   = ['M','S','S','R','K','J','S'];

// ─── Preset shortcuts ─────────────────────────────────────────────────────────
function getPresetRange(preset: string): { from: Date; to: Date } {
  const today = new Date(); today.setHours(0,0,0,0);
  switch (preset) {
    case 'today':     return { from: today, to: today };
    case 'yesterday': { const y = new Date(today); y.setDate(y.getDate()-1); return { from: y, to: y }; }
    case '7days':     { const f = new Date(today); f.setDate(f.getDate()-6); return { from: f, to: today }; }
    case '30days':    { const f = new Date(today); f.setDate(f.getDate()-29); return { from: f, to: today }; }
    case 'thisMonth': { const f = new Date(today.getFullYear(), today.getMonth(), 1); return { from: f, to: today }; }
    case 'lastMonth': {
      const f = new Date(today.getFullYear(), today.getMonth()-1, 1);
      const t = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from: f, to: t };
    }
    default: return { from: new Date(today.getTime()-29*86400000), to: today };
  }
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({
  year, month, selected, rangeStart, rangeEnd, onSelect, onPrev, onNext,
}: {
  year: number; month: number;
  selected: Date | null; rangeStart: Date | null; rangeEnd: Date | null;
  onSelect: (d: Date) => void; onPrev: () => void; onNext: () => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells: { date: Date; current: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, prevDays - i), current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), current: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: new Date(year, month + 1, cells.length - daysInMonth - firstDay + 1), current: false });
  }

  const isSelected = (d: Date) => selected && toDateStr(d) === toDateStr(selected);
  const inRange = (d: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    const t = d.getTime();
    const s = rangeStart.getTime(), e = rangeEnd.getTime();
    return t > Math.min(s,e) && t < Math.max(s,e);
  };
  const isRangeEnd = (d: Date) => rangeStart && rangeEnd && toDateStr(d) === toDateStr(rangeEnd);

  return (
    <div style={{ width: 240 }}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={onPrev} className="p-1 rounded hover:bg-slate-100"><ChevronLeft size={14} /></button>
        <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{MONTH_NAMES[month]} {year}</span>
        <button onClick={onNext} className="p-1 rounded hover:bg-slate-100"><ChevronRight size={14} /></button>
      </div>
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-xs font-bold" style={{ color: '#94a3b8', padding: '2px 0' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {cells.map(({ date, current }, i) => {
          const sel = isSelected(date);
          const range = inRange(date);
          const rEnd = isRangeEnd(date);
          return (
            <button
              key={i}
              onClick={() => onSelect(date)}
              className="text-xs rounded-full transition-all duration-100"
              style={{
                padding: '5px 0',
                fontWeight: sel || rEnd ? 700 : 400,
                color: sel || rEnd ? 'white' : current ? '#0f172a' : '#cbd5e1',
                background: sel || rEnd ? '#4f46e5' : range ? '#eef2ff' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Date Range Picker ────────────────────────────────────────────────────────
function DateRangePicker({
  from, to, onChange,
}: {
  from: string; to: string;
  onChange: (from: string, to: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tempFrom, setTempFrom] = useState<Date | null>(null);
  const [tempTo, setTempTo]     = useState<Date | null>(null);
  const [picking, setPicking]   = useState<'from' | 'to'>('from');
  const [activePreset, setActivePreset] = useState('');
  const [cal1, setCal1] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() - 1 });
  const [cal2, setCal2] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openPicker = () => {
    setTempFrom(parseDate(from)); setTempTo(parseDate(to));
    setPicking('from'); setActivePreset('');
    setOpen(true);
  };

  const applyPreset = (preset: string) => {
    const { from: f, to: t } = getPresetRange(preset);
    setTempFrom(f); setTempTo(t); setActivePreset(preset);
  };

  const handleCalSelect = (d: Date) => {
    if (picking === 'from') {
      setTempFrom(d); setTempTo(null); setPicking('to'); setActivePreset('kustom');
    } else {
      if (tempFrom && d < tempFrom) { setTempFrom(d); setTempTo(tempFrom); }
      else setTempTo(d);
      setActivePreset('kustom');
    }
  };

  const apply = () => {
    if (tempFrom && tempTo) {
      onChange(toDateStr(tempFrom), toDateStr(tempTo));
    }
    setOpen(false);
  };

  const prevCal1 = () => {
    const m = cal1.month === 0 ? 11 : cal1.month - 1;
    const y = cal1.month === 0 ? cal1.year - 1 : cal1.year;
    setCal1({ year: y, month: m });
    setCal2({ year: m === 11 ? y + 1 : y, month: m === 11 ? 0 : m + 1 });
  };
  const nextCal2 = () => {
    const m = cal2.month === 11 ? 0 : cal2.month + 1;
    const y = cal2.month === 11 ? cal2.year + 1 : cal2.year;
    setCal2({ year: y, month: m });
    setCal1({ year: m === 0 ? y - 1 : y, month: m === 0 ? 11 : m - 1 });
  };

  const presets = [
    { key: 'today',     label: 'Hari ini' },
    { key: 'yesterday', label: 'Kemarin' },
    { key: '7days',     label: '7 hari terakhir' },
    { key: '30days',    label: '30 hari terakhir' },
    { key: 'thisMonth', label: 'Bulan ini' },
    { key: 'lastMonth', label: 'Bulan lalu' },
    { key: 'kustom',    label: 'Kustom' },
  ];

  const rangeStart = tempFrom && !tempTo ? tempFrom : (tempFrom && tempTo ? (tempFrom <= tempTo ? tempFrom : tempTo) : null);
  const rangeEnd   = tempFrom && tempTo  ? (tempFrom <= tempTo ? tempTo : tempFrom) : null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={openPicker}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50"
        style={{ background: 'white', border: '1px solid #e2e8f0', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <CalendarDays size={14} style={{ color: '#4f46e5' }} />
        {fmtDisplay(parseDate(from))} – {fmtDisplay(parseDate(to))}
        <ChevronRight size={12} style={{ color: '#94a3b8', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 z-50 flex"
            style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, boxShadow: '0 16px 48px rgba(0,0,0,0.14)', overflow: 'hidden' }}
          >
            {/* Calendars */}
            <div className="p-4 flex gap-8">
              {/* Tanggal fields */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Dari</p>
                    <div
                      onClick={() => setPicking('from')}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm"
                      style={{ border: `1.5px solid ${picking==='from' ? '#4f46e5' : '#e2e8f0'}`, background: '#f8fafc', minWidth: 130 }}
                    >
                      <CalendarDays size={13} style={{ color: '#4f46e5' }} />
                      <span style={{ color: '#334155' }}>{tempFrom ? fmtDisplay(tempFrom) : '--'}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Sampai</p>
                    <div
                      onClick={() => setPicking('to')}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm"
                      style={{ border: `1.5px solid ${picking==='to' ? '#4f46e5' : '#e2e8f0'}`, background: '#f8fafc', minWidth: 130 }}
                    >
                      <CalendarDays size={13} style={{ color: '#4f46e5' }} />
                      <span style={{ color: '#334155' }}>{tempTo ? fmtDisplay(tempTo) : '--'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-8">
                  <MiniCalendar
                    year={cal1.year} month={cal1.month}
                    selected={picking === 'from' ? tempFrom : tempTo}
                    rangeStart={rangeStart} rangeEnd={rangeEnd}
                    onSelect={handleCalSelect} onPrev={prevCal1}
                    onNext={() => { const m = cal1.month===11?0:cal1.month+1; const y=cal1.month===11?cal1.year+1:cal1.year; setCal1({year:y,month:m}); }}
                  />
                  <MiniCalendar
                    year={cal2.year} month={cal2.month}
                    selected={picking === 'from' ? tempFrom : tempTo}
                    rangeStart={rangeStart} rangeEnd={rangeEnd}
                    onSelect={handleCalSelect}
                    onPrev={() => { const m=cal2.month===0?11:cal2.month-1; const y=cal2.month===0?cal2.year-1:cal2.year; setCal2({year:y,month:m}); }}
                    onNext={nextCal2}
                  />
                </div>
                {/* Apply / Cancel */}
                <div className="flex justify-end gap-2 pt-1 border-t" style={{ borderColor: '#f1f5f9' }}>
                  <button onClick={() => setOpen(false)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium transition hover:bg-slate-100"
                    style={{ color: '#64748b' }}>Batal</button>
                  <button onClick={apply}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 4px 12px rgba(79,70,229,0.25)' }}>
                    Terapkan
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div className="flex flex-col gap-1 pt-6" style={{ minWidth: 140, borderLeft: '1px solid #f1f5f9', paddingLeft: 16 }}>
                {presets.map(p => (
                  <button
                    key={p.key}
                    onClick={() => applyPreset(p.key)}
                    className="text-left px-3 py-2 rounded-lg text-sm transition-all"
                    style={{
                      background: activePreset === p.key ? '#4f46e5' : 'transparent',
                      color: activePreset === p.key ? 'white' : '#334155',
                      fontWeight: activePreset === p.key ? 600 : 400,
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '8px 12px', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <p style={{ color: '#94a3b8', marginBottom: 2 }}>{label}</p>
        <p style={{ color: '#4f46e5', fontWeight: 700 }}>{payload[0].value} view</p>
      </div>
    );
  }
  return null;
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const today      = toDateStr(new Date());
  const thirtyAgo  = toDateStr(new Date(Date.now() - 29 * 86400000));

  const [data, setData]           = useState<AnalyticsData | null>(null);
  const [from, setFrom]           = useState(thirtyAgo);
  const [to, setTo]               = useState(today);
  const [loading, setLoading]     = useState(true);
  const [openToWork, setOpenToWork] = useState<boolean | null>(null);
  const [savingOtw, setSavingOtw] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/analytics?from=${from}&to=${to}`);
      const json = await res.json();
      setData(json);
    } catch { /* ignore */ }
    setLoading(false);
  }, [from, to]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Fetch open to work setting
  useEffect(() => {
    fetch('/api/settings?key=open_to_opportunities')
      .then(r => r.json())
      .then(d => setOpenToWork(d.value === 'true'))
      .catch(() => setOpenToWork(true));
  }, []);

  const toggleOpenToWork = async () => {
    if (openToWork === null) return;
    setSavingOtw(true);
    const newVal = !openToWork;
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'open_to_opportunities', value: String(newVal) }),
      });
      setOpenToWork(newVal);
    } catch { /* ignore */ }
    setSavingOtw(false);
  };

  const handleDateChange = (newFrom: string, newTo: string) => {
    setFrom(newFrom); setTo(newTo);
  };

  const pieData = data
    ? CLICK_META.map(m => ({ name: m.label, value: data.totalClicks[m.key as keyof ClickTotals] ?? 0, color: m.color }))
        .filter(d => d.value > 0)
    : [];
  const totalClicks = pieData.reduce((s, d) => s + d.value, 0);

  const days = Math.max(1, Math.ceil((parseDate(to).getTime() - parseDate(from).getTime()) / 86400000) + 1);

  return (
    <main className="min-h-screen" style={{ background: '#f8fafc', color: '#0f172a' }}>

      {/* Header */}
      <div className="sticky top-0 z-20" style={{ background: 'white', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
              className="hover:text-indigo-600 transition-colors">← Kembali</Link>
            <span style={{ color: '#cbd5e1' }}>·</span>
            <span style={{ color: '#4f46e5', fontWeight: 700, fontSize: 14 }}>Dashboard Analytics</span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
              background: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '#dcfce7' : '#fef9c3',
              color: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '#15803d' : '#92400e',
            }}>
              {process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '● LIVE' : '● DEV'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchData}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-slate-100"
              style={{ color: '#64748b', background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* Title row */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#0f172a' }}>Statistik Website</h1>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
              {fmtFull(from)} – {fmtFull(to)} · {days} hari
            </p>
          </div>
          <DateRangePicker from={from} to={to} onChange={handleDateChange} />
        </div>

        {/* Open to Opportunities toggle card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 flex items-center justify-between"
          style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div>
            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Open to Opportunities</p>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
              Badge status pada halaman utama website kamu
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{
              background: openToWork ? '#dcfce7' : '#f1f5f9',
              color: openToWork ? '#15803d' : '#64748b',
            }}>
              {openToWork === null ? '...' : openToWork ? 'Aktif' : 'Tidak Aktif'}
            </span>
            <button
              onClick={toggleOpenToWork}
              disabled={savingOtw || openToWork === null}
              className="transition-all duration-200"
              style={{ opacity: savingOtw ? 0.6 : 1, cursor: savingOtw ? 'wait' : 'pointer' }}
            >
              {openToWork
                ? <ToggleRight size={36} style={{ color: '#4f46e5' }} />
                : <ToggleLeft  size={36} style={{ color: '#cbd5e1' }} />
              }
            </button>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Eye,        label: 'Total Views',      value: data?.totalViews ?? 0, color: '#4f46e5', bg: '#eef2ff' },
            { icon: TrendingUp, label: 'Rata-rata / Hari', value: data?.avgViews ?? 0,   color: '#7c3aed', bg: '#f5f3ff' },
            { icon: Calendar,   label: 'Periode (Hari)',   value: days,                  color: '#0891b2', bg: '#ecfeff' },
            { icon: Mail,       label: 'Total Klik Kontak',value: totalClicks,           color: '#059669', bg: '#ecfdf5' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#94a3b8' }}>{label}</p>
                <p className="text-2xl font-bold mt-0.5" style={{ color }}>{value.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bar chart main */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-6"
          style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h2 className="text-sm font-bold mb-1" style={{ color: '#0f172a' }}>Views per Hari</h2>
          <p className="text-xs mb-6" style={{ color: '#94a3b8' }}>Total kunjungan dalam periode yang dipilih</p>
          {data && data.views.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.views} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <XAxis dataKey="date" tickFormatter={fmtChart} tick={{ fontSize: 10, fill: '#94a3b8' }}
                  axisLine={false} tickLine={false} interval={Math.max(0, Math.floor(data.views.length / 8))} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79,70,229,0.05)' }} />
                <Bar dataKey="count" fill="#4f46e5" radius={[4,4,0,0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-sm" style={{ color: '#cbd5e1' }}>{loading ? 'Memuat data...' : 'Belum ada data'}</p>
            </div>
          )}
        </motion.div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* 7 hari */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 className="text-sm font-bold mb-1" style={{ color: '#0f172a' }}>Views 7 Hari Terakhir</h2>
            <p className="text-xs mb-5" style={{ color: '#94a3b8' }}>Tren kunjungan mingguan</p>
            {data ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={data.last7} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <XAxis dataKey="date" tickFormatter={fmtChart} tick={{ fontSize: 10, fill: '#94a3b8' }}
                    axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,58,237,0.05)' }} />
                  <Bar dataKey="count" fill="#7c3aed" radius={[4,4,0,0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-sm" style={{ color: '#cbd5e1' }}>Memuat...</p>
              </div>
            )}
          </motion.div>

          {/* Klik kontak */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl p-6"
            style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 className="text-sm font-bold mb-1" style={{ color: '#0f172a' }}>Klik Kontak &amp; Sosial</h2>
            <p className="text-xs mb-4" style={{ color: '#94a3b8' }}>
              Distribusi klik Email, WhatsApp, Alamat, Instagram &amp; LinkedIn
            </p>
            {pieData.length > 0 ? (
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={36} outerRadius={68}
                      dataKey="value" paddingAngle={2}>
                      {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v} klik`]}
                      contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 11, color: '#0f172a' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2.5 flex-1">
                  {pieData.map((d) => (
                    <div key={d.name}>
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                          <span className="text-xs font-medium" style={{ color: '#334155' }}>{d.name}</span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: '#f1f5f9' }}>
                        <div className="h-1.5 rounded-full transition-all"
                          style={{ width: `${totalClicks > 0 ? Math.round(d.value / totalClicks * 100) : 0}%`, background: d.color }} />
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                        {totalClicks > 0 ? Math.round(d.value / totalClicks * 100) : 0}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center gap-4">
                <div className="flex gap-2 flex-wrap justify-center">
                  {CLICK_META.map(m => (
                    <div key={m.key} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                      {m.key === 'email'     && <Mail size={14} style={{ color: m.color }} />}
                      {m.key === 'whatsapp'  && <WhatsAppIcon size={14} color={m.color} />}
                      {m.key === 'address'   && <MapPin size={14} style={{ color: m.color }} />}
                      {m.key === 'instagram' && <InstagramIcon size={14} color={m.color} />}
                      {m.key === 'linkedin'  && <Linkedin size={14} style={{ color: m.color }} />}
                    </div>
                  ))}
                </div>
                <p className="text-sm" style={{ color: '#cbd5e1' }}>{loading ? 'Memuat...' : 'Belum ada data klik kontak'}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
