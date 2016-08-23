class Api::FriendshipsController < ApplicationController

  def create
    @friendship = Friendship.new(friendship_params)
    @friendship.requester_id = current_user.id
    @friendship.status = 'friends'
    if @friendship.save
      Friendship.create(requester_id: @friendship.receiver_id, receiver_id: current_user.id)
      @friend = User.find_by(id: @friendship.receiver_id)
      render 'api/friendships/show'
    else
      @errors = @friendship.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  def update
    @friendship = Friendship.find(params[:id])
    if @friendship.update(status: 'friends')
      @friend = User.find_by(id: @friendship.receiver_id)
      render 'api/friendships/show'
    else
      @errors = @friendship.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  private

  def friendship_params
    params.require(:friendship).permit(:receiver_id, :status)
  end

end
