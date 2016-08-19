class Word < ActiveRecord::Base
  validates :word, presence: true, uniqueness: { scope: :genre_id,
    message: 'This genre already has this word'}
end
