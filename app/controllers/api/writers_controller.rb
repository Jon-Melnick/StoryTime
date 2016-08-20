class Api::WritersController < ApplicationController

  def index
    @writers = Writer.all
  end

  def show
  end

  def create
  end

  def update
    @writer = Writer.find(params[:id])
    hand = @writer.redraw(params[:cards])
    @writer.update(hand: hand)
    @story = Story.find(@writer.story_id)
    render 'api/stories/show'
  end
end
