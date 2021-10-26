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
    bulbasaur = {
      hp: 300,
      ataquePlacaje: function(pokemon) {
        pokemon.hp -= 10;
      },
      ataqueLatigoCepa: function(pokemon) {
        pokemon.hp -= 10;
      }
    };
    pikachu = {
      hp: 250,
      ataqueImpactrueno: function(pokemon) {
        pokemon.hp -= 10;
      }
    };
}

// Ejercicio 2
function ejercicio2() {
    // Completar
    //a)
    raichu = Object.create(pikachu);
    raichu.hp = 300;
    raichu.ataqueGolpeTrueno = function(pokemon) {
      pokemon.hp -= 30;
    };

    //b)
    pichu = { hp: 100 };
    Object.setPrototypeOf(pikachu, pichu);

    //c)
    pichu.tipo = tipoElectrico;
    bulbasaur.tipo = tipoPlanta;
}

// Ejercicio 3
function ejercicio3() {
    // Completar

    //a)
    Pokemon = function(hp, ataques, tipo) {
      this.hp = hp;
      this.tipo = tipo;
      Object.assign(this, ataques);
    };

    //b)
    charmander = new Pokemon(200, { ataqueAscuas: (pokemon) => { pokemon.hp -= 40 } }, tipoFuego);

    //c)
    Object.setPrototypeOf(pichu, Pokemon.prototype);
    Object.setPrototypeOf(bulbasaur, Pokemon.prototype);

    //d)
    Pokemon.prototype.atacar = function(ataque, oponente) {
      if(ataque in this){
        this[ataque](oponente);
      } else {
          this.hp -= 10;
      }
    };
}

// Ejercicio 4
function ejercicio4() {
    // Completar
    //a)
    Pokemon.prototype.nuevoAtaque = function(nombreAtaque, ataque) {
      this[nombreAtaque] = ataque;
    };

    //b)
    pikachu.nuevoAtaque("ataqueOndaTrueno", function(oponente){
      oponente.hp = Math.floor(oponente.hp/2);
    });
}

// Ejercicio 5
function ejercicio5() {
    // Completar
    //a)
    Pokemon.prototype.evolucionar = function() {
      let evolucion = Object.create(this);
      evolucion.hp *= 2;
      return evolucion;
    };

    //b)
    charmeleon = charmander.evolucionar();
    charizard = charmeleon.evolucionar();
}

// Ejercicio 6
function ejercicio6() {
    // Completar
    //a)
    Pokemon.prototype.algunAtaque = function() {
      let ataques = Object.keys(this).filter(key => key.startsWith("ataque"));
      return ataques[Math.floor(Math.random()*ataques.length)];
    };

    //b)
    peleaPokemon = function(pokemon1, pokemon2) {
      while(true) {
        pokemon1.atacar(pokemon1.algunAtaque(), pokemon2);
        if (pokemon2.hp <= 0) {
          return pokemon1;
        }
        pokemon2.atacar(pokemon2.algunAtaque(), pokemon1);
        if (pokemon1.hp <= 0) {
          return pokemon2;
        }
      }
    };
}

