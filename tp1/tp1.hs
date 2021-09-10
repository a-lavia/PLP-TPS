import Test.HUnit
import Data.List


data RTE a = Rose a [(Char,RTE a)]


instance Show a => Show (RTE a) where
  show (Rose i xs) = "Rose " ++ show i ++ " " ++ show xs


--------------Resolver--------------

mismos :: Eq a => [a] -> [a] -> Bool
mismos xs ys = null (xs \\ ys) && null (ys \\ xs)

instance Eq a => Eq (RTE a) where
  (==) (Rose x xs) (Rose y ys) = x == y && mismos xs ys

foldRose :: (a -> [(Char, b)] -> b) -> RTE a -> b
foldRose f (Rose x hijos) = f x (map (\(e,r) -> (e, foldRose f r)) hijos)

mapRTE :: (a -> b) -> RTE a -> RTE b
mapRTE f = foldRose (\x xs -> Rose (f x) xs)

nodos :: RTE a -> [a]
nodos = foldRose (\x xs -> x:(foldr (++) [] (map snd xs)))

altura :: RTE a -> Int
altura = foldRose (\x xs -> if null xs then 1 else 1 + (maximum (map snd xs)))

etiquetas :: RTE a -> [Char]
etiquetas = foldRose (\x xs -> foldr (++) [] (map (\n -> fst n : snd n) xs))

ramas :: RTE a -> [String]
ramas = foldRose (\x xs -> [(fst y:ys) | y <- xs, ys <- (if null (snd y) then [""] else (snd y))])

nivelesRose :: RTE a -> RTE (a, Int)
nivelesRose = foldRose (\x xs -> Rose (x, 1) [(e, mapRTE (\(nodo, nivel) -> (nodo, nivel+1)) r) | (e, r) <- xs])

subRose :: RTE a -> Int -> RTE a
subRose r h = foldRose (\x xs -> Rose (fst x) (if snd x >= h then [] else xs)) (nivelesRose r)

tests :: IO Counts
tests = do runTestTT allTests

allTests = test [
  "ejercicio1" ~: testsEj1,
  "ejercicio2" ~: testsEj2,
  "ejercicio3" ~: testsEj3,
  "ejercicio4" ~: testsEj4,
  "ejercicio5" ~: testsEj5,
  "ejercicio6" ~: testsEj6
  ]

unRose = Rose 1 [('a',Rose 2 [('c',Rose 4 [])]),('b',Rose 3 [])]
unRoseDoble = Rose 2 [('a', Rose 4 [('c', Rose 8 [])]), ('b', Rose 6 [])]
unRosePodado = Rose 1 [('a', Rose 2 []), ('b', Rose 3 [])]
otroRose = Rose 1 [('b',Rose 3 []), ('a',Rose 2 [('c',Rose 4 [])])]
otroRoseMas = Rose 1 [('d',Rose 5 [('e', Rose 6 [('b', Rose 3 [])])]), ('a',Rose 2 [('c',Rose 4 [])])]
otroRoseMasPodado = Rose 1 [('d', Rose 5 []), ('a', Rose 2 [])]

testsEj1 = test [
  True ~=? mismos [1,2,3] [3,1,2],
  False ~=? mismos [1,2] [1,2,3],
  True ~=? mismos "abcd" "adcb",
  False ~=? mismos "aab" "abb",
  True ~=? unRose == unRose,
  True ~=? unRose == otroRose,
  False ~=? unRose == otroRoseMas
  ]

testsEj2 = test [
  True ~=? unRoseDoble == mapRTE (2*) unRose,
  10 ~=? foldRose (\x xs -> x + sum (map snd xs)) unRose
  ]

testsEj3 = test [
  True ~=? mismos [1,2,3,4] (nodos unRose),
  True ~=? mismos [2,4,8,6] (nodos unRoseDoble),
  False ~=? mismos [1,2,3,4] (nodos otroRoseMas),
  3 ~=? altura unRose,
  3 ~=? altura otroRose,
  4 ~=? altura otroRoseMas
  ]

testsEj4 = test [
  True ~=? mismos "abc" (etiquetas unRose),
  True ~=? mismos "abcde" (etiquetas otroRoseMas),
  False ~=? mismos "abcde" (etiquetas unRose)
  ]

testsEj5 = test [
  True ~=? mismos ["ac", "b"] (ramas unRose),
  True ~=? mismos ["ac", "b"] (ramas otroRose),
  True ~=? mismos ["deb", "ac"] (ramas otroRoseMas)
  ]

testsEj6 = test [
  True ~=? subRose unRose 2 == unRosePodado,
  True ~=? subRose otroRoseMas 2 == otroRoseMasPodado,
  False ~=? subRose otroRoseMas 3 == otroRoseMasPodado,
  False ~=? subRose otroRoseMas 3 == otroRoseMas
  ]

  --}
