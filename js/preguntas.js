//CREAMOS LAS VARIABLES
var nota = 0.0;
var respuestasRadio1 = [];
var respuestasRadio2 = [];
var respuestaSelect1 = null;
var respuestaSelect2 = null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var formElement = null;
var respuestasMultiple1 = [];
var respuestasMultiple2 = [];
var respuestaText1 = null;
var respuestaText2 = null;

window.onload = function () {

    //CORRECCIÓN 
    formElement = document.getElementById('myForm');
    formElement.onsubmit = function () {
        inicializar();
        if (comprobar()) {
            cRadio1();
            cText1();
            cCheckbox1();
            cSelect1();
            cMultiple1();
            cRadio2();
            cText2();
            cCheckbox2();
            cSelect2();
            cMultiple2();
            Nota();
        }
        return false;
    };

//FUNCIÓN DEL XML
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "xml/preguntas.xml", true);
    xhttp.send();
}


function gestionarXml(dadesXml) {
    //PARSE XML
    var xmlDoc = dadesXml.responseXML;

    //LA PRIMERA PREGUNTA TIPO RADIO
    var tituloRadio1 = xmlDoc.getElementsByTagName("title")[0].innerHTML;  
    var opcionesRadio1 = [];   
    var noptr1 = xmlDoc.getElementById("1").getElementsByTagName('option').length;    
    for (i = 0; i < noptr1; i++) {
        opcionesRadio1[i] = xmlDoc.getElementById("1").getElementsByTagName('option')[i].innerHTML;
    }
    datosRadio1(tituloRadio1, opcionesRadio1);
    var nresr1 = xmlDoc.getElementById("1").getElementsByTagName('answer').length;
    for (i = 0; i < nresr1; i++) {
        respuestasRadio1[i] = xmlDoc.getElementById("1").getElementsByTagName("answer")[i].innerHTML;
    }
    //LA SEGUNDA PREGUNTA TIPO RADIO
    var tituloRadio2 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
    var opcionesRadio2 = [];
    var noptr2 = xmlDoc.getElementById("6").getElementsByTagName('option').length;
    for (i = 0; i < noptr2; i++) {
        opcionesRadio2[i] = xmlDoc.getElementById("6").getElementsByTagName('option')[i].innerHTML;
    }
    datosRadio2(tituloRadio2, opcionesRadio2);
    var nresr2 = xmlDoc.getElementById("6").getElementsByTagName('answer').length;
    for (i = 0; i < nresr2; i++) {
        respuestasRadio2[i] = xmlDoc.getElementById("6").getElementsByTagName("answer")[i].innerHTML;
    }

    //LA PRIMERA PREGUNTA TIPO TEXT
    var tituloText1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;   
    datosText1(tituloText1);    
    respuestaText1 = String(xmlDoc.getElementsByTagName("answer")[1].innerHTML);   
    //LA SEGUNDA PREGUNTA TIPO TEXT
    var tituloText2 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
    datosText2(tituloText2);
    respuestaText2 = String(xmlDoc.getElementsByTagName("answer")[7].innerHTML);

    //LA PRIMERA PREGUNTA TIPO SELECT
    var tituloSelect1 = xmlDoc.getElementsByTagName("title")[3].innerHTML;  
    var opcionesSelect1 = [];   
    var nopts1 = xmlDoc.getElementById("4").getElementsByTagName('option').length;  
    for (i = 0; i < nopts1; i++) {
        opcionesSelect1[i] = xmlDoc.getElementById("4").getElementsByTagName('option')[i].innerHTML;
    }    
    datosSelect1(tituloSelect1, opcionesSelect1);    
    respuestaSelect1 = parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);   
    //LA SEGUNDA PREGUNTA TIPO SELECT
    var tituloSelect2 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
    var opcionesSelect2 = [];
    var nopts2 = xmlDoc.getElementById("9").getElementsByTagName('option').length;
    for (i = 0; i < nopts2; i++) {
        opcionesSelect2[i] = xmlDoc.getElementById("9").getElementsByTagName('option')[i].innerHTML;
    }
    datosSelect2(tituloSelect2, opcionesSelect2);
    respuestaSelect2 = parseInt(xmlDoc.getElementsByTagName("answer")[11].innerHTML);

    //LA PRIMERA PREGUNTA TIPO MÚLTIPLE
    var tituloMultiple1 = xmlDoc.getElementsByTagName("title")[4].innerHTML;  
    var opcionesMultiple1 = []; 
    var noptm1 = xmlDoc.getElementById("5").getElementsByTagName('option').length;   
    var nresm1 = xmlDoc.getElementById("5").getElementsByTagName('answer').length; 
    for (i = 0; i < noptm1; i++) {
        opcionesMultiple1[i] = xmlDoc.getElementById("5").getElementsByTagName('option')[i].innerHTML;
    }   
    datosMultiple1(tituloMultiple1, opcionesMultiple1);   
    for (i = 0; i < nresm1; i++) {
        respuestasMultiple1[i] = xmlDoc.getElementById("5").getElementsByTagName("answer")[i].innerHTML;
    }  
    //LA SEGUNDA PREGUNTA TIPO MÚLTIPLE
    var tituloMultiple2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
    var opcionesMultiple2 = [];
    var noptm2 = xmlDoc.getElementById("10").getElementsByTagName('option').length;
    var nresm2 = xmlDoc.getElementById("10").getElementsByTagName('answer').length;
    for (i = 0; i < noptm2; i++) {
        opcionesMultiple2[i] = xmlDoc.getElementById("10").getElementsByTagName('option')[i].innerHTML;
    }
    datosMultiple2(tituloMultiple2, opcionesMultiple2);
    for (i = 0; i < nresm2; i++) {
        respuestasMultiple2[i] = xmlDoc.getElementById("10").getElementsByTagName("answer")[i].innerHTML;
    }

    //LA PRIMERA PREGUNTA TIPO CHECKBOX
    var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[2].innerHTML;   
    var opcionesCheckbox1 = [];  
    var noptc1 = xmlDoc.getElementById("3").getElementsByTagName('option').length;    
    for (i = 0; i < noptc1; i++) {
        opcionesCheckbox1[i] = xmlDoc.getElementById("3").getElementsByTagName('option')[i].innerHTML;
    }    
    datosCheckbox1(tituloCheckbox1, opcionesCheckbox1);  
    var nresc1 = xmlDoc.getElementById("3").getElementsByTagName('answer').length;   
    for (i = 0; i < nresc1; i++) {
        respuestasCheckbox1[i] = xmlDoc.getElementById("3").getElementsByTagName("answer")[i].innerHTML;
    }   
    //LA SEGUNDA PREGUNTA TIPO CHECKBOX
    var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
    var opcionesCheckbox2 = [];
    var noptc2 = xmlDoc.getElementById("8").getElementsByTagName('option').length;
    for (i = 0; i < noptc2; i++) {
        opcionesCheckbox2[i] = xmlDoc.getElementById("8").getElementsByTagName('option')[i].innerHTML;
    }
    datosCheckbox2(tituloCheckbox2, opcionesCheckbox2);
    var nresc2 = xmlDoc.getElementById("8").getElementsByTagName('answer').length;
    for (i = 0; i < nresc2; i++) {
        respuestasCheckbox2[i] = xmlDoc.getElementById("8").getElementsByTagName("answer")[i].innerHTML;
    }
}

