$(function(){
	var canvas=$('canvas').get(0);
	var ctx = canvas.getContext('2d');
	var sep=40;//每个格子宽度
	var sR=3;//小圆半径
	var bR=18;//棋子半径
	//audio
	var audio1=$("#audio").get(0);
    var audio2=$("#audio1").get(0);
	var AI=false; 
	var gameState="pause"  //游戏状态
	var kongbai={};        //
	
	//	javascript中所有写在.后面的都当字符串处理
	//	取值都是[],.只是一个简写。
	//toDataURL()
	//把画布中所有的像素，转化为图片，浏览器中可用的图片，以字符串形式存储的图片。
	//download 自动下载
	//infinity 无穷大

	
	
	//进入游戏
	var page=$(".page");
	page.on("click",function(){
		page.css("display","none");
	})
	
	//控制按钮
	var start=$("#start");    //开始
	var end=$("#end");        //规则
//	var restart=$("#restart") //重新开始
	var out=$("#out")         //退出游戏
	 
	
	//小圆位置(倍数)
	function lam(x){
		return (x+0.5)*sep+0.5;
	}
	//封装函数(定义小圆)
	function circle(x,y,r){
		ctx.save();
		ctx.beginPath();
		ctx.arc(lam(x),lam(y),r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	
	//画棋盘
	function drawQipan(){
		ctx.save();
		ctx.clearRect(0,0,600,600);
		ctx.beginPath();
		for(var i=0;i<15;i++){
			//横线
			ctx.moveTo(lam(0),lam(i));
			ctx.lineTo(lam(14),lam(i));
			//竖线
			ctx.moveTo(lam(i),lam(0));
			ctx.lineTo(lam(i),lam(14));
		}
		ctx.closePath();
		ctx.stroke();//描边
		
		//画小圆
		circle(7,7,sR);
		circle(3,3,sR);
		circle(11,3,sR);
		circle(3,11,sR);
		circle(11,11,sR);
		
		ctx.restore();
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				kongbai[m(i,j)]=true;
			}
		}
	}
	drawQipan();
	
	//画棋子
	var qizi={};
	function luozi(x,y,r,color){
		ctx.save();
		ctx.translate(lam(x),lam(y));
		ctx.beginPath();
		ctx.arc(0,0,r,0,Math.PI*2);
		//棋子颜色（黑白）
		if(color==="black"){
			var g=ctx.createRadialGradient(-4,-4,0,0,0,50);
			g.addColorStop(0.1,"#999");
			g.addColorStop(0.4,"#000");
			g.addColorStop(1,"#000");
			ctx.fillStyle=g;
		}else{
			var g=ctx.createRadialGradient(-4,-4,0,0,0,50);
			g.addColorStop(0.1,"#fff");
			g.addColorStop(0.4,"#ddd");
			g.addColorStop(1,"#eee");
			ctx.fillStyle=g;
		}
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		qizi[x+"_"+y]=color;
		gameState="play";
		delete kongbai[m(x,y)];
	}

	//计时
	var time;
    var  min=0;
    var second=0;	
    var t;
    var tt;
		
	function jishi(){
        t=setInterval(function(){
            time +=1;
            second=time%60;
            if(time%60 == 0){
                min = parseInt(min);
                min += 1;
            }
        },1000);
        clearInterval(tt)
    }
	var times;
    var  mins=0; 
    var seconds=0;		
		
	function jishis(){
        tt=setInterval(function(){
            times +=1;
            seconds=times%60;
            if(times%60 == 0){
                mins = parseInt(min);
                mins += 1;
            }
        },1000);
        clearInterval(t)
    }

	//画表
	var canvas1 = document.getElementById("canvas1");
    var ctx1 = canvas1.getContext("2d");
  
    ctx1.save()
    ctx1.clearRect(0,0,180,180);
    function miao(){
    	ctx1.save()
    	ctx1.beginPath();
        ctx1.arc(0,0,5,0,Math.PI*2)
        ctx1.moveTo(0,5);
        ctx1.lineTo(0,10);
        ctx1.moveTo(0,-5);
        ctx1.lineTo(0,-45);
        ctx1.closePath();       	
        ctx1.stroke()
        ctx1.restore()
    }   
    function fen(){
    	ctx1.save()
    	ctx1.beginPath();
        ctx1.arc(0,0,5,0,Math.PI*2)
        ctx1.moveTo(0,5);
        ctx1.lineTo(0,7);
        ctx1.moveTo(0,-5);
        ctx1.lineTo(0,-35);
        ctx1.closePath();       	
        ctx1.stroke()
        ctx1.restore()
    }
    function pan(){
    	
    	ctx1.save()
    	for(var i=0;i<60;i++){
    		ctx1.beginPath();		
    		if(i%5==0){
    			ctx1.moveTo(0,-60);
    		}else{
    			ctx1.moveTo(0,-66);  			
    		}	
	        ctx1.lineTo(0,-70);
	        ctx1.rotate(Math.PI/30)
        	ctx1.closePath();   
        	ctx1.stroke()
    	}   	
    	ctx1.restore()
    }
    function renden(){
    	ctx1.translate(0,0)
    	ctx1.clearRect(0,0,180,180);
    	//秒
    	ctx1.save()
    	ctx1.translate(90,90)
    	pan()
    	var s=second;
    	ctx1.rotate(s*(2*Math.PI/60))
    	miao();    	
    	ctx1.restore()
    	//分
    	ctx1.save()
    	ctx1.translate(90,90)
    	pan()
    	var m=min;
    	ctx1.rotate((m*60+s)/3600*2*Math.PI); 	
    	fen();
    	ctx1.restore()
    	
    }    

    setInterval(renden,30)      
    ctx1.restore();
    
    
	var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext("2d");

	ctx2.save()
    ctx2.clearRect(0,0,180,180);
    function miao2(){
    	ctx2.save()
    	ctx2.beginPath();
        ctx2.arc(0,0,5,0,Math.PI*2)
        ctx2.moveTo(0,5);
        ctx2.lineTo(0,10);
        ctx2.moveTo(0,-5);
        ctx2.lineTo(0,-45);
        ctx2.closePath();       	
        ctx2.stroke()
        ctx2.restore()
    }   
    function fen2(){
    	ctx2.save()
    	ctx2.beginPath();
        ctx2.arc(0,0,5,0,Math.PI*2)
        ctx2.moveTo(0,5);
        ctx2.lineTo(0,7);
        ctx2.moveTo(0,-5);
        ctx2.lineTo(0,-35);
        ctx2.closePath();       	
        ctx2.stroke()
        ctx2.restore()
    }
    function pan2(){
    	
    	ctx2.save()
    	for(var i=0;i<60;i++){
    		ctx2.beginPath();		
    		if(i%5==0){
    			ctx2.moveTo(0,-60);
    		}else{
    			ctx2.moveTo(0,-66);  			
    		}	
	        ctx2.lineTo(0,-70);
	        ctx2.rotate(Math.PI/30)
        	ctx2.closePath();   
        	ctx2.stroke()
    	}   	
    	ctx2.restore()
    }
    function renden2(){
    	ctx2.translate(0,0)
    	ctx2.clearRect(0,0,180,180);
    	//秒
    	ctx2.save()
    	ctx2.translate(90,90)
    	pan2()
    	var s=seconds;
    	ctx2.rotate(s*(2*Math.PI/60))
    	miao2();    	
    	ctx2.restore()
    	//分
    	ctx2.save()
    	ctx2.translate(90,90)
    	pan2()
    	var m=mins;
    	ctx2.rotate((m*60+s)/3600*2*Math.PI); 	
    	fen2();
    	ctx2.restore()
    	
    }    

    setInterval(renden2,30)      
	ctx2.restore();
	
	//画棋谱
	 chessManual=function(){//全局变量
		ctx.save();
		ctx.font="20px/1 微软雅黑"; //字体大小
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		var i=1;
		for(var k in qizi){  
			var arr=k.split("_");
			if(qizi[k]==="white"){
				ctx.fillStyle="black";
			}else{
				ctx.fillStyle="white";
			}
			ctx.fillText(i++,lam(parseInt(arr[0])),lam(parseInt(arr[1]))); 
		}
		
		ctx.restore(); 
		$("#qipu").show();  //显示隐藏的棋谱
		$("<img>")//图片
		.attr("src",canvas.toDataURL()) //生成图片
		.appendTo("#qipu");
		$("<a>")
		.attr("href",canvas.toDataURL())
		.attr("download","qipu.png")    //生成图片自动下载
		.appendTo("#qipu")
	};
	
	
	//封装restart
	function restart(){
		$("#info").removeClass("active");
		drawQipan();
		$("#qipu").css("display","none");
		$(canvas).on("click",handleClick);
		kaiguan=true;
		qizi={};
		luozi();
		kongbai={}
		gameState='pause';
	}
	
	//开始游戏
	
	//重新开始
	$("#restart").on("click",restart);
	//游戏规则
	end.on("click",function(){
		alert("最先在棋盘中任何方向连成相同色五个棋子的一方为赢家");
	})
	
	//返回界面cancle
	$(".cancle").on("click",function(){
		window.location.reload();
	})
	//退出游戏
	$("#out").on("click"),function(){
		window.location.reload();
	}
	
	
	//关闭棋盘
	var close=$(".close");
	close.on("click",function(){
		$("#qipu").css("display","none");
//		drawQipan();
		for(var k in qizi){
			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			luozi(x,y,qizi[k]);
		}
	})
	
	//点击画布落子
	function m(x,y){
		return x+"_"+y;
	}
	var kaiguan=true;
	//
	function intel(){
		console.log(1)
		var max=-Infinity;
		var pos={};
		//棋盘上所有空白位置
		for(var k in kongbai){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			var m=panduan(x,y,"black");
			if(m>max){
				max=m;
				pos={x:x,y:y};
			}
		}
		var max2=-Infinity;
		var pos2={};
		for(var k in kongbai){
			var x=parseInt(k.split("_")[0]);
			var y=parseInt(k.split("_")[1]);
			var m=panduan(x,y,"white");
			if(m>max2){
				max2=m;
				pos2={x:x,y:y};
				
			}
		}
		
		if(max>max2){
			return pos;
		}else{
			return pos2;
		}
	}
	
	$(canvas).on("click",function(e){
		var x=Math.floor(e.offsetX/sep);
		var y=Math.floor(e.offsetY/sep);
		if(qizi[m(x,y)]){             
				return;
			}
		
		if(AI){
			luozi(x,y,bR,"black");
			if(panduan(x,y,"black")>=5){
				$(canvas).off("click");
				$("#info").addClass("active");
				$(".text").text("黑棋赢");
			};
			var p=intel();
			luozi(p.x,p.y,bR,"white");
			if(panduan(p.x,p.y,"white")>=5){
				$(canvas).off("click");
				$("#info").addClass("active");
				$(".text").text("白棋赢");
			}
			return false;
		}
		
		
		if(kaiguan){
			luozi(x,y,bR,"black");
			audio1.play();
			jishi();
			time=0;
			panduan(x,y,"black")
			console.log(panduan(x,y,"black"));
			if(panduan(x,y,"black")>=5){
				console.log("黑棋赢");	
				$(canvas).off("click");  //黑棋赢了就不能再点了
				chessManual();
				$("#info")
				 .find(".text").html("黑棋赢")
				 .end()
				 .addClass("active");
			}
		}else{
			luozi(x,y,bR,"white");
			audio2.play();
			jishis();
			times=0;
			panduan(x,y,"white")
			console.log(panduan(x,y,"white"));
			if(panduan(x,y,"white")>=5){
				console.log("白棋赢");
				$(canvas).off("click");  //白棋赢了就不能再点了
				chessManual();
				$("#info")
				 .find(".text").html("白棋赢")
				 .end()
				 .addClass("active");
			}
		}
		kaiguan=!kaiguan;
	})
	
//	$(canvas).on("click",handleClick);
	
	
	//人机对战
	$(".ai").on("click",function(){
		if(gameState==="play"){
			return;
		}
		$(".normal").removeClass("red");
		$(this).addClass("red");
		AI=true;
		console.log(kongbai);
	})
	
	//人人对战
	$(".normal").on("click",function(){
		if(gameState==="play"){
			return;
		}
		$(".ai").removeClass("red");
		$(this).addClass("red");
		AI=false;  
	})
	
	
	//判断输赢
	
	function m(a,b){    //连接  m=lianjie 
		return a+"_"+b;
	}
	function panduan(x,y,color){   
		//判断黑棋行
		var row=1;    //当前点下的那颗棋子          
		var i;
		i=1;
		while(qizi[m(x+i,y)]===color){ //黑棋x轴要加1，y轴不变
			row++;                        //棋子加几个
			i++;    					 //x轴加几
			
		}
		i=1;
		while(qizi[m(x-i,y)]===color){
			row++;
			i++;
		}
		 //判断黑棋列
		var lie=1;    //当前点下的那颗棋子        
		i=1;
		while(qizi[m(x,y-i)]===color){ //黑棋x不变，y轴加1
			lie++;                        //棋子加几个
			i++;                        //x轴加几
		}
		i=1;
		while(qizi[m(x,y+i)]===color){
			lie++;
			i++;
		}
		//判断黑棋左斜
		var zx=1;    //当前点下的那颗棋子          
		i=1;
		while(qizi[m(x-i,y-i)]===color){ //黑棋x轴减1，y轴减1
			zx++;                        //棋子加几个
			i++;                        //x轴加几
		}
		i=1;
		while(qizi[m(x+i,y+i)]===color){//黑棋x轴加1，y轴加1
			zx++;
			i++;
		}

		//判断黑棋右斜
		var yx=1;    //当前点下的那颗棋子          
		i=1;
		while(qizi[m(x+i,y-i)]===color){ //黑棋x轴加1，y轴减1
			yx++;                        //棋子加几个
			i++;                        //x轴加几
		}
		i=1;
		while(qizi[m(x-i,y+i)]===color){//黑棋x轴减1，y轴加1
			yx++;
			i++;
		}
		return Math.max(row,lie,zx,yx);
	}
	
	
	
	
})

