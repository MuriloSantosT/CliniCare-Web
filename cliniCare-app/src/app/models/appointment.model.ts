export interface Appointment {
  id?: number;
  dataInicio: string;
  dataFim: string;
  status: string;
  observacoes?: string;
  valor?: number;
  formaPagamento?: string;
  createdAt?: string;
  updatedAt?: string;
  patient?: any; // Patient interface can be defined later
  user?: any; // User interface can be defined later
}