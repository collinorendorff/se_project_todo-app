import Popup from './Popup.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupFormEl = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupFormEl.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        const date = new Date(values['date']);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        values['date'] = date;

        const id = uuidv4();
        values['id'] = id;
        
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupFormEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const values = this._getInputValues();
            this._handleFormSubmit(values);
        });
    }
}