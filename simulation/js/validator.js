import { getBoxOrder } from "./main.js";
export function isFilled(){
    // checking verilog module
    let moduleName = document.getElementById("module-name");
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let output = document.getElementById("output-selector");
    let LHS = document.getElementById("LHS-selector");
    let operator = document.getElementById("operator-selector");
    let RHS = document.getElementById("logic-expression");
    let error = "Highlighted part of the code is incomplete."
    if (moduleName.value.trim() == '')
    {
        printErrors(error,moduleName);
        return false;
    }
    if(input1.value==="")
    {
        printErrors(error,input1);
        return false;   
    }
    if(input2.value==="")
    {
        printErrors(error,input2);
        return false;   
    }
    if(output.value==="")
    {
        printErrors(error,output);
        return false;   
    }
    if(LHS.value==="")
    {
        printErrors(error,LHS);
        return false;   
    }
    if(operator.value==="")
    {
        printErrors(error,operator);
        return false;   
    }
    if(RHS.value.trim()==="")
    {
        printErrors(error,RHS);
        return false;   
    }


    // checking verilog testbench
    let tbName = document.getElementById("tb-name");
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    let moduleNameTB = document.getElementById("module-name-tb");
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let arg3 = document.getElementById("argument3-selector");
    if (tbName.value.trim() == '')
    {
        printErrors(error,tbName);
        return false;
    }
    if(input1TB.value==="")
    {
        printErrors(error,input1TB);
        return false;   
    }
    if(input2TB.value==="")
    {
        printErrors(error,input2TB);
        return false;   
    }
    if(input3TB.value==="")
    {
        printErrors(error,input3TB);
        return false;   
    }
    if (moduleNameTB.value.trim() == '')
    {
        printErrors(error,moduleNameTB);
        return false;
    }
    if(arg1.value==="")
    {
        printErrors(error,arg1);
        return false;   
    }
    if(arg2.value==="")
    {
        printErrors(error,arg2);
        return false;   
    }
    if(arg3.value==="")
    {
        printErrors(error,arg3);
        return false;   
    }
    return true;
}

export function printErrors(errorMsg, errorID){
    document.getElementById('result').innerHTML = errorMsg;
    document.getElementById('result').classList.remove('text-success');
    document.getElementById('result').classList.add('text-danger');
    if(errorID) {
        errorID.classList.add('highlight');
        setTimeout(function() {
            errorID.classList.remove('highlight');
          }, 3000);
    }
}

