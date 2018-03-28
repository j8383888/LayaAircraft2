/*
* name;
*/
var stage = Laya.stage;
var Point = laya.maths.Point;
var UIUtil = /** @class */ (function () {
    function UIUtil() {
    }
    UIUtil.inBorder = function (x, y) {
        if (x < -20 || x > Laya.stage.width) {
            return false;
        }
        if (y < -20 || y > Laya.stage.height) {
            return false;
        }
        return true;
    };
    UIUtil.STAGE_WIDTH = 480;
    UIUtil.STAGE_HEIGHT = 800;
    /*boss弹幕的中心点*/
    UIUtil.BossBulletBornPoint = new Point(UIUtil.STAGE_WIDTH / 2, 200);
    return UIUtil;
}());
//# sourceMappingURL=UIUtil.js.map