//LA FUNCIÓN QUE HACE QUE SE CORRIJA
function cRadio1() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.año.length; i++) {
        if (f.año[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasRadio1.length; j++) {
                if (i == respuestasRadio1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 2.0 / respuestasRadio1.length;
                mostrarResultado("Pregunta 1: ¡Correcto!");
            } else {
                nota -= 0.33 / respuestasRadio1.length;
                mostrarResultado("Pregunta 1: ¡Incorrecto!");
            }
        }
    }
}

function cRadio2() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.verbo.length; i++) {
        if (f.verbo[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasRadio2.length; j++) {
                if (i == respuestasRadio2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasRadio2.length;
                mostrarResultado("Pregunta 6: ¡Correcto!");
            } else {
                nota -= 0.33 / respuestasRadio2.length;
                mostrarResultado("Pregunta 6: ¡Incorrecto!");
            }
        }
    }
}

function cText1() {
    var t = document.getElementById("text1").value;
    var s = t.toUpperCase();
    var res = respuestaText1.toUpperCase();
    if (s == res) {
        mostrarResultado("Pregunta 2: ¡Correcto!");
        nota += 1;
    } else {
        mostrarResultado("Pregunta 2: ¡Incorrecto!");
        nota -= 0.33;
    }
}

function cText2() {
    var t = document.getElementById("text2").value;
    var s = t.toUpperCase();
    var res = respuestaText2.toUpperCase();
    if (s == res) {
        mostrarResultado("Pregunta 7: ¡Correcto!");
        nota += 1;
    } else {
        mostrarResultado("Pregunta 7: ¡Incorrecto!");
        nota -= 0.33;
    }
}

