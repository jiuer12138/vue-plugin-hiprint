import $ from "jquery";
import i18n from "@/demo/design/i18nUtil";
const defaultConfig = window.HIPRINT_CONFIG
export default ( function () {
    function t() {
        this.name = "coordinate";
    }

    return t.prototype.createTarget = function (t, o) {
        var n = this;
        let labelUnit= 'pt'
        if (defaultConfig.positionUnitMM) {
            labelUnit='mm'
        }
        n.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">\n        ${i18n.__('位置坐标')}(${labelUnit})\n        </div>
          <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
          <input type="number" style="width:48%" placeholder="${i18n.__('X位置(左)')}" class="auto-submit" />\n
          <input type="number" style="width:48%" placeholder="${i18n.__('Y位置(上)')}" class="auto-submit" />\n
          </div>\n
          </div>`);
        n.syncLock = o.coordinateSync || false;
        n.createSyncLock(n.syncLock);
        return n.target;
    }, t.prototype.createSyncLock = function (t) {
        var n = this;
        n.lockTarget = n.syncLock ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`) : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
        n.lockTarget.click(function () {
            if (n.syncLock) {
                n.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
            } else {
                n.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
            }
            n.syncLock = !n.syncLock;
        })
        n.target.find("input:first").after(n.lockTarget);
        // 同步编辑...
        n.target.find("input:first").change(function () {
            if (n.syncLock) {
                n.target.find("input:last").val($(this).val())
            }
        });
        n.target.find("input:last").change(function () {
            if (n.syncLock) {
                n.target.find("input:first").val($(this).val())
            }
        });
        return n.lockTarget
    }, t.prototype.css = function (t) {
        if (t && t.length && this.target) {
            // 仅当前元素被选中才更新坐标位置, 以避免冲突
            if (('block' == t.find('.resize-panel').css('display') || t[0].className.includes('table')) && this.el == t) {
                var v = this.getValue();
                return t.css("left", v.left + "pt").css("top", v.top + "pt");
            }
        }
        return null;
    }, t.prototype.getValue = function () {
        var v = {
            coordinateSync: this.syncLock,
            left: 0,
            top: 0,
        }
        v.left = parseFloat(this.target.find("input:first").val() || 0)
        v.top = parseFloat(this.target.find("input:last").val() || 0)
        if (defaultConfig.positionUnitMM){
            v.left=hinnn.mm.toPt(v.left)
            v.top=hinnn.mm.toPt(v.top)
        }
        return v;
    }, t.prototype.setValue = function (t, el) {
        this.el = el.designTarget || el;
        if (defaultConfig.positionUnitMM){
            this.target.find("input:first").val(hinnn.pt.toMm(t.left));
            this.target.find("input:last").val(hinnn.pt.toMm(t.top));
        }else {
            this.target.find("input:first").val(t.left);
            this.target.find("input:last").val(t.top);
        }
    }, t.prototype.destroy = function () {
        this.target.remove();
    }, t;
}())
