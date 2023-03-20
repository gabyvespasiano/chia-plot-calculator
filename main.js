// todo list
// poder elegir entre GIB Y GB
// edit plot size for each K size and Compression level (set custom value) 
// drop down
// 4TB    3725.3    GiB
// 6TB    5588.0    GiB
// 8TB    7450.6    GiB
// 10TB    9313.2    GiB
// 12TB    11175.9    GiB
// 14TB    13038.5    GiB
// 16TB    14901.2    GiB
// 18TB    16763.8    GiB
// 20TB    18626.5    GiB
const plotSizes = {
  "GB": {
    "NA" : {"k30": 25.662,"k31": 53.687,"k32": 108.877, "k33": 224.197, "k34": 461.493},
    "C1" : {"k30": 21.690,"k31": 44.238,"k32": 90.409 , "k33": 185.005, "k34": 377.420},
    "C2" : {"k30": 21.260,"k31": 43.379,"k32": 88.691 , "k33": 181.569, "k34": 370.655},
    "C3" : {"k30": 20.831,"k31": 42.520,"k32": 86.973 , "k33": 178.133, "k34": 363.890},
    "C4" : {"k30": 20.401,"k31": 41.661,"k32": 85.255 , "k33": 174.697, "k34": 357.126},
    "C5" : {"k30": 19.972,"k31": 40.845,"k32": 83.537 , "k33": 171.219, "k34": 350.361},
    "C6" : {"k30": 19.488,"k31": 39.965,"k32": 81.819 , "k33": 167.804, "k34": 343.597},
    "C7" : {"k30": 19.048,"k31": 39.138,"k32": 80.101 , "k33": 163.230, "k34": 332.430},
    "C8" : {"k30": 18.372,"k31": 37.506,"k32": 76.557 , "k33": 156.251, "k34": 324.648},
    "C9" : {"k30": 17.502,"k31": 35.863,"k32": 73.121 , "k33": 150.645, "k34": 310.077}
  },
  "GIB": {
    "NA" : {"k30": 23.900,"k31": 50.000,"k32": 101.400, "k33": 208.800, "k34": 429.800},
    "C1" : {"k30": 20.200,"k31": 41.200,"k32": 84.200 , "k33": 172.300, "k34": 351.500},
    "C2" : {"k30": 19.800,"k31": 40.400,"k32": 82.600 , "k33": 169.100, "k34": 345.200},
    "C3" : {"k30": 19.400,"k31": 39.600,"k32": 81.000 , "k33": 165.900, "k34": 338.900},
    "C4" : {"k30": 19.000,"k31": 38.800,"k32": 79.400 , "k33": 162.700, "k34": 332.600},
    "C5" : {"k30": 18.600,"k31": 38.040,"k32": 77.800 , "k33": 159.460, "k34": 326.300},
    "C6" : {"k30": 18.150,"k31": 37.220,"k32": 76.200 , "k33": 156.280, "k34": 320.000},
    "C7" : {"k30": 17.740,"k31": 36.450,"k32": 74.600 , "k33": 152.020, "k34": 309.600},
    "C8" : {"k30": 17.110,"k31": 34.930,"k32": 71.300 , "k33": 145.520, "k34": 302.353},
    "C9" : {"k30": 16.300,"k31": 33.400,"k32": 68.100 , "k33": 140.299, "k34": 288.782}
  }
  };

const tables ={
    "k32":{1:"k32-1",2:"k32-2",3:"k32-3",4:"k32-used-space"},
    "k33":{1:"k32-33-1",2:"k32-33-2",3:"k32-33-3",4:"k32-33-used-space"},
    "k34":{1:"k32-33-34-1",2:"k32-33-34-2",3:"k32-33-34-3",4:"k32-33-34-used-space"}
}
const ctype = {
  "NA":"C1",
  "C1":"NA",
  "C2":"C1",
  "C3":"C2",
  "C4":"C3",
  "C5":"C4",
  "C6":"C5",
  "C7":"C6",
  "C8":"C7",
  "C9":"C8"
}
const hdd_predef= {
  "GB": {
    "4TB":  4000,
    "6TB":  6000,
    "8TB":  8000,
    "10TB": 9999.97,
    "12TB": 12000,
    "14TB": 13999.98,
    "16TB": 16000,
    "18TB": 17999.99,
    "20TB": 20000
  },
  "GIB": {
    "4TB":  3725.3,
    "6TB":  5588.0,
    "8TB":  7450.6,
    "10TB": 9313.2,
    "12TB": 11175.9,
    "14TB": 13038.5,
    "16TB": 14901.2,
    "18TB": 16763.8,
    "20TB": 18626.5
  }
}
const spaceInput = document.getElementById("space");
const spaceUnit = document.getElementById("space-unit");
const plotType = document.getElementById("plot-type");
const efic_plotType = document.getElementById("eficient-plot-type");
const HDD = document.getElementById("HDD");
const plotk = document.getElementById("plot-k");
const type = document.getElementById("type");
const resultsTableDiv = document.getElementById("results-table");

