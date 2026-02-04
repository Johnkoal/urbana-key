
import React, { useState } from 'react';
import { ClassifiedItem } from '../types';

const CLASSIFIEDS: ClassifiedItem[] = [
  {
    id: '1',
    type: 'Venta',
    title: 'Bicicleta de Montaña Trek Semi-nueva',
    description: 'Bicicleta Trek Marlin 7, talla M, rodada 29. Muy poco uso, mantenimiento reciente.',
    price: '$200.000',
    owner: 'Juan Sierra',
    location: 'Torre 2 - 1107',
    initials: 'JS',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    type: 'Servicio',
    title: 'Servicio de Plomería y Reparaciones',
    description: 'Reparación de fugas, instalación de sanitarios, grifería y mantenimiento de calentadores.',
    price: 'A convenir',
    owner: 'Mario Ruiz',
    location: 'Torre 4 - 302',
    initials: 'MR',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    type: 'Comida',
    title: 'Postres Caseros para el Fin de Semana',
    description: 'Venta de pies de limón, cheesecake y brownies. Entrega a domicilio dentro del conjunto.',
    price: '$15.000',
    owner: 'Carla Lopez',
    location: 'Torre 5 - 102',
    initials: 'CL',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '4',
    type: 'Venta',
    title: 'Sillón Vintage Restaurado',
    description: 'Sillón individual estilo mid-century, tapicería nueva color verde bosque.',
    price: '$80.000',
    owner: 'Ana Perez',
    location: 'Torre 1 - 501',
    initials: 'AP',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=400'
  }
];

const Community: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const [showSettings, setShowSettings] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClassifiedItem | null>(null);

  const filters = ['Todos', 'Venta', 'Servicio', 'Comida', 'Mascotas'];

  const filteredItems = filter === 'Todos' ? CLASSIFIEDS : CLASSIFIEDS.filter(item => item.type === filter);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Anuncio publicado exitosamente!");
    setShowAddModal(false);
  };

  const renderList = () => (
    <main className="px-4">
      <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined filled">shield_lock</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">Aviso de Seguridad</h4>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            UrbanaKey conecta vecinos pero <span className="font-bold">no procesa pagos</span> ni envíos. Acuerda la entrega en zonas seguras.
          </p>
        </div>
      </div>

      <div className="mt-6 relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input 
          type="text" 
          placeholder="Buscar..."
          className="w-full h-14 bg-white border border-gray-200 rounded-2xl pl-12 pr-12 focus:ring-primary focus:border-primary shadow-sm"
        />
        <button 
          onClick={() => setShowSettings(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
        >
          <span className="material-symbols-outlined">tune</span>
        </button>
      </div>

      <div className="mt-6 overflow-x-auto no-scrollbar -mx-4 px-4 flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all shadow-sm ${
              filter === f ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-gray-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedItem(item)}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group cursor-pointer"
          >
            <div className="h-32 relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <h4 className="text-xs font-bold text-slate-800 leading-tight mb-2 line-clamp-2">{item.title}</h4>
              <p className="text-sm font-bold text-primary mb-3">{item.price}</p>
              <button className="w-full py-2 bg-green-50 text-green-600 rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold">
                Detalles
              </button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-2 py-12 text-center text-slate-400">
            No se encontraron anuncios en esta categoría.
          </div>
        )}
      </div>
    </main>
  );

  const renderDetail = () => (
    <div className="flex-1 bg-white min-h-screen">
      <div className="relative h-80">
        <img src={selectedItem?.image} alt="" className="w-full h-full object-cover" />
        <button onClick={() => setSelectedItem(null)} className="absolute top-6 left-6 w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase mb-2 inline-block">
              {selectedItem?.type}
            </span>
            <h2 className="text-2xl font-bold text-slate-800">{selectedItem?.title}</h2>
          </div>
          <p className="text-xl font-bold text-primary">{selectedItem?.price}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl mb-6">
          <p className="text-sm text-slate-600 leading-relaxed">{selectedItem?.description}</p>
        </div>

        <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
            {selectedItem?.initials}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800">{selectedItem?.owner}</h4>
            <p className="text-xs text-slate-400">{selectedItem?.location}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined">message</span>
          </button>
        </div>

        <button className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" alt="WA" />
          CONTACTAR POR WHATSAPP
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto no-scrollbar bg-gray-50">
      {!selectedItem && (
        <header className="sticky top-0 bg-white z-30 px-4 py-4 flex items-center justify-between border-b border-gray-50 shadow-sm">
          <div className="flex items-center gap-2">
             <img src="logo.png" alt="UrbanaKey" className="w-6 h-6 object-contain" />
             <h1 className="text-xl font-bold">Comunidad</h1>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow-lg active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </header>
      )}

      {!selectedItem ? renderList() : renderDetail()}

      {/* Filter Settings Modal */}
      <div className={`fixed inset-0 z-[100] flex items-end justify-center transition-all duration-300 ${showSettings ? 'bg-black/40 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}>
        <div className={`w-full max-w-md bg-white rounded-t-[2.5rem] p-8 shadow-2xl transition-transform duration-500 ${showSettings ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Filtros Avanzados</h3>
            <button onClick={() => setShowSettings(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase mb-4">Ubicación</p>
              <div className="grid grid-cols-2 gap-3">
                {['Torre 1', 'Torre 2', 'Torre 3', 'Torre 4', 'Torre 5'].map(t => (
                  <label key={t} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                    <span className="text-xs font-medium text-slate-700">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase mb-4">Rango de Precio</p>
              <input type="range" className="w-full accent-primary" />
              <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold">
                <span>$0</span>
                <span>$1.000.000+</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowSettings(false)}
            className="w-full py-4 mt-8 bg-primary text-white font-bold rounded-2xl shadow-lg"
          >
            APLICAR FILTROS
          </button>
        </div>
      </div>

      {/* Add Classified Modal */}
      <div className={`fixed inset-0 z-[120] flex items-end justify-center transition-all duration-300 ${showAddModal ? 'bg-black/40 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}>
        <div className={`w-full h-[90vh] bg-white rounded-t-[2.5rem] p-8 shadow-2xl transition-transform duration-500 overflow-y-auto no-scrollbar ${showAddModal ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800">Nuevo Anuncio</h3>
            <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <form className="space-y-6 pb-12" onSubmit={handlePost}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Título del Anuncio</label>
              <input type="text" placeholder="Ej. Bicicleta Trek" className="w-full bg-gray-50 border-none rounded-xl py-4 px-4 shadow-sm" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Categoría</label>
                <select className="w-full bg-gray-50 border-none rounded-xl py-4 px-4 shadow-sm text-sm font-medium">
                  <option>Venta</option>
                  <option>Servicio</option>
                  <option>Comida</option>
                  <option>Mascotas</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Precio</label>
                <input type="text" placeholder="Ej. $50.000" className="w-full bg-gray-50 border-none rounded-xl py-4 px-4 shadow-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Descripción</label>
              <textarea placeholder="Cuéntanos más sobre lo que ofreces..." className="w-full bg-gray-50 border-none rounded-xl py-4 px-4 shadow-sm h-32 resize-none" required></textarea>
            </div>

            <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2">
              <span className="material-symbols-outlined text-4xl">add_a_photo</span>
              <p className="text-xs font-bold uppercase">Subir Fotos</p>
            </div>

            <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">rocket_launch</span>
              PUBLICAR ANUNCIO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Community;
