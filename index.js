let mode = document.getElementById("style");

function toggleMode() {
    if(mode.getAttribute("href") == "style-light.css") {
        mode.setAttribute("href", "style-dark.css");
        document.getElementById("toggle-icon").src = "icons/dark-mode.png";    
    }
    else {
        mode.setAttribute("href", "style-light.css");
        document.getElementById("toggle-icon").src= "icons/light-mode.png";   
    }
}
var screen = document.querySelector('#screen');
var btns = document.querySelectorAll('.btn');
let expression = ""
let degOrRad = 'rad'
let isEvaluated = false;
for(item of btns) {
    item.addEventListener('click', (ev)=>{
        if(isEvaluated) {
            expression  = "";
            screen.value = "";
            isEvaluated = false;
        }
        btntext = ev.target.innerText;
        
        if(btntext == 'deg') {
            document.querySelector('.degRad').textContent = 'rad'
            degOrRad = 'deg';
        }
        else if(btntext == 'rad') {
            document.querySelector('.degRad').textContent = 'deg'
            degOrRad = 'rad';
        }
        else if(btntext == '×') {
            screen.value += btntext;
            expression += '*';
        }
        else if(btntext == '÷') {
            screen.value += btntext;
            expression += '/';
        }
        else if(btntext == 'π')
         {
            screen.value += 'π';
            (expression=='' || expression=='0')?expression = Math.PI :((isNaN(expression[-1]))? expression+= Math.PI : expression+= '*' + Math.PI);
         }
        else if(btntext == 'e') {
            screen.value += 'e';
            (expression=='' || expression=='0')?expression = Math.E :((isNaN(expression[-1]))? expression+= Math.E : expression+= '*' + Math.E);
        }
        else if(btntext == '%') {
            let symIndex = 0;
            let strExp = String(expression);
            for(let i = strExp.length - 1; i >= 0; i--) {
                if(isNaN(parseInt(strExp[i]))) {
                    symIndex = i;
                    break;
                }
            }
            if(strExp.substring(0, symIndex) != '') {
            let tempEval = eval(strExp.substring(0, symIndex));
            let percentage = eval(strExp.substring(symIndex + 1)) / 100;
            expression = expression.slice(0, symIndex + 1) + (tempEval * percentage)
            console.log(expression)
            let tempDisplay = screen.value;
            screen.value = tempDisplay.slice(0, (tempDisplay.lastIndexOf(strExp[symIndex]) + 1)) + parseFloat((tempEval * percentage).toFixed(5));
            }
            else {
                screen.value = eval(String(expression)) / 100;
                expression = eval(String(expression)) / 100;
            }
        }
        else if(btntext == 'xy') {
            screen.value += '^';
            expression += '**';
        }
        else if(btntext == '1/x') {
            screen.value += '^(-1)';
            expression += '**(-1)';
        }
        else if(btntext == 'x!') {
            screen.value += '!';
            expression = factorial(eval(String(expression)))
        }
        else if(btntext == 'AC') {
            expression = '';
            screen.value = ""
        }
        else if(btntext == 'CE') {
            expression = expression.slice(0,-1);
            screen.value = screen.value.slice(0, -1);
        }
        else if(btntext == 'sin') {
            screen.value+= btntext + '(';
            expression+= 'sin('    
        }
        else if(btntext == 'sin-1') {
            screen.value+= 'arcsin(';
            expression+= 'arcsin('    
        }
        else if(btntext == 'cos') {
            screen.value+= btntext + '(';
            expression+= 'cos('    
        }
        else if(btntext == 'cos-1') {
            screen.value+= 'arccos(';
            expression+= 'arccos('    
        }
        else if(btntext == 'tan') {
            screen.value+= btntext + '(';
            expression+= 'tan('    
        }
        else if(btntext == 'tan-1') {
            screen.value+= 'arctan(';
            expression+= 'arctan('    
        }
        else if(btntext == 'ln') {
            screen.value+= btntext + '(';
            expression+= 'ln('    
        }
        else if(btntext == 'log') {
            screen.value+= btntext + '(';
            expression+= 'log('    
        }
        else if(btntext == '√') {
            screen.value+= btntext + '(';
            expression+= '√('    
        }
        else if(btntext == ')') {
            screen.value+= btntext;
            let tempStr = String(expression);
            let temp = tempStr.substring(tempStr.lastIndexOf('(') + 1);
            expression = expression.slice(0,expression.lastIndexOf('(')) + eval(temp);
            if(expression.includes('sin') && !expression.includes('arc')) {
                let occ = expression.lastIndexOf('sin')
                let deg = parseFloat(expression.substring(occ+3))

                if(degOrRad == 'deg')
                    expression = expression.slice(0, occ) + parseFloat(Math.sin((Math.PI / 180) * deg).toFixed(5));
                else
                    expression = expression.slice(0, occ) + parseFloat(Math.sin(deg).toFixed(5));  
            }
            else if(expression.includes('arcsin')) {
                
                let occ = expression.lastIndexOf('arcsin')
                let val = parseFloat(expression.substring(occ+6))
                if(degOrRad == 'deg')
                    expression = expression.slice(0, occ) + parseFloat(((180 / Math.PI) * Math.asin(val)).toFixed(5));
                else
                    expression = expression.slice(0, occ) + parseFloat(Math.asin(val).toFixed(5));
            }
            else if(expression.includes('cos') && !expression.includes('arc')) {
                let occ = expression.lastIndexOf('cos')
                let deg = parseFloat(expression.substring(occ+3))
                if(degOrRad == 'deg')
                    expression = expression.slice(0, occ) + parseFloat(Math.cos((Math.PI / 180) * deg).toFixed(5));
                else
                    expression = expression.slice(0, occ) + parseFloat(Math.cos(deg).toFixed(5));
            }
            if(expression.includes('arccos')) {
                let occ = expression.lastIndexOf('arccos')
                let val = parseFloat(expression.substring(occ+6))
                if(degOrRad=='deg')
                    expression = expression.slice(0, occ) + parseFloat(((180 / Math.PI) * Math.acos(val)).toFixed(5));
                else
                    expression = expression.slice(0, occ) + parseFloat(Math.acos(val).toFixed(5));
            }
            else if(expression.includes('tan') && !expression.includes('arc')) {
                let occ = expression.lastIndexOf('tan')
                let deg = parseFloat(expression.substring(occ+3))
                if(degOrRad == 'deg')
                    expression = expression.slice(0, occ) + parseFloat(Math.tan((Math.PI / 180) * deg).toFixed(5));
                else
                expression = expression.slice(0, occ) + parseFloat(Math.tan(deg).toFixed(5));
            }
            if(expression.includes('arctan')) {
                let occ = expression.lastIndexOf('arctan')
                console.log(occ)
                let val = parseFloat(expression.substring(occ+6))
                if(degOrRad == 'deg')
                    expression = expression.slice(0, occ) + parseFloat(((180 / Math.PI) * Math.atan(val)).toFixed(5));
                else
                expression = expression.slice(0, occ) + parseFloat(Math.atan(val).toFixed(5));
            }
            else if(expression.includes('ln')) {
                let occ = expression.lastIndexOf('ln')
                let arg = parseFloat(expression.substring(occ+2))
                expression = expression.slice(0, occ) + parseFloat(Math.log(arg).toFixed(5));
            }
            else if(expression.includes('log')) {
                let occ = expression.lastIndexOf('log')
                let arg = parseFloat(expression.substring(occ+3))
                expression = expression.slice(0, occ) + parseFloat(Math.log10(arg).toFixed(5));
            }
            else if(expression.includes('√')) {
                let occ = expression.lastIndexOf('√')
                let arg = parseFloat(expression.substring(occ+1))
                expression = expression.slice(0, occ) + parseFloat(Math.sqrt(arg).toFixed(5));
            }
        }

        else if(btntext == '=') {
            evaluate();
            isEvaluated = true;
        }

        else {
            expression+= btntext;
            screen.value += btntext;
        }
    });
}

function factorial(n) {
    if(n==0) 
        return 1;
    return n * factorial(n-1);
}
function evaluate() {
    try {
      let result = eval(expression);
      screen.value = result;
    } 
    catch (error) {
        screen.value = 'Error';
    }
}
