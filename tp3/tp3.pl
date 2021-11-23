campeon((morgana,200,30)).
campeon((brand,230,40)).
campeon((chogat,400,50)).
campeon((amumu,380,60)).
campeon((soraka,300,10)).
campeon((nami,250,20)).
campeon((akali,200,150)).
campeon((evelyn,200,130)).
campeon((teemo,180,80)).


tipo(morgana,mago).
tipo(brand,mago).
tipo(chogat,tanque).
tipo(amumu,tanque).
tipo(soraka,soporte).
tipo(nami,soporte).
tipo(akali,asesino).
tipo(evelyn,asesino).
tipo(teemo,mago).

% desde(+X, -Y)
desde(X, X).
desde(X, Y) :- N is X + 1, desde(N, Y).

%generarEquipoLong(+L,?E)
generarEquipoLong(0,[]).
generarEquipoLong(L,E) :- L > 0, L2 is L - 1, generarEquipoLong(L2, E2), campeon(C), append(E2, [C] , E).

% equipoInfinito(?E)
equipoInfinito(E) :- desde(0,X), generarEquipoLong(X,E).




%sinTiposRepetidos(+E)
sinTiposRepetidos([]).
sinTiposRepetidos([(Nombre,_,_)|Xs]) :- tipo(Nombre,Tipo), tipo(Nombre2,Tipo), not(member((Nombre2,_,_),Xs)), sinTiposRepetidos(Xs).

%esValido(+E)
esValido(E) :- is_set(E), sinTiposRepetidos(E).

% equipoValido(?E)
equipoValido(E) :- between(0,4,X), generarEquipoLong(X, E), esValido(E).




%matar(C,L)
matar((Nombre,HP,AD),L) :- HP > 0, L = [(Nombre,HP,AD)].
matar((_,HP,_),L) :- HP =< 0, L = [].

%normalizarAD(L1,L2)
normalizarAD([],[]).
normalizarAD([(Nombre,HP,AD)],L) :- AD < 0, L = [(Nombre,HP,0)].
normalizarAD([(Nombre,HP,AD)],L) :- AD >= 0, L = [(Nombre,HP,AD)].

%ataque(+T,+AD,+E,-EF)
ataque(_,_,[],[]).
ataque(mago,AD,[(Nombre,HP,AD2)|Es],EF) :- ADF is AD2 - AD, ataque(mago,AD,Es,EF1), matar((Nombre,HP,ADF),C1), normalizarAD(C1,C), append(C,EF1,EF) .
ataque(tanque,AD,[(Nombre,HP,AD2)|Es],EF) :- HPF is HP - AD, ataque(tanque,AD,Es,EF1), matar((Nombre,HPF,AD2),C1), normalizarAD(C1,C), append(C,EF1,EF).
ataque(asesino,AD,[(Nombre,HP,AD2)|Es],EF) :- HPF is HP - AD, matar((Nombre,HPF,AD2),C1), normalizarAD(C1,C), append(C,Es,EF).
ataque(soporte,_,E,E).

%soporte(T,AD,E,EF)
soporte(_,_,[],[]).
soporte(soporte,AD,[(Nombre,HP,AD2)|Es],EF) :- ADF is AD2 + AD, HPF is HP + AD, soporte(soporte,AD,Es,EF1), append([(Nombre,HPF,ADF)],EF1,EF).
soporte(mago,_,E,E).
soporte(tanque,_,E,E).
soporte(asesino,_,E,E).

% stepPelea(+E1, +E2, -E1F, -E2F)
stepPelea([(Nombre1,HP1,AD1)|E1], E2, E1F, E2F) :- tipo(Nombre1,Tipo), ataque(Tipo,AD1,E2,E2F), soporte(Tipo,AD1,E1,E1S), append(E1S,[(Nombre1,HP1,AD1)],E1F).




% pelea(+E1, +E2, +C, -G)
pelea([],[E|Es],_,[E|Es]).
pelea([E|Es],[],_,[E|Es]).
pelea([_|E1s],[_|E2s],0,[]) :- length(E1s,L1), length(E2s,L2), L1 =:= L2.
pelea([E1|E1s],[_|E2s],0,[E1|E1s]) :- length(E1s,L1), length(E2s,L2), L1 > L2.
pelea([_|E1s],[E2|E2s],0,[E2|E2s]) :- length(E1s,L1), length(E2s,L2), L1 < L2.
pelea([E1|E1s],[E2|E2s],C,G) :- C > 0, stepPelea([E1|E1s],[E2|E2s],E1F,E2F), C2 is C - 1, pelea(E2F,E1F,C2,G).


  

%noRepiteCampeon(E1,E2)
noRepiteCampeon([],_).
noRepiteCampeon([(Nombre,_,_)|E1],E2) :- not(member((Nombre,_,_),E2)), noRepiteCampeon(E1,E2).


%generarEquipos(+E1,-E2)
generarEquipos(E1,E2) :- length(E1,L), generarEquipoLong(L,E2), esValido(E2), noRepiteCampeon(E2,E1).

