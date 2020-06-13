var funcion1 = function (x , y) {
    //Esta es una forma de definir funciones
    return x+y
};
// Recuerda que JS usa punto  y coma
function funcion2(params) {
    //esta es otra forma de definir funciones
    return undefined;
};

var a = funcion1(4,5);
var b = funcion1(4, "A");
var c = funcion1();
console.log(a)
console.log(b)
console.log(c)
//Todas las anteriores son válidas

//SCOPE
//Las variables se definidas dentro de funciones viven solo ahí, en esa función, en toda la función
//Variables definidas definidas fuera de funciones son válidas globalmente

//JS ejecuta todo en execution contexts, la invocación de una función crea un execution context que tiene:
//  Su ambiente de variables, el objeto 'this' que se refiere al execution context, referencias al ambiente de variables externo a la función

//Global scope NO tiene ambiente de variables externo, porque es el ambiente más 'externo'que hay

//Referencias a una variable serán buscadas en su ambiente de variables locales, luego en el ambiente del padre, luego en el del abuelo y así hasta 
//llegar al Global scope, si no se encuentra la referencia a la variable ahí, se determina como indefinida 'undefined'.

//TYPE COERCION ojo
//JS convierte algunos tipos automaticamente cuando compara objetos, por ejemplo,

console.log("4" == 4); //Esta vaina es true, ¿por qué putas?, pues porque JS convierte un tipo al otro porque el que lo escribió se fumó algo
console.log("4"=== 4); //Esta vaina es false, porque el que escribió JS quería que escribieramos más iguales para que funcionara como debería funcionar regularmente

if(!(false || null || undefined || "" || 0 || NaN))
{
    console.log('Todo es false');
    //Toda esa vaina es false en JS. A estas alturas no me sorpende. Meh, tampoco es tan raro, C/C++ y Python son como iguales
}
if(true && "non empty string" && 1 && -38748 && 'false')
{
    console.log("Todas estas son true");
    //Toda esa vaina sigue siendo True. Al menos el type coercion no se mete con 'false' pá volverlo false.
}

console.log(false || null || undefined || "" || 0 || NaN); //Esto por lo anterior debería imprimir false, pero solamente imprime el último porque no encuentra ningún true, en este caso NaN, Da fak
console.log(true && "non empty string" && 1 && -38748 && 'false'); //Este retorna el último porque no encuentra ningún false, que popo JS, eres horrible


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//!!!!!!!!!!!!!!!!--OJO CON LOS BRACKETS ---- ahhh malditasea javascript, por qué haces todo más complicado
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

function brackets1()
 {
    return
    {
        Objeto_de_Prueba: "Prueba"
    }

    // Esto retorna undefines, porque Js al llegar al return y ver que no hay nada despues le pone una coma "return;", por lo que se ejecuta 
    //el return antes que la declaración del objeto y devuelve algo vacío
}

function brackets2() {
    return{
        Objeto_de_Prueba: "Prueba"
    }
    //Esto te devuelve el objeto que definiste abajo
    
}

console.log(brackets1());
console.log(brackets2());


//Los FOR son igualitos que java
for(var i =  0; i<2; i++){
    console.log(i); //Imprime 0 y 1
}

//Default values para funciones

function defaultvalue(value) {
    value = value || "Valor por default";
    console.log(value);
}

defaultvalue();
defaultvalue("Valor específico");

//OBJECT DECLARATION
var objeto = new Object();//También se puede crear objetos con notación de Java
objeto.propiedad = "property"; //Si el objeto no tiene atributos y le asignas valor a uno de elos, js crea el atributo nuevo
console.log(objeto.propiedad);
console.log(objeto["propiedad"]);//Esto también funciona para buscar atributos. Literal es exactamente lo mismo que un diccionario en python combinado con un objeto en python
//Con brackets uno tambien puede definir atributos, justo como en Python, por ende tambien puedes definir atributos con espacios así, con los puntos no se puede
console.log(objeto.toString());


//-------------------------------------------------------------------------------------------------------------------------------------------------------/
//                                                                       FUNCIONES                                                                       /
//-------------------------------------------------------------------------------------------------------------------------------------------------------/


function declaration(x) {
    return x*2; 
    
}
//Las funciones también son objetos
function function_object(x, func) {
    console.log(func(x));
}

function_object(3, declaration); //Retorna 6, que es el resultado de declaration(3), que se llama como func(x) dentro de function_object
console.log(function_object.toString());


//El ambiente por defecto de las funciones es el ambiente del padre, por lo que si hacemos:
function enviroment() {
    if(this == window){
        console.log("El ambiente es el global, la ventana principal")
    }
    else{
        console.log("El ambiente es el de la función");
        
    }
}
enviroment(); //Esto va a imprimir el ambiente global
var enviromentFunc = new enviroment(); //Esto va a crear la función apuntando a un ambiente "interno". Acá mismo se le pasan los parámetros, después no se podrá. 
enviromentFunc;//Va a imprimir que el ambiente de la función es el ambiente interno, y si te das cuenta, se llama de forma distinta
console.log(enviromentFunc);//Esto imprime un objeto, bien chido. Pero no puede retornar nada, remember dad

