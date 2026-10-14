'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  RefreshCw, Search, Download, ChevronLeft, ChevronRight,
  Users, Building2, Phone, Mail, X, Calendar,
} from 'lucide-react';

interface CVRequestEntry {
  id: number; nama: string; company: string; email: string;
  whatsapp: string | null; env: string; created_at: string;
}

const PAGE_SIZE_OPTIONS = [5, 10, 50, 100];

function fmtDT(s: string) {
  return new Date(s).toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function downloadCSV(data: CVRequestEntry[], env: string) {
  const headers = ['No', 'Nama', 'Company', 'Email', 'WhatsApp', 'Env', 'Tanggal & Waktu'];
  const rows = data.map((r, i) => [
    i + 1,
    r.nama,
    r.company,
    r.email,
    r.whatsapp ?? '-',
    r.env,
    fmtDT(r.created_at),
  ]);
  const csv = [headers, ...rows].map(row =>
    row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
  ).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recruiter_data_${env}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function RecruiterPage() {
  const [env, setEnv]           = useState<'development' | 'production'>('production');
  const [search, setSearch]     = useState('');
  const [draftSearch, setDraftSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate]     = useState('');
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData]         = useState<CVRequestEntry[]>([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [isLive, setIsLive]     = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const h = window.location.hostname;
    const live = h !== 'localhost' && h !== '127.0.0.1' && !h.startsWith('192.168');
    setIsLive(live);
    setEnv(live ? 'production' : 'development');
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        env, search, page: String(page), pageSize: String(pageSize),
        ...(fromDate ? { from: fromDate } : {}),
        ...(toDate   ? { to: toDate }     : {}),
      });
      const res  = await fetch(`/api/cv-request?${params}`);
      const json = await res.json();
      setData(json.data ?? []);
      setTotal(json.total ?? 0);
    } catch { /* ignore */ }
    setLoading(false);
  }, [env, search, fromDate, toDate, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [env, search, fromDate, toDate, pageSize]);

  const handleSearchInput = (v: string) => {
    setDraftSearch(v);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearch(v), 400);
  };

  const clearFilters = () => {
    setDraftSearch(''); setSearch('');
    setFromDate(''); setToDate('');
  };

  const hasFilters = draftSearch || fromDate || toDate;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <main className="min-h-screen" style={{ background: '#f8fafc', color: '#0f172a' }}>

      {/* ── Header ── */}
      <div className="sticky top-0 z-20" style={{ background: 'white', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
              className="hover:text-indigo-600 transition-colors">← Dashboard</Link>
            <span style={{ color: '#cbd5e1' }}>·</span>
            <span style={{ color: '#4f46e5', fontWeight: 700, fontSize: 14 }}>Data Recruiter</span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
              background: isLive ? '#dcfce7' : '#fef9c3',
              color: isLive ? '#15803d' : '#92400e',
            }}>
              {isLive ? '● LIVE' : '● DEV'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => downloadCSV(data, env)}
              disabled={data.length === 0}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{
                color: data.length === 0 ? '#cbd5e1' : '#4f46e5',
                background: data.length === 0 ? '#f8fafc' : '#eef2ff',
                border: '1px solid #e2e8f0',
                cursor: data.length === 0 ? 'not-allowed' : 'pointer',
              }}>
              <Download size={12} />
              Export CSV
            </button>
            <button onClick={fetchData}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-slate-100"
              style={{ color: '#64748b', background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-4">

        {/* ── Title + Stats ── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#0f172a' }}>Data Recruiter</h1>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
              {loading ? 'Memuat...' : `${total} recruiter meminta CV`}
              {(fromDate || toDate) && ` · ${fromDate || '...'} s/d ${toDate || '...'}`}
            </p>
          </div>
          {/* DEV / LIVE */}
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
            {(['development', 'production'] as const).map(e => (
              <button key={e} onClick={() => setEnv(e)}
                className="text-xs px-3 py-1.5 font-semibold transition-all"
                style={{ background: env === e ? '#4f46e5' : 'white', color: env === e ? 'white' : '#64748b' }}>
                {e === 'development' ? 'DEV' : 'LIVE'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Filters ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex flex-wrap gap-3 items-end">

            {/* Search */}
            <div className="flex-1" style={{ minWidth: 200 }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Cari</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                <Search size={13} style={{ color: '#94a3b8', flexShrink: 0 }} />
                <input
                  value={draftSearch}
                  onChange={e => handleSearchInput(e.target.value)}
                  placeholder="Nama, company, email, atau WA..."
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#0f172a', width: '100%' }}
                />
                {draftSearch && (
                  <button onClick={() => handleSearchInput('')} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* From date */}
            <div>
              <p className="text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Dari Tanggal</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                <Calendar size={13} style={{ color: '#94a3b8' }} />
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#0f172a' }} />
              </div>
            </div>

            {/* To date */}
            <div>
              <p className="text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Sampai Tanggal</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                <Calendar size={13} style={{ color: '#94a3b8' }} />
                <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#0f172a' }} />
              </div>
            </div>

            {hasFilters && (
              <button onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl transition-all hover:bg-red-50"
                style={{ color: '#ef4444', border: '1.5px solid #fecaca', background: '#fff5f5', alignSelf: 'flex-end' }}>
                <X size={12} /> Reset Filter
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Table card ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl"
          style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

          {/* Table header row */}
          <div className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
            <div className="flex items-center gap-2">
              <Users size={14} style={{ color: '#059669' }} />
              <span className="text-xs font-bold" style={{ color: '#0f172a' }}>
                {loading ? 'Memuat...' : `${total} data · halaman ${page} dari ${totalPages}`}
              </span>
            </div>
            {/* Page size selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: '#94a3b8' }}>Tampilkan</span>
              <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}
                style={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 8, padding: '3px 8px', color: '#334155', background: 'white', cursor: 'pointer' }}>
                {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <span className="text-xs" style={{ color: '#94a3b8' }}>per halaman</span>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={20} className="animate-spin" style={{ color: '#cbd5e1' }} />
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#f1f5f9' }}>
                <Users size={20} style={{ color: '#cbd5e1' }} />
              </div>
              <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
                {hasFilters ? 'Tidak ada hasil untuk filter ini' : `Belum ada recruiter (${env === 'production' ? 'LIVE' : 'DEV'})`}
              </p>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs font-semibold" style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Reset Filter
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {[
                        { label: 'No', w: 50 }, { label: 'Nama', w: undefined },
                        { label: 'Company', w: undefined }, { label: 'Email', w: undefined },
                        { label: 'WhatsApp', w: 150 }, { label: 'Tanggal & Waktu', w: 160 },
                      ].map(h => (
                        <th key={h.label} style={{
                          padding: '10px 16px', textAlign: 'left', width: h.w,
                          fontSize: 11, fontWeight: 700, color: '#94a3b8',
                          letterSpacing: '0.05em', textTransform: 'uppercase',
                          borderBottom: '1px solid #f1f5f9',
                        }}>{h.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((r, i) => {
                      const rowNum = (page - 1) * pageSize + i + 1;
                      return (
                        <tr key={r.id} style={{ borderBottom: i < data.length - 1 ? '1px solid #f8fafc' : 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#fafbff')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ padding: '11px 16px' }}>
                            <span className="text-xs font-mono" style={{ color: '#94a3b8' }}>{rowNum}</span>
                          </td>
                          <td style={{ padding: '11px 16px' }}>
                            <div className="flex items-center gap-2">
                              <div style={{
                                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 11, fontWeight: 700, color: '#4f46e5',
                              }}>{r.nama.charAt(0).toUpperCase()}</div>
                              <span className="text-sm font-semibold" style={{ color: '#0f172a' }}>{r.nama}</span>
                            </div>
                          </td>
                          <td style={{ padding: '11px 16px' }}>
                            <div className="flex items-center gap-1.5">
                              <Building2 size={12} style={{ color: '#94a3b8' }} />
                              <span className="text-sm" style={{ color: '#334155' }}>{r.company}</span>
                            </div>
                          </td>
                          <td style={{ padding: '11px 16px' }}>
                            <a href={`mailto:${r.email}`} className="text-sm font-medium"
                              style={{ color: '#4f46e5', textDecoration: 'none' }}>{r.email}</a>
                          </td>
                          <td style={{ padding: '11px 16px' }}>
                            {r.whatsapp ? (
                              <a href={`https://wa.me/${r.whatsapp.replace(/\D/g, '')}`}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm font-medium"
                                style={{ color: '#25d366', textDecoration: 'none' }}>
                                <Phone size={11} style={{ flexShrink: 0 }} />
                                {r.whatsapp}
                              </a>
                            ) : <span style={{ color: '#cbd5e1', fontSize: 12 }}>—</span>}
                          </td>
                          <td style={{ padding: '11px 16px' }}>
                            <span className="text-xs" style={{ color: '#64748b' }}>{fmtDT(r.created_at)}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y" style={{ borderColor: '#f1f5f9' }}>
                {data.map((r, i) => {
                  const rowNum = (page - 1) * pageSize + i + 1;
                  return (
                    <div key={r.id} className="p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono" style={{ color: '#94a3b8', minWidth: 20 }}>{rowNum}.</span>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                          background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 700, color: '#4f46e5',
                        }}>{r.nama.charAt(0).toUpperCase()}</div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{r.nama}</p>
                          <p className="text-xs" style={{ color: '#64748b' }}>{r.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 pl-10">
                        <Mail size={11} style={{ color: '#94a3b8' }} />
                        <a href={`mailto:${r.email}`} className="text-xs font-medium" style={{ color: '#4f46e5', textDecoration: 'none' }}>{r.email}</a>
                      </div>
                      {r.whatsapp && (
                        <div className="flex items-center gap-1.5 pl-10">
                          <Phone size={11} style={{ color: '#94a3b8' }} />
                          <a href={`https://wa.me/${r.whatsapp.replace(/\D/g, '')}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-xs font-medium" style={{ color: '#25d366', textDecoration: 'none' }}>{r.whatsapp}</a>
                        </div>
                      )}
                      <p className="text-xs pl-10" style={{ color: '#94a3b8' }}>{fmtDT(r.created_at)}</p>
                    </div>
                  );
                })}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-3 flex-wrap gap-3"
                  style={{ borderTop: '1px solid #f1f5f9' }}>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} dari {total} data
                  </p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                      style={{ border: '1px solid #e2e8f0', background: page === 1 ? '#f8fafc' : 'white', color: page === 1 ? '#cbd5e1' : '#334155', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
                      <ChevronLeft size={14} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                      .reduce<(number | '...')[]>((acc, n, idx, arr) => {
                        if (idx > 0 && typeof arr[idx - 1] === 'number' && (n as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                        acc.push(n); return acc;
                      }, [])
                      .map((n, i) => n === '...' ? (
                        <span key={`dot-${i}`} style={{ padding: '0 4px', color: '#94a3b8', fontSize: 12 }}>...</span>
                      ) : (
                        <button key={n} onClick={() => setPage(n as number)}
                          className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold transition-all"
                          style={{
                            border: '1px solid #e2e8f0',
                            background: page === n ? '#4f46e5' : 'white',
                            color: page === n ? 'white' : '#334155',
                            cursor: 'pointer',
                          }}>{n}</button>
                      ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                      style={{ border: '1px solid #e2e8f0', background: page === totalPages ? '#f8fafc' : 'white', color: page === totalPages ? '#cbd5e1' : '#334155', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}