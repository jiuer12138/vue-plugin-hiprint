import $ from "jquery";
const i18n = window.HIPRINT_I18N
const defaultConfig = window.HIPRINT_CONFIG

export default (function () {
    function t() {
        this.name = "leftOffset";
    }

    return t.prototype.createTarget = function () {
        let unit = 'pt'
        if (defaultConfig.leftOffsetMM){
            unit = 'mm'
        }
        return this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">\n        <div class="hiprint-option-item-label">\n        ${i18n.__('左偏移')}\n        </div>\n        <div class="hiprint-option-item-field">\n        <input type="text" placeholder="${i18n.__('偏移量')}${unit}" class="auto-submit" >\n        </div>\n    </div>`), this.target;
    }, t.prototype.getValue = function () {
        var t = this.target.find("input").val();
        if (t) {
            if (defaultConfig.leftOffsetMM ){
                return hinnn.mm.toPt(parseFloat(t.toString()))
            }
            return parseFloat(t.toString())
        }
    }, t.prototype.setValue = function (t) {
        if (defaultConfig.leftOffsetMM && t){
            t=hinnn.pt.toMm(t)
        }
        this.target.find("input").val(t);
    }, t.prototype.destroy = function () {
        this.target.remove();
    }, t;
}())