% gana(?E1, +E2)
gana(E1,E2) :- nonvar(E1), pelea(E1,E2,10,[(Nombre,_,_)|_]), member((Nombre,_,_),E1).
gana(E1,E2) :- var(E1), generarEquipos(E2,E), gana(E,E2).




%ganador(+E1,+E2,+G,-E)
ganador(E1,_,(Nombre,_,_),E1) :- member((Nombre,_,_),E1).
ganador(_,E2,(Nombre,_,_),E2) :- member((Nombre,_,_),E2).

%obtenerCampeon(N,E,C)
obtenerCampeon(Nombre1,[(Nombre,HP,AD)|_],(Nombre,HP,AD)) :- Nombre1 == Nombre.
obtenerCampeon(Nombre1,[(Nombre,_,_)|E],C) :- Nombre1 \= Nombre, obtenerCampeon(Nombre1,E,C).

%minDiferencia(E1,E2,D)
minDiferencia(E1,[(Nombre,HPF,_)|E2s],D) :- length(E2s,L), L =:= 0, diferencia((Nombre,HPF,_),E1,D).
minDiferencia(E1,[(Nombre,HPF,_)|E2s],D) :- length(E2s,L), L =\= 0, diferencia((Nombre,HPF,_),E1,D1), minDiferencia(E1,E2s,D2), D is min(D1,D2).

%diferencia(C,G,D)
diferencia((Nombre,HPF,_),E,D) :- obtenerCampeon(Nombre,E,(_,HPI,_)), D is HPI - HPF.


% honor(+E1, +E2, -C)
honor(E1,E2,C) :- pelea(E1,E2,10,[G|Gs]), ganador(E1,E2,G,E), minDiferencia(E,[G|Gs],D), member((C,HP,AD),[G|Gs]), diferencia((C,HP,AD),E,D1), D =:= D1.








%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TESTS

cantidadTestsEquipoInfinito(9).
testEquipoInfinito(1) :- campeon(X), equipoInfinito(E), E = [X].
testEquipoInfinito(2) :- equipoInfinito(E), E = [(teemo,180,80), (akali,200,150)].
testEquipoInfinito(3) :- equipoInfinito(E), E = [(akali,200,150), (teemo,180,80)].
testEquipoInfinito(4) :- equipoInfinito(E), E = [(morgana,200,30), (morgana,200,30)].
testEquipoInfinito(5) :- equipoInfinito(E), E = [(teemo,180,80), (morgana,200,30)].
testEquipoInfinito(6) :- equipoInfinito(E), E = [(nami,250,20), (nami,250,20), (nami,250,20), (nami,250,20), (nami,250,20)].
testEquipoInfinito(7) :- equipoInfinito(E), E = [(nami,250,20),(akali,200,150), (evelyn,200,130), (teemo,180,80)].
testEquipoInfinito(8) :- equipoInfinito(E), E = [(akali,200,150), (nami,250,20), (evelyn,200,130), (teemo,180,80)].
testEquipoInfinito(9) :- equipoInfinito(E), E = [(teemo,180,80), (akali,200,150), (nami,250,20), (evelyn,200,130)].

cantidadTestsEquipoValido(5).
testEquipoValido(1) :- campeon(X), equipoValido(E), E = [X].
testEquipoValido(2) :- equipoValido(E), E = [(teemo,180,80), (akali,200,150)].
testEquipoValido(3) :- equipoValido(E), E = [(akali,200,150), (teemo,180,80)].
testEquipoValido(4) :- equipoValido(E), not((E = [(morgana,200,30), (morgana,200,30)])).
testEquipoValido(5) :- equipoValido(E), not((E = [(teemo,180,80), (morgana,200,30)])).

cantidadTestsStepPelea(10).
testStepPelea(1) :- stepPelea([(morgana,200,30)], [(brand,230,40)], E1, E2), E1 = [(morgana,200,30)], E2 = [(brand,230,10)].
testStepPelea(2) :- stepPelea([(morgana,200,30)], [(soraka,300,10)], E1, E2), E1 = [(morgana,200,30)], E2 = [(soraka,300,0)].
testStepPelea(3) :- stepPelea([(morgana,200,30)], [(brand,230,40), (chogat,400,50)], E1, E2), E1 = [(morgana,200,30)], E2 = [(brand,230,10), (chogat,400,20)].
testStepPelea(4) :- stepPelea([(amumu,400,50)], [(brand,230,40), (chogat,400,50)], E1, E2), E1 = [(amumu,400,50)], E2 = [(brand,180,40), (chogat,350,50)].
testStepPelea(5) :- stepPelea([(amumu,400,50)], [(brand,50,40), (chogat,400,50)], E1, E2), E1 = [(amumu,400,50)], E2 = [(chogat,350,50)].
testStepPelea(6) :- stepPelea([(amumu,400,50)], [(brand,40,40), (chogat,400,50)], E1, E2), E1 = [(amumu,400,50)], E2 = [(chogat,350,50)].
testStepPelea(7) :- stepPelea([(soraka,300,10), (morgana,200,30), (amumu,400,50)], [(brand,230,40), (chogat,400,50)], E1, E2), E1 = [(morgana,210,40), (amumu,410,60), (soraka,300,10)], E2 = [(brand,230,40), (chogat,400,50)].
testStepPelea(8) :- stepPelea([(akali,200,150)], [(brand,230,40), (chogat,400,50)], E1, E2), E1 = [(akali,200,150)], E2 = [(brand,80,40), (chogat,400,50)].
testStepPelea(9) :- stepPelea([(akali,200,150)], [(brand,160,40), (chogat,50,50)], E1, E2), E1 = [(akali,200,150)], E2 = [(brand,10,40), (chogat,50,50)].
testStepPelea(10) :- stepPelea([(akali,200,150), (brand,160,40), (chogat,50,50)], [(morgana,160,40), (amumu,50,50)], E1, E2), E1 = [(brand,160,40), (chogat,50,50), (akali,200,150)], E2 = [(morgana,10,40), (amumu,50,50)].


