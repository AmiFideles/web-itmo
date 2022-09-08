export class Validator {
    xValues;
    yMin;
    yMax;
    rValues;
    CHOOSE_X_LABEL = 'Необходимо выбрать Х';
    CHOOSE_Y_LABEL = 'Необходимо выбрать Y';
    CHOOSE_R_LABEL = 'Необходимо выбрать R';
    WRONG_Y_LABEL = 'Y должен быть от -5 до 3';


    constructor(xValues, yMin, yMax, rValues) {
        this.xValues = xValues;
        this.yMin = yMin;
        this.yMax = yMax;
        this.rValues = rValues;
    }

    isEmpty(value) {
        return value === null || value.trim().length === 0;
    }

    isNumber(value) {
        return !isNaN(value) || isFinite(value);
    }

    checkX(value) {
        return this.xValues.includes(value)
    }

    checkY(value) {
        return value >= this.yMin && value <= this.yMax;
    }

    checkR(value) {
        return this.rValues.includes(value)
    }


    validateX(xValue) {
        return !this.isEmpty(xValue) && this.checkX(Number(xValue));
    }


    validateY(yValue) {
        return !this.isEmpty(yValue) && this.checkY(yValue);
    }

    validateR(rValue) {
        return !this.isEmpty(rValue) && this.checkR(Number(rValue));
    }

    validateAllInputValues(xValue, yValue, rValue, xButton, yInput, rSelect, xButtons) {
        this.deleteAllErrorMessage(xButtons, yInput, rSelect);
        let valid = true;
        if (!this.validateX(xValue)) {
            this.showErrorMessage(xButton, this.CHOOSE_X_LABEL);
            valid = false;
        }
        if (!this.validateY(yValue)) {
            if (this.isEmpty(yValue)) {
                this.showErrorMessage(yInput, this.CHOOSE_Y_LABEL);
            } else {
                this.showErrorMessage(yInput, this.WRONG_Y_LABEL);
            }
            valid = false;
        }
        if (!this.validateR(rValue)) {
            this.showErrorMessage(rSelect, this.CHOOSE_R_LABEL);
            valid = false;
        }
        return valid;
    }

    createWrongLabel(message) {
        return `<p class="wrong-value" style="left: 75.5%; top: 80%;">${message}</p>`;
    }

    showErrorMessage(value, message) {
        value.after(this.createWrongLabel(message));
    }

    deleteErrorMessage(value) {
        value.siblings().remove('.wrong-value')
    }

    deleteAllErrorMessage(x, y, r) {
        x.siblings().remove('.wrong-value');
        y.siblings().remove('.wrong-value');
        r.siblings().remove('.wrong-value');
    }

}