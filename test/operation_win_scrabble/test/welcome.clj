(ns operation-win-scrabble.test.welcome
  (:use [operation-win-scrabble.views.welcome])
  (:use [clojure.test]))

(deftest
  test-group
  (is (= (group 10 (range 35))
         [[0 1 2 3 4 5 6 7 8 9]
          [10 11 12 13 14 15 16 17 18 19]
          [20 21 22 23 24 25 26 27 28 29]
          [30 31 32 33 34]])))
