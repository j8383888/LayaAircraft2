/**
* 所以子弹operation都继承此类
*/
module operation{
	export class BaseBulletOperation extends BaseOperation{

		private readonly OFFSET_Y:number = 20;

		constructor(){
			super();
		}

		public register(gameObj:gameObject.GameObject):void {
            super.register(gameObj);
			this.setBornPos();
        }

		/*由于子弹初始化位置 不一定是跟飞机位置绑定 需要单独提出来 特殊处理时 
		  注:当子弹出生位置改变时 请重写此方法*/
		public setBornPos():void{
			if(this._gameObj.teamID == TEAM.MASTER){
				this._gameObj.pos(this._gameObj.varsData["host"].x, this._gameObj.varsData["host"].y - this.OFFSET_Y);
			}
			else if(this._gameObj.teamID == TEAM.ENEMY){
				this._gameObj.pos(this._gameObj.varsData["host"].x, this._gameObj.varsData["host"].y + this.OFFSET_Y);
			}		
		}			

        public unregister():void{           
            super.unregister();
        }
	}
}