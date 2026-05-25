export interface Report {
  id?: number;
  data?: string;
  titulo?: string;
  descricao: string;
  patientId?: number | null;
  user?: { id: number };
  createdAt?: string;
}
