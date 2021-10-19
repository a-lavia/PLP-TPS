// Definiciones de los strings de tipos
const tipoElectrico = 'eléctrico';
const tipoPlanta = 'planta';
const tipoFuego = 'fuego';
const tipoNormal = 'normal';
const tipoAgua = 'agua';
const tipoBicho = 'bicho';

// Definiciones globales (no modificar acá, en cambio, completar las funciones ejercicio_i)
let bulbasaur;
let pikachu;
let pichu;
let raichu;
let Pokemon;
let charmander;
let charmeleon;
let charizard;
let peleaPokemon;
let ditto;

// Ejercicio 1
function ejercicio1() {
    // Completar
    bulbasaur = undefined;
    pikachu = undefined;
}

// Ejercicio 2
function ejercicio2() {
    // Completar
    raichu = undefined;
    pichu = undefined;
}

// Ejercicio 3
function ejercicio3() {
    // Completar
    Pokemon = undefined;
    charmander = undefined;
}

// Ejercicio 4
function ejercicio4() {
    // Completar
}

// Ejercicio 5
function ejercicio5() {
    // Completar
    charmeleon = undefined;
    charizard = undefined;
}

// Ejercicio 6
function ejercicio6() {
    // Completar
    peleaPokemon = undefined;
}

// Ejercicio 7
function ejercicio7() {
    // Completar
    ditto = undefined;
}

// Test Ejercicio 1
function testEjercicio1(res) {
  res.write(`El hp de Pikachu es ${pikachu.hp}.`, pikachu.hp === 250);
  let pikachuConoceImpactrueno = 'ataqueImpactrueno' in pikachu;
  res.write(`Pikachu ${si_o_no(pikachuConoceImpactrueno)} conoce impactrueno.`, pikachuConoceImpactrueno);
  let squirtle = {hp: 200};
  res.write(`\n Creamos a Squirtle, con ${squirtle.hp} de hp.`);
  bulbasaur.ataquePlacaje(squirtle);
  res.write(`Después de ser atacado una vez por Bulbasaur, el hp de Squirtle es de ${squirtle.hp}.`, squirtle.hp === 190);
  //Completar
}

// Test Ejercicio 2
function testEjercicio2(res) {
    let caterpie = {hp:100}
    res.write(`Creamos a Caterpie, con ${caterpie.hp} de hp.`);
    res.write(`El hp de Raichu es ${raichu.hp}.`, raichu.hp === 300);
    raichu.ataqueImpactrueno(caterpie);
    res.write(`Raichu usa impactrueno contra Caterpie, por lo que su hp es ${caterpie.hp}.`, caterpie.hp === 90);
    raichu.ataqueGolpeTrueno(caterpie);
    res.write(`Después, si usa golpeTrueno, el hp de Caterpie es ${caterpie.hp}.`, caterpie.hp === 60);

    let pikachuConocePararrayo = 'ataquePararrayo' in pikachu;
    res.write(`\n Pikachu ${si_o_no(pikachuConocePararrayo)} tiene definido pararrayo,`, !pikachuConocePararrayo);
    pichu.ataquePararrayo = function(otroPoke) {
        otroPoke.hp -= 10;
    };
    let pikachuConocePararrayoAhora = pikachu.ataquePararrayo == pichu.ataquePararrayo;
    res.write(`pero ${si_o_no(pikachuConocePararrayoAhora)} lo tiene definido una vez que se le define a Pichu.`, pikachuConocePararrayoAhora);
    let raichuConocePararrayo = raichu.ataquePararrayo == pichu.ataquePararrayo;
    res.write(`Raichu ${si_o_no(raichuConocePararrayo)} conoce pararrayo.`, raichuConocePararrayo);
    let pikachuEsDeTipoElectrico = pikachu.tipo == tipoElectrico;
    res.write(`Pikachu ${si_o_no(pikachuEsDeTipoElectrico)} es de tipo eléctrico como Pichu.`, pikachuEsDeTipoElectrico);
    //Completar
}

