import { useDispatch } from "react-redux";
import { toggleAllSelectCompanies } from "store/companiesSlice";

import style from './CompaniesTableHeader.module.scss';


export const CompaniesTableHeader = () => {

    const dispatch = useDispatch();

    const handleAllSelectCompanies = () => {
        dispatch(toggleAllSelectCompanies())
    }

    return (
            <tr className={style.companies__table__row}>
                <th className={style.companies__header}>
                    <label htmlFor="selectAllCheckbox" className={style.companies__label}>Выделить все</label>
                    <div>
                        <input 
                            type="checkbox" 
                            onChange={handleAllSelectCompanies} 
                            id="selectAllCheckbox"
                            className={style.companies__allInputCheckbox} 
                        />
                    </div>
                </th>
                <th className={style.companies__header}>Название Компании</th>
                <th className={style.companies__header}>Адрес</th>
            </tr>
    )

};