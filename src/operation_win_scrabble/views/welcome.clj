(ns operation-win-scrabble.views.welcome
  (:require [operation-win-scrabble.views.common :as common])
  (:require [operation-win-scrabble.services.anagram :as ag])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))

;; settings

(def save-store "/sandbox/save-store.clj")
(def target-opts "Target number of anagrams to present user with."
  20)
(def bottom "Number of low-scoring words to sample when generating
            an optimal rack."
  5)
(def group-size "Number of words in each column on webpage."
  10)

;; consts

(def all-words (ag/grab-words ag/dict))

;; helpers

(defn group
  "Group collection colls into sublists of size. All elements of
  coll will be included in the result exactly once. Ex:

  (group 2 (range 5))  ->  [[0 1] [2 3] [4]]"
  [size colls]
  (loop [acc []
         remaining colls]
    (if (empty? remaining)
      acc
      (recur (conj acc (take size remaining))
             (drop size remaining)))))

; DEVELOPMENT get me a list of words
(defn next-words []
  (let [state (ag/read-store save-store)
        rack (ag/optimal-rack state
                              target-opts
                              bottom)]
    (ag/sub-anagrams rack all-words)))

;; pages

(defpage "/" []
         (common/layout
           [:p "There's nothing on the homepage yet."]
           [:p "Try " [:a {:href "/words"} "words"] "."]))

(defpage "/words" []
         (common/layout
           [:h1 "The Words"]
           (for [w (next-words)]
             [:p w])))

(group group-size (next-words))

