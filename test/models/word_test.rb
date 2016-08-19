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

require 'test_helper'

class WordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
