# == Schema Information
#
# Table name: friendships
#
#  id           :integer          not null, primary key
#  requester_id :integer          not null
#  receiver_id  :integer          not null
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Friendship < ActiveRecord::Base
  validates :requester_id, uniqueness: { scope: :receiver_id,
    message: 'already friends'}
  validates :receiver_id, uniqueness: { scope: :requester_id,
      message: 'already friends'}


  belongs_to :requester, #method_name
    primary_key: :id, #typically id
    foreign_key: :requester_id, #column_name_id
    class_name: 'User' #class_name ex. (String)

  belongs_to :receiver, #method_name
    primary_key: :id, #typically id
    foreign_key: :receiver_id, #column_name_id
    class_name: 'User' #class_name ex. (String)

  def pending
    return :receiver if pending
  end

  def friend_info
    user = receiver
      {
      friendshipId: self.id,
      id: user.id,
      username: user.username,
      email: user.email,
      storyIds: user.storyIds,
      coauthors: user.stories.length,
      contributions: user.sections.length,
    }
  end

end
