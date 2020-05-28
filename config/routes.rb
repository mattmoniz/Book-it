Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/books', to:"static_pages#index"
  get '/books/:id', to:"static_pages#index"
  get '/users/:id', to: "static_pages#index"
  get '/nytbookslists', to: "static_pages#index"

  namespace :api do
    namespace :v1 do
      post "/books/search", to: "books#search"
      resources :books, only: [:index, :create, :show, :destroy]
      resources :users,  only: [:show]
      resources :nytbookslists, only: [:index]
    end
  end
end