//Ejemplo: FUNCTION CONTRUCTOS ---------->
function Circle(radius) { //Mayúscula al principio solo por notación
    this.radius = radius; //Se iguala el atributo, como si fuera un objeto, a lo que llegó por parámeto
    this.getArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
}
Circle.prototype.getArea2 = function () {   //Esto hace lo mismo en términos de fucionalidad que el anterior, pero los objetos Circle creados, van a 
    return Math.PI * Math.pow(this.radius, 2); // Compartir todos este método en vez de tener el mismo método repetido para cada objeto
}; //Es más o menos parecido a un método estático, como usa this para acceder a la variable, te aseguras de acceder a la variable del ambiente específico donde es ejecutado

var myCircle = new Circle(10);
console.log(myCircle.getArea() + " --- " + myCircle.getArea2());
console.log(myCircle);

//!!!!!!!!!!!!!!!!!-----------------OJO---------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Javascript también trata los objetos como apuntadores PERO, cuando pasas una variable primitiva como parámetro en una función, no pasas el apuntador al 
//Espacio en memoria, si no que se crea en memoria una copia identica de tu variable, por lo que actualizar el parámetro dentro de la función
//no tendrá efecto en la variable primitiva que está definida por fuera de la función. PEERO, de nuevo fuck js, con los objetos sí funciona normalito
//Si pasas un objeto pasas su apuntador a memoria y si lo editas, también edita el original
//Ejemplo:

var a = 5
var objeto = {parametro: 20}
 function changing_value(params1, params2) {
     params1 = 7
     params2.parametro = 30
     console.log(params1 + " - "+ params2.parametro); //Obveo imprime 7 y 30
 }

changing_value(a, objeto);
console.log(a + " -- "+ objeto.parametro); //imprime 5 y 30

//INMIDIATELY INVOKED FUNCTION EXPRESSION IIFE
//Si uno quisiera invocar la función enseguida, le pones paréntesis al final y ya
(function () {
    console.log("Función invocada right away");
})();//Ipmrime "Función invocada right away"


//THIS KEYWORD, AHHHHHH JAVASCRIPT TE ODIO

var literalCircle = { // esto es igual a new Object, por lo que this va a apuntar a dentro y no a las variables locales
    radius: 10,
    getArea1: function () { //Retorna lo esperado porque this está apuntando a mí mismo y this.radius = 10 as expected
        return Math.PI * Math.pow(this.radius, 2);
    },
    getArea2: function () {
       var increaseRadius = function () {
           this.radius = 20;
       } 
       increaseRadius();
       return Math.PI * Math.pow(this.radius, 2); //Esperarías que se retornara algo mayor a la del método getArea1, porque supuestamente se 
       //aumento el radio en la llamada a increaseRadius, pero pasa en cuando una funcion se define dentro de otro y llama a "this", en vez de
       //referenciar al ambiente del padre, referencia al ambiente global, por lo que el "this dentro de increaseValue" de hecho es windows
       // y si hicieses windows == this ahí dentro resultaría en true. El workaround de esto es el siguiente método con la siguiente definición.
    },
    getArea3: function () {
        var self = this;
        var increaseRadius = function () {
            self.radius = 20; //Ahora sí queda porque self está apuntando al this del padre
        } 
        increaseRadius();
        return Math.PI * Math.pow(this.radius, 2); //Esperarías que se retornara algo mayor a la del método getArea1, porque supuestamente se 
        //aumento el radio en la llamada a increaseRadius, pero pasa en cuando una funcion se define dentro de otro y llama a "this", en vez de
        //referenciar al ambiente del padre, referencia al ambiente global, por lo que el "this dentro de increaseValue" de hecho es windows
        // y si hicieses windows == this ahí dentro resultaría en true. El workaround de esto es el siguiente método con la siguiente definición.
     }
}
console.log(literalCircle.getArea1() + " -- " + literalCircle.getArea2() + " -- " + literalCircle.getArea3());//Te da como 314, 314, 1256
//Al parecer si usas Arrow Functions esto deja de ser un problema


//------------ARRAYS------------------------------//
//Normalitos, igual que listas de Python, deján meter vainas de cualquier tipo
var array = new Array();
array[0] = "elemento0";
array[1] = function (params) {}; //ETC, ETC
array[1](array[0]); // Lamado a función del array

var array2 = ["Como", "una", "lista", "de", "Python"];
array2.length //Tamaño es una propiedad, NO es una funcion
//También hay el equivalente a un for each
for (var i in array2){
    //do something, Ojo, te devuelve el nombre de las propiedades (0,1,2,...,lenght-1) no la propiedad per se
    //para el valor toca array2[i]
}
//Para objetos también sirve
var objetoGenerico = {prop1: 1, prop2: 2, prop3: 3}
for(var prop in objetoGenerico){    
    //Do something, same, te devuelve es el nombre de la propiedad, si quieres lo otro es objetoGenerico[prop] o objetoGenerico.prop
}

//Ahora, el for each está recorriendo es propiedades de un objeto, y de hecho los arrys son objetos, por lo que podemos añadirles propiedades (atributos)
//como a un objeto normal.
console.log(array2.length);
array2.propiedadNoNumerica = "propiedad";
console.log(array2.length); //Ojo con esto, da igual que el lenght pasado

for(var each in array2){
    console.log(each); //Esto devuelve laas propiedades usuales de un array(los índices) y la propiedad que añadimos antes
    
}

//Entonces si uno hace un for each, uno de los valores será igual a "propiedad", incluso aunque "propiedad" no tenga un indice. Porque al fin y al cabo, los
//índices en los arrays son solo una propiedad numérica que empieza en 0 y hasta el lenght-1 del array

//