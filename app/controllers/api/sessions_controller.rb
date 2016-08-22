class Api::SessionsController < ApplicationController

  def create
    if params[:signInAs].include?('@')
      identifier = {email: params[:signInAs]}
    else
      identifier = {username: params[:signInAs]}
    end
    @user = User.find_by_credentials(identifier, params[:password])

    if @user
      login(@user)
      render 'api/users/show'
    else
      @errors = ["Invalid username and/or password"]
      render 'api/shared/errors', status: 404
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      render json: {message: 'No one is currently logged in'}, status: 404
    end
  end

end