const calc = document.getElementById("text");

spaceInput.addEventListener("change", checkactive);
plotType.addEventListener("change", checkactive);
spaceUnit.addEventListener("change", checkactive);
plotk.addEventListener("change", checkactive);
type.addEventListener("change", checkactive);
efic_plotType.addEventListener("change", checkactive);

HDD.addEventListener("change", hdd_set);

const norm = document.getElementById("normal");
const ck32 = document.getElementById("Ccompared");
const eficient = document.getElementById("eficient");

const norm_cont = document.getElementById("container-k234");
const k32_cont = document.getElementById("container-k32");
const eficient_cont = document.getElementById("container-eficient");

norm.addEventListener("click",normal);
ck32.addEventListener("click",ccompared);
eficient.addEventListener("click",efic);

function hdd_set(){
  text.innerText = "";
  spaceInput.value = hdd_predef[spaceUnit.value][HDD.value];
  checkactive();
}
function normal(){
  actives("norm");

}
function ccompared(){
  actives("ck32");
}
function efic(){
  actives("efic");
}

function actives(a){
  switch (a){
    case "norm":
      norm.classList.add("active"); 
      ck32.classList.remove("active");
      eficient.classList.remove("active");
    
      norm_cont.classList.remove("hidden");
      k32_cont.classList.add("hidden");
      eficient_cont.classList.add("hidden");
    

      break;
    case "ck32":
      ck32.classList.add("active"); 
      norm.classList.remove("active"); 
      eficient.classList.remove("active");
    
      k32_cont.classList.remove("hidden");
      norm_cont.classList.add("hidden");
      eficient_cont.classList.add("hidden");
    
  
      break;
    case "efic":
      ck32.classList.remove("active"); 
      norm.classList.remove("active"); 
      eficient.classList.add("active");
    
      k32_cont.classList.add("hidden");
      norm_cont.classList.add("hidden");
      eficient_cont.classList.remove("hidden");
    
  
      break;
  }
  text.innerText = "";
  // if (HDD.value = ""){
  //   spaceInput.value = 0;
  // }
  checkactive();
}
function checkactive(){
  if (ck32.className.includes("active")){
    calculateK32();
    
  }else if (eficient.className.includes("active")){
    eficiente();
  }else{
    calculatePlotsAndSpace();
  }
}
function calculatePlotsAndSpace() {
	let space = spaceInput.value;
	const plotUnit = plotSizes[type.value][plotType.value];
    if (spaceUnit.value == "TB"){
      if (type.value == "GIB"){
        space = space*1024
      }else{
        space = space*1000
      }
    }
    // Obtener los resultados de la función (asumiendo que la función se llama "calculateCombinations")
    const results = calculateOptimalCombination(space,plotUnit.k32,plotUnit.k33,plotUnit.k34);
    complete(tables.k32,results,space);
    complete(tables.k33,results,space);
    complete(tables.k34,results,space);
    //console.log(results.k32AndK33AndK34)
    text.innerText = "This calculation is based on k32 plots being "+plotUnit.k32+" " + type.value + ", k33 plots being "+plotUnit.k33+" " + type.value + " and k34 plots being "+plotUnit.k34+" " + type.value
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
        c4.innerHTML = result.k32AndK33AndK34.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (result.k32AndK33AndK34.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
    }else if (table[1].includes('33')){
        c1.innerText = result.k32AndK33.numberOfK32;
        c2.innerText = result.k32AndK33.numberOfK33;
        c3.innerText = 0;
        c4.innerHTML = result.k32AndK33.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (result.k32AndK33.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
    }else{
        c1.innerText = result.k32Only.numberOfK32Plots;
        c2.innerText = 0;
        c3.innerText = 0;
        c4.innerHTML = result.k32Only.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (result.k32Only.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
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
    if (type.value == "GIB"){
      val = val*1024
    }else{
      val = val*1000
    }
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

    n.na.numberOfK32Plots = Math.floor(val / plotSizes[type.value].NA[plotk.value]);
    n.na.spaceUsedInGb = n.na.numberOfK32Plots * plotSizes[type.value].NA[plotk.value];

    n.c1.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C1[plotk.value]);
    n.c1.spaceUsedInGb = n.c1.numberOfK32Plots * plotSizes[type.value].C1[plotk.value];

    n.c2.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C2[plotk.value]);
    n.c2.spaceUsedInGb = n.c2.numberOfK32Plots * plotSizes[type.value].C2[plotk.value];

    n.c3.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C3[plotk.value]);
    n.c3.spaceUsedInGb = n.c3.numberOfK32Plots * plotSizes[type.value].C3[plotk.value];

    n.c4.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C4[plotk.value]);
    n.c4.spaceUsedInGb = n.c4.numberOfK32Plots * plotSizes[type.value].C4[plotk.value];

    n.c5.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C5[plotk.value]);
    n.c5.spaceUsedInGb = n.c5.numberOfK32Plots * plotSizes[type.value].C5[plotk.value];

    n.c6.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C6[plotk.value]);
      n.c6.spaceUsedInGb = n.c6.numberOfK32Plots * plotSizes[type.value].C6[plotk.value];

    n.c7.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C7[plotk.value]);
    n.c7.spaceUsedInGb = n.c7.numberOfK32Plots * plotSizes[type.value].C7[plotk.value];

    n.c8.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C8[plotk.value]);
    n.c8.spaceUsedInGb = n.c8.numberOfK32Plots * plotSizes[type.value].C8[plotk.value];

    n.c9.numberOfK32Plots = Math.floor(val / plotSizes[type.value].C9[plotk.value]);
    n.c9.spaceUsedInGb = n.c9.numberOfK32Plots * plotSizes[type.value].C9[plotk.value];

    cargar(n,val);
}
function cargar(resultado,valor){
document.getElementById("c0").innerText= resultado.na.numberOfK32Plots;
document.getElementById("c0g").innerHTML= resultado.na.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.na.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c1").innerText= resultado.c1.numberOfK32Plots;
document.getElementById("c1g").innerHTML= resultado.c1.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c1.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c2").innerText= resultado.c2.numberOfK32Plots;
document.getElementById("c2g").innerHTML= resultado.c2.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c2.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c3").innerText= resultado.c3.numberOfK32Plots;
document.getElementById("c3g").innerHTML= resultado.c3.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c3.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c4").innerText= resultado.c4.numberOfK32Plots;
document.getElementById("c4g").innerHTML= resultado.c4.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c4.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c5").innerText= resultado.c5.numberOfK32Plots;
document.getElementById("c5g").innerHTML= resultado.c5.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c5.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c6").innerText= resultado.c6.numberOfK32Plots;
document.getElementById("c6g").innerHTML= resultado.c6.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c6.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c7").innerText= resultado.c7.numberOfK32Plots;
document.getElementById("c7g").innerHTML= resultado.c7.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c7.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c8").innerText= resultado.c8.numberOfK32Plots;
document.getElementById("c8g").innerHTML= resultado.c8.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c8.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";

document.getElementById("c9").innerText= resultado.c9.numberOfK32Plots;
document.getElementById("c9g").innerHTML= resultado.c9.spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + (resultado.c9.spaceUsedInGb/valor*100).toFixed(2) + "%</strong>)";
}

