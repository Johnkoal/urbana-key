
import React, { useState } from 'react';
import { AccessType, VisitPass } from '../types';

const RECENT_PASSES: VisitPass[] = [
  { id: '1', visitorName: 'Ana Gómez', type: 'peatonal', status: 'Entró', time: '10:30 AM' },
  { id: '2', visitorName: 'Uber Eats', type: 'vehicular', status: 'Pendiente', time: 'Hace 15 min', plate: 'ABC-992' },
  { id: '3', visitorName: 'Carlos Ruiz', type: 'peatonal', status: 'Expirado', time: 'Ayer' },
  { id: '4', visitorName: 'Delivery Pizza', type: 'vehicular', status: 'Entró', time: 'Ayer, 8:00 PM', plate: 'XYZ-123' },
  { id: '5', visitorName: 'Familia Perez', type: 'peatonal', status: 'Expirado', time: '20 Oct' },
  { id: '6', visitorName: 'Internet Tech', type: 'peatonal', status: 'Entró', time: '19 Oct' },
];

const Accesses: React.FC = () => {
  const [accessType, setAccessType] = useState<AccessType>('peatonal');
  const [showHistory, setShowHistory] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Entró' | 'Pendiente' | 'Expirado'>('Todos');

  const filteredHistory = statusFilter === 'Todos' 
    ? RECENT_PASSES 
    : RECENT_PASSES.filter(p => p.status === statusFilter);

  const renderMain = () => (
    <div className="px-5 pt-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Nuevo Pase de Visita</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Nombre del Visitante</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
              <input 
                type="text" 
                placeholder="Ej. Juan Pérez"
                className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 focus:ring-primary focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Tipo de Acceso</label>
            <div className="flex p-1 bg-gray-100 rounded-xl">
              <button 
                onClick={() => setAccessType('peatonal')}
                className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${
                  accessType === 'peatonal' ? 'bg-primary text-white shadow-md' : 'text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined">directions_walk</span>
                Peatonal
              </button>
              <button 
                onClick={() => setAccessType('vehicular')}
                className={`flex-1 h-12 flex items-center justify-center gap-2 rounded-lg font-bold transition-all ${
                  accessType === 'vehicular' ? 'bg-primary text-white shadow-md' : 'text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined">directions_car</span>
                Vehicular
              </button>
            </div>
          </div>

          <button className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined">qr_code_2</span>
            Generar Pase
          </button>
        </div>
      </section>

      <section>
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-primary"></div>
          <div className="bg-gray-50 p-4 rounded-2xl mb-4">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=habitat-digital-pass" alt="QR" className="w-32 h-32 opacity-80" />
          </div>
          <h3 className="font-bold text-lg">Pase Generado</h3>
          <p className="text-slate-400 text-sm mt-1 mb-6">Válido por 24 horas • Entrada Principal</p>
          <button className="w-full py-3 bg-primary/10 text-primary rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined">ios_share</span>
            Compartir Pase
          </button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Historial Reciente</h3>
          <button onClick={() => setShowHistory(true)} className="text-primary text-sm font-bold">Ver todo</button>
        </div>
        <div className="space-y-3">
          {RECENT_PASSES.slice(0, 3).map((pass) => (
            <div key={pass.id} className="flex items-center p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                pass.status === 'Entró' ? 'bg-green-50 text-green-600' : 
                pass.status === 'Pendiente' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'
              }`}>
                <span className="material-symbols-outlined">
                  {pass.type === 'peatonal' ? 'person' : 'directions_car'}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{pass.visitorName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-[14px] text-slate-400">
                    {pass.type === 'peatonal' ? 'directions_walk' : 'pin_drop'}
                  </span>
                  <span className="text-xs text-slate-400">{pass.type === 'peatonal' ? 'Peatonal' : (pass.plate || 'Vehicular')}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${
                  pass.status === 'Entró' ? 'bg-green-100 text-green-700' :
                  pass.status === 'Pendiente' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {pass.status}
                </span>
                <p className="text-[10px] text-slate-400 font-medium">{pass.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderHistory = () => (
    <div className="px-5 pt-6 space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => setShowHistory(false)} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Historial Completo</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {(['Todos', 'Entró', 'Pendiente', 'Expirado'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === status 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-slate-400 border border-gray-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-3 pb-8">
        {filteredHistory.map((pass) => (
          <div key={pass.id} className="flex items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              pass.status === 'Entró' ? 'bg-green-50 text-green-600' : 
              pass.status === 'Pendiente' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'
            }`}>
              <span className="material-symbols-outlined text-xl">
                {pass.type === 'peatonal' ? 'person' : 'directions_car'}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-sm">{pass.visitorName}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{pass.type === 'peatonal' ? 'Peatonal' : (pass.plate || 'Vehicular')}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold mb-1 ${
                pass.status === 'Entró' ? 'bg-green-100 text-green-700' :
                pass.status === 'Pendiente' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {pass.status}
              </span>
              <p className="text-[9px] text-slate-400 font-medium">{pass.time}</p>
            </div>
          </div>
        ))}
        {filteredHistory.length === 0 && (
          <div className="text-center py-12 text-slate-400 italic">No se encontraron registros.</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto no-scrollbar">
      <header className="px-4 pt-12 pb-4 flex items-center justify-center sticky top-0 bg-white z-20 border-b border-gray-50">
        <h1 className="text-lg font-bold">{showHistory ? 'Historial de Accesos' : 'Accesos'}</h1>
      </header>

      {!showHistory ? renderMain() : renderHistory()}
    </div>
  );
};

export default Accesses;
