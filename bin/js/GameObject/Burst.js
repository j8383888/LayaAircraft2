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
* name
*/
var gameObject;
(function (gameObject) {
    var Burst = /** @class */ (function (_super) {
        __extends(Burst, _super);
        function Burst() {
            return _super.call(this) || this;
        }
        Burst.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        Burst.prototype.setPos = function (x, y) {
            this.pos(x, y);
        };
        /*反初始化*/
        Burst.prototype.uninitialize = function () {
            _super.prototype.uninitialize.call(this);
        };
        Burst.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return Burst;
    }(gameObject.GameObjectEx));
    gameObject.Burst = Burst;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Burst.js.map