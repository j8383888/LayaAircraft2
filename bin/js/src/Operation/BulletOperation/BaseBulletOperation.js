var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 所以子弹operation都继承此类
*/
var operation;
(function (operation) {
    var BaseBulletOperation = /** @class */ (function (_super) {
        __extends(BaseBulletOperation, _super);
        function BaseBulletOperation() {
            var _this = _super.call(this) || this;
            _this.OFFSET_Y = 20;
            return _this;
        }
        BaseBulletOperation.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
            this.setBornPos();
        };
        /*由于子弹初始化位置 不一定是跟飞机位置绑定 需要单独提出来 特殊处理时
          注:当子弹出生位置改变时 请重写此方法*/
        BaseBulletOperation.prototype.setBornPos = function () {
            if (this._gameObj.teamID == 0 /* MASTER */) {
                this._gameObj.pos(this._gameObj.varsData["host"].x, this._gameObj.varsData["host"].y - this.OFFSET_Y);
            }
            else if (this._gameObj.teamID == 1 /* ENEMY */) {
                this._gameObj.pos(this._gameObj.varsData["host"].x, this._gameObj.varsData["host"].y + this.OFFSET_Y);
            }
        };
        BaseBulletOperation.prototype.unregister = function () {
            _super.prototype.unregister.call(this);
        };
        return BaseBulletOperation;
    }(operation.BaseOperation));
    operation.BaseBulletOperation = BaseBulletOperation;
})(operation || (operation = {}));
//# sourceMappingURL=BaseBulletOperation.js.map