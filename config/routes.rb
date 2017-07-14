Rails.application.routes.draw do

  root 'puzzles#index'

  post '/ScoreCreate', to: 'scores#create'

  resources :puzzles, only: [:index, :show]
  resources :characters, only: [:index]
  resources :scores, only: [:create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
