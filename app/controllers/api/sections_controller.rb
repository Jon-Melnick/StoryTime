class Api::SectionsController < ApplicationController

  def index
    @sections = Sections.find_by(story_id: params[:id])
  end

  def show
    @section = Section.find(params[:id])
  end

  def create
    @section = Section.new(section_params)
    @section.user_id = current_user.id
    @section.seen = {current_user.id => true}
    if @section.save
      render json: @section
    else
      @errors = @section.errors.full_messages
      render 'api/shared/errors'
    end
  end

  def update
    @section = Section.find(params[:id])
    seen = @section.seen
    seen[current_user.id] = true
    if @section.update(seen: seen)
      render 'api/sections/show'
    else
      @errors = @section.errors.full_messages
      render 'api/shared/errors'
    end
  end

  private
  def section_params
    params.require(:section).permit(:body, :section_id, :story_id)
  end
end
