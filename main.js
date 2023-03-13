const plotSizes = {
    "NA" : {"k32": 108.837, "k33": 224.227, "k34": 461.535},
    "C1" : {"k32": 90.409 , "k33": 186.261, "k34": 383.389},
    "C2" : {"k32": 88.691 , "k33": 182.722, "k34": 376.104},
    "C3" : {"k32": 86.973 , "k33": 179.183, "k34": 368.818},
    "C4" : {"k32": 85.255 , "k33": 175.643, "k34": 361.533},
    "C5" : {"k32": 83.537 , "k33": 171.261, "k34": 354.248},
    "C6" : {"k32": 81.819 , "k33": 167.825, "k34": 346.962},
    "C7" : {"k32": 80.101 , "k33": 163.209, "k34": 339.677},
    "C8" : {"k32": 76.557 , "k33": 156.229, "k34": 324.648},
    "C9" : {"k32": 73.121 , "k33": 150.645, "k34": 310.077}
  };
const tables ={
    "k32":{1:"k32-1",2:"k32-2",3:"k32-3",4:"k32-used-space"},
    "k33":{1:"k32-33-1",2:"k32-33-2",3:"k32-33-3",4:"k32-33-used-space"},
    "k34":{1:"k32-33-34-1",2:"k32-33-34-2",3:"k32-33-34-3",4:"k32-33-34-used-space"}
}

const spaceInput = document.getElementById("space");
const spaceUnit = document.getElementById("space-unit");
const plotType = document.getElementById("plot-type");
const resultsTableDiv = document.getElementById("results-table");

const calc = document.getElementById("text");

spaceInput.addEventListener("change", checkactive);
plotType.addEventListener("change", checkactive);
spaceUnit.addEventListener("change", checkactive);

const norm = document.getElementById("normal");
const ck32 = document.getElementById("Ccompared");
const norm_cont = document.getElementById("container-k234");
const k32_cont = document.getElementById("container-k32");

norm.addEventListener("click",normal);
ck32.addEventListener("click",ccompared);

function normal(){
  norm.classList.add("active"); 
  ck32.classList.remove("active");

  norm_cont.classList.remove("hidden");
  k32_cont.classList.add("hidden");

  text.innerText = "";
  spaceInput.value = 0;
  checkactive();

}
function ccompared(){
  ck32.classList.add("active"); 
  norm.classList.remove("active"); 

  k32_cont.classList.remove("hidden");
  norm_cont.classList.add("hidden");

  text.innerText = "";
  spaceInput.value = 0;
  checkactive();  
}
function checkactive(){
  if (ck32.className.includes("active")){
    calculateK32();
    
  }else{
    calculatePlotsAndSpace();
  }
}
function calculatePlotsAndSpace() {
	let space = spaceInput.value;
	const plotUnit = plotSizes[plotType.value];
    if (spaceUnit.value == "TB"){
        space = space*1000
    }
    // Obtener los resultados de la función (asumiendo que la función se llama "calculateCombinations")
    const results = calculateOptimalCombination(space,plotUnit.k32,plotUnit.k33,plotUnit.k34);
    complete(tables.k32,results,space);
    complete(tables.k33,results,space);
    complete(tables.k34,results,space);
    //console.log(results.k32AndK33AndK34)
    text.innerText = "This calculation is based on k32 plots being "+plotUnit.k32+" GB, k33 plots being "+plotUnit.k33+" GB and k34 plots being "+plotUnit.k34+" GB"
}


  function calculateOptimalCombination(val,k32,k33,k34) {
    const i = k32; // Tamaño del valor k32 en GB
    const o = k33; // Tamaño del valor k33 en GB
    const u = k34; // Tamaño del valor k34 en GB
    
    // Inicializa los valores de n para las tres combinaciones posibles
    const n = {
      k32Only: {
        numberOfK32Plots: 0,
        spaceUsedInGb: 0
      },
      k32AndK33: {
        numberOfK32: 0,
        numberOfK33: 0,
        spaceUsedInGb: 0
      },
      k32AndK33AndK34: {
        numberOfK32: 0,
        numberOfK33: 0,
        numberOfK34: 0,
        spaceUsedInGb: 0
      }
    };
    
    // Calcula el número de K32 plots que se pueden usar en la combinación óptima
    n.k32Only.numberOfK32Plots = Math.floor(val / i);
    
    // Calcula la cantidad total de espacio utilizado para la combinación que solo usa K32
    n.k32Only.spaceUsedInGb = n.k32Only.numberOfK32Plots * i;
    
    // Inicializa los valores para las combinaciones que usan K32 y K33, y K32, K33 y K34
    n.k32AndK33.spaceUsedInGb = n.k32Only.spaceUsedInGb;
    n.k32AndK33.numberOfK32 = n.k32Only.numberOfK32Plots;
    n.k32AndK33AndK34.spaceUsedInGb = n.k32Only.spaceUsedInGb;
    n.k32AndK33AndK34.numberOfK32 = n.k32Only.numberOfK32Plots;
  
    // Calcula las combinaciones posibles que usan K32 y K33
    for (let r = 0; r < n.k32Only.numberOfK32Plots; r++) {
      const u = i * r;
      const s = Math.floor((val - u) / o);
      const l = s * o + u;
      if (l > n.k32AndK33.spaceUsedInGb) {
        n.k32AndK33.numberOfK32 = r;
        n.k32AndK33.numberOfK33 = s;
        n.k32AndK33.spaceUsedInGb = l;
      }
    }
    
    // Calcula las combinaciones posibles que usan K32, K33 y K34
    for (let r = 0; r < n.k32Only.numberOfK32Plots; r++) {
      const s = i * r;
      for (let j = 0; s + o * j < val; j++) {
        const l = o * j;
        const f = Math.floor((val - l - s) / u);
        const c = f * u + l + s;
        if (c > n.k32AndK33AndK34.spaceUsedInGb) {
          n.k32AndK33AndK34.numberOfK32 = r;
          n.k32AndK33AndK34.numberOfK33 = j;
          n.k32AndK33AndK34.numberOfK34 = f;
          n.k32AndK33AndK34.spaceUsedInGb = c;
        }
      }
    }
  
    return n;
  }

