class Api::WordsController < ApplicationController

  def show
    @word = Word.find(params[:id])
  end

  def create
    @word = Word.new(word_params)
    @word.word = @word.word.split.each{|w| w[0] = w[0].upcase}.join(' ')
    if @word.save
      @genre = Genre.find(params[:word][:genre_id])
      render 'api/genres/show'
    else
      @errors = @word.errors.full_messages
      render 'api/shared/errors'
    end
  end

  private

  def word_params
    params.require(:word).permit(:word, :genre_id)
  end

end
