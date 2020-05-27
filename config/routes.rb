Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/books', to:"static_pages#index"
  get '/books/:id', to:"static_pages#index"
  get '/users/:id', to: "static_pages#index"
  get '/nytimeslist', to: "static_pages#index"

  namespace :api do
    namespace :v1 do
      post "/books/search", to: "books#search"
      resources :nytimeslist, only: [:index]
      resources :books, only: [:index, :create, :show, :destroy]
      resources :users,  only: [:show]
    end
  end
end
