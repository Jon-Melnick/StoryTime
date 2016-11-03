class Api::UsersController < ApplicationController
require "byebug"
  def index
    if params[:session_token]
      @user = User.find_by(session_token: params[:session_token])
      @current_user = @user
      render 'api/users/show'
    elsif params[:email]
      @user = User.where(User.arel_table[:email].lower.matches("#{params[:email].downcase}")).first
      render 'api/users/show' if @user
    elsif params[:username]
      @user = User.where(User.arel_table[:username].lower.matches("#{params[:username].downcase}")).first
      render 'api/users/show' if @user
    elsif params[:search]
      friendIds = current_user.connections.map(&:receiver_id) << current_user.id
      users = User.where("username LIKE ? OR email LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%")
      @users = users.where.not(id: friendIds).limit(params[:limit]).offset(params[:offset])
    else
      @users = User.all
    end
  end

  def show
    @user = User.find(params[:id])
    render 'api/users/show' if @user
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
