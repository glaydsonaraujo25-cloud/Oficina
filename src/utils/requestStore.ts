import { CustomerRequestRecord } from '../types';

const STORAGE_KEY = 'lisboa-customer-requests-v1';

const generateProtocol = (type: CustomerRequestRecord['type']) => {
  const prefix = type === 'quote' ? 'ORC' : 'AGD';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${date}-${random}`;
};

const readLocal = (): CustomerRequestRecord[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocal = (records: CustomerRequestRecord[]) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 100)));
  } catch {
    // Local persistence is a convenience fallback only.
  }
};

export const createCustomerRequest = (
  data: Omit<CustomerRequestRecord, 'protocol' | 'createdAt' | 'status'>,
) => {
  const record: CustomerRequestRecord = {
    ...data,
    protocol: generateProtocol(data.type),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const records = readLocal();
  writeLocal([record, ...records]);
  return record;
};

export const markCustomerRequestAsSent = (protocol: string) => {
  const records = readLocal();
  writeLocal(
    records.map((record) =>
      record.protocol === protocol
        ? { ...record, status: 'sent-whatsapp' as const }
        : record,
    ),
  );
};

export const getCustomerRequests = () => readLocal();
