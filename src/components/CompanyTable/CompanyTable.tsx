import { useDispatch } from "react-redux";
import { useEffect, useRef, useState} from "react";
import { TableHandle } from "store/types";
import { setCompanies } from "store/companiesSlice";
import { fakeCompanies } from "constants/companiesConstant";
import { ButtonAddCompany } from "./Buttons/ButtonAddCompany";
import { ButtonDeleteCompany } from "./Buttons/ButtonDeleteCompany";
import { CompaniesTableHeader } from "./CompaniesTableHeader/CompaniesTableHeader";
import { CompaniesTableBody } from "./CompaniesTableBody/CompaniesTableBody";

import style from './CompanyTable.module.scss';


export const CompanyTable = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const tableScrollRef = useRef<TableHandle>(null);

    useEffect(() => {
        setLoading(false);
        dispatch(setCompanies(fakeCompanies.splice(0, 10)));
    }, [dispatch]);

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <main className={style.companies}>
            <div className={style.companies__table__header}>
                <table className={style.companies__table}>
                    <thead>
                        <CompaniesTableHeader />
                    </thead>
                </table>
            </div>
            <div className={style.companies__table__content}>
                <CompaniesTableBody ref={tableScrollRef} />
            </div>
            <div className={style.companies__table__footer}>
                <ButtonAddCompany ref={tableScrollRef} />
                <ButtonDeleteCompany />
            </div>
        </main>
    );
};