// Test Ejercicio 3
function testEjercicio3(res) {
  let pikachuConoceGolpeTrueno = 'ataqueGolpeTrueno' in pikachu;
  res.write(`Se mantiene la jerarquía de antes, Pikachu ${si_o_no(pikachuConoceGolpeTrueno)} tiene definido golpeTrueno.`, !pikachuConoceGolpeTrueno);
  let charmanderConoceAscuas = 'ataqueAscuas' in charmander;
  res.write(`Charmander ${si_o_no(charmanderConoceAscuas)} tiene definido ascuas.`, charmanderConoceAscuas);

  let pidgey = new Pokemon (200,{},tipoNormal);
  res.write(`\n Creamos a Pidgey, con ${pidgey.hp} de hp.`);
  pikachu.atacar("ataqueImpactrueno", pidgey);
  res.write(`Pidgey es atacado por Pikachu, y ahora tiene un hp de ${pidgey.hp},`, pidgey.hp == 190);
  let pikachuConMismoHp = pikachu.hp == 250;
  res.write(`y el hp de Pikachu ${si_o_no(!pikachuConMismoHp)} se ve afectado.`, pikachuConMismoHp);

  pidgey.atacar("ataqueLatigoCepa", raichu);
  res.write(`Pidgey intenta atacar a Raichu con un ataque que no conoce, pero termina con hp de ${pidgey.hp},`, pidgey.hp == 180);
  let raichuConMismoHp = raichu.hp == 300;
  res.write(`y el hp de Raichu ${si_o_no(!raichuConMismoHp)} se ve afectado.`, raichuConMismoHp);
  //Completar
}

// Test Ejercicio 4
function testEjercicio4(res) {
  let ekans = new Pokemon (250,{},tipoPlanta);
  res.write(`Creamos a Ekans, con ${ekans.hp} de hp.`);
  pikachu.ataqueOndaTrueno(ekans);
  res.write(`Atacar a Ekans con el nuevo ataque ondaTrueno le deja ${ekans.hp} de hp.`, ekans.hp == 125);
  let pichuConoceOndaTrueno = 'ataqueOndaTrueno' in pichu;
  res.write(`Pichu ${si_o_no(pichuConoceOndaTrueno)} puede atacar usando ondaTrueno,`, !pichuConoceOndaTrueno);
  let raichuConoceOndaTrueno = raichu.ataqueOndaTrueno == pikachu.ataqueOndaTrueno;
  res.write(`y Raichu ${si_o_no(raichuConoceOndaTrueno)} puede.`, raichuConoceOndaTrueno);
  //Completar
}

// Test Ejercicio 5
function testEjercicio5(res) {
  let charmeleonTieneDobleHp = charmeleon.hp == 2*charmander.hp;
  res.write(`Charmeleon ${si_o_no(charmeleonTieneDobleHp)} tiene el doble de hp de Charmander.`, charmeleonTieneDobleHp);
  let charizardTieneCuadrupleHp = charizard.hp == 4*charmander.hp;
  res.write(`Charizard ${si_o_no(charizardTieneCuadrupleHp)} tiene cuatro veces el hp de Charmander.`, charizardTieneCuadrupleHp);

  res.write(`\n Charmander aprende ascuasEmber.`);
  charmander.nuevoAtaque("ataqueAscuasEmber", function(otroPoke){otroPoke.hp -= 10});
  let charmeleonConoceAscuasEmber = charmeleon.ataqueAscuasEmber == charmander.ataqueAscuasEmber;
  res.write(`Charmeleon ${si_o_no(charmeleonConoceAscuasEmber)} puede atacar con ascuasEmber,`, charmeleonConoceAscuasEmber);
  let charizardConoceAscuasEmber = charizard.ataqueAscuasEmber  == charmander.ataqueAscuasEmber;
  res.write("Charizard también.", charizard.ataqueAscuasEmber  == charmander.ataqueAscuasEmber);

  res.write(`\n Charmeleon aprende lanzallamas.`);
  charmeleon.nuevoAtaque("ataqueLanzallamas", function(otroPoke){otroPoke.hp -= 10});
  let charmanderConoceLanzallamas = 'ataqueLanzallamas' in charmander;
  res.write(`Charmander ${si_o_no(charmanderConoceLanzallamas)} conoce el ataque lanzallamas de Charmeleon.`, !charmanderConoceLanzallamas);
  //Completar
}

