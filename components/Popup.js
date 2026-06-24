export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popupElement.querySelector(".popup__close");

        //using .bind() so that the "this" keyword doesn't try to close the document
        //upon execution
        this._handleEscapeClose = this._handleEscapeClose.bind(this);
    }

    _handleEscapeClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add("popup_visible");
        document.addEventListener('keydown', this._handleEscapeClose);
    }

    close() {
        this._popupElement.classList.remove("popup_visible");
        document.removeEventListener('keydown', this._handleEscapeClose);
    }

    setEventListeners() {
        // This commented out listener is redundant now that the listener below it has
        // been implemented.
        // this._popupCloseBtn.addEventListener("click", () => {
        //     this.close();
        // });

        this._popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup__close") ||
                evt.target.classList.contains("popup")) {
                    this.close();
                }
        });
    }
}