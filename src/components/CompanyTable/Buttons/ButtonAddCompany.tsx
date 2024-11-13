import { useDispatch } from "react-redux";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { Company, TableHandle } from "store/types";
import { addCompany } from "store/companiesSlice";


import style from './Button.module.scss';



export const ButtonAddCompany = forwardRef<TableHandle, ButtonHTMLAttributes<HTMLButtonElement>>((_, ref) => {

    const [countCompanyList, setCountCompanyList] = useState(50); 

    /* Переменная countCompanyList хранит общее количество компаний в списке.
    Установлено на 50, так как это фиксированное значение, известное заранее.
    Это значение используется для генерации уникальных ключей (key) при рендеринге
    списка компаний, чтобы избежать дублирования ключей и обеспечить корректное поведение React при обновлении компонентов.
    */

    const dispatch = useDispatch();

    const handleAddCompany = () => {
        const selectAllCheckbox = document.getElementById('selectAllCheckbox') as HTMLInputElement;
        const isChecked: boolean = selectAllCheckbox.checked;
        setCountCompanyList((prevCount) => prevCount + 1);

        const newCompany: Company = {
            id: countCompanyList, 
            name: '', 
            address: '', 
            isSelect: isChecked ? true : false,
        };

        dispatch(addCompany(newCompany));
        if (ref && typeof ref !== 'function') {
            const tableScrollRef = ref.current?.getValue();
            if (tableScrollRef) {
                tableScrollRef.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    return <button onClick={handleAddCompany} className={style.button__table}>Добавить компанию</button>;
});