/*
* name;
*/
module operation{
    import Point = laya.maths.Point;
    export class BulletOperationSixPointStar extends BaseBulletOperation{

        /*子弹索引*/
        private static index:number = 0;
        /*当前的索引*/
        private curIndex:number = 0
        /*六角星的半径*/
        private readonly RADIUS:number = 120;    
        /*X方向的增量*/
        private readonly INCREMENT:number = 10;
        /*索引边界*/
        private readonly INDEX_BORDER:number = Math.floor(Math.sqrt(3)/2 * this.RADIUS / this.INCREMENT);
        /*当前X坐标*/ 
        private _bornX:number = 0; 
        /*当前Y坐标*/ 
        private _bornY:number = 0;
        /*当前角度*/
		private _curAngle:number = 0;
        /*圆形的半径*/
		private readonly _circleRadius:number = 200;

        constructor(){
            super();
        }

        public register(gameObj:gameObject.GameObject):void {
            this.curIndex = BulletOperationSixPointStar.index; 
            BulletOperationSixPointStar.index++;  
            super.register(gameObj);                     				         
        }

        /*重写 初始化位置*/
        public setBornPos():void{
            this.drawSixPointStar();
        }

        public unregister():void{
            BulletOperationSixPointStar.index = 0;
            super.unregister();       
        }

        public drawSixPointStar():void{
            
            if(this.curIndex >= 0 &&  this.curIndex <= this.INDEX_BORDER){
                this._bornX = this.curIndex * this.INCREMENT;
                this._bornY = Math.sqrt(3) * this._bornX - this.RADIUS;
            } 
            else if(this.curIndex > this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 2){
                this._bornX = Math.sqrt(3)/2 * this.RADIUS - (this.curIndex - this.INDEX_BORDER) * this.INCREMENT * 2;
                this._bornY = 1/2 * this.RADIUS;
            }
            else if(this.curIndex > 2 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 3){
                this._bornX = - Math.sqrt(3)/2 * this.RADIUS + (this.curIndex - this.INDEX_BORDER * 2) * this.INCREMENT;
                this._bornY = - Math.sqrt(3) * this._bornX - this.RADIUS;
            }
            /*绘制反三角形*/
            else if(this.curIndex > 3 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 4){
                this._bornX = - Math.sqrt(3)/2 * this.RADIUS + (this.curIndex - this.INDEX_BORDER * 3) * this.INCREMENT * 2;
                this._bornY = - 1/2 * this.RADIUS;
            }
            else if(this.curIndex > 4 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 5){
                this._bornX = Math.sqrt(3)/2 * this.RADIUS - (this.curIndex - this.INDEX_BORDER * 4) * this.INCREMENT;
                this._bornY = - Math.sqrt(3) *  this._bornX + this.RADIUS
            }
            else if(this.curIndex > 5 * this.INDEX_BORDER && this.curIndex <= this.INDEX_BORDER * 6){
                this._bornX = - (this.curIndex - this.INDEX_BORDER * 5) * this.INCREMENT;
                this._bornY = Math.sqrt(3) * this._bornX + this.RADIUS
            }         
            else {
                 
            }
            
            this._gameObj.x = this._bornX + UIUtil.BossBulletBornPoint.x;
            this._gameObj.y = this._bornY + UIUtil.BossBulletBornPoint.y;
            manager.BulletManager.instance.sixPointStarBox.push(this._gameObj);
            /*判断是否六角星绘制完成 TODO*/
            if(this.curIndex + 1 > this.INDEX_BORDER * 6){
                manager.EventManager.instance.dispatchEvent(manager.EventManager.Remove_Host_All_Bullets,this._gameObj.varsData["host"]);
                for(var i:number = 0; i< manager.BulletManager.instance.sixPointStarBox.length; i++){
                    var circleIntervel = 360 / this.curIndex;
                    this._curAngle += Math.PI / 180 * circleIntervel;
                    var targetX:number = Math.cos(this._curAngle) * this._circleRadius + UIUtil.BossBulletBornPoint.x;
                    var targetY:number = Math.sin(this._curAngle) * this._circleRadius + UIUtil.BossBulletBornPoint.y;
                    Laya.Tween.to(manager.BulletManager.instance.sixPointStarBox[i],{x:targetX,y:targetY},5000,Laya.Ease.linearOut,laya.utils.Handler.create(this,this.onTweenComplete));          
                }
            }                    
        }

        private onTweenComplete():void{
            if(manager.BulletManager.instance.sixPointStarBox != null){
                manager.BulletManager.instance.sixPointStarBox.slice(0,1);
            }
        }
    }
}