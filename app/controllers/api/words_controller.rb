class Api::WordsController < ApplicationController

  def show
    @word = Word.find(params[:id])
  end

  def create
    @word = Word.new(word_params)
    if @word.save
      render json: @word
    else
      @errors = @word.errors.full_messages
      render 'api/shared/errors'
    end
  end

  private

  def word_params
    params.require(:word).permit(:word)
  end
  
end
