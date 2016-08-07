


class Genre < ActiveRecord::Base
  validates :genre_type, presence: true


  has_many :words, #method_name, ends with s
    primary_key: :id, #typically id
    foreign_key: :genre_id, #column_name_id
    class_name: 'Word' #class_name ex. (String)


  # def self.words(genre)
  #   words = Genre.all.where(genre_type: genre)
  #   words.map{|el| el.word }
  # end
end