function cSelect1() {
    var sel = formElement.elements[9];
    if (sel.selectedIndex - 1 == respuestaSelect1) {
        mostrarResultado("Pregunta 4: ¡Correcto!");
        nota += 1;
    } else
        mostrarResultado("Pregunta 4: ¡Incorrecto!");
}

function cSelect2() {
    var sel = formElement.elements[19];
    if (sel.selectedIndex - 1 == respuestaSelect2) {
        mostrarResultado("Pregunta 9: ¡Correcto!");
        nota += 1;
    } else
        mostrarResultado("Pregunta 9: ¡Incorrecto!");
}

function cCheckbox1() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.picos.length; i++) {
        if (f.picos[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox1.length; j++) {
                if (i == respuestasCheckbox1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox1.length;
                mostrarResultado("Pregunta 3: " + i + " ¡Correcto!");
            } else {
                nota -= 0.33 / respuestasCheckbox1.length;
                mostrarResultado("Pregunta 3: " + i + " ¡Incorrecto!");
            }
        }
    }
}

function cCheckbox2() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.meses.length; i++) {
        if (f.meses[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox2.length; j++) {
                if (i == respuestasCheckbox2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox2.length;
                mostrarResultado("Pregunta 8: " + i + " ¡Correcto!");
            } else {
                nota -= 0.33 / respuestasCheckbox2.length;
                mostrarResultado("Pregunta 8: " + i + " ¡Incorrecto!");
            }
        }
    }
}

function cMultiple1() {
    var mul = document.getElementsByClassName("opmult1");
    var escorrecta = [];
    for (i = 0; i < mul.length; i++) {
        if (mul[i].selected) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasMultiple1.length; j++) {
                if (i == respuestasMultiple1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasMultiple1.length;
                mostrarResultado("Pregunta 5:  ¡Correcto!");
            } else {
                nota -= 0.33 / respuestasMultiple1.length;
                mostrarResultado("Pregunta 5:  ¡Incorrecto!");
            }
        }
    }
}

function cMultiple2() {
    var mul = document.getElementsByClassName("opmult2");
    var escorrecta = [];
    for (i = 0; i < mul.length; i++) {
        if (mul[i].selected) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasMultiple2.length; j++) {
                if (i == respuestasMultiple2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasMultiple2.length;
                mostrarResultado("Pregunta 10:  ¡Correcto!");
            } else {
                nota -= 0.33 / respuestasMultiple2.length;
                mostrarResultado("Pregunta 10:  ¡Incorrecto!");
            }
        }
    }
}


// PASAR LOS DATOS EN HTML
function datosRadio1(t, opt) {
    var radioContainer = document.getElementById('radioDiv1');
    document.getElementById('tituloRadio1').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "respuesta_" + i);
        input.type = "radio";
        input.name = "año";
        input.id = "año_" + i;
        ;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }
}

function datosRadio2(t, opt) {
    var radioContainer = document.getElementById('radioDiv2');
    document.getElementById('tituloRadio2').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "respuesta_" + i);
        input.type = "radio";
        input.name = "verbo";
        input.id = "verbo_" + i;
        ;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }
}

