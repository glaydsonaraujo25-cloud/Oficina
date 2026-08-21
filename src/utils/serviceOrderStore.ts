import { ServiceOrderRecord, ServiceOrderStatus } from '../types';

const STORAGE_KEY = 'lisboa-service-orders-v1';

const readLocal = (): ServiceOrderRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocal = (records: ServiceOrderRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 250)));
  window.dispatchEvent(new Event('lisboa:service-orders-updated'));
};

const generateNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const sequence = String(readLocal().length + 1).padStart(4, '0');
  return `OS-${date}-${sequence}`;
};

export const getServiceOrders = () => readLocal();

export const createServiceOrder = (
  data: Omit<ServiceOrderRecord, 'number' | 'createdAt' | 'updatedAt' | 'status'>,
) => {
  const now = new Date().toISOString();
  const record: ServiceOrderRecord = {
    ...data,
    number: generateNumber(),
    createdAt: now,
    updatedAt: now,
    status: 'draft',
  };
  writeLocal([record, ...readLocal()]);
  return record;
};

export const updateServiceOrderStatus = (number: string, status: ServiceOrderStatus) => {
  writeLocal(readLocal().map((record) => record.number === number ? {
    ...record,
    status,
    updatedAt: new Date().toISOString(),
  } : record));
};

export const deleteServiceOrder = (number: string) => {
  writeLocal(readLocal().filter((record) => record.number !== number));
};
