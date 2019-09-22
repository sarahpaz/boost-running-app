Rails.application.routes.draw do
  resources :runs
  resources :charities, only: [:index, :show, :new]
  resources :users, only: [:index, :new, :create, :show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'sessions#index'

  get '/' => 'sessions#new'
  post '/' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  delete '/logout' => 'sessions#destroy'

  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  get '/auth/:provider/callback' => 'sessions#omniauth'

  get '/welcome' => 'sessions#show'
  get '/mostdistance' => 'users#mostdistance'

  resources :charities do 
    resources :runs, only: [:new, :index]
  end
  
end
