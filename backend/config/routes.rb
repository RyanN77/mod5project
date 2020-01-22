Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get '/filter_reviews/:id', to: 'reviews#filter'
  get '/filter_follows/:id', to: 'follows#filter'
  
  resources :users
  resources :games
  resources :reviews
  resources :follows
  resources :likes
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
