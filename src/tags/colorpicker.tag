<color-picker>
	<style>
		color-picker{
			position:absolute;
			display:flex;
			height:150px;
			width:200px;
			box-shadow: grey 1px 1px 5px 1px;
			padding: 5px;
      background-color: white;
		}

		#box{
			flex:8;
			position: relative;
			background-image: linear-gradient(to top, #000 0%, transparent 100%), linear-gradient(to right, #fff 0%, transparent 100%);eoN0UISIr+linear-gradient(to top, #000 0%, transparent 100%), linear-gradient(to right, #fff 0%, transparent 100%);
			background-color: blue;
			background-size: cover;
			margin-right: 5px;
		}
		
		#boxCircle{
			z-index:3;
			position: absolute;
			left: 148px;
			top: -3px;
			height:  8px;
			border-radius: 50%;
			border-width: 20px;
			border: solid;
			width: 8px;
			border-color: grey;
		}
		
		#hue{
			flex: 1;
			position:relative;
		    background: linear-gradient(to bottom, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%);
			margin-right: 5px;
		}
		#hueMarker{
	    position: absolute;
			background-color: grey;
			height: 2px;
			width: 100%;
			top: -1px;
		}
		#opacity{
			flex: 1;
			position:relative;
			background-image: linear-gradient(to top, #FF000000,  blue);
			height: calc(100% - 16px);
			margin:0;
		}
		#opacityMarker{
		    position: absolute;
			background-color: grey;
			height: 2px;
			width: 100%;
			top: -1px;
		}	
		#chess{
			flex: 1;
			position:relative;
			background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
			background-size: 10px 10px;
			background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
		}	
	</style>
   
		<div id="box">
			<div id="boxCircle"></div>
		</div>
		<div id="hue">
			<div id="hueMarker"></div>
		</div>
		<div id="chess"><div id="opacity">
			<div id="opacityMarker"></div>
		</div></div>

<script>

window.colorpicker = {color:{}};
  this.on('mount', () => {
		document.querySelector("#box").onclick = (e) =>{
			KORTxyz.states.colorpicker.focus();
			colorpicker.color.s = e.layerX/150*100;
			colorpicker.color.v = 100-(e.layerY/150*100);
			colorpicker.setBoxCircle(e.layerX,e.layerY)
			colorpicker.setDiv(colorpicker.color);

		}
		document.querySelector("#hue").onclick = (e) =>{
			KORTxyz.states.colorpicker.focus();
			colorpicker.color.h = e.layerY/150*360;
			colorpicker.setHueMarker(e.layerY)
			colorpicker.setColor({ h: e.layerY/150*360, s: 100, v: 100 })
			colorpicker.setDiv(colorpicker.color);
		}
		document.querySelector("#chess").onclick = (e) =>{
			KORTxyz.states.colorpicker.focus();
			colorpicker.color.a = 1-e.layerY/150;
			colorpicker.setOpacityMarker(e.layerY)
			colorpicker.setDiv(colorpicker.color);
		}
	

  })

	colorpicker.initColorpicker = (color) => {
		colorpicker.color = tinycolor(color).toHsv();
		colorpicker.setColor(colorpicker.color);
		colorpicker.setBoxCircle(colorpicker.color.s*150,150-colorpicker.color.v*150)
		colorpicker.setHueMarker(colorpicker.color.h/360*150);
		colorpicker.setOpacityMarker(150-colorpicker.color.a*150);
		colorpicker.setDiv(colorpicker.color);
	}

	colorpicker.setColor = (color)=> {
		let setColor = tinycolor(color).toHsv();
		document.querySelector("#box").style.backgroundColor = 
			tinycolor({ h: setColor.h, s: 100, v: 100 }).toHexString();
		document.querySelector("#opacity").style.backgroundImage = 
			`linear-gradient(to top, #FF000000, ${tinycolor({ h: setColor.h, s: 100, v: 100 }).toHexString()})`;
	}
	
	colorpicker.setBoxCircle= (x,y) => {
		let boxCircle = document.querySelector("#boxCircle");
		boxCircle.style.left = x-2+"px";
		boxCircle.style.top = y-2+"px";
	}
	
	colorpicker.setHueMarker= (y) => {
		let hueMarker = document.querySelector("#hueMarker");
		hueMarker.style.top = y-2+"px";
	}
	
	colorpicker.setOpacityMarker= (y) => {
		let opacityMarker = document.querySelector("#opacityMarker");
		opacityMarker.style.top = y-2+"px";
	}

	colorpicker.setDiv= (color) => {
		let div = KORTxyz.states.colorpicker;
		let divColor =  tinycolor(colorpicker.color).toRgbString();
		div.value = divColor;
		div.style.backgroundColor = divColor;
		div.style.color = tinycolor.mostReadable(divColor, ["white", "black"]).toName();
		map.setPaintProperty(KORTxyz.states.sidebar.layer,div.id,div.value)
	}
	



</script>

</color-picker>