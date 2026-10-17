import { createContext, useContext, useState, type ReactNode } from 'react';

export type GrainItem = { name: string; price: number; image: string; quantity: number };
type Store = { items: GrainItem[]; add: (item: Omit<GrainItem, 'quantity'>) => void; change: (name: string, amount: number) => void; remove: (name: string) => void; notice: string; notify: (message: string) => void };
const StoreContext = createContext<Store | null>(null);
export function GrainProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GrainItem[]>([]);
  const [notice, notify] = useState('');
  function add(item: Omit<GrainItem, 'quantity'>) {
    setItems(old => old.some(x => x.name === item.name) ? old.map(x => x.name === item.name ? { ...x, quantity: x.quantity + 1 } : x) : [...old, { ...item, quantity: 1 }]);
    notify(`${item.name} added to your basket`);
  }
  return <StoreContext.Provider value={{ items, add, change: (name, amount) => setItems(old => old.map(x => x.name === name ? { ...x, quantity: Math.max(1, x.quantity + amount) } : x)), remove: name => setItems(old => old.filter(x => x.name !== name)), notice, notify }}>{children}</StoreContext.Provider>;
}
export function useGrainStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('GrainProvider is required');
  return store;
}