function datosCheckbox1(t, opt) {
    var checkboxContainer = document.getElementById('checkboxDiv1');
    document.getElementById('tituloCheckbox1').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "picos_" + i);
        input.type = "checkbox";
        input.name = "picos";
        input.id = "picos_" + i;
        ;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }
}

function datosCheckbox2(t, opt) {
    var checkboxContainer = document.getElementById('checkboxDiv2');
    document.getElementById('tituloCheckbox2').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "meses_" + i);
        input.type = "checkbox";
        input.name = "meses";
        input.id = "meses_" + i;
        ;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }
}

function datosSelect1(t, opt) {
    document.getElementById("tituloSelect1").innerHTML = t;
    var select = document.getElementById("select1");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        select.options.add(option);
    }
}

function datosSelect2(t, opt) {
    document.getElementById("tituloSelect2").innerHTML = t;
    var select = document.getElementById("select2");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        select.options.add(option);
    }
}

function datosMultiple1(t, opt) {
    document.getElementById("tituloMultiple1").innerHTML = t;
    var multiple = document.getElementById("multiple1");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        option.className = "opmult1";
        multiple.options.add(option);
    }
}

function datosMultiple2(t, opt) {
    document.getElementById("tituloMultiple2").innerHTML = t;
    var multiple = document.getElementById("multiple2");
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        option.className = "opmult2";
        multiple.options.add(option);
    }
}

function datosText1(t) {
    document.getElementById("tituloText1").innerHTML = t;
}

function datosText2(t) {
    document.getElementById("tituloText2").innerHTML = t;
}


//MOSTRAR EL RESULTADO
function mostrarResultado(r) {
    var p = document.createElement("p");
    var node = document.createTextNode(r);
    p.appendChild(node);
    document.getElementById('resultados').appendChild(p);
    document.getElementById('resultados').style.display = "block";
}
//SI LA NOTA ES MENOR QUE 5 NO APTO. SI ES MÁS QUE 5 APTO
function Nota() {
    if (nota > 5) {
        mostrarResultado("Nota: " + nota + "¡ERES APTO PARA NUESTRA UNIVERSIDAD!");
    } else {
        mostrarResultado("Nota: " + nota + "¡HAS SUPENDIDO!");
    }
}

function inicializar() {
    document.getElementById('resultados').innerHTML = "";
    nota = 0.0;
}

//HACER QUE MIRE SI TODAS LAS PREGUNTAS ESTÉN CONTESTADAS
function comprobar() {
    var f = formElement;

    //1
    var checked = false;
    for (i = 0; i < f.año.length; i++) {
        if (f.año[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[0].focus();
        alert("Te falta pregunta 1");
        return false;
    }

    //2
    if (document.getElementById("text1").value == "") {
        f.elements[4].focus();
        alert("Te falta la pregunta 2");
        return false;
    }

    //3
    checked = false;
    for (i = 0; i < f.picos.length; i++) {
        if (f.picos[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[2].focus();
        alert("Te falta la pregunta 3");
        return false;
    }

    //4
    if (f.elements[9].selectedIndex == 0) {
        f.elements[9].focus();
        alert("Te falta la pregunta 4");
        return false;
    }

    //5
    if (f.elements[10].selectedIndex == 0) {
        f.elements[10].focus();
        alert("Te falta la pregunta 5");
        return false;
    }

    //6
    checked = false;
    for (i = 0; i < f.verbo.length; i++) {
        if (f.verbo[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[5].focus();
        alert("Te falta la pregunta 6");
        return false;
    }

    //7
    if (document.getElementById("text2").value == "") {
        f.elements[12].focus();
        alert("Te falta la pregunta 7");
        return false;
    }

    //8
    checked = false;
    for (i = 0; i < f.meses.length; i++) {
        if (f.meses[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[7].focus();
        alert("Te falta la pregunta 8");
        return false;
    }

    //9
    if (f.elements[19].selectedIndex == 0) {
        f.elements[19].focus();
        alert("Te falta la pregunta 9");
        return false;
    }

    //10
    if (f.elements[20].selectedIndex == 0) {
        f.elements[20].focus();
        alert("Te falta la pregunta 10");
        return false;
    }
    return true;
}