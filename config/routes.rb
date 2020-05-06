Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/books', to:"static_pages#index"

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index]
    end
  end
end
