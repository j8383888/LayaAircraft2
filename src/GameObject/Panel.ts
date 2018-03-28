/**
* 所有飞机物体的基类
*/
module gameObject{
	export class Panel extends GameObjectTexture{

		/*当前飞机已经有子弹数据*/
		private _bulletDataAry:Array<Object> = null;

		constructor(){		
			super();
		}

		/*初始化*/
		public initialize():void{
			super.initialize();
		}

		public setPos(x:number,y:number):void{
			this.pos(x,y);			
		}

		/*反初始化*/
		public uninitialize():void{	
			if(this._bulletDataAry != null){
				for(var i:number; i<this._bulletDataAry.length; i++)
				{
					this._bulletDataAry[i] = null;				
				}
				this._bulletDataAry.slice(0,this._bulletDataAry.length);
				this._bulletDataAry = null;
			}		
			this.removeAllBullets();
			super.uninitialize();	
		} 

		public dispose():void{		
			super.dispose();	
		}

		/*添加一种子弹 未来需要移到bulletManager*/
		/*	bulletKind bulletState(前两个控制美术资源) 
			operationID(子弹行动路径)
			intervalFrame(每波子弹间隔帧数)
			bulletNumPerWave(每波子弹的数量)
			totalWaveNum(总共子弹的波数)
		*/
		public addBullet(bulletKind:number,bulletState:number,operationID:number,intervalFrame:number,bulletNumPerWave:number = 1,totalWaveNum:number = Number.MAX_VALUE):void{
			if(this._bulletDataAry == null){
				this._bulletDataAry = new Array<Object>();
			}
			/*比对是否有相同类型的子弹*/
			var bulletData:Object = {kind:bulletKind,status:bulletState,team:this._teamID,operation:operationID,
										interval:intervalFrame,bulletNumPerWave:bulletNumPerWave,totalWaveNum:totalWaveNum}
			var len = this._bulletDataAry.length;
			if(len != 0){				
				for(var i:number = 0; i<len; i++){
					if(this._bulletDataAry[i] == bulletData){
						return;
					}
				}
			}
			this._bulletDataAry.push(bulletData);
			manager.BulletManager.instance.addBullet(this,bulletData);          		
		}

		
		/*移除飞机上的所有子弹数据*/
        public removeAllBullets(){
			manager.BulletManager.instance.removeHostAllBullets(this);
        }

		/*获取当前飞机上的子弹数据*/
		public get bulletDataAry():Object{
			return this._bulletDataAry;
		}
	}
}