# == Schema Information
#
# Table name: genre_words
#
#  id         :integer          not null, primary key
#  genre_id   :integer          not null
#  word_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GenreWord < ActiveRecord::Base
end
