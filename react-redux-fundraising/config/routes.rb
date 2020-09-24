Rails.application.routes.draw do
  root 'causes#index'

  namespace :api do
    namespace :v1 do
      resources :causes, only: :index do
        resources :donations, only: [:index, :create]
      end
    end
  end
end
