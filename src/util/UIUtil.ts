/*
* name;
*/
import stage = Laya.stage;
import Point = laya.maths.Point;
class UIUtil{
    
    public static readonly STAGE_WIDTH:number = 480;
    public static readonly STAGE_HEIGHT:number = 800;
    /*boss弹幕的中心点*/
    public static BossBulletBornPoint:Point = new Point(UIUtil.STAGE_WIDTH /2 , 200);

    constructor(){
        
    }
    public static inBorder(x:number,y:number):Boolean{
        if(x < -20|| x > Laya.stage.width){
            return false
        }
        if(y < -20 || y > Laya.stage.height){
            return false;
        }
        return true;
    }
}