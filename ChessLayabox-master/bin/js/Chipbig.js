var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var Chipbig = /** @class */ (function (_super) {
    __extends(Chipbig, _super);
    function Chipbig() {
        return _super.call(this) || this;
    }
    Chipbig.prototype.setMoney = function (money) {
        this.moneynum = money;
    };
    return Chipbig;
}(ui.chipbigUI));
//# sourceMappingURL=Chipbig.js.map