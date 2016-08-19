require 'byebug'
class Api::UsersController < ApplicationController

  def index
    if params[:session_token]
      @user = User.find_by(session_token: params[:session_token])
      render json: @user
    elsif params[:email]
      @user = User.find_by(email: params[:email])
      if @user
        render json: @user
      end
    elsif params[:username]
      @user = User.find_by(username: params[:username])
      render json: @user if @user
    else
      @users = User.all
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render 'api/users/show'
    else
      @errors = @user.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render 'api/users/show'
    else
      @errors = @user.errors
      render json: @errors, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
