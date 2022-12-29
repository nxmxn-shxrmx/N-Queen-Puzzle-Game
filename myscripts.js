const start = document.getElementById("start");
const play = document.getElementById("play");
const levels = document.getElementById("levels");
const chess = document.getElementById("chess");
const content = document.getElementById("content");
const check = document.getElementById("check");
const back = document.getElementById("back");
let l = 4;
let total =0;
play.addEventListener("click", () => {
    start.classList.add("hide");
    levels.classList.remove("hide");
});
levels.addEventListener("click", (event) => {
    l = event.target.id[0] - "0" + 3;
    levels.classList.add("hide");
    content.classList.remove("hide");
    chess.style.gridTemplateColumns = "repeat(" + l + ",1fr)";
    chess.style.gridTemplateRows = "repeat(" + l + ",1fr)";

    var colChange = 1;

    for (var i = 0; i < l * l; ++i) {
        var newDiv = document.createElement("div");
        newDiv.id = i;
        newDiv.className = "block";
        chess.appendChild(newDiv);
        if (l % 2 == 0) {
            if (i % l == 0) colChange++;
            if (colChange % 2 == 0) newDiv.style.backgroundColor = "#f5f5f5";
            colChange++;
        } else {
            if (i % 2 == 0) newDiv.style.backgroundColor = "#f5f5f5";
        }
        newDiv.style.fontSize = 590 / (l + 2) + "px";
    }
});
chess.addEventListener("click", (event) => {
    if(event.target.id=="chess")
    return;
    var idL = event.target.id;
    if (idL[idL.length - 1] == "q") idL = idL.slice(0, idL.length - 1);
    var Block = document.getElementById(idL);
    var p = parseInt(idL / l) * l;
    if (Block.innerHTML.length == 0) {
        for (var i = p; i < p + l; ++i) {
            var B = document.getElementById(i);
            if(B.innerHTML.length!=0)
            B.innerHTML = "",total--;
        }
        Block.innerHTML = "<i class='fa-solid fa-chess-queen queen' id=" + idL + "q" + "></i>";
        total++;
    } else Block.innerHTML = "",total--;
});
check.addEventListener("click",()=>
{
    var arr = new Array(l);
    for(var  i =0;i<l;++i)
    arr[i]=new Array(l);
    for(var i = 0;i<l;++i)
    {   
        for(var j=0;j<l;++j)
        {
            var Block = document.getElementById(i*l+j);
            if(Block.innerHTML.length!=0)
            arr[i][j]=1;
            else
            arr[i][j]=0;
        }

    }
    if(total==0)
    {
        make(arr,0);
    }
    else if(total!=l)
        alert(total+"Not Fully Filled")
    
   else if(f(arr,0))
    {
        alert("correct");
    }
    else
    {
        alert("not correct");
    }
});
back.addEventListener("click",()=>
{
    content.classList.add("hide");
    levels.classList.remove("hide");
    for (var i = 0; i < l * l; ++i) {
        var newDiv = document.getElementById(i);
        chess.removeChild(newDiv);
    }
    l =4;
    total=0;
});
function correct(arr,i,j)
{
    for(var k =i+1;k<arr.length;++k)
    {   
        if(arr[k][j]==1)
            return false;
    }
    var p = i+1;
    var q = j+1;
    while(p<arr.length && q<arr.length)
    {
        if(arr[p][q]==1)
        return false;
        p++;
        q++;
    }
    p = i+1;
    q = j-1;
    while(q>=0 && p<arr.length)
    {
        if(arr[p][q]==1)
        return false;
        p++;
        q--;
    }
    return true;
}
function correct1(arr,i,j)
{
    for(var k =i-1;k>=0;--k)
    {   
        if(arr[k][j]==1)
            return false;
    }
    var p = i-1;
    var q = j-1;
    while(p>=0 && q>=0)
    {
        if(arr[p][q]==1)
        return false;
        p--;
        q--;
    }
    p = i-1;
    q = j+1;
    while(p>=0 && q<arr.length)
    {
        if(arr[p][q]==1)
        return false;
        q++;
        p--;
    }
    return true;
}
function f(arr,i)
{
    if(i==arr.length)
    return true;

    for(var j = 0;j<arr.length;++j)
    {
        if(arr[i][j]==1)
        {
            if(!correct(arr,i,j))
                return false;
        }
    }
    return f(arr,i+1);
}
function make(arr,i)
{
    if(i==arr.length)
    return true;

    for(var j =0;j<arr.length;++j)
    {
        
        arr[i][j]=1;
        var Block =document.getElementById(i*arr.length+j);
        total++;
        Block.innerHTML = "<i class='fa-solid fa-chess-queen queen' id=" + i*arr.length+j + "q" + "></i>";
        if(correct1(arr,i,j))
        {
            if(make(arr,i+1))
                return true;
            
        }
        total--;
        Block.innerHTML=""
        arr[i][j]=0;
    }

return false
}