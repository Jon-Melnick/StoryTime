class Api::GenresController < ApplicationController

  def index
    @genres = Genre.all
  end

  def show
    @words = Genre.find(params[:id]).words
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