// Test Ejercicio 6
function testEjercicio6(res) {
  let bulbasaurConoceAlgunAtaque = 'algunAtaque' in bulbasaur;
  res.write(`Bulbasaur ${si_o_no(bulbasaurConoceAlgunAtaque)} puede responder al mensaje algunAtaque.`, 'algunAtaque' in bulbasaur);

  res.write("\n Creamos a Magikarp.");
  let magikarp = new Pokemon(300, {ataqueSalpicadura: function(oponente){oponente.hp -= 10;}}, tipoAgua);
  let magikarpConoceAlgunAtaque = 'algunAtaque' in magikarp;
  res.write(`Magikarp ${si_o_no(magikarpConoceAlgunAtaque)} puede responder al mensaje algunAtaque.`, magikarpConoceAlgunAtaque);
  let nombreDeAlgunAtaque = magikarp.algunAtaque();
  let algunAtaqueEsSalpicadura = nombreDeAlgunAtaque == 'ataqueSalpicadura';
  res.write(`Cuando le pedimos algún ataque a Magikarp, ${si_o_no(algunAtaqueEsSalpicadura)} devuelve salpicadura.`, algunAtaqueEsSalpicadura);

  res.write("\n Creamos a Kakuna.");
  let kakuna = new Pokemon(10, {ataqueFortaleza: function(oponente) {}}, tipoBicho);
  let ganador = peleaPokemon(kakuna, magikarp);
  let elGanadorEsMagikarp = 'ataqueSalpicadura' in ganador;
  res.write(`Pelean Kakuna y Magikarp, el ganador ${si_o_no(elGanadorEsMagikarp)} es Magikarp.`, elGanadorEsMagikarp);
  res.write(`El hp de Kakuna después de pelear es ${kakuna.hp}.`, kakuna.hp == 0);
  // Completar
}

// Test Ejercicio 7
function testEjercicio7(res) {
  let dittoConoceCopiar = 'ataqueCopiar' in ditto;
  res.write(`Ditto ${si_o_no(dittoConoceCopiar)} conoce el ataque copiar.`, dittoConoceCopiar);

  res.write("\n Creamos a Butterfree, que conoce el ataque polvoVeneno.");
  let butterfree = new Pokemon(100, {ataquePolvoVeneno: function(oponente){oponente.hp -= 10;}}, tipoBicho);
  res.write("Ditto ataca a Butterfree con copiar.");
  ditto.ataqueCopiar(butterfree);
  let dittoConocePolvoVeneno = 'ataquePolvoVeneno' in ditto;
  res.write(`Ahora Ditto ${si_o_no(dittoConocePolvoVeneno)} conoce el ataque polvoVeneno.`, dittoConocePolvoVeneno);
  // Completar
}

// Función auxiliar que crea un test genérico a partir de un número i y una función f
function crearTest(i, f) {
  return function() {
    if (eval("typeof ejercicio" + i)!=="undefined") {
      eval("ejercicio"+i)();
    }
    let res = {
      text:"",
      write: function(s, t) {
        if (t!=undefined) {
          if (t) s = "<span style='color:green'>" + s + "</span>";
          else s = "<span style='color:red'>" + s + "</span>";
        }
        s += "\n";
        this.text += s;
      }
    };
    try {
      f(res);
    } catch (e) {
      fail(i, e);
    }
    return res.text;
  }
}
