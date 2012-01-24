(ns operation-win-scrabble.views.welcome
  (:require [operation-win-scrabble.views.common :as common])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))

(defpage "/welcome" []
         (common/layout
           [:p "Welcome to operation-win-scrabble"]))
