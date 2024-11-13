export interface Company {
    name: string;
    id: number;
    address: string;
    isSelect: boolean;
}

export interface CompanyList {
    companies: Company[];
}

export type EditableCompanyFields = keyof Pick<Company, 'name' | 'address'>;

export interface CellEditPayload {
    idCompany: number;
    editableField: EditableCompanyFields;
    value: string;
}

export interface TableHandle {
    getValue: () => HTMLElement | null;
}