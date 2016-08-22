class Api::FriendshipsController < ApplicationController

  def create
    @friendship = Friendship.new(friendship_params)
    @friendship.requester_id = current_user.id
    if @friendship.save
      render json: @friendship
    else
      @errors = @friendship.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  def update
    @friendship = Friendship.find(params[:id])
    if @friendship.update(status: 'friends')
      render json: @friendship
    else
      @errors = @friendship.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  private

  def friendship_params
    params.require(:friendship).permit(:receiver_id)
  end

end
