<tablebar>
  <style>

  tablebar{
    position: absolute;
    z-index: 100;
    margin: 20 0 0 0; 
    height: 300px;
    left: 0;
    width: 100%;
    background: white;
    bottom:-340px;
    transition: bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0px 0px 12px grey; 
  }

  tablebar.show {
    bottom:0;
  }


  #tablegrid{
    height: 300px;
  }
      
  </style>

  <!-- layout -->
<div id="tablegrid" class="ag-theme-balham"></div>

  <!-- logic -->
<script>
    const id = opts.event.target.parentElement.id;
    const data = map.getSource(id).serialize().data
.features.map(e=>e.properties);

  this.on('before-mount', () => {
    setTimeout(()=>{
      document.getElementsByTagName("tablebar")[0].classList.toggle("show");
      createTable();
      KORTxyz.states.table = id;
    },200)
  })
  function createTable(){
    var columnDefs = data.map(e=> Object.entries(e))[0].map((e)=>{
        var singleDef = {headerName: e[0], field: e[0], filter:'agTextColumnFilter'};
        if(typeof e[1] == "number"){
          singleDef["filter"]='agNumberColumnFilter';
          singleDef["cellEditor"]='numericCellEditor';
        }
          return singleDef
      })

      new agGrid.Grid(document.querySelector('#tablegrid'), {
        defaultColDef: {
          editable: true
        },   
        onGridReady: function(params) {
          params.api.sizeColumnsToFit();
        },
        columnDefs: columnDefs,
        rowData: data,
        enableColResize: true,
        enableFilter: true,
        enableSorting: true,
        multiSortKey: 'ctrl',
        rowSelection:'single',
       /* onRowSelected: rowSelection,
        stopEditingWhenGridLosesFocus: true,
        onCellValueChanged: cellValueChanged,
        components:{
          numericCellEditor: NumericCellEditor
        }
        ,
        onFilterChanged: filterChanged*/
      });
  }

</script>

 

</tablebar>