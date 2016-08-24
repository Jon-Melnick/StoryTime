class Api::WritersController < ApplicationController

  def index
    @writers = Writer.all
  end

  def show
  end

  def create
    @writer = Writer.new(writer_params)
    story = Story.find(@writer.story_id)
    hand = story.generate_hand
    @writer.hand = hand
    if @writer.save
      render 'api/writers/show'
    else
      @errors = @story.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  def update
    @writer = Writer.find(params[:id])
    hand = @writer.redraw(params[:cards])
    @writer.update(hand: hand)
    @story = Story.find(@writer.story_id)
    render 'api/stories/show'
  end

  private
  def writer_params
    params.require(:writer).permit(:story_id, :user_id)
  end
end
