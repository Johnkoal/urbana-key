
import React, { useState } from 'react';

const DOCUMENTS = [
  { id: '1', name: 'Reglamento Interno', size: '2.4 MB', icon: 'description', color: 'text-red-500 bg-red-50' },
  { id: '2', name: 'Manual de Convivencia', size: '1.1 MB', icon: 'menu_book', color: 'text-blue-500 bg-blue-50' },
  { id: '3', name: 'Actas de Asamblea 2023', size: '5.0 MB', icon: 'gavel', color: 'text-orange-500 bg-orange-50' },
];

const HISTORY = [
  { id: '1', title: 'Administración Octubre', date: '05 Oct, 2023', amount: '-$250.00', method: 'Visa ****4291', status: 'Exitoso' },
  { id: '2', title: 'Reserva Salón Social', date: '12 Sep, 2023', amount: '-$50.00', method: 'Visa ****4291', status: 'Exitoso' },
  { id: '3', title: 'Administración Septiembre', date: '04 Sep, 2023', amount: '-$250.00', method: 'Transferencia', status: 'Exitoso' },
  { id: '4', title: 'Administración Agosto', date: '05 Ago, 2023', amount: '-$250.00', method: 'Visa ****4291', status: 'Exitoso' },
];

const Payments: React.FC = () => {
  const [view, setView] = useState<'main' | 'history'>('main');

  const renderMain = () => (
    <>
      <header className="px-6 py-6 flex justify-between items-center bg-white border-b border-gray-50 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Mis Finanzas</h1>
            <p className="text-xs text-slate-400 font-medium">Torre A • Apto 402</p>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-110"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado de Cuenta</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 filled">check_circle</span>
                <h2 className="text-3xl font-bold">Al día</h2>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">Solvente</span>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="space-y-0.5">
              <p className="text-[10px] text-slate-400 font-medium">Próximo vencimiento</p>
              <p className="text-sm font-bold text-slate-800">05 Noviembre, 2023</p>
            </div>
            <button onClick={() => setView('history')} className="text-primary text-sm font-bold flex items-center gap-1">
              Ver historial
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>

        <button className="w-full bg-primary hover:bg-primary-dark text-white rounded-2xl p-5 shadow-xl shadow-primary/20 flex items-center justify-between group active:scale-[0.98] transition-all">
          <div className="text-left">
            <h3 className="font-bold text-lg leading-none">Pagar Administración</h3>
            <p className="text-primary-100 text-xs font-medium mt-1">Saldo pendiente: $0.00</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </button>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Actividad Reciente</h3>
            <button onClick={() => setView('history')} className="text-primary text-sm font-bold">Ver todo</button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-sm">Pago de Administración</h4>
              <p className="text-xs text-slate-400">05 Oct • Visa ****4291</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">-$250.00</p>
              <span className="text-[10px] bg-gray-50 text-slate-400 px-1.5 py-0.5 rounded">Exitoso</span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Documentos</h3>
            <button className="text-primary text-sm font-bold">Ver todos</button>
          </div>
          <div className="space-y-3">
            {DOCUMENTS.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.color}`}>
                    <span className="material-symbols-outlined">{doc.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{doc.name}</h4>
                    <p className="text-xs text-slate-400">PDF • {doc.size}</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-gray-50 text-slate-400 flex items-center justify-center hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">download</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );

  const renderHistory = () => (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('main')} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Historial de Pagos</h2>
      </div>
      <div className="space-y-4">
        {HISTORY.map((item) => (
          <div key={item.id} className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined">credit_card</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                <p className="text-[10px] text-slate-400">{item.date} • {item.method}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">{item.amount}</p>
              <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto no-scrollbar bg-gray-50">
      {view === 'main' ? renderMain() : renderHistory()}
    </div>
  );
};

export default Payments;
