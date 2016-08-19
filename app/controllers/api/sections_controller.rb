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
    if @section.save
      render json: @section
    else
      @errors = @section.errors.full_messages
      render 'api/shared/errors'
    end
  end

  private
  def section_params
    params.require(:section).permit(:body, :story_id)
  end
end
