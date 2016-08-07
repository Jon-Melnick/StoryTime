# == Schema Information
#
# Table name: writers
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  story_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class WriterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