function complete(table,result,valor){
    c1 = document.getElementById(table[1]);
    c2 = document.getElementById(table[2]);
    c3 = document.getElementById(table[3]);
    c4 = document.getElementById(table[4]);
    if (table[1].includes('34')){
        c1.innerText = result.k32AndK33AndK34.numberOfK32;
        c2.innerText = result.k32AndK33AndK34.numberOfK33;
        c3.innerText = result.k32AndK33AndK34.numberOfK34;
        c4.innerHTML = result.k32AndK33AndK34.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (result.k32AndK33AndK34.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
    }else if (table[1].includes('33')){
        c1.innerText = result.k32AndK33.numberOfK32;
        c2.innerText = result.k32AndK33.numberOfK33;
        c3.innerText = 0;
        c4.innerHTML = result.k32AndK33.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (result.k32AndK33.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
    }else{
        c1.innerText = result.k32Only.numberOfK32Plots;
        c2.innerText = 0;
        c3.innerText = 0;
        c4.innerHTML = result.k32Only.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (result.k32Only.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
    }
}

function calculateK32(){
  // plotSizes.NA.k32
  // plotSizes.C1.k32
  // plotSizes.C2.k32
  // plotSizes.C3.k32
  // plotSizes.C4.k32
  // plotSizes.C5.k32
  // plotSizes.C6.k32
  // plotSizes.C7.k32
  // plotSizes.C8.k32
  // plotSizes.C9.k32
  let val = spaceInput.value;
    if (spaceUnit.value == "TB"){
        val = val*1000
    }
  const n = {
    na: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c1: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c2: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c3: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c4: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c5: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c6: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c7: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c8: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    },
    c9: {
      numberOfK32Plots: 0,
      spaceUsedInGb: 0
    }
  }

    n.na.numberOfK32Plots = Math.floor(val / plotSizes.NA.k32);
    n.na.spaceUsedInGb = n.na.numberOfK32Plots * plotSizes.NA.k32;

    n.c1.numberOfK32Plots = Math.floor(val / plotSizes.C1.k32);
    n.c1.spaceUsedInGb = n.c1.numberOfK32Plots * plotSizes.C1.k32;

    n.c2.numberOfK32Plots = Math.floor(val / plotSizes.C2.k32);
    n.c2.spaceUsedInGb = n.c2.numberOfK32Plots * plotSizes.C2.k32;

    n.c3.numberOfK32Plots = Math.floor(val / plotSizes.C3.k32);
    n.c3.spaceUsedInGb = n.c3.numberOfK32Plots * plotSizes.C3.k32;

    n.c4.numberOfK32Plots = Math.floor(val / plotSizes.C4.k32);
    n.c4.spaceUsedInGb = n.c4.numberOfK32Plots * plotSizes.C4.k32;

    n.c5.numberOfK32Plots = Math.floor(val / plotSizes.C5.k32);
    n.c5.spaceUsedInGb = n.c5.numberOfK32Plots * plotSizes.C5.k32;

    n.c6.numberOfK32Plots = Math.floor(val / plotSizes.C6.k32);
      n.c6.spaceUsedInGb = n.c6.numberOfK32Plots * plotSizes.C6.k32;

    n.c7.numberOfK32Plots = Math.floor(val / plotSizes.C7.k32);
    n.c7.spaceUsedInGb = n.c7.numberOfK32Plots * plotSizes.C7.k32;

    n.c8.numberOfK32Plots = Math.floor(val / plotSizes.C8.k32);
    n.c8.spaceUsedInGb = n.c8.numberOfK32Plots * plotSizes.C8.k32;

    n.c9.numberOfK32Plots = Math.floor(val / plotSizes.C9.k32);
    n.c9.spaceUsedInGb = n.c9.numberOfK32Plots * plotSizes.C9.k32;

    cargar(n,val);
}
function cargar(resultado,valor){
document.getElementById("c0").innerText= resultado.na.numberOfK32Plots;
document.getElementById("c0g").innerHTML= resultado.na.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.na.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c1").innerText= resultado.c1.numberOfK32Plots;
document.getElementById("c1g").innerHTML= resultado.c1.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c1.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c2").innerText= resultado.c2.numberOfK32Plots;
document.getElementById("c2g").innerHTML= resultado.c2.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c2.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c3").innerText= resultado.c3.numberOfK32Plots;
document.getElementById("c3g").innerHTML= resultado.c3.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c3.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c4").innerText= resultado.c4.numberOfK32Plots;
document.getElementById("c4g").innerHTML= resultado.c4.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c4.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c5").innerText= resultado.c5.numberOfK32Plots;
document.getElementById("c5g").innerHTML= resultado.c5.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c5.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c6").innerText= resultado.c6.numberOfK32Plots;
document.getElementById("c6g").innerHTML= resultado.c6.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c6.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c7").innerText= resultado.c7.numberOfK32Plots;
document.getElementById("c7g").innerHTML= resultado.c7.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c7.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c8").innerText= resultado.c8.numberOfK32Plots;
document.getElementById("c8g").innerHTML= resultado.c8.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c8.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c9").innerText= resultado.c9.numberOfK32Plots;
document.getElementById("c9g").innerHTML= resultado.c9.spaceUsedInGb.toFixed(3) + " GB (≈<strong>" + (resultado.c9.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
}