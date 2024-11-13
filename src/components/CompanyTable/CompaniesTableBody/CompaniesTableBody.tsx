import { fakeCompanies } from "constants/companiesConstant";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTableCell, setCompanies, toggleSelectCompany } from "store/companiesSlice";
import { RootState } from "store/store";
import { EditableCompanyFields, TableHandle } from "store/types";

import style from './CompanyTableBody.module.scss'

export const CompaniesTableBody = forwardRef<TableHandle>((_, ref) => {
    const dispatch = useDispatch();
    const companies = useSelector((state: RootState) => state.companies.companies);
    const tableRef = useRef<HTMLTableElement | null>(null);

    useImperativeHandle(ref, () => ({
        getValue: () => {
            return tableRef.current?.parentElement ?? null;
        }
    }));

    const handleScroll = () => {
        if (tableRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = tableRef.current.parentElement!;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                if (fakeCompanies.length > 0) {
                    dispatch(setCompanies(fakeCompanies.splice(0, 10)));
                }
            }
        }
    };

    useEffect(() => {
        const tableContainer = tableRef.current?.parentElement;
        if (tableContainer) {
            tableContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableContainer) {
                tableContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleSelectCompany = (idCompany: number) => {
        dispatch(toggleSelectCompany(idCompany));
    };

    const handleEditInput = (idCompany: number, editableField: EditableCompanyFields) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        dispatch(editTableCell({ idCompany, editableField, value: newValue }));
    };

    return (
        <table className={style.companies__table} ref={tableRef}>
            <tbody>
                {companies.map((company) => {
                    return (
                        <tr key={company.id} className={`${style.companies__table__row} ${company.isSelect === true ? style.isSelectCompany : ''}`}>
                            <td className={style.companies__table__cell}>
                                <input 
                                    type="checkbox" 
                                    checked={company.isSelect} 
                                    onChange={() => { handleSelectCompany(company.id) }}
                                    className={style.companies__checkbox}
                                />
                            </td>
                            <td className={style.companies__table__cell}>
                                <input 
                                    type="text" 
                                    value={company.name} 
                                    onChange={handleEditInput(company.id, 'name')}
                                    className={style.companies__input}
                                    placeholder="Введите название компании"
                                />
                            </td>
                            <td className={style.companies__table__cell}>
                                <input 
                                    type="text" 
                                    value={company.address} 
                                    onChange={handleEditInput(company.id, 'address')}
                                    className={style.companies__input}
                                    placeholder="Введите адрес компании"
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
});
