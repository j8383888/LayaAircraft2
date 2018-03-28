/*
* name;
*/
module manager{
    export class EventManager extends laya.events.EventDispatcher{
        /*敌人被摧毁事件*/
        public static ENEMY_ON_DESTORY:string = "enemy_on_destory";
        /*master被子弹击中事件*/
		public static MASTER_ON_HIT:string = "master_on_hit";
        /*停止制造某架飞机上的所有子弹 并移除该飞机上所有子弹数据*/
        public static Remove_Host_All_Bullets:string = "Remove_Host_All_Bullets";
        /*单例*/
        private static _instance:EventManager;

        constructor(){
            super();
        }

         public static get instance():EventManager{
            if(this._instance == null){
                this._instance = new EventManager();
            }
            return this._instance;
        }

        public dispatchEvent(event:string,data:any):void{
			this.event(event,data);
		}

		public addEventListener(event:string,caller: any, listener: Function, args?: Array<any>):void{
			this.on(event, caller, listener, args);
		}

		public removeEventListener(event:string,caller: any, listener: Function, onceOnly?: boolean):void{
			this.off(event, caller, listener, onceOnly);
		}
    }
}