// Ejercicio 7
function ejercicio7() {
    // Completar
    let ataqueCopiar = function(oponente) {
      let ataqueCopiado = oponente.algunAtaque();
      this[ataqueCopiado] = oponente[ataqueCopiado];
    }
    ditto = new Pokemon(100, { ataqueCopiar }, tipoNormal);
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
  bulbasaur.ataqueLatigoCepa(squirtle);
  res.write(`Después de ser atacado por segunda vez por Bulbasaur, el hp de Squirtle es de ${squirtle.hp}.`, squirtle.hp === 180);
  pikachu.ataqueImpactrueno(squirtle);
  res.write(`Después de ser atacado una vez por Pikachu, el hp de Squirtle es de ${squirtle.hp}.`, squirtle.hp === 170);
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
    let pichuEsDeTipoElectrico = pichu.tipo == tipoElectrico;
    res.write(`Pichu ${si_o_no(pichuEsDeTipoElectrico)} es de tipo eléctrico.`, pichuEsDeTipoElectrico);
    let pikachuEsDeTipoElectrico = pikachu.tipo == tipoElectrico;
    res.write(`Pikachu ${si_o_no(pikachuEsDeTipoElectrico)} es de tipo eléctrico como Pichu.`, pikachuEsDeTipoElectrico);
    let raichuEsDeTipoElectrico = raichu.tipo == tipoElectrico;
    res.write(`Raichu ${si_o_no(raichuEsDeTipoElectrico)} es de tipo eléctrico como Pichu.`, raichuEsDeTipoElectrico);

    raichu.ataquePararrayo(caterpie);
    res.write(`Raichu vuelve a atacar, ahora usando ataquePararrayo. El hp de Caterpie es ${caterpie.hp}.`, caterpie.hp === 50);
    pikachu.ataquePararrayo(caterpie);
    res.write(`Pikachu ataca con ataquePararrayo, el hp de Caterpie es ${caterpie.hp}.`, caterpie.hp === 40);
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

  res.write(`Charmander tiene ${charmander.hp} de hp`, charmander.hp == 200)
  charmander.ataqueAscuas(pidgey);
  res.write(`Pidgey es atacado por Charmander con Ascuas, y ahora tiene un hp de ${pidgey.hp},`, pidgey.hp == 140);

  let bulbasaurIsPokemon = Pokemon.prototype.isPrototypeOf(bulbasaur);
  res.write(`Bulbasaur ${si_o_no(bulbasaurIsPokemon)} se comporta como si hubiese sido creado por la función constructora.`, bulbasaurIsPokemon);
  let pichuIsPokemon = Pokemon.prototype.isPrototypeOf(pichu);
  res.write(`Pichu ${si_o_no(pichuIsPokemon)} se comporta como si hubiese sido creado por la función constructora.`, pichuIsPokemon);
  let pikachuIsPokemon = Pokemon.prototype.isPrototypeOf(pikachu);
  res.write(`Pikachu ${si_o_no(pikachuIsPokemon)} se comporta como si hubiese sido creado por la función constructora.`, pikachuIsPokemon);
  let raichuIsPokemon = Pokemon.prototype.isPrototypeOf(raichu);
  res.write(`Raichu ${si_o_no(raichuIsPokemon)} se comporta como si hubiese sido creado por la función constructora.`, raichuIsPokemon);
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

  ekans.nuevoAtaque("ataquePrueba", function(oponente){
    oponente.hp -= 11;
  });
  ekans.atacar("ataquePrueba", raichu);
  res.write(`Ekans ataca con nuevo ataque de prueba a Raichu dejándolo con ${raichu.hp} de hp.`, raichu.hp == 289);

  raichu.atacar("ataqueOndaTrueno", ekans);
  res.write(`Atacar a Ekans con el nuevo ataque ondaTrueno le deja ${ekans.hp} de hp.`, ekans.hp == 62);

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
  res.write("Charizard también.", charizardConoceAscuasEmber);

  res.write(`\n Charmeleon aprende lanzallamas.`);
  charmeleon.nuevoAtaque("ataqueLanzallamas", function(otroPoke){otroPoke.hp -= 10});
  let charmanderConoceLanzallamas = 'ataqueLanzallamas' in charmander;
  res.write(`Charmander ${si_o_no(charmanderConoceLanzallamas)} conoce el ataque lanzallamas de Charmeleon.`, !charmanderConoceLanzallamas);

  let ivysaur = bulbasaur.evolucionar();
  let ivysaurTieneDobleHp = ivysaur.hp == 2*bulbasaur.hp;
  res.write(`Ivysaur ${si_o_no(ivysaurTieneDobleHp)} tiene el doble de hp de Charmander.`, ivysaurTieneDobleHp);
  let venusaur = ivysaur.evolucionar();
  let venusaurTieneCuadrupleHp = venusaur.hp == 4*bulbasaur.hp;
  res.write(`Venusaur ${si_o_no(venusaurTieneCuadrupleHp)} tiene cuatro veces el hp de Charmander.`, venusaurTieneCuadrupleHp);

  res.write(`\n Bulbasaur aprende hojaAfilada.`);
  bulbasaur.nuevoAtaque("ataqueHojaAfilada", function(otroPoke){otroPoke.hp -= 10});
  let ivysaurConoceHojaAfilada = ivysaur.ataqueHojaAfilada == ivysaur.ataqueHojaAfilada;
  res.write(`Ivysaur ${si_o_no(ivysaurConoceHojaAfilada)} puede atacar con hojaAfilada,`, ivysaurConoceHojaAfilada);
  let venusaurConoceHojaAfilada = venusaur.ataqueHojaAfilada  == bulbasaur.ataqueHojaAfilada;
  res.write("Venusaur también.", venusaurConoceHojaAfilada);

  res.write(`\n Ivysaur aprende dulceAroma.`);
  ivysaur.nuevoAtaque("ataqueDulceAroma", function(otroPoke){otroPoke.hp -= 10});
  let bulbasaurConoceDulceAroma = 'ataqueDulceAroma' in bulbasaur;
  res.write(`Charmander ${si_o_no(bulbasaurConoceDulceAroma)} conoce el ataque lanzallamas de Charmeleon.`, !bulbasaurConoceDulceAroma);
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

}

// Test Ejercicio 7
function testEjercicio7(res) {
  res.write(`El hp de Ditto es ${ditto.hp}.`, ditto.hp === 100);
  res.write(`El tipo de Ditto es ${ditto.tipo}.`, ditto.tipo === tipoNormal);

  let dittoConoceCopiar = 'ataqueCopiar' in ditto;
  res.write(`Ditto ${si_o_no(dittoConoceCopiar)} conoce el ataque copiar.`, dittoConoceCopiar);

  let copiarUnicoAtaqueDitto = Object.keys(ditto).length == 3 && dittoConoceCopiar;
  res.write(`Copiar ${si_o_no(copiarUnicoAtaqueDitto)} es el único ataque que conoce Ditto.`, copiarUnicoAtaqueDitto)

  res.write("\n Creamos a Butterfree, que conoce el ataque polvoVeneno.");
  let butterfree = new Pokemon(100, {ataquePolvoVeneno: function(oponente){oponente.hp -= 10;}}, tipoBicho);
  res.write("Ditto ataca a Butterfree con copiar.");
  ditto.ataqueCopiar(butterfree);
  let dittoConocePolvoVeneno = 'ataquePolvoVeneno' in ditto;
  res.write(`Ahora Ditto ${si_o_no(dittoConocePolvoVeneno)} conoce el ataque polvoVeneno.`, dittoConocePolvoVeneno);

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
