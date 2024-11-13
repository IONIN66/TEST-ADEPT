import { useDispatch } from "react-redux";
import { removeCompany } from "store/companiesSlice";

import style from './Button.module.scss';

export const ButtonDeleteCompany = () => {

    const dispatch = useDispatch();

    const handleDeleteCompany = () => {
        dispatch(removeCompany());
        const selectAllCheckbox = document.getElementById('selectAllCheckbox') as HTMLInputElement;
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
        }
    }

    return <button onClick={handleDeleteCompany} className={style.button__table}>Удалить компанию</button>;
}