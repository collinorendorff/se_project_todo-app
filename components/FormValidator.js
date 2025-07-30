export default class FormValidator {
    constructor(config, formEl) {
        this._config = config;
        this._formEl = formEl;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formEl.querySelectorAll(this._config.inputSelector));

        this._buttonElement = this._formEl.querySelector(this._config.submitButtonSelector);

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            inputElement.value = "";
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}