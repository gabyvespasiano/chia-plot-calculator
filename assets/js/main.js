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

document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("container-k32");
  const table = document.getElementById("k32-table")


  const compressionLevels = ['NA', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19', 'C20', 'C30', 'C31', 'C32', 'C33'];

  compressionLevels.forEach((level, index) => {
      const row = document.createElement("tr");
      row.className = (index % 2 === 0) ? "" : "roww";

      const compressionCell = document.createElement("td");
      compressionCell.className = "b";
      compressionCell.innerText = level;
      row.appendChild(compressionCell);
    if (index == 0){
      const potsCell = document.createElement("td");
      potsCell.id = "NA";
      potsCell.innerText = "0";
      row.appendChild(potsCell);

      const spaceUsedCell = document.createElement("td");
      spaceUsedCell.id = "NAg";
      spaceUsedCell.innerHTML = "0 GB (≈<strong>0%</strong>)";
      row.appendChild(spaceUsedCell);

      table.appendChild(row);
    } else{
      index= level.split("C")[1]
      const potsCell = document.createElement("td");
      potsCell.id = "C" + index;
      potsCell.innerText = "0";
      row.appendChild(potsCell);

      const spaceUsedCell = document.createElement("td");
      spaceUsedCell.id = "C" + index + "g";
      spaceUsedCell.innerHTML = "0 GB (≈<strong>0%</strong>)";
      row.appendChild(spaceUsedCell);

      table.appendChild(row);
    }
  });
});


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
    "C9" : {"k30": 17.502,"k31": 35.863,"k32": 73.121 , "k33": 150.645, "k34": 310.077},

    "C11": {"k30": 1, "k31": 1, "k32": 92.019, "k33": 188.012, "k34": 412.209},
    "C12": {"k30": 1, "k31": 1, "k32": 88.583, "k33": 181.247, "k34": 397.499},
    "C13": {"k30": 1, "k31": 1, "k32": 84.718, "k33": 173.409, "k34": 380.641},
    "C14": {"k30": 1, "k31": 1, "k32": 80.208, "k33": 164.175, "k34": 360.369},//valor k33,k34 temporal
    "C15": {"k30": 1, "k31": 1, "k32": 76.879, "k33": 156.766, "k34": 343.167},
    "C16": {"k30": 1, "k31": 1, "k32": 69.578, "k33": 142.270, "k34": 312.136},
    "C17": {"k30": 1, "k31": 1, "k32": 67.645, "k33": 137.439, "k34": 299.681},
    "C18": {"k30": 1, "k31": 1, "k32": 64.102, "k33": 130.244, "k34": 284.542},
    "C19": {"k30": 1, "k31": 1, "k32": 60.559, "k33": 123.265, "k34": 269.401},
    "C20": {"k30": 1, "k31": 1, "k32": 57.015, "k33": 116.286, "k34": 254.477},

    "C30" : {"k30": 1,"k31": 1,"k32": 46.493 , "k33": 94.822, "k34": 207.511},
    "C31" : {"k30": 1,"k31": 1,"k32": 41.446 , "k33": 84.535, "k34": 184.984},
    "C32" : {"k30": 1,"k31": 1,"k32": 36.399 , "k33": 74.238, "k34": 162.467},
    "C33" : {"k30": 1,"k31": 1,"k32": 31.245 , "k33": 63.726, "k34": 139.457}
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
    "C9" : {"k30": 16.300,"k31": 33.400,"k32": 68.100 , "k33": 140.299, "k34": 288.782},

    "C11" : {"k30": 1,"k31": 1,"k32": 85.700 , "k33": 175.100, "k34": 383.900},
    "C12" : {"k30": 1,"k31": 1,"k32": 82.500 , "k33": 168.800, "k34": 370.200},
    "C13" : {"k30": 1,"k31": 1,"k32": 78.900 , "k33": 161.500, "k34": 354.500},
    "C14" : {"k30": 1,"k31": 1,"k32": 74.700 , "k33": 152.900, "k34": 335.620}, //valor k33,k34 temporal
    "C15" : {"k30": 1,"k31": 1,"k32": 71.600 , "k33": 146.000, "k34": 319.600},
    "C16" : {"k30": 1,"k31": 1,"k32": 64.800 , "k33": 132.500, "k34": 290.700},
    "C17" : {"k30": 1,"k31": 1,"k32": 63.000 , "k33": 128.000, "k34": 279.100},
    "C18" : {"k30": 1,"k31": 1,"k32": 59.700 , "k33": 121.300, "k34": 265.000},
    "C19" : {"k30": 1,"k31": 1,"k32": 56.400 , "k33": 114.800, "k34": 250.900},
    "C20" : {"k30": 1,"k31": 1,"k32": 53.100 , "k33": 108.300, "k34": 237.000},

    "C30" : {"k30": 1,"k31": 1,"k32": 43.300 , "k33": 88.310, "k34": 193.260},
    "C31" : {"k30": 1,"k31": 1,"k32": 38.600 , "k33": 78.730, "k34": 172.280},
    "C32" : {"k30": 1,"k31": 1,"k32": 33.900 , "k33": 69.140, "k34": 151.310},
    "C33" : {"k30": 1,"k31": 1,"k32": 29.100 , "k33": 59.350, "k34": 129.880}
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
  "C9":"C8",

  "C11":"C11",
  "C12":"C11",
  "C13":"C12",
  "C14":"C13",
  "C15":"C14",
  "C16":"C15",
  "C17":"C16",
  "C18":"C17",
  "C19":"C18",
  "C20":"C19",

  "C30":"C30",
  "C31":"C30",
  "C32":"C31",
  "C33":"C32"
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
const plotType_label = document.getElementById("plot-label");

const efic_plotType = document.getElementById("eficient-plot-type");
const efic_label = document.getElementById("eficient-label");

const HDD = document.getElementById("HDD");
const plotk = document.getElementById("plot-k");
const plotk_label = document.getElementById("plot-k_label");

const type = document.getElementById("type");
const resultsTableDiv = document.getElementById("results-table");

const calc = document.getElementById("text");

spaceInput.addEventListener("change", checkactive);
plotType.addEventListener("change", checkactive);
spaceUnit.addEventListener("change", checkactive);
plotk.addEventListener("change", checkactive);
type.addEventListener("change", typee);
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

function onload(){

  if (localStorage.getItem("type") != null){
    type.value = localStorage.getItem("type");
  }
}

function hdd_set(){
  text.innerText = "";
  if (HDD.value != "0"){
    spaceInput.value = hdd_predef[type.value][HDD.value];
  }
  checkactive();
}
function typee(){
  localStorage.setItem("type", type.value);
  hdd_set()
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
      plotType.classList.remove("hidden");
      plotType_label.classList.remove("hidden");

      k32_cont.classList.add("hidden");
      plotk.classList.add("hidden");
      plotk_label.classList.add("hidden");

      eficient_cont.classList.add("hidden");
      efic_plotType.classList.add("hidden");
      efic_label.classList.add("hidden");

      break;
    case "ck32":
      ck32.classList.add("active"); 
      norm.classList.remove("active"); 
      eficient.classList.remove("active");
    
      
      norm_cont.classList.add("hidden");
      plotType.classList.add("hidden");
      plotType_label.classList.add("hidden");

      k32_cont.classList.remove("hidden");
      plotk.classList.remove("hidden");
      plotk_label.classList.remove("hidden");

      eficient_cont.classList.add("hidden");
      efic_plotType.classList.add("hidden");
      efic_label.classList.add("hidden");
    
  
      break;
    case "efic":
      ck32.classList.remove("active"); 
      norm.classList.remove("active"); 
      eficient.classList.add("active");
    
      norm_cont.classList.add("hidden");
      plotType.classList.add("hidden");
      plotType_label.classList.add("hidden");

      k32_cont.classList.add("hidden");
      plotk.classList.remove("hidden");
      plotk_label.classList.remove("hidden");

      eficient_cont.classList.remove("hidden");
      efic_plotType.classList.remove("hidden");
      efic_label.classList.remove("hidden");
    
  
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

function calculateK32() {
  let val = spaceInput.value;
  if (spaceUnit.value === "TB") {
    val *= (type.value === "GIB") ? 1024 : 1000;
  }

  const n = {};

  const plotSizesKeys = Object.keys(plotSizes[type.value]);
  plotSizesKeys.forEach((key) => {
    n[key] = {
      numberOfK32Plots: Math.floor(val / plotSizes[type.value][key][plotk.value]),
      spaceUsedInGb: 0
    };
    n[key].spaceUsedInGb = n[key].numberOfK32Plots * plotSizes[type.value][key][plotk.value];
  });

  try {
    cargar(n, val);
  } catch (error) {
    console.error("Error al cargar los resultados:", error);
  }
}

function cargar(resultado, valor) {
  const keys = Object.keys(resultado);
  keys.forEach((key) => {
    const element = document.getElementById(key);
    if (!element) {
      console.error("Elemento no encontrado con ID:", key);
      return;
    }
    element.innerText = resultado[key].numberOfK32Plots;
    const percentage = (resultado[key].spaceUsedInGb / valor * 100).toFixed(2);
    const innerHTMLValue = resultado[key].spaceUsedInGb.toFixed(3) + " " + type.value + " (≈<strong>" + percentage + "%</strong>)";
    const elementG = document.getElementById(key + "g");
    if (!elementG) {
      console.error("Elemento no encontrado con ID:", key + "g");
      return;
    }
    elementG.innerHTML = innerHTMLValue;
  });
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
     if (tempvalue > val || main < 0){
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
onload();

