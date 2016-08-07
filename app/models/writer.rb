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

class Writer < ActiveRecord::Base
  belongs_to :user, #method_name
    primary_key: :id, #typically id
    foreign_key: :user_id, #column_name_id
    class_name: 'User' #class_name ex. (String)

  belongs_to :story, #method_name
    primary_key: :id, #typically id
    foreign_key: :story_id, #column_name_id
    class_name: 'Story' #class_name ex. (String)
end
