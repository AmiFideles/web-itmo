export class Validator {
    yValues;
    xMin;
    xMax;
    rMin;
    rMax;
    CHOOSE_X_LABEL = 'Необходимо выбрать Х';
    CHOOSE_Y_LABEL = 'Необходимо выбрать Y';
    CHOOSE_R_LABEL = 'Необходимо выбрать R';
    WRONG_Y_LABEL = 'Y должен входить в {-2,-1.5,-1,-0.5,0,0.5,1,1.5,2}';
    WRONG_X_LABEL = 'X должен быть от -3 до 3';
    WRONG_R_LABEL = 'R должен быть от 2 до 5';


    constructor(xMin,xMax, yValues, rMin,rMax) {
        this.xMin=xMin;
        this.xMax=xMax;
        this.yValues=yValues;
        this.rMin = rMin;
        this.rMax = rMax;
    }

    isEmpty(value) {
        return value === null || value.trim().length === 0;
    }

    isNumber(value) {
        return !isNaN(value) || isFinite(value);
    }

    checkY(value) {
        return this.yValues.includes(value)
    }

    checkX(value) {
        return value >= this.xMin && value <= this.xMax;
    }

    checkR(value) {
        return value >= this.rMin && value <= this.rMax;
    }


    validateX(xValue) {
        return !this.isEmpty(xValue) && this.checkX(Number(xValue));
    }


    validateY(yValue) {
        return !this.isEmpty(yValue) && this.checkY(Number(yValue));
    }

    validateR(rValue) {
        return !this.isEmpty(rValue) && this.checkR(Number(rValue));
    }

    validateAllInputValues(xValue, yValue, rValue, xButton, yInput, rSelect, xButtons) {
        this.deleteAllErrorMessage(xButtons, yInput, rSelect);
        let valid = true;
        if (!this.validateX(xValue)) {
            if (this.isEmpty(xValue)){
                this.showErrorMessage(xButton, this.CHOOSE_X_LABEL)
            }else{
                this.showErrorMessage(xButton, this.WRONG_X_LABEL);
            }
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
            if (this.isEmpty(rValue)) {
                this.showErrorMessage(rSelect, this.CHOOSE_R_LABEL);
            } else {
                this.showErrorMessage(rSelect, this.WRONG_R_LABEL);
            }
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