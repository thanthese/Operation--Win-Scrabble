(ns operation-win-scrabble.views.welcome
  (:require [operation-win-scrabble.views.common :as common])
  (:require [operation-win-scrabble.services.anagram :as ag])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))

(defpage "/" []
         (common/layout
           [:p "Well, this is something else, then."]))

(def save-store "/sandbox/save-store.clj")
(def target-opts "Target number of anagrams to present user with."
  20)
(def bottom "Number of low-scoring words to sample when generating
            an optimal rack."
  5)

(def all-words (ag/grab-words ag/dict))

(defn next-word []
  (let [state (ag/read-store save-store)
        rack (ag/optimal-rack state
                              target-opts
                              bottom)]
    (ag/sub-anagrams rack all-words)))

(defpage "/words" []
         (common/layout
           [:h1 "The Words"]
           (for [w (next-word)]
             [:p w])))
