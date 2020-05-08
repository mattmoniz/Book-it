Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/books', to:"static_pages#index"

  namespace :api do
    namespace :v1 do
      post "/books/search", to: "books#search"
      resources :books, only: [:index, :show]
    end
  end
end
