

 
const addLisener = function (ele, cb){
    ele.addEventListener('click',cb)
    ele.addEventListener('dragover',cb) 
}

function PixelGrid(id, row, col, btn){
   this.grid  = document.getElementById(id);
   this.row = row;
   this.col = col;
   this.selectedColor = '';
    this.lastEle = null;
    this.eleColor = [];
    this.id = id,
    this.addColorCb = (e) => {
        const ele = e.target;
        ele.classList.add('select-box')
        ele.style.backgroundColor = this.selectedColor; 
        this.eleColor.push(ele)
    }
    this.btn = document.getElementById(btn);
    addLisener(this.grid,this.addColorCb)
}
PixelGrid.prototype.createGrid = function(){
    function createBox(r,c){
        const divEl = document.createElement('div');
        divEl.id = `${r}-box-${c}`;
        divEl.className = "grid-box";
        divEl.dataRow = r;
        divEl.dataCol = c;
        return divEl
     }
     
     function createRow(r){
         const ele = document.createElement('section');
         ele.id = `${r}-box`;
         ele.className = "grid-row";
         return ele
    }
    const selectColorCb = (e)  => {
        const ele = e.target;
        this.selectedColor = ele.style.backgroundColor; 
        ele.innerHTML = "$"
        ele.style.color = 'white';
        if(this.lastEle){
            this.lastEle.innerHTML = ""
        }
        this.lastEle = ele;
    }
    for(let r = 0;r<this.row;r++){
        const rowEle = createRow(r);
        for(let c =0;c<this.col;c++){
            const ele = createBox(r,c);
            if(r==this.row-1){
           
                const random  = this.randomColor()
                ele.style.backgroundColor =`#${random}` ;
                if(!this.selectedColor){
                    this.selectedColor = `#${random}` ;
                }
               
                ele.classList.add('base-box');
                addLisener(rowEle,selectColorCb)             
            }
            rowEle.appendChild(ele)
        }
        this.grid.appendChild(rowEle);
    }
}
PixelGrid.prototype.randomColor = function(){
        return Math.floor(Math.random() * 16777215).toString(16);

}
PixelGrid.prototype.resetGrid =  function() {
    this.selectedColor= '';
    this.lastEle = null;
    // EXTRA TIME
    // for(let r = 0;r<row;r++){
    //     for(let c =0;c<column;c++){
    //         const allRows = Array.from(document.querySelectorAll('.grid-row'));
    //          allRows.forEach((eleRow)=>{
    //             const cols =  Array.from(eleRow.children);
    //             cols.forEach((colEle)=>{
    //                 if(colEle.classList.contains('select-box')){
    //                     colEle.style.backgroundColor =`#999897` ;
    //                 }
    //             })
                
    //          })   
    //     }
    // }
    // Extra memmory
    this.eleColor.forEach((ele)=>{
        ele.style.backgroundColor =`#999897`
        ele.innerHTML = ""
    })
}
const grid = new PixelGrid('grid', 10, 10,'clear-grid' );
const grid2 = new PixelGrid('grid2', 10, 10,'clear-grid2' );

grid.createGrid();
grid2.createGrid();
grid.btn.onclick = function(){
    grid.resetGrid();
}

grid2.btn.onclick = function(){
    grid2.resetGrid();
}



