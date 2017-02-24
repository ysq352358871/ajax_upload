/*
 * 面向对象封装函数
 * var obj =new upload(url,obj|selesctor,obj|selesctor,obj|selesctor);
 * 
 * 函数内部默认的变量有：type：支持上传图片的类型、size：允许文件上传的大小、name:文件表单的name属性的值；
 * 可以自己定义：obj.tyep["jpeg","jpg",...]; 
 * 				obj.size=1024*1024*n(n=1,2,3...)等。
 */
	function upload(url,inputobj,boxobj,imgobj){
				inputobj=inputobj||{};  //参数的初始化;
				boxobj=boxobj||{};
				imgobj=imgobj||{};
				if(inputobj.nodeName=="INPUT"){  //对参数进行判断，是对象还是选择器;
					this.inputobj=inputobj;
				}
				if(typeof(inputobj)=="string"){
					this.inputobj=document.querySelector(inputobj);
				}
				if(boxobj.nodeName=="DIV"){
					this.boxobj=boxobj;
				}
				if(typeof(boxobj)=="string"){
					this.boxobj=document.querySelector(boxobj);
				}
				if(imgobj.nodeName=="IMG"){
					this.imgobj=imgobj;
				}
				if(typeof(imgobj)=="string"){
					this.imgobj=document.querySelector(imgobj);
				}
				this.type=["jpg","jpeg","gif","png"];
				this.size=1024*1024*20;
				this.name="file";
				this.url=url;
				console.log(this.inputobj,this.boxobj,this.imgobj);
			}
			upload.prototype={
				up:function(callback){
					this.callback=callback;
					this.getCon();
				},
				getCon:function(){
					var that= this;
					this.inputobj.onchange=function(){
						that.data=this.files[0];
						var read=new FileReader();
						read.onload=function(e){
							that.imgobj.src=e.target.result;
						}
						read.readAsDataURL(that.data);
						if(that.check()){
							that.upFile();
						}
						
					}
				},
				check:function(){
					var flag=false;
					var type=this.data["name"].substring(this.data["name"].lastIndexOf(".")+1).toLowerCase();
					if(this.data["size"]>this.size){
						alert("文件太大");
						return false;
					}
					for(var i=0;i<this.type.length;i++){
						if(this.type[i]==type){
							flag=true;
						}
					}
					if(flag){
						return true;
					}else{
						alert("格式不正确！");
					}
				},
				upFile:function(){
					var that=this;
					var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
					var form=new FormData();
					form.append(this.name,this.data);
					ajax.onload=function(){
						that.callback(ajax.response);
					}
					ajax.upload.onprogress=function(e){
						var total=e.total;
						var loaded=e.loaded;
						var scale=loaded/total*100;
						that.boxobj.style.width=scale+"%";
					}
					ajax.open("post",this.url);
					ajax.send(form);
				}
			}