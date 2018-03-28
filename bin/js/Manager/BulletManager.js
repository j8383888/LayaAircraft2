/*
* name;
*/
var manager;
(function (manager) {
    var BulletManager = /** @class */ (function () {
        function BulletManager() {
            this._hostToBulletsDic = new Dictionary();
            this._allBulletsDic = new Dictionary();
        }
        Object.defineProperty(BulletManager, "instance", {
            /*获取单例*/
            get: function () {
                if (this._instance == null) {
                    this._instance = new BulletManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /*初始化子弹管理器*/
        BulletManager.prototype.initBulletManager = function () {
            Laya.timer.frameLoop(1, this, this.startCreatBullet);
            this.sixPointStarBox = new Array();
            manager.EventManager.instance.addEventListener(manager.EventManager.Remove_Host_All_Bullets, this, this.removeHostAllBullets);
        };
        /*反初始化*/
        BulletManager.prototype.uninitBulletManager = function () {
            manager.EventManager.instance.removeEventListener(manager.EventManager.Remove_Host_All_Bullets, this, this.removeHostAllBullets);
            for (var i = 0; i < this._allBulletsDic.values.length; i++) {
                gameObject.GameObjectFactory.instance.disposeGameObject(this._allBulletsDic.values[i]);
            }
            if (this.sixPointStarBox != null) {
                this.sixPointStarBox.slice(0, this.sixPointStarBox.length);
                this.sixPointStarBox = null;
            }
            this._hostToBulletsDic.clear();
            this._allBulletsDic.clear();
            Laya.timer.clearAll(this);
        };
        /*开始制造子弹*/
        BulletManager.prototype.startCreatBullet = function () {
            if (this._hostToBulletsDic.keys.length == 0 || this._hostToBulletsDic == null || this._hostToBulletsDic.values.length == 0) {
                return;
            }
            for (var i = 0; i < this._hostToBulletsDic.keys.length; i++) {
                if (this._hostToBulletsDic.values[i] == null || this._hostToBulletsDic.values[i] == undefined) {
                    console.assert(false, "该飞机上没有子弹数据！请检查");
                }
                var bulletDataAryLen = this._hostToBulletsDic.values[i].length;
                for (var j = 0; j < bulletDataAryLen; j++) {
                    /*进行两次判断是因为 可能子弹移除的瞬间 仍在循环制造子弹而无法读取长度报错*/
                    if (this._hostToBulletsDic.values[i] == undefined) {
                        continue;
                    }
                    var data = this._hostToBulletsDic.values[i][j];
                    if (Laya.timer.currFrame > data["interval"] * data["totalWaveNum"]) {
                        continue;
                    }
                    if (Laya.timer.currFrame % data["interval"] == 0) {
                        for (var k = 0; k < data["bulletNumPerWave"]; k++) {
                            var bullet = gameObject.GameObjectFactory.instance.creatGameObject(GameObjectEnum.TEXTURE_FLAG, GameObjectEnum.BULLET, data["kind"], data["status"], data["team"], { host: this._hostToBulletsDic.keys[i], operationID: data["operation"] });
                            this._allBulletsDic.set(bullet.uID, bullet);
                        }
                    }
                }
            }
        };
        /*添加一种子弹*/
        BulletManager.prototype.addBullet = function (host, bulletData) {
            var bulletDataAry = this._hostToBulletsDic.get(host);
            if (bulletDataAry == null) {
                bulletDataAry = new Array();
            }
            bulletDataAry.push(bulletData);
            this._hostToBulletsDic.set(host, bulletDataAry);
        };
        /*移除飞机上所有子弹*/
        BulletManager.prototype.removeHostAllBullets = function (host) {
            if (this._hostToBulletsDic.keys.indexOf(host) != -1) {
                this._hostToBulletsDic.remove(host);
            }
        };
        /*移除一枚子弹*/
        BulletManager.prototype.removeBulletByID = function (ID) {
            this._hostToBulletsDic.remove(ID);
        };
        return BulletManager;
    }());
    manager.BulletManager = BulletManager;
})(manager || (manager = {}));
//# sourceMappingURL=BulletManager.js.map