function eficiente(){
  let val = spaceInput.value;
  if (val > 0){
    if (spaceUnit.value == "TB"){
      if (type.value == "GIB"){
        val = val*1024
      }else{
        val = val*1000
      }
    }
    document.getElementById("eficient-t1").innerText = efic_plotType.value;
    document.getElementById("eficient-t2").innerText = ctype[efic_plotType.value];

    let main = Math.floor(val / plotSizes[type.value][efic_plotType.value][plotk.value]);
    let space_main = main * plotSizes[type.value][efic_plotType.value][plotk.value];
    document.getElementById("eficient-1").innerText = main;
    document.getElementById("eficient-3-plots").innerText = main;
    
    document.getElementById("eficient-used-space-1").innerHTML= space_main.toFixed(3) + " " + type.value + " (≈<strong>" + (space_main/val*100).toFixed(2) + "%</strong>)";


    let found = false;
    let second = 0;
    let tempvalue = 0;
    while(!found){
      main -= 1
      second += 1
      tempvalue = (main * plotSizes[type.value][efic_plotType.value][plotk.value]) + (second * plotSizes[type.value][ctype[efic_plotType.value]][plotk.value]);
      //console.log(tempvalue);
     if (tempvalue > val){
        found=true;
        main += 1
        second -= 1
        tempvalue = (main * plotSizes[type.value][efic_plotType.value][plotk.value]) + (second * plotSizes[type.value][ctype[efic_plotType.value]][plotk.value]);
        document.getElementById("eficient-01").innerText = main;
        document.getElementById("eficient-02").innerText = second;
        document.getElementById("eficient-used-space-01").innerHTML= tempvalue.toFixed(3) + " " + type.value + " (≈<strong>" + (tempvalue/val*100).toFixed(2) + "%</strong>)";
        document.getElementById("eficient-03-plots").innerText = main + second;

      }
      
    }
  }
}