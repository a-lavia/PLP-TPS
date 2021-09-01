import Test.HUnit


data RTE a = Rose a [(Char,RTE a)]


instance Show a => Show (RTE a) where
  show (Rose i xs) = "Rose " ++ show i ++ " " ++ show xs


--------------Resolver--------------

mismos :: Eq a => [a] -> [a] -> Bool
mismos xs ys = foldr (\x acc -> x `elem` ys && acc) True xs && length xs == length ys

instance Eq a => Eq (RTE a) where
  (==) (Rose x xs) (Rose y ys) = x == y && mismos xs ys

foldRose :: (a -> [(Char, b)] -> b) -> RTE a -> b
foldRose f (Rose x hijos) = f x (map (\(e,r) -> (e, foldRose f r)) hijos)

mapRTE :: (a -> b) -> RTE a -> RTE b
mapRTE f r = foldRose (\x xs -> Rose (f x) xs) r

nodos :: RTE a -> [a]
nodos = foldRose (\x xs -> x:(foldr (++) [] (map snd xs)))

altura :: RTE a -> Int
altura = foldRose (\x xs -> if null xs then 1 else 1 + (maximum (map snd xs)))

etiquetas :: RTE a -> [Char]
etiquetas = foldRose (\x xs -> foldr (\y ys -> y++ys) [] (map (\n -> fst n : snd n) xs))

ramas :: RTE a -> [String]
ramas = undefined

subRose :: RTE a -> Int -> RTE a
subRose = undefined

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
otroRose = Rose 1 [('b',Rose 3 []), ('a',Rose 2 [('c',Rose 4 [])])]
otroRoseMas = Rose 1 [('d',Rose 5 []), ('a',Rose 2 [('c',Rose 4 [])])]

testsEj1 = test [
  2 ~=? 1+1,
  4 ~=? 2*2
  ]

testsEj2 = test [
  2 ~=? 1+1,
  4 ~=? 2*2
  ]

testsEj3 = test [
  2 ~=? 1+1,
  4 ~=? 2*2
  ]

testsEj4 = test [
  2 ~=? 1+1,
  4 ~=? 2*2
  ]

testsEj5 = test [
  2 ~=? 1+1,
  4 ~=? 2*2
  ]

testsEj6 = test [
  2 ~=? 1+1,
  4 ~=? 2*2
  ]

  --}
