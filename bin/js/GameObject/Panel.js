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
* 所有飞机物体的基类
*/
var gameObject;
(function (gameObject) {
    var Panel = /** @class */ (function (_super) {
        __extends(Panel, _super);
        function Panel() {
            var _this = _super.call(this) || this;
            /*当前飞机已经有子弹数据*/
            _this._bulletDataAry = null;
            return _this;
        }
        /*初始化*/
        Panel.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        Panel.prototype.setPos = function (x, y) {
            this.pos(x, y);
        };
        /*反初始化*/
        Panel.prototype.uninitialize = function () {
            if (this._bulletDataAry != null) {
                for (var i; i < this._bulletDataAry.length; i++) {
                    this._bulletDataAry[i] = null;
                }
                this._bulletDataAry.slice(0, this._bulletDataAry.length);
                this._bulletDataAry = null;
            }
            this.removeAllBullets();
            _super.prototype.uninitialize.call(this);
        };
        Panel.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /*添加一种子弹 未来需要移到bulletManager*/
        /*	bulletKind bulletState(前两个控制美术资源)
            operationID(子弹行动路径)
            intervalFrame(每波子弹间隔帧数)
            bulletNumPerWave(每波子弹的数量)
            totalWaveNum(总共子弹的波数)
        */
        Panel.prototype.addBullet = function (bulletKind, bulletState, operationID, intervalFrame, bulletNumPerWave, totalWaveNum) {
            if (bulletNumPerWave === void 0) { bulletNumPerWave = 1; }
            if (totalWaveNum === void 0) { totalWaveNum = Number.MAX_VALUE; }
            if (this._bulletDataAry == null) {
                this._bulletDataAry = new Array();
            }
            /*比对是否有相同类型的子弹*/
            var bulletData = { kind: bulletKind, status: bulletState, team: this._teamID, operation: operationID,
                interval: intervalFrame, bulletNumPerWave: bulletNumPerWave, totalWaveNum: totalWaveNum };
            var len = this._bulletDataAry.length;
            if (len != 0) {
                for (var i = 0; i < len; i++) {
                    if (this._bulletDataAry[i] == bulletData) {
                        return;
                    }
                }
            }
            this._bulletDataAry.push(bulletData);
            manager.BulletManager.instance.addBullet(this, bulletData);
        };
        /*移除飞机上的所有子弹数据*/
        Panel.prototype.removeAllBullets = function () {
            manager.BulletManager.instance.removeHostAllBullets(this);
        };
        Object.defineProperty(Panel.prototype, "bulletDataAry", {
            /*获取当前飞机上的子弹数据*/
            get: function () {
                return this._bulletDataAry;
            },
            enumerable: true,
            configurable: true
        });
        return Panel;
    }(gameObject.GameObjectTexture));
    gameObject.Panel = Panel;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Panel.js.map