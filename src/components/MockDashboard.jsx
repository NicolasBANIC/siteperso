"use client";

import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export default function MockDashboard({ className = "" }) {
  const [stats, setStats] = useState({
    revenue: 45231,
    users: 2345,
    growth: 12.5,
    active: 892
  });

  const [chartData, setChartData] = useState([40, 45, 38, 52, 48, 55, 60]);

  useEffect(() => {
    // Ralenti de 2s à 4s pour réduire les re-renders
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 100),
        users: prev.users + Math.floor(Math.random() * 5),
        growth: +(prev.growth + (Math.random() - 0.5) * 0.5).toFixed(1),
        active: prev.active + Math.floor(Math.random() * 10 - 5)
      }));

      setChartData(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 30) + 40];
        return newData;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-white/60">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`rounded-lg bg-${color}-500/20 p-2`}>
          <Icon className={`h-5 w-5 text-${color}-400`} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Dashboard Analytics</h3>
          <p className="text-sm text-white/60">Temps réel • Mise à jour automatique</p>
        </div>
        <div className="flex gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span className="text-xs text-white/60">Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="Revenu"
          value={`$${stats.revenue.toLocaleString()}`}
          trend={stats.growth}
          color="green"
        />
        <StatCard
          icon={Users}
          label="Utilisateurs"
          value={stats.users.toLocaleString()}
          trend={5.2}
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          label="Croissance"
          value={`${stats.growth}%`}
          trend={stats.growth}
          color="purple"
        />
        <StatCard
          icon={Activity}
          label="Actifs"
          value={stats.active}
          trend={-2.1}
          color="orange"
        />
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-medium text-white">Activité des 7 derniers jours</h4>
          <div className="flex gap-2">
            <button className="rounded-md bg-white/10 px-3 py-1 text-xs text-white transition-colors hover:bg-white/20">
              Jour
            </button>
            <button className="rounded-md bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
              Semaine
            </button>
            <button className="rounded-md bg-white/10 px-3 py-1 text-xs text-white transition-colors hover:bg-white/20">
              Mois
            </button>
          </div>
        </div>

        {/* Simple bar chart */}
        <div className="flex h-32 items-end justify-between gap-2">
          {chartData.map((value, index) => (
            <div
              key={index}
              className="group relative flex-1 transition-all duration-500"
            >
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-purple-500 transition-all duration-500 group-hover:from-blue-400 group-hover:to-purple-400"
                style={{ height: `${value}%` }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {value}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between text-xs text-white/40">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mer</span>
          <span>Jeu</span>
          <span>Ven</span>
          <span>Sam</span>
          <span>Dim</span>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500 opacity-20 blur-3xl" />
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500 opacity-20 blur-3xl" />
    </div>
  );
}