
import React, { useState, useEffect } from 'react';

interface ProfileProps {
  onLogout: () => void;
}

type ProfileSubView = 'main' | 'personal' | 'security' | 'notifications' | 'emergency';

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState<ProfileSubView>('main');
  const [toast, setToast] = useState<string | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showConfirmation = (msg: string) => {
    setToast(msg);
  };

  const renderMain = () => (
    <>
      <div className="px-6 py-8 flex flex-col items-center">
        <div className="relative">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/10 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300" 
              alt="John Sierra" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <button className="absolute bottom-1 right-1 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center shadow-md border-4 border-white">
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-slate-800">John Sierra</h1>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-slate-500 font-medium">
            <span className="material-symbols-outlined text-primary text-[20px]">apartment</span>
            Torre 5 - Apto 1107
          </div>
        </div>
      </div>

      <div className="px-4 space-y-2 mt-4">
        <div className="bg-gray-50/50 rounded-3xl overflow-hidden border border-gray-100">
          <button onClick={() => setActiveView('personal')} className="w-full flex items-center justify-between p-5 bg-white border-b border-gray-100 group">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">person</span>
              </div>
              <span className="text-slate-700 font-bold text-sm">Información Personal</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>
          <button onClick={() => setActiveView('security')} className="w-full flex items-center justify-between p-5 bg-white border-b border-gray-100 group">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">lock</span>
              </div>
              <span className="text-slate-700 font-bold text-sm">Seguridad (PIN)</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>
          <button onClick={() => setActiveView('notifications')} className="w-full flex items-center justify-between p-5 bg-white border-b border-gray-100 group">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </div>
              <span className="text-slate-700 font-bold text-sm">Notificaciones</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>
          <button onClick={() => setActiveView('emergency')} className="w-full flex items-center justify-between p-5 bg-white group">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">medical_services</span>
              </div>
              <span className="text-slate-700 font-bold text-sm">Emergencias</span>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="px-6 mt-12 flex flex-col items-center gap-6">
        <button 
          onClick={onLogout}
          className="w-full h-16 rounded-2xl border border-gray-200 bg-gray-50 text-slate-500 font-bold flex items-center justify-center gap-3 active:bg-red-50 active:text-red-500 active:border-red-100 transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </>
  );

  const renderPersonal = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveView('main')} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Información Personal</h2>
      </div>
      <div className="space-y-6">
        {[
          { label: 'Nombre Completo', value: 'John Sierra' },
          { label: 'Email', value: 'j.sierra@email.com' },
          { label: 'Teléfono', value: '+57 310 123 4567' },
        ].map((field, i) => (
          <div key={i} className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">{field.label}</p>
            <input 
              type="text" 
              defaultValue={field.value}
              className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 font-medium focus:ring-primary focus:border-primary"
            />
          </div>
        ))}
        <button 
          onClick={() => { showConfirmation("Información guardada exitosamente"); setActiveView('main'); }}
          className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg mt-8"
        >
          GUARDAR CAMBIOS
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveView('main')} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Seguridad</h2>
      </div>
      <div className="space-y-8">
        <div className="p-6 bg-slate-800 rounded-3xl text-white text-center">
          <span className="material-symbols-outlined text-4xl mb-2">lock_person</span>
          <h3 className="font-bold">PIN de Seguridad</h3>
          <p className="text-xs text-slate-400 mt-1">Usa este PIN para autorizar mudanzas o reservas.</p>
        </div>
        <div className="flex justify-center gap-4 px-4">
          {[1,2,3,4].map(n => (
            <input 
              key={n} 
              type="password" 
              maxLength={1} 
              className="w-14 h-14 bg-gray-100 rounded-2xl text-center font-bold text-2xl border-2 border-transparent focus:border-primary focus:ring-0 shadow-sm" 
            />
          ))}
        </div>
        <button 
          onClick={() => { showConfirmation("PIN actualizado correctamente"); setActiveView('main'); }}
          className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl"
        >
          ACTUALIZAR PIN
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveView('main')} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Notificaciones</h2>
      </div>
      <div className="space-y-4">
        {[
          { title: 'Push App', desc: 'Recibir avisos en el móvil' },
          { title: 'Email', desc: 'Resumen semanal y estados de cuenta' },
          { title: 'WhatsApp', desc: 'Recibir notificaciones por WhatsApp' },
          { title: 'SMS', desc: 'Recibir alertas importantes por SMS' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex-1">
              <p className="font-bold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer ml-4 shrink-0">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        ))}
        <button 
          onClick={() => { showConfirmation("Preferencias actualizadas"); setActiveView('main'); }}
          className="w-full py-4 mt-8 bg-primary text-white font-bold rounded-2xl"
        >
          GUARDAR PREFERENCIAS
        </button>
      </div>
    </div>
  );

  const renderEmergency = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveView('main')} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Contactos</h2>
      </div>
      <div className="space-y-4">
        {[
          { name: 'Andrea Zamora (Esposa)', phone: '+57 300 987 6543' },
          { name: 'Dr. Roberto Luna (Médico)', phone: '+57 320 111 2233' },
        ].map((contact, i) => (
          <div key={i} className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800">{contact.name}</p>
              <p className="text-xs text-slate-500">{contact.phone}</p>
            </div>
            <button className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">call</span>
            </button>
          </div>
        ))}
        <button 
          onClick={() => setShowAddContact(true)}
          className="w-full py-4 border-2 border-dashed border-gray-200 text-slate-400 font-bold rounded-2xl flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Agregar Contacto
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-24 no-scrollbar relative">
      <div className="h-4 w-full"></div>
      {activeView === 'main' && (
        <div className="px-4 py-2 flex justify-center sticky top-0 bg-white z-10">
          <h2 className="text-slate-800 text-lg font-bold">Perfil</h2>
        </div>
      )}
      
      {activeView === 'main' && renderMain()}
      {activeView === 'personal' && renderPersonal()}
      {activeView === 'security' && renderSecurity()}
      {activeView === 'notifications' && renderNotifications()}
      {activeView === 'emergency' && renderEmergency()}

      {/* Confirmation Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-3 z-[200] animate-bounce">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          {toast}
        </div>
      )}

      {/* Add Contact Modal */}
      <div className={`fixed inset-0 z-[150] flex items-center justify-center px-6 transition-all duration-300 ${showAddContact ? 'bg-black/60 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}>
        <div className={`w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl transition-all ${showAddContact ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <h3 className="text-xl font-bold mb-6">Nuevo Contacto</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre completo" className="w-full h-14 bg-gray-50 border-none rounded-xl px-4" />
            <input type="tel" placeholder="Teléfono" className="w-full h-14 bg-gray-50 border-none rounded-xl px-4" />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddContact(false)}
                className="flex-1 py-4 bg-gray-100 text-slate-400 font-bold rounded-xl"
              >
                CANCELAR
              </button>
              <button 
                onClick={() => { setShowAddContact(false); showConfirmation("Contacto agregado"); }}
                className="flex-1 py-4 bg-primary text-white font-bold rounded-xl"
              >
                AGREGAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
