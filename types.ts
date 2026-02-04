
export type AccessType = 'peatonal' | 'vehicular';

export interface NewsItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  content: string;
  image: string;
}

export interface ClassifiedItem {
  id: string;
  type: 'Venta' | 'Servicio' | 'Comida' | 'Mascotas';
  title: string;
  description: string;
  price?: string;
  owner: string;
  location: string;
  image: string;
  initials: string;
}

export interface VisitPass {
  id: string;
  visitorName: string;
  type: AccessType;
  status: 'Entró' | 'Pendiente' | 'Expirado';
  time: string;
  plate?: string;
}

export interface Package {
  id: string;
  carrier: string;
  date: string;
  status: 'Entregado' | 'En recepción';
  tracking: string;
  description: string;
  photos: string[];
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}
