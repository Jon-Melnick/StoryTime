class Api::GenresController < ApplicationController

  def index
    @genres = Genre.order(:id)
  end

  def show
    @genre = Genre.find(params[:id])
  end

  def create
    @genre = Genre.new(genre_params)
    if @genre.save
      render json: @genre
    else
      @errors = @genre.errors.full_messages
      render 'api/shared/errors', status: 422
    end
  end

  private

  def genre_params
    params.require(:genre).permit(:genre_type)
  end

end
