class Api::StoriesController < ApplicationController

  def index
    @stories = Story.all
  end

  def show
    @story = Story.find(params[:id])
  end

  def create
    @story = Story.new(story_params)

    if @story.save
      render 'api/stories/show'
    else
      @errors = @story.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  def update
    @story = Story.find(params[:id])
    if @story.update(story_params)
      render 'api/stories/show'
    else
      @errors = @ttory.errors
      render json: @errors, status: 422
    end
  end

  private

  def story_params
    params.require(:story).permit(:title, :description)
  end

end
