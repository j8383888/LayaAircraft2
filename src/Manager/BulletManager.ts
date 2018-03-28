/*
* name;
*/
module manager{
    export class BulletManager{
        /*单例*/
        private static _instance:BulletManager;
        /*场景内所有子弹数据字典 key宿主对象 value子弹数组*/
        private _hostToBulletsDic:Dictionary;
        /*场景内所有的子弹 跟表现绑定 key子弹ID value子弹*/
        private _allBulletsDic:Dictionary;
        /*六角星盒子 BulletOperationSixPointedStar*/
        public sixPointStarBox:Array<gameObject.GameObject>;
        
        constructor(){
            this._hostToBulletsDic = new Dictionary();
            this._allBulletsDic = new Dictionary();
            
        }

       /*获取单例*/
        public static get instance():BulletManager{
            if(this._instance == null){
                this._instance = new BulletManager();
            }
            return this._instance;
        }

        /*初始化子弹管理器*/
        public initBulletManager():void{ 
            Laya.timer.frameLoop(1,this,this.startCreatBullet); 
            this.sixPointStarBox = new Array<gameObject.GameObject>();
            manager.EventManager.instance.addEventListener(manager.EventManager.Remove_Host_All_Bullets,this,this.removeHostAllBullets);     
        }

        /*反初始化*/
        public uninitBulletManager():void{
            manager.EventManager.instance.removeEventListener(manager.EventManager.Remove_Host_All_Bullets,this,this.removeHostAllBullets); 
            for(var i:number = 0; i<this._allBulletsDic.values.length; i++){    
                gameObject.GameObjectFactory.instance.disposeGameObject(this._allBulletsDic.values[i]);
            }
            if(this.sixPointStarBox != null){
                this.sixPointStarBox.slice(0,this.sixPointStarBox.length);
                this.sixPointStarBox = null;
            }
            this._hostToBulletsDic.clear();
            this._allBulletsDic.clear();
            Laya.timer.clearAll(this);
        }

        /*开始制造子弹*/
		private startCreatBullet():void{
            if(this._hostToBulletsDic.keys.length == 0 || this._hostToBulletsDic == null || this._hostToBulletsDic.values.length == 0){
                return;
            }
            for(var i:number = 0; i<this._hostToBulletsDic.keys.length; i++){
                if(this._hostToBulletsDic.values[i] == null || this._hostToBulletsDic.values[i] == undefined){
                    console.assert(false,"该飞机上没有子弹数据！请检查");
                }
                var bulletDataAryLen:number = this._hostToBulletsDic.values[i].length;
                for(var j:number = 0; j<bulletDataAryLen; j++){
                    /*进行两次判断是因为 可能子弹移除的瞬间 仍在循环制造子弹而无法读取长度报错*/
                    if(this._hostToBulletsDic.values[i] == undefined){
                        continue;
                    }
                    var data:Object =  this._hostToBulletsDic.values[i][j]
                    if(Laya.timer.currFrame > data["interval"] * data["totalWaveNum"]){
                        continue;
                    }
                    if(Laya.timer.currFrame % data["interval"] == 0){
                        for(var k:number = 0; k<data["bulletNumPerWave"]; k++){
                        var bullet:gameObject.Bullet = gameObject.GameObjectFactory.instance.creatGameObject
                                        (GameObjectEnum.TEXTURE_FLAG,GameObjectEnum.BULLET,data["kind"],
                                        data["status"],data["team"],{host:this._hostToBulletsDic.keys[i],operationID:data["operation"]});
                        this._allBulletsDic.set(bullet.uID,bullet);                 
                        }
                    }                
                }
                
            }
        }


        /*添加一种子弹*/
        public addBullet(host:gameObject.GameObject,bulletData:Object):void{
            var bulletDataAry:Array<Object> = this._hostToBulletsDic.get(host)
            if(bulletDataAry == null){
                bulletDataAry = new Array<Object>();          
            }
            bulletDataAry.push(bulletData);
            this._hostToBulletsDic.set(host,bulletDataAry);       
        }

        /*移除飞机上所有子弹*/
        public removeHostAllBullets(host:gameObject.GameObject):void{
            if(this._hostToBulletsDic.keys.indexOf(host) != -1){
                this._hostToBulletsDic.remove(host);
            }
        }

        /*移除一枚子弹*/
        public removeBulletByID(ID:number):void{
            this._hostToBulletsDic.remove(ID);
        }
    }
}