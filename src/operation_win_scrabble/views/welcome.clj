(ns operation-win-scrabble.views.welcome
  (:require [operation-win-scrabble.views.common :as common])
  (:require [operation-win-scrabble.services.anagram :as ag])
  (:use [noir.core :only [defpage]]
        [hiccup.core]
        [hiccup.page-helpers]))

;; settings

(def save-store "/sandbox/save-store.clj")
(def target-opts "Target number of anagrams to present user with."
  20)
(def bottom "Number of low-scoring words to sample when generating
            an optimal rack."
  5)
(def group-size "Number of words in each column on webpage."
  10)

(def jquery-lib-url "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js")


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

(def test-words
  ["AA" "AAS" "AE" "AR" "ARE" "AREA" "AREAS" "ARES" "ARS" "ARSE"
   "AS" "ASEA" "EAR" "EARS" "ER" "ERA" "ERAS" "ERS" "ES" "RAS"
   "RASE" "RE" "RES" "SAE" "SEA" "SEAR" "SER" "SERA"])

(defn render-game-page [rack-letters answers group-size is-test]
  (html5
    (include-js jquery-lib-url)
    (include-js "/js/main.js")
    (when is-test (include-js "/js/test-main.js"))
    (include-css "/css/main.css")
    [:div#guess
     (for [_ rack-letters]
       [:div.guess-letter])]
    [:div#rack
     (for [letter rack-letters]
       [:div.rack-letter letter])]
    [:div#answers
     (for [column (group group-size answers)]
       [:div.column
        (for [word column]
          [:div.word {:word word
                      :state "not-gotten"}
           (for [letter word]
             [:div.letter-box
              [:div.letter letter]])])])]))

(defpage "/" []
         (common/layout
           [:p "There's nothing on the homepage yet."]
           [:p "Try " [:a {:href "/words"} "words"] "."]))

(defpage "/words" []
         (common/layout
           [:h1 "The Words"]
           (for [w (next-words)]
             [:p w])))

(defpage
  "/test" []
  (render-game-page "AAERS" test-words 10 true))
