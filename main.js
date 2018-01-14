var fnNames =   ["A",           "a",        "B",        "b",        "C",        "c"];
var eles = []; // page elements
var selected_idx = -1;
var canvas;
var ctx;
var fns = [new Sin(), new Sin(), new Sin(), new Sin(), new Sin(), new Sin()];

var standard = ["$\\sinHI x$", 
                "$\\cscHI x$", 
                "$\\cosHI x$", 
                "$\\secHI x$", 
                "$\\tanHI x$", 
                "$\\cotHI x$"];

var standard_der = ["$\\cos x$", 
                    "$-\\csc x\\cot x$", 
                    "$-\\sin x$", 
                    "$\\tan x\\sec x$", 
                    "$\\sec^{2} x$", 
                    "$-\\csc^2 x$"];

var standard_int = ["$-\\cos x$", 
                    "$\\ln{\|\\csc x - \\cot x\\,\|}$", 
                    "$\\sin x$", 
                    "$\\ln{\|\\tan x + \\sec x\\,\|}$", 
                    "$\\ln{\|\\sec x\\,\|}$", 
                    "$\\ln{\|\\sin x\\,\|}$"];

var inverse_der  = ["${1\\over \\sqrt{1-x^2}}$", 
                    "${-1\\over \| x \|\\sqrt{x^2-1} }$", 
                    "${-1\\over \\sqrt{1-x^2}}$", 
                    "${1\\over \| x \|\\sqrt{x^2-1} }$", 
                    "${1\\over 1+x^2}$", 
                    "${-1\\over 1+x^2}$"];

var hyper_der =    ["$\\cosh x$", 
                    "$-\\csch x\\coth x$", 
                    "$\\sinh x$", 
                    "$-\\sech x\\tanh x$", 
                    "$\\sech^2 x$", 
                    "$-\\csch^2 x$"];

var hyper_int =    ["$\\cosh x$", 
                    "$\\ln \|\\tanh {x\\over 2} \\,\|$", 
                    "$\\sinh x$", 
                    "$\\tan^{-1} \|\\sinh x\\,\|$", 
                    "$\\ln \\cosh x$", 
                    "$\\ln \\sinh x$"];


var hype_inv_der  = ["${1\\over \\sqrt{x^2+1}}$",            // sinh
                     "${-1\\over \|x\| \\sqrt{1-x^2} }$",   // csch
                     "${1\\over \\sqrt{x^2-1}}$",           // cosh
                     "${-1\\over x\\sqrt{1-x^2} }$",    // sech
                     "${1\\over 1-x^2}$",                    // tanh
                     "${1\\over 1-x^2}$"];                  // coth

function Sin() {
    this.standard = ["$\\cos x$", "$\\sin x$", "$-\\cos x$"];
    this.hyperbolic = ["$\\cosh x$", "$\\sinh x$", "$\\cosh x$"];
    this.inverse = ["${1\\over \\sqrt{1-x^2}}$", "$\\sin^{-1} x$", ""];
    this.hyper_inv = ["${1\\over \\sqrt{x^2+1}}$", "$\\sinh^{-1} x$", ""];
    
    this.info = function(hyper, inverse, der_level) {
        der_level -= 1; // 0 based indexing
        if (!hyper && !inverse) {
            return this.standard[der_level];
        } else if (hyper && !inverse) {
            return this.hyper[der_level];
        } else {
            return this.hyper_inv[der_level];
        }
    }

    this.graph = function(hyper, inverse, der_level) {
        if (!hyper && !inverse) {
            
        } else if (hyper && !inverse) {
            
        } else {
            
        }
    }
}

function refresh(eles, hyper, inverse, der_level) {

    for (let i = 0; i < eles.length; i++) {
        if (der_level == 1) {
            let text = "";
            if (hyper == true && inverse == true) {
                text = hype_inv_der[i];
            } else if (hyper == true && inverse == false) {
                text = hyper_der[i];
            } else if (hyper == false && inverse == false) {
                text = standard_der[i];
            } else if (hyper == false && inverse) {
                text = inverse_der[i];
            }
    
            eles[i].innerHTML = text;
        } else if (der_level == 2) {
            let text = standard[i];
            
            if (hyper) {
                text = text.replace("H", "h");
            } else {
                text = text.replace("H", "");
            }
    
            if (inverse) {
                text = text.replace("I", "^{-1}");
            } else {
                text = text.replace("I", "");
            }
    
            eles[i].innerHTML = text;
        } else if (der_level == 3) {
            let text = "";

            if (hyper == true && inverse == false) {
                text = hyper_int[i];
            } else if (hyper == false && inverse == false) {
                text = standard_int[i];
            }
    
            eles[i].innerHTML = text;
        }
    }

    //let s = new Sin();

    //eles[0].innerHTML = s.info(hyper, inverse, der_level);

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function clicked(idx) {
    if (selected_idx == idx) {
        eles[selected_idx].style.backgroundColor = "#FFFFFF";
        selected_idx = -1;
        return;
    }

    for (let i = 0; i < eles.length; i++) {
        let ele = eles[i];
        ele.style.backgroundColor = "#FFFFFF";
    }
    eles[idx].style.backgroundColor = "#FFFFEE";

    selected_idx = idx;

    ctx.fillStyle = "black";
    ctx.fillRect(10, 10, 40, 40);
}

window.onload = function() {
    MathJax.Hub.processSectionDelay = 0;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 200, 200);

    var hyper = false;
    var inverse = false;
    var der_level = 2;

    for (let i = 0; i < fnNames.length; i++) {
        let ele = document.getElementById(fnNames[i]);

        ele.addEventListener('click', function(evt){
            for (idx in evt.path) {
                let ele = evt.path[idx];
                if (ele.nodeName == "TD") {
                    clicked(i);
                    break;
                }
            }
        });

        eles.push(ele);
    }

    // controls
    document.getElementById("hyperbolic").onchange = function() {
        hyper = !hyper;
        refresh(eles, hyper, inverse, der_level);
    };

    document.getElementById("inverse").onchange = function() {
        inverse = !inverse;
        refresh(eles, hyper, inverse, der_level);
    };

    document.getElementById("diff").onclick = function() {
        der_level -= 1;
        if (der_level < 1) {
            der_level = 1;
        }
        refresh(eles, hyper, inverse, der_level);
    };

    document.getElementById("int").onclick = function() {
        der_level += 1;
        if (der_level > 3) {
            der_level = 3;
        }
        refresh(eles, hyper, inverse, der_level);
    };

    refresh(eles, hyper, inverse, der_level);
};