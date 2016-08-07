# == Schema Information
#
# Table name: stories
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :string
#  genre_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Story < ActiveRecord::Base
  validates :title, :genre_id, presence: true

  has_many :sections, #method_name, ends with s
  primary_key: :id, #typically id
  foreign_key: :story_id, #column_name_id
  class_name: 'Section' #class_name ex. (String)

  has_many :team_members, #method_name, ends with s
    primary_key: :id, #typically id
    foreign_key: :story_id, #column_name_id
    class_name: 'Writer' #class_name ex. (String)

  has_many :authors, #method name
    through: :team_members,
    source: :user

  has_one :genre, #method_name, ends with s
    primary_key: :genre_id, #typically id
    foreign_key: :id, #column_name_id
    class_name: 'Genre' #class_name ex. (String)

end
