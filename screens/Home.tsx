
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem, Package, Amenity } from '../types';

const NEWS: NewsItem[] = [
  {
    id: '1',
    tag: 'Mantenimiento',
    title: 'Mantenimiento de Elevadores Torre B',
    date: 'Hoy, 10:00 AM',
    content: 'Se realizará mantenimiento preventivo en la Torre B. Los elevadores estarán fuera de servicio de 10:00 AM a 2:00 PM para asegurar el correcto funcionamiento de los sistemas de seguridad y cables de tracción. Agradecemos su comprensión.',
    image: 'https://images.unsplash.com/photo-1517646331032-9e8563c520a1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    tag: 'Asamblea',
    title: 'Reunión Anual de Vecinos',
    date: '18 Oct, 7:00 PM',
    content: 'Asamblea general para discutir el presupuesto del próximo año y la elección del nuevo comité de vigilancia. Es de suma importancia la asistencia de todos los propietarios o delegados debidamente autorizados.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    tag: 'Social',
    title: 'Evento de Integración Familiar',
    date: '25 Oct, 4:00 PM',
    content: 'Tarde de juegos y snacks en el área social para conocernos mejor entre vecinos.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
  }
];

const PACKAGES: Package[] = [
  { 
    id: '1', 
    carrier: 'Amazon Logistics', 
    date: 'Hoy, 09:30 AM', 
    status: 'En recepción', 
    tracking: 'AZ-482910',
    description: 'Caja mediana, sellada, remitente Amazon Mexico.',
    photos: ['https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=400', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400']
  },
  { 
    id: '2', 
    carrier: 'Mercado Libre', 
    date: 'Ayer, 04:15 PM', 
    status: 'Entregado', 
    tracking: 'ML-992384',
    description: 'Bolsa de seguridad pequeña.',
    photos: ['https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=400']
  },
];

const AMENITIES: Amenity[] = [
  { id: '1', name: 'Gimnasio', icon: 'fitness_center', description: 'Capacidad máxima: 5 personas. Horario: 5 AM - 11 PM.' },
  { id: '2', name: 'Salón de Eventos', icon: 'celebration', description: 'Requiere depósito de seguridad. Capacidad: 50 personas.' },
  { id: '3', name: 'Piscina', icon: 'pool', description: 'Mantenimiento los lunes. Uso obligatorio de gorro.' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeSubView, setActiveSubView] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showPanicConfirm, setShowPanicConfirm] = useState(false);
  const [newsViewMode, setNewsViewMode] = useState<'list' | 'grid'>('list');
  
  const [panicActive, setPanicActive] = useState(false);
  const [panicSeconds, setPanicSeconds] = useState(0);

  useEffect(() => {
    let interval: number;
    if (panicActive) {
      interval = window.setInterval(() => {
        setPanicSeconds(s => s + 1);
      }, 1000);
    } else {
      setPanicSeconds(0);
    }
    return () => clearInterval(interval);
  }, [panicActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNotifClick = (type: string) => {
    setShowNotifModal(false);
    if (type === 'package') {
      setActiveSubView('packages');
    } else if (type === 'payment') {
      navigate('/payments');
    }
  };

  const handleShare = async (news: NewsItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.content,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert('La función de compartir no está soportada en este navegador. Copia el enlace manualmente.');
    }
  };

  const renderHome = () => (
    <>
      {panicActive && (
        <div className="mx-6 mt-4 p-4 bg-red-600 text-white rounded-2xl shadow-xl flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined filled">notifications_active</span>
            <div>
              <p className="text-[10px] font-bold uppercase opacity-80">Alerta Activa</p>
              <p className="text-xl font-bold font-mono">{formatTime(panicSeconds)}</p>
            </div>
          </div>
          <button 
            onClick={() => setPanicActive(false)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold text-xs"
          >
            TERMINAR
          </button>
        </div>
      )}
      
      <header className="px-6 py-6 flex justify-between items-center bg-white sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg p-1 shadow-sm overflow-hidden">
             <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium leading-none mb-1">UrbanaKey</p>
            <h1 className="text-xl font-bold text-slate-800">Hola, Alejandro</h1>
          </div>
        </div>
        <button 
          onClick={() => setShowNotifModal(true)}
          className="relative p-2 bg-gray-50 rounded-full text-slate-800"
        >
          <span className="material-symbols-outlined filled">notifications</span>
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <div className="px-6 space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowPanicConfirm(true)}
              className="col-span-2 flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-2xl group active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <span className="material-symbols-outlined filled">e911_emergency</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-red-700">Botón de Pánico</h3>
                  <p className="text-xs text-red-500 font-medium">Contactar seguridad inmediatamente</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-red-300">chevron_right</span>
            </button>

            <button 
              onClick={() => setActiveSubView('packages')}
              className="p-4 bg-white border border-gray-100 rounded-2xl flex flex-col items-start gap-4 shadow-sm active:scale-95 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary relative">
                <span className="material-symbols-outlined">package_2</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">2</span>
              </div>
              <span className="font-bold text-slate-800">Mis Paquetes</span>
            </button>

            <button 
              onClick={() => setActiveSubView('reserve')}
              className="p-4 bg-white border border-gray-100 rounded-2xl flex flex-col items-start gap-4 shadow-sm active:scale-95 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">pool</span>
              </div>
              <span className="font-bold text-slate-800">Reservar Zona</span>
            </button>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Noticias</h2>
            <button 
              onClick={() => setActiveSubView('allNews')}
              className="text-primary text-sm font-bold"
            >
              Ver todo
            </button>
          </div>
          <div className="space-y-4">
            {NEWS.slice(0, 2).map((item) => (
              <div 
                key={item.id} 
                onClick={() => { setSelectedNews(item); setActiveSubView('newsDetail'); }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer"
              >
                <div className="h-44 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );

  const renderPackages = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveSubView(null)} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Mis Paquetes</h2>
      </div>
      <div className="space-y-4">
        {PACKAGES.map(pkg => (
          <div 
            key={pkg.id} 
            onClick={() => { setSelectedPackage(pkg); setActiveSubView('packageDetail'); }}
            className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pkg.status === 'Entregado' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{pkg.carrier}</h4>
                <p className="text-xs text-slate-400">{pkg.tracking}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${pkg.status === 'Entregado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {pkg.status}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">{pkg.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPackageDetail = () => (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveSubView('packages')} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Detalle de Paquete</h2>
      </div>
      
      {selectedPackage && (
        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 ${selectedPackage.status === 'Entregado' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
              <span className="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">{selectedPackage.carrier}</h3>
            <p className="text-slate-400">{selectedPackage.tracking}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase">Descripción</p>
              <p className="text-sm text-slate-700">{selectedPackage.description}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Recibido</p>
                <p className="text-sm font-bold text-slate-700">{selectedPackage.date}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Estado</p>
                <p className="text-sm font-bold text-primary">{selectedPackage.status}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-4">Fotos de Recepción</h4>
            <div className="grid grid-cols-2 gap-4">
              {selectedPackage.photos.map((photo, i) => (
                <img key={i} src={photo} className="w-full h-40 object-cover rounded-2xl border border-gray-100 shadow-sm" alt={`Paquete ${i}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAllNews = () => (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveSubView(null)} className="p-2 bg-gray-50 rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-2xl font-bold">Todas las Noticias</h2>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setNewsViewMode('list')}
            className={`p-2 rounded-lg transition-all ${newsViewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
          >
            <span className="material-symbols-outlined">format_list_bulleted</span>
          </button>
          <button 
            onClick={() => setNewsViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${newsViewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </div>

      <div className={newsViewMode === 'grid' ? "grid grid-cols-2 gap-4" : "space-y-6"}>
        {NEWS.map((item) => (
          <div 
            key={item.id} 
            onClick={() => { setSelectedNews(item); setActiveSubView('newsDetail'); }}
            className={`cursor-pointer group ${newsViewMode === 'grid' ? "flex flex-col" : "flex gap-4"}`}
          >
            <img src={item.image} className={`${newsViewMode === 'grid' ? "w-full h-32 mb-3" : "w-24 h-24"} object-cover rounded-xl shrink-0 transition-transform group-hover:scale-105`} alt={item.title} />
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-bold text-primary uppercase mb-1">{item.tag}</span>
              <h3 className={`font-bold text-slate-800 ${newsViewMode === 'grid' ? 'text-xs' : 'text-sm'} line-clamp-2 leading-tight`}>{item.title}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNewsDetail = () => (
    <div className="bg-white min-h-screen">
      <div className="relative h-72">
        <img src={selectedNews?.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <button 
            onClick={() => setActiveSubView(selectedNews ? 'allNews' : null)} 
            className="w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center text-slate-800"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button 
            onClick={() => selectedNews && handleShare(selectedNews)}
            className="w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center text-slate-800"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
        <div className="absolute bottom-6 left-6 bg-primary px-3 py-1 rounded text-xs font-bold text-white uppercase tracking-widest">
          {selectedNews?.tag}
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          {selectedNews?.date}
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">{selectedNews?.title}</h2>
        <div className="prose text-slate-600 leading-relaxed">
          {selectedNews?.content}
        </div>
      </div>
    </div>
  );

  const renderReserve = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveSubView(null)} className="p-2 bg-gray-50 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-2xl font-bold">Zonas Comunes</h2>
      </div>
      <div className="grid gap-4">
        {AMENITIES.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
              Consultar Disponibilidad
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 pb-24 overflow-y-auto no-scrollbar bg-gray-50">
      {activeSubView === null && renderHome()}
      {activeSubView === 'packages' && renderPackages()}
      {activeSubView === 'packageDetail' && renderPackageDetail()}
      {activeSubView === 'allNews' && renderAllNews()}
      {activeSubView === 'newsDetail' && renderNewsDetail()}
      {activeSubView === 'reserve' && renderReserve()}

      {/* Notifications Modal */}
      <div className={`fixed inset-0 z-[100] flex items-end justify-center transition-all duration-300 ${showNotifModal ? 'bg-black/40 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}>
        <div className={`w-full max-w-md bg-white rounded-t-[2.5rem] p-8 shadow-2xl transition-transform duration-500 ${showNotifModal ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Notificaciones</h3>
            <button onClick={() => setShowNotifModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
            <button 
              onClick={() => handleNotifClick('package')}
              className="w-full p-4 bg-primary/5 border border-primary/10 rounded-2xl flex gap-4 text-left active:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined filled">package_2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Paquete recibido</p>
                <p className="text-xs text-slate-500 mt-1">Un paquete de Amazon ha llegado a recepción.</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Hace 5 min</p>
              </div>
              <span className="material-symbols-outlined text-primary/30 self-center">chevron_right</span>
            </button>

            <button 
              onClick={() => handleNotifClick('payment')}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl flex gap-4 text-left active:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 text-slate-500 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined filled">check_circle</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Pago confirmado</p>
                <p className="text-xs text-slate-500 mt-1">Tu pago de administración fue procesado exitosamente.</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Ayer</p>
              </div>
              <span className="material-symbols-outlined text-slate-300 self-center">chevron_right</span>
            </button>
          </div>
          <button onClick={() => setShowNotifModal(false)} className="w-full py-4 mt-6 bg-slate-800 text-white font-bold rounded-2xl">Cerrar</button>
        </div>
      </div>

      {/* Panic Modal */}
      <div className={`fixed inset-0 z-[110] flex items-center justify-center px-6 transition-all duration-300 ${showPanicConfirm ? 'bg-red-900/60 backdrop-blur-md' : 'pointer-events-none opacity-0'}`}>
        <div className={`w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl text-center transition-all ${showPanicConfirm ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="material-symbols-outlined text-4xl filled">e911_emergency</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">¿Activar Alerta?</h3>
          <p className="text-slate-500 mb-8">Se notificará inmediatamente al equipo de seguridad de la torre y a la administración.</p>
          <div className="space-y-3">
            <button 
              onClick={() => { setPanicActive(true); setShowPanicConfirm(false); }}
              className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl shadow-xl shadow-red-200"
            >
              SÍ, ACTIVAR ALERTA
            </button>
            <button 
              onClick={() => setShowPanicConfirm(false)}
              className="w-full py-4 bg-gray-50 text-slate-400 font-bold rounded-2xl"
            >
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
