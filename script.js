var clock=document.getElementById("clock");

var hours_tens=[document.getElementById("h_tens_8"), document.getElementById("h_tens_4"), 
document.getElementById("h_tens_2"), document.getElementById("h_tens_1")];

var hours_ones=[document.getElementById("h_ones_8"), document.getElementById("h_ones_4"), 
document.getElementById("h_ones_2"), document.getElementById("h_ones_1")];

var minutes_tens=[document.getElementById("m_tens_8"), document.getElementById("m_tens_4"), 
document.getElementById("m_tens_2"), document.getElementById("m_tens_1")];

var minutes_ones=[document.getElementById("m_ones_8"), document.getElementById("m_ones_4"), 
document.getElementById("m_ones_2"), document.getElementById("m_ones_1")];

var seconds_tens=[document.getElementById("s_tens_8"), document.getElementById("s_tens_4"), 
document.getElementById("s_tens_2"), document.getElementById("s_tens_1")];

var seconds_ones=[document.getElementById("s_ones_8"), document.getElementById("s_ones_4"), 
document.getElementById("s_ones_2"), document.getElementById("s_ones_1")];

// convert number to Binary-coded Decimal
function toBCD(n){ 
    if(Number.isInteger(n)){
        return n.toString().split('').map(digit=>parseInt(digit)
        .toString(2).padStart(4,'0')).join('');
    }
}

// main function to tick the clock
function tick(){
    let now=new Date()

    let hours=now.getHours();
    let minutes=now.getMinutes();
    let seconds=now.getSeconds();

    clock.innerHTML=String(hours).padStart(2,"0")+" : "+
    String(minutes).padStart(2,"0")+
    " : "+String(seconds).padStart(2,"0");

    var i=0,j=0,k=0;
    for(let bit of toBCD(hours)){
        // edit the binary representation of tens place digit
        if(i<4){
            if(bit === "0"){
                hours_tens[j].classList.remove("glowing");
            }
            else{
                hours_tens[j].classList.add("glowing");
            }
            j++;
        }
        // edit the binary representation of ones place digit
        else{
            if(bit === "0"){
                hours_ones[k].classList.remove("glowing");
            }
            else{
                hours_ones[k].classList.add("glowing");
            }
            k++;
        }
        i++;
    }

    i=0;
    j=0;
    k=0;
    for(let bit of toBCD(minutes)){
        if(i<4){
            if(bit === "0"){
                minutes_tens[j].classList.remove("glowing");
            }
            else{
                minutes_tens[j].classList.add("glowing");
            }
            j++;
        }
        else{
            if(bit === "0"){
                minutes_ones[k].classList.remove("glowing");
            }
            else{
                minutes_ones[k].classList.add("glowing");
            }
            k++;
        }
        i++;
    }

    i=0;
    j=0;
    k=0;
    for(let bit of toBCD(seconds)){
        if(i<4){
            if(bit === "0"){
                seconds_tens[j].classList.remove("glowing");
            }
            else{
                seconds_tens[j].classList.add("glowing");
            }
            j++;
        }
        else{
            if(bit === "0"){
                seconds_ones[k].classList.remove("glowing");
            }
            else{
                seconds_ones[k].classList.add("glowing");
            }
            k++;
        }
        i++;
    }
}   

setInterval(tick, 1000);