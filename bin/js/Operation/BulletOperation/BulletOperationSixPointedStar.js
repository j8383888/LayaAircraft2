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
            _this.curIndex = 0;
            /*六角星的半径*/
            _this.RADIUS = 120;
            /*X方向的增量*/
            _this.INCREMENT = 10;
            /*索引边界*/
            _this.INDEX_BORDER = Math.floor(Math.sqrt(3) / 2 * _this.RADIUS / _this.INCREMENT);
            /*当前X坐标*/
            _this._bornX = 0;
            /*当前Y坐标*/
            _this._bornY = 0;
            /*当前角度*/
            _this._curAngle = 0;
            /*圆形的半径*/
            _this._circleRadius = 200;
            return _this;
        }
        BulletOperationSixPointStar.prototype.register = function (gameObj) {
            this.curIndex = BulletOperationSixPointStar.index;
            BulletOperationSixPointStar.index++;
            _super.prototype.register.call(this, gameObj);
        };
        /*重写 初始化位置*/
        BulletOperationSixPointStar.prototype.setBornPos = function () {
            this.drawSixPointStar();
        };
        BulletOperationSixPointStar.prototype.unregister = function () {
            BulletOperationSixPointStar.index = 0;
            _super.prototype.unregister.call(this);
        };
        BulletOperationSixPointStar.prototype.drawSixPointStar = function () {
            if (this.curIndex >= 0 && this.curIndex <= this.INDEX_BORDER) {
                this._bornX = this.curIndex * this.INCREMENT;
                this._bornY = Math.sqrt(3) * this._bornX - this.RADIUS;
            }
            else if (this.curIndex > this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 2) {
                this._bornX = Math.sqrt(3) / 2 * this.RADIUS - (this.curIndex - this.INDEX_BORDER) * this.INCREMENT * 2;
                this._bornY = 1 / 2 * this.RADIUS;
            }
            else if (this.curIndex > 2 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 3) {
                this._bornX = -Math.sqrt(3) / 2 * this.RADIUS + (this.curIndex - this.INDEX_BORDER * 2) * this.INCREMENT;
                this._bornY = -Math.sqrt(3) * this._bornX - this.RADIUS;
            }
            else if (this.curIndex > 3 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 4) {
                this._bornX = -Math.sqrt(3) / 2 * this.RADIUS + (this.curIndex - this.INDEX_BORDER * 3) * this.INCREMENT * 2;
                this._bornY = -1 / 2 * this.RADIUS;
            }
            else if (this.curIndex > 4 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 5) {
                this._bornX = Math.sqrt(3) / 2 * this.RADIUS - (this.curIndex - this.INDEX_BORDER * 4) * this.INCREMENT;
                this._bornY = -Math.sqrt(3) * this._bornX + this.RADIUS;
            }
            else if (this.curIndex > 5 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 6) {
                this._bornX = -(this.curIndex - this.INDEX_BORDER * 5) * this.INCREMENT;
                this._bornY = Math.sqrt(3) * this._bornX + this.RADIUS;
            }
            else {
            }
            this._gameObj.x = this._bornX + UIUtil.BossBulletBornPoint.x;
            this._gameObj.y = this._bornY + UIUtil.BossBulletBornPoint.y;
            manager.BulletManager.instance.sixPointStarBox.push(this._gameObj);
            /*判断是否六角星绘制完成 TODO*/
            if (this.curIndex + 1 > this.INDEX_BORDER * 6) {
                manager.EventManager.instance.dispatchEvent(manager.EventManager.Remove_Host_All_Bullets, this._gameObj.varsData["host"]);
                for (var i = 0; i < manager.BulletManager.instance.sixPointStarBox.length; i++) {
                    var circleIntervel = 360 / this.curIndex;
                    this._curAngle += Math.PI / 180 * circleIntervel;
                    var targetX = Math.cos(this._curAngle) * this._circleRadius + UIUtil.BossBulletBornPoint.x;
                    var targetY = Math.sin(this._curAngle) * this._circleRadius + UIUtil.BossBulletBornPoint.y;
                    Laya.Tween.to(manager.BulletManager.instance.sixPointStarBox[i], { x: targetX, y: targetY }, 5000, Laya.Ease.linearOut, laya.utils.Handler.create(this, this.onTweenComplete));
                }
            }
        };
        BulletOperationSixPointStar.prototype.onTweenComplete = function () {
            manager.BulletManager.instance.sixPointStarBox.slice(0, 1);
        };
        /*子弹索引*/
        BulletOperationSixPointStar.index = 0;
        return BulletOperationSixPointStar;
    }(operation.BaseBulletOperation));
    operation.BulletOperationSixPointStar = BulletOperationSixPointStar;
})(operation || (operation = {}));
//# sourceMappingURL=BulletOperationSixPointedStar.js.map