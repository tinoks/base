<table-bar>
  <style>

  table-bar{
    position: absolute;
    z-index: 100;
    height: 200px;
    left: 0;
    width: 100%;
    background: white;
    bottom:-240px;
    transition: bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0px 0px 12px grey; 
  }

  table-bar.show {
    bottom:0;
  }


  #tablegrid{
    height: 200px;
  }
      
  </style>

  <!-- layout -->
<div id="tablegrid" class="ag-theme-balham"></div>

  <!-- logic -->
<script>
    const id = opts.event.target.parentElement.id;
    const features = map.getSource(id).serialize().data.features; 
    const data = features.map(e=>e.properties);

  this.on('before-mount', () => {
    setTimeout(()=>{
      document.getElementsByTagName("table-bar")[0].classList.toggle("show");
      createTable();
      KORTxyz.states.table = id;
    },200)
  })
  function createTable(){
    var columnDefs = data.map(e=> Object.entries(e))[0]
      .map((e)=>{
          var singleDef = {headerName: e[0], field: e[0], filter:'agTextColumnFilter'};
          if(typeof e[1] == "number"){
            singleDef["filter"]='agNumberColumnFilter';
            singleDef["cellEditor"]='numericCellEditor';
          }
            return singleDef
        })

        columnDefs.unshift(columnDefs.pop())
      
window.gridOptions = {
        defaultColDef: {
          editable: true
        },   
        /*onGridReady: function(params) {
          params.api.sizeColumnsToFit();
        },*/
        columnDefs: columnDefs,
        rowData: data,
        enableColResize: true,
        enableFilter: true,
        enableSorting: true,
        multiSortKey: 'ctrl',
        rowSelection:'single',
        stopEditingWhenGridLosesFocus: true,
        onRowSelected: rowSelection,
        components:{ numericCellEditor: NumericCellEditor},
        onCellValueChanged: cellValueChanged,
       // onFilterChanged: filterChanged
      };
      new agGrid.Grid(document.querySelector('#tablegrid'), gridOptions );
  }

var rowSelection = (e)=>{
    if(e.node.selected){
          map.fitBounds(turf.bbox(features[e.node.id]), {
            offset: [
              !document.getElementsByClassName("show")[0]? 0 : 150,
              -130
            ],
            padding:10
        })  
    }
  };

    function NumericCellEditor() {
  }

  // gets called once before the renderer is used
  NumericCellEditor.prototype.init = function (params) {
      // create the cell
      this.eInput = document.createElement('input');

      if (isCharNumeric(params.charPress)) {
          this.eInput.value = params.charPress;
      } else {
          if (params.value !== undefined && params.value !== null) {
              this.eInput.value = params.value;
          }
      }

      var that = this;
      this.eInput.addEventListener('keypress', function (event) {
          if (!isKeyPressedNumeric(event)) {
              that.eInput.focus();
              if (event.preventDefault) event.preventDefault();
          } else if (that.isKeyPressedNavigation(event)){
              event.stopPropagation();
          }
      });

      // only start edit if key pressed is a number, not a letter
      var charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
      this.cancelBeforeStart = charPressIsNotANumber;
  };

var cellValueChanged = (e)=>{
    if(e.colDef.cellEditor=="numericCellEditor") {
      e.data[e.colDef.field] = parseFloat(e.newValue)
    }
};

  /************

  STUF FOR NUMBER EDITING

  *************/
  function getCharCodeFromEvent(event) {
      event = event || window.event;
      return (typeof event.which == "undefined") ? event.keyCode : event.which;
  }

  function isCharNumeric(charStr) {
      return !!/\d|\./.test(charStr);
  }

  function isKeyPressedNumeric(event) {
      var charCode = getCharCodeFromEvent(event);
      var charStr = String.fromCharCode(charCode);
      return isCharNumeric(charStr);
  }

  NumericCellEditor.prototype.isKeyPressedNavigation = function (event){
      return event.keyCode===39
          || event.keyCode===37;
  };


  // gets called once when grid ready to insert the element
  NumericCellEditor.prototype.getGui = function () {
      return this.eInput;
  };

  // focus and select can be done after the gui is attached
  NumericCellEditor.prototype.afterGuiAttached = function () {
      this.eInput.focus();
  };

  // returns the new value after editing
  NumericCellEditor.prototype.isCancelBeforeStart = function () {
      return this.cancelBeforeStart;
  };

  // example - will reject the number if it contains the value 007
  // - not very practical, but demonstrates the method.
  NumericCellEditor.prototype.isCancelAfterEnd = function () {
      var value = this.getValue();
      return value.indexOf('007') >= 0;
  };

  // returns the new value after editing
  NumericCellEditor.prototype.getValue = function () {
      return this.eInput.value;
  };

  // any cleanup we need to be done here
  NumericCellEditor.prototype.destroy = function () {
      // but this example is simple, no cleanup, we could  even leave this method out as it's optional
  };

  // if true, then this editor will appear in a popup 
  NumericCellEditor.prototype.isPopup = function () {
      // and we could leave this method out also, false is the default
      return false;
  };
</script>

 

</table-bar>