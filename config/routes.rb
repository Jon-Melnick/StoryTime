Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :stories, only: [:create, :show, :index]
    resources :sections, only: [:create, :show, :index]
    resources :genres, only: [:create, :index, :show]
    resources :words, only: [:create, :show]
    resources :writers, only: [:create, :update]
  end
end