cantidadTestsPelea(14).
testPelea(1) :- pelea([(morgana,200,30)], [(brand,230,40)], 1, G), G = [].
testPelea(2) :- pelea([(morgana,200,30)], [(soraka,300,10)], 1, G), G = [].
testPelea(3) :- pelea([(morgana,200,30)], [(brand,230,40), (chogat,400,50)], 1, G), G = [(brand,230,10), (chogat,400,20)].
testPelea(4) :- pelea([(amumu,400,50)], [(brand,230,40), (chogat,400,50)], 1, G), G = [(brand,180,40), (chogat,350,50)].
testPelea(5) :- pelea([(amumu,400,50)], [(brand,50,40), (chogat,400,50)], 1, G), G = [].
testPelea(6) :- pelea([(amumu,400,50)], [(brand,40,40), (chogat,400,50)], 1, G), G = [].
testPelea(7) :- pelea([(soraka,300,10), (morgana,200,30), (amumu,400,50)], [(brand,230,40), (chogat,400,50)], 1, G), G = [(morgana,210,40), (amumu,410,60), (soraka,300,10)].
testPelea(8) :- pelea([(akali,200,150)], [(brand,230,40), (chogat,400,50)], 1, G), G = [(brand,80,40), (chogat,400,50)].
testPelea(9) :- pelea([(akali,200,150)], [(brand,160,40), (chogat,50,50)], 1, G), G = [(brand,10,40), (chogat,50,50)].
testPelea(10) :- pelea([(akali,200,150), (brand,160,40), (chogat,50,50)], [(morgana,160,40), (amumu,50,50)], 1, G), G = [(brand,160,40), (chogat,50,50), (akali,200,150)].
testPelea(11) :- pelea([(akali,200,130)], [(evelyn,120,130),(teemo,40,80)], 1, G), G = [].
testPelea(12) :- pelea([(akali,200,130)], [(evelyn,120,130),(teemo,40,80)], 2, G), G = [].
testPelea(13) :- pelea([(akali,200,130)], [(evelyn,120,130),(teemo,40,80)], 3, G), G = [(akali,200,50)].
testPelea(14) :- pelea([(akali,200,150)], [(brand,160,40), (chogat,50,50)], 5, G), G = [(akali,200,70)].

cantidadTestsGana(5).
testGana(1) :- not(gana([(morgana,200,30)], [(brand,230,40), (chogat,400,50)])).
testGana(2) :- gana([(brand,230,40), (chogat,400,50)], [(morgana,200,30)]).
testGana(3) :- gana([(akali,200,130)], [(evelyn,120,130),(teemo,40,80)]).
testGana(4) :- gana(E, [(akali,200,150)]), E = [(evelyn, 200, 130)].
testGana(5) :- gana(E, [(evelyn, 200, 130)]), member(E, [[(chogat, 400, 50)], [(akali, 200, 150)]]).

cantidadTestsHonor(4).
testHonor(1) :- honor([(soraka,300,10), (chogat,400,50)], [(teemo, 50, 0)], C), member(C, [chogat]).
testHonor(2) :- honor([(akali,200,150)], [(brand,160,40), (chogat,50,50)], C), C = akali.
testHonor(3) :- honor([(amumu,400,50)], [(brand,230,40), (chogat,400,50)], C), member(C, [brand, chogat]).
testHonor(4) :- honor([(evelyn, 100, 100)], [(akali, 1000, 50), (teemo, 1000, 50)], C), C = teemo.

tests(equipoInfinito) :- cantidadTestsEquipoInfinito(M), forall(between(1,M,N), testEquipoInfinito(N)).
tests(equipoValido) :- cantidadTestsEquipoValido(M), forall(between(1,M,N), testEquipoValido(N)).
tests(stepPelea) :- cantidadTestsStepPelea(M), forall(between(1,M,N), testStepPelea(N)).
tests(pelea) :- cantidadTestsPelea(M), forall(between(1,M,N), testPelea(N)).
tests(gana) :- cantidadTestsGana(M), forall(between(1,M,N), testGana(N)).
tests(honor) :- cantidadTestsHonor(M), forall(between(1,M,N), testHonor(N)).

tests(todos) :-
  tests(equipoInfinito),
  tests(equipoValido),
  tests(stepPelea),
  tests(pelea),
  tests(gana),
  tests(honor).

tests :- tests(todos).
