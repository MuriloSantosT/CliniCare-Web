export interface Evolution {
  id?: number;
  data?: string;
  titulo?: string;
  texto: string;
  planoProximaSessao?: string;
  patientId?: number | null;
  appointmentId?: number | null;
  user?: { id: number };
  createdAt?: string;
}
