import Test.HUnit


data RTE a = Rose a [(Char,RTE a)]


instance Show a => Show (RTE a) where
  show (Rose i xs) = "Rose " ++ show i ++ " " ++ show xs


--------------Resolver--------------

instance Eq a => Eq (RTE a) where
  (==) = undefined


foldRose = undefined


mapRTE = undefined


nodos :: RTE a -> [a]
nodos = undefined


etiquetas :: RTE a -> [Char]
etiquetas = undefined


altura :: RTE a -> Int
altura = undefined


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