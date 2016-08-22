# == Schema Information
#
# Table name: words
#
#  id         :integer          not null, primary key
#  genre_id   :integer          not null
#  word       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Word < ActiveRecord::Base
  validates :word, presence: true, uniqueness: { scope: :genre_id,
    message: 'This genre already has this word'}
end
