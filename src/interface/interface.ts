export interface Clinic {
    id: string;
    name: string;
    address: string;
    patients: Patient[];
    visits: Visit[];
    metrics: Metric[];
}

export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Visit {
    id: string;
    date: string;
}

export interface Metric {
    id: string;
    date: string;
    value: number;
    type: string;
}