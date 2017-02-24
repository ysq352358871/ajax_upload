<?php
	if(is_uploaded_file($_FILES["file"]["tmp_name"])){
		$posi=strripos($_FILES["file"]["name"],".");
		$str=substr($_FILES["file"]["name"],$posi+1);
		echo $str;
		if($str=="jpeg"||$str=="jpg"||$str=="gif"||$str=="png"){
			$url="img/".$_FILES["file"]["name"];
			move_uploaded_file($_FILES["file"]["tmp_name"],$url);
		}else{
			echo "文件格式不正确！";
		}
		
	}
?>