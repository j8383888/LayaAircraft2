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
/*
* name;
*/
var operation;
(function (operation) {
    var BulletOperationSixPointStar = /** @class */ (function (_super) {
        __extends(BulletOperationSixPointStar, _super);
        function BulletOperationSixPointStar() {
            var _this = _super.call(this) || this;
            /*当前的索引*/
            _this.index = 0;
            /*六角星的半径*/
            _this.RADIUS = 120;
            /*X方向的增量*/
            _this.INCREMENT = 10;
            /*索引边界*/
            _this.indexBorder = Math.floor(Math.sqrt(3) / 2 * _this.RADIUS / _this.INCREMENT);
            /*当前X坐标*/
            _this._posX = 0;
            /*当前Y坐标*/
            _this._posY = 0;
            return _this;
        }
        BulletOperationSixPointStar.prototype.register = function (gameObj) {
            this.index = BulletOperationSixPointStar.index;
            BulletOperationSixPointStar.index++;
            _super.prototype.register.call(this, gameObj);
        };
        BulletOperationSixPointStar.prototype.setBornPos = function () {
            this.drawStar();
        };
        BulletOperationSixPointStar.prototype.unregister = function () {
            BulletOperationSixPointStar.index = 0;
            _super.prototype.unregister.call(this);
        };
        BulletOperationSixPointStar.prototype.drawStar = function () {
            /*判断是否六角星绘制完成*/
            if (this.index > this.indexBorder * 6) {
                manager.EventManager.instance.dispatchEvent(manager.EventManager.Remove_Host_All_Bullets, this._gameObj.varsData["host"]);
                return;
            }
            if (this.index >= 0 && this.index <= this.indexBorder) {
                this._posX = this.index * this.INCREMENT;
                this._posY = Math.sqrt(3) * this._posX + this.RADIUS;
            }
            else if (this.index > this.indexBorder && this.index <= this.indexBorder * 2) {
                this._posX = Math.sqrt(3) / 2 * this.RADIUS - (this.index - this.indexBorder) * this.INCREMENT * 2;
                this._posY = Math.sqrt(3) * this.indexBorder * this.INCREMENT + this.RADIUS;
            }
            else if (this.index > 2 * this.indexBorder && this.index <= this.indexBorder * 3) {
                this._posX = -Math.sqrt(3) / 2 * this.RADIUS + (this.index - this.indexBorder * 2) * this.INCREMENT;
                this._posY = -Math.sqrt(3) * this._posX + this.RADIUS;
            }
            else if (this.index > 3 * this.indexBorder && this.index <= this.indexBorder * 4) {
                this._posX = -Math.sqrt(3) / 2 * this.RADIUS + (this.index - this.indexBorder * 3) * this.INCREMENT * 2;
                this._posY = Math.sqrt(3) * this.indexBorder * this.INCREMENT; //+ this.RADIUS - this.RADIUS;
            }
            else if (this.index > 4 * this.indexBorder && this.index <= this.indexBorder * 5) {
                this._posX = Math.sqrt(3) / 2 * this.RADIUS - (this.index - this.indexBorder * 4) * this.INCREMENT;
                this._posY = Math.sqrt(3) * this.indexBorder * this.INCREMENT * 2 - (Math.sqrt(3) * this._posX);
            }
            else if (this.index > 5 * this.indexBorder && this.index <= this.indexBorder * 6) {
                this._posX = -(this.index - this.indexBorder * 5) * this.INCREMENT;
                this._posY = Math.sqrt(3) * this.indexBorder * this.INCREMENT * 2 + (Math.sqrt(3) * this._posX);
            }
            else {
            }
            this._gameObj.x = this._posX + 200;
            this._gameObj.y = this._posY;
        };
        /*子弹索引*/
        BulletOperationSixPointStar.index = 0;
        return BulletOperationSixPointStar;
    }(operation.BaseBulletOperation));
    operation.BulletOperationSixPointStar = BulletOperationSixPointStar;
})(operation || (operation = {}));
//# sourceMappingURL=BulletOperationFivePointedStar.js.map