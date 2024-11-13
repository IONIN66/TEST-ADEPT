import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellEditPayload, CompanyList, Company } from "./types";

const initialState: CompanyList = {
    companies: [],
};

export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies: (state, action: PayloadAction<Company[]>) => {
            state.companies = [...state.companies, ...action.payload];
        },
        addCompany: (state, action: PayloadAction<Company>) => {
            state.companies.unshift(action.payload);
        },
        removeCompany: (state) => {
            if (state.companies.length === 0) return;

            const isSelectCompaniesCount = state.companies.reduce((count, company) => {
                return count + (company.isSelect ? 1 : 0);
            }, 0);

            if (isSelectCompaniesCount > 0) {
                state.companies = state.companies.filter(company => !company.isSelect);
            } else {
                state.companies.shift();
            }     
        },
        toggleSelectCompany: (state, action: PayloadAction<number>) => {
            const selectCompany = state.companies.find((selectCompany) => {
                return selectCompany.id === action.payload;
            });

            if (selectCompany) {
                selectCompany.isSelect = !selectCompany.isSelect;
            }
        },
        toggleAllSelectCompanies: (state) => {
            state.companies = state.companies.map((company) => ({
                ...company,
                isSelect: !company.isSelect,
            }));
        },
        editTableCell: (state, action: PayloadAction<CellEditPayload>) => {
            const { idCompany, editableField, value } = action.payload;
            const indexCompany = state.companies.findIndex(company => company.id === idCompany);
            state.companies[indexCompany][editableField] = value;
        },
    }
})

export const { 
    addCompany, 
    setCompanies,
    removeCompany,
    toggleSelectCompany,
    toggleAllSelectCompanies,
    editTableCell,
} = companiesSlice.actions;