export function isValid(){
    
    // checking the order of the codeblocks
    const boxOrder1 = getBoxOrder('module');
    const boxOrder2 = getBoxOrder('tb');
    let container = document.getElementById("container");
    let containerTB = document.getElementById("containerTB");
    if(boxOrder1[0]!=="1" || boxOrder1[1]!=="2" || boxOrder1[2]!=="3")
    {
        let msg = "Please rearrange the code blocks of the Verilog Module in the correct order."
        printErrors(msg,container);
        return false;
    }
    if(boxOrder2[0]!=="1TB" || boxOrder2[1]!=="2TB" || boxOrder2[2]!=="3TB" || boxOrder2[3]!=="4TB" || boxOrder2[4]!=="5TB")
    {
        let msg = "Please rearrange the code blocks of the Verilog Testbench in the correct order."
        printErrors(msg,containerTB);
        return false;
    }

    
    // Checking if the module and testbench names are valid
    let tbName = document.getElementById("tb-name");
    let moduleNameTB = document.getElementById("module-name-tb");
    let moduleName = document.getElementById("module-name"); 
    var regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if(!regex.test(moduleName.value.trim()))
    {
        let msg = "Invalid Module Name.";
        printErrors(msg,moduleName);
        return false;
    }
    if(!regex.test(moduleNameTB.value.trim()))
    {
        let msg = "Invalid Module Name.";
        printErrors(msg,moduleNameTB);
        return false;
    }
    if(!regex.test(tbName.value.trim()))
    {
        let msg = "Invalid Testbench Name."
        printErrors(msg,tbName);
        return false;
    }

    // checking if module name matches in both code and tb
    if(moduleName.value.trim()!==moduleNameTB.value.trim())
    {
        let msg = "There is no verilog module defined with the name " +  moduleNameTB.value.trim();
        printErrors(msg,moduleNameTB);
        return false;
    }

    // checking if module name is not equal to the temporary function name used to call the module in the testbench
    if(moduleNameTB.value.trim()==="uut")
    {
        let msg = "The name of the module instantiated and the temporary function name (uut) used to instantiate the module in the testbench cannot be the same.";
        printErrors(msg,moduleNameTB);
        return false;
    }

    // checking the input and output argument declaration in the module
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let output = document.getElementById("output-selector");
    if(input1.value===input2.value || input1.value===output.value) 
    {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg,input1);
        return false;
    }
    if(input2.value===output.value)
    {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg,input2);
        return false;
    }

    // checking assign block
    let LHS = document.getElementById("LHS-selector");
    let operator = document.getElementById("operator-selector");
    let RHS = document.getElementById("logic-expression");
    if(LHS.value===input1.value || LHS.value===input2.value)
    {
        let msg = 'Inputs of a verilog module cannot be assigned values directly within the module itself.'
        printErrors(msg,LHS);
        return false;
    }
    if(LHS.value===RHS.value.trim())
    {
        let msg = 'Highlighted part represents self-assignment which is invalid in procedural blocks.'
        printErrors(msg,RHS);
        return false;
    }
    if(operator.value==="<=")
    {
        let msg = "This operator is incorrect for a combinational behaviour.";
        printErrors(msg,operator);
        return false;
    }
    let rhs =RHS.value.trim();
    if(selectedTab===0)
    {
        if(rhs.replace(/ /g, '')!='A|B' && rhs.replace(/ /g, '')!='(A|B)' && rhs.replace(/ /g, '')!='B|A' && rhs.replace(/ /g, '')!='(B|A)')
        {
            let msg = 'Highlighted code part is incorrect.'
            printErrors(msg,RHS);
            return false;
        }
    }
    else if(selectedTab===1)
    {
        if(rhs.replace(/ /g, '')!='~(A|B)'&& rhs.replace(/ /g, '')!='~(B|A)')
        {
            let msg = 'Highlighted code part is incorrect.'
            printErrors(msg,RHS);
            return false;
        }
    }
    else if(selectedTab===2)
    {
        if(rhs.replace(/ /g, '')!='~(A&B)' && rhs.replace(/ /g, '')!='~(B&A)')
        {
            let msg = 'Highlighted code part is incorrect.'
            printErrors(msg,RHS);
            return false;
        }
    }
    else if(selectedTab===3)
    {
        if(rhs.replace(/ /g, '')!='A&B' && rhs.replace(/ /g, '')!='(A&B)' && rhs.replace(/ /g, '')!='B&A' && rhs.replace(/ /g, '')!='(B&A)')
        {
            let msg = 'Highlighted code part is incorrect.'
            printErrors(msg,RHS);
            return false;
        }
    }

    // checking i/o and function call arguments in test bench
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    if(input1TB.value===input2TB.value || input1TB.value===input3TB.value) 
    {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg,input1TB);
        return false;
    }
    if(input2TB.value===input3TB.value)
    {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg,input2TB);
        return false;
    }
    if(input3TB.value==="A" || input3TB.value==="B")
    {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg,input3TB);
        return false;
    }
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let arg3 = document.getElementById("argument3-selector");
    if(arg3.value==="A" || arg3.value==="B")
    {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg3);
        return false;
    }
    if(arg1.value==="Y")
    {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg1);
        return false;
    }
    if(arg2.value==="Y")
    {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg2);
        return false;
    }
    return true;
}

export function printObsTable(selectedTab){
    let arg1 = document.getElementById("argument1-selector").value;
    let arg2 = document.getElementById("argument2-selector").value;
    let Y = [];
    let arr = {"A" : [0,0,1,1],"B" :[0,1,0,1]};
    let Y1 = [0,1,1,1]; //output of OR
    let Y2 = [1,0,0,0]; //output of NOR
    let Y3 = [1,1,1,0]; //OUTPUT OF NAND
    let Y4 = [0,0,0,1]; //output of AND
    Y.push(Y1);
    Y.push(Y2);
    Y.push(Y3);
    Y.push(Y4);
    let body = "";
    let isCorrect = true;
    for(let i=0; i<4;++i)
    {
        let y;
        if(selectedTab===0)
        y = +(arr[arg1][i] || arr[arg2][i]);
        else if(selectedTab===1)
        y = +!(y = arr[arg1][i] || arr[arg2][i]);
        else if(selectedTab===2)
        y = +!(arr[arg1][i] && arr[arg2][i]);
        else if(selectedTab===3)
        y = +(arr[arg1][i] && arr[arg2][i]);
        if(y!== Y[selectedTab][i])
        {
            isCorrect = false;
            body+=`<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><td class="failure-table"> ${Y[selectedTab][i]} </td><td class="failure-table"> ${y}</td>`;
        }
        else
        {
            body+=`<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><td class="success-table"> ${Y[selectedTab][i]} </td><td class="success-table"> ${y}</td>`;
        }
    }
    document.getElementById("table-body").innerHTML = body;
    if(isCorrect)
    {
        document.getElementById("result").innerHTML = "<span>&#10003;</span> Success"
        document.getElementById("result").className = "text-success";
    }
    else
    {
        document.getElementById("result").innerHTML = "<span>&#10007;</span> Fail";
        document.getElementById("result").className = "text-danger";
    }
    return;
}

