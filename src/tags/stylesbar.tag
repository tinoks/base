<styles-bar>
  <style>
  	.container{
  		padding:5px;
  	}
  	color-picker{
  		margin-top:4px;
  		display:none;
  	}

  </style>

  <!-- layout -->

<div class="container">
  <div each="{ name, i in opts.paint }">
		<sub>{ i }</sub><br>
  	<input type="text" id={i} value={name} 
  		onfocusout={onfocusout} onfocus={onfocus} 
  		onchange={onchange}>
  </div>
</div>
<color-picker></color-picker>
  <!-- logic -->
<script>
  let unlinkColorTimeout;
	this.onchange = (e) => {
		let value
		try {
  		value = JSON.parse(e.target.value)
		}
		catch(error) {
		  value = e.target.value
		}

		map.setPaintProperty(KORTxyz.states.sidebar.layer,e.item.i,value)
	}

	this.onfocus = (e) => {
    if(e.item.i.endsWith("color")){
  		KORTxyz.states.colorpicker = e.target;
    	linkColor(e)
    	clearTimeout(unlinkColorTimeout);
    }
  }


	this.onfocusout = (e) => {
    if(e.item.i.endsWith("color")){
    	unlinkColorTimeout = setTimeout(() =>{
										    			unlinkColor(e)
										    	}, 150);
    }
  }

 function linkColor(e){
	const colordiv = document.querySelector("color-picker");
        if(tinycolor(e.target.value).isValid()){
          colorpicker.initColorpicker(e.target.value)
        }
				colordiv.style.display = "flex";
				colordiv.style.top = 22+ e.target.offsetTop + "px";
				colordiv.style.left = 3+ e.target.offsetLeft + "px";
 }

 function unlinkColor(e){
	const colordiv = document.querySelector("color-picker");
				colordiv.style.display = "none";
 }


</script>

 

</styles-bar>