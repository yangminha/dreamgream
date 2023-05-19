
let palD = 100;
let palTmpCount = 0;
let palTmpGrey = new Array(palD*palD);
let palTmpIdx = new Array(palD*palD);

var pR = new Array(256);
var pG = new Array(256);
var pB = new Array(256);

function setPallete() {
  pallete.loadPixels();
  let divx = pallete.width/palD;
  let divy = pallete.height/palD;
  let index = 0;
  for (let y=0; y<palD; y++) {
    for (let x=0; x<palD; x++) {
      index = (parseInt(x*divx) + parseInt(y*divy)*pallete.width)*4;  
      let _r = pallete.pixels[index];
      let _g = pallete.pixels[index+1];
      let _b = pallete.pixels[index+2];
      let _a = pallete.pixels[index+3];
      if (_a>5) {
        palTmpGrey[palTmpCount] = (_r+_g+_b)*0.333;
        palTmpIdx[palTmpCount] = index;
        palTmpCount++;
      }
    }
  }
  
  quick_sort(0, palTmpCount-1);
  let divIdx = palTmpCount/256.0;
  for (let i=0; i<256; i++) {
    let ii = parseInt(i*divIdx);
    pR[i] = pallete.pixels[palTmpIdx[ii]];
    pG[i] = pallete.pixels[palTmpIdx[ii]+1];
    pB[i] = pallete.pixels[palTmpIdx[ii]+2];
    //print("r="+pR[i]+" g="+pG[i]+" b="+pB[i]);
  }
}
function quick_sort(left, right){

  if(left<right){
    let q = partition(left, right);

    quick_sort(left, q-1);
    quick_sort(q+1, right);
  }

}
function partition(left, right){
  let pivot, pivotIdx, temp, tempIdx;
  let low, high;

  low = left;
  high = right + 1;
  pivot = palTmpGrey[left];
  pivotIdx = palTmpIdx[left];
  
  do{
    do {
      low++;
    } while (low<=right && palTmpGrey[low]<pivot);

    do {
      high--;
    } while (high>=left && palTmpGrey[high]>pivot);

    if(low<high){
      temp = palTmpGrey[low];
      palTmpGrey[low] = palTmpGrey[high];
      palTmpGrey[high] = temp;
      tempIdx = palTmpIdx[low];
      palTmpIdx[low] = palTmpIdx[high];
      palTmpIdx[high] = tempIdx;
    }
  } while (low<high);
  
  temp = palTmpGrey[left];
  palTmpGrey[left] = palTmpGrey[high];
  palTmpGrey[high] = temp;
  tempIdx = palTmpIdx[left];
  palTmpIdx[left] = palTmpIdx[high];
  palTmpIdx[high] = tempIdx;

  return high;
}

function getGrey(x, y) {
  let x1 = parseInt(x*(img.width/width));
  let y1 = parseInt(y*(img.height/height));
  let idx = (x1 + y1*img.width)*4;
  let grey = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  return grey;
}
function getRed(x, y) {
  let x1 = parseInt(x*(img.width/width));
  let y1 = parseInt(y*(img.height/height));
  let idx = (x1 + y1*img.width)*4;
  let grey = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  return pR[grey];
}
function getGreen(x, y) {
  let x1 = parseInt(x*(img.width/width));
  let y1 = parseInt(y*(img.height/height));
  let idx = (x1 + y1*img.width)*4;
  let grey = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  return pG[grey];
}
function getBlue(x, y) {
  let x1 = parseInt(x*(img.width/width));
  let y1 = parseInt(y*(img.height/height));
  let idx = (x1 + y1*img.width)*4;
  let grey = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  return pB[grey];
}
function getR(x, y) {
  let x1 = parseInt(x*(img.width/width));
  let y1 = parseInt(y*(img.height/height));
  let idx = (x1 + y1*img.width)*4;
  return img.pixels[idx];
}
function getG(x, y) {
  let x1 = parseInt(x*(img.width/width));
  let y1 = parseInt(y*(img.height/height));
  let idx = (x1 + y1*img.width)*4;
  return img.pixels[idx+1];
}
function getB(x, y) {
  let x1 = parseInt(x*(img.width/width));
  let y1 = parseInt(y*(img.height/height));
  let idx = (x1 + y1*img.width)*4;
  return img.pixels[idx+2];
}

function getGrey2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = (x1 + y1*img.width)*4;
  let gr = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    gr = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  }
  //print(gr);
  return gr;
}
function getRed2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = (x1 + y1*img.width)*4;
  let gr = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    gr = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  }
  return pR[gr];
}
function getGreen2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = (x1 + y1*img.width)*4;
  let gr = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    gr = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  }
  return pG[gr];
}
function getBlue2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = (x1 + y1*img.width)*4;
  let gr = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    gr = parseInt((img.pixels[idx] + img.pixels[idx+1] + img.pixels[idx+2])/3.0);
  }
  return pB[gr];
}
function getIdx2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    idx = (x1 + y1*img.width)*4;
  }
  return idx;
}
function getR2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    idx = (x1 + y1*img.width)*4;
  }
  return img.pixels[idx];
}
function getG2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    idx = (x1 + y1*img.width)*4;
  }
  return img.pixels[idx+1];
}
function getB2(x, y, _startx, _starty, _ratiow, _ratioh) {
  let x1 = parseInt((x-_startx)*(img.width/_ratiow));
  let y1 = parseInt((y-_starty)*(img.height/_ratioh));
  let idx = 0;
  if (x1>=0 && x1<img.width && y1>=0 && y1<img.height) {
    idx = (x1 + y1*img.width)*4;
  }
  return img.pixels[idx+2];
}



