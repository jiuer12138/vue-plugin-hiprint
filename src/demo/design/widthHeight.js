import $ from "jquery";
import i18n from "@/demo/design/i18nUtil";

const defaultConfig = window.HIPRINT_CONFIG
export default (function () {
    function t() {
        this.name = "widthHeight";
    }

    return t.prototype.createTarget = function (t, o) {
        var n = this;
        let labelUnit = 'pt'
        if (defaultConfig.sizeBoxUnitMM) {
            labelUnit = 'mm'
        }
        n.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
          <div class="hiprint-option-item-label">\n        ${i18n.__('宽高大小')}(${labelUnit})\n        </div>
          <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">\n
          <input type="number" style="width:48%" placeholder="${i18n.__('宽')}" class="auto-submit" />\n
          <input type="number" style="width:48%" placeholder="${i18n.__('高')}" class="auto-submit" />\n
          </div>\n
          </div>`);
        n.syncLock = o.widthHeightSync || false;
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
            // 仅当前元素被选中才更新宽高大小, 以避免冲突
            if (('block' == t.find('.resize-panel').css('display') || t[0].className.includes('table')) && this.el == t) {
                var v = this.getValue();
                //获取sizeBox
                let idx
                for (let i = 0; i < this.el?.children().length; i++) {
                    if (this.el?.children()[i].className === "resize-panel selected") {
                        idx = i
                        break
                    }
                }
                const sizeBox = this.el?.children()[idx]?.children[0]
                if (sizeBox) {
                    if (defaultConfig.sizeBoxUnitMM) {
                        sizeBox.innerHTML = hinnn.pt.toMm(v.width) + 'mm' + ' x ' + hinnn.pt.toMm(v.height) + 'mm'
                    } else {
                        sizeBox.innerHTML = (v.width + 'pt' + ' x ' + v.height + 'pt')
                    }
                }
                return t.css("width", v.width + "pt").css("height", v.height + "pt");
            }
        }
        return null;
    }, t.prototype.getValue = function () {
        var v = {
            widthHeightSync: this.syncLock,
            width: 0,
            height: 0,
        }
        v.width = parseFloat(this.target.find("input:first").val() || 0)
        v.height = parseFloat(this.target.find("input:last").val() || 0)
        if (defaultConfig.sizeBoxUnitMM) {
            v.width = hinnn.mm.toPt(v.width)
            v.height = hinnn.mm.toPt(v.height)
        }
        return v;
    }, t.prototype.setValue = function (t, el) {
        this.el = el.designTarget || el;
        if (defaultConfig.sizeBoxUnitMM) {
            this.target.find("input:first").val(hinnn.pt.toMm(t.width));
            this.target.find("input:last").val(hinnn.pt.toMm(t.height));
        } else {
            this.target.find("input:first").val(t.width);
            this.target.find("input:last").val(t.height);
        }
    }, t.prototype.destroy = function () {
        this.target.remove();
    }, t